#!/usr/bin/env python3
"""Génère les voix de « Lou et la forêt des lanternes » avec l'API OpenAI (text-to-speech).

  export OPENAI_API_KEY=sk-...
  python3 generer_voix.py --essai --voix coral,nova,sage   # phrases d'essai par voix + page ecoute.html
  python3 generer_voix.py --voix coral                     # les 484 phrases dans voix/, puis intégration
  python3 generer_voix.py --voix coral --seulement n3,tl_a # refaire quelques phrases ratées (et réintégrer)
  python3 generer_voix.py --integrer                       # seulement convertir voix/ vers audio/

Intégration : chaque voix/<id>.flac est rognée de ses silences de début et de fin, encodée en
audio/<id>.mp3 (mono, 24 kHz, 56 kbit/s) et sa durée est reportée dans audio/clips.json.
Lancer ensuite python3 build.py.

Avec ElevenLabs (voix clonée ; l'identifiant de voix reste hors du dépôt) :
  export ELEVENLABS_API_KEY=...  ELEVENLABS_VOICE_ID=...
  python3 generer_voix.py --moteur elevenlabs            # voix_el/<id>.mp3 (44,1 kHz), puis intégration
  python3 generer_voix.py --moteur elevenlabs --seulement n3,tl_a
  python3 generer_voix.py --moteur elevenlabs --integrer
L'intégration encode alors en mono 44,1 kHz 80 kbit/s et signale les clips de durée suspecte.

Options : --voix coral|marin|cedar|nova|shimmer|sage|...   --modele gpt-4o-mini-tts
Reprise automatique : les fichiers déjà présents dans voix/ ne sont pas regénérés.
Python 3.8+, ffmpeg et ffprobe pour l'intégration.
"""
import argparse, html, json, os, subprocess, sys, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor

CONSIGNE = ("Tu es une conteuse française, originaire de France, qui parle à une enfant de cinq ans. "
            "Voix douce, chaleureuse et souriante, articulation très claire, débit posé. "
            "Français standard sans aucun accent étranger. "
            "Quand le texte est un son isolé comme « le », « me », « que », « beu », prononce-le brièvement, "
            "comme le son de la lettre. Dis exactement le texte, sans rien ajouter.")
ESSAI = ["bonjour_lou", "pro_1", "tl_l", "ml_m", "n3", "w_p_0", "eq_3_2", "don_4", "cp_b"]
ICI = os.path.dirname(os.path.abspath(__file__))
EXT = ".flac"
# par moteur : dossier des originaux, extension, encodage final (fréquence, débit)
MOTEURS = {"openai": ("voix", ".flac", "24000", "56k"), "elevenlabs": ("voix_el", ".mp3", "44100", "80k")}
FREQ, DEBIT = "24000", "56k"


def synth(key, modele, voix, ident, texte, dossier):
    cible = os.path.join(dossier, ident + EXT)
    if os.path.exists(cible) and os.path.getsize(cible) > 200:
        return ident, True
    if EXT == ".mp3":  # ElevenLabs
        url = "https://api.elevenlabs.io/v1/text-to-speech/" + voix + "?output_format=mp3_44100_128"
        corps = json.dumps({"text": texte, "model_id": modele}).encode()
        entetes = {"xi-api-key": key, "Content-Type": "application/json"}
    else:
        url = "https://api.openai.com/v1/audio/speech"
        corps = json.dumps({"model": modele, "voice": voix, "input": texte,
                            "instructions": CONSIGNE, "response_format": "flac"}).encode()
        entetes = {"Authorization": "Bearer " + key, "Content-Type": "application/json"}
    for essai in range(6):
        req = urllib.request.Request(url, data=corps, headers=entetes)
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                data = r.read()
            with open(cible + ".tmp", "wb") as f:
                f.write(data)
            os.replace(cible + ".tmp", cible)
            return ident, True
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503):
                time.sleep(2 ** essai)
                continue
            print(f"\n{ident}: HTTP {e.code} {e.read()[:300]!r}", file=sys.stderr)
            return ident, False
        except Exception:
            time.sleep(2 ** essai)
    return ident, False


def generer(key, modele, voix, ids, phrases, dossier, parallele, refaire):
    os.makedirs(dossier, exist_ok=True)
    if refaire:
        for i in ids:
            p = os.path.join(dossier, i + EXT)
            if os.path.exists(p):
                os.remove(p)
    rates, faits = [], 0
    with ThreadPoolExecutor(parallele) as ex:
        for ident, ok in ex.map(lambda i: synth(key, modele, voix, i, phrases[i], dossier), ids):
            faits += 1
            if not ok:
                rates.append(ident)
            print(f"\r{voix} : {faits}/{len(ids)}", end="", flush=True)
    print()
    if rates:
        print("Échecs (relance le script pour reprendre) :", ", ".join(rates))
    return rates


def page_ecoute(voix_liste, phrases):
    lignes = []
    for i in ESSAI:
        cellules = [f"<td><audio controls preload=none src='audio/{html.escape(i)}.mp3'></audio></td>"]
        cellules += [f"<td><audio controls preload=none src='voix_essai/{v}/{html.escape(i)}{EXT}'></audio></td>"
                     for v in voix_liste]
        lignes.append(f"<tr><th>{html.escape(phrases[i])}<small>{html.escape(i)}</small></th>{''.join(cellules)}</tr>")
    entete = "".join(f"<th>{v}</th>" for v in ["actuelle (Piper)"] + voix_liste)
    page = f"""<!doctype html><meta charset=utf-8><title>Choix de la voix</title>
<style>body{{font:15px system-ui;margin:16px}}table{{border-collapse:collapse}}td,th{{border:1px solid #ccc;padding:6px;text-align:left;vertical-align:top}}
th small{{display:block;color:#888;font-weight:normal}}tbody th{{max-width:280px;font-weight:normal}}audio{{width:170px}}</style>
<h1>Choix de la voix</h1><p>Colonne par voix, ligne par phrase. Les sons isolés (« le », « me », « beu ») sont le point à surveiller.</p>
<table><thead><tr><th>Phrase</th>{entete}</tr></thead><tbody>{''.join(lignes)}</tbody></table>"""
    chemin = os.path.join(ICI, "ecoute.html")
    with open(chemin, "w", encoding="utf-8") as f:
        f.write(page)
    return chemin


def integrer(ids, dossier):
    """voix/<id>.flac -> audio/<id>.mp3 (silences rognés) et durées dans audio/clips.json."""
    chemin_clips = os.path.join(ICI, "audio", "clips.json")
    with open(chemin_clips, encoding="utf-8") as f:
        clips = json.load(f)
    connus = {c[0] for c in clips}
    inconnus = [i for i in ids if i not in connus]
    if inconnus:
        sys.exit(f"absents de audio/clips.json : {inconnus}")
    rognage = ("silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.05,areverse,"
               "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.08,areverse")

    def un(i):
        src, dst = os.path.join(dossier, i + EXT), os.path.join(ICI, "audio", i + ".mp3")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-af", rognage, "-ac", "1", "-ar", FREQ,
                        "-c:a", "libmp3lame", "-b:a", DEBIT, "-map_metadata", "-1", "-id3v2_version", "0",
                        "-write_xing", "1", dst], check=True)
        d = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", dst],
                           capture_output=True, text=True).stdout.strip()
        try:
            return i, round(float(d), 2)
        except ValueError:
            return i, 0.0

    with ThreadPoolExecutor(os.cpu_count() or 4) as ex:
        durees = dict(ex.map(un, ids))
    # L'API renvoie parfois un audio tronqué (silence ou fraction de seconde) : on bloque.
    vides = sorted(i for i, d in durees.items() if d < 0.3)
    if vides:
        sys.exit(f"audio vide ou tronqué, clips.json inchangé. Refaire avec --seulement {','.join(vides)}")
    # durée très différente de la version précédente : phrase peut-être avalée ou allongée, à écouter
    suspects = [(c[0], c[1], durees[c[0]]) for c in clips
                if c[0] in durees and c[1] > 0 and not (0.45 <= durees[c[0]] / c[1] <= 2.2)]
    if suspects:
        print(f"{len(suspects)} durées suspectes (id, avant, après) :", " ".join(f"{i}:{a}->{d}" for i, a, d in suspects))
    for c in clips:
        if c[0] in durees:
            c[1] = durees[c[0]]
    with open(chemin_clips, "w", encoding="utf-8") as f:
        f.write("[\n" + ",\n".join(json.dumps(c, ensure_ascii=False) for c in clips) + "\n]\n")
    print(f"{len(ids)} clips intégrés dans audio/. Lance python3 build.py.")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voix", default="coral", help="une voix, ou plusieurs séparées par des virgules avec --essai")
    ap.add_argument("--modele", default="")
    ap.add_argument("--moteur", default="openai", choices=list(MOTEURS))
    ap.add_argument("--essai", action="store_true")
    ap.add_argument("--seulement", default="")
    ap.add_argument("--integrer", action="store_true", help="seulement convertir voix/ vers audio/")
    ap.add_argument("--parallele", type=int, default=6)
    a = ap.parse_args()
    with open(os.path.join(ICI, "phrases.json"), encoding="utf-8") as f:
        phrases = json.load(f)
    global EXT, FREQ, DEBIT
    nom_dossier, EXT, FREQ, DEBIT = MOTEURS[a.moteur]
    el = a.moteur == "elevenlabs"
    a.modele = a.modele or ("eleven_v3" if el else "gpt-4o-mini-tts")
    if el and not a.integrer:
        a.voix = os.environ.get("ELEVENLABS_VOICE_ID") or sys.exit("Définis ELEVENLABS_VOICE_ID.")
    dossier = os.path.join(ICI, nom_dossier)
    seulement = [i.strip() for i in a.seulement.split(",") if i.strip()]
    inconnus = [i for i in seulement if i not in phrases]
    if inconnus:
        sys.exit(f"absents de phrases.json : {inconnus}")
    if a.integrer:
        ids = seulement or list(phrases)
        manquants = [i for i in ids if not os.path.exists(os.path.join(dossier, i + EXT))]
        if manquants:
            sys.exit(f"{len(manquants)} fichiers manquants dans voix/ : {manquants[:10]}")
        return integrer(ids, dossier)
    variable = "ELEVENLABS_API_KEY" if el else "OPENAI_API_KEY"
    key = os.environ.get(variable)
    if not key:
        sys.exit(f"Définis {variable}.")
    if el and a.essai:
        sys.exit("--essai n'existe qu'avec OpenAI.")
    voix_liste = [v.strip() for v in a.voix.split(",") if v.strip()]
    if a.essai:
        for v in voix_liste:
            generer(key, a.modele, v, ESSAI, phrases, os.path.join(ICI, "voix_essai", v), a.parallele, refaire=True)
        print("Page d'écoute :", page_ecoute(voix_liste, phrases))
        return
    if len(voix_liste) != 1:
        sys.exit("Une seule voix pour la génération complète.")
    ids = seulement or list(phrases)
    rates = generer(key, a.modele, voix_liste[0], ids, phrases, dossier, a.parallele, refaire=bool(seulement))
    if rates:
        print("Intégration non faite tant qu'il reste des échecs.")
        return
    integrer(ids, dossier)


if __name__ == "__main__":
    main()
