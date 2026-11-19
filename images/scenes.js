/* ---------- illustrations ---------- */
const SVGDEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121844"/><stop offset=".6" stop-color="#3b2f73"/><stop offset="1" stop-color="#7a4f8f"/></linearGradient>
<radialGradient id="gGlow"><stop offset="0" stop-color="#fff6c4" stop-opacity=".95"/><stop offset=".35" stop-color="#ffd36b" stop-opacity=".55"/><stop offset="1" stop-color="#ffc857" stop-opacity="0"/></radialGradient>
<linearGradient id="gWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7fd0"/><stop offset="1" stop-color="#1b3f86"/></linearGradient>
<linearGradient id="gMane" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9ecb"/><stop offset=".5" stop-color="#b79cf5"/><stop offset="1" stop-color="#7fd3f2"/></linearGradient>
<clipPath id="cTop"><rect width="320" height="139"/></clipPath>
</defs></svg>`;
const at=(x,y,s,inner,flip)=>`<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})">${inner}</g>`;
function starPts(cx,cy,R,r){let p="";for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r:R;p+=`${(cx+Math.cos(a)*q).toFixed(1)},${(cy+Math.sin(a)*q).toFixed(1)} `;}return p;}
const star=(x,y,R,c)=>`<polygon points="${starPts(x,y,R,R*.45)}" fill="${c||"#ffe58a"}"/>`;
const SKY=`<rect width="320" height="200" fill="url(#gSky)"/>`+[[20,22],[58,40],[96,14],[140,34],[188,18],[226,44],[268,16],[300,52],[40,70],[170,62],[250,78],[118,58]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i%3?0.9:1.4}" fill="#fff" opacity=".8"/>`).join("");
const MOON=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r*1.9}" fill="#fff" opacity=".08"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fdf3cf"/><circle cx="${x-r*.3}" cy="${y-r*.2}" r="${r*.18}" fill="#eadfb4"/><circle cx="${x+r*.3}" cy="${y+r*.3}" r="${r*.12}" fill="#eadfb4"/>`;
const tree=(x,y,s,c)=>at(x,y,s,`<rect x="-3" y="-22" width="6" height="24" rx="2" fill="#4a3526"/><circle cx="-9" cy="-28" r="12" fill="${c}"/><circle cx="9" cy="-28" r="12" fill="${c}"/><circle cx="0" cy="-40" r="14" fill="${c}"/><circle cx="-4" cy="-44" r="6" fill="#fff" opacity=".06"/>`);
const LANT=`<circle cx="0" cy="-47" r="62" fill="url(#gGlow)"/><rect x="-1.6" y="-38" width="3.2" height="39" rx="1.5" fill="#4a3526"/><ellipse cx="0" cy="1" rx="7" ry="2" fill="#4a3526"/><path d="M-8,-39 H8 L6,-36 H-6Z" fill="#4a3526"/><rect x="-6.5" y="-56" width="13" height="18" rx="3" fill="#fff3b5" stroke="#4a3526" stroke-width="1.6"/><path d="M-8,-56 H8 L0,-64Z" fill="#4a3526"/><circle cx="0" cy="-47" r="3.2" fill="#ffb629"/>`;
const LOU=`<ellipse cx="0" cy="1.5" rx="13" ry="2.6" fill="#000" opacity=".25"/><rect x="-6.5" y="-4" width="5" height="6" rx="2.2" fill="#6b4226"/><rect x="1.5" y="-4" width="5" height="6" rx="2.2" fill="#6b4226"/><path d="M-13.5,-2 Q-16,-23 -7,-31 L7,-31 Q16,-23 13.5,-2 Q0,2 -13.5,-2Z" fill="#3a52b8"/><path d="M-3,-31 L0,-3 L3,-31Z" fill="#2c3f96"/><path d="M-12,-33 Q-14,-53 3,-51 Q14,-48 12,-33 Q0,-25 -12,-33Z" fill="#3a52b8"/><circle cx="0" cy="-37" r="8.4" fill="#f4d3b5"/><path d="M-8.4,-38 Q-7,-46 0,-46 Q7,-46 8.4,-38 Q0,-43 -8.4,-38Z" fill="#2c3f96"/><circle cx="-3" cy="-37" r="1.15" fill="#2b2030"/><circle cx="3" cy="-37" r="1.15" fill="#2b2030"/><path d="M-2.6,-33.4 Q0,-31.2 2.6,-33.4" fill="none" stroke="#2b2030" stroke-width="1" stroke-linecap="round"/><circle cx="-5.2" cy="-34.4" r="1.5" fill="#f29a9a" opacity=".7"/><circle cx="5.2" cy="-34.4" r="1.5" fill="#f29a9a" opacity=".7"/>`+[[-7,-20],[6,-15],[-8,-9],[8,-24],[5,-6],[-3,-14]].map(([x,y],i)=>star(x,y,i%2?1.6:2.1,"#ffe58a")).join("")+`<circle cx="0" cy="-30" r="1.8" fill="#ffd36b"/>`;
const PLUME=`<circle r="17" fill="url(#gGlow)"/><ellipse cx="-5.5" cy="-3" rx="4.2" ry="7.5" transform="rotate(-28 -5.5 -3)" fill="#fff" opacity=".85"/><ellipse cx="5.5" cy="-3" rx="4.2" ry="7.5" transform="rotate(28 5.5 -3)" fill="#fff" opacity=".85"/><path d="M-3,6 Q0,-4 3,6 Q0,7.5 -3,6Z" fill="#ff9ecb"/><circle cy="-4.2" r="2.7" fill="#ffe9cf"/><path d="M-2.7,-5 Q0,-9 2.7,-5 Q0,-6.4 -2.7,-5Z" fill="#ffc233"/>`;
const FOX=`<ellipse cx="2" cy="1" rx="14" ry="2.4" fill="#000" opacity=".22"/><path d="M6,-3 Q26,-2 23,-21 Q17,-12 7,-10Z" fill="#e8792b"/><path d="M23,-21 Q24.5,-13 19,-10 Q19,-15 23,-21Z" fill="#fff"/><ellipse cx="0" cy="-9" rx="8" ry="10" fill="#e8792b"/><ellipse cx="0" cy="-6.5" rx="4.2" ry="6.5" fill="#fff5e6"/><polygon points="-8.5,-25 -7,-36 -1,-28" fill="#e8792b"/><polygon points="8.5,-25 7,-36 1,-28" fill="#e8792b"/><polygon points="-7,-27 -6.4,-33 -3,-28.5" fill="#5a2f18"/><polygon points="7,-27 6.4,-33 3,-28.5" fill="#5a2f18"/><circle cx="0" cy="-22" r="8.2" fill="#e8792b"/><path d="M-7,-20 Q0,-11 7,-20 Q4,-16.5 0,-17 Q-4,-16.5 -7,-20Z" fill="#fff5e6"/><ellipse cx="0" cy="-18.6" rx="4.6" ry="3.4" fill="#fff5e6"/><circle cx="0" cy="-19.6" r="1.3" fill="#2b2030"/><circle cx="-3.2" cy="-23.4" r="1.1" fill="#2b2030"/><circle cx="3.2" cy="-23.4" r="1.1" fill="#2b2030"/>`;
const FROG=`<ellipse cx="0" cy="0.5" rx="11" ry="2" fill="#000" opacity=".22"/><ellipse cx="-8" cy="-2" rx="4.5" ry="2.6" fill="#3d9a4f"/><ellipse cx="8" cy="-2" rx="4.5" ry="2.6" fill="#3d9a4f"/><ellipse cx="0" cy="-7" rx="10" ry="7.5" fill="#56b866"/><ellipse cx="0" cy="-4.5" rx="6" ry="4" fill="#d8f0b8"/><circle cx="-5" cy="-14" r="3.8" fill="#56b866"/><circle cx="5" cy="-14" r="3.8" fill="#56b866"/><circle cx="-5" cy="-14.4" r="2.3" fill="#fff"/><circle cx="5" cy="-14.4" r="2.3" fill="#fff"/><circle cx="-5" cy="-14.2" r="1.1" fill="#2b2030"/><circle cx="5" cy="-14.2" r="1.1" fill="#2b2030"/><path d="M-4.5,-8.6 Q0,-5.6 4.5,-8.6" fill="none" stroke="#2b5a33" stroke-width="1" stroke-linecap="round"/>`;
const BIRD=`<line x1="-2" y1="-2" x2="-2" y2="1" stroke="#c98a2b" stroke-width="1"/><line x1="2" y1="-2" x2="2" y2="1" stroke="#c98a2b" stroke-width="1"/><polygon points="6,-8 15,-12 13,-5" fill="#2f7fc4"/><circle cx="0" cy="-8" r="7.5" fill="#4aa8e8"/><ellipse cx="-1" cy="-5.6" rx="4.6" ry="3.6" fill="#d9f0ff"/><ellipse cx="3" cy="-8" rx="4.4" ry="3" transform="rotate(20 3 -8)" fill="#2f7fc4"/><polygon points="-7,-10 -12.5,-8.4 -7,-7" fill="#ffb629"/><circle cx="-3.4" cy="-10.4" r="1.2" fill="#2b2030"/>`;
const DRAGON=`<ellipse cx="0" cy="1" rx="15" ry="2.4" fill="#000" opacity=".25"/><path d="M-9,-20 Q-26,-30 -22,-10 Q-17,-16 -9,-12Z" fill="#8f6bd6"/><path d="M9,-20 Q26,-30 22,-10 Q17,-16 9,-12Z" fill="#8f6bd6"/><path d="M7,-3 Q24,2 25,-10 Q20,-6 9,-9Z" fill="#4fb893"/><polygon points="25,-10 30,-13 27,-6" fill="#ffb629"/><ellipse cx="0" cy="-11" rx="10.5" ry="11.5" fill="#4fb893"/><ellipse cx="0" cy="-8.5" rx="6" ry="7.5" fill="#fff0c2"/><ellipse cx="-6" cy="-1" rx="4" ry="2.4" fill="#3d9c7b"/><ellipse cx="6" cy="-1" rx="4" ry="2.4" fill="#3d9c7b"/><polygon points="-5.5,-33 -4,-40 -1.5,-34" fill="#ffb629"/><polygon points="5.5,-33 4,-40 1.5,-34" fill="#ffb629"/><circle cx="0" cy="-27" r="9" fill="#4fb893"/><ellipse cx="0" cy="-23.4" rx="6" ry="4" fill="#7fd6b6"/><circle cx="-1.8" cy="-23.6" r=".7" fill="#2b2030"/><circle cx="1.8" cy="-23.6" r=".7" fill="#2b2030"/><circle cx="-3.6" cy="-29" r="2.5" fill="#fff"/><circle cx="3.6" cy="-29" r="2.5" fill="#fff"/><circle cx="-3.4" cy="-28.8" r="1.3" fill="#2b2030"/><circle cx="3.4" cy="-28.8" r="1.3" fill="#2b2030"/><path d="M-2.4,-21 Q0,-19.4 2.4,-21" fill="none" stroke="#2b5a4a" stroke-width=".9" stroke-linecap="round"/>`;
const UNI=`<ellipse cx="0" cy="1" rx="22" ry="2.6" fill="#000" opacity=".22"/><path d="M15,-25 Q34,-24 28,-3 Q23,-12 15,-17Z" fill="url(#gMane)"/><rect x="-13" y="-15" width="4.4" height="15" rx="2" fill="#e9e6f5"/><rect x="9" y="-15" width="4.4" height="15" rx="2" fill="#e9e6f5"/><rect x="-8" y="-15" width="4.4" height="15.5" rx="2" fill="#fbfaff"/><rect x="4" y="-15" width="4.4" height="15.5" rx="2" fill="#fbfaff"/><rect x="-8" y="-2.5" width="4.4" height="3" rx="1" fill="#e8b53a"/><rect x="4" y="-2.5" width="4.4" height="3" rx="1" fill="#e8b53a"/><rect x="-13" y="-3" width="4.4" height="3" rx="1" fill="#e8b53a"/><rect x="9" y="-3" width="4.4" height="3" rx="1" fill="#e8b53a"/><ellipse cx="1" cy="-21" rx="17" ry="9.5" fill="#fbfaff"/><path d="M-15,-20 L-22,-41 L-11,-42 L-5,-27Z" fill="#fbfaff"/><ellipse cx="-23" cy="-42.5" rx="8.5" ry="5.6" transform="rotate(18 -23 -42.5)" fill="#fbfaff"/><polygon points="-17,-46 -15,-53 -12.5,-45.5" fill="#fbfaff"/><polygon points="-20.5,-47.5 -22.5,-62 -17,-48" fill="#ffd36b"/><circle cx="-24" cy="-43.6" r="1.2" fill="#2b2030"/><circle cx="-29.6" cy="-41" r=".6" fill="#b9a9c9"/><path d="M-13,-46 Q-4,-44 -6,-34 Q-2,-31 -4,-25 Q-9,-27 -9,-33 Q-12,-38 -13,-46Z" fill="url(#gMane)"/>`;
const FISH=c=>`<polygon points="5,0 11,-4 11,4" fill="${c}"/><ellipse rx="6.5" ry="3.8" fill="${c}"/><circle cx="-3" cy="-.8" r=".9" fill="#2b2030"/><path d="M0,-2.6 Q3,0 0,2.6" fill="none" stroke="#fff" stroke-width=".7" opacity=".6"/>`;
const flower=(x,y,c,s)=>at(x,y,s||1,`<path d="M0,0 Q-1,-6 0,-11" stroke="#3d9a4f" stroke-width="1.4" fill="none"/><ellipse cx="3" cy="-4" rx="3" ry="1.3" transform="rotate(-30 3 -4)" fill="#3d9a4f"/>`+[0,72,144,216,288].map(a=>`<circle cx="${(Math.cos(a*Math.PI/180)*3.4).toFixed(1)}" cy="${(-12+Math.sin(a*Math.PI/180)*3.4).toFixed(1)}" r="2.6" fill="${c}"/>`).join("")+`<circle cx="0" cy="-12" r="1.9" fill="#ffd36b"/>`);
const bfly=(x,y,c,r)=>at(x,y,1,`<g transform="rotate(${r})"><ellipse cx="-3.6" cy="-2" rx="3.6" ry="5" transform="rotate(-18 -3.6 -2)" fill="${c}"/><ellipse cx="3.6" cy="-2" rx="3.6" ry="5" transform="rotate(18 3.6 -2)" fill="${c}"/><ellipse cx="-2.6" cy="3.4" rx="2.4" ry="3" fill="${c}" opacity=".8"/><ellipse cx="2.6" cy="3.4" rx="2.4" ry="3" fill="${c}" opacity=".8"/><rect x="-.7" y="-5" width="1.4" height="10" rx=".7" fill="#2b2030"/></g>`);
const crystal=(x,y,h,c,r)=>`<g transform="translate(${x} ${y}) rotate(${r||0})"><polygon points="${-h*.22},0 ${-h*.26},${-h*.7} 0,${-h} ${h*.26},${-h*.7} ${h*.22},0" fill="${c}"/><polygon points="0,${-h} ${h*.26},${-h*.7} ${h*.22},0 0,0" fill="#fff" opacity=".28"/></g>`;
const gem=(x,y,c)=>`<polygon points="${x-4},${y-3} ${x-2},${y-6} ${x+2},${y-6} ${x+4},${y-3} ${x},${y+2}" fill="${c}"/><polygon points="${x-4},${y-3} ${x+4},${y-3} ${x},${y+2}" fill="#fff" opacity=".25"/>`;
const SCENES=[
 { // clairière
  base:SKY+MOON(262,38,15)+`<path d="M0,122 Q80,92 165,116 T320,104 V200 H0Z" fill="#1d3a4a"/>`+tree(72,140,.9,"#1f5247")+tree(246,138,.95,"#1f5247")+`<path d="M0,152 Q160,128 320,150 V200 H0Z" fill="#2a6a50"/><path d="M0,176 Q160,160 320,178 V200 H0Z" fill="#245a45"/>`+tree(26,158,1.35,"#2a6a55")+tree(296,160,1.4,"#2a6a55"),
  hero:[92,168,112,120],
  e:[at(214,166,1,LANT),
     flower(128,186,"#ff9ecb",1.2)+flower(146,192,"#ffd36b",1.3)+flower(165,185,"#c9a6ff",1.2),
     at(140,170,1,FOX),
     bfly(160,118,"#ff9ecb",-15)+bfly(186,98,"#8fd3ff",20)+bfly(232,112,"#ffe58a",-8)]},
 { // ruisseau
  base:SKY+MOON(60,36,13)+`<path d="M0,118 Q90,96 180,112 T320,100 V200 H0Z" fill="#1d3a4a"/>`+tree(210,128,.8,"#1f5247")+tree(290,126,1,"#1f5247")+`<path d="M0,128 Q160,116 320,132 V200 H0Z" fill="#2a6a50"/><path d="M0,156 C70,140 150,176 320,150 V200 H0Z" fill="url(#gWater)"/><path d="M20,176 q14,-5 28,0 M120,186 q14,-5 28,0 M230,180 q14,-5 28,0 M180,165 q10,-4 20,0" stroke="#bfe0ff" stroke-width="1.4" fill="none" opacity=".5" stroke-linecap="round"/><ellipse cx="282" cy="160" rx="24" ry="9" fill="#77748c"/><ellipse cx="278" cy="157" rx="16" ry="5" fill="#8f8ca6"/><path d="M8,150 v-22 M14,152 v-28 M20,151 v-18" stroke="#3d9a4f" stroke-width="2" stroke-linecap="round"/><ellipse cx="14" cy="122" rx="2.2" ry="5" fill="#6b4226"/>`,
  hero:[52,150,76,104],
  e:[at(104,146,1,LANT),
     [[128,170,1],[160,180,0],[194,168,1],[224,182,0],[150,160,0]].map(([x,y,f])=>`<ellipse cx="${x}" cy="${y}" rx="10" ry="4" fill="#4fae5f"/><path d="M${x},${y} l10,-2 l-2,4Z" fill="#2f73b8"/>${f?`<circle cx="${x-2}" cy="${y-3}" r="2.6" fill="#ffb3d6"/><circle cx="${x-2}" cy="${y-3}" r="1.1" fill="#ffe58a"/>`:""}`).join(""),
     at(280,153,1.1,FROG),
     `<path d="M196,150 q12,-30 26,-2" fill="none" stroke="#dff0ff" stroke-width="1" stroke-dasharray="1 3" opacity=".8"/>`+`<g transform="translate(209 134) rotate(-25)">${FISH("#ff9a4a")}</g><g transform="translate(246 146) rotate(20) scale(.8)">${FISH("#ffd36b")}</g><ellipse cx="196" cy="152" rx="6" ry="1.6" fill="none" stroke="#dff0ff" stroke-width="1"/><ellipse cx="250" cy="156" rx="5" ry="1.4" fill="none" stroke="#dff0ff" stroke-width="1"/>`]},
 { // pont arc-en-ciel
  base:SKY+`<g clip-path="url(#cTop)">`+[0,1,2,3,4,5,6].map(i=>{const r=116-i*5.5;return `<path d="M${160-r},150 A${r},${r} 0 0 1 ${160+r},150" fill="none" stroke="#7c7896" stroke-width="5.5" opacity=".55"/>`;}).join("")+`</g><path d="M0,128 Q60,112 110,134 V200 H0Z" fill="#2a6a50"/><path d="M320,128 Q260,112 210,134 V200 H320Z" fill="#2a6a50"/><path d="M0,160 H320 V200 H0Z" fill="url(#gWater)"/><path d="M40,176 q14,-5 28,0 M150,186 q14,-5 28,0 M240,178 q14,-5 28,0" stroke="#bfe0ff" stroke-width="1.4" fill="none" opacity=".5" stroke-linecap="round"/><path d="M56,150 Q160,96 264,150 L264,166 L240,166 Q160,118 80,166 L56,166Z" fill="#8d86a3"/><path d="M56,150 Q160,96 264,150" fill="none" stroke="#b5aecb" stroke-width="4" stroke-linecap="round"/><path d="M96,140 v8 M128,127 v8 M160,123 v8 M192,127 v8 M224,140 v8" stroke="#6f6887" stroke-width="2"/><ellipse cx="52" cy="60" rx="22" ry="8" fill="#6b6788" opacity=".8"/><ellipse cx="70" cy="54" rx="16" ry="7" fill="#6b6788" opacity=".8"/><ellipse cx="262" cy="70" rx="20" ry="7" fill="#6b6788" opacity=".8"/>`,
  hero:[30,150,56,104],
  e:[at(290,150,.95,LANT),
     `<g clip-path="url(#cTop)">`+["#ff5d5d","#ff9f43","#ffe066","#5fd38d","#4aa8e8","#5b6fe0","#a66bd6"].map((c,i)=>{const r=116-i*5.5;return `<path d="M${160-r},150 A${r},${r} 0 0 1 ${160+r},150" fill="none" stroke="${c}" stroke-width="5.6"/>`;}).join("")+`</g>`,
     at(178,121,1,BIRD),
     [[36,26,5],[100,20,4],[150,48,3.5],[212,22,5],[286,34,4],[244,54,3],[130,74,3]].map(([x,y,r])=>star(x,y,r,"#fff3b0")).join(""),
     [[70,143],[92,132],[116,123],[140,118],[160,116],[180,118],[204,123],[228,132],[250,143]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="url(#gGlow)"/><circle cx="${x}" cy="${y}" r="2" fill="#fff3b5"/>`).join("")]},
 { // grotte
  base:`<rect width="320" height="200" fill="#120e26"/><path d="M0,200 V70 Q20,10 110,14 Q200,0 270,24 Q322,44 320,110 V200Z" fill="#2a2148"/><path d="M24,200 V96 Q40,44 120,42 Q210,30 262,56 Q300,76 298,130 V200Z" fill="#372b5e"/>`+[[60,40,22],[104,34,30],[150,30,18],[196,32,28],[238,44,20],[276,62,16]].map(([x,y,h])=>`<polygon points="${x-7},${y} ${x+7},${y} ${x},${y+h}" fill="#2a2148"/>`).join("")+`<path d="M0,170 Q160,150 320,172 V200 H0Z" fill="#4a3b78"/><path d="M0,186 Q160,172 320,188 V200 H0Z" fill="#3e3168"/><circle cx="236" cy="140" r="1.6" fill="#ffe58a"/><circle cx="244" cy="140" r="1.6" fill="#ffe58a"/>`,
  hero:[70,178,96,128],
  e:[at(124,180,1,LANT),
     crystal(26,180,30,"#7fe0e6",-10)+crystal(40,184,22,"#b78cf2",8)+crystal(14,186,16,"#ff9ecb",-22)+crystal(196,184,24,"#b78cf2",-8)+crystal(208,186,16,"#7fe0e6",12)+`<g transform="translate(150 30) scale(1 -1)">${crystal(0,0,20,"#ff9ecb",0)}</g><g transform="translate(60 40) scale(1 -1)">${crystal(0,0,16,"#7fe0e6",0)}</g><g transform="translate(238 44) scale(1 -1)">${crystal(0,0,18,"#b78cf2",0)}</g>`,
     at(240,180,1.15,DRAGON),
     `<ellipse cx="284" cy="186" rx="16" ry="4" fill="#000" opacity=".25"/>`+gem(276,182,"#ff6b8b")+gem(286,184,"#5fd38d")+gem(294,181,"#4aa8e8")+gem(281,176,"#ffe066")+gem(290,176,"#c08cf5"),
     `<path d="M140,160 Q138,92 164,88 Q190,92 188,160Z" fill="#1c2460"/><path d="M140,160 Q138,92 164,88 Q190,92 188,160" fill="none" stroke="#9fb4ff" stroke-width="2" opacity=".7"/>`+star(156,112,3.5,"#fff3b0")+star(174,128,2.6,"#fff3b0")+star(170,104,2,"#fff3b0")+`<circle cx="152" cy="140" r="1.2" fill="#fff"/><circle cx="178" cy="148" r="1" fill="#fff"/>`]},
 { // prairie
  base:SKY+MOON(250,44,22)+`<path d="M0,126 Q70,100 150,120 T320,108 V200 H0Z" fill="#234f66"/><path d="M0,146 Q110,122 220,142 T320,138 V200 H0Z" fill="#2c6a58"/><path d="M0,168 Q160,150 320,170 V200 H0Z" fill="#337a5c"/><path d="M30,176 l2,-7 l2,7 M140,186 l2,-7 l2,7 M210,180 l2,-7 l2,7 M290,188 l2,-7 l2,7 M88,190 l2,-7 l2,7" stroke="#4fa377" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
  hero:[50,172,76,122],
  e:[at(106,174,1,LANT),
     [[22,194],[44,186],[130,196],[150,184],[176,194],[200,186],[262,196],[282,186],[302,194],[120,182]].map(([x,y],i)=>flower(x,y,i%2?"#dfe9ff":"#bfe0ff",.95)).join(""),
     at(244,172,1.12,UNI),
     at(176,176,.55,UNI,true),
     [[60,30,40],[150,22,34],[214,70,26]].map(([x,y,l])=>`<line x1="${x}" y1="${y}" x2="${x+l}" y2="${y-l*.45}" stroke="#fff3b0" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>${star(x,y,4.5,"#fff3b0")}`).join("")]},
 { // château
  base:SKY+MOON(48,40,13)+`<path d="M30,200 Q160,84 290,200Z" fill="#24405a"/><path d="M0,184 Q160,160 320,186 V200 H0Z" fill="#2c6a58"/><path d="M146,200 Q182,168 160,132" fill="none" stroke="#d9c79a" stroke-width="9" stroke-linecap="round" opacity=".55"/>`+
   `<rect x="108" y="74" width="22" height="58" fill="#a8a1c9"/><rect x="190" y="74" width="22" height="58" fill="#a8a1c9"/><rect x="126" y="92" width="68" height="40" fill="#bdb6dc"/>`+[126,138,150,162,174,186].map(x=>`<rect x="${x}" y="86" width="8" height="7" fill="#bdb6dc"/>`).join("")+`<rect x="147" y="52" width="26" height="42" fill="#cfc9ea"/><polygon points="104,74 134,74 119,46" fill="#7a4fb5"/><polygon points="186,74 216,74 201,46" fill="#7a4fb5"/><polygon points="142,52 178,52 160,22" fill="#8c5fd0"/><path d="M151,132 V116 Q160,104 169,116 V132Z" fill="#3a2a4a"/>`+[[115,86],[197,86],[156,64],[136,106],[178,106]].map(([x,y])=>`<rect x="${x}" y="${y}" width="8" height="11" rx="4" fill="#3a2a4a"/>`).join(""),
  hero:[52,192,78,142],
  e:[`<circle cx="160" cy="112" r="50" fill="url(#gGlow)"/><path d="M151,132 V116 Q160,104 169,116 V132Z" fill="#ffd36b"/>`+[[115,86],[197,86],[156,64],[136,106],[178,106]].map(([x,y])=>`<rect x="${x}" y="${y}" width="8" height="11" rx="4" fill="#ffe58a"/>`).join(""),
     [[119,46,"#ff6b8b"],[201,46,"#ffd36b"]].map(([x,y,c])=>`<line x1="${x}" y1="${y}" x2="${x}" y2="${y-16}" stroke="#4a3526" stroke-width="1.6"/><polygon points="${x},${y-16} ${x+13},${y-12} ${x},${y-8}" fill="${c}"/>`).join(""),
     at(104,194,.8,FOX)+at(132,196,.85,FROG)+at(196,194,.9,BIRD)+at(226,196,.8,DRAGON)+at(282,196,.72,UNI)+at(254,198,.4,UNI),
     `<circle cx="160" cy="16" r="46" fill="url(#gGlow)"/>`+[0,45,90,135,180,225,270,315].map(a=>`<line x1="${(160+Math.cos(a*Math.PI/180)*17).toFixed(1)}" y1="${(16+Math.sin(a*Math.PI/180)*17).toFixed(1)}" x2="${(160+Math.cos(a*Math.PI/180)*27).toFixed(1)}" y2="${(16+Math.sin(a*Math.PI/180)*27).toFixed(1)}" stroke="#fff3b0" stroke-width="2" stroke-linecap="round"/>`).join("")+star(160,16,13,"#ffe58a")+[[84,40,"#ff9ecb"],[236,34,"#8fd3ff"],[262,84,"#ffe58a"],[70,92,"#c9a6ff"]].map(([x,y,c])=>[0,60,120,180,240,300].map(a=>`<circle cx="${(x+Math.cos(a*Math.PI/180)*9).toFixed(1)}" cy="${(y+Math.sin(a*Math.PI/180)*9).toFixed(1)}" r="1.6" fill="${c}"/>`).join("")+`<circle cx="${x}" cy="${y}" r="2.2" fill="${c}"/>`).join("")]}
];
function sceneSVG(ci,got,pop){
  const sc=SCENES[ci],lit=got.has(0);
  return `<svg class="scene" viewBox="0 0 320 200" role="img" aria-label="Illustration">${sc.base}<rect class="dark" width="320" height="200" fill="#060a22" opacity="${lit?0:.5}"/>`+
    sc.e.map((g,i)=>got.has(i)?`<g class="e${i===pop?" pop":""}">${g}</g>`:"").join("")+
    at(sc.hero[0],sc.hero[1],1,LOU)+at(sc.hero[2],sc.hero[3],1,PLUME)+`</svg>`;
}

/* ---------- décors illustrés (images/*.webp, dans window.IMG) ----------
   Positions en % du décor (format 2:3) : x, y = point d'appui bas-centre, w = largeur.
   e[k] = récompense de l'étape k : null (la lanterne se rallume : fondu de `nuit` vers `fond`),
   un sprite {i,x,y,w}, un décor entier en fondu {f}, ou une liste de ceux-ci.
   o:1 = ombre au sol, c:"vol" = flotte, c:"lum" = flotte et brille, c:"scint" = scintille.
   mt = décalage vertical (en % de la largeur) de la vignette du livre, -42 par défaut.
   Sur un téléphone étroit seuls les x de 16 à 84 sont visibles. */
const IMG=window.IMG||{};
const pLou=(x,y,w)=>({i:"c0_lou",x,y,w:w||13.5,o:1}), pPlume=(x,y)=>({i:"c0_plume",x,y,w:10});
const DECORS=[
 { // clairière
  fond:"c0_fond",nuit:"c0_nuit",lueur:[78,46.5],lou:pLou(33,60.6),plume:pPlume(48,48),
  e:[null,
     {i:"c0_fleurs",x:19,y:61.6,w:31},
     {i:"c0_roux",x:61,y:60.6,w:14.5,o:1},
     {i:"c0_papillons",x:43,y:38,w:30,c:"vol"}]},
 { // ruisseau
  fond:"c1_fond",nuit:"c1_nuit",lueur:[67,41],lou:pLou(27,58),plume:pPlume(43,45),
  e:[null,
     {i:"c1_nenuphars",x:52,y:81,w:66},
     {i:"c1_reinette",x:69,y:52,w:12},
     {i:"c1_poissons",x:38,y:73.5,w:26}]},
 { // pont arc-en-ciel
  fond:"c2_fond",nuit:"c2_nuit",lueur:[65,39.5],lou:pLou(27,58.5),plume:pPlume(42,45),
  e:[null,
     {f:"c2_arc"},
     {i:"c2_pilou",x:48,y:53.8,w:9},
     [{i:"c2_etoiles",x:50,y:7,w:84,c:"scint"},{i:"c2_etoiles",x:46,y:27,w:52,c:"scint"}],
     {f:"c2_pont"}]},
 { // grotte
  fond:"c3_fond",nuit:"c3_nuit",lueur:[78,42],lou:pLou(28,58),plume:pPlume(41,45),
  e:[null,
     [{i:"c3_cristaux",x:23,y:71.5,w:16},{i:"c3_cristaux",x:71,y:72.5,w:12}],
     {i:"c3_braise",x:62,y:58,w:16,o:1},
     {i:"c3_tresor",x:45,y:60.5,w:13},
     {f:"c3_sortie"}]},
 { // prairie
  fond:"c4_fond",nuit:"c4_nuit",mt:-53,lueur:[71,48],lou:pLou(26,66.5),plume:pPlume(37,51),
  e:[null,
     {i:"c4_fleurs",x:50,y:80.5,w:80},
     {i:"c4_nuage",x:60,y:66.8,w:23,o:1},
     {i:"c4_flocon",x:42,y:67.3,w:10,o:1},
     {i:"c4_filantes",x:60,y:35,w:42,c:"scint"}]},
 { // château
  fond:"c5_fond",nuit:"c5_nuit",mt:-54,lueur:[50,33],lou:pLou(24,68.6,11),plume:pPlume(33,56),
  e:[null,
     {f:"c5_drapeaux"},
     [{i:"c0_roux",x:36.5,y:68.6,w:9,o:1},{i:"c1_reinette",x:45.5,y:68.6,w:7,o:1},{i:"c2_pilou",x:52.5,y:68.4,w:5.5,o:1},
      {i:"c3_braise",x:60.5,y:68.6,w:9.5,o:1},{i:"c4_flocon",x:69.5,y:68.8,w:8,o:1},{i:"c4_nuage",x:79,y:68.8,w:13,o:1}],
     {i:"c5_etoile",x:50,y:17,w:21,c:"lum"}]},
 { // plage
  fond:"c6_fond",nuit:"c6_nuit",lueur:[73,41],lou:pLou(28,57.6),plume:pPlume(41,45),
  e:[null,{i:"c6_coquillages",x:50,y:66,w:50},{i:"c6_pince",x:60,y:58,w:17,o:1},{i:"c6_etoiles",x:42,y:72,w:44}]},
 { // phare
  fond:"c7_fond",nuit:"c7_nuit",lueur:[68,52],mt:-50,lou:pLou(26,65.5),plume:pPlume(39,52),
  e:[null,{i:"c7_perle",x:52,y:65.7,w:16,o:1},{i:"c7_bateaux",x:50,y:83,w:60,c:"vol"},{f:"c7_phare"}]},
 { // île
  fond:"c8_fond",nuit:"c8_nuit",lueur:[71,44],mt:-48,lou:pLou(27,63.5),plume:pPlume(40,50),
  e:[null,{i:"c8_fleurs",x:50,y:79,w:58},{i:"c8_coco",x:57,y:63.7,w:12,o:1},{i:"c8_noix",x:42,y:64.5,w:12},{f:"c8_cascade"}]},
 { // jungle
  fond:"c9_fond",nuit:"c9_nuit",lueur:[77,46],mt:-50,lou:pLou(27,65),plume:pPlume(40,52),
  e:[null,{i:"c9_kiki",x:56,y:65.2,w:14,o:1},{i:"c9_bananes",x:42,y:65.6,w:11},{i:"c9_lanternes",x:50,y:80,w:72}]},
 { // oasis
  fond:"c10_fond",nuit:"c10_nuit",lueur:[76,49],mt:-48,lou:pLou(28,63.5),plume:pPlume(41,50),
  e:[null,{i:"c10_cactus",x:25,y:77,w:17},{i:"c10_sable",x:57,y:63.7,w:14,o:1},[{i:"c2_etoiles",x:50,y:8,w:84,c:"scint"},{i:"c2_etoiles",x:45,y:23,w:52,c:"scint"}]]},
 { // montagne
  fond:"c11_fond",nuit:"c11_nuit",lueur:[74,49],mt:-50,lou:pLou(27,65),plume:pPlume(40,52),
  e:[null,{i:"c11_neige",x:58,y:65.2,w:15,o:1},{i:"c11_bonhomme",x:42,y:65.4,w:11,o:1},{f:"c11_aurore"}]},
 { // village
  fond:"c12_fond",nuit:"c12_nuit",lueur:[76,47],lou:pLou(27,60.5),plume:pPlume(40,47),
  e:[null,{f:"c12_fenetres"},{i:"c12_pique",x:56,y:60.7,w:12,o:1},{i:"c12_pommes",x:42,y:61.5,w:11},{i:"c12_guirlande",x:50,y:31,w:92,c:"scint"}]},
 { // moulin
  fond:"c13_fond",nuit:"c13_nuit",lueur:[78,41],lou:pLou(27,57.5),plume:pPlume(40,44),
  e:[null,{i:"c13_mimi",x:55,y:57.7,w:9,o:1},{i:"c13_ble",x:41,y:58.2,w:13},{i:"c13_vent",x:46,y:29,w:70,c:"vol"}]},
 { // verger
  fond:"c14_fond",nuit:"c14_nuit",lueur:[70,47],mt:-46,lou:pLou(26,61.5),plume:pPlume(39,48),
  e:[null,{f:"c14_fruits"},{i:"c14_trefle",x:54,y:61.7,w:12,o:1},{i:"c14_panier",x:41,y:62.2,w:11}]},
 { // marais
  fond:"c15_fond",nuit:"c15_nuit",lueur:[72,37],lou:pLou(28,56.5),plume:pPlume(41,43),
  e:[null,{i:"c15_hulotte",x:56,y:56.7,w:11,o:1},{i:"c15_lucioles",x:50,y:50,w:80,c:"scint"},{i:"c15_roseaux",x:50,y:73,w:84}]},
 { // grand arbre
  fond:"c16_fond",nuit:"c16_nuit",lueur:[76,43],lou:pLou(27,58.5),plume:pPlume(40,45),
  e:[null,{f:"c16_portes"},{i:"c16_noisette",x:57,y:58.7,w:12,o:1},{i:"c16_livre",x:42,y:59.5,w:15}]},
 { // volcan
  fond:"c17_fond",nuit:"c17_nuit",lueur:[74,50],mt:-46,lou:pLou(27,61.5),plume:pPlume(40,48),
  e:[null,{i:"c17_flamme",x:56,y:61.7,w:13,o:1},{i:"c17_braises",x:42,y:62.3,w:12},{f:"c17_feu"}]},
 { // nuages
  fond:"c18_fond",nuit:"c18_nuit",lueur:[68,45],lou:pLou(26,56.5),plume:pPlume(38,43),
  e:[null,[{i:"c2_etoiles",x:50,y:9,w:84,c:"scint"},{i:"c2_etoiles",x:40,y:25,w:52,c:"scint"}],{i:"c18_coton",x:52,y:56.7,w:12},{i:"c18_moutons",x:50,y:72,w:42},{i:"c18_escalier",x:50,y:38,w:34,c:"scint"}]},
 { // lune
  fond:"c19_fond",nuit:"c19_nuit",lueur:[78,48],lou:pLou(26,60.5),plume:pPlume(39,47),
  e:[null,{i:"c19_luna",x:54,y:60.7,w:12,o:1},{i:"c19_fleurs",x:48,y:73,w:70},{f:"c19_grande"},{i:"c19_fete",x:50,y:31,w:86,c:"scint"}]}
];
/* image intégrée (fichier unique) ou fichier images/<nom>.webp */
const VER=window.VER||{a:{},i:{}};
const imgFile=n=>"images/"+n+".webp"+(VER.i[n]?"?"+VER.i[n]:"");
const imgSrc=n=>IMG[n]||imgFile(n);
const hasDecor=ci=>!!DECORS[ci];
function decorHTML(ci,got,pop,lazy){
  const d=DECORS[ci],lit=got.has(0),at=`alt="" draggable="false"${lazy?' loading="lazy"':""}`;let luc="",couches="",sprites="";
  const sprite=(p,cls)=>`<span class="spr${p.o?" o":""}${p.c?" "+p.c:""}${cls?" "+cls:""}" style="left:${p.x}%;top:${p.y}%;width:${p.w}%"><img src="${imgSrc(p.i)}" ${at}></span>`;
  for(let k=0;k<(lit?18:5);k++) luc+=`<i style="left:${(8+Math.random()*84).toFixed(1)}%;top:${(14+Math.random()*62).toFixed(1)}%;--tx:${(Math.random()*36-18).toFixed(0)}px;--ty:${(Math.random()*36-18).toFixed(0)}px;animation-delay:${(-Math.random()*7).toFixed(1)}s"></i>`;
  d.e.forEach((e,i)=>{ if(!e||!got.has(i)) return;
    [].concat(e).forEach(p=>{ if(p.f) couches+=`<img class="couche${i===pop?" allume":""}" src="${imgSrc(p.f)}" ${at}>`; else sprites+=sprite(p,i===pop?"pop":""); });});
  return `<div class="scene3${lit?" lit":""}${pop===0?" allume":""}"><div class="plan fondp"><img src="${imgSrc(d.nuit)}" ${at}><img class="jour" src="${imgSrc(d.fond)}" ${at}>${couches}<i class="lueur" style="left:${d.lueur[0]}%;top:${d.lueur[1]}%"></i></div>`+
    `<div class="plan persos">${sprites}`+sprite(d.lou)+sprite(d.plume,"lum")+`</div><div class="plan luc">${luc}</div></div>`;
}
