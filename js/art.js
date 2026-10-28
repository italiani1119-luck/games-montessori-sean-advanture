(function () {
  'use strict';

  const C = {
    ink: '#38324b',
    cream: '#fff6e6',
    paper: '#fffdf8',
    mint: '#8ad8c3',
    mintD: '#59bfa5',
    mintL: '#d5f4ea',
    coral: '#ff8a70',
    coralD: '#df5f3d',
    orange: '#ffae4d',
    orangeD: '#e0862c',
    yellow: '#ffd23f',
    yellowD: '#e5b21d',
    green: '#6bc77c',
    greenD: '#3f9d6b',
    leaf: '#a7e3a8',
    teal: '#4cc3b3',
    blue: '#5aa9e6',
    blueD: '#3d7fc4',
    sky: '#dff3ff',
    pink: '#f68bb4',
    pinkD: '#d9548a',
    lavender: '#b7a4f0',
    purple: '#9b7ede',
    purpleD: '#7457c7',
    brown: '#b97a50',
    brownD: '#8a5434',
    tan: '#f3d5b5',
    sand: '#d8a86f',
    gray: '#cfd6e4',
    grayD: '#93a0b8',
    white: '#ffffff'
  };

  const IMG_DIR = 'assets/images/game-montessori/';
  const IMG = {
    dog: 'dog.webp',
    elephant: 'elephant.webp',
    cat: 'cat.webp',
    teddy: 'teddy.webp',
    bear: 'teddy.webp',
    pillow: 'pillow.webp',
    log: 'log.webp',
    'log-alt': 'log-alt.webp',
    'ice-cube': 'ice-cube.webp',
    paper: 'paper.webp',
    ant: 'ant.webp',
    'ant-alt': 'ant-alt.webp',
    rock: 'rock.webp',
    moon: 'moon.webp',
    moonStars: 'moon.webp',
    lamp: 'lamp.webp',
    sun: 'sun.webp',
    water: 'water-drop.webp',
    'water-drop': 'water-drop.webp',
    sean: 'sean.webp',
    'sean-happy': 'sean-happy.webp',
    'sean-cute': 'sean-cute.webp',
    'sean-confused': 'sean-confused.webp',
    'sean-sad': 'sean-sad.webp',
    'sean-angry': 'sean-angry.webp',
    'sean-surprised': 'sean-surprised.webp',
    'sean-pouring': 'sean-pouring.webp',
    'sean-speaking': 'sean-speaking.webp',

    /* Subject illustrations from the asset pack */
    'subject-practical': 'subject-practical.webp',
    'subject-sensorial': 'subject-sensorial.webp',
    'subject-math': 'subject-math.webp',
    'subject-language': 'subject-language.webp',
    'subject-culture': 'subject-culture.webp',

    /* Practical life */
    'practical-pitcher': 'practical-pitcher.webp',
    'practical-wash': 'practical-wash.webp',
    'practical-ball': 'practical-ball.webp',
    'practical-bed': 'practical-bed.webp',
    'practical-rinse': 'practical-rinse.webp',
    'practical-toybox': 'practical-toybox.webp',
    'practical-shelf': 'practical-shelf.webp',
    'treasure': 'treasure-chest.webp',

    /* Sensorial */
    'sensorial-fabric': 'sensorial-fabric.webp',
    'sensorial-pink-tower': 'sensorial-pink-tower.webp',
    'sensorial-bell': 'sensorial-bell.webp',
    'sensorial-cube': 'sensorial-cube.webp',
    'sensorial-ice': 'sensorial-ice.webp',

    /* Mathematics */
    'math-cupcake': 'math-cupcake.webp',
    'math-five-stars': 'math-five-stars.webp',
    'math-abacus': 'math-abacus.webp',
    'math-number-tiles': 'math-number-tiles.webp',
    'math-balloon': 'math-balloon.webp',
    'math-sun': 'math-sun.webp',
    'math-star': 'math-star.webp',
    'math-apples': 'math-apples.webp',
    'math-whale': 'math-whale.webp',

    /* Culture & science */
    'science-burrow': 'science-burrow.webp',
    'science-nest': 'science-nest.webp',
    'science-butterfly': 'science-butterfly.webp',
    'science-camel': 'science-camel.webp',
    'science-caterpillar': 'science-caterpillar.webp',
    'science-chrysalis': 'science-chrysalis.webp',
    'science-cloud': 'science-cloud.webp',
    'science-flower': 'science-flower.webp',
    'science-frog': 'science-frog.webp',
    'science-globe': 'science-globe.webp',
    'science-panda': 'science-panda.webp',
    'science-seed': 'science-seed.webp',
    'science-sprout': 'science-sprout.webp',
    'science-tree': 'science-tree.webp',
    'science-whale': 'science-whale.webp',

    /* Short aliases used by game content */
    pitcher: 'practical-pitcher.webp',
    wash: 'practical-wash.webp',
    ball: 'practical-ball.webp',
    bed: 'practical-bed.webp',
    cup: 'practical-rinse.webp',
    toybox: 'practical-toybox.webp',
    shelf: 'practical-shelf.webp',
    cloth: 'sensorial-fabric.webp',
    fabric: 'sensorial-fabric.webp',
    bell: 'sensorial-bell.webp',
    cube: 'sensorial-cube.webp',
    pinkTower: 'sensorial-pink-tower.webp',
    ice: 'sensorial-ice.webp',
    cupcake: 'math-cupcake.webp',
    'five-stars': 'math-five-stars.webp',
    abacus: 'math-abacus.webp',
    'number-tiles': 'math-number-tiles.webp',
    balloon: 'math-balloon.webp',
    'sun-math': 'math-sun.webp',
    star: 'math-star.webp',
    apples: 'math-apples.webp',
    globe: 'science-globe.webp',
    panda: 'science-panda.webp',
    camel: 'science-camel.webp',
    whale: 'science-whale.webp',
    frog: 'science-frog.webp',
    butterfly: 'science-butterfly.webp',
    caterpillar: 'science-caterpillar.webp',
    chrysalis: 'science-chrysalis.webp',
    nest: 'science-nest.webp',
    burrow: 'science-burrow.webp',
    seed: 'science-seed.webp',
    sprout: 'science-sprout.webp',
    flower: 'science-flower.webp',
    tree: 'science-tree.webp',
    cloud: 'science-cloud.webp'
  };

  /* Files with real alpha cut-outs; everything else in IMG sits on a white plate. */
  const CUTOUT_IMG = {
    'dog.webp': 1, 'elephant.webp': 1, 'cat.webp': 1, 'teddy.webp': 1, 'pillow.webp': 1,
    'log.webp': 1, 'log-alt.webp': 1, 'ice-cube.webp': 1, 'paper.webp': 1, 'rock.webp': 1,
    'moon.webp': 1, 'lamp.webp': 1, 'sun.webp': 1, 'water-drop.webp': 1, 'ant.webp': 1,
    'ant-alt.webp': 1, 'treasure-chest.webp': 1,
    'sean.webp': 1, 'sean-happy.webp': 1, 'sean-cute.webp': 1, 'sean-confused.webp': 1,
    'sean-sad.webp': 1, 'sean-angry.webp': 1, 'sean-surprised.webp': 1,
    'sean-pouring.webp': 1, 'sean-speaking.webp': 1
  };

  const SCENE_IMG = {
    kitchen: 'practical-room.webp',
    living: 'practical-room.webp',
    care: 'practical-care.webp',
    senses: 'sensorial-room.webp',
    bedroom: 'bedroom.webp',
    cove: 'math-beach.webp',
    garden: 'garden.webp',
    world: 'science-bg.webp'
  };

  const st = `stroke="${C.ink}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  const st2 = `stroke="${C.ink}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;
  const shadow = `<ellipse cx="50" cy="92" rx="27" ry="4.5" fill="${C.ink}" opacity=".07"/>`;

  function wrap(inner, label) {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-label="${label || ''}">${inner}</svg>`;
  }

  function starD(cx, cy, outer, inner, points) {
    const n = points || 5;
    let d = '';
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 ? inner : outer;
      const a = -Math.PI / 2 + (i * Math.PI) / n;
      const x = (cx + Math.cos(a) * r).toFixed(1);
      const y = (cy + Math.sin(a) * r).toFixed(1);
      d += (i ? 'L' : 'M') + x + ' ' + y + ' ';
    }
    return d + 'Z';
  }

  function cube(x, y, w, h, front, top, side, off) {
    const o = off == null ? 7 : off;
    return `
      <path d="M${x} ${y + h} L${x} ${y} L${x + w} ${y} L${x + w} ${y + h} Z" fill="${front}" ${st}/>
      <path d="M${x} ${y} L${x + o} ${y - o} L${x + w + o} ${y - o} L${x + w} ${y} Z" fill="${top}" ${st}/>
      <path d="M${x + w} ${y} L${x + w + o} ${y - o} L${x + w + o} ${y + h - o} L${x + w} ${y + h} Z" fill="${side}" ${st}/>`;
  }

  function limb(d, color, w) {
    return `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="${w + 5}" stroke-linecap="round"/>
      <path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
  }

  function bear(pose) {
    const p = pose || 'happy';
    let arms = '';
    let eyes = '';
    let mouth = '';
    let extra = '';

    if (p === 'cheer') {
      arms = limb('M32 60 Q18 53 16 39', C.mint, 11) + limb('M68 60 Q82 53 84 39', C.mint, 11);
      extra = `<circle cx="16" cy="36" r="6" fill="${C.mint}" ${st}/><circle cx="84" cy="36" r="6" fill="${C.mint}" ${st}/>`;
      eyes = `<circle cx="42" cy="30" r="2.8" fill="${C.ink}"/><circle cx="58" cy="30" r="2.8" fill="${C.ink}"/>
        <circle cx="43" cy="29" r="1" fill="${C.white}"/><circle cx="59" cy="29" r="1" fill="${C.white}"/>`;
      mouth = `<ellipse cx="50" cy="47" rx="6.5" ry="5" fill="${C.coralD}" ${st2}/><ellipse cx="50" cy="49.5" rx="3" ry="2" fill="${C.coral}" />`;
    } else if (p === 'think') {
      arms = limb('M32 60 Q25 67 26 74', C.mint, 11) + limb('M68 60 Q77 61 73 50', C.mint, 11);
      extra = `<circle cx="72" cy="46" r="6" fill="${C.mint}" ${st}/><circle cx="86" cy="32" r="2.3" fill="${C.paper}" ${st2}/><circle cx="91" cy="25" r="1.4" fill="${C.paper}" ${st2}/>`;
      eyes = `<circle cx="42" cy="29" r="2.8" fill="${C.ink}"/><circle cx="58" cy="29" r="2.8" fill="${C.ink}"/>
        <circle cx="42.8" cy="28" r="1" fill="${C.white}"/><circle cx="58.8" cy="28" r="1" fill="${C.white}"/>`;
      mouth = `<path d="M46 47 Q50 49 54 47" fill="none" ${st}/>`;
    } else if (p === 'oops') {
      arms = limb('M31 60 Q23 66 22 73', C.mint, 11) + limb('M69 60 Q77 66 78 73', C.mint, 11);
      eyes = `<circle cx="42" cy="31" r="3.2" fill="${C.ink}"/><circle cx="58" cy="31" r="3.2" fill="${C.ink}"/>
        <circle cx="43" cy="30" r="1.1" fill="${C.white}"/><circle cx="59" cy="30" r="1.1" fill="${C.white}"/>
        <path d="M37 24 L46 26" ${st2} fill="none"/><path d="M63 24 L54 26" ${st2} fill="none"/>`;
      mouth = `<ellipse cx="50" cy="48" rx="3.4" ry="4" fill="${C.coralD}" ${st2}/>`;
    } else if (p === 'calm') {
      arms = limb('M31 60 Q27 67 28 74', C.mint, 11) + limb('M69 60 Q73 67 72 74', C.mint, 11);
      eyes = `<path d="M39 30 Q42 33 45 30" fill="none" ${st2}/><path d="M55 30 Q58 33 61 30" fill="none" ${st2}/>`;
      mouth = `<path d="M45 46 Q50 49 55 46" fill="none" ${st2}/>`;
    } else {
      arms = limb('M31 60 Q26 68 27 75', C.mint, 11) + limb('M69 60 Q74 68 73 75', C.mint, 11);
      eyes = `<circle cx="42" cy="30" r="2.9" fill="${C.ink}"/><circle cx="58" cy="30" r="2.9" fill="${C.ink}"/>
        <circle cx="43" cy="29" r="1" fill="${C.white}"/><circle cx="59" cy="29" r="1" fill="${C.white}"/>`;
      mouth = `<path d="M44 45 Q50 51 56 45" fill="none" ${st}/>`;
    }

    return wrap(`
      <ellipse cx="50" cy="94" rx="28" ry="4.5" fill="${C.ink}" opacity=".08"/>
      <ellipse cx="34" cy="86" rx="9" ry="6.5" fill="${C.cream}" ${st}/>
      <ellipse cx="66" cy="86" rx="9" ry="6.5" fill="${C.cream}" ${st}/>
      ${arms}
      <rect x="29" y="51" width="42" height="36" rx="18" fill="${C.mint}" ${st}/>
      <ellipse cx="50" cy="70" rx="13" ry="11" fill="${C.cream}" opacity=".92"/>
      <path d="${starD(50, 70, 5.6, 2.5)}" fill="${C.yellow}" ${st2}/>
      <circle cx="31" cy="17" r="9" fill="${C.mint}" ${st}/>
      <circle cx="69" cy="17" r="9" fill="${C.mint}" ${st}/>
      <circle cx="31" cy="17" r="4.2" fill="${C.coral}"/>
      <circle cx="69" cy="17" r="4.2" fill="${C.coral}"/>
      <circle cx="50" cy="35" r="23" fill="${C.mint}" ${st}/>
      <ellipse cx="50" cy="41.5" rx="12.5" ry="9.5" fill="${C.cream}" ${st}/>
      <ellipse cx="33.5" cy="41" rx="3.4" ry="2.3" fill="${C.coral}" opacity=".55"/>
      <ellipse cx="66.5" cy="41" rx="3.4" ry="2.3" fill="${C.coral}" opacity=".55"/>
      ${eyes}
      <ellipse cx="50" cy="37" rx="3.4" ry="2.7" fill="${C.ink}"/>
      <path d="M50 39.5 V42" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>
      ${mouth}
      ${extra}
    `, 'Momo beruang');
  }

  const ART = {};

  ART.bear = function () { return bear('happy'); };
  ART.bearHappy = function () { return bear('happy'); };
  ART.bearCheer = function () { return bear('cheer'); };
  ART.bearThink = function () { return bear('think'); };
  ART.bearOops = function () { return bear('oops'); };
  ART.bearCalm = function () { return bear('calm'); };

  ART.pouring = function () {
    return wrap(`
      ${shadow}
      <path d="M65 50 C62 43 56 40 50 39" fill="none" stroke="${C.blue}" stroke-width="6" stroke-linecap="round"/>
      <path d="M65 50 C62 43 56 40 50 39" fill="none" stroke="${C.sky}" stroke-width="2.2" stroke-linecap="round"/>
      <rect x="63" y="52" width="26" height="34" rx="7" fill="#eefaff" ${st}/>
      <path d="M66 68 h20 v12 a5 5 0 0 1 -5 5 h-10 a5 5 0 0 1 -5 -5 Z" fill="${C.blue}" ${st2}/>
      <path d="M69 60 v-4" stroke="${C.white}" stroke-width="2" stroke-linecap="round" opacity=".8"/>
      <path d="M20 34 h22 l7 8 0 4 -7 0 v22 a10 10 0 0 1 -10 10 h-9 a10 10 0 0 1 -10 -10 V44 a10 10 0 0 1 10 -10 Z" fill="${C.coral}" ${st}/>
      <path d="M20 34 h22 l7 8" fill="none" ${st}/>
      <path d="M31 34 V29 h9" fill="none" ${st}/>
      <path d="M11 51 h-5 a7 7 0 0 0 -7 7 v4 a7 7 0 0 0 7 7 h5" fill="none" ${st}/>
      <path d="M17 46 h13 v6 h-13 z" fill="${C.coralD}" opacity=".55"/>
    `, 'Menuang air');
  };

  ART.pitcher = function () {
    return wrap(`
      ${shadow}
      <path d="M27 33 h25 l8 9 v1 l-8 0 v22 a11 11 0 0 1 -11 11 H31 a11 11 0 0 1 -11 -11 V44 a11 11 0 0 1 11 -11 Z" fill="${C.orange}" ${st}/>
      <path d="M38 33 V27 h11" fill="none" ${st}/>
      <path d="M52 33 l10 10" fill="none" ${st}/>
      <path d="M18 51 h-5 a8 8 0 0 0 -8 8 v3 a8 8 0 0 0 8 8 h5" fill="none" ${st}/>
      <path d="M23 45 h16 v7 H23 Z" fill="${C.paper}" opacity=".55"/>
      <path d="M30 62 h6 v7 h-6 Z" fill="${C.orangeD}" opacity=".55"/>
      <circle cx="52" cy="41" r="2.2" fill="${C.sky}"/>
    `, 'Teko air');
  };

  ART['glass' + 'Empty'] = function () { return glassArt(0); };
  ART['glass' + 'Half'] = function () { return glassArt(1); };
  ART['glass' + 'Full'] = function () { return glassArt(2); };

  function glassArt(level) {
    let water = '';
    if (level === 1) {
      water = `<path d="M38 63 q6 -3 12 0 t12 0 v16 a7 7 0 0 1 -7 7 H45 a7 7 0 0 1 -7 -7 Z" fill="${C.blue}" ${st2}/>`;
    } else if (level === 2) {
      water = `<path d="M38 49 q6 -3 12 0 t12 0 v30 a7 7 0 0 1 -7 7 H45 a7 7 0 0 1 -7 -7 Z" fill="${C.blue}" ${st2}/>
        <circle cx="45" cy="60" r="2" fill="${C.sky}" opacity=".7"/><circle cx="54" cy="72" r="1.5" fill="${C.sky}" opacity=".7"/>`;
    }
    return wrap(`
      ${shadow}
      <path d="M34 30 h32 v46 a8 8 0 0 1 -8 8 H42 a8 8 0 0 1 -8 -8 Z" fill="#eefaff" ${st}/>
      ${water}
      <path d="M38 36 v-3" stroke="${C.white}" stroke-width="2.4" stroke-linecap="round" opacity=".9"/>
      <path d="M62 37 v8" stroke="${C.white}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
    `, 'Gelas air');
  }

  ART.handwash = function () {
    return wrap(`
      ${shadow}
      <path d="M18 83 q-4 -22 8 -30 q8 -5 13 3 q3 5 1 12 l8 2 q10 4 9 13 z" fill="${C.tan}" ${st}/>
      <path d="M56 81 q-3 -17 8 -22 q10 -4 14 4 q3 8 -1 18 z" fill="#ffe3c2" ${st}/>
      <circle cx="22" cy="49" r="5" fill="${C.tan}" ${st2}/>
      <circle cx="31" cy="44" r="5" fill="${C.tan}" ${st2}/>
      <circle cx="41" cy="45" r="4.6" fill="${C.tan}" ${st2}/>
      <circle cx="29" cy="32" r="6" fill="${C.white}" ${st2}/>
      <circle cx="43" cy="30" r="4.4" fill="${C.sky}" ${st2}/>
      <circle cx="36" cy="21" r="3.2" fill="${C.white}" ${st2}/>
      <circle cx="48" cy="38" r="2.4" fill="${C.white}" ${st2}/>
      <path d="M52 24 q4 -7 0 -11" fill="none" stroke="${C.blue}" stroke-width="3" stroke-linecap="round" opacity=".6"/>
      <circle cx="56" cy="33" r="2" fill="${C.sky}" opacity=".8"/>
    `, 'Cuci tangan');
  };

  ART.shirt = function () {
    return wrap(`
      ${shadow}
      <path d="M37 22 L44 18 Q50 24 56 18 L63 22 L79 32 L70 45 L64 41 V80 Q50 84 36 80 V41 L30 45 L21 32 Z" fill="${C.coral}" ${st}/>
      <path d="M44 18 Q50 27 56 18" fill="none" ${st}/>
      <path d="M50 27 V78" stroke="${C.ink}" stroke-width="1.8" stroke-dasharray="3 4" opacity=".55"/>
      <circle cx="50" cy="35" r="2.4" fill="${C.paper}" ${st2}/>
      <circle cx="50" cy="47" r="2.4" fill="${C.paper}" ${st2}/>
      <circle cx="50" cy="59" r="2.4" fill="${C.paper}" ${st2}/>
      <circle cx="50" cy="71" r="2.4" fill="${C.paper}" ${st2}/>
      <path d="M38 52 h8" stroke="${C.coralD}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
    `, 'Kemeja');
  };

  ART.sponge = function () {
    return wrap(`
      ${shadow}
      <rect x="26" y="55" width="52" height="22" rx="7" fill="${C.yellow}" ${st}/>
      <rect x="24" y="39" width="52" height="22" rx="7" fill="#ffdb63" ${st}/>
      <circle cx="35" cy="47" r="2.6" fill="${C.yellowD}" opacity=".8"/>
      <circle cx="47" cy="51" r="2" fill="${C.yellowD}" opacity=".8"/>
      <circle cx="59" cy="45" r="2.8" fill="${C.yellowD}" opacity=".8"/>
      <circle cx="68" cy="53" r="1.8" fill="${C.yellowD}" opacity=".8"/>
      <circle cx="76" cy="33" r="2.4" fill="${C.white}" ${st2}/>
      <circle cx="82" cy="26" r="1.6" fill="${C.sky}" ${st2}/>
      <path d="M33 63 q4 3 8 0 t8 0" fill="none" stroke="${C.yellowD}" stroke-width="2" stroke-linecap="round" opacity=".6"/>
    `, 'Spons');
  };

  ART.cloth = function () {
    return wrap(`
      ${shadow}
      <rect x="20" y="34" width="58" height="48" rx="9" fill="${C.pinkD}" ${st}/>
      <rect x="26" y="28" width="58" height="48" rx="9" fill="${C.pink}" ${st}/>
      <path d="M26 48 h58" stroke="${C.pinkD}" stroke-width="2" opacity=".6"/>
      <path d="M39 28 v48 M70 28 v48" stroke="${C.paper}" stroke-width="2.4" opacity=".6"/>
      <path d="M30 64 q8 -4 16 0 t16 0 t12 0" fill="none" stroke="${C.paper}" stroke-width="2.4" opacity=".7"/>
      <circle cx="23" cy="27" r="3" fill="${C.white}" ${st2}/>
      <circle cx="18" cy="34" r="2" fill="${C.sky}" ${st2}/>
    `, 'Kain lap');
  };

  ART.puddle = function () {
    return wrap(`
      <ellipse cx="50" cy="90" rx="32" ry="4" fill="${C.ink}" opacity=".07"/>
      <path d="M17 70 q-3 -10 9 -13 q4 -9 15 -7 q8 -8 18 -2 q12 -2 15 8 q10 2 8 12 q-2 9 -13 9 q-9 8 -20 4 q-11 5 -19 -2 q-12 0 -13 -9 Z" fill="${C.blue}" ${st}/>
      <path d="M28 64 q8 -4 14 1" fill="none" stroke="${C.sky}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      <circle cx="60" cy="66" r="3" fill="${C.sky}" opacity=".5"/>
      <path d="M72 34 q-4 7 0 9 q4 -2 0 -9 Z" fill="${C.blue}" ${st2}/>
      <path d="M83 24 q-3 5 0 7 q3 -2 0 -7 Z" fill="${C.blue}" ${st2}/>
    `, 'Tumpahan air');
  };

  ART.table = function () {
    return wrap(`
      ${shadow}
      <rect x="12" y="47" width="76" height="13" rx="5" fill="${C.brown}" ${st}/>
      <rect x="18" y="60" width="9" height="27" rx="3" fill="${C.brownD}" ${st}/>
      <rect x="73" y="60" width="9" height="27" rx="3" fill="${C.brownD}" ${st}/>
      <path d="M24 52 h18 M56 55 h15" stroke="${C.tan}" stroke-width="2" stroke-linecap="round" opacity=".7"/>
      <rect x="34" y="29" width="30" height="18" rx="4" fill="${C.paper}" ${st}/>
      <path d="M40 34 h18 M40 39 h12" stroke="${C.grayD}" stroke-width="2" stroke-linecap="round"/>
    `, 'Meja');
  };

  ART.sink = function () {
    return wrap(`
      ${shadow}
      <path d="M16 51 q0 -10 10 -10 h48 q10 0 10 10 l-7 28 q-2 7 -9 7 H32 q-7 0 -9 -7 Z" fill="${C.sky}" ${st}/>
      <path d="M24 54 q0 -5 6 -5 h40 q6 0 6 5 l-4 18 q-1 4 -5 4 H33 q-4 0 -5 -4 Z" fill="${C.paper}" ${st2}/>
      <path d="M66 52 V30 q0 -8 -8 -8 h-9" fill="none" ${st}/>
      <path d="M49 22 h-6 a3 3 0 0 0 -3 3 v5" fill="none" ${st}/>
      <circle cx="40" cy="33" r="2.2" fill="${C.blue}" ${st2}/>
      <path d="M40 38 q-2 5 0 6 q2 -1 0 -6 Z" fill="${C.blue}"/>
      <path d="M58 28 h6" stroke="${C.grayD}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="49" cy="80" r="2" fill="${C.blue}" opacity=".5"/>
    `, 'Tempat cuci piring');
  };

  ART.bed = function () {
    return wrap(`
      ${shadow}
      <rect x="9" y="36" width="9" height="49" rx="3" fill="${C.brown}" ${st}/>
      <rect x="14" y="60" width="72" height="13" rx="5" fill="${C.white}" ${st}/>
      <path d="M18 60 v-9 q0 -5 5 -5 h20 q5 0 5 5 v9" fill="${C.paper}" ${st2}/>
      <rect x="17" y="48" width="20" height="12" rx="5" fill="${C.paper}" ${st}/>
      <path d="M47 60 q0 -4 4 -4 h28 q4 0 4 4 v13 H47 Z" fill="${C.coral}" ${st}/>
      <path d="M52 56 h25" stroke="${C.white}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
      <rect x="82" y="59" width="8" height="26" rx="3" fill="${C.brown}" ${st}/>
      <rect x="19" y="72" width="6" height="12" rx="2" fill="${C.brownD}" ${st}/>
      <rect x="75" y="72" width="6" height="12" rx="2" fill="${C.brownD}" ${st}/>
      <path d="M25 54 q6 -2 11 0" fill="none" stroke="${C.grayD}" stroke-width="2" stroke-linecap="round"/>
    `, 'Tempat tidur');
  };

  ART.rug = function () {
    return wrap(`
      <ellipse cx="50" cy="84" rx="42" ry="10" fill="${C.ink}" opacity=".06"/>
      <ellipse cx="50" cy="66" rx="40" ry="20" fill="${C.coral}" ${st}/>
      <ellipse cx="50" cy="66" rx="31" ry="14" fill="${C.orange}" ${st2}/>
      <ellipse cx="50" cy="66" rx="21" ry="8.5" fill="${C.yellow}" ${st2}/>
      <ellipse cx="50" cy="66" rx="10" ry="4" fill="${C.coral}" ${st2}/>
      <path d="M15 88 h70" stroke="${C.coralD}" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 5" opacity=".6"/>
    `, 'Karpet');
  };

  ART.shoe = function () {
    return wrap(`
      ${shadow}
      <path d="M16 64 q0 -8 9 -10 l14 -4 q6 -2 9 3 l6 9 q4 5 13 6 q11 1 12 9 H18 q-4 0 -4 -4 Z" fill="${C.coralD}" ${st}/>
      <path d="M14 76 h68 v6 q0 4 -4 4 H20 q-6 0 -6 -6 Z" fill="${C.white}" ${st}/>
      <path d="M40 55 q4 9 14 12" fill="none" stroke="${C.paper}" stroke-width="3" stroke-linecap="round"/>
      <path d="M46 53 l4 -3 M50 57 l4 -3 M54 61 l4 -3" stroke="${C.paper}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="62" cy="64" r="2" fill="${C.paper}" opacity=".8"/>
      <path d="M18 71 h62" stroke="${C.coral}" stroke-width="2" opacity=".7"/>
    `, 'Sepatu');
  };

  ART.sock = function () {
    return wrap(`
      ${shadow}
      <path d="M38 20 h22 q4 0 4 4 v28 q0 6 5 9 l9 6 q7 5 3 13 q-4 7 -13 5 l-20 -8 q-9 -4 -9 -14 V24 q0 -4 4 -4 Z" fill="${C.coral}" ${st}/>
      <path d="M38 28 h22 M38 38 h22 M38 48 h22 M42 58 q-.5 6 4 9" fill="none" stroke="${C.paper}" stroke-width="4" opacity=".85"/>
      <path d="M68 60 q7 3 6 10" fill="none" stroke="${C.pink}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M38 20 h22" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="31" cy="29" r="2.4" fill="${C.white}" ${st2}/>
      <circle cx="24" cy="36" r="1.6" fill="${C.sky}" ${st2}/>
    `, 'Kaus kaki');
  };

  ART.wateringcan = function () {
    return wrap(`
      ${shadow}
      <path d="M27 46 h36 v24 q0 10 -10 10 H37 q-10 0 -10 -10 Z" fill="${C.green}" ${st}/>
      <path d="M27 46 q-6 0 -6 -6 V36 q0 -5 5 -5 h8" fill="none" ${st}/>
      <path d="M63 48 l20 -14 q4 -2 6 2 q2 4 -2 6 L67 56" fill="${C.green}" ${st}/>
      <path d="M88 30 q3 2 1 6" fill="none" ${st2}/>
      <path d="M46 34 a10 10 0 0 0 -19 0" fill="none" ${st}/>
      <path d="M31 55 h28" stroke="${C.white}" stroke-width="3" stroke-linecap="round" opacity=".45"/>
      <path d="M88 44 q-3 6 0 8 q3 -2 0 -8 Z" fill="${C.blue}" ${st2}/>
      <path d="M80 54 q-2 5 0 6 q2 -1 0 -6 Z" fill="${C.blue}" ${st2}/>
      <circle cx="93" cy="58" r="2" fill="${C.blue}"/>
      <circle cx="50" cy="24" r="2.2" fill="${C.white}" ${st2}/>
      <circle cx="57" cy="19" r="1.5" fill="${C.sky}" ${st2}/>
    `, 'Alat penyiram');
  };

  ART.spoon = function () {
    return wrap(`
      ${shadow}
      <ellipse cx="39" cy="35" rx="13" ry="17" fill="${C.gray}" ${st} transform="rotate(-20 39 35)"/>
      <ellipse cx="39" cy="34" rx="8.5" ry="12" fill="#e8edf6" ${st2} transform="rotate(-20 39 34)"/>
      <path d="M48 47 Q63 60 73 78" fill="none" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/>
      <path d="M48 47 Q63 60 73 78" fill="none" stroke="${C.gray}" stroke-width="8" stroke-linecap="round"/>
      <path d="M34 25 q4 -3 7 1" fill="none" stroke="${C.white}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="79" cy="81" r="3" fill="${C.grayD}" ${st2}/>
    `, 'Sendok');
  };

  ART.pencil = function () {
    return wrap(`
      ${shadow}
      <g transform="rotate(38 50 50)">
        <rect x="41" y="12" width="18" height="58" fill="${C.yellow}" ${st}/>
        <rect x="41" y="12" width="6" height="58" fill="${C.paper}" opacity=".45"/>
        <path d="M41 70 h18 l-9 16 Z" fill="${C.tan}" ${st}/>
        <path d="M46 80 h8 l-4 6 Z" fill="${C.ink}"/>
        <rect x="41" y="6" width="18" height="10" rx="3" fill="${C.pink}" ${st}/>
        <rect x="41" y="17" width="18" height="4" fill="${C.yellowD}" opacity=".7"/>
      </g>
    `, 'Pensil');
  };

  ART.toyBlocks = function () {
    return wrap(`
      ${shadow}
      ${cube(20, 55, 34, 28, C.coral, '#ffb09b', C.coralD)}
      ${cube(47, 40, 32, 42, C.blue, '#a8d4f5', C.blueD)}
      <text x="37" y="76" text-anchor="middle" font-family="Fredoka, Trebuchet MS, sans-serif" font-size="18" font-weight="600" fill="${C.paper}">A</text>
      <text x="63" y="69" text-anchor="middle" font-family="Fredoka, Trebuchet MS, sans-serif" font-size="20" font-weight="600" fill="${C.paper}">B</text>
      <path d="M21 49 h14" stroke="${C.grayD}" stroke-width="2" stroke-linecap="round" opacity=".6"/>
    `, 'Letter blocks');
  };

  ART.tv = function () {
    return wrap(`
      ${shadow}
      <path d="M42 22 L34 10 M58 22 L66 10" fill="none" ${st}/>
      <rect x="12" y="24" width="76" height="55" rx="10" fill="${C.purple}" ${st}/>
      <rect x="21" y="33" width="49" height="34" rx="5" fill="${C.sky}" ${st2}/>
      <path d="M27 58 l10 -12 8 8 7 -10 10 14" fill="${C.green}" opacity=".8"/>
      <circle cx="37" cy="41" r="3.6" fill="${C.yellow}" opacity=".9"/>
      <circle cx="76" cy="42" r="4" fill="${C.paper}" ${st2}/>
      <circle cx="76" cy="55" r="4" fill="${C.paper}" ${st2}/>
      <rect x="21" y="70" width="30" height="4" rx="2" fill="${C.paper}" opacity=".6"/>
    `, 'Televisi');
  };

  ART.turtle = function () {
    return wrap(`
      ${shadow}
      <ellipse cx="31" cy="83" rx="7" ry="4" fill="${C.greenD}" ${st2}/>
      <ellipse cx="61" cy="83" rx="7" ry="4" fill="${C.greenD}" ${st2}/>
      <path d="M14 66 q2 -24 30 -26 q28 2 30 26 q-2 10 -12 10 H26 q-10 0 -12 -10 Z" fill="${C.green}" ${st}/>
      <path d="M30 55 q10 -10 20 0 q10 10 -10 15 q-20 -5 -10 -15 Z" fill="${C.greenD}" ${st2}/>
      <path d="M50 46 v-6 M39 50 l-4 -6 M61 50 l4 -6" stroke="${C.greenD}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="76" cy="58" r="11" fill="${C.leaf}" ${st}/>
      <circle cx="80" cy="55" r="2.2" fill="${C.ink}"/>
      <path d="M79 63 q4 1 6 -1" fill="none" ${st2}/>
      <circle cx="82" cy="60" r="1.8" fill="${C.pink}" opacity=".6"/>
      <path d="M66 70 q-2 4 0 6" fill="none" stroke="${C.greenD}" stroke-width="2" stroke-linecap="round"/>
    `, 'Kura-kura');
  };

  ART.rabbit = function () {
    return wrap(`
      ${shadow}
      <ellipse cx="50" cy="80" rx="24" ry="14" fill="${C.paper}" ${st}/>
      <path d="M40 54 q-9 -28 0 -34 q8 -5 10 12 v22" fill="${C.paper}" ${st}/>
      <path d="M60 54 q9 -28 0 -34 q-8 -5 -10 12 v22" fill="${C.paper}" ${st}/>
      <path d="M43 48 q-4 -22 0 -25 q4 -2 4 10 v15" fill="${C.pink}" opacity=".8"/>
      <path d="M57 48 q4 -22 0 -25 q-4 -2 -4 10 v15" fill="${C.pink}" opacity=".8"/>
      <circle cx="50" cy="54" r="19" fill="${C.paper}" ${st}/>
      <circle cx="43" cy="52" r="2.6" fill="${C.ink}"/>
      <circle cx="57" cy="52" r="2.6" fill="${C.ink}"/>
      <path d="M46 60 q4 4 8 0" fill="none" ${st2}/>
      <ellipse cx="50" cy="57" rx="2.6" ry="2" fill="${C.pink}" ${st2}/>
      <circle cx="38" cy="59" r="3" fill="${C.pink}" opacity=".45"/>
      <circle cx="62" cy="59" r="3" fill="${C.pink}" opacity=".45"/>
      <path d="M28 76 q-4 2 -5 7 M72 76 q4 2 5 7" fill="none" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="50" cy="86" r="3.4" fill="${C.pink}" opacity=".7"/>
    `, 'Kelinci');
  };

  ART.trashbin = function () {
    return wrap(`
      ${shadow}
      <path d="M24 34 h52 l-6 48 q-1 7 -8 7 H38 q-7 0 -8 -7 Z" fill="${C.mintD}" ${st}/>
      <rect x="20" y="26" width="60" height="10" rx="5" fill="${C.teal}" ${st}/>
      <path d="M42 26 v-5 q0 -4 4 -4 h8 q4 0 4 4 v5" fill="none" ${st}/>
      <path d="M50 44 q-11 8 -3 16 q8 5 14 -2 q5 -8 -6 -10" fill="none" stroke="${C.paper}" stroke-width="3" stroke-linecap="round"/>
      <path d="M38 72 h24" stroke="${C.paper}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
      <circle cx="80" cy="20" r="2" fill="${C.sky}"/>
      <circle cx="86" cy="30" r="1.4" fill="${C.green}"/>
    `, 'Tempat sampah');
  };

  ART.pinkTower = function () {
    const pinks = ['#f583ae', '#f78fb9', '#f99ac3', '#fba7cc', '#fdbbd8'];
    let s = `<ellipse cx="51" cy="88" rx="38" ry="4.5" fill="${C.ink}" opacity=".08"/>
      <path d="M12 84 h76" stroke="${C.brown}" stroke-width="5" stroke-linecap="round"/>`;
    for (let i = 0; i < 5; i++) {
      const w = 54 - i * 9;
      const x = 50 - w / 2;
      const y = 74 - i * 10;
      s += cube(x, y, w, 10, pinks[i], '#ffd6e6', '#d96a9b', 5);
    }
    return wrap(s, 'Menara Pink');
  };

  function singleCube(w, h, label) {
    return wrap(`
      ${shadow}
      ${cube(50 - w / 2, 82 - h, w, h, '#f78fb9', '#ffd0e2', '#d96a9b', Math.max(5, w * 0.16))}
      <path d="M${50 - w / 2 + 5} ${82 - h + 5} h${w * 0.35}" stroke="${C.paper}" stroke-width="2" stroke-linecap="round" opacity=".45"/>
    `, label);
  }
  ART.cubeLarge = function () { return singleCube(56, 46, 'Kubus besar'); };
  ART.cubeMedium = function () { return singleCube(42, 34, 'Kubus sedang'); };
  ART.cubeSmall = function () { return singleCube(28, 24, 'Kubus kecil'); };

  function tablet(color, label) {
    return wrap(`
      ${shadow}
      <rect x="31" y="16" width="38" height="68" rx="12" fill="${color}" ${st}/>
      <rect x="37" y="23" width="26" height="54" rx="8" fill="${C.white}" opacity=".18" ${st2}/>
      <path d="M38 30 v-4 M62 30 v-4" stroke="${C.white}" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
      <path d="M31 28 q-6 6 0 12" fill="none" stroke="${C.white}" stroke-width="2" opacity=".35"/>
    `, label);
  }
  ART.tabletRed = function () { return tablet('#ef5350', 'Tablet merah'); };
  ART.tabletBlue = function () { return tablet('#5c8df6', 'Tablet biru'); };
  ART.tabletYellow = function () { return tablet('#ffc832', 'Tablet kuning'); };

  ART.soundCylinder = function () {
    return wrap(`
      ${shadow}
      <ellipse cx="37" cy="78" rx="17" ry="5" fill="${C.brownD}" ${st}/>
      <path d="M20 78 V44 q0 -5 17 -5 t17 5 v34" fill="${C.sand}" ${st}/>
      <ellipse cx="37" cy="43" rx="17" ry="6" fill="${C.tan}" ${st}/>
      <ellipse cx="37" cy="43" rx="9" ry="3" fill="${C.brown}" opacity=".35"/>
      <circle cx="32" cy="60" r="2.2" fill="${C.brownD}"/>
      <circle cx="40" cy="66" r="2.2" fill="${C.brownD}"/>
      <circle cx="34" cy="72" r="2.2" fill="${C.brownD}"/>
      <ellipse cx="69" cy="82" rx="15" ry="4.5" fill="${C.brownD}" ${st}/>
      <path d="M54 82 V54 q0 -5 15 -5 t15 5 v28" fill="${C.tan}" ${st}/>
      <ellipse cx="69" cy="53" rx="15" ry="5.4" fill="${C.cream}" ${st}/>
      <circle cx="65" cy="67" r="2" fill="${C.brownD}"/>
      <circle cx="73" cy="71" r="2" fill="${C.brownD}"/>
      <path d="M22 30 q5 -6 12 -4" fill="none" stroke="${C.ink}" stroke-width="2" stroke-linecap="round" opacity=".35"/>
    `, 'Kotak bunyi');
  };

  ART.bell = function () {
    return wrap(`
      ${shadow}
      <path d="M50 20 q-3 -8 4 -9 q4 0 4 5" fill="none" ${st}/>
      <path d="M28 66 q2 -34 22 -34 t22 34 q0 6 -7 6 H35 q-7 0 -7 -6 Z" fill="${C.yellow}" ${st}/>
      <path d="M26 69 q2 8 11 8 h26 q9 0 11 -8 Z" fill="${C.yellowD}" ${st}/>
      <circle cx="50" cy="82" r="5" fill="${C.orange}" ${st}/>
      <path d="M37 49 q2 -10 8 -12" fill="none" stroke="${C.white}" stroke-width="2.6" stroke-linecap="round" opacity=".65"/>
      <circle cx="84" cy="30" r="2.6" fill="${C.yellow}" opacity=".8"/>
      <circle cx="88" cy="40" r="1.8" fill="${C.yellow}" opacity=".6"/>
    `, 'Lonceng');
  };

  ART.drum = function () {
    return wrap(`
      ${shadow}
      <path d="M25 42 v28 q0 10 25 10 t25 -10 V42" fill="${C.coralD}" ${st}/>
      <ellipse cx="50" cy="42" rx="25" ry="9" fill="${C.cream}" ${st}/>
      <ellipse cx="50" cy="42" rx="17" ry="5.5" fill="${C.tan}" opacity=".7"/>
      <path d="M26 56 q24 9 48 0 M26 66 q24 9 48 0" fill="none" stroke="${C.paper}" stroke-width="2" opacity=".5"/>
      <path d="M32 24 L24 36 M68 24 L76 36" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
      <path d="M32 24 L24 36 M68 24 L76 36" stroke="${C.sand}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="20" cy="22" r="2" fill="${C.yellow}"/>
      <circle cx="80" cy="20" r="1.6" fill="${C.yellow}"/>
    `, 'Drum');
  };

  ART.sandpaper = function () {
    let dots = '';
    for (let i = 0; i < 20; i++) {
      const x = 29 + ((i * 37) % 44);
      const y = 26 + ((i * 23) % 50);
      dots += `<circle cx="${x}" cy="${y}" r="${1 + (i % 3) * 0.5}" fill="${C.brownD}" opacity=".45"/>`;
    }
    return wrap(`
      ${shadow}
      <path d="M22 20 h58 q4 0 4 4 v58 q0 4 -4 4 H24 q-4 0 -4 -4 V24 q0 -4 2 -4 Z" fill="${C.sand}" ${st}/>
      <path d="M24 80 l12 -12" fill="none" stroke="${C.brownD}" stroke-width="2" opacity=".4"/>
      ${dots}
      <path d="M76 76 q5 4 2 8" fill="none" ${st2}/>
      <circle cx="78" cy="30" r="1.8" fill="${C.white}" opacity=".5"/>
    `, 'Kertas pasir');
  };

  ART.silk = function () {
    return wrap(`
      ${shadow}
      <path d="M18 32 q14 -10 32 0 t32 0 v34 q-15 12 -32 0 t-32 0 Z" fill="${C.pink}" ${st}/>
      <path d="M20 41 q14 -9 30 0 t30 0" fill="none" stroke="${C.white}" stroke-width="3" stroke-linecap="round" opacity=".65"/>
      <path d="M20 53 q14 -9 30 0 t30 0" fill="none" stroke="${C.pinkD}" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
      <path d="M20 64 q14 -9 30 0 t30 0" fill="none" stroke="${C.white}" stroke-width="2.4" stroke-linecap="round" opacity=".5"/>
      <circle cx="78" cy="20" r="2.2" fill="${C.pink}" opacity=".8"/>
      <circle cx="24" cy="72" r="1.8" fill="${C.pink}" opacity=".7"/>
    `, 'Kain sutra');
  };

  ART.sphere = function () {
    return wrap(`
      ${shadow}
      <circle cx="50" cy="52" r="33" fill="${C.blue}" ${st}/>
      <path d="M28 32 q10 -8 21 -7" fill="none" stroke="${C.white}" stroke-width="6" stroke-linecap="round" opacity=".5"/>
      <circle cx="66" cy="65" r="4" fill="${C.blueD}" opacity=".5"/>
      <path d="M32 62 q7 10 18 12" fill="none" stroke="${C.blueD}" stroke-width="2.4" stroke-linecap="round" opacity=".4"/>
      <ellipse cx="50" cy="87" rx="24" ry="2.6" fill="${C.blueD}" opacity=".18"/>
    `, 'Bola');
  };

  ART.cube3d = function () {
    return wrap(`
      ${shadow}
      ${cube(25, 34, 46, 46, C.yellow, '#ffe38a', C.yellowD, 10)}
      <path d="M31 44 h12" stroke="${C.white}" stroke-width="2.6" stroke-linecap="round" opacity=".55"/>
    `, 'Kubus');
  };

  ART.cylinder = function () {
    return wrap(`
      ${shadow}
      <path d="M30 30 v46 q0 8 20 8 t20 -8 V30" fill="${C.purple}" ${st}/>
      <ellipse cx="50" cy="30" rx="20" ry="8" fill="${C.lavender}" ${st}/>
      <ellipse cx="50" cy="30" rx="11" ry="4" fill="${C.purpleD}" opacity=".35"/>
      <path d="M34 40 v28" stroke="${C.white}" stroke-width="3" stroke-linecap="round" opacity=".35"/>
      <ellipse cx="50" cy="85" rx="19" ry="3" fill="${C.purpleD}" opacity=".18"/>
    `, 'Tabung');
  };

  ART.rock = function () {
    return wrap(`
      ${shadow}
      <path d="M18 78 q-5 -15 7 -24 q3 -14 18 -16 q16 -2 23 9 q14 6 12 19 q-1 12 -15 14 H32 q-11 0 -14 -2 Z" fill="${C.grayD}" ${st}/>
      <path d="M31 42 q10 4 12 18 q-4 9 -12 9 q-8 -8 0 -27 Z" fill="${C.gray}" opacity=".8"/>
      <path d="M60 40 q9 8 6 20" fill="none" stroke="${C.gray}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      <ellipse cx="76" cy="84" rx="7" ry="4" fill="${C.grayD}" ${st2}/>
      <circle cx="25" cy="32" r="1.8" fill="${C.gray}"/>
    `, 'Batu');
  };

  ART.feather = function () {
    return wrap(`
      ${shadow}
      <path d="M67 16 q18 20 -2 46 L48 82 q-8 -18 2 -36 q8 -17 17 -30 Z" fill="${C.paper}" ${st}/>
      <path d="M66 18 q-6 24 -13 40" fill="none" stroke="${C.grayD}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M60 28 q-9 0 -14 8 M58 38 q-9 1 -13 9 M56 49 q-8 2 -11 9 M54 60 q-6 2 -9 8" fill="none" stroke="${C.blue}" stroke-width="2" stroke-linecap="round" opacity=".55"/>
      <path d="M63 23 q-3 18 -9 34" fill="none" stroke="${C.blue}" stroke-width="2.2" stroke-linecap="round" opacity=".45"/>
      <path d="M48 82 l-5 7" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="80" cy="26" r="2" fill="${C.blue}" opacity=".5"/>
    `, 'Bulu');
  };

  ART.flower = function () {
    return wrap(`
      ${shadow}
      <path d="M50 82 V52" stroke="${C.greenD}" stroke-width="4" stroke-linecap="round"/>
      <path d="M50 68 q-14 2 -18 -9 q14 -3 18 9 Z" fill="${C.green}" ${st2}/>
      <path d="M50 74 q14 3 18 -8 q-14 -4 -18 8 Z" fill="${C.leaf}" ${st2}/>
      <g ${st}>
        <circle cx="50" cy="34" r="11" fill="${C.pink}"/>
        <circle cx="39" cy="43" r="10" fill="${C.pink}"/>
        <circle cx="61" cy="43" r="10" fill="${C.pink}"/>
        <circle cx="43" cy="53" r="9" fill="${C.pink}"/>
        <circle cx="57" cy="53" r="9" fill="${C.pink}"/>
      </g>
      <circle cx="50" cy="43" r="7" fill="${C.yellow}" ${st}/>
      <circle cx="48" cy="41" r="1.6" fill="${C.white}"/>
      <circle cx="54" cy="46" r="1.2" fill="${C.orangeD}"/>
      <circle cx="22" cy="30" r="2" fill="${C.pink}" opacity=".6"/>
      <circle cx="80" cy="62" r="1.6" fill="${C.pink}" opacity=".6"/>
    `, 'Bunga');
  };

  ART.star = function () {
    return wrap(`
      <ellipse cx="50" cy="88" rx="20" ry="3.4" fill="${C.ink}" opacity=".06"/>
      <path d="${starD(50, 50, 34, 15)}" fill="${C.yellow}" ${st}/>
      <path d="${starD(46, 46, 14, 6)}" fill="${C.white}" opacity=".28" transform="rotate(-18 46 46)"/>
      <circle cx="31" cy="38" r="2" fill="${C.yellowD}" opacity=".4"/>
      <circle cx="73" cy="28" r="2.6" fill="${C.yellow}" opacity=".7"/>
      <circle cx="82" cy="40" r="1.6" fill="${C.yellow}" opacity=".5"/>
    `, 'Star');
  };

  ART.eye = function () {
    return wrap(`
      <path d="M12 53 q38 -33 76 0 q-38 30 -76 0 Z" fill="${C.paper}" ${st}/>
      <circle cx="50" cy="52" r="16" fill="${C.blue}" ${st}/>
      <circle cx="50" cy="52" r="8" fill="${C.ink}"/>
      <circle cx="54" cy="47" r="2.6" fill="${C.white}"/>
      <path d="M22 42 q-4 -7 -10 -8 M44 30 q-1 -7 -4 -10 M56 29 q2 -7 6 -9 M78 41 q4 -6 9 -7" fill="none" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M18 55 q10 8 22 10" fill="none" stroke="${C.blue}" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>
    `, 'Mata');
  };

  ART.ball = function () {
    return wrap(`
      ${shadow}
      <circle cx="50" cy="53" r="33" fill="${C.coral}" ${st}/>
      <path d="M50 20 q-10 18 -20 26 q22 4 43 -6 q-8 -14 -23 -20 Z" fill="${C.paper}" opacity=".9"/>
      <path d="M17 53 q18 -7 22 -19 M83 54 q-16 8 -28 22" fill="none" stroke="${C.blueD}" stroke-width="4" stroke-linecap="round" opacity=".7"/>
      <path d="M28 74 q14 -10 30 4" fill="none" stroke="${C.blue}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
      <circle cx="35" cy="40" r="2.4" fill="${C.white}" opacity=".6"/>
      <path d="M50 78 l5 -5 5 5 -5 5 Z" fill="${C.yellow}" ${st2}/>
    `, 'Bola');
  };

  ART.apple = function () {
    return wrap(`
      ${shadow}
      <path d="M50 32 q-5 -12 -16 -11 q-18 2 -17 25 q1 25 19 30 q9 2 14 -2 q5 4 14 2 q18 -5 19 -30 q1 -23 -17 -25 q-11 -1 -16 11 Z" fill="#ef5350" ${st}/>
      <path d="M50 33 q-2 -10 1 -15" fill="none" stroke="${C.brownD}" stroke-width="4" stroke-linecap="round"/>
      <path d="M52 24 q8 -12 18 -8 q-1 11 -18 8 Z" fill="${C.green}" ${st2}/>
      <path d="M38 49 q-4 8 2 14" fill="none" stroke="${C.white}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
      <path d="M50 30 q-4 10 -8 12 q6 3 8 -1" fill="${C.coralD}" opacity=".55"/>
    `, 'Apel');
  };

  ART.orange = function () {
    return wrap(`
      ${shadow}
      <circle cx="50" cy="55" r="30" fill="${C.orange}" ${st}/>
      <path d="M50 26 q-2 -8 2 -12" fill="none" stroke="${C.brownD}" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M52 20 q12 -8 18 0 q-7 8 -18 0 Z" fill="${C.green}" ${st2}/>
      <path d="M36 45 q-6 8 -1 17" fill="none" stroke="${C.white}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
      <circle cx="63" cy="62" r="1.5" fill="${C.orangeD}" opacity=".7"/>
      <circle cx="56" cy="72" r="1.2" fill="${C.orangeD}" opacity=".7"/>
      <circle cx="70" cy="48" r="1.3" fill="${C.orangeD}" opacity=".7"/>
    `, 'Jeruk');
  };

  ART.banana = function () {
    return wrap(`
      ${shadow}
      <path d="M26 28 q4 34 29 45 q18 7 27 -8 q-4 2 -9 1 q-21 -5 -31 -27 q-3 -8 -2 -14 q-9 -2 -14 3 Z" fill="${C.yellow}" ${st}/>
      <path d="M29 32 q2 24 25 36" fill="none" stroke="${C.yellowD}" stroke-width="3" stroke-linecap="round" opacity=".8"/>
      <path d="M25 26 q-3 -6 2 -8 q5 -2 6 5" fill="${C.brown}" ${st2}/>
      <path d="M77 67 q4 -5 6 -2 q2 3 -3 4" fill="${C.brown}" ${st2}/>
      <path d="M38 55 q8 10 18 14" fill="none" stroke="${C.white}" stroke-width="2.4" stroke-linecap="round" opacity=".45"/>
    `, 'Pisang');
  };

  ART.balloon = function () {
    return wrap(`
      ${shadow}
      <ellipse cx="50" cy="42" rx="24" ry="29" fill="${C.pink}" ${st}/>
      <path d="M50 71 l-5 7 h10 Z" fill="${C.pinkD}" ${st2}/>
      <path d="M50 78 q10 8 2 16 q-5 4 -9 0" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M37 27 q4 -8 12 -9" fill="none" stroke="${C.white}" stroke-width="4" stroke-linecap="round" opacity=".55"/>
      <circle cx="62" cy="40" r="2.2" fill="${C.white}" opacity=".4"/>
      <circle cx="82" cy="24" r="2.2" fill="${C.pink}" opacity=".6"/>
      <circle cx="18" cy="52" r="1.8" fill="${C.yellow}" opacity=".8"/>
    `, 'Balon');
  };

  ART.cake = function () {
    return wrap(`
      ${shadow}
      <path d="M25 58 q0 -8 25 -8 t25 8 v20 q0 6 -7 6 H32 q-7 0 -7 -6 Z" fill="${C.tan}" ${st}/>
      <path d="M22 52 q5 -14 28 -14 t28 14 q2 8 -6 8 H28 q-8 0 -6 -8 Z" fill="${C.pink}" ${st}/>
      <path d="M26 57 q6 6 12 0 t12 0 t12 0 t12 0" fill="none" stroke="${C.paper}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="50" cy="23" r="6" fill="${C.coralD}" ${st2}/>
      <path d="M50 17 q0 -7 4 -8" fill="none" stroke="${C.greenD}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="34" cy="66" r="2" fill="${C.coral}"/>
      <circle cx="50" cy="72" r="2" fill="${C.blue}"/>
      <circle cx="66" cy="65" r="2" fill="${C.yellow}"/>
    `, 'Kue');
  };

  ART.cup = function () {
    return wrap(`
      ${shadow}
      <path d="M26 36 h36 v28 q0 12 -12 12 H38 q-12 0 -12 -12 Z" fill="${C.teal}" ${st}/>
      <path d="M62 44 h6 q9 0 9 9 t-9 9 h-6" fill="none" ${st}/>
      <path d="M32 43 h24" stroke="${C.white}" stroke-width="3" stroke-linecap="round" opacity=".4"/>
      <path d="M36 26 q-4 -6 0 -10 M48 26 q-4 -6 0 -10" fill="none" stroke="${C.grayD}" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
      <circle cx="37" cy="57" r="2.2" fill="${C.paper}" opacity=".6"/>
    `, 'Cangkir');
  };

  ART.book = function () {
    return wrap(`
      ${shadow}
      <path d="M50 32 q-14 -10 -34 -4 v45 q20 -5 34 4 q14 -9 34 -4 V28 q-20 -6 -34 4 Z" fill="${C.paper}" ${st}/>
      <path d="M50 32 v45" fill="none" ${st}/>
      <path d="M22 39 q14 -3 22 2 M22 50 q14 -3 22 2 M22 61 q14 -3 22 2 M56 41 q12 -4 22 -2 M56 52 q12 -4 22 -2 M56 63 q12 -4 22 -2" fill="none" stroke="${C.grayD}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M66 18 l4 -9 4 9 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 Z" fill="${C.yellow}" ${st2}/>
    `, 'Buku');
  };

  ART.abcCards = function () {
    return wrap(`
      ${shadow}
      <g transform="rotate(-10 32 52)">
        <rect x="14" y="26" width="36" height="48" rx="6" fill="${C.paper}" ${st}/>
        <text x="32" y="62" text-anchor="middle" font-family="Fredoka, Trebuchet MS, sans-serif" font-size="28" font-weight="600" fill="${C.coralD}">A</text>
        <path d="M20 34 h8 M20 68 h8" stroke="${C.coral}" stroke-width="2" stroke-linecap="round" opacity=".5"/>
      </g>
      <g transform="rotate(7 68 52)">
        <rect x="50" y="26" width="36" height="48" rx="6" fill="${C.paper}" ${st}/>
        <text x="68" y="62" text-anchor="middle" font-family="Fredoka, Trebuchet MS, sans-serif" font-size="28" font-weight="600" fill="${C.blueD}">B</text>
        <path d="M56 34 h8 M56 68 h8" stroke="${C.blue}" stroke-width="2" stroke-linecap="round" opacity=".5"/>
      </g>
      <rect x="32" y="18" width="36" height="48" rx="6" fill="${C.paper}" ${st}/>
      <text x="50" y="53" text-anchor="middle" font-family="Fredoka, Trebuchet MS, sans-serif" font-size="28" font-weight="600" fill="${C.purpleD}">C</text>
      <path d="M38 27 h8 M54 27 h8 M38 59 h8 M54 59 h8" stroke="${C.purple}" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    `, 'Letter cards');
  };

  ART.numberRods = function () {
    const lens = [2, 3, 4, 5];
    let s = `<ellipse cx="50" cy="88" rx="38" ry="4" fill="${C.ink}" opacity=".07"/>`;
    lens.forEach(function (n, row) {
      const y = 70 - row * 14;
      const w = n * 12;
      const x = 18;
      for (let i = 0; i < n; i++) {
        s += `<rect x="${x + i * 12}" y="${y}" width="12" height="11" fill="${i % 2 ? C.blue : C.coral}" ${st2}/>`;
      }
      s += `<circle cx="${x + w + 10}" cy="${y + 5.5}" r="3.2" fill="${C.tan}" ${st2}/>`;
    });
    return wrap(s, 'Number rods');
  };

  ART.arrowLR = function () { return arrowArt('right'); };
  ART.arrowRL = function () { return arrowArt('left'); };
  ART.arrowDown = function () { return arrowArt('down'); };

  function arrowArt(dir) {
    let g = '';
    if (dir === 'right') {
      g = `<path d="M18 50 h60" fill="none" stroke="${C.blue}" stroke-width="10" stroke-linecap="round"/>
        <path d="M62 34 l22 16 -22 16" fill="none" stroke="${C.blue}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 33 h10 M10 50 h14 M14 67 h10" stroke="${C.blueD}" stroke-width="4" stroke-linecap="round" opacity=".5"/>`;
    } else if (dir === 'left') {
      g = `<path d="M22 50 h60" fill="none" stroke="${C.blue}" stroke-width="10" stroke-linecap="round"/>
        <path d="M38 34 L16 50 38 66" fill="none" stroke="${C.blue}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M76 33 h10 M76 50 h14 M76 67 h10" stroke="${C.blueD}" stroke-width="4" stroke-linecap="round" opacity=".5"/>`;
    } else {
      g = `<path d="M50 18 v60" fill="none" stroke="${C.blue}" stroke-width="10" stroke-linecap="round"/>
        <path d="M34 62 L50 84 66 62" fill="none" stroke="${C.blue}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M33 14 v10 M50 10 v14 M67 14 v10" stroke="${C.blueD}" stroke-width="4" stroke-linecap="round" opacity=".5"/>`;
    }
    return wrap(`
      <rect x="8" y="14" width="84" height="72" rx="18" fill="${C.sky}" ${st2} opacity=".5"/>
      <g transform="${dir === 'down' ? 'rotate(0)' : ''}">${g}</g>
    `, 'Arah baca');
  }

  ART.globe = function () {
    return wrap(`
      ${shadow}
      <path d="M50 82 v7" stroke="${C.ink}" stroke-width="4"/>
      <path d="M38 90 h24" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
      <path d="M50 82 q-31 -2 -31 -31 a31 31 0 0 1 62 0 q0 29 -31 31 Z" fill="${C.blue}" ${st}/>
      <path d="M27 38 q10 -9 19 -2 q6 5 2 11 q-8 8 -17 3 q-9 -5 -4 -12 Z" fill="${C.green}" ${st2}/>
      <path d="M57 30 q9 -5 16 2 q6 6 -2 11 q-9 4 -14 -2 q-4 -6 0 -11 Z" fill="${C.leaf}" ${st2}/>
      <path d="M44 52 q8 -2 13 4 q4 6 -3 9 q-8 3 -12 -3 q-3 -7 2 -10 Z" fill="${C.green}" ${st2}/>
      <path d="M66 55 q7 1 7 9 q0 7 -7 6 q-6 -2 -5 -9 q1 -6 5 -6 Z" fill="${C.leaf}" ${st2}/>
      <path d="M31 23 q-8 3 -12 12" fill="none" stroke="${C.white}" stroke-width="3" stroke-linecap="round" opacity=".5"/>
      <circle cx="36" cy="63" r="1.4" fill="${C.white}" opacity=".5"/>
    `, 'Bola dunia');
  };

  ART.fish = function () {
    return wrap(`
      <ellipse cx="50" cy="85" rx="25" ry="4" fill="${C.ink}" opacity=".06"/>
      <path d="M76 48 q14 -13 6 -25 q-2 14 -15 19 Z" fill="${C.orange}" ${st}/>
      <path d="M76 55 q14 12 6 24 q-2 -13 -15 -18 Z" fill="${C.orangeD}" ${st}/>
      <path d="M24 52 q10 -22 34 -22 q16 0 22 18 q-6 19 -22 19 q-24 0 -34 -15 Z" fill="${C.blue}" ${st}/>
      <path d="M36 42 q8 -12 18 -3 q4 4 -4 7 q-10 3 -14 -4 Z" fill="${C.sky}" ${st2}/>
      <circle cx="33" cy="49" r="3.2" fill="${C.ink}"/>
      <circle cx="34" cy="48" r="1" fill="${C.white}"/>
      <path d="M45 59 q6 6 13 2" fill="none" ${st2}/>
      <path d="M50 36 q6 10 2 26" fill="none" stroke="${C.blueD}" stroke-width="2" opacity=".5"/>
      <circle cx="82" cy="30" r="3" fill="${C.sky}" ${st2}/>
      <circle cx="89" cy="20" r="1.8" fill="${C.sky}" ${st2}/>
      <path d="M22 66 q5 6 12 8" fill="none" stroke="${C.leaf}" stroke-width="3" stroke-linecap="round"/>
    `, 'Ikan');
  };

  ART.bird = function () {
    return wrap(`
      <ellipse cx="50" cy="86" rx="22" ry="4" fill="${C.ink}" opacity=".06"/>
      <path d="M48 50 q-18 -13 -29 -2 q12 4 14 14" fill="${C.blue}" ${st}/>
      <ellipse cx="53" cy="60" rx="23" ry="19" fill="${C.blue}" ${st}/>
      <circle cx="63" cy="38" r="16" fill="${C.teal}" ${st}/>
      <path d="M77 37 l12 5 -12 5 Z" fill="${C.orange}" ${st}/>
      <circle cx="66" cy="34" r="2.6" fill="${C.ink}"/>
      <circle cx="67" cy="33" r="1" fill="${C.white}"/>
      <path d="M40 60 q9 -10 17 0 q-8 9 -17 0 Z" fill="${C.sky}" ${st2}/>
      <path d="M44 78 v7 M60 78 v7" stroke="${C.orangeD}" stroke-width="3" stroke-linecap="round"/>
      <path d="M38 52 q4 -5 10 -6" stroke="${C.white}" stroke-width="2.2" stroke-linecap="round" opacity=".5"/>
      <circle cx="24" cy="26" r="2" fill="${C.yellow}"/>
    `, 'Burung');
  };

  ART.cat = function () {
    return wrap(`
      ${shadow}
      <path d="M70 78 q18 2 15 -18 q-2 -10 -10 -9" fill="none" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/>
      <path d="M70 78 q18 2 15 -18 q-2 -10 -10 -9" fill="none" stroke="${C.orange}" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="48" cy="70" rx="21" ry="19" fill="${C.orange}" ${st}/>
      <path d="M38 56 l-9 -18 15 5 5 9 Z" fill="${C.orange}" ${st}/>
      <path d="M58 56 l9 -18 -15 5 -5 9 Z" fill="${C.orange}" ${st}/>
      <circle cx="48" cy="46" r="20" fill="${C.orange}" ${st}/>
      <path d="M33 37 l-4 -10 9 3 Z" fill="${C.pink}" opacity=".7"/>
      <circle cx="41" cy="45" r="2.6" fill="${C.ink}"/>
      <circle cx="55" cy="45" r="2.6" fill="${C.ink}"/>
      <path d="M46 51 h4 l-2 3 Z" fill="${C.pink}" ${st2}/>
      <path d="M42 56 q3 3 6 0 q3 3 6 0" fill="none" ${st2}/>
      <path d="M30 52 h-9 M30 57 h-8 M66 52 h9 M66 57 h8" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
      <path d="M38 65 q10 5 20 0" fill="none" stroke="${C.orangeD}" stroke-width="2" opacity=".6"/>
      <circle cx="48" cy="84" r="3" fill="${C.tan}"/>
    `, 'Kucing');
  };

  ART.camel = function () {
    return wrap(`
      ${shadow}
      <path d="M20 76 q-4 -18 8 -18 h9 l4 -16 q3 -11 13 -9 l14 4 q9 3 9 12 l-1 27" fill="none" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/>
      <path d="M20 76 q-4 -18 8 -18 h9 l4 -16 q3 -11 13 -9 l14 4 q9 3 9 12 l-1 27" fill="none" stroke="${C.sand}" stroke-width="5" stroke-linecap="round"/>
      <path d="M30 56 q3 -18 18 -15 q13 3 10 17 q-1 8 -10 8 q-16 2 -18 -10 Z" fill="${C.sand}" ${st}/>
      <path d="M62 38 q8 -8 16 -3 l6 4 -2 7 -8 -1 -5 5" fill="${C.sand}" ${st}/>
      <circle cx="76" cy="37" r="1.8" fill="${C.ink}"/>
      <path d="M84 43 q3 2 1 4" fill="none" ${st2}/>
      <path d="M28 76 v10 M44 76 v10 M65 76 v10 M66 70 v16" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>
      <path d="M28 76 v10 M44 76 v10 M65 76 v10" stroke="${C.sand}" stroke-width="3" stroke-linecap="round"/>
      <path d="M24 86 h10 M40 86 h10 M60 86 h12" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M34 47 q6 -6 13 -2" fill="none" stroke="${C.tan}" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
    `, 'Unta');
  };

  ART.penguin = function () {
    return wrap(`
      ${shadow}
      <ellipse cx="50" cy="36" rx="23" ry="24" fill="${C.ink}" ${st}/>
      <ellipse cx="50" cy="64" rx="26" ry="24" fill="${C.ink}" ${st}/>
      <ellipse cx="50" cy="67" rx="17" ry="19" fill="${C.paper}" ${st2}/>
      <circle cx="42" cy="34" r="3" fill="${C.white}"/>
      <circle cx="58" cy="34" r="3" fill="${C.white}"/>
      <circle cx="42" cy="34" r="1.6" fill="${C.ink}"/>
      <circle cx="58" cy="34" r="1.6" fill="${C.ink}"/>
      <path d="M46 42 l8 0 -4 6 Z" fill="${C.orange}" ${st2}/>
      <path d="M26 78 q-8 1 -10 7 q0 4 5 3 q7 -2 9 -8 Z" fill="${C.orange}" ${st}/>
      <path d="M74 78 q8 1 10 7 q0 4 -5 3 q-7 -2 -9 -8 Z" fill="${C.orange}" ${st}/>
      <path d="M36 78 q-8 -4 -10 -12" fill="none" ${st}/>
      <path d="M64 78 q8 -4 10 -12" fill="none" ${st}/>
      <circle cx="20" cy="26" r="2" fill="${C.sky}"/>
      <circle cx="82" cy="30" r="1.5" fill="${C.sky}"/>
    `, 'Penguin');
  };

  ART.caterpillar = function () {
    return wrap(`
      ${shadow}
      <circle cx="30" cy="60" r="13" fill="${C.green}" ${st}/>
      <circle cx="44" cy="54" r="14" fill="${C.leaf}" ${st}/>
      <circle cx="59" cy="49" r="15" fill="${C.green}" ${st}/>
      <circle cx="73" cy="44" r="14" fill="${C.leaf}" ${st}/>
      <circle cx="81" cy="49" r="1.8" fill="${C.ink}"/>
      <circle cx="70" cy="41" r="2.6" fill="${C.ink}"/>
      <circle cx="78" cy="39" r="2.6" fill="${C.ink}"/>
      <circle cx="71" cy="40" r="0.9" fill="${C.white}"/>
      <circle cx="79" cy="38" r="0.9" fill="${C.white}"/>
      <path d="M74 48 q4 3 7 0" fill="none" ${st2}/>
      <path d="M73 32 q2 -8 8 -10 M80 32 q1 -7 6 -8" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="81" cy="22" r="2" fill="${C.pink}" ${st2}/>
      <circle cx="86" cy="24" r="1.6" fill="${C.pink}" ${st2}/>
      <path d="M26 72 v6 M38 69 v6 M52 65 v6 M64 62 v6" stroke="${C.greenD}" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="25" cy="52" r="2" fill="${C.greenD}" opacity=".5"/>
      <circle cx="49" cy="45" r="2.4" fill="${C.greenD}" opacity=".4"/>
      <circle cx="62" cy="39" r="2" fill="${C.greenD}" opacity=".4"/>
    `, 'Ulat');
  };

  ART.butterfly = function () {
    return wrap(`
      <ellipse cx="50" cy="88" rx="20" ry="3" fill="${C.ink}" opacity=".06"/>
      <path d="M48 52 q-26 -28 -37 -8 q-7 14 11 20 q-14 6 -4 18 q12 10 30 -12 Z" fill="${C.purple}" ${st}/>
      <path d="M52 52 q26 -28 37 -8 q7 14 -11 20 q14 6 4 18 q-12 10 -30 -12 Z" fill="${C.pink}" ${st}/>
      <circle cx="30" cy="47" r="5" fill="${C.yellow}" opacity=".85"/>
      <circle cx="70" cy="47" r="5" fill="${C.yellow}" opacity=".85"/>
      <circle cx="31" cy="69" r="3.6" fill="${C.paper}" opacity=".8"/>
      <circle cx="69" cy="69" r="3.6" fill="${C.paper}" opacity=".8"/>
      <ellipse cx="50" cy="60" rx="5" ry="18" fill="${C.ink}" ${st2}/>
      <circle cx="50" cy="41" r="6" fill="${C.ink}" ${st}/>
      <path d="M46 37 q-6 -10 -11 -12 M54 37 q6 -10 11 -12" fill="none" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="36" cy="25" r="2" fill="${C.purple}"/>
      <circle cx="64" cy="25" r="2" fill="${C.pink}"/>
      <circle cx="48" cy="40" r="1.2" fill="${C.white}"/>
      <circle cx="52" cy="40" r="1.2" fill="${C.white}"/>
    `, 'Kupu-kupu');
  };

  ART.chicken = function () {
    return wrap(`
      ${shadow}
      <path d="M30 76 q-4 -20 12 -25 q6 -16 23 -12 q15 4 15 20 q0 15 -15 18 q-12 3 -20 0 Z" fill="${C.paper}" ${st}/>
      <path d="M40 64 q10 -6 20 0 q-8 13 -20 8 Z" fill="${C.cream}" ${st2}/>
      <circle cx="60" cy="37" r="15" fill="${C.paper}" ${st}/>
      <path d="M52 23 q2 -9 7 -8 q5 1 2 8 M60 21 q4 -9 8 -6 q3 3 -1 8" fill="${C.coralD}" ${st2}/>
      <path d="M74 35 l10 4 -10 4 Z" fill="${C.orange}" ${st}/>
      <circle cx="64" cy="34" r="2.4" fill="${C.ink}"/>
      <circle cx="65" cy="33" r="0.9" fill="${C.white}"/>
      <path d="M49 41 q3 5 7 2" fill="${C.coral}" opacity=".5"/>
      <path d="M38 76 v8 M50 77 v7" stroke="${C.orangeD}" stroke-width="3" stroke-linecap="round"/>
      <path d="M34 84 h8 M46 84 h8" stroke="${C.ink}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M17 84 q16 8 34 3" fill="none" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round" opacity=".15"/>
    `, 'Ayam');
  };

  ART.frog = function () {
    return wrap(`
      ${shadow}
      <ellipse cx="50" cy="70" rx="27" ry="20" fill="${C.green}" ${st}/>
      <circle cx="50" cy="53" r="24" fill="${C.green}" ${st}/>
      <circle cx="37" cy="34" r="10" fill="${C.green}" ${st}/>
      <circle cx="63" cy="34" r="10" fill="${C.green}" ${st}/>
      <circle cx="37" cy="34" r="6.5" fill="${C.paper}" ${st2}/>
      <circle cx="63" cy="34" r="6.5" fill="${C.paper}" ${st2}/>
      <circle cx="38" cy="35" r="3" fill="${C.ink}"/>
      <circle cx="62" cy="35" r="3" fill="${C.ink}"/>
      <circle cx="39" cy="34" r="1" fill="${C.white}"/>
      <circle cx="63" cy="34" r="1" fill="${C.white}"/>
      <path d="M38 52 q12 8 24 0" fill="none" ${st}/>
      <circle cx="36" cy="60" r="3" fill="${C.pink}" opacity=".45"/>
      <circle cx="64" cy="60" r="3" fill="${C.pink}" opacity=".45"/>
      <ellipse cx="50" cy="67" rx="13" ry="10" fill="${C.leaf}" opacity=".55"/>
      <path d="M28 82 q-8 2 -9 8 q7 1 11 -4 M72 82 q8 2 9 8 q-7 1 -11 -4" fill="${C.green}" ${st}/>
      <circle cx="26" cy="48" r="2.6" fill="${C.greenD}" opacity=".45"/>
      <circle cx="74" cy="50" r="2" fill="${C.greenD}" opacity=".45"/>
    `, 'Katak');
  };

  ART.tree = function () {
    return wrap(`
      ${shadow}
      <path d="M45 80 q-2 -22 0 -34 h10 q2 14 0 34 Z" fill="${C.brown}" ${st}/>
      <path d="M50 58 q-12 -2 -18 -10" fill="none" stroke="${C.brown}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="50" cy="32" r="22" fill="${C.green}" ${st}/>
      <circle cx="31" cy="45" r="15" fill="${C.leaf}" ${st}/>
      <circle cx="69" cy="45" r="15" fill="${C.leaf}" ${st}/>
      <path d="M35 88 h30" stroke="${C.greenD}" stroke-width="4" stroke-linecap="round" opacity=".5"/>
      <circle cx="40" cy="32" r="2.8" fill="${C.coral}" ${st2}/>
      <circle cx="61" cy="24" r="2.4" fill="${C.coral}" ${st2}/>
      <circle cx="70" cy="38" r="2.2" fill="${C.orange}" ${st2}/>
      <path d="M44 24 q5 -6 11 -4" fill="none" stroke="${C.white}" stroke-width="2.6" stroke-linecap="round" opacity=".35"/>
    `, 'Pohon');
  };

  ART.seed = function () {
    return wrap(`
      <ellipse cx="50" cy="90" rx="34" ry="5" fill="${C.brownD}" opacity=".2"/>
      <path d="M22 82 q28 8 56 0" fill="none" stroke="${C.brownD}" stroke-width="4" stroke-linecap="round" opacity=".45"/>
      <ellipse cx="50" cy="63" rx="16" ry="22" fill="${C.brown}" ${st} transform="rotate(-14 50 63)"/>
      <path d="M43 48 q-4 10 2 20" fill="none" stroke="${C.tan}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      <path d="M50 41 q4 -8 10 -8" fill="none" stroke="${C.greenD}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M58 32 q8 -6 12 0 q-6 6 -12 0 Z" fill="${C.green}" ${st2}/>
      <circle cx="76" cy="28" r="2" fill="${C.yellow}"/>
      <circle cx="22" cy="42" r="1.6" fill="${C.leaf}"/>
    `, 'Biji');
  };

  ART.sprout = function () {
    return wrap(`
      <ellipse cx="50" cy="88" rx="32" ry="6" fill="${C.brownD}" opacity=".25"/>
      <path d="M20 82 q30 10 60 0" fill="none" stroke="${C.brownD}" stroke-width="4" stroke-linecap="round" opacity=".45"/>
      <path d="M50 82 V50" stroke="${C.greenD}" stroke-width="4" stroke-linecap="round"/>
      <path d="M50 64 q-17 -2 -20 -15 q17 -2 20 15 Z" fill="${C.green}" ${st2}/>
      <path d="M50 56 q17 -2 20 -15 q-17 -2 -20 15 Z" fill="${C.leaf}" ${st2}/>
      <circle cx="50" cy="48" r="4" fill="${C.greenD}" ${st2}/>
      <path d="M26 34 q-2 6 3 8" fill="none" stroke="${C.blue}" stroke-width="2.4" stroke-linecap="round" opacity=".6"/>
      <circle cx="80" cy="30" r="2" fill="${C.yellow}"/>
      <circle cx="18" cy="48" r="1.6" fill="${C.green}"/>
    `, 'Kecambah');
  };

  ART.water = function () {
    const waves = [0, 1, 2].map(function (i) {
      const y = 44 + i * 12;
      return `<path d="M22 ${y} q9 -8 18 0 t18 0 t18 0" fill="none" stroke="${C.white}" stroke-width="4" stroke-linecap="round" opacity="${0.85 - i * 0.18}"/>`;
    }).join('');
    return wrap(`
      <rect x="10" y="24" width="80" height="58" rx="18" fill="${C.blue}" ${st}/>
      ${waves}
      <path d="M68 18 q-6 9 0 13 q6 -4 0 -13 Z" fill="${C.blue}" ${st2}/>
      <circle cx="30" cy="20" r="3" fill="${C.sky}" ${st2}/>
      <circle cx="42" cy="14" r="2" fill="${C.sky}" ${st2}/>
      <path d="M18 33 q10 -4 18 0" fill="none" stroke="${C.sky}" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>
    `, 'Air');
  };

  ART.cloud = function () {
    return wrap(`
      <path d="M22 68 q-12 0 -12 -11 q0 -10 12 -11 q2 -15 18 -15 q14 0 18 12 q4 -4 10 -4 q12 0 12 12 q10 2 10 10 q0 9 -11 9 Z" fill="${C.paper}" ${st} opacity=".95"/>
      <path d="M28 40 q4 -4 9 -4" fill="none" stroke="${C.sky}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      <path d="M50 80 q-2 4 0 6 M62 79 q-2 4 0 6 M38 81 q-2 4 0 6" fill="none" stroke="${C.blue}" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
      <circle cx="80" cy="28" r="2.4" fill="${C.yellow}" opacity=".7"/>
    `, 'Awan');
  };

  ART.sun = function () {
    let rays = '';
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      const x1 = 50 + Math.cos(a) * 32;
      const y1 = 50 + Math.sin(a) * 32;
      const x2 = 50 + Math.cos(a) * 43;
      const y2 = 50 + Math.sin(a) * 43;
      rays += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${C.yellowD}" stroke-width="5" stroke-linecap="round"/>`;
    }
    return wrap(`
      <g opacity=".95">${rays}</g>
      <circle cx="50" cy="50" r="27" fill="${C.yellow}" ${st}/>
      <circle cx="41" cy="44" r="2.6" fill="${C.ink}"/>
      <circle cx="59" cy="44" r="2.6" fill="${C.ink}"/>
      <path d="M42 56 q8 7 16 0" fill="none" ${st2}/>
      <circle cx="36" cy="53" r="2.6" fill="${C.coral}" opacity=".5"/>
      <circle cx="64" cy="53" r="2.6" fill="${C.coral}" opacity=".5"/>
      <path d="M38 34 q4 -5 10 -4" fill="none" stroke="${C.white}" stroke-width="3" stroke-linecap="round" opacity=".6"/>
    `, 'Matahari');
  };

  ART.moon = function () {
    return wrap(`
      <path d="M64 18 q-18 4 -24 22 q-5 19 11 31 q-26 1 -36 -18 q-9 -22 7 -39 q17 -17 42 4 Z" fill="${C.yellow}" ${st}/>
      <circle cx="34" cy="38" r="4" fill="${C.yellowD}" opacity=".4"/>
      <circle cx="27" cy="55" r="2.6" fill="${C.yellowD}" opacity=".4"/>
      <path d="M34 47 q4 3 8 0" fill="none" stroke="${C.brownD}" stroke-width="2" stroke-linecap="round" opacity=".5"/>
      <circle cx="38" cy="57" r="2" fill="${C.coral}" opacity=".3"/>
      <circle cx="78" cy="26" r="2.2" fill="${C.yellow}" opacity=".8"/>
      <circle cx="86" cy="42" r="1.4" fill="${C.yellow}" opacity=".6"/>
    `, 'Bulan');
  };

  ART.moonStars = function () {
    return wrap(`
      <path d="M58 16 q-16 5 -21 22 q-4 17 9 28 q-23 1 -31 -17 q-8 -20 6 -34 q15 -15 37 1 Z" fill="${C.yellow}" ${st}/>
      <circle cx="31" cy="35" r="3.4" fill="${C.yellowD}" opacity=".4"/>
      <circle cx="25" cy="51" r="2.2" fill="${C.yellowD}" opacity=".4"/>
      <path d="${starD(70, 30, 9, 4)}" fill="${C.yellow}" ${st2}/>
      <path d="${starD(83, 55, 6, 2.6)}" fill="${C.orange}" ${st2}/>
      <path d="${starD(63, 68, 4.5, 2)}" fill="${C.yellow}" ${st2}/>
      <circle cx="82" cy="17" r="1.8" fill="${C.white}"/>
    `, 'Moon and stars');
  };

  ART.umbrella = function () {
    return wrap(`
      ${shadow}
      <path d="M50 16 q-34 2 -38 34 q8 -6 14 0 q7 -8 14 0 q7 -8 14 0 q7 -8 14 0 q6 6 14 0 Q82 20 50 16 Z" fill="${C.coral}" ${st}/>
      <path d="M50 16 v-5" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M50 50 v24 q0 11 11 11 q9 0 9 -9" fill="none" ${st}/>
      <path d="M50 16 q-14 16 -17 34 M50 16 q14 16 17 34" fill="none" stroke="${C.white}" stroke-width="2.2" opacity=".45"/>
      <circle cx="36" cy="31" r="2" fill="${C.yellow}"/>
      <circle cx="62" cy="40" r="2" fill="${C.yellow}"/>
      <circle cx="73" cy="24" r="1.6" fill="${C.white}"/>
    `, 'Payung');
  };

  // UI icons
  const ICONS = {
    speaker: `<path d="M4.5 9.5h3.8L14 5.5v13l-5.7-4H4.5z"/><path d="M17 8.5a5 5 0 0 1 0 7"/><path d="M19.5 6a8.5 8.5 0 0 1 0 12"/>`,
    music: `<path d="M9 18V6.2L19 4v11.8"/><circle cx="6.6" cy="18" r="2.6"/><circle cx="16.6" cy="15.8" r="2.6"/>`,
    musicOff: `<path d="M9 18V6.2L19 4v11.8"/><circle cx="6.6" cy="18" r="2.6"/><circle cx="16.6" cy="15.8" r="2.6"/><path d="M3 3l18 18"/>`,
    back: `<path d="M15 5l-7 7 7 7"/>`,
    chevron: `<path d="M9 5l7 7-7 7"/>`,
    lock: `<rect x="5" y="10" width="14" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>`,
    check: `<path d="M4.5 12.5l5 5 10-11"/>`,
    play: `<path d="M8 5.5l10 6.5-10 6.5z"/>`,
    info: `<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.8" r=".8" fill="currentColor" stroke="none"/>`,
    reset: `<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v5h5"/>`,
    home: `<path d="M4 10.7 12 4l8 6.7V20a1 1 0 0 1-1 1h-4.6v-5.6H9.6V21H5a1 1 0 0 1-1-1z"/>`,
    shield: `<path d="M12 3l7 3v6c0 4.5-3 7.4-7 9-4-1.6-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>`,
    heart: `<path d="M12 20.2s-7.5-4.4-7.5-9.4A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7.5 2.8c0 5-7.5 9.4-7.5 9.4Z"/>`,
    sparkle: `<path d="M12 2.8c.9 4.4 2.8 6.3 7.2 7.2-4.4.9-6.3 2.8-7.2 7.2-.9-4.4-2.8-6.3-7.2-7.2 4.4-.9 6.3-2.8 7.2-7.2z"/>`,
    plus: `<path d="M12 5v14M5 12h14"/>`,
    book: `<path d="M4 5.5c3.2-1.2 5.9-.7 8 1v13c-2.1-1.7-4.8-2.2-8-1z"/><path d="M20 5.5c-3.2-1.2-5.9-.7-8 1v13c2.1-1.7 4.8-2.2 8-1z"/>`,
    eye: `<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3.2"/>`
  };

  function icon(name, cls) {
    let body = ICONS[name] || ICONS.sparkle;
    let filled = name === 'play' || name === 'sparkle';
    if (name === 'star') {
      body = `<path d="${starD(12, 12, 10, 4.4)}"/>`;
      filled = true;
    }
    return `<svg class="icon ${cls || ''}" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="${filled ? 'none' : 'currentColor'}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
  }

  window.Art = {
    art: function (key) {
      if (IMG[key]) {
        const plate = CUTOUT_IMG[IMG[key]] ? '' : ' is-plate';
        return '<span class="art-img' + plate + '" data-art="' + key + '"><img src="' + IMG_DIR + IMG[key] + '" alt="" decoding="async"></span>';
      }
      const fn = ART[key];
      return fn ? fn() : ART.sparkle ? ART.sparkle() : '';
    },
    photo: function (scene) {
      return SCENE_IMG[scene] ? IMG_DIR + SCENE_IMG[scene] : '';
    },
    icon: icon,
    star: function (filled, cls) {
      return `<svg class="icon icon-star ${filled ? 'is-filled' : ''} ${cls || ''}" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="${starD(12, 12, 9.4, 4.1)}"/></svg>`;
    },
    has: function (key) { return !!(IMG[key] || ART[key]); }
  };
})();
