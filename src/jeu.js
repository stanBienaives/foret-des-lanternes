(function(){
"use strict";
/* ---------- petits outils ---------- */
const $=s=>document.querySelector(s);
function h(tag,props,...kids){
  const e=document.createElement(tag);
  if(props) for(const k in props){const v=props[k];
    if(v==null||v===false) continue;
    if(k==="class") e.className=v; else if(k==="style") e.style.cssText=v;
    else if(k.slice(0,2)==="on") e.addEventListener(k.slice(2),v);
    else e.setAttribute(k,v===true?"":v);}
  for(const c of kids.flat()){ if(c==null||c===false) continue; e.append(c.nodeType?c:document.createTextNode(c)); }
  return e;
}
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const pick=a=>a[Math.floor(Math.random()*a.length)];
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);

/* ---------- contenu ---------- */
const NUM=["zéro","un","deux","trois","quatre","cinq","six","sept","huit","neuf","dix"];
const L={
  a:{s:"a",v:1,w:[["abeille","🐝"],["avion","✈️"],["arbre","🌳"],["ananas","🍍"]]},
  i:{s:"i",v:1,w:[["île","🏝️"],["image","🖼️"]]},
  o:{s:"o",v:1,w:[["orange","🍊"],["oreille","👂"],["os","🦴"]]},
  u:{s:"u",v:1,w:[["usine","🏭"],["univers","🌌"]]},
  "é":{s:"é",v:1,w:[["étoile","⭐"],["éléphant","🐘"],["école","🏫"]]},
  l:{s:"le",w:[["lune","🌙"],["lion","🦁"],["lapin","🐰"],["livre","📖"]]},
  m:{s:"me",w:[["maison","🏠"],["mouton","🐑"],["main","✋"],["montagne","⛰️"]]},
  r:{s:"re",w:[["robot","🤖"],["renard","🦊"],["rose","🌹"]]},
  s:{s:"se",w:[["soleil","☀️"],["serpent","🐍"],["souris","🐭"]]},
  t:{s:"te",w:[["tortue","🐢"],["tigre","🐯"],["train","🚂"],["tomate","🍅"]]},
  p:{s:"pe",w:[["papillon","🦋"],["pomme","🍎"],["poisson","🐟"],["pingouin","🐧"]]},
  n:{s:"ne",w:[["nuage","☁️"],["nez","👃"]]},
  f:{s:"fe",w:[["fleur","🌸"],["fée","🧚"],["fraise","🍓"],["fourmi","🐜"]]},
  v:{s:"ve",w:[["vache","🐮"],["vélo","🚲"],["voiture","🚗"],["violon","🎻"]]},
  b:{s:"be",w:[["ballon","🎈"],["bateau","⛵"],["banane","🍌"],["bougie","🕯️"]]},
  d:{s:"de",w:[["dragon","🐉"],["dauphin","🐬"],["dinosaure","🦕"],["dé","🎲"]]},
  c:{s:"que",w:[["canard","🦆"],["cochon","🐷"],["carotte","🥕"],["coccinelle","🐞"]]},
  j:{s:"je",w:[["journal","📰"],["jus","🧃"]]},
  g:{s:"gue",w:[["gâteau","🎂"],["gorille","🦍"],["guitare","🎸"],["gant","🧤"]]},
  z:{s:"ze",w:[["zèbre","🦓"],["zéro","0️⃣"]]},
  /* saison 2 */
  "ou":{s:"ou",v:1,w:[["ours","🐻"],["outil","🔧"],["ouistiti","🐒"]]},
  "ch":{s:"che",w:[["chat","🐱"],["cheval","🐴"],["chocolat","🍫"],["chapeau","🎩"]]},
  "on":{s:"on",v:1,w:[["ongle","💅"],["onze","11"]]},
  "k":{s:"que",w:[["kangourou","🦘"],["koala","🐨"],["kiwi","🥝"]]},
  "an":{s:"an",v:1,w:[["ange","👼"],["ancre","⚓"],["antenne","📡"]]},
  "e":{s:"e",v:1,x:1,w:[["cheval","🐴"]]},
  "oi":{s:"oi",v:1,w:[["oiseau","🐦"]]},
  "qu":{s:"que",w:[["quille","🎳"],["quatre","4"]]},
  "in":{s:"in",v:1,w:[["insecte","🦗"],["infirmière","👩‍⚕️"]]},
  "y":{s:"ye",w:[["yoyo","🪀"],["yaourt","🥛"]]},
  "ai":{s:"ai",v:1,w:[["aigle","🦅"],["aimant","🧲"]]},
  "h":{s:"h",x:1,w:[["hibou","🦉"]]},
  "w":{s:"ve",w:[["wagon","🚃"]]},
  "x":{s:"x",x:1,w:[["taxi","🚕"]]}
};
const PRO=["Ce soir, Lou n’arrive pas à dormir. Par la fenêtre, une petite lumière danse. C’est Plume, la fée des lucioles.", "« Lou, j’ai besoin de toi ! Le vent a soufflé toutes les lanternes de la forêt. Sans lumière, les animaux ne retrouvent plus leur maison. » Lou enfile sa cape d’étoiles et suit Plume."];
const CH=[{"n":"La clairière des fées","intro":"Lou et Plume arrivent dans la clairière. Tout est noir. Quelqu’un pleure derrière un arbre.","outro":"Roux connaît bien la forêt. « Je viens avec vous ! » dit-il. Et les trois amis repartent.","stops":[["lettres",["a","i","o"],"La première lanterne dort. Pour la réveiller, Lou doit tracer les lettres magiques.","La lanterne s’allume ! La clairière se réveille."],["chiffres",[1,2,3],"Les fleurs de la clairière attendent qu’on les compte pour s’ouvrir.","Une, deux, trois : les fleurs s’ouvrent."],["sons",null,"Qui pleure dans le noir ? Écoute bien les sons pour le trouver.","C’est Roux, le petit renard ! Il s’était perdu."],["compte",3,"Roux a encore un peu peur. Comptons les papillons pour le consoler.","Les papillons dansent autour de Roux. Il sourit."]]},{"n":"Le ruisseau qui chante","intro":"Voici le ruisseau. D’habitude il chante, mais ce soir il se tait. Sur une pierre, quelqu’un soupire.","outro":"Le ruisseau chante à nouveau. Lou saute de nénuphar en nénuphar, et Reinette la suit.","stops":[["lettres",["u","é","l","m"],"Traçons les lettres magiques pour rallumer la lanterne du ruisseau.","La lanterne brille, et l’eau scintille."],["chiffres",[4,5],"Pour traverser, il faut des nénuphars. Apprenons leurs chiffres.","Les nénuphars remontent à la surface."],["sons",null,"Une grenouille a perdu sa chanson. Aide-la à retrouver les sons.","Reinette la grenouille chante de nouveau !"],["compte",5,"Les poissons veulent écouter Reinette. Combien sont-ils ?","Les petits poissons sautent de joie."]]},{"n":"Le pont arc-en-ciel","intro":"Au-dessus de la rivière, il y a un vieux pont. Mais l’arc-en-ciel a perdu ses couleurs. Tout est gris.","outro":"Lou traverse le pont arc-en-ciel. Pilou vole devant pour montrer le chemin.","stops":[["lettres",["r","s","t"],"Les lettres magiques vont rallumer la lanterne du pont.","La lanterne éclaire le vieux pont."],["chiffres",[6,7],"L’arc-en-ciel a sept couleurs. Apprenons à écrire six et sept.","Les couleurs reviennent, une à une !"],["sons",null,"Un oiseau siffle quelque part. Suis les sons pour le trouver.","C’est Pilou, l’oiseau bleu. Il se pose sur le pont."],["compte",7,"Les nuages cachent les étoiles. Comptons pour les faire revenir.","Les étoiles brillent de nouveau dans le ciel."],["addition",4,"Pour allumer le pont, il faut mettre les perles ensemble. C’est une addition !","Le pont s’illumine. Lou peut traverser."]]},{"n":"La grotte de cristal","intro":"Le chemin entre dans une grotte. Il fait très sombre. Au fond, deux petits yeux brillent.","outro":"Braise n’a plus peur. Il souffle une petite flamme pour éclairer le chemin.","stops":[["lettres",["p","n","f"],"Vite, les lettres magiques, pour rallumer la lanterne !","La lanterne s’allume. La grotte n’est plus si noire."],["chiffres",[8,9],"Les cristaux dorment. Écris huit et neuf pour les réveiller.","Les cristaux s’illuminent de toutes les couleurs."],["sons",null,"À qui sont ces petits yeux ? Écoute bien les sons.","C’est Braise, un bébé dragon ! Il avait peur du noir."],["compte",9,"Braise a perdu ses pierres précieuses. Comptons-les avec lui.","Braise retrouve son trésor."],["addition",5,"Additionne les perles pour ouvrir la sortie de la grotte.","La sortie s’ouvre sur un ciel plein d’étoiles."]]},{"n":"La prairie des licornes","intro":"Derrière la grotte s’étend une grande prairie. Une licorne cherche son petit dans la nuit.","outro":"Nuage s’incline devant Lou. « Montez sur mon dos, je vous emmène au château. »","stops":[["lettres",["v","b","d"],"Trace les lettres magiques pour rallumer la lanterne de la prairie.","La lanterne éclaire toute la prairie."],["chiffres",[0,10],"Les fleurs de lune s’ouvrent quand on sait écrire zéro et dix.","Dix fleurs de lune s’ouvrent dans l’herbe."],["sons",null,"La licorne appelle son petit. Écoute bien les sons.","Voici Nuage, la licorne. Elle remercie Lou."],["compte",10,"Où est le petit poulain ? Comptons jusqu’à dix pour le trouver.","Flocon, le petit poulain, dormait dans les fleurs !"],["addition",7,"Additionne les perles pour faire tomber une pluie d’étoiles.","Des étoiles filantes traversent le ciel."]]},{"n":"Le château des étoiles","intro":"Le château des étoiles est là, tout en haut. C’est ici que dort la plus grande lanterne de la forêt.","outro":"« Merci, Lou », dit Plume. « Grâce à toi, chacun a retrouvé sa maison. » Lou rentre se coucher. Dans sa chambre, une petite luciole veille sur elle.","stops":[["lettres",["c","j","g","z"],"Les dernières lettres magiques ouvrent la porte du château.","La porte s’ouvre, et les fenêtres s’éclairent."],["sons",null,"Les sons guident Lou dans le grand escalier.","Les drapeaux se lèvent sur les tours."],["addition",9,"Encore des additions pour monter tout en haut.","Tous les amis sont là : Roux, Reinette, Pilou, Braise, Nuage et Flocon."],["addition",10,"La dernière addition va rallumer la grande lanterne.","La grande étoile s’allume. Toute la forêt brille !"]]},{"n":"La plage aux coquillages","intro":"Quelques nuits plus tard, Plume revient à la fenêtre. « Lou ! Au-delà de la forêt, d’autres lanternes se sont éteintes. » Les voici sur une plage, au bord de la mer.","outro":"Pince a retrouvé son rocher. Au loin, une lumière clignote sur la mer. « C’est le phare ! » dit Plume.","stops":[["lettres",["ou","a","m"],"La lanterne de la plage dort. Traçons les lettres magiques pour la réveiller.","La lanterne s’allume ! Le sable brille comme de l’or."],["chiffres",[11,12],"La mer a caché ses coquillages. Apprenons onze et douze pour les retrouver.","Les coquillages reviennent sur le sable."],["sons",null,"Quelque chose fait clic-clac derrière un rocher. Écoute bien les sons.","C’est Pince, le petit crabe ! Il cherchait sa maison."],["compte",12,"Pince adore les étoiles de mer. Comptons-les avec lui.","Les étoiles de mer dansent au bord des vagues."]]},{"n":"Le phare endormi","intro":"Une petite barque emmène Lou jusqu’au phare. Mais sa grande lumière ne tourne plus.","outro":"Perle connaît le chemin. « Montez sur mon dos, je vous emmène sur l’île. »","stops":[["lettres",["ch","i","l"],"Trace les lettres magiques pour rallumer la lanterne du phare.","La lanterne brille au pied du phare."],["sons",null,"Quelqu’un nage tout près, sans trouver son chemin. Écoute les sons.","C’est Perle, la tortue de mer ! Elle était perdue dans le noir."],["compte",12,"Les petits bateaux attendent au large. Comptons-les pour les guider.","Les petits bateaux allument leurs lumières."],["addition",6,"Pour rallumer le phare, il faut additionner les perles.","Le phare s’allume ! Sa lumière balaie la mer."]]},{"n":"L’île aux perroquets","intro":"Sur l’île, les palmiers sont immenses. D’habitude les perroquets bavardent, mais ce soir tout est silencieux.","outro":"Coco a retrouvé sa voix. « Suivez-moi ! » crie-t-il. « Je connais le chemin de la jungle. »","stops":[["lettres",["on","o","r"],"Vite, les lettres magiques, pour réveiller la lanterne de l’île.","La lanterne s’allume sous les palmiers."],["chiffres",[13,14],"Les fleurs de l’île se sont refermées. Écris treize et quatorze pour les ouvrir.","Les grandes fleurs s’ouvrent de toutes les couleurs."],["sons",null,"Qui se cache dans les feuilles ? Suis les sons.","C’est Coco, le perroquet ! Il avait perdu sa voix."],["compte",14,"Coco a faim. Comptons les noix de coco avec lui.","Les noix de coco roulent jusqu’à Coco."],["addition",7,"Additionne les perles pour réveiller la cascade.","La cascade coule de nouveau, toute scintillante."]]},{"n":"La jungle des lianes","intro":"Dans la jungle, les lianes pendent comme des rideaux. Tout là-haut, quelqu’un a peur de descendre.","outro":"Kiki saute de liane en liane. Derrière la jungle, l’air devient chaud. Voici le désert.","stops":[["lettres",["k","u","s"],"Trace les lettres magiques pour rallumer la lanterne de la jungle.","La lanterne éclaire les grandes feuilles."],["sons",null,"Qui est coincé en haut de l’arbre ? Écoute bien les sons.","C’est Kiki, le petit singe ! Il n’osait plus bouger dans le noir."],["compte",14,"Kiki voudrait des bananes. Comptons-les ensemble.","Un beau régime de bananes pour Kiki !"],["addition",8,"Additionne les perles pour allumer les fleurs-lanternes.","Les fleurs-lanternes s’allument le long du chemin."]]},{"n":"L’oasis du désert","intro":"Le désert est immense et tout bleu sous la lune. Au milieu des dunes, une oasis attend sa lumière.","outro":"Sable a bu toute l’eau qu’il voulait. Il montre une montagne au loin. « Là-haut, il y a de la neige ! »","stops":[["lettres",["an","é","t"],"Les lettres magiques vont rallumer la lanterne de l’oasis.","La lanterne s’allume. L’eau de l’oasis brille."],["chiffres",[15,16],"Les cactus fleurissent quand on sait écrire quinze et seize.","Les cactus se couvrent de fleurs roses."],["sons",null,"Deux grandes oreilles dépassent d’une dune. Écoute les sons.","C’est Sable, le petit fennec ! Il cherchait de l’eau."],["compte",16,"Les étoiles du désert sont très nombreuses. Comptons-les.","Le ciel du désert se remplit d’étoiles."]]},{"n":"La montagne enneigée","intro":"Il neige sur la montagne. Tout est blanc et silencieux. Dans la neige, il y a de petites traces de pattes.","outro":"Neige rentre dans sa tanière, bien au chaud. Lou glisse sur la neige jusqu’en bas de la montagne.","stops":[["lettres",["e","p","n"],"Trace les lettres magiques pour rallumer la lanterne de la montagne.","La lanterne s’allume, et la neige devient dorée."],["sons",null,"À qui sont ces traces de pattes ? Suis les sons.","C’est Neige, l’ourson blanc ! Il s’était éloigné de sa tanière."],["compte",16,"Neige veut faire un bonhomme de neige. Comptons les boules.","Un joli bonhomme de neige sourit à côté de Neige."],["addition",9,"Additionne les perles pour rallumer le ciel.","Une aurore de toutes les couleurs danse dans le ciel."]]},{"n":"Le village des lutins","intro":"En bas de la montagne, il y a un tout petit village. Les maisons sont des champignons, mais leurs fenêtres sont noires.","outro":"Tout le village fait la fête. Pique montre un chemin. « Par là, il y a le moulin. »","stops":[["lettres",["oi","f","v"],"Les lettres magiques vont rallumer la lanterne du village.","La lanterne s’allume sur la place du village."],["chiffres",[17,18],"Pour réveiller les maisons, écrivons dix-sept et dix-huit.","Les fenêtres des maisons s’allument une à une."],["sons",null,"Une petite boule pleine de piquants roule sur le chemin. Écoute les sons.","C’est Pique, le hérisson ! Il ne retrouvait plus sa porte."],["compte",18,"Pique a perdu ses pommes en roulant. Comptons-les.","Pique retrouve toutes ses pommes."],["addition",10,"Additionne les perles pour allumer les guirlandes.","Des guirlandes de lumière brillent au-dessus du village."]]},{"n":"Le moulin à vent","intro":"Sur la colline, le vieux moulin ne tourne plus. Le vent s’est endormi avec les lanternes.","outro":"Le moulin tourne, et Mimi aura de la farine. Le vent pousse doucement Lou vers le verger.","stops":[["lettres",["qu","b","d"],"Trace les lettres magiques pour rallumer la lanterne du moulin.","La lanterne s’allume devant le moulin."],["sons",null,"Quelqu’un grignote dans un sac de blé. Écoute les sons.","C’est Mimi, la petite souris ! Elle attendait que le moulin tourne."],["compte",18,"Mimi range ses épis de blé. Comptons-les avec elle.","Les épis de blé sont bien rangés."],["addition",10,"Additionne les perles pour réveiller le vent.","Le vent se lève, et les ailes du moulin tournent !"]]},{"n":"Le verger enchanté","intro":"Dans le verger, les arbres dorment. Leurs fruits ne brillent plus. Dans l’herbe, deux longues oreilles tremblent.","outro":"Trèfle croque une carotte. « Merci Lou ! Va voir le marais, les lucioles ont besoin de toi. »","stops":[["lettres",["in","c","j"],"Les lettres magiques vont rallumer la lanterne du verger.","La lanterne s’allume entre les arbres."],["chiffres",[19,20],"Les fruits magiques brillent quand on sait écrire dix-neuf et vingt.","Les fruits s’allument comme de petites lanternes."],["sons",null,"À qui sont ces longues oreilles ? Écoute les sons.","C’est Trèfle, le lapin ! Il avait peur du noir."],["compte",20,"Trèfle a planté des carottes. Comptons-les jusqu’à vingt.","Un beau panier de carottes pour Trèfle !"]]},{"n":"Le marais des lucioles","intro":"Le marais est le pays de Plume. D’habitude, mille lucioles y dansent. Ce soir, pas une seule lumière.","outro":"Plume retrouve toutes ses sœurs lucioles. « Viens, Lou. Je vais te montrer le grand arbre. »","stops":[["lettres",["y","g","z"],"Trace les lettres magiques pour rallumer la lanterne du marais.","La lanterne s’allume au bord de l’eau."],["sons",null,"Quelqu’un fait « hou, hou » dans un vieil arbre. Écoute les sons.","C’est Hulotte, la chouette ! Elle veillait sur les lucioles endormies."],["compte",20,"Les lucioles se réveillent quand on les compte.","Les lucioles s’envolent par dizaines."],["addition",10,"Additionne les perles pour réveiller les roseaux.","Les roseaux s’illuminent tout autour du marais."]]},{"n":"Le grand arbre","intro":"Au cœur de la forêt pousse un arbre géant. Dans son tronc, il y a des portes, des escaliers et des livres.","outro":"Dans le grand livre, Lou voit une image : un volcan endormi. « Allons-y ! » dit Plume.","stops":[["lettres",["ai","ou","ch"],"Les lettres magiques vont rallumer la lanterne du grand arbre.","La lanterne s’allume au pied du grand arbre."],["chiffres",[12,15,20],"Les portes de l’arbre ont des numéros. Retrouvons douze, quinze et vingt.","Les petites portes s’ouvrent, pleines de lumière."],["sons",null,"Quelqu’un fait tomber des noisettes. Écoute les sons.","C’est Noisette, l’écureuil ! Elle garde les livres de la forêt."],["addition",10,"Additionne les perles pour ouvrir le grand livre.","Le grand livre s’ouvre, et ses pages brillent."]]},{"n":"Le volcan endormi","intro":"Le volcan dort depuis longtemps. Il ne fait pas peur : il est tout doux et tout chaud. Mais son feu s’est éteint.","outro":"Flamme a retrouvé ses belles couleurs. Il ouvre ses ailes. « Montez ! Je vous emmène au-dessus des nuages. »","stops":[["lettres",["h","on","an"],"Trace les lettres magiques pour rallumer la lanterne du volcan.","La lanterne s’allume sur les pierres noires."],["sons",null,"Un petit oiseau grelotte près du volcan. Écoute les sons.","C’est Flamme, le petit phénix ! Sans feu, il avait froid."],["compte",20,"Flamme a besoin de braises. Comptons-les jusqu’à vingt.","Les braises rougeoient autour de Flamme."],["addition",10,"Additionne les perles pour réchauffer le volcan.","Le volcan se réveille doucement. Il brille comme un grand feu de joie."]]},{"n":"Le pays des nuages","intro":"Au-dessus des nuages, tout est doux comme du coton. Mais les étoiles se sont cachées, et les nuages sont tout gris.","outro":"Coton saute de nuage en nuage. Lou monte l’escalier d’étoiles, une marche après l’autre.","stops":[["lettres",["w","oi","in"],"Les lettres magiques vont rallumer la lanterne des nuages.","La lanterne s’allume, et les nuages deviennent roses."],["chiffres",[11,17,19],"Les étoiles reviennent quand on sait écrire onze, dix-sept et dix-neuf.","Les étoiles se rallument tout près de Lou."],["sons",null,"Quelque chose de tout doux fait « bê, bê ». Écoute les sons.","C’est Coton, le petit mouton des nuages ! Il cherchait son troupeau."],["compte",20,"Comptons les moutons des nuages avec Coton.","Tous les moutons des nuages sont revenus."],["addition",10,"Additionne les perles pour construire l’escalier de la lune.","Un escalier d’étoiles monte jusqu’à la lune."]]},{"n":"La lune","intro":"Lou est arrivée sur la lune ! C’est ici que dort la lanterne de toutes les lanternes. D’en haut, on voit le monde entier.","outro":"« Bravo, Lou », dit Plume. « Tu sais tracer, compter et écouter. Toutes les lanternes du monde brillent grâce à toi. » Lou rentre se coucher, le cœur plein d’étoiles. Bonne nuit, Lou.","stops":[["lettres",["x","ai","qu"],"Trace les dernières lettres magiques pour rallumer la lanterne de la lune.","La petite lanterne s’allume sur la lune."],["sons",null,"Quelqu’un saute tout doucement entre les cratères. Écoute les sons.","C’est Luna, le lapin de la lune ! Elle garde la grande lanterne."],["compte",20,"Luna a semé des fleurs d’étoiles. Comptons-les jusqu’à vingt.","Les fleurs d’étoiles s’ouvrent sur la lune."],["addition",10,"Encore une addition pour réveiller la grande lanterne.","La grande lanterne de la lune se réveille."],["addition",10,"La dernière addition va envoyer la lumière partout.","La lumière descend sur le monde entier. Toutes les lanternes brillent, et le ciel est en fête !"]]}];
const LABEL={lettres:"Lettres",chiffres:"Chiffres",sons:"Sons",compte:"Compter",addition:"Additions"};
const STOPS=[];
(function(){let pool=[],maxN=0;
  CH.forEach((c,ci)=>{const letters=c.stops.find(s=>s[0]==="lettres")[1];pool=[...pool,...letters];
    c.stops.forEach((s,si)=>{ if(s[0]==="chiffres") maxN=Math.max(maxN,...s[1]);
      STOPS.push({id:ci+"-"+si,ci,si,pre:s[2],rw:s[3],t:s[0],a:s[0]==="sons"?letters:s[1],pool:[...pool],maxN,last:si===c.stops.length-1});});});
})();
const OBJ=[["🦋","papillons"],["🍄","champignons"],["⭐","étoiles"],["🌷","fleurs"],["🐞","coccinelles"],["🐸","grenouilles"]];
const BEAD=["","#d6352b","#3aa655","#f29ab8","#f2cf3a","#6ec3ea","#9a62c4","#f6f4ee","#8a5a3a","#2b4ea3","#e8b53a"];

/* @inclure images/scenes.js */

/* ---------- sauvegarde ---------- */
const KEY="foret-de-plume-v1";
const today=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");};
const S={name:"Lou",lim:"chapitre",chap:"",minutes:15,style:"script",sound:true,vm:"auto",vname:"",unlock:false,done:{},epoch:0,day:today(),used:0,bonus:0,ts:0,seen:false};
function rollDay(){ if(S.day!==today()){S.day=today();S.used=0;S.bonus=0;return true;} return false; }
function saveLocal(){ try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){} }
try{const r=JSON.parse(localStorage.getItem(KEY));if(r&&typeof r==="object")Object.assign(S,r);}catch(e){}
if(!S.done||typeof S.done!=="object") S.done={};
rollDay();

let ref=null,writing=false,dirty=false;
function merge(r){
  if(!r||typeof r!=="object") return;
  const re=+r.epoch||0, le=+S.epoch||0, rd=(r.done&&typeof r.done==="object")?r.done:{};
  if(re>le){S.done={...rd};S.epoch=re;}
  else if(re===le){for(const k in rd) S.done[k]=Math.max(S.done[k]||0,rd[k]|0);}
  if((+r.ts||0)>(+S.ts||0)){for(const k of ["name","lim","minutes","style","sound","vm","vname","unlock","ts"]) if(k in r) S[k]=r[k];}
  if(r.day===S.day){S.used=Math.max(S.used,r.used|0);S.bonus=Math.max(S.bonus,r.bonus|0);}
  S.seen=S.seen||!!r.seen; if(typeof r.chap==="string"&&r.chap>(S.chap||"")) S.chap=r.chap;
  saveLocal();
}
async function pushRemote(){
  if(!ref) return;
  if(writing){dirty=true;return;}
  writing=true;
  try{await ref.set(JSON.parse(JSON.stringify(S)));}
  catch(e){ if(e&&(e.code==="invalid_argument"||e.code==="revoked"||e.code==="not_granted")) ref=null; }
  writing=false;
  if(dirty){dirty=false;pushRemote();}
}
async function initRemote(){
  try{
    if(!window.claude||typeof window.claude.use!=="function") return;
    const [db,user]=await Promise.all([window.claude.use("db"),window.claude.use("user")]);
    if(!db||!user) return;
    const id=await user.id(); if(!id) return;
    const r=db.doc("data/users/"+id+"/sauvegarde");
    const snap=await r.get();
    ref=r;
    if(snap.exists){merge(snap.data());applyStyle();updateSun();if(screen==="start")showStart();else if(screen==="map")showMap();}
    else pushRemote();
  }catch(e){}
}

/* ---------- voix et sons ---------- */
let ac=null,playing=[],sayTok=0;const bufs={};
let unmute=null;
function keepAlive(){
  try{
    if(!unmute){const n=4000,u=new Uint8Array(44+n),dv=new DataView(u.buffer),put=(o,t)=>{for(let i=0;i<t.length;i++)u[o+i]=t.charCodeAt(i);};
      put(0,"RIFF");dv.setUint32(4,36+n,true);put(8,"WAVEfmt ");dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,1,true);
      dv.setUint32(24,8000,true);dv.setUint32(28,8000,true);dv.setUint16(32,1,true);dv.setUint16(34,8,true);put(36,"data");dv.setUint32(40,n,true);u.fill(128,44);
      let b="";for(let i=0;i<u.length;i++)b+=String.fromCharCode(u[i]);
      unmute=new Audio("data:audio/wav;base64,"+btoa(b));unmute.loop=true;unmute.setAttribute("playsinline","");unmute.setAttribute("x-webkit-airplay","deny");}
    if(unmute.paused){const p=unmute.play();if(p&&p.catch)p.catch(()=>{});}
  }catch(e){}
}
function ctx(){keepAlive();if(!ac){try{if(navigator.audioSession)navigator.audioSession.type="playback";}catch(e){}ac=new (window.AudioContext||window.webkitAudioContext)();}if(ac.state==="suspended")ac.resume();return ac;}
/* Deux modes : fichier unique (window.CLIPS = { id: [durée, mp3 en base64] }) ou fichiers séparés
   (window.DUR = { id: durée }, son dans audio/<nom>.mp3, chargé à la demande). */
const DUR=window.DUR||{};
const clipFile=id=>"audio/"+id.replace(/[^\x00-\x7f]/g,c=>"~"+c.charCodeAt(0).toString(16))+".mp3"+(VER.a[id]?"?"+VER.a[id]:"");
function loadClip(id){
  if(bufs[id]) return bufs[id];
  const c=(window.CLIPS||{})[id]; if(!c&&!(id in DUR)) return Promise.resolve(null);
  return bufs[id]=new Promise(res=>{try{
    const dec=buf=>{const pr=ctx().decodeAudioData(buf,res,()=>res(null));if(pr&&pr.catch)pr.catch(()=>res(null));};
    if(c){const bin=atob(c[1]),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);dec(u.buffer);}
    else fetch(clipFile(id)).then(r=>r.ok?r.arrayBuffer():Promise.reject()).then(dec).catch(()=>{delete bufs[id];res(null);});
  }catch(e){res(null);}});
}
/* charge d'avance les sons d'une étape, pour que la voix parte sans délai */
function precharge(st){
  const ids=["g_q","g_oui","g_perles","g_doigt_l","g_doigt_n","g_sac","g_bravo","encore","encorep","barre","sac",`rw_${st.ci}_${st.si}`];
  const let_=l=>{ids.push("tl_"+l,"ml_"+l,"oui_"+l,"ca_"+l,"cp_"+l,"qm_"+l);L[l].w.forEach((_,i)=>ids.push(`w_${l}_${i}`,`ok_${l}_${i}`));};
  const num=n=>ids.push("n"+n,"tn_"+n,"mn_"+n,"ouin_"+n,"can_"+n);
  if(st.t==="lettres") st.a.forEach(let_); else if(st.t==="sons") st.a.forEach(let_);
  else if(st.t==="chiffres") st.a.forEach(num); else for(let n=1;n<=Math.min(20,st.t==="compte"?st.a:10);n++) num(n);
  ids.forEach(id=>{if(id in DUR) loadClip(id);});
}
const flat=ids=>[].concat(ids).flat().filter(Boolean);
const clipDur=ids=>flat(ids).reduce((t,id)=>t+(((window.CLIPS||{})[id]||[DUR[id]||1.5])[0]+.15),0);
function hush(){sayTok++;playing.forEach(x=>{try{x.stop();}catch(e){}});playing=[];}
async function say(...ids){
  ids=flat(ids);hush();
  if(S.vm==="off"||!ids.length) return;
  const t=sayTok;
  try{ctx();const bs=await Promise.all(ids.map(loadClip));if(t!==sayTok) return;
    let when=ac.currentTime+.04;
    for(const b of bs){if(!b)continue;const src=ac.createBufferSource();src.buffer=b;src.connect(ac.destination);src.start(when);when+=b.duration+.15;playing.push(src);}
  }catch(e){}
}
function tone(f,d,type,g,when){
  if(!S.sound) return;
  try{ctx();const o=ac.createOscillator(),a=ac.createGain(),st=ac.currentTime+(when||0);
    o.type=type||"sine";o.frequency.value=f;a.gain.setValueAtTime(.0001,st);a.gain.linearRampToValueAtTime(g||.1,st+.02);
    a.gain.exponentialRampToValueAtTime(.0001,st+d);o.connect(a);a.connect(ac.destination);o.start(st);o.stop(st+d+.05);}catch(e){}
}
const fx={
  pop:()=>tone(660,.12,"triangle",.07),
  ok:()=>{tone(784,.25,"sine",.1);tone(1047,.35,"sine",.1,.12);tone(1319,.5,"sine",.09,.26);},
  no:()=>tone(233,.22,"sine",.06),
  win:()=>[523,659,784,1047,1319].forEach((f,i)=>tone(f,.45,"triangle",.09,i*.11))
};

/* ---------- temps de jeu ---------- */
/* limite du jour : "chapitre" = Plume va dormir quand un chapitre vient d'être terminé (S.chap = ce jour-là),
   "temps" = durée S.minutes (0 = sans limite), l'étape en cours se termine. */
const parTemps=()=>S.lim==="temps";
const limit=()=>parTemps()&&S.minutes>0?S.minutes*60+S.bonus:Infinity;
const timeUp=()=>parTemps()?S.used>=limit():S.chap===today();
const hardUp=()=>parTemps()&&S.used>=limit()+180;
function updateSun(){const el=$("#sun");if(limit()===Infinity){el.style.visibility="hidden";return;}
  el.style.visibility="";el.style.setProperty("--p",Math.max(0,Math.min(1,S.used/limit())).toFixed(3));}
setInterval(()=>{
  if(document.visibilityState!=="visible") return;
  if(rollDay()){saveLocal();updateSun();if(screen==="sleep")showStart();return;}
  if(screen==="map"||screen==="play"||screen==="story"){
    S.used++; if(S.used%5===0) saveLocal(); updateSun();
    if(screen==="map"&&timeUp()) showSleep();
  }
},1000);
document.addEventListener("visibilitychange",()=>{
  if(document.visibilityState==="hidden"){hush();try{if(unmute)unmute.pause();}catch(e){}saveLocal();pushRemote();}
  else{ if(rollDay()&&screen==="sleep") showStart(); updateSun(); }
});

/* ---------- écrans ---------- */
let screen="start", cur=null, tok=0;
const view=$("#view");
const fmt=l=>S.style==="maj"?String(l).toUpperCase():String(l);
function applyStyle(){document.body.dataset.style=S.style;}
function setScreen(n,...kids){screen=n;tok++;hush();$("#home").hidden=(n!=="play");view.replaceChildren(...kids);view.scrollTop=0;}
const doneCount=()=>STOPS.filter(s=>S.done[s.id]).length;
const curIndex=()=>{const i=STOPS.findIndex(s=>!S.done[s.id]);return i<0?STOPS.length:i;};
const unlocked=i=>S.unlock||i===0||!!S.done[STOPS[i].id]||!!S.done[STOPS[i-1].id];

function flies(n){const out=[];for(let i=0;i<n;i++){const a=Math.PI*(.9+Math.random()*1.2),r=105+Math.random()*45;
  out.push(h("i",{class:"fly",style:`left:${85+Math.cos(a)*r}px;top:${85+Math.sin(a)*r}px;--tx:${(Math.random()*40-20).toFixed(0)}px;--ty:${(Math.random()*40-20).toFixed(0)}px;animation-delay:${(-Math.random()*6).toFixed(1)}s`}));}
  return out;}

const T=t=>{const n=(S.name||"").trim();return n&&n!=="Lou"?t.replace(/\bLou\b/g,n):t;};
const gotOf=ci=>new Set(STOPS.filter(s=>s.ci===ci&&S.done[s.id]).map(s=>s.si));
function sceneBox(ci,got,pop,tag,props){const im=hasDecor(ci),b=h(tag||"div",Object.assign({class:"scwrap"+(im?" crop":"")},props||{}));b.innerHTML=(im?decorHTML:sceneSVG)(ci,got,pop==null?-1:pop,true);if(im&&DECORS[ci].mt)b.firstChild.style.marginTop=DECORS[ci].mt+"%";return b;}
/* décor plein écran derrière l'interface, pour les chapitres illustrés ; flou = en retrait derrière une activité */
const decorEl=$("#decor");let decorKey="";
function decor(ci,got,pop,flou){
  const on=ci>=0&&hasDecor(ci);
  if(on) document.documentElement.dataset.theme="dark"; else delete document.documentElement.dataset.theme;
  decorEl.classList.toggle("on",on);decorEl.classList.toggle("flou",!!flou);
  if(!on){decorKey="";decorEl.replaceChildren();return false;}
  const key=ci+"|"+[...got].sort().join(",");
  if(key!==decorKey||pop>=0){decorKey=key;decorEl.innerHTML=decorHTML(ci,got,pop==null?-1:pop);decorEl.style.setProperty("--fondimg",`url(${imgSrc(DECORS[ci].fond)})`);}
  return true;
}
addEventListener("pointermove",e=>{decorEl.style.setProperty("--px",(e.clientX/innerWidth*2-1).toFixed(2));decorEl.style.setProperty("--py",(e.clientY/innerHeight*2-1).toFixed(2));},{passive:true});
function storyPages(pages,onEnd){
  let i=0;
  const show=()=>{const p=pages[i],im=decor(p.ci,p.got,p.pop);
    setScreen("story",h("section",{class:"story"+(im?" imm":"")},
      im?null:sceneBox(p.ci,p.got,p.pop),
      h("div",{class:"storytext"},h("button",{class:"ico","aria-label":"Réécouter",onclick:()=>say(p.clip)},"🔊"),h("p",null,T(p.text))),
      h("button",{class:"big",onclick:()=>{fx.pop();i++;if(i<pages.length)show();else onEnd();}},p.btn||"Continuer")));
    if(p.win)fx.win();
    const t=tok;setTimeout(()=>{if(t===tok)say(p.clip);},p.win?750:300);
  };
  show();
}
function showStart(){
  const ci=Math.min(curIndex()<STOPS.length?STOPS[curIndex()].ci:CH.length-1,CH.length-1);
  const im=decor(ci,gotOf(ci));
  setScreen("start",h("section",{class:"story"+(im?" imm titre":"")},
    im?null:sceneBox(ci,gotOf(ci)),
    h("h1",null,T("Lou et la forêt des lanternes")),
    h("button",{class:"big",onclick:()=>{
      fx.pop();
      if(timeUp()) return showSleep();
      if(!S.seen){
        storyPages(PRO.map((t,k)=>({ci:0,got:new Set(),text:t,clip:"pro_"+k})),()=>{S.seen=true;saveLocal();pushRemote();showMap();say("touche");});
      }else{showMap();say((S.name||"").trim().toLowerCase()==="lou"?"bonjour_lou":"bonjour","touche");}
    }},doneCount()?"Continuer l’histoire":"Commencer l’histoire")));
}

function showMap(){
  if(timeUp()) return showSleep();
  const ci=curIndex(),book=h("div",{class:"book"});let nowEl=null;
  CH.forEach((c,k)=>{
    const stops=STOPS.filter(s=>s.ci===k),first=STOPS.indexOf(stops[0]),open=unlocked(first)||stops.some(s=>S.done[s.id]);
    const row=h("div",{class:"stops"},stops.map(st=>{const i=STOPS.indexOf(st);
      const state=S.done[st.id]?"done":(i===ci?"now":(unlocked(i)?"":"locked"));
      const icon=st.t==="lettres"?h("span",{class:"gl"},fmt(st.a[0])):st.t==="chiffres"?h("span",{class:"nm"},String(st.a[0])):st.t==="sons"?"👂":st.t==="compte"?"🦋":h("span",{class:"nm"},"+");
      const b=h("button",{class:"node","aria-label":LABEL[st.t]+(state==="locked"?" (pas encore ouvert)":""),onclick:()=>{
        if(!unlocked(i)){b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake");fx.no();say("pasencore");return;}
        if(S.done[st.id]) return startStop(st);
        const pages=[];
        if(st.si===0) pages.push({ci:k,got:gotOf(k),text:c.intro,clip:"in_"+k});
        pages.push({ci:k,got:gotOf(k),text:st.pre,clip:`pre_${k}_${st.si}`,btn:"C’est parti !"});
        storyPages(pages,()=>startStop(st));
      }},icon);
      const el=h("div",{class:"stop "+state},b);if(i===ci)nowEl=el;return el;}));
    book.append(h("section",{class:"chapter"+(open?"":" closed")},
      sceneBox(k,gotOf(k),null,"button",{"aria-label":c.n,onclick:()=>{if(open)say("in_"+k);else{fx.no();say("pasencore");}}}),
      h("h3",null,`${k+1}. ${c.n}`),row));
  });
  const cc=ci<STOPS.length?STOPS[ci].ci:CH.length-1;decor(cc,gotOf(cc),null,true);
  setScreen("map",
    h("div",{class:"maphead"},h("h2",null,T("Le livre de Lou")),h("small",null,`${doneCount()} lanternes sur ${STOPS.length}`)),
    book);
  requestAnimationFrame(()=>{if(nowEl&&ci>0)nowEl.closest(".chapter").scrollIntoView({block:"center"});});
}

function showSleep(){
  saveLocal();pushRemote();decor(-1);
  setScreen("sleep",h("section",{class:"center"},
    h("div",{class:"orb dim"},"🌙"),
    h("h1",null,"À demain !"),
    h("p",{class:"note"},T("Plume va dormir. Les lanternes attendent Lou demain."))));
  say("dodo");
}

/* ---------- déroulement d’une étape ---------- */
function near(n,lo,hi){const c=shuffle([n-1,n+1,n-2,n+2,n+3,n-3].filter(x=>x>=lo&&x<=hi));return shuffle([n,...c.slice(0,2)]);}
function buildRounds(st){
  const R=[];
  if(st.t==="lettres"){
    st.a.forEach(l=>R.push({k:"trace",kind:"letter",g:l}));
    shuffle(st.a).slice(0,3).forEach(l=>R.push({k:"montreL",l,set:st.a}));
  }else if(st.t==="chiffres"){
    st.a.forEach(n=>R.push({k:"trace",kind:"num",g:n}));
    st.a.forEach(n=>R.push({k:"montreN",n,max:st.maxN}));
    R.push({k:"montreN",n:pick(st.a),max:st.maxN});
  }else if(st.t==="sons"){
    const others=shuffle(st.pool.filter(l=>!st.a.includes(l)&&!L[l].x));
    const ls=[...shuffle(st.a.filter(l=>!L[l].x)),...others].slice(0,5);
    shuffle(ls).forEach((l,i)=>R.push({k:i%2?"sonB":"sonA",l,pool:st.pool}));
  }else if(st.t==="compte"){
    const all=[];for(let n=st.a>10?st.a-6:1;n<=st.a;n++)all.push(n);
    let ns=shuffle(all).slice(0,5);while(ns.length<5)ns.push(pick(all));
    const kinds=shuffle(["obj","barre","donne","obj","donne"]);
    ns.forEach((n,i)=>R.push({k:n>10?"obj":kinds[i],n,max:st.a}));  // au-delà de 10, seuls les objets à toucher tiennent à l'écran
  }else{
    const pairs=[];for(let a=1;a<st.a;a++)for(let b=1;a+b<=st.a;b++)pairs.push([a,b]);
    shuffle(pairs).slice(0,5).forEach(p=>R.push({k:"add",a:p[0],b:p[1]}));
  }
  return R;
}
function startStop(st){
  if(timeUp()) return showSleep();
  cur={st,R:buildRounds(st),i:0,voice:""};decor(st.ci,gotOf(st.ci),null,true);precharge(st);
  setScreen("play",h("section",{class:"play"},
    h("div",{class:"dots",id:"dots"},cur.R.map(()=>h("i"))),
    h("div",{class:"instr"},h("button",{class:"ico","aria-label":"Réécouter la consigne",onclick:()=>say(cur.voice)},"🔊"),h("p",{id:"instr"})),
    h("div",{id:"stage"})));
  nextRound();
}
function paintDots(){[...$("#dots").children].forEach((d,k)=>d.classList.toggle("on",k<cur.i));}
function instr(txt,ids){$("#instr").textContent=txt;cur.voice=ids;say(ids);}
function roundDone(spoken){
  cur.i++;paintDots();const t=tok;
  setTimeout(()=>{if(tok===t&&screen==="play")nextRound();},Math.min(7000,900+clipDur(spoken||[])*1000));
}
function nextRound(){
  if(hardUp()) return showSleep();
  if(cur.i>=cur.R.length) return finishStop();
  const r=cur.R[cur.i],stage=$("#stage");stage.replaceChildren();
  RENDER[r.k](r,stage);
}
function finishStop(){
  const st=cur.st,first=!S.done[st.id],c=CH[st.ci];
  S.done[st.id]=(S.done[st.id]||0)+1;
  if(first&&st.last&&!parTemps()) S.chap=today();
  saveLocal();pushRemote();
  const up=timeUp(),pages=[];
  if(first){
    pages.push({ci:st.ci,got:gotOf(st.ci),pop:st.si,text:st.rw,clip:`rw_${st.ci}_${st.si}`,win:true});
    if(st.last) pages.push({ci:st.ci,got:gotOf(st.ci),text:c.outro,clip:"out_"+st.ci});
  }else pages.push({ci:st.ci,got:gotOf(st.ci),text:"Bravo !",clip:"g_bravo",win:true});
  storyPages(pages,()=>{up?showSleep():showMap();});
}

/* ---------- activités ---------- */
const letTile=l=>({node:h("span",{class:"gl"},fmt(l)),cls:L[l].v?"vo":"co"});
const numTile=n=>({node:h("span",{class:"nm"},String(n)),cls:"nu"});
function choices(stage,top,opts,okSay,onOk){
  let locked=false;const row=h("div",{class:"choices"});
  opts.forEach(o=>{const b=h("button",{class:"tile "+(o.cls||""),"aria-label":o.label||null,onclick:()=>{
    if(locked||b.disabled) return;
    if(o.ok){locked=true;b.classList.add("good");fx.ok();say(okSay);if(onOk)onOk();roundDone(okSay);}
    else{b.classList.add("nope");b.disabled=true;fx.no();say(o.wrong);}
  }},o.node);row.append(b);});
  stage.append(top||"",row);
}
function seqCount(els){let c=0;const tap=()=>{if(c>=els.length){els.forEach(e=>e.classList.remove("on"));c=0;}
  els[c].classList.add("on");c++;fx.pop();say("n"+c);};els.forEach(e=>e.addEventListener("click",tap));}

/* leurres pour les exercices de sons : jamais la bonne lettre, ni une lettre de même son (c, k, qu), ni une lettre sans mot */
const leurres=(l,pool)=>pool.filter(x=>x!==l&&!L[x].x&&L[x].s!==L[l].s);
const RENDER={
  montreL(r,stage){
    instr(`Montre-moi « ${fmt(r.l)} ».`,"ml_"+r.l);
    choices(stage,null,shuffle(r.set).map(l=>({...letTile(l),ok:l===r.l,wrong:"ca_"+l})),"oui_"+r.l);
  },
  montreN(r,stage){
    instr(`Montre-moi le ${r.n}.`,"mn_"+r.n);
    choices(stage,null,near(r.n,r.max>=10?0:1,Math.max(r.max,3)).map(n=>({...numTile(n),ok:n===r.n,wrong:"can_"+n})),"ouin_"+r.n);
  },
  sonA(r,stage){
    const wi=Math.floor(Math.random()*L[r.l].w.length),[mot,em]=L[r.l].w[wi];
    instr(`${cap(mot)}. Par quel son commence ce mot ?`,[`w_${r.l}_${wi}`,"g_q"]);
    const top=h("button",{class:"show em","aria-label":mot,onclick:()=>say(`w_${r.l}_${wi}`)},em);
    const ls=shuffle([r.l,...shuffle(leurres(r.l,r.pool)).slice(0,2)]);
    choices(stage,top,ls.map(l=>({...letTile(l),ok:l===r.l,wrong:"ca_"+l})),`ok_${r.l}_${wi}`);
  },
  sonB(r,stage){
    const ls=shuffle([r.l,...shuffle(leurres(r.l,r.pool)).slice(0,2)]);
    const ws=ls.map(l=>{const wi=Math.floor(Math.random()*L[l].w.length);return {l,wi,w:L[l].w[wi]};});
    const good=ws.find(x=>x.l===r.l);
    instr(`Quel mot commence par « ${fmt(r.l)} » ?`,["qm_"+r.l,...ws.map(x=>`w_${x.l}_${x.wi}`)]);
    const top=h("div",{class:"show "+(L[r.l].v?"vo":"co")},h("span",{class:"gl"},fmt(r.l)));
    choices(stage,top,ws.map(x=>({node:x.w[1],cls:"em",label:x.w[0],ok:x.l===r.l,wrong:[`w_${x.l}_${x.wi}`,"cp_"+x.l]})),["g_oui",`ok_${r.l}_${good.wi}`]);
  },
  obj(r,stage){
    const oi=Math.floor(Math.random()*OBJ.length),[em,nom]=OBJ[oi];let c=0;
    instr(`Combien de ${nom} ? Touche-les pour compter.`,"obj_"+oi);
    const field=h("div",{class:"field"+(r.n>10?" petit":"")});
    for(let i=0;i<r.n;i++) field.append(h("button",{class:"thing","aria-label":nom,onclick:ev=>{const b=ev.currentTarget;if(b.classList.contains("on"))return;
      c++;b.classList.add("on");b.dataset.n=c;fx.pop();say("n"+c);}},em));
    choices(stage,field,near(r.n,1,Math.max(r.max,3)).map(n=>({...numTile(n),ok:n===r.n,wrong:"encore"})),"ouin_"+r.n);
  },
  barre(r,stage){
    instr("Combien de morceaux a la barre ? Touche-la pour compter.","barre");
    const segs=[];for(let i=0;i<r.n;i++)segs.push(h("button",{"aria-label":"morceau"}));
    seqCount(segs);
    choices(stage,h("div",{class:"rod"},segs),near(r.n,1,Math.max(r.max,3)).map(n=>({...numTile(n),ok:n===r.n,wrong:"encore"})),"ouin_"+r.n);
  },
  donne(r,stage){
    instr(`Donne ${r.n} perle${r.n>1?"s":""} à Plume. Touche le sac, puis le bouton vert.`,["don_"+r.n,"g_sac"]);
    let k=0,locked=false;
    const tray=h("div",{class:"tray"});
    const sync=()=>{tray.replaceChildren();for(let i=0;i<k;i++)tray.append(h("button",{class:"gem","aria-label":"enlever une perle",onclick:()=>{if(locked)return;k--;sync();fx.pop();say("n"+k);}}));};
    stage.append(
      h("div",{class:"row"},h("div",{class:"show nu",style:"width:110px;height:110px;font-size:4rem"},h("span",{class:"nm"},String(r.n))),h("span",{style:"font-size:3rem"},"🧚")),
      tray,
      h("div",{class:"row"},
        h("button",{class:"pouch","aria-label":"prendre une perle",onclick:()=>{if(locked||k>=10)return;k++;sync();fx.pop();say("n"+k);}},"👝"),
        h("button",{class:"okb","aria-label":"c’est prêt",onclick:()=>{if(locked)return;
          if(k===r.n){locked=true;fx.ok();say("merci_"+r.n);roundDone("merci_"+r.n);}
          else{fx.no();tray.classList.remove("shake");void tray.offsetWidth;tray.classList.add("shake");
            say(k===0?"sac":["mis_"+k,"faut_"+r.n]);}
        }},"✓")));
  },
  add(r,stage){
    const sum=r.a+r.b;
    instr(`${r.a} + ${r.b}. Compte toutes les perles.`,"g_perles");
    const beads=[];
    const bar=n=>{const b=h("div",{class:"bar"});for(let i=0;i<n;i++){const e=h("button",{class:"bead",style:`--c:${BEAD[n]}`,"aria-label":"perle"});beads.push(e);b.append(e);}return b;};
    const q=h("span",{class:"q"},"?");
    const top=h("div",{style:"display:flex;flex-direction:column;align-items:center;gap:16px"},
      h("div",{class:"beads"},bar(r.a),h("span",{class:"plus"},"+"),bar(r.b)),
      h("div",{class:"eq nm"},`${r.a} + ${r.b} = `,q));
    seqCount(beads);
    choices(stage,top,near(sum,1,10).map(n=>({...numTile(n),ok:n===sum,wrong:"encorep"})),`eq_${r.a}_${r.b}`,()=>{q.textContent=sum;});
  },
  async trace(r,stage){
    const t=tok,isL=r.kind==="letter",info=isL?L[r.g]:null,glyph=isL?fmt(r.g):String(r.g);
    const word=isL?info.w[0]:null;
    if(isL) instr(`Voici « ${glyph} », comme dans ${word[0]}. Suis la lettre avec ton doigt.`,["tl_"+r.g,"g_doigt_l"]);
    else instr(`Voici le ${r.g}. Suis le chiffre avec ton doigt.`,["tn_"+r.g,"g_doigt_n"]);
    const SZ=500,RAD=32;
    const cursive=isL&&S.style==="cursive";
    const fam=isL?getComputedStyle(document.body).getPropertyValue("--let").trim():'"Andika","Trebuchet MS",sans-serif';
    const wt=cursive?400:700;
    try{await Promise.race([document.fonts.load(`${wt} 80px ${fam.split(",")[0]}`,glyph),new Promise(res=>setTimeout(res,1500))]);}catch(e){}
    if(t!==tok) return;
    const mk=h("canvas",{width:SZ,height:SZ}),m=mk.getContext("2d");
    let fs=300;m.font=`${wt} ${fs}px ${fam}`;let mt=m.measureText(glyph);
    const box=()=>[mt.actualBoundingBoxLeft+mt.actualBoundingBoxRight,mt.actualBoundingBoxAscent+mt.actualBoundingBoxDescent];
    let [bw,bh]=box();fs=Math.round(fs*Math.min(330/bw,350/bh,1.75));m.font=`${wt} ${fs}px ${fam}`;mt=m.measureText(glyph);[bw,bh]=box();
    const gx=(SZ-bw)/2+mt.actualBoundingBoxLeft,gy=(SZ-bh)/2+mt.actualBoundingBoxAscent;
    m.fillStyle="#000";m.strokeStyle="#000";m.lineJoin="round";m.lineWidth=cursive?22:8;m.fillText(glyph,gx,gy);m.strokeText(glyph,gx,gy);
    const data=m.getImageData(0,0,SZ,SZ).data,pts=[];
    for(let y=6;y<SZ;y+=12)for(let x=6;x<SZ;x+=12)if(data[(y*SZ+x)*4+3]>128)pts.push({x,y,c:false});
    const tint=(col,speck)=>{const c=h("canvas",{width:SZ,height:SZ}),x=c.getContext("2d");x.drawImage(mk,0,0);x.globalCompositeOperation="source-in";
      x.fillStyle=col;x.fillRect(0,0,SZ,SZ);if(speck){x.globalCompositeOperation="source-atop";x.fillStyle="rgba(120,90,50,.22)";
      for(let i=0;i<2600;i++)x.fillRect(Math.random()*SZ,Math.random()*SZ,2,2);}return c;};
    const sand=tint("#f6ecd6",true),gold=tint("#ffc233",false);
    const pc=h("canvas",{width:SZ,height:SZ}),p=pc.getContext("2d");p.lineCap="round";p.lineJoin="round";p.lineWidth=RAD*2;p.strokeStyle="#000";p.fillStyle="#000";
    const tmp=h("canvas",{width:SZ,height:SZ}),tx=tmp.getContext("2d");
    const cv=h("canvas",{class:"trace "+(isL?(info.v?"vo":"co"):"nu"),width:SZ,height:SZ,role:"img","aria-label":"Tracé de "+glyph}),ctx=cv.getContext("2d");
    let last=null,done=false;
    const draw=()=>{ctx.clearRect(0,0,SZ,SZ);ctx.drawImage(sand,0,0);
      tx.globalCompositeOperation="source-over";tx.clearRect(0,0,SZ,SZ);tx.drawImage(pc,0,0);tx.globalCompositeOperation="source-in";tx.drawImage(gold,0,0);
      ctx.drawImage(tmp,0,0);};
    const pos=e=>{const b=cv.getBoundingClientRect(),bd=10;return {x:(e.clientX-b.left-bd)*SZ/(b.width-2*bd),y:(e.clientY-b.top-bd)*SZ/(b.height-2*bd)};};
    const stroke=(a,b)=>{p.beginPath();p.arc(b.x,b.y,RAD,0,Math.PI*2);p.fill();p.beginPath();p.moveTo(a.x,a.y);p.lineTo(b.x,b.y);p.stroke();
      const d=Math.hypot(b.x-a.x,b.y-a.y),steps=Math.max(1,Math.ceil(d/10)),R2=(RAD+4)*(RAD+4);
      for(let i=0;i<=steps;i++){const px=a.x+(b.x-a.x)*i/steps,py=a.y+(b.y-a.y)*i/steps;
        for(const q of pts)if(!q.c){const dx=q.x-px,dy=q.y-py;if(dx*dx+dy*dy<=R2)q.c=true;}}
      draw();
      if(!done&&pts.length&&pts.filter(q=>q.c).length/pts.length>=.9){done=true;ctx.clearRect(0,0,SZ,SZ);ctx.drawImage(gold,0,0);fx.ok();
        const s=isL?`ok_${r.g}_0`:(r.g===0?"zero":"n"+r.g);say(s);roundDone(s);}};
    cv.addEventListener("pointerdown",e=>{if(done)return;e.preventDefault();try{cv.setPointerCapture(e.pointerId);}catch(_){}last=pos(e);stroke(last,last);});
    cv.addEventListener("pointermove",e=>{if(!last||done)return;e.preventDefault();const q=pos(e);stroke(last,q);last=q;});
    const end=()=>{last=null;};cv.addEventListener("pointerup",end);cv.addEventListener("pointercancel",end);
    draw();
    const under=h("div",{class:"under"});
    if(isL) under.append(h("button",{class:"w",onclick:()=>say(`w_${r.g}_0`)},h("span",null,word[1]),word[0]));
    else under.append(h("div",{class:"w"},h("span",null,r.g===0?"🫙":"✨".repeat(Math.min(r.g,10)))));
    under.append(h("button",{class:"ico","aria-label":"Effacer et recommencer",onclick:()=>{if(done)return;p.clearRect(0,0,SZ,SZ);pts.forEach(q=>q.c=false);draw();}},"↺"));
    stage.append(cv,under);
  }
};

/* ---------- espace parents ---------- */
const dlg=$("#dlg");
function openParents(){
  hush();
  const a=3+Math.floor(Math.random()*7),b=3+Math.floor(Math.random()*7);
  const inp=h("input",{type:"number",inputmode:"numeric","aria-label":"Résultat"});
  const go=()=>{if(+inp.value===a*b)settings();else{inp.value="";inp.focus();}};
  inp.addEventListener("keydown",e=>{if(e.key==="Enter")go();});
  dlg.replaceChildren(h("h2",null,"Espace parents"),h("label",null,`Pour entrer : combien font ${a} × ${b} ?`),inp,
    h("div",{class:"line"},h("button",{class:"btn main",onclick:go},"Entrer"),h("button",{class:"btn",onclick:()=>dlg.close()},"Fermer")));
  if(!dlg.open)dlg.showModal();
}
function touch(){S.ts=Date.now();saveLocal();pushRemote();applyStyle();updateSun();}
function testRow(){
  const out=h("p",{class:"help",style:"margin-top:8px"},"");
  const log=t=>{out.textContent=t;};
  const info=()=>` (voix ${S.vm==="off"?"coupée":"activée"}, sons ${S.sound?"activés":"coupés"}, moteur ${ac?ac.state+" "+ac.sampleRate+" Hz":"absent"}, session ${(navigator.audioSession&&navigator.audioSession.type)||"n/d"}, lecteur muet ${unmute?(unmute.paused?"en pause":"actif"):"absent"})`;
  return h("div",null,
    h("div",{class:"lab"},"Test du son"),
    h("div",{class:"line",style:"margin-top:0"},
      h("button",{class:"btn",onclick:()=>{try{ctx();const o=ac.createOscillator(),g=ac.createGain();g.gain.value=.3;o.frequency.value=660;o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+.6);log("1 · Bip envoyé"+info());}catch(e){log("1 · Erreur : "+e.message);}}},"1 · Bip"),
      h("button",{class:"btn",onclick:()=>{try{ctx();loadClip("bonjour").then(b=>{if(!b)return log("2 · Décodage en échec");const x=ac.createBufferSource();x.buffer=b;x.connect(ac.destination);x.start();log("2 · Voix envoyée"+info());});}catch(e){log("2 · Erreur : "+e.message);}}},"2 · Voix"),
      h("button",{class:"btn",onclick:()=>{try{const a=new Audio(window.CLIPS?"data:audio/mpeg;base64,"+window.CLIPS.bonjour[1]:clipFile("bonjour"));a.addEventListener("error",()=>log("3 · Lecteur refusé (code "+(a.error&&a.error.code)+")"));a.play().then(()=>log("3 · Lecteur lancé"+info()),e=>log("3 · Lecteur bloqué : "+e.name));}catch(e){log("3 · Erreur : "+e.message);}}},"3 · Voix, autre lecteur")),
    out);
}
/* ---------- hors ligne (version en fichiers séparés servie en HTTP) ----------
   Le service worker (sw.js) sert sons et images depuis le cache. Ici on télécharge tout d'avance, en tâche de fond,
   pour que le jeu marche ensuite sans réseau. Même nom de cache que dans sw.js. */
const CACHE="lanternes-v1",HL={n:0,total:0,etat:"indisponible"};
async function horsLigne(){
  if(!("serviceWorker" in navigator)||!window.caches||!/^https?:/.test(location.protocol)||!window.VER) return;
  try{await navigator.serviceWorker.register("sw.js");}catch(e){HL.etat="refusé par le navigateur";return;}
  try{if(navigator.storage&&navigator.storage.persist) navigator.storage.persist();}catch(e){}
  const urls=[...Object.keys(VER.i).map(imgFile),...Object.keys(VER.a).map(clipFile)].map(u=>new URL(u,location.href).href);
  HL.total=urls.length;HL.etat="téléchargement";
  const c=await caches.open(CACHE);let i=0,rate=0;
  const un=async()=>{while(i<urls.length){const u=urls[i++];
    try{if(!(await c.match(u))){const r=await fetch(u);if(!r.ok)throw 0;await c.put(u,r);}HL.n++;}catch(e){rate++;}}};
  await Promise.all([un(),un(),un(),un()]);
  if(rate){HL.etat="incomplet ("+rate+" fichiers manquants, reprise au prochain lancement)";return;}
  HL.etat="prêt";
  try{const garde=new Set(urls);for(const k of await c.keys()) if(/\/(audio|images)\//.test(new URL(k.url).pathname)&&!garde.has(k.url)) c.delete(k);}catch(e){}
}
setTimeout(horsLigne,4000);
function horsLigneLine(){
  const p=h("p",{class:"help"}),maj=()=>{p.textContent="Jeu hors ligne : "+(HL.total?`${HL.etat}, ${HL.n} fichiers sur ${HL.total}`:HL.etat);};
  maj();const t=setInterval(()=>{if(!p.isConnected)return clearInterval(t);maj();},1000);
  return p;
}
function diagLine(){
  const n=Object.keys(window.CLIPS||DUR).length,p=h("p",{class:"help"},`Diagnostic audio : ${n} phrases chargées · moteur ${ac?ac.state:"non démarré"} · décodage en cours…`);
  const done=r=>{p.textContent=`Diagnostic audio : ${n} phrases chargées · moteur ${ac?ac.state:"absent"} · décodage ${r}`;};
  if(!n) done("impossible (aucune phrase)"); else loadClip("bonjour").then(b=>done(b?"OK":"en échec"),()=>done("en échec"));
  return p;
}
function settings(){
  const name=h("input",{type:"text",value:S.name,maxlength:"20"});
  name.addEventListener("change",()=>{S.name=name.value.trim()||"Lou";touch();});
  const chips=(key,opts)=>h("div",{class:"chips"},opts.map(([v,lab])=>h("button",{"aria-pressed":String(S[key]===v),onclick:()=>{S[key]=v;touch();settings();}},lab)));
  const used=Math.round(S.used/60);
  dlg.replaceChildren(
    h("h2",null,"Espace parents"),
    h("label",null,"Prénom de l’enfant"),name,
    h("div",{class:"lab"},`Limite par jour (aujourd’hui : ${used} min de jeu${S.chap===today()?", chapitre du jour terminé":""})`),
    chips("lim",[["chapitre","Un chapitre"],["temps","Une durée"]]),
    ...(parTemps()?[h("div",{class:"lab"},"Durée par jour"),chips("minutes",[[10,"10 min"],[15,"15 min"],[20,"20 min"],[30,"30 min"],[0,"Sans limite"]])]:[]),
    h("div",{class:"lab"},"Écriture des lettres"),
    chips("style",[["script","script"],["cursive","cursive"],["maj","MAJUSCULES"]]),
    h("div",{class:"lab"},"Voix"),
    h("div",{class:"chips"},[["auto","Activée"],["off","Coupée"]].map(([v,lab])=>h("button",{"aria-pressed":String((S.vm!=="off")===(v!=="off")),onclick:()=>{S.vm=v;touch();settings();if(v!=="off")say("bonjour");}},lab))),
    h("div",{class:"lab"},"Petits sons du jeu"),
    chips("sound",[[true,"Activés"],[false,"Coupés"]]),
    h("div",{class:"lab"},"Étapes"),
    chips("unlock",[[false,"Dans l’ordre"],[true,"Tout ouvrir"]]),
    h("div",{class:"line"},
      parTemps()&&S.minutes>0?h("button",{class:"btn",onclick:()=>{S.bonus+=300;touch();settings();if(screen==="sleep")showMap();}},"+ 5 min aujourd’hui"):null,
      !parTemps()&&S.chap===today()?h("button",{class:"btn",onclick:()=>{S.chap="";touch();settings();if(screen==="sleep")showMap();}},"+ 1 chapitre aujourd’hui"):null,
      h("button",{class:"btn warn",onclick:ev=>{const b=ev.currentTarget;if(b.dataset.sure){S.done={};S.chap="";S.epoch=Date.now();S.seen=false;touch();dlg.close();showStart();}
        else{b.dataset.sure="1";b.textContent="Confirmer : tout effacer";}}},"Recommencer l’aventure")),
    h("p",{class:"help"},"La voix dit le son des lettres plutôt que leur nom, comme en pédagogie Montessori. Rien n’est noté ni chronométré : en cas d’erreur, l’enfant recompte et se corrige seul. Plume va dormir quand le chapitre du jour est terminé ou, avec une durée, quand le temps est écoulé (l’étape en cours se termine d’abord)."),
    diagLine(),horsLigneLine(),testRow(),
    h("div",{class:"line"},h("button",{class:"btn main",onclick:()=>{dlg.close();if(screen==="map")showMap();else if(screen==="start")showStart();}},"Fermer")));
}
$("#parents").addEventListener("click",openParents);
$("#home").addEventListener("click",()=>{fx.pop();showMap();});

document.body.insertAdjacentHTML("afterbegin",SVGDEFS);applyStyle();updateSun();showStart();initRemote();
})();
