#!/usr/bin/env python3
"""Convertit images/brut/<nom>.png en images/<nom>.webp selon images/images.json.

images.json : liste [nom, largeur_px, qualité]. Les images transparentes sont rognées à leur contenu.
Lancer ensuite python3 build.py (qui inclut tous les images/*.webp listés).
"""
import json, os
from PIL import Image

ICI = os.path.dirname(os.path.abspath(__file__))


def main():
    total = 0
    for nom, largeur, qualite in json.load(open(os.path.join(ICI, "images", "images.json"), encoding="utf-8")):
        im = Image.open(os.path.join(ICI, "images", "brut", nom + ".png"))
        if im.mode == "RGBA" and im.getchannel("A").getextrema()[0] < 255:
            im = im.crop(im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox())
        else:
            im = im.convert("RGB")
        im = im.resize((largeur, round(im.height * largeur / im.width)), Image.LANCZOS)
        cible = os.path.join(ICI, "images", nom + ".webp")
        im.save(cible, "WEBP", quality=qualite, method=6)
        total += os.path.getsize(cible)
        print(f"{nom}.webp {im.width}x{im.height} {os.path.getsize(cible) / 1000:.0f} ko")
    print(f"total {total / 1000:.0f} ko")


if __name__ == "__main__":
    main()
