#!/usr/bin/env python3
"""Assemble le jeu à partir des sources, sous deux formes.

    python3 build.py              # dist/ (à déployer) et jeu.html (fichier unique)
    python3 build.py --sans-unique

  dist/        index.html + audio/*.mp3 + images/*.webp, chargés à la demande. À servir en HTTP
               (python3 -m http.server -d dist 8000) ou à déposer sur un hébergeur statique.
  jeu.html     tout en un seul fichier (sons et images en base64), pour l'ouvrir d'un double-clic. Lourd.

Sources :
  src/index.html     gabarit de la page
  src/style.css      feuille de style
  src/jeu.js         script principal
  images/scenes.js   illustrations SVG (incluses dans jeu.js)
  audio/clips.json   liste ordonnée [id, durée_s] ; un fichier audio/<id>.mp3 par clip
  images/images.json liste [nom, largeur, qualité] ; un fichier images/<nom>.webp par image (voir preparer_images.py)

Directives reconnues, chacune seule sur sa ligne :
  <!-- @inclure chemin -->  ou  /* @inclure chemin */   remplacée par le fichier (chemin depuis la racine)
  <!-- @audio -->                                       remplacée par les balises window.CLIPS
  <!-- @images -->                                      remplacée par la balise window.IMG
"""
import argparse
import base64
import hashlib
import json
import os
import re
import shutil
import sys

ICI = os.path.dirname(os.path.abspath(__file__))
PAR_BALISE = 61  # clips par balise <script>, comme le fichier d'origine
INCLURE = re.compile(r"^(?:<!--|/\*) @inclure (\S+) (?:-->|\*/)$")


def lire(chemin):
    with open(os.path.join(ICI, chemin), encoding="utf-8") as f:
        texte = f.read()
    if not texte.endswith("\n"):
        sys.exit(f"{chemin} doit se terminer par un saut de ligne")
    return texte[:-1]


UNIQUE = True  # mode en cours : sons et images intégrés (True) ou en fichiers séparés (False)


def nom_fichier(ident):
    """Nom de fichier ASCII d'un clip (même règle que clipFile dans src/jeu.js)."""
    return "".join(c if ord(c) < 128 else "~%x" % ord(c) for c in ident)


def empreinte(chemin):
    with open(os.path.join(ICI, chemin), "rb") as f:
        return hashlib.sha1(f.read()).hexdigest()[:8]


def assembler(chemin, pile=()):
    if chemin in pile:
        sys.exit(f"inclusion circulaire : {' -> '.join(pile + (chemin,))}")
    lignes = []
    for ligne in lire(chemin).split("\n"):
        m = INCLURE.match(ligne)
        if m:
            lignes.append(assembler(m.group(1), pile + (chemin,)))
        elif ligne == "<!-- @audio -->":
            lignes.append(audio())
        elif ligne == "<!-- @images -->":
            lignes.append(images())
        else:
            lignes.append(ligne)
    return "\n".join(lignes)


def audio():
    clips = json.loads(lire("audio/clips.json"))
    ids = [c[0] for c in clips]
    if len(set(ids)) != len(ids):
        sys.exit("audio/clips.json contient des identifiants en double")
    if not UNIQUE:
        # VER : empreinte de chaque fichier, ajoutée à son adresse (?abc123) pour que le cache hors ligne
        # garde un fichier indéfiniment et ne le retélécharge que s'il a changé
        ver = {"a": {c[0]: empreinte(os.path.join("audio", c[0] + ".mp3")) for c in clips},
               "i": {n: empreinte(os.path.join("images", n + ".webp")) for n, _l, _q in json.loads(lire("images/images.json"))}}
        d = lambda v: json.dumps(v, ensure_ascii=False, separators=(",", ":"))
        return "<script>window.DUR=" + d(dict(clips)) + ";window.VER=" + d(ver) + ";</script>"
    sur_disque = {os.path.splitext(f)[0] for f in os.listdir(os.path.join(ICI, "audio")) if f.endswith(".mp3")}
    orphelins = sur_disque - set(ids)
    if orphelins:
        print(f"attention : mp3 absents de clips.json, ignorés : {sorted(orphelins)}", file=sys.stderr)
    balises = ["<script>window.CLIPS={};</script>"]
    for i in range(0, len(clips), PAR_BALISE):
        bloc = {}
        for cid, duree in clips[i:i + PAR_BALISE]:
            with open(os.path.join(ICI, "audio", cid + ".mp3"), "rb") as f:
                bloc[cid] = [duree, base64.b64encode(f.read()).decode("ascii")]
        texte = json.dumps(bloc, ensure_ascii=False, separators=(",", ":"))
        balises.append(f"<script>Object.assign(window.CLIPS,{texte});</script>")
    return "\n".join(balises)


def images():
    """window.IMG = { nom: data URI } pour chaque image listée dans images/images.json."""
    if not UNIQUE:
        return "<script>window.IMG={};</script>"
    table = {}
    for nom, _largeur, _qualite in json.loads(lire("images/images.json")):
        with open(os.path.join(ICI, "images", nom + ".webp"), "rb") as f:
            table[nom] = "data:image/webp;base64," + base64.b64encode(f.read()).decode("ascii")
    return "<script>window.IMG=" + json.dumps(table, ensure_ascii=False, separators=(",", ":")) + ";</script>"


def verifier_phrases():
    """Chaque clip doit avoir sa phrase dans phrases.json (règle du projet)."""
    with open(os.path.join(ICI, "phrases.json"), encoding="utf-8") as f:
        phrases = json.load(f)
    clips = {c[0] for c in json.loads(lire("audio/clips.json"))}
    for nom, ensemble in (("sans phrase dans phrases.json", clips - set(phrases)),
                          ("sans clip audio", set(phrases) - clips)):
        if ensemble:
            print(f"attention : {len(ensemble)} id {nom} : {sorted(ensemble)[:10]}", file=sys.stderr)


def ecrire(chemin, page):
    with open(chemin, "w", encoding="utf-8", newline="\n") as f:
        f.write(page)
    return len(page.encode("utf-8"))


def main():
    global UNIQUE
    p = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    p.add_argument("--sans-unique", action="store_true", help="ne pas produire jeu.html")
    args = p.parse_args()
    verifier_phrases()

    # dist/ : fichiers séparés
    UNIQUE = False
    dist = os.path.join(ICI, "dist")
    shutil.rmtree(dist, ignore_errors=True)
    os.makedirs(os.path.join(dist, "audio"))
    os.makedirs(os.path.join(dist, "images"))
    ecrire(os.path.join(dist, "index.html"), assembler("src/index.html") + "\n")
    total = 0
    for cid, _duree in json.loads(lire("audio/clips.json")):
        cible = os.path.join(dist, "audio", nom_fichier(cid) + ".mp3")
        shutil.copyfile(os.path.join(ICI, "audio", cid + ".mp3"), cible)
        total += os.path.getsize(cible)
    for nom, _largeur, _qualite in json.loads(lire("images/images.json")):
        cible = os.path.join(dist, "images", nom + ".webp")
        shutil.copyfile(os.path.join(ICI, "images", nom + ".webp"), cible)
        total += os.path.getsize(cible)
    pwa = os.path.join(ICI, "src", "pwa")  # manifeste, service worker, icônes, en-têtes de cache
    for f in os.listdir(pwa):
        shutil.copyfile(os.path.join(pwa, f), os.path.join(dist, f))
    print(f"dist/ : index.html {os.path.getsize(os.path.join(dist, 'index.html')) / 1e3:.0f} ko, sons et images {total / 1e6:.1f} Mo")

    if not args.sans_unique:
        UNIQUE = True
        taille = ecrire(os.path.join(ICI, "jeu.html"), assembler("src/index.html") + "\n")
        print(f"jeu.html : {taille / 1e6:.1f} Mo (fichier unique)")


if __name__ == "__main__":
    main()
