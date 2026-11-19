#!/usr/bin/env python3
"""Génère des images avec l'API OpenAI dans images/brut/ (gpt-image-2 ; gpt-image-1.5 pour les fonds transparents).

  python3 generer_images.py taches.json [--seulement nom1,nom2]

taches.json : liste d'objets {"nom", "prompt", "taille" (ex. 1024x1536), "transparent" (bool),
"source" (optionnel : nom d'une image de images/brut/ à modifier plutôt que créer)}.
Les fichiers déjà présents ne sont pas regénérés.
"""
import base64, json, os, sys, urllib.request, urllib.error, uuid
from concurrent.futures import ThreadPoolExecutor

ICI = os.path.dirname(os.path.abspath(__file__))
BRUT = os.path.join(ICI, "images", "brut")
MODELE = "gpt-image-2"
MODELE_TRANSPARENT = "gpt-image-1.5"  # gpt-image-2 refuse background=transparent


def appel(url, data, entetes):
    req = urllib.request.Request(url, data=data, headers=entetes)
    try:
        with urllib.request.urlopen(req, timeout=900) as r:
            return json.load(r), None
    except urllib.error.HTTPError as e:
        return None, f"HTTP {e.code} {e.read()[:400]!r}"
    except Exception as e:
        return None, repr(e)


def generer(t, key):
    cible = os.path.join(BRUT, t["nom"] + ".png")
    if os.path.exists(cible):
        return t["nom"], "déjà là"
    champs = {"model": t.get("modele", MODELE_TRANSPARENT if t.get("transparent") else MODELE), "prompt": t["prompt"], "size": t.get("taille", "1024x1024"), "quality": "high"}
    if t.get("transparent"):
        champs["background"] = "transparent"
    auth = {"Authorization": "Bearer " + key}
    if t.get("source"):
        b = uuid.uuid4().hex
        corps = b""
        for k, v in champs.items():
            corps += f'--{b}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode()
        with open(os.path.join(BRUT, t["source"] + ".png"), "rb") as f:
            corps += (f'--{b}\r\nContent-Disposition: form-data; name="image"; filename="source.png"\r\n'
                      "Content-Type: image/png\r\n\r\n").encode() + f.read() + f"\r\n--{b}--\r\n".encode()
        d, err = appel("https://api.openai.com/v1/images/edits", corps,
                       dict(auth, **{"Content-Type": "multipart/form-data; boundary=" + b}))
    else:
        d, err = appel("https://api.openai.com/v1/images/generations", json.dumps(champs).encode(),
                       dict(auth, **{"Content-Type": "application/json"}))
    if err:
        return t["nom"], err
    with open(cible, "wb") as f:
        f.write(base64.b64decode(d["data"][0]["b64_json"]))
    return t["nom"], "ok"


def main():
    key = os.environ.get("OPENAI_API_KEY") or sys.exit("Définis OPENAI_API_KEY.")
    taches = json.load(open(sys.argv[1], encoding="utf-8"))
    if "--seulement" in sys.argv:
        noms = sys.argv[sys.argv.index("--seulement") + 1].split(",")
        taches = [t for t in taches if t["nom"] in noms]
    os.makedirs(BRUT, exist_ok=True)
    with ThreadPoolExecutor(6) as ex:
        for nom, etat in ex.map(lambda t: generer(t, key), taches):
            print(nom, ":", etat, flush=True)


if __name__ == "__main__":
    main()
