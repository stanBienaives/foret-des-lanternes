#!/usr/bin/env python3
"""Écrit images/taches_s2.json : prompts des décors et personnages des chapitres 7 à 20 (indices 6 à 19)."""
import json, os

STYLE = ("Art for a premium 2.5D side-scrolling mobile adventure game for young children: polished painterly 3D render look, "
         "magical night world, saturated blues, violets and turquoise with warm golden glowing lights, bioluminescent plants, fireflies, soft mist, cozy and wondrous, never scary. "
         "Vertical portrait composition. All important things stay in the central 60% of the width. ")
SCENE = (" Across the middle of the image, slightly below center, {scene} like a wide empty stage seen from the side. On it, right of center, stands a wooden post "
         "with a hanging lantern glowing warm gold, lighting the ground around it. {bas}"
         " The stage is EMPTY: no people, no characters, no animals anywhere. No text, no UI.")
KEEP = "Keep this image exactly the same: same composition, same framing, every object in the same place. Change only this: "
NUIT = ("the hanging lantern on the wooden post is extinguished, its glass dark with no flame and no warm glow on the ground or the post. Almost no fireflies. "
        "The whole scene is dimmer, quieter and more desaturated, lit only by soft cool blue moonlight, glowing plants very faint. Still gentle and not scary. No characters, no text.")
SPR = ("isolated on a fully transparent background, no ground, no shadow, no scenery, no text. Polished painterly 3D render look for a premium children's mobile game, "
       "magical night palette, soft warm golden rim light from the right and cool blue moonlight from the left. ")
PERSO = "Single game character sprite, full body, " + SPR
OBJET = "Single game prop sprite, " + SPR

# ci : (haut du décor, scène, bas du décor)
FONDS = {
 6: ("A sandy beach cove at night, a calm sea with gentle little waves in the background, a big bright moon over the sea, purple-leaved palm trees and rounded rocks framing the sides.",
     "a wide flat stretch of smooth pale sand, with one big rounded rock on its left side,", "The lower part of the image is wet sand and shallow sparkling water with tiny waves and a few glowing sea plants."),
 7: ("A small rocky island at night with a tall white and blue striped lighthouse rising in the upper half of the image, slightly left of center. The lamp room at the top of the lighthouse is completely dark and unlit, with no beam. Starry sky, calm sea all around.",
     "a wide flat stone quay", "The lower part of the image is calm deep blue sea water with gentle waves, empty, with no boats."),
 8: ("A tropical island at night: giant palm trees, huge leaves, and in the background a tall rocky cliff that is completely dry, with a dry rocky waterfall bed and no water at all. Bright moon.",
     "a wide flat sandy clearing", "The lower part of the image is tropical foreground plants with large closed flower buds and glowing ferns."),
 9: ("A dense magical jungle at night: long vines hanging like curtains, giant leaves, one very big tree with thick branches on the left, shafts of moonlight.",
     "a wide flat mossy jungle path", "The lower part of the image is big dark foreground leaves, roots and small glowing mushrooms."),
 10: ("A vast desert at night, smooth dunes tinted blue under a huge moon and a starry sky, and in the middle distance a small oasis with a round pond and a few palm trees.",
      "a wide flat terrace of pale sand", "The lower part of the image is foreground dunes with a few dry desert plants and softly glowing stones."),
 11: ("A snowy mountain at night: white peaks, snow-covered pine trees, gentle falling snowflakes, and a large dark clear starry sky filling the upper third of the image.",
      "a wide flat snowy ledge", "The lower part of the image is soft snowdrifts, icy blue rocks and a small frozen pond."),
 12: ("A tiny pixie village at night: a dozen round mushroom houses of different sizes with little doors and round windows, all the windows completely dark and unlit, gathered on a gentle slope in the upper half of the image.",
      "a wide flat cobblestone village square", "The lower part of the image is a foreground garden with glowing flowers, clover and little fences."),
 13: ("A rolling hill at night with an old wooden windmill with four big sails standing on top of it in the upper half of the image, slightly left of center, golden wheat fields around, starry sky and moon.",
      "a wide flat dirt clearing in front of the wheat", "The lower part of the image is foreground wheat stalks, poppies and softly glowing wildflowers."),
 14: ("An enchanted orchard at night: rows of round leafy fruit trees filling the upper half of the image, loaded with many round fruits that are dull, grey-blue and not glowing at all. Moon and stars.",
      "a wide flat stretch of short grass", "The lower part of the image is foreground grass, clover, fallen leaves and small glowing mushrooms."),
 15: ("A misty magical marsh at night: still dark water, reeds and cattails, one old gnarled tree with a round hollow on the left, soft mist, moon behind thin clouds.",
      "a wide flat wooden boardwalk over the water", "The lower part of the image is still marsh water with lily pads, reeds in the corners and soft reflections."),
 16: ("The enormous trunk of a giant ancient tree filling the upper half of the image: in its bark there are many small round wooden doors, all closed and dark, with tiny staircases, little balconies and shelves of books carved into the trunk.",
      "a wide flat wooden deck built on the tree's roots", "The lower part of the image is big twisting roots, moss, ferns and small glowing mushrooms."),
 17: ("A gentle rounded sleeping volcano at night filling the upper half of the image, friendly and soft in shape, its crater completely dark with no fire, no lava and no smoke. Dark purple basalt rocks, starry sky.",
      "a wide flat slab of dark smooth stone", "The lower part of the image is dark rounded rocks with a few faintly glowing crystals and small plants."),
 18: ("High above the clouds at night: a soft sea of fluffy grey-violet clouds stretching to the horizon, a dim dark-blue sky with almost no stars, and a big pale moon far away in the upper right.",
      "a wide flat fluffy cloud", "The lower part of the image is more soft rounded clouds in the foreground, grey-violet and misty."),
 19: ("On the surface of the moon: pale silver ground with soft round craters, deep starry space above, the blue Earth visible small in the upper left of the sky. In the upper middle of the image stands a giant ornate golden lantern as tall as a house, completely dark and unlit.",
      "a wide flat stretch of smooth pale moon ground", "The lower part of the image is pale moon rocks, little craters and a few softly glowing star-shaped crystals."),
}
# ci : {nom: consigne de retouche du fond}
VARIANTES = {
 7: {"phare": "the lamp at the top of the lighthouse is now lit, shining bright warm gold, with a wide soft beam of light sweeping across the night sky and the sea."},
 8: {"cascade": "a beautiful sparkling waterfall now flows down the rocky cliff in the background, glowing turquoise and white, with mist at its base."},
 11: {"aurore": "a magnificent aurora borealis now dances across the sky in ribbons of green, pink, violet and turquoise, softly colouring the snow."},
 12: {"fenetres": "all the windows of all the mushroom houses are now lit, glowing warm gold, with soft light on the paths."},
 14: {"fruits": "all the fruits in the trees now glow brightly from inside like little lanterns, in gold, orange and pink, lighting the leaves around them."},
 16: {"portes": "all the small round doors in the tree trunk are now open, each one glowing with warm golden light from inside."},
 17: {"feu": "the volcano is gently awake: its crater glows warm orange and gold like a big friendly campfire, with a few thin glowing golden streams on its slopes and soft sparks rising. Warm light on the rocks. Gentle and festive, not scary."},
 19: {"grande": "the giant golden lantern is now lit, shining intensely warm gold and white, with long soft rays of light spreading across the moon ground and the sky."},
}
# ci : {nom: (genre, description)}
P, O = PERSO, OBJET
SPRITES = {
 6: {"coquillages": (O, "A wide low horizontal scatter of pretty seashells of different shapes on a little sand, pink, cream and turquoise, softly shining."),
     "pince": (P, "A small cute friendly red-orange crab, facing left, big kind eyes, two little raised claws, happy smile."),
     "etoiles": (O, "Five cute starfish spread in a loose horizontal group, orange, pink and yellow, softly glowing, with tiny sparkles.")},
 7: {"perle": (P, "A cute friendly green sea turtle, facing left, standing on its flippers, big kind eyes, patterned shell, gentle smile."),
     "bateaux": (O, "Three small cute wooden sailing boats in a loose horizontal row, each with a little glowing golden lantern on its mast, tiny water ripples under each hull.")},
 8: {"fleurs": (O, "A wide low horizontal cluster of big open tropical flowers, hibiscus and orchids in red, pink, orange and violet with green leaves, softly glowing."),
     "coco": (P, "A cute colourful parrot perched, facing left, red, yellow and blue feathers, big kind eyes, cheerful open beak."),
     "noix": (O, "A small pile of five brown coconuts, one of them cut open showing white inside.")},
 9: {"kiki": (P, "A cute little brown monkey sitting, facing left, cream face and belly, long curly tail, big kind eyes, happy smile."),
     "bananes": (O, "A big bunch of ripe yellow bananas on a green stem, shiny."),
     "lanternes": (O, "A wide horizontal row of six magical lantern flowers on curved green stems, their bell-shaped blossoms glowing warm orange and gold from inside like little lanterns.")},
 10: {"cactus": (O, "Three round friendly green cacti of different heights side by side, covered with open bright pink flowers."),
      "sable": (P, "A cute little fennec fox sitting, facing left, cream sandy fur, very big ears, big kind eyes, happy smile.")},
 11: {"neige": (P, "A cute chubby white polar bear cub sitting, facing left, fluffy fur, black nose, big kind eyes, happy smile."),
      "bonhomme": (O, "A cheerful little snowman with a carrot nose, a red scarf, a small blue hat and stick arms.")},
 12: {"pique": (P, "A cute little hedgehog standing, facing left, brown spines, cream face and belly, big kind eyes, happy smile."),
      "pommes": (O, "A small pile of shiny red and green apples."),
      "guirlande": (O, "A very wide horizontal string of small round fairy lights hanging in two gentle swags, the bulbs glowing gold, pink, turquoise and violet.")},
 13: {"mimi": (P, "A cute tiny grey mouse standing on its hind legs, facing left, big round ears, pink nose, big kind eyes, happy smile."),
      "ble": (O, "Three golden sheaves of wheat tied with string, standing upright side by side."),
      "vent": (O, "Soft swirling ribbons of magical wind drawn as pale blue-white curls, carrying a few small leaves and sparkles, flowing horizontally.")},
 14: {"trefle": (P, "A cute fluffy little rabbit sitting, facing left, soft beige fur, long ears, pink nose, big kind eyes, happy smile."),
      "panier": (O, "A wicker basket full of bright orange carrots with green tops.")},
 15: {"hulotte": (P, "A cute small round owl perched, facing left, brown and cream feathers, very big kind golden eyes, gentle smile."),
      "lucioles": (O, "A large loose swarm of about twenty glowing golden-green fireflies of different sizes with soft halos, spread across the whole image."),
      "roseaux": (O, "A wide horizontal row of tall reeds and cattails glowing softly turquoise and gold from inside, seen from the side.")},
 16: {"noisette": (P, "A cute red squirrel sitting, facing left, big bushy tail, holding a hazelnut, big kind eyes, happy smile."),
      "livre": (O, "A big ancient magic book lying wide open, its pages glowing bright golden light, with sparkles and tiny stars rising from it.")},
 17: {"flamme": (P, "A cute baby phoenix bird standing, facing left, feathers in red, orange and gold, small glowing tail feathers, big kind eyes, happy smile."),
      "braises": (O, "A small pile of round warm glowing embers and stones, orange and gold, with tiny sparks rising.")},
 18: {"coton": (P, "A cute little sheep made of fluffy white cloud wool, standing, facing left, soft grey face, big kind eyes, happy smile."),
      "moutons": (O, "Four tiny cute cloud sheep with fluffy white wool in a loose horizontal group, different sizes, happy."),
      "escalier": (O, "A magical staircase made of glowing golden five-pointed stars as steps, rising diagonally from lower left to upper right, with sparkles.")},
 19: {"luna": (P, "A cute fluffy white moon rabbit sitting, facing left, silvery-white fur softly glowing, long ears, a tiny star on its forehead, big kind eyes, happy smile."),
      "fleurs": (O, "A wide low horizontal row of open star-shaped flowers glowing silver, gold and pale blue on short stems, with sparkles."),
      "fete": (O, "Three bursts of joyful fireworks in gold, pink and turquoise with long sparkling trails, spread across the image.")},
}


def taches():
    t = []
    for ci, (haut, scene, bas) in FONDS.items():
        t.append({"nom": f"c{ci}_fond", "taille": "1024x1536", "prompt": STYLE + haut + SCENE.format(scene=scene, bas=bas)})
    for ci in FONDS:
        t.append({"nom": f"c{ci}_nuit", "taille": "1024x1536", "source": f"c{ci}_fond", "prompt": KEEP + NUIT})
        for nom, quoi in VARIANTES.get(ci, {}).items():
            t.append({"nom": f"c{ci}_{nom}", "taille": "1024x1536", "source": f"c{ci}_fond",
                      "prompt": KEEP + quoi + " The small lantern on the wooden post stays lit. No characters, no text."})
    for ci, d in SPRITES.items():
        for nom, (genre, quoi) in d.items():
            t.append({"nom": f"c{ci}_{nom}", "transparent": True, "prompt": genre + quoi})
    return t


if __name__ == "__main__":
    ici = os.path.dirname(os.path.abspath(__file__))
    t = taches()
    json.dump(t, open(os.path.join(ici, "..", "images", "taches_s2.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(len(t), "images")
