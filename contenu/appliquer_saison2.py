#!/usr/bin/env python3
"""Reporte contenu/saison2.py dans src/jeu.js (lettres L, chapitres CH), phrases.json et audio/clips.json.
Relançable : remplace ce qu'il avait déjà écrit. Ensuite : generer_voix.py pour les phrases nouvelles."""
import json, os, re, sys

ICI = os.path.dirname(os.path.abspath(__file__))
RACINE = os.path.dirname(ICI)
sys.path.insert(0, ICI)
import saison2 as s

js = lambda v: json.dumps(v, ensure_ascii=False, separators=(",", ":"))
p = os.path.join(RACINE, "src", "jeu.js")
src = open(p, encoding="utf-8").read()

# lettres : bloc balisé inséré à la fin de L
src = re.sub(r",\n  /\* saison 2 \*/\n.*?\n(?=\};\nconst PRO=)", "\n", src, flags=re.S)
lignes = []
for g, (_son, v, mots, x) in s.LETTRES.items():
    champs = f's:{js(s.SON_JEU[g])},' + ("v:1," if v else "") + ("x:1," if x else "") + f"w:{js([list(m) for m in mots])}"
    lignes.append(f"  {js(g)}:{{{champs}}}")
avant = src
src = re.sub(r"\n\};\nconst PRO=", ",\n  /* saison 2 */\n" + ",\n".join(lignes) + "\n};\nconst PRO=", src, count=1)
assert src != avant, "fin de L introuvable"

# chapitres
m = re.search(r"^const CH=(.*);$", src, flags=re.M)
ch = json.loads(m.group(1))[:s.PREMIER] + s.CHAPITRES
src = src[:m.start()] + "const CH=" + js(ch) + ";" + src[m.end():]
open(p, "w", encoding="utf-8").write(src)

# phrases et liste des clips
pp = os.path.join(RACINE, "phrases.json")
phrases = json.load(open(pp, encoding="utf-8"))
phrases.update(s.phrases())
open(pp, "w", encoding="utf-8").write(json.dumps(phrases, ensure_ascii=False, indent=1) + "\n")
pc = os.path.join(RACINE, "audio", "clips.json")
clips = json.load(open(pc, encoding="utf-8"))
connus = {c[0] for c in clips}
clips += [[i, 0] for i in phrases if i not in connus]
open(pc, "w", encoding="utf-8").write("[\n" + ",\n".join(json.dumps(c, ensure_ascii=False) for c in clips) + "\n]\n")
print(len(ch), "chapitres,", len(phrases), "phrases,", sum(1 for c in clips if c[1] == 0), "clips à générer")
