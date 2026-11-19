"""Contenu des chapitres 7 à 20 (indices 6 à 19) : lettres, nombres, histoire.
Source de vérité pour appliquer_saison2.py, qui met à jour src/jeu.js et phrases.json."""

# graphème : (son écrit pour la voix, voyelle ?, mots [(mot, emoji)], sans_exercice_de_son ?)
LETTRES = {
    "ou": ("ou", 1, [("ours", "🐻"), ("outil", "🔧"), ("ouistiti", "🐒")], 0),
    "ch": ("cheu", 0, [("chat", "🐱"), ("cheval", "🐴"), ("chocolat", "🍫"), ("chapeau", "🎩")], 0),
    "on": ("on", 1, [("ongle", "💅"), ("onze", "11")], 0),
    "k": ("que", 0, [("kangourou", "🦘"), ("koala", "🐨"), ("kiwi", "🥝")], 0),
    "an": ("an", 1, [("ange", "👼"), ("ancre", "⚓"), ("antenne", "📡")], 0),
    "e": ("eu", 1, [("cheval", "🐴")], 1),
    "oi": ("oua", 1, [("oiseau", "🐦")], 0),
    "qu": ("que", 0, [("quille", "🎳"), ("quatre", "4")], 0),
    "in": ("ain", 1, [("insecte", "🦗"), ("infirmière", "👩‍⚕️")], 0),
    "y": ("yeu", 0, [("yoyo", "🪀"), ("yaourt", "🥛")], 0),
    "ai": ("è", 1, [("aigle", "🦅"), ("aimant", "🧲")], 0),
    "h": (None, 0, [("hibou", "🦉")], 1),
    "w": ("veu", 0, [("wagon", "🚃")], 0),
    "x": (None, 0, [("taxi", "🚕")], 1),
}
# son utilisé par le jeu pour repérer les lettres de même son (c/k/qu, v/w)
SON_JEU = {"ou": "ou", "ch": "che", "on": "on", "k": "que", "an": "an", "e": "e", "oi": "oi", "qu": "que",
           "in": "in", "y": "ye", "ai": "ai", "h": "h", "w": "ve", "x": "x"}
NOMBRES = {11: "onze", 12: "douze", 13: "treize", 14: "quatorze", 15: "quinze", 16: "seize",
           17: "dix-sept", 18: "dix-huit", 19: "dix-neuf", 20: "vingt"}

L, C, S, K, A = "lettres", "chiffres", "sons", "compte", "addition"
CHAPITRES = [
 {"n": "La plage aux coquillages",
  "intro": "Quelques nuits plus tard, Plume revient à la fenêtre. « Lou ! Au-delà de la forêt, d’autres lanternes se sont éteintes. » Les voici sur une plage, au bord de la mer.",
  "outro": "Pince a retrouvé son rocher. Au loin, une lumière clignote sur la mer. « C’est le phare ! » dit Plume.",
  "stops": [
   [L, ["ou", "a", "m"], "La lanterne de la plage dort. Traçons les lettres magiques pour la réveiller.", "La lanterne s’allume ! Le sable brille comme de l’or."],
   [C, [11, 12], "La mer a caché ses coquillages. Apprenons onze et douze pour les retrouver.", "Les coquillages reviennent sur le sable."],
   [S, None, "Quelque chose fait clic-clac derrière un rocher. Écoute bien les sons.", "C’est Pince, le petit crabe ! Il cherchait sa maison."],
   [K, 12, "Pince adore les étoiles de mer. Comptons-les avec lui.", "Les étoiles de mer dansent au bord des vagues."]]},
 {"n": "Le phare endormi",
  "intro": "Une petite barque emmène Lou jusqu’au phare. Mais sa grande lumière ne tourne plus.",
  "outro": "Perle connaît le chemin. « Montez sur mon dos, je vous emmène sur l’île. »",
  "stops": [
   [L, ["ch", "i", "l"], "Trace les lettres magiques pour rallumer la lanterne du phare.", "La lanterne brille au pied du phare."],
   [S, None, "Quelqu’un nage tout près, sans trouver son chemin. Écoute les sons.", "C’est Perle, la tortue de mer ! Elle était perdue dans le noir."],
   [K, 12, "Les petits bateaux attendent au large. Comptons-les pour les guider.", "Les petits bateaux allument leurs lumières."],
   [A, 6, "Pour rallumer le phare, il faut additionner les perles.", "Le phare s’allume ! Sa lumière balaie la mer."]]},
 {"n": "L’île aux perroquets",
  "intro": "Sur l’île, les palmiers sont immenses. D’habitude les perroquets bavardent, mais ce soir tout est silencieux.",
  "outro": "Coco a retrouvé sa voix. « Suivez-moi ! » crie-t-il. « Je connais le chemin de la jungle. »",
  "stops": [
   [L, ["on", "o", "r"], "Vite, les lettres magiques, pour réveiller la lanterne de l’île.", "La lanterne s’allume sous les palmiers."],
   [C, [13, 14], "Les fleurs de l’île se sont refermées. Écris treize et quatorze pour les ouvrir.", "Les grandes fleurs s’ouvrent de toutes les couleurs."],
   [S, None, "Qui se cache dans les feuilles ? Suis les sons.", "C’est Coco, le perroquet ! Il avait perdu sa voix."],
   [K, 14, "Coco a faim. Comptons les noix de coco avec lui.", "Les noix de coco roulent jusqu’à Coco."],
   [A, 7, "Additionne les perles pour réveiller la cascade.", "La cascade coule de nouveau, toute scintillante."]]},
 {"n": "La jungle des lianes",
  "intro": "Dans la jungle, les lianes pendent comme des rideaux. Tout là-haut, quelqu’un a peur de descendre.",
  "outro": "Kiki saute de liane en liane. Derrière la jungle, l’air devient chaud. Voici le désert.",
  "stops": [
   [L, ["k", "u", "s"], "Trace les lettres magiques pour rallumer la lanterne de la jungle.", "La lanterne éclaire les grandes feuilles."],
   [S, None, "Qui est coincé en haut de l’arbre ? Écoute bien les sons.", "C’est Kiki, le petit singe ! Il n’osait plus bouger dans le noir."],
   [K, 14, "Kiki voudrait des bananes. Comptons-les ensemble.", "Un beau régime de bananes pour Kiki !"],
   [A, 8, "Additionne les perles pour allumer les fleurs-lanternes.", "Les fleurs-lanternes s’allument le long du chemin."]]},
 {"n": "L’oasis du désert",
  "intro": "Le désert est immense et tout bleu sous la lune. Au milieu des dunes, une oasis attend sa lumière.",
  "outro": "Sable a bu toute l’eau qu’il voulait. Il montre une montagne au loin. « Là-haut, il y a de la neige ! »",
  "stops": [
   [L, ["an", "é", "t"], "Les lettres magiques vont rallumer la lanterne de l’oasis.", "La lanterne s’allume. L’eau de l’oasis brille."],
   [C, [15, 16], "Les cactus fleurissent quand on sait écrire quinze et seize.", "Les cactus se couvrent de fleurs roses."],
   [S, None, "Deux grandes oreilles dépassent d’une dune. Écoute les sons.", "C’est Sable, le petit fennec ! Il cherchait de l’eau."],
   [K, 16, "Les étoiles du désert sont très nombreuses. Comptons-les.", "Le ciel du désert se remplit d’étoiles."]]},
 {"n": "La montagne enneigée",
  "intro": "Il neige sur la montagne. Tout est blanc et silencieux. Dans la neige, il y a de petites traces de pattes.",
  "outro": "Neige rentre dans sa tanière, bien au chaud. Lou glisse sur la neige jusqu’en bas de la montagne.",
  "stops": [
   [L, ["e", "p", "n"], "Trace les lettres magiques pour rallumer la lanterne de la montagne.", "La lanterne s’allume, et la neige devient dorée."],
   [S, None, "À qui sont ces traces de pattes ? Suis les sons.", "C’est Neige, l’ourson blanc ! Il s’était éloigné de sa tanière."],
   [K, 16, "Neige veut faire un bonhomme de neige. Comptons les boules.", "Un joli bonhomme de neige sourit à côté de Neige."],
   [A, 9, "Additionne les perles pour rallumer le ciel.", "Une aurore de toutes les couleurs danse dans le ciel."]]},
 {"n": "Le village des lutins",
  "intro": "En bas de la montagne, il y a un tout petit village. Les maisons sont des champignons, mais leurs fenêtres sont noires.",
  "outro": "Tout le village fait la fête. Pique montre un chemin. « Par là, il y a le moulin. »",
  "stops": [
   [L, ["oi", "f", "v"], "Les lettres magiques vont rallumer la lanterne du village.", "La lanterne s’allume sur la place du village."],
   [C, [17, 18], "Pour réveiller les maisons, écrivons dix-sept et dix-huit.", "Les fenêtres des maisons s’allument une à une."],
   [S, None, "Une petite boule pleine de piquants roule sur le chemin. Écoute les sons.", "C’est Pique, le hérisson ! Il ne retrouvait plus sa porte."],
   [K, 18, "Pique a perdu ses pommes en roulant. Comptons-les.", "Pique retrouve toutes ses pommes."],
   [A, 10, "Additionne les perles pour allumer les guirlandes.", "Des guirlandes de lumière brillent au-dessus du village."]]},
 {"n": "Le moulin à vent",
  "intro": "Sur la colline, le vieux moulin ne tourne plus. Le vent s’est endormi avec les lanternes.",
  "outro": "Le moulin tourne, et Mimi aura de la farine. Le vent pousse doucement Lou vers le verger.",
  "stops": [
   [L, ["qu", "b", "d"], "Trace les lettres magiques pour rallumer la lanterne du moulin.", "La lanterne s’allume devant le moulin."],
   [S, None, "Quelqu’un grignote dans un sac de blé. Écoute les sons.", "C’est Mimi, la petite souris ! Elle attendait que le moulin tourne."],
   [K, 18, "Mimi range ses épis de blé. Comptons-les avec elle.", "Les épis de blé sont bien rangés."],
   [A, 10, "Additionne les perles pour réveiller le vent.", "Le vent se lève, et les ailes du moulin tournent !"]]},
 {"n": "Le verger enchanté",
  "intro": "Dans le verger, les arbres dorment. Leurs fruits ne brillent plus. Dans l’herbe, deux longues oreilles tremblent.",
  "outro": "Trèfle croque une carotte. « Merci Lou ! Va voir le marais, les lucioles ont besoin de toi. »",
  "stops": [
   [L, ["in", "c", "j"], "Les lettres magiques vont rallumer la lanterne du verger.", "La lanterne s’allume entre les arbres."],
   [C, [19, 20], "Les fruits magiques brillent quand on sait écrire dix-neuf et vingt.", "Les fruits s’allument comme de petites lanternes."],
   [S, None, "À qui sont ces longues oreilles ? Écoute les sons.", "C’est Trèfle, le lapin ! Il avait peur du noir."],
   [K, 20, "Trèfle a planté des carottes. Comptons-les jusqu’à vingt.", "Un beau panier de carottes pour Trèfle !"]]},
 {"n": "Le marais des lucioles",
  "intro": "Le marais est le pays de Plume. D’habitude, mille lucioles y dansent. Ce soir, pas une seule lumière.",
  "outro": "Plume retrouve toutes ses sœurs lucioles. « Viens, Lou. Je vais te montrer le grand arbre. »",
  "stops": [
   [L, ["y", "g", "z"], "Trace les lettres magiques pour rallumer la lanterne du marais.", "La lanterne s’allume au bord de l’eau."],
   [S, None, "Quelqu’un fait « hou, hou » dans un vieil arbre. Écoute les sons.", "C’est Hulotte, la chouette ! Elle veillait sur les lucioles endormies."],
   [K, 20, "Les lucioles se réveillent quand on les compte.", "Les lucioles s’envolent par dizaines."],
   [A, 10, "Additionne les perles pour réveiller les roseaux.", "Les roseaux s’illuminent tout autour du marais."]]},
 {"n": "Le grand arbre",
  "intro": "Au cœur de la forêt pousse un arbre géant. Dans son tronc, il y a des portes, des escaliers et des livres.",
  "outro": "Dans le grand livre, Lou voit une image : un volcan endormi. « Allons-y ! » dit Plume.",
  "stops": [
   [L, ["ai", "ou", "ch"], "Les lettres magiques vont rallumer la lanterne du grand arbre.", "La lanterne s’allume au pied du grand arbre."],
   [C, [12, 15, 20], "Les portes de l’arbre ont des numéros. Retrouvons douze, quinze et vingt.", "Les petites portes s’ouvrent, pleines de lumière."],
   [S, None, "Quelqu’un fait tomber des noisettes. Écoute les sons.", "C’est Noisette, l’écureuil ! Elle garde les livres de la forêt."],
   [A, 10, "Additionne les perles pour ouvrir le grand livre.", "Le grand livre s’ouvre, et ses pages brillent."]]},
 {"n": "Le volcan endormi",
  "intro": "Le volcan dort depuis longtemps. Il ne fait pas peur : il est tout doux et tout chaud. Mais son feu s’est éteint.",
  "outro": "Flamme a retrouvé ses belles couleurs. Il ouvre ses ailes. « Montez ! Je vous emmène au-dessus des nuages. »",
  "stops": [
   [L, ["h", "on", "an"], "Trace les lettres magiques pour rallumer la lanterne du volcan.", "La lanterne s’allume sur les pierres noires."],
   [S, None, "Un petit oiseau grelotte près du volcan. Écoute les sons.", "C’est Flamme, le petit phénix ! Sans feu, il avait froid."],
   [K, 20, "Flamme a besoin de braises. Comptons-les jusqu’à vingt.", "Les braises rougeoient autour de Flamme."],
   [A, 10, "Additionne les perles pour réchauffer le volcan.", "Le volcan se réveille doucement. Il brille comme un grand feu de joie."]]},
 {"n": "Le pays des nuages",
  "intro": "Au-dessus des nuages, tout est doux comme du coton. Mais les étoiles se sont cachées, et les nuages sont tout gris.",
  "outro": "Coton saute de nuage en nuage. Lou monte l’escalier d’étoiles, une marche après l’autre.",
  "stops": [
   [L, ["w", "oi", "in"], "Les lettres magiques vont rallumer la lanterne des nuages.", "La lanterne s’allume, et les nuages deviennent roses."],
   [C, [11, 17, 19], "Les étoiles reviennent quand on sait écrire onze, dix-sept et dix-neuf.", "Les étoiles se rallument tout près de Lou."],
   [S, None, "Quelque chose de tout doux fait « bê, bê ». Écoute les sons.", "C’est Coton, le petit mouton des nuages ! Il cherchait son troupeau."],
   [K, 20, "Comptons les moutons des nuages avec Coton.", "Tous les moutons des nuages sont revenus."],
   [A, 10, "Additionne les perles pour construire l’escalier de la lune.", "Un escalier d’étoiles monte jusqu’à la lune."]]},
 {"n": "La lune",
  "intro": "Lou est arrivée sur la lune ! C’est ici que dort la lanterne de toutes les lanternes. D’en haut, on voit le monde entier.",
  "outro": "« Bravo, Lou », dit Plume. « Tu sais tracer, compter et écouter. Toutes les lanternes du monde brillent grâce à toi. » Lou rentre se coucher, le cœur plein d’étoiles. Bonne nuit, Lou.",
  "stops": [
   [L, ["x", "ai", "qu"], "Trace les dernières lettres magiques pour rallumer la lanterne de la lune.", "La petite lanterne s’allume sur la lune."],
   [S, None, "Quelqu’un saute tout doucement entre les cratères. Écoute les sons.", "C’est Luna, le lapin de la lune ! Elle garde la grande lanterne."],
   [K, 20, "Luna a semé des fleurs d’étoiles. Comptons-les jusqu’à vingt.", "Les fleurs d’étoiles s’ouvrent sur la lune."],
   [A, 10, "Encore une addition pour réveiller la grande lanterne.", "La grande lanterne de la lune se réveille."],
   [A, 10, "La dernière addition va envoyer la lumière partout.", "La lumière descend sur le monde entier. Toutes les lanternes brillent, et le ciel est en fête !"]]},
]
PREMIER = 6  # indice du premier chapitre de cette liste


def phrases():
    """id -> texte dit par la voix, pour tout ce que ces chapitres ajoutent."""
    p = {}
    for g, (son, _v, mots, _x) in LETTRES.items():
        mot0 = mots[0][0]
        if son is None:  # lettre sans son propre : on dit son nom
            nom = g.upper()
            p["tl_" + g] = (f"Voici la lettre {nom}. Elle ne fait aucun bruit, comme dans {mot0}." if g == "h"
                            else f"Voici la lettre {nom}, comme dans {mot0}.")
            p["ml_" + g] = f"Montre-moi la lettre {nom}."
            p["oui_" + g] = f"Oui, c’est la lettre {nom}."
            p["ca_" + g] = f"Ça, c’est la lettre {nom}."
            dit = nom
        else:
            p["tl_" + g] = f"Voici le son {son}, comme dans {mot0}."
            p["ml_" + g] = f"Montre-moi {son}."
            p["oui_" + g] = f"Oui, {son}."
            p["ca_" + g] = f"Ça, c’est {son}."
            p["cp_" + g] = f"Ça commence par {son}."
            p["qm_" + g] = f"Quel mot commence par {son} ?"
            dit = son[0].upper() + son[1:]
        for i, (mot, _e) in enumerate(mots):
            p[f"w_{g}_{i}"] = mot[0].upper() + mot[1:] + "."
            p[f"ok_{g}_{i}"] = f"{dit}, comme {mot}."
    for n, mot in NOMBRES.items():
        p[f"n{n}"] = mot[0].upper() + mot[1:] + "."
        p[f"tn_{n}"] = f"Voici le nombre {mot}."
        p[f"mn_{n}"] = f"Montre-moi le nombre {mot}."
        p[f"ouin_{n}"] = f"Oui, {mot}."
        p[f"can_{n}"] = f"Ça, c’est {mot}."
    for k, c in enumerate(CHAPITRES):
        ci = PREMIER + k
        p[f"in_{ci}"] = c["intro"]
        p[f"out_{ci}"] = c["outro"]
        for si, s in enumerate(c["stops"]):
            p[f"pre_{ci}_{si}"] = s[2]
            p[f"rw_{ci}_{si}"] = s[3]
    return p
