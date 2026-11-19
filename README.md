# La forêt des lanternes

Jeu éducatif en français pour les 4-6 ans : sons des lettres, nombres de 0 à 20, premières additions.
Vingt chapitres, un par jour, dans une forêt féerique dont il faut rallumer les lanternes.

Le jeu se joue ici : https://stanbienaives.github.io/foret-des-lanternes/

Sur iPhone ou iPad : ouvrir l'adresse dans Safari, puis Partager > « Sur l'écran d'accueil ».

## Construire

    python3 build.py              # dist/ (version publiée) et jeu.html (fichier unique)
    python3 -m http.server -d dist 8000

Chaque push sur `main` reconstruit `dist/` et le publie sur GitHub Pages.
