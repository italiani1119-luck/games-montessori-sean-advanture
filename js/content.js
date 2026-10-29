(function () {
  'use strict';

  const AGE_BANDS = [
    {
      id: '3-4',
      label: '3-4 yrs',
      name: 'Little Explorer',
      blurb: 'Big pictures and gentle choices',
      questions: 20,
      color: '#ffb020',
      deep: '#b87400',
      tint: '#fff7e3',
      soft: '#ffe9b8',
      starCut: [0.7, 0.4, 0.15]
    },
    {
      id: '4-5',
      label: '4-5 yrs',
      name: 'Junior Explorer',
      blurb: 'A little more thinking',
      questions: 22,
      color: '#35b99a',
      deep: '#1d7f68',
      tint: '#edfbf7',
      soft: '#c9f1e7',
      starCut: [0.75, 0.5, 0.25]
    },
    {
      id: '5-6',
      label: '5-6 yrs',
      name: 'Big Explorer',
      blurb: 'Ready for a challenge',
      questions: 25,
      color: '#4f8fe8',
      deep: '#2f63b3',
      tint: '#eef4ff',
      soft: '#d6e4ff',
      starCut: [0.8, 0.55, 0.3]
    }
  ];

  const BUDDIES = [
    {
      id: 'momo',
      name: 'Momo',
      kind: 'Puppy',
      art: 'dog',
      color: '#ff8163',
      deep: '#cf4b2b',
      tint: '#fff1e9',
      cheer: 'Let us explore together!'
    },
    {
      id: 'tilly',
      name: 'Tilly',
      kind: 'Elephant',
      art: 'elephant',
      color: '#35b99a',
      deep: '#1d7f68',
      tint: '#edfbf7',
      cheer: 'Slow and steady wins the day!'
    },
    {
      id: 'ruby',
      name: 'Ruby',
      kind: 'Cat',
      art: 'cat',
      color: '#ef6f9b',
      deep: '#bf3e6a',
      tint: '#fff0f6',
      cheer: 'A curious cat is a clever cat!'
    },
    {
      id: 'pip',
      name: 'Pip',
      kind: 'Teddy Bear',
      art: 'teddy',
      color: '#4f8fe8',
      deep: '#2f63b3',
      tint: '#eef4ff',
      cheer: 'Cuddles make me brave!'
    }
  ];

  function o(id, art, label) {
    return { id: id, art: art, label: label };
  }

  function num(value) {
    var text = String(value);
    return { id: text, label: text };
  }

  function lt(value) {
    return { id: value, label: value };
  }

  function grp(id, art, countValue, label) {
    return { id: id, art: art, n: countValue, label: label };
  }

  function wr(id, wordText) {
    return { id: id, word: wordText };
  }

  function Q(type, prompt, options, correct, explain, extra) {
    var q = {
      type: type,
      prompt: prompt,
      options: options,
      correct: correct,
      explain: explain
    };
    if (extra) {
      Object.keys(extra).forEach(function (key) {
        q[key] = extra[key];
      });
    }
    return q;
  }

  function img(prompt, options, correct, explain, extra) {
    return Q('image', prompt, options, correct, explain, extra);
  }

  function count(prompt, art, shown, options, correct, explain) {
    return Q('count', prompt, options, correct, explain, { count: { art: art, n: shown } });
  }

  function number(prompt, options, correct, explain, extra) {
    return Q('number', prompt, options, correct, explain, extra);
  }

  function letter(prompt, options, correct, explain, extra) {
    return Q('letter', prompt, options, correct, explain, extra);
  }

  function word(prompt, options, correct, explain, extra) {
    return Q('word', prompt, options, correct, explain, extra);
  }

  function compare(prompt, options, correct, explain) {
    return Q('compare', prompt, options, correct, explain);
  }

  function pattern(prompt, sequence, options, correct, explain) {
    return Q('pattern', prompt, options, correct, explain, { sequence: sequence });
  }

  /* ---------- Practical Life ---------- */

  const PRACTICAL_CORE = [
    img('What do we do before we eat?', [
      o('wash', 'wash', 'Wash our hands'),
      o('play', 'ball', 'Play with a ball'),
      o('rest', 'bed', 'Go to bed')
    ], 'wash', 'Scrub, scrub, scrub! Soap and water wash away the tummy bugs. Can you rub your palms together?'),
    img('Where do clean cups sit?', [
      o('shelf', 'shelf', 'On the shelf'),
      o('bed', 'bed', 'On the bed'),
      o('toys', 'toybox', 'In the toy box')
    ], 'shelf', 'Clink, clink! Cups line up on the shelf, ready for snack time.'),
    img('Where do toys go after play?', [
      o('box', 'toybox', 'In the toy box'),
      o('cup', 'cup', 'In a cup'),
      o('bed', 'bed', 'On the bed')
    ], 'box', 'Toys hop into the box with a plop! Tidy-up time can be a fun game.'),
    img('What do we use to pour water?', [
      o('pitcher', 'pitcher', 'A pitcher'),
      o('ball', 'ball', 'A ball'),
      o('pillow', 'pillow', 'A pillow')
    ], 'pitcher', 'Tip, tip, pour! The pitcher gives the water a gentle ride.'),
    img('What is soft for a sleepy head?', [
      o('pillow', 'pillow', 'A pillow'),
      o('rock', 'rock', 'A rock'),
      o('cup', 'cup', 'A cup')
    ], 'pillow', 'Fluff, fluff! A pillow hugs your head goodnight.'),
    img('Which one lights a dark room?', [
      o('lamp', 'lamp', 'A lamp'),
      o('ball', 'ball', 'A ball'),
      o('box', 'toybox', 'A toy box')
    ], 'lamp', 'Click! The lamp chases the dark away. So cozy!'),
    img('Where do we sleep at night?', [
      o('bed', 'bed', 'In bed'),
      o('shelf', 'shelf', 'On the shelf'),
      o('cup', 'cup', 'In a cup')
    ], 'bed', 'Jump into bed and pull up the blanket. Sweet dreams!'),
    img('Which one can you roll and bounce?', [
      o('ball', 'ball', 'The ball'),
      o('pillow', 'pillow', 'The pillow'),
      o('pitcher', 'pitcher', 'The pitcher')
    ], 'ball', 'Bounce, bounce, roll! The ball is ready to play.'),
    img('Which one is a cuddly friend?', [
      o('teddy', 'teddy', 'The teddy bear'),
      o('cup', 'cup', 'The cup'),
      o('lamp', 'lamp', 'The lamp')
    ], 'teddy', 'Teddy gives the best hugs. Squeeze him gently!'),
    img('What do we use to wipe a spill?', [
      o('cloth', 'cloth', 'A cloth'),
      o('paper', 'paper', 'Paper'),
      o('ball', 'ball', 'A ball')
    ], 'cloth', 'Wipe, wipe, swish! The cloth drinks up the spill.'),
    img('What do plants drink?', [
      o('water', 'water-drop', 'Water'),
      o('paper', 'paper', 'Paper'),
      o('ball', 'ball', 'A ball')
    ], 'water', 'Glug, glug! Plants sip water through their roots.'),
    img('Which one holds water for drinking?', [
      o('cup', 'cup', 'A cup'),
      o('shelf', 'shelf', 'A shelf'),
      o('ball', 'ball', 'A ball')
    ], 'cup', 'A cup holds your water. Sip, sip, ahh!'),
    img('What do we use to rinse a dirty cup?', [
      o('water', 'water-drop', 'Water'),
      o('pillow', 'pillow', 'A pillow'),
      o('teddy', 'teddy', 'A teddy bear')
    ], 'water', 'Rinse with water, then the cup is sparkly clean.'),
    img('Which one keeps books and toys neat?', [
      o('shelf', 'shelf', 'The shelf'),
      o('bed', 'bed', 'The bed'),
      o('ball', 'ball', 'The ball')
    ], 'shelf', 'Everything has a home on the shelf. Neat and tidy!'),
    count('How many cups are on the shelf?', 'cup', 3, [
      num(2), num(3), num(4)
    ], '3', 'One, two, three cups! Clink, clink, clink!'),
    count('How many pillows are on the bed?', 'pillow', 2, [
      num(1), num(2), num(3)
    ], '2', 'One, two pillows. Fluff them up!'),
    letter('Which letter starts the word "Cup"?', [
      lt('C'), lt('B'), lt('P')
    ], 'C', 'Cup starts with C. C says /k/. C-c-cup!', { promptArt: 'cup', word: 'Cup' }),
    word('Which word means "not dirty"?', [
      wr('clean', 'clean'),
      wr('wet', 'wet'),
      wr('tired', 'tired')
    ], 'clean', 'Clean and dirty are opposites. Sparkly clean!'),
    compare('Which group has the most?', [
      grp('cups', 'cup', 3, 'Three cups'),
      grp('pillows', 'pillow', 2, 'Two pillows'),
      grp('teddies', 'teddy', 1, 'One teddy')
    ], 'cups', 'Three cups beat two pillows and one teddy. Hip hip hooray!'),
    img('A toy is on the floor. What do we do?', [
      o('box', 'toybox', 'Put it in the toy box'),
      o('bed', 'bed', 'Put it on the bed'),
      o('cup', 'cup', 'Put it in a cup')
    ], 'box', 'Oops! Pick it up and plop it in the toy box.')
  ];

  const PRACTICAL_MID = [
    count('How many cups are ready for snack?', 'cup', 5, [
      num(4), num(5), num(6)
    ], '5', 'Five cups, one for each friend. Count with me!'),
    number('You put 2 cups on the table. Then 1 more. How many cups now?', [
      num(2), num(3), num(4)
    ], '3', 'Two cups plus one cup makes three. Ding!', {
      sequence: [{ text: '2' }, { text: '+' }, { text: '1' }, { text: '=' }, { text: '?' }]
    }),
    number('There are 5 cups. You take 2 away. How many are left?', [
      num(2), num(3), num(4)
    ], '3', 'Five take away two leaves three cups.', {
      sequence: [{ text: '5' }, { text: '−' }, { text: '2' }, { text: '=' }, { text: '?' }]
    }),
    img('What is the first step before pouring water?', [
      o('pick', 'pitcher', 'Pick up the pitcher'),
      o('ball', 'ball', 'Bounce the ball'),
      o('bed', 'bed', 'Jump on the bed')
    ], 'pick', 'First, pick up the pitcher with two hands. Ready, set, pour!'),
    img('After washing your hands, what dries them?', [
      o('cloth', 'cloth', 'A cloth'),
      o('lamp', 'lamp', 'A lamp'),
      o('ball', 'ball', 'A ball')
    ], 'cloth', 'Pat, pat! The cloth makes your hands fluffy dry.'),
    img('You finish playing. What is the tidy-up job?', [
      o('tidy', 'toybox', 'Put toys in the box'),
      o('bed', 'bed', 'Jump on the bed'),
      o('cup', 'cup', 'Fill a cup')
    ], 'tidy', 'Zoom! Toys go back in the box. Tidy-up high five!'),
    img('How do we carry a full cup?', [
      o('slow', 'cup', 'With two hands, walking slowly'),
      o('run', 'ball', 'Run and jump'),
      o('wave', 'paper', 'Wave it in the air')
    ], 'slow', 'Two hands and slow steps keep the water inside. Splash-free!'),
    img('Which one should stay dry?', [
      o('paper', 'paper', 'The paper'),
      o('water', 'water-drop', 'The water'),
      o('cup', 'cup', 'The cup')
    ], 'paper', 'Uh-oh! Paper hates water. Keep it dry and crinkly-free.'),
    number('How many cups make a pair for two friends?', [
      num(1), num(2), num(3)
    ], '2', 'A pair means two. One cup for you, one for me!'),
    letter('Which letter starts "Pitcher"?', [
      lt('P'), lt('B'), lt('T')
    ], 'P', 'Pitcher starts with P. P says /p/, like a popping cork!', { promptArt: 'pitcher' }),
    letter('Which letter ends "Bed"?', [
      lt('D'), lt('B'), lt('T')
    ], 'D', 'Bed ends with D. Listen: be-d.', { promptArt: 'bed' }),
    word('Which word is a home job?', [
      wr('pour', 'pour'),
      wr('jump', 'jump'),
      wr('sing', 'sing')
    ], 'pour', 'Pouring water is a careful home job.'),
    word('Which word is the opposite of "dirty"?', [
      wr('clean', 'clean'),
      wr('wet', 'wet'),
      wr('loud', 'loud')
    ], 'clean', 'Dirty and clean are opposites. Shine, shine!'),
    compare('Which group has the most toys?', [
      grp('teddies', 'teddy', 3, 'Three teddies'),
      grp('cups', 'cup', 2, 'Two cups'),
      grp('pillows', 'pillow', 1, 'One pillow')
    ], 'teddies', 'Three teddies are more than two cups or one pillow.'),
    compare('Which group has the fewest?', [
      grp('cups', 'cup', 1, 'One cup'),
      grp('pillows', 'pillow', 3, 'Three pillows'),
      grp('teddies', 'teddy', 2, 'Two teddies')
    ], 'cups', 'One cup is fewer than three pillows or two teddies.'),
    pattern('What comes next? Wash, dry, wash, dry...', [
      { art: 'wash' },
      { art: 'cloth' },
      { art: 'wash' },
      { art: 'cloth' },
      { text: '?' }
    ], [
      o('wash', 'wash', 'Wash'),
      o('dry', 'cloth', 'Dry'),
      o('water', 'pitcher', 'Water')
    ], 'wash', 'Wash, dry, wash, dry! The pattern takes turns.'),
    count('How many teddies sit on the shelf?', 'teddy', 6, [
      num(5), num(6), num(7)
    ], '6', 'Six teddies in a row. Count one to six!'),
    count('How many pillows are on the bed?', 'pillow', 4, [
      num(3), num(4), num(5)
    ], '4', 'Four fluffy pillows. Bounce, bounce!'),
    img('The floor is wet. What do you grab first?', [
      o('cloth', 'cloth', 'A cloth'),
      o('ball', 'ball', 'A ball'),
      o('teddy', 'teddy', 'A teddy')
    ], 'cloth', 'Grab the cloth before someone slips. Safety first!'),
    img('Which one waters a plant?', [
      o('pitcher', 'pitcher', 'The pitcher'),
      o('ball', 'ball', 'The ball'),
      o('toys', 'toybox', 'The toy box')
    ], 'pitcher', 'A gentle pour gives the plant a drink. Glug!'),
    number('You set 3 cups. Then 2 more. How many cups?', [
      num(4), num(5), num(6)
    ], '5', 'Three plus two makes five. High five!', {
      sequence: [{ text: '3' }, { text: '+' }, { text: '2' }, { text: '=' }, { text: '?' }]
    }),
    img('How do we tidy a shelf?', [
      o('place', 'shelf', 'Put each toy in its place'),
      o('throw', 'ball', 'Throw the toys'),
      o('hide', 'bed', 'Hide them under the bed')
    ], 'place', 'Everything in its place. Ta-da, tidy shelf!')
  ];

  const PRACTICAL_HIGH = [
    count('How many cups are lined up for the party?', 'cup', 7, [
      num(6), num(7), num(8)
    ], '7', 'Seven cups, ready to clink! Count one to seven.'),
    number('You put 3 cups on the table. Then 3 more. How many?', [
      num(5), num(6), num(7)
    ], '6', 'Three plus three equals six. Ding-ding!', {
      sequence: [{ text: '3' }, { text: '+' }, { text: '3' }, { text: '=' }, { text: '?' }]
    }),
    number('8 cups are clean. 3 are put away. How many are still out?', [
      num(4), num(5), num(6)
    ], '5', 'Eight take away three leaves five cups.', {
      sequence: [{ text: '8' }, { text: '−' }, { text: '3' }, { text: '=' }, { text: '?' }]
    }),
    number('You dry 4 cups. Then 4 more. How many cups dried?', [
      num(7), num(8), num(9)
    ], '8', 'Four plus four makes eight. Dry, dry, dry!', {
      sequence: [{ text: '4' }, { text: '+' }, { text: '4' }, { text: '=' }, { text: '?' }]
    }),
    number('9 teddies sit on the bed. 4 go in the toy box. How many stay out?', [
      num(4), num(5), num(6)
    ], '5', 'Nine take away four leaves five teddies.', {
      sequence: [{ text: '9' }, { text: '−' }, { text: '4' }, { text: '=' }, { text: '?' }]
    }),
    img('What is the first step to wash a cup?', [
      o('fill', 'water-drop', 'Fill it with water'),
      o('bed', 'bed', 'Put it on the bed'),
      o('roll', 'ball', 'Roll it like a ball')
    ], 'fill', 'First, fill the cup with water. Splash!'),
    img('After rinsing, what comes next?', [
      o('dry', 'cloth', 'Dry it with a cloth'),
      o('pillow', 'pillow', 'Put it on a pillow'),
      o('bounce', 'ball', 'Bounce it on the floor')
    ], 'dry', 'Next, dry the cup with a cloth. Rub, rub!'),
    img('You run with a full cup. What may happen?', [
      o('spill', 'water-drop', 'The water spills'),
      o('bell', 'bell', 'The cup rings'),
      o('teddy', 'teddy', 'A teddy drinks it')
    ], 'spill', 'Whoa! Running makes water splash out. Slow steps keep it safe.'),
    img('A spill is spreading. What stops it?', [
      o('cloth', 'cloth', 'The cloth'),
      o('paper', 'paper', 'A sheet of paper'),
      o('lamp', 'lamp', 'The lamp')
    ], 'cloth', 'The cloth soaks it up before it spreads. Swish!'),
    img('Which choice shows responsibility?', [
      o('shelf', 'shelf', 'Put the toys back'),
      o('floor', 'ball', 'Leave them on the floor'),
      o('bed', 'bed', 'Push them under the bed')
    ], 'shelf', 'Putting toys back shows you care for your home.'),
    img('Which tool matches the job "water the plant"?', [
      o('pitcher', 'pitcher', 'The pitcher'),
      o('paper', 'paper', 'The paper'),
      o('pillow', 'pillow', 'The pillow')
    ], 'pitcher', 'A pitcher carries water to thirsty plants.'),
    pattern('What comes next? Pour, wipe, pour, wipe...', [
      { art: 'pitcher' },
      { art: 'cloth' },
      { art: 'pitcher' },
      { art: 'cloth' },
      { text: '?' }
    ], [
      o('pour', 'pitcher', 'Pour'),
      o('wipe', 'cloth', 'Wipe'),
      o('wash', 'wash', 'Wash')
    ], 'pour', 'Pour, wipe, pour, wipe! The pattern takes turns.'),
    pattern('Wash, rinse, dry, wash, rinse, ...?', [
      { art: 'wash' },
      { art: 'cup' },
      { art: 'cloth' },
      { art: 'wash' },
      { art: 'cup' },
      { text: '?' }
    ], [
      o('dry', 'cloth', 'Dry'),
      o('wash', 'wash', 'Wash'),
      o('pour', 'pitcher', 'Pour')
    ], 'dry', 'Wash, rinse, dry, then start again. Dry comes next!'),
    compare('Which pile is the smallest?', [
      grp('cups', 'cup', 3, 'Three cups'),
      grp('pillows', 'pillow', 5, 'Five pillows'),
      grp('teddies', 'teddy', 4, 'Four teddies')
    ], 'cups', 'Three cups are fewer than five pillows or four teddies.'),
    compare('Which pile is the biggest?', [
      grp('cups', 'cup', 5, 'Five cups'),
      grp('cloths', 'cloth', 4, 'Four cloths'),
      grp('teddies', 'teddy', 2, 'Two teddies')
    ], 'cups', 'Five cups beat four cloths and two teddies.'),
    letter('Which letter starts "Shelf"?', [
      lt('S'), lt('C'), lt('F')
    ], 'S', 'Shelf starts with S. S says /s/, like a soft hush.', { promptArt: 'shelf' }),
    letter('Which letter ends "Towel"?', [
      lt('L'), lt('T'), lt('W')
    ], 'L', 'Towel ends with L. Listen: tow-el.', { promptArt: 'cloth', word: 'Towel' }),
    letter('Which letter starts "Water"?', [
      lt('W'), lt('M'), lt('B')
    ], 'W', 'Water starts with W. W says /w/, like a wave.', { promptArt: 'water-drop' }),
    word('Which word means the opposite of "messy"?', [
      wr('tidy', 'tidy'),
      wr('wet', 'wet'),
      wr('loud', 'loud')
    ], 'tidy', 'Messy and tidy are opposites. Ta-da!'),
    word('Which word means "not fast"?', [
      wr('slowly', 'slowly'),
      wr('quickly', 'quickly'),
      wr('loudly', 'loudly')
    ], 'slowly', 'Slowly is careful and calm. Like a turtle on a stroll.'),
    number('What is one more than 9?', [
      num(8), num(10), num(11)
    ], '10', 'One more than nine is ten. Ten fingers up!'),
    number('What is 2 less than 7?', [
      num(4), num(5), num(6)
    ], '5', 'Seven take away two leaves five.'),
    img('The plant looks droopy. What does it need?', [
      o('water', 'water-drop', 'Water'),
      o('lamp', 'lamp', 'More lamp light'),
      o('ball', 'ball', 'A ball')
    ], 'water', 'A thirsty plant droops. Give it a drink!'),
    img('Which one helps keep a snack fresh?', [
      o('cold', 'ice', 'Something cold'),
      o('lamp', 'lamp', 'A warm lamp'),
      o('sun', 'sun', 'Bright sunshine')
    ], 'cold', 'Cold keeps food fresh. Brrr-illiant!'),
    img('Which job is a kind way to help the family?', [
      o('pour', 'pitcher', 'Pour water for everyone'),
      o('sofa', 'ball', 'Bounce on the sofa'),
      o('floor', 'bed', 'Leave your cup on the floor')
    ], 'pour', 'Pouring water for everyone is a kind way to help.')
  ];

  /* ---------- Sensorial ---------- */

  const SENSORIAL_CORE = [
    img('Which one is the big pink tower?', [
      o('tower', 'pinkTower', 'The pink tower'),
      o('star', 'star', 'The star'),
      o('water', 'water-drop', 'The water drop')
    ], 'tower', 'The pink tower grows tall! Big, bigger, biggest!'),
    img('Which one is a cuddly friend?', [
      o('teddy', 'teddy', 'The teddy bear'),
      o('rock', 'rock', 'The rock'),
      o('cube', 'cube', 'The cube')
    ], 'teddy', 'Soft teddy! Squish, squish.'),
    img('Which one feels soft?', [
      o('fabric', 'fabric', 'The fabric'),
      o('rock', 'rock', 'The rock'),
      o('cube', 'cube', 'The cube')
    ], 'fabric', 'Fluffy fabric tickles your fingers. Tickle, tickle!'),
    img('Which one feels hard?', [
      o('rock', 'rock', 'The rock'),
      o('fabric', 'fabric', 'The fabric'),
      o('pillow', 'pillow', 'The pillow')
    ], 'rock', 'Knock, knock! The rock is hard as a door.'),
    img('Which one feels cold on your hand?', [
      o('ice', 'ice', 'The ice cube'),
      o('lamp', 'lamp', 'The lamp'),
      o('sun', 'sun', 'The sun')
    ], 'ice', 'Brrr! Ice is chilly. Can you shiver like ice?'),
    img('Which one feels warm?', [
      o('sun', 'sun', 'The sun'),
      o('ice', 'ice', 'The ice cube'),
      o('rock', 'rock', 'The rock')
    ], 'sun', 'The sun gives a warm hug. Mmm!'),
    img('Which one rings?', [
      o('bell', 'bell', 'The bell'),
      o('pillow', 'pillow', 'The pillow'),
      o('fabric', 'fabric', 'The fabric')
    ], 'bell', 'Ring-a-ling! The bell sings ding-dong.'),
    img('Which one is round and bouncy?', [
      o('ball', 'ball', 'The ball'),
      o('cube', 'cube', 'The cube'),
      o('star', 'star', 'The star')
    ], 'ball', 'Round and bouncy! Can you roll like a ball?'),
    img('Which one is shaped like a star?', [
      o('star', 'star', 'The star'),
      o('cube', 'cube', 'The cube'),
      o('fabric', 'fabric', 'The fabric')
    ], 'star', 'Twinkle, twinkle! Point to each star point.'),
    img('Which one is yellow?', [
      o('sun', 'sun', 'The sun'),
      o('ice', 'ice', 'The ice cube'),
      o('rock', 'rock', 'The rock')
    ], 'sun', 'Sunny yellow, like a happy smile!'),
    img('Which one is blue?', [
      o('water', 'water-drop', 'The water drop'),
      o('apples', 'apples', 'The apples'),
      o('sun', 'sun', 'The sun')
    ], 'water', 'Blue water goes splash!'),
    img('Which one is red?', [
      o('apples', 'apples', 'The apples'),
      o('tree', 'tree', 'The tree'),
      o('cloud', 'cloud', 'The cloud')
    ], 'apples', 'Red apples! Crunch, crunch!'),
    img('Which one is green?', [
      o('tree', 'tree', 'The tree'),
      o('apples', 'apples', 'The apples'),
      o('bell', 'bell', 'The bell')
    ], 'tree', 'Green leaves whisper in the wind. Swish!'),
    img('What is soft for sleeping?', [
      o('pillow', 'pillow', 'The pillow'),
      o('rock', 'rock', 'The rock'),
      o('cube', 'cube', 'The cube')
    ], 'pillow', 'Fluff! The pillow hugs your head.'),
    img('Which one floats up?', [
      o('balloon', 'balloon', 'The balloon'),
      o('rock', 'rock', 'The rock'),
      o('cube', 'cube', 'The cube')
    ], 'balloon', 'Up, up, up! The balloon floats away.'),
    count('How many stars are in the sky?', 'star', 3, [
      num(2), num(3), num(4)
    ], '3', 'Three twinkly stars. Count with me!'),
    count('How many bells are on the table?', 'bell', 2, [
      num(1), num(2), num(3)
    ], '2', 'Two bells. Ding-dong, ding-dong!'),
    compare('Which group has more?', [
      grp('stars', 'star', 3, 'Three stars'),
      grp('bells', 'bell', 1, 'One bell'),
      grp('apples', 'apples', 2, 'Two apples')
    ], 'stars', 'Three stars are more than one bell or two apples.'),
    letter('Which letter starts "Bell"?', [
      lt('B'), lt('D'), lt('M')
    ], 'B', 'Bell starts with B. B says /b/, like a bouncy ball.', { promptArt: 'bell' }),
    img('Which one smells sweet?', [
      o('flower', 'flower', 'The flower'),
      o('rock', 'rock', 'The rock'),
      o('cube', 'cube', 'The cube')
    ], 'flower', 'Sniff, sniff! Flowers smell sweet.')
  ];

  const SENSORIAL_MID = [
    img('Which one is the tallest?', [
      o('tower', 'pinkTower', 'The pink tower'),
      o('cube', 'cube', 'The cube'),
      o('teddy', 'teddy', 'The teddy')
    ], 'tower', 'The pink tower stacks up, up, up. Tallest of all!'),
    img('Which one is a cube?', [
      o('cube', 'cube', 'The cube'),
      o('ball', 'ball', 'The ball'),
      o('star', 'star', 'The star')
    ], 'cube', 'A cube has flat faces and pointy corners.'),
    img('Which one can roll?', [
      o('ball', 'ball', 'The ball'),
      o('cube', 'cube', 'The cube'),
      o('pillow', 'pillow', 'The pillow')
    ], 'ball', 'Roll, roll, roll! The ball goes round and round.'),
    img('Which one is smooth and soft?', [
      o('fabric', 'fabric', 'The fabric'),
      o('rock', 'rock', 'The rock'),
      o('ice', 'ice', 'The ice cube')
    ], 'fabric', 'Smooth fabric feels like a gentle pet.'),
    img('Which one is rough and bumpy?', [
      o('rock', 'rock', 'The rock'),
      o('fabric', 'fabric', 'The fabric'),
      o('water', 'water-drop', 'The water')
    ], 'rock', 'Rough rock! Feel the bumpy bumps.'),
    img('Which one would melt in a warm hand?', [
      o('ice', 'ice', 'The ice cube'),
      o('lamp', 'lamp', 'The lamp'),
      o('sun', 'sun', 'The sun')
    ], 'ice', 'Drip, drip! Warm hands turn ice into water.'),
    img('Which one gives light?', [
      o('lamp', 'lamp', 'The lamp'),
      o('rock', 'rock', 'The rock'),
      o('fabric', 'fabric', 'The fabric')
    ], 'lamp', 'Click! The lamp shines bright.'),
    img('Which one rings?', [
      o('bell', 'bell', 'The bell'),
      o('pillow', 'pillow', 'The pillow'),
      o('cube', 'cube', 'The cube')
    ], 'bell', 'Ding-dong! The bell has a happy voice.'),
    img('Which color is this cube?', [
      o('purple', 'cube', 'Purple'),
      o('yellow', 'sun', 'Yellow'),
      o('red', 'apples', 'Red')
    ], 'purple', 'Purple cube! Say it with me: pur-ple!'),
    count('How many stars twinkle?', 'star', 6, [
      num(5), num(6), num(7)
    ], '6', 'Six twinkly stars. Count one to six!'),
    count('How many bells ring?', 'bell', 4, [
      num(3), num(4), num(5)
    ], '4', 'Four bells. Ding, ding, ding, ding!'),
    compare('Which group has the most stars?', [
      grp('stars', 'star', 5, 'Five stars'),
      grp('bells', 'bell', 2, 'Two bells'),
      grp('apples', 'apples', 3, 'Three apples')
    ], 'stars', 'Five stars are more than two bells or three apples.'),
    compare('Which group has the fewest?', [
      grp('apples', 'apples', 1, 'One apple'),
      grp('stars', 'star', 3, 'Three stars'),
      grp('bells', 'bell', 2, 'Two bells')
    ], 'apples', 'One apple is fewer than three stars or two bells.'),
    pattern('What comes next? Star, apple, star, apple...', [
      { art: 'star' },
      { art: 'apples' },
      { art: 'star' },
      { art: 'apples' },
      { text: '?' }
    ], [
      o('star', 'star', 'Star'),
      o('apple', 'apples', 'Apple'),
      o('ball', 'ball', 'Ball')
    ], 'star', 'Star, apple, star, apple! The pattern takes turns.'),
    pattern('What comes next? Bell, balloon, bell, balloon...', [
      { art: 'bell' },
      { art: 'balloon' },
      { art: 'bell' },
      { art: 'balloon' },
      { text: '?' }
    ], [
      o('bell', 'bell', 'Bell'),
      o('balloon', 'balloon', 'Balloon'),
      o('star', 'star', 'Star')
    ], 'bell', 'Bell, balloon, bell, balloon! Ding, float, ding, float!'),
    img('Which one is heavy?', [
      o('rock', 'rock', 'The rock'),
      o('balloon', 'balloon', 'The balloon'),
      o('fabric', 'fabric', 'The fabric')
    ], 'rock', 'Heavy rock! It takes strong hands to lift.'),
    img('Which one is light?', [
      o('balloon', 'balloon', 'The balloon'),
      o('rock', 'rock', 'The rock'),
      o('cube', 'cube', 'The cube')
    ], 'balloon', 'Light as a feather! The balloon floats.'),
    img('Which one lets you see through it?', [
      o('ice', 'ice', 'The ice cube'),
      o('rock', 'rock', 'The rock'),
      o('teddy', 'teddy', 'The teddy')
    ], 'ice', 'You can peek through the ice. Brrr!'),
    letter('Which letter starts "Star"?', [
      lt('S'), lt('T'), lt('B')
    ], 'S', 'Star starts with S. S says /s/, like a twinkle.', { promptArt: 'star' }),
    letter('Which letter starts "Rock"?', [
      lt('R'), lt('L'), lt('M')
    ], 'R', 'Rock starts with R. R says /r/, like a growl.', { promptArt: 'rock' }),
    word('Which word describes soft?', [
      wr('fluffy', 'fluffy'),
      wr('hard', 'hard'),
      wr('loud', 'loud')
    ], 'fluffy', 'Fluffy means soft and puffy, like a cloud.'),
    img('Which one is best for a cozy nap?', [
      o('pillow', 'pillow', 'The pillow'),
      o('rock', 'rock', 'The rock'),
      o('ice', 'ice', 'The ice cube')
    ], 'pillow', 'Cozy pillow time. Zzz!')
  ];

  const SENSORIAL_HIGH = [
    count('How many stars twinkle?', 'star', 8, [
      num(7), num(8), num(9)
    ], '8', 'Eight stars. Count one to eight!'),
    count('How many bells can you count?', 'bell', 7, [
      num(6), num(7), num(8)
    ], '7', 'Seven bells, all in a row. Ding!'),
    count('How many pink blocks are stacked?', 'pinkTower', 6, [
      num(5), num(6), num(7)
    ], '6', 'Six pink blocks, up, up, up!'),
    number('Three stars plus two stars. How many?', [
      num(4), num(5), num(6)
    ], '5', 'Three plus two makes five.', {
      sequence: [{ text: '3' }, { text: '+' }, { text: '2' }, { text: '=' }, { text: '?' }]
    }),
    number('Momo stacks 5 blocks. She adds 3 more. How many?', [
      num(7), num(8), num(9)
    ], '8', 'Five plus three makes eight blocks.', {
      sequence: [{ text: '5' }, { text: '+' }, { text: '3' }, { text: '=' }, { text: '?' }]
    }),
    number('There are 9 stars. 4 fade away. How many are left?', [
      num(4), num(5), num(6)
    ], '5', 'Nine take away four leaves five.', {
      sequence: [{ text: '9' }, { text: '−' }, { text: '4' }, { text: '=' }, { text: '?' }]
    }),
    compare('Which group has the most?', [
      grp('stars', 'star', 5, 'Five stars'),
      grp('bells', 'bell', 3, 'Three bells'),
      grp('apples', 'apples', 4, 'Four apples')
    ], 'stars', 'Five stars are the biggest group.'),
    compare('Which group has the fewest?', [
      grp('apples', 'apples', 2, 'Two apples'),
      grp('stars', 'star', 5, 'Five stars'),
      grp('bells', 'bell', 4, 'Four bells')
    ], 'apples', 'Two apples is the smallest group.'),
    pattern('What comes next? Star, bell, bell, star, bell, ...?', [
      { art: 'star' },
      { art: 'bell' },
      { art: 'bell' },
      { art: 'star' },
      { art: 'bell' },
      { text: '?' }
    ], [
      o('bell', 'bell', 'Bell'),
      o('star', 'star', 'Star'),
      o('apples', 'apples', 'Apple')
    ], 'bell', 'The pattern is star, bell, bell. Bell comes next!'),
    pattern('Apple, apple, star, apple, apple, ...?', [
      { art: 'apples' },
      { art: 'apples' },
      { art: 'star' },
      { art: 'apples' },
      { art: 'apples' },
      { text: '?' }
    ], [
      o('star', 'star', 'Star'),
      o('apples', 'apples', 'Apple'),
      o('bell', 'bell', 'Bell')
    ], 'star', 'Two apples, then a star! Star comes next.'),
    img('Which shape has flat faces and corners?', [
      o('cube', 'cube', 'The cube'),
      o('ball', 'ball', 'The ball'),
      o('star', 'star', 'The star')
    ], 'cube', 'Flat faces, sharp corners. That is a cube!'),
    img('Which one rolls but has no corners?', [
      o('ball', 'ball', 'The ball'),
      o('cube', 'cube', 'The cube'),
      o('tower', 'pinkTower', 'The pink tower')
    ], 'ball', 'Round and smooth. The ball rolls everywhere!'),
    img('Which one is cold and see-through?', [
      o('ice', 'ice', 'The ice cube'),
      o('rock', 'rock', 'The rock'),
      o('fabric', 'fabric', 'The fabric')
    ], 'ice', 'Cold and clear. Ice is a chilly window!'),
    img('Which one makes warm light?', [
      o('lamp', 'lamp', 'The lamp'),
      o('ice', 'ice', 'The ice cube'),
      o('rock', 'rock', 'The rock')
    ], 'lamp', 'The lamp glows warm and bright.'),
    img('Which one is the heaviest?', [
      o('rock', 'rock', 'The rock'),
      o('pillow', 'pillow', 'The pillow'),
      o('balloon', 'balloon', 'The balloon')
    ], 'rock', 'Thump! The rock is heaviest.'),
    img('Which one is the lightest?', [
      o('balloon', 'balloon', 'The balloon'),
      o('rock', 'rock', 'The rock'),
      o('tower', 'pinkTower', 'The pink tower')
    ], 'balloon', 'Float, float! The balloon is lightest.'),
    img('Which one has a rough surface?', [
      o('rock', 'rock', 'The rock'),
      o('fabric', 'fabric', 'The fabric'),
      o('water', 'water-drop', 'The water drop')
    ], 'rock', 'Rough and bumpy, like a tiny mountain.'),
    img('Which one is the softest?', [
      o('fabric', 'fabric', 'The fabric'),
      o('rock', 'rock', 'The rock'),
      o('cube', 'cube', 'The cube')
    ], 'fabric', 'Soft and snuggly. Ahh!'),
    letter('Which letter starts "Ice"?', [
      lt('I'), lt('A'), lt('E')
    ], 'I', 'Ice starts with I. I says /i/, like igloo.', { promptArt: 'ice' }),
    letter('Which letter ends "Bell"?', [
      lt('L'), lt('B'), lt('T')
    ], 'L', 'Bell ends with L. Listen: be-ll.', { promptArt: 'bell' }),
    word('Which word is the opposite of "heavy"?', [
      wr('light', 'light'),
      wr('hard', 'hard'),
      wr('cold', 'cold')
    ], 'light', 'Heavy and light are opposites.'),
    word('Which word is the opposite of "rough"?', [
      wr('smooth', 'smooth'),
      wr('pointy', 'pointy'),
      wr('loud', 'loud')
    ], 'smooth', 'Rough and smooth are opposites.'),
    number('How many flat faces does a cube have?', [
      num(4), num(6), num(8)
    ], '6', 'A cube has six faces: top, bottom, and four sides.'),
    img('Which one would melt near a warm lamp?', [
      o('ice', 'ice', 'The ice cube'),
      o('rock', 'rock', 'The rock'),
      o('bell', 'bell', 'The bell')
    ], 'ice', 'Drip! The warm lamp turns ice into water.'),
    img('Which one would you smell?', [
      o('flower', 'flower', 'The flower'),
      o('bell', 'bell', 'The bell'),
      o('rock', 'rock', 'The rock')
    ], 'flower', 'Sniff, sniff! Flowers have a sweet smell.')
  ];

  /* ---------- Mathematics ---------- */

  const MATH_CORE = [
    count('How many apples?', 'apples', 3, [
      num(2), num(3), num(4)
    ], '3', 'One, two, three apples. Crunch!'),
    count('How many stars?', 'star', 4, [
      num(3), num(4), num(5)
    ], '4', 'Four stars. Count them: one to four!'),
    count('How many cupcakes?', 'cupcake', 2, [
      num(1), num(2), num(3)
    ], '2', 'Two cupcakes. Yum, yum!'),
    count('How many balloons?', 'balloon', 5, [
      num(4), num(5), num(6)
    ], '5', 'Five balloons. Up, up, up!'),
    number('Which number is three?', [
      num(3), num(5), num(8)
    ], '3', 'Three looks like this: 3. Three cheers!'),
    number('Which number comes after 2?', [
      num(1), num(3), num(4)
    ], '3', 'One, two, three! Three comes after two.'),
    compare('Which group has the most?', [
      grp('apples', 'apples', 2, 'Two apples'),
      grp('stars', 'star', 4, 'Four stars'),
      grp('cakes', 'cupcake', 1, 'One cupcake')
    ], 'stars', 'Four stars are more than two apples or one cupcake.'),
    compare('Which group has the fewest?', [
      grp('balloons', 'balloon', 1, 'One balloon'),
      grp('apples', 'apples', 3, 'Three apples'),
      grp('stars', 'star', 2, 'Two stars')
    ], 'balloons', 'One balloon is the smallest group.'),
    pattern('What comes next? Star, apple, star, apple...', [
      { art: 'star' },
      { art: 'apples' },
      { art: 'star' },
      { art: 'apples' },
      { text: '?' }
    ], [
      o('star', 'star', 'Star'),
      o('apple', 'apples', 'Apple'),
      o('cake', 'cupcake', 'Cupcake')
    ], 'star', 'Star, apple, star, apple, star!'),
    pattern('What comes next? Cupcake, balloon, cupcake, balloon...', [
      { art: 'cupcake' },
      { art: 'balloon' },
      { art: 'cupcake' },
      { art: 'balloon' },
      { text: '?' }
    ], [
      o('cake', 'cupcake', 'Cupcake'),
      o('balloon', 'balloon', 'Balloon'),
      o('apple', 'apples', 'Apple')
    ], 'cake', 'Cupcake, balloon, cupcake, balloon, cupcake!'),
    number('Momo has 1 cupcake. She gets 2 more. How many?', [
      num(2), num(3), num(4)
    ], '3', 'One plus two makes three cupcakes. Yum!', {
      sequence: [{ art: 'cupcake' }, { text: '+' }, { art: 'cupcake' }, { art: 'cupcake' }, { text: '=' }, { text: '?' }]
    }),
    number('There are 4 balloons. 1 pops. How many left?', [
      num(2), num(3), num(4)
    ], '3', 'Pop! Four take away one leaves three.', {
      sequence: [{ art: 'balloon' }, { art: 'balloon' }, { art: 'balloon' }, { text: '−' }, { art: 'balloon' }, { text: '=' }, { text: '?' }]
    }),
    count('How many whales are in the sea?', 'whale', 2, [
      num(1), num(2), num(3)
    ], '2', 'Two whales. Splash, splash!'),
    count('How many flowers are in the garden?', 'flower', 6, [
      num(5), num(6), num(7)
    ], '6', 'Six flowers. Smell them all!'),
    number('Which number shows one?', [
      num(1), num(2), num(3)
    ], '1', 'One is a single thing. One sun, one nose!'),
    img('Which picture shows numbers?', [
      o('tiles', 'number-tiles', '7 1 4'),
      o('star', 'star', 'A star'),
      o('apples', 'apples', 'Apples')
    ], 'tiles', 'Numbers are everywhere. 7, 1, 4!'),
    count('How many stars are on the beach?', 'star', 5, [
      num(4), num(5), num(6)
    ], '5', 'Five stars. Count one to five!'),
    compare('Which basket has more apples?', [
      grp('apples', 'apples', 4, 'Four apples'),
      grp('cakes', 'cupcake', 2, 'Two cupcakes'),
      grp('stars', 'star', 3, 'Three stars')
    ], 'apples', 'Four apples fill the basket best.'),
    number('Which number is missing? 1, 2, ?, 4', [
      num(3), num(5), num(6)
    ], '3', 'One, two, three, four! Three was hiding.', {
      sequence: [{ text: '1' }, { text: '2' }, { text: '?' }, { text: '4' }]
    }),
    compare('Which group is the smallest?', [
      grp('stars', 'star', 1, 'One star'),
      grp('apples', 'apples', 3, 'Three apples'),
      grp('cakes', 'cupcake', 2, 'Two cupcakes')
    ], 'stars', 'One star is the smallest group.')
  ];

  const MATH_MID = [
    count('How many cupcakes?', 'cupcake', 6, [
      num(5), num(6), num(7)
    ], '6', 'Six cupcakes. Count one to six!'),
    count('How many apples?', 'apples', 7, [
      num(6), num(7), num(8)
    ], '7', 'Seven apples. Crunch, crunch!'),
    count('How many balloons?', 'balloon', 8, [
      num(7), num(8), num(9)
    ], '8', 'Eight balloons. Up, up, up!'),
    number('Momo has 4 apples. She gets 2 more. How many?', [
      num(5), num(6), num(7)
    ], '6', 'Four plus two makes six apples.', {
      sequence: [{ text: '4' }, { text: '+' }, { text: '2' }, { text: '=' }, { text: '?' }]
    }),
    number('There are 7 balloons. 2 fly away. How many?', [
      num(4), num(5), num(6)
    ], '5', 'Seven take away two leaves five.', {
      sequence: [{ text: '7' }, { text: '−' }, { text: '2' }, { text: '=' }, { text: '?' }]
    }),
    number('What is one more than 5?', [
      num(4), num(6), num(7)
    ], '6', 'One more than five is six.'),
    number('What is one less than 8?', [
      num(6), num(7), num(9)
    ], '7', 'One less than eight is seven.'),
    number('Which number is between 4 and 6?', [
      num(3), num(5), num(7)
    ], '5', 'Five sits right between four and six.'),
    number('Which number comes after 7?', [
      num(6), num(8), num(9)
    ], '8', 'Seven, eight! Eight comes next.'),
    pattern('What number comes next? 2, 4, 6, ?', [
      { text: '2' }, { text: '4' }, { text: '6' }, { text: '?' }
    ], [
      num(7), num(8), num(9)
    ], '8', 'The numbers grow by two: 2, 4, 6, 8.'),
    pattern('What number comes next? 10, 8, 6, ?', [
      { text: '10' }, { text: '8' }, { text: '6' }, { text: '?' }
    ], [
      num(3), num(4), num(5)
    ], '4', 'The numbers go down by two: 10, 8, 6, 4.'),
    pattern('What comes next? Cupcake, star, cupcake, star...', [
      { art: 'cupcake' },
      { art: 'star' },
      { art: 'cupcake' },
      { art: 'star' },
      { text: '?' }
    ], [
      o('cake', 'cupcake', 'Cupcake'),
      o('star', 'star', 'Star'),
      o('balloon', 'balloon', 'Balloon')
    ], 'cake', 'Cupcake, star, cupcake, star, cupcake!'),
    compare('Which basket has the most apples?', [
      grp('apples', 'apples', 5, 'Five apples'),
      grp('cakes', 'cupcake', 3, 'Three cupcakes'),
      grp('stars', 'star', 4, 'Four stars')
    ], 'apples', 'Five apples are the most.'),
    compare('Which bundle has the fewest balloons?', [
      grp('balloons', 'balloon', 2, 'Two balloons'),
      grp('apples', 'apples', 5, 'Five apples'),
      grp('cakes', 'cupcake', 4, 'Four cupcakes')
    ], 'balloons', 'Two balloons are the fewest.'),
    count('How many stars?', 'star', 9, [
      num(8), num(9), num(10)
    ], '9', 'Nine stars. Count one to nine!'),
    count('How many flowers are in the garden?', 'flower', 7, [
      num(6), num(7), num(8)
    ], '7', 'Seven flowers. Sniff, sniff!'),
    number('How many sides does a square tile have?', [
      num(3), num(4), num(5)
    ], '4', 'A square has four sides. Count them!'),
    word('Which word is the opposite of "more"?', [
      wr('fewer', 'fewer'),
      wr('bigger', 'bigger'),
      wr('taller', 'taller')
    ], 'fewer', 'More and fewer are opposites.'),
    number('Momo is third in line. Which number shows third?', [
      { id: '1', label: '1st' },
      { id: '2', label: '2nd' },
      { id: '3', label: '3rd' }
    ], '3', 'First, second, third. Third is 3!'),
    number('What is 3 + 3?', [
      num(5), num(6), num(7)
    ], '6', 'Three plus three makes six.'),
    number('What is 7 − 2?', [
      num(4), num(5), num(6)
    ], '5', 'Seven take away two leaves five.'),
    count('How many smiling suns?', 'sun-math', 4, [
      num(3), num(4), num(5)
    ], '4', 'Four happy suns. Count one to four!')
  ];

  const MATH_HIGH = [
    number('8 − 3 = ?', [
      num(4), num(5), num(6)
    ], '5', 'Eight take away three leaves five.', {
      sequence: [{ text: '8' }, { text: '−' }, { text: '3' }, { text: '=' }, { text: '?' }]
    }),
    number('5 + 5 = ?', [
      num(9), num(10), num(11)
    ], '10', 'Five plus five makes ten. Ten fingers!'),
    number('6 + 4 = ?', [
      num(9), num(10), num(12)
    ], '10', 'Six plus four makes ten.'),
    number('9 − 5 = ?', [
      num(3), num(4), num(5)
    ], '4', 'Nine take away five leaves four.'),
    number('10 − 4 = ?', [
      num(5), num(6), num(7)
    ], '6', 'Ten take away four leaves six.'),
    number('7 + 3 = ?', [
      num(9), num(10), num(11)
    ], '10', 'Seven plus three makes ten.'),
    number('What is 2 more than 7?', [
      num(8), num(9), num(10)
    ], '9', 'Two more than seven is nine.'),
    number('What is 3 less than 10?', [
      num(6), num(7), num(8)
    ], '7', 'Three less than ten is seven.'),
    number('What is one more than 9?', [
      num(8), num(10), num(11)
    ], '10', 'One more than nine is ten.'),
    pattern('What number comes next? 2, 4, 6, 8, ?', [
      { text: '2' }, { text: '4' }, { text: '6' }, { text: '8' }, { text: '?' }
    ], [
      num(9), num(10), num(12)
    ], '10', 'The numbers grow by two: 2, 4, 6, 8, 10.'),
    pattern('What number comes next? 10, 8, 6, 4, ?', [
      { text: '10' }, { text: '8' }, { text: '6' }, { text: '4' }, { text: '?' }
    ], [
      num(2), num(3), num(5)
    ], '2', 'The numbers go down by two: 10, 8, 6, 4, 2.'),
    pattern('Count by fives. What comes next? 5, 10, 15, ?', [
      { text: '5' }, { text: '10' }, { text: '15' }, { text: '?' }
    ], [
      num(18), num(20), num(25)
    ], '20', 'Counting by fives: 5, 10, 15, 20.'),
    pattern('What number comes next? 1, 3, 5, ?', [
      { text: '1' }, { text: '3' }, { text: '5' }, { text: '?' }
    ], [
      num(6), num(7), num(8)
    ], '7', 'The numbers grow by two: 1, 3, 5, 7.'),
    count('How many stars are in the sky?', 'star', 10, [
      num(9), num(10), num(11)
    ], '10', 'Ten stars. Count one to ten!'),
    count('How many cupcakes are on the tray?', 'cupcake', 9, [
      num(8), num(9), num(10)
    ], '9', 'Nine cupcakes. Count one to nine!'),
    compare('Which basket is the fullest?', [
      grp('apples', 'apples', 5, 'Five apples'),
      grp('cakes', 'cupcake', 4, 'Four cupcakes'),
      grp('stars', 'star', 3, 'Three stars')
    ], 'apples', 'Five apples fill the basket most.'),
    compare('Which pile is the smallest?', [
      grp('balloons', 'balloon', 3, 'Three balloons'),
      grp('apples', 'apples', 5, 'Five apples'),
      grp('cakes', 'cupcake', 4, 'Four cupcakes')
    ], 'balloons', 'Three balloons is the smallest pile.'),
    number('Momo is fourth in line. How many friends are in front?', [
      num(2), num(3), num(4)
    ], '3', 'In fourth place, three friends come before you.'),
    word('Which word is the opposite of "fewer"?', [
      wr('more', 'more'),
      wr('less', 'less'),
      wr('small', 'small')
    ], 'more', 'Fewer and more are opposites.'),
    number('If 2 + 2 = 4, what is 4 − 2?', [
      num(1), num(2), num(3)
    ], '2', 'Four take away two leaves two.'),
    number('Which number is missing? 6, 7, ?, 9', [
      num(8), num(10), num(5)
    ], '8', 'Six, seven, eight, nine! Eight fits the box.', {
      sequence: [{ text: '6' }, { text: '7' }, { text: '?' }, { text: '9' }]
    }),
    number('How many sides does a square have?', [
      num(3), num(4), num(6)
    ], '4', 'A square has four sides. One, two, three, four!'),
    count('How many balloons?', 'balloon', 6, [
      num(5), num(6), num(7)
    ], '6', 'Six balloons. Count one to six!'),
    number('Ten apples. You eat 3. How many left?', [
      num(6), num(7), num(8)
    ], '7', 'Ten take away three leaves seven.'),
    number('What is 4 + 4?', [
      num(7), num(8), num(9)
    ], '8', 'Four plus four makes eight.')
  ];

  /* ---------- Language ---------- */

  const LANGUAGE_CORE = [
    img('Which picture starts with the /k/ sound?', [
      o('cat', 'cat', 'Cat'),
      o('dog', 'dog', 'Dog'),
      o('sun', 'sun', 'Sun')
    ], 'cat', 'C says /k/. Cat begins with /k/. C-c-cat!'),
    img('Which picture starts with the /d/ sound?', [
      o('dog', 'dog', 'Dog'),
      o('cat', 'cat', 'Cat'),
      o('frog', 'frog', 'Frog')
    ], 'dog', 'D says /d/. Dog begins with /d/. D-d-dog!'),
    img('Which picture starts with the /s/ sound?', [
      o('sun', 'sun', 'The sun'),
      o('moon', 'moon', 'The moon'),
      o('tree', 'tree', 'A tree')
    ], 'sun', 'S says /s/. Sun begins with /s/. Sss!'),
    img('Which picture starts with the /m/ sound?', [
      o('moon', 'moon', 'The moon'),
      o('sun', 'sun', 'The sun'),
      o('butterfly', 'butterfly', 'A butterfly')
    ], 'moon', 'M says /m/. Moon begins with /m/. Mmm!'),
    letter('Which letter says /k/?', [
      lt('C'), lt('M'), lt('S')
    ], 'C', 'C says /k/, like cat. C-c-cat!'),
    letter('Which letter says /d/?', [
      lt('D'), lt('B'), lt('T')
    ], 'D', 'D says /d/, like dog. D-d-dog!'),
    letter('Which letter says /s/?', [
      lt('S'), lt('A'), lt('N')
    ], 'S', 'S says /s/, like sun. Sss!'),
    letter('Which letter says /a/?', [
      lt('A'), lt('E'), lt('O')
    ], 'A', 'A says /a/, like apple. Ah!'),
    img('Which picture begins with the /b/ sound?', [
      o('bell', 'bell', 'Bell'),
      o('cat', 'cat', 'Cat'),
      o('sun', 'sun', 'Sun')
    ], 'bell', 'B says /b/. Bell begins with /b/. Ding-dong!'),
    img('Which picture begins with the /t/ sound?', [
      o('tree', 'tree', 'Tree'),
      o('dog', 'dog', 'Dog'),
      o('ant', 'ant', 'Ant')
    ], 'tree', 'T says /t/. Tree begins with /t/. T-t-tree!'),
    img('Which picture begins with the /f/ sound?', [
      o('flower', 'flower', 'Flower'),
      o('cloud', 'cloud', 'Cloud'),
      o('rock', 'rock', 'Rock')
    ], 'flower', 'F says /f/. Flower begins with /f/. Fff!'),
    img('Which picture begins with the /n/ sound?', [
      o('nest', 'nest', 'Nest'),
      o('dog', 'dog', 'Dog'),
      o('cloud', 'cloud', 'Cloud')
    ], 'nest', 'N says /n/. Nest begins with /n/. Nnn!'),
    letter('Which letter starts "Cat"?', [
      lt('C'), lt('D'), lt('B')
    ], 'C', 'Cat starts with /k/. C says /k/.', { promptArt: 'cat' }),
    letter('Which letter starts "Dog"?', [
      lt('D'), lt('B'), lt('P')
    ], 'D', 'Dog starts with /d/. D says /d/.', { promptArt: 'dog' }),
    letter('Which letter starts "Sun"?', [
      lt('S'), lt('M'), lt('N')
    ], 'S', 'Sun starts with /s/. S says /s/.', { promptArt: 'sun' }),
    letter('Which letter starts "Apple"?', [
      lt('A'), lt('E'), lt('O')
    ], 'A', 'Apple starts with /a/. A says /a/.', { promptArt: 'apples' }),
    word('Which word begins with the /k/ sound?', [
      wr('cat', 'cat'),
      wr('dog', 'dog'),
      wr('sun', 'sun')
    ], 'cat', 'Cat begins with /k/. C says /k/.'),
    word('Which word begins with the /m/ sound?', [
      wr('moon', 'moon'),
      wr('cat', 'cat'),
      wr('tree', 'tree')
    ], 'moon', 'Moon begins with /m/. M says /m/.'),
    letter('Which letter says /t/?', [
      lt('T'), lt('N'), lt('S')
    ], 'T', 'T says /t/, like tree. T-t-tree!'),
    img('Which picture begins with the /r/ sound?', [
      o('rock', 'rock', 'Rock'),
      o('sun', 'sun', 'The sun'),
      o('cat', 'cat', 'Cat')
    ], 'rock', 'R says /r/. Rock begins with /r/. Rrr!')
  ];

  const LANGUAGE_MID = [
    img('Which picture starts with the /p/ sound?', [
      o('panda', 'panda', 'Panda'),
      o('sun', 'sun', 'Sun'),
      o('tree', 'tree', 'Tree')
    ], 'panda', 'P says /p/. Panda begins with /p/. Puh!'),
    img('Which picture starts with the /k/ sound?', [
      o('camel', 'camel', 'Camel'),
      o('star', 'star', 'Star'),
      o('ant', 'ant', 'Ant')
    ], 'camel', 'C says /k/. Camel begins with /k/. Cuh!'),
    img('Which picture starts with the /w/ sound?', [
      o('whale', 'whale', 'Whale'),
      o('apples', 'apples', 'Apples'),
      o('tree', 'tree', 'Tree')
    ], 'whale', 'W says /w/. Whale begins with /w/. Www!'),
    img('Which picture starts with the /g/ sound?', [
      o('globe', 'globe', 'Globe'),
      o('sun', 'sun', 'Sun'),
      o('cat', 'cat', 'Cat')
    ], 'globe', 'G says /g/. Globe begins with /g/. Guh!'),
    img('Which picture starts with the /l/ sound?', [
      o('lamp', 'lamp', 'Lamp'),
      o('moon', 'moon', 'Moon'),
      o('tree', 'tree', 'Tree')
    ], 'lamp', 'L says /l/. Lamp begins with /l/. Lll!'),
    letter('Which letter ends "Cat"?', [
      lt('T'), lt('A'), lt('C')
    ], 'T', 'Cat ends with /t/. Listen: ca-t.', { word: 'Cat' }),
    letter('Which letter ends "Dog"?', [
      lt('G'), lt('D'), lt('O')
    ], 'G', 'Dog ends with /g/. Listen: do-g.', { word: 'Dog' }),
    letter('Which letter ends "Sun"?', [
      lt('N'), lt('S'), lt('U')
    ], 'N', 'Sun ends with /n/. Listen: su-n.', { word: 'Sun' }),
    letter('Which letter starts "Tree"?', [
      lt('T'), lt('D'), lt('B')
    ], 'T', 'Tree starts with /t/. T-t-tree!', { promptArt: 'tree' }),
    letter('Which letter starts "Moon"?', [
      lt('M'), lt('N'), lt('W')
    ], 'M', 'Moon starts with /m/. Mmm!', { promptArt: 'moon' }),
    word('Which word rhymes with "cat"?', [
      wr('hat', 'hat'),
      wr('dog', 'dog'),
      wr('sun', 'sun')
    ], 'hat', 'Cat and hat rhyme. Both end with /at/.'),
    word('Which word rhymes with "sun"?', [
      wr('fun', 'fun'),
      wr('cat', 'cat'),
      wr('bus', 'bus')
    ], 'fun', 'Sun and fun rhyme. Both end with /un/.'),
    word('Which word rhymes with "star"?', [
      wr('car', 'car'),
      wr('fish', 'fish'),
      wr('tree', 'tree')
    ], 'car', 'Star and car rhyme. Both end with /ar/.'),
    number('How many syllables are in "panda"?', [
      num(1), num(2), num(3)
    ], '2', 'Clap the sounds: pan-da. Two claps!', { word: 'panda', note: 'pan - da' }),
    number('How many syllables are in "butterfly"?', [
      num(2), num(3), num(4)
    ], '3', 'Clap the sounds: but-ter-fly. Three claps!', { word: 'butterfly', note: 'but - ter - fly' }),
    number('How many syllables are in "elephant"?', [
      num(2), num(3), num(4)
    ], '3', 'Clap the sounds: el-e-phant. Three claps!', { word: 'elephant', note: 'el - e - phant' }),
    letter('Which letter says /p/?', [
      lt('P'), lt('B'), lt('D')
    ], 'P', 'P says /p/, like panda. Puh!'),
    word('Which word begins with the /f/ sound?', [
      wr('frog', 'frog'),
      wr('moon', 'moon'),
      wr('tree', 'tree')
    ], 'frog', 'Frog begins with /f/. F says /f/.'),
    word('Which word ends with the /n/ sound?', [
      wr('sun', 'sun'),
      wr('cat', 'cat'),
      wr('tree', 'tree')
    ], 'sun', 'Sun ends with /n/. Listen: su-n.'),
    word('Which word rhymes with "dog"?', [
      wr('log', 'log'),
      wr('cat', 'cat'),
      wr('tree', 'tree')
    ], 'log', 'Dog and log rhyme. Both end with /og/.'),
    letter('Which letter ends "Frog"?', [
      lt('G'), lt('D'), lt('B')
    ], 'G', 'Frog ends with /g/. Listen: fro-g.', { word: 'Frog' }),
    letter('Which letter starts "Ant"?', [
      lt('A'), lt('E'), lt('I')
    ], 'A', 'Ant starts with /a/. A says /a/.', { promptArt: 'ant' })
  ];

  const LANGUAGE_HIGH = [
    img('Which picture starts with the /fr/ blend?', [
      o('frog', 'frog', 'Frog'),
      o('star', 'star', 'Star'),
      o('tree', 'tree', 'Tree')
    ], 'frog', 'Frog begins with /fr/. Fff-rr!'),
    img('Which picture starts with the /gl/ blend?', [
      o('globe', 'globe', 'Globe'),
      o('flower', 'flower', 'Flower'),
      o('frog', 'frog', 'Frog')
    ], 'globe', 'Globe begins with /gl/. Ggg-ll!'),
    img('Which picture starts with the /st/ blend?', [
      o('star', 'star', 'Star'),
      o('sprout', 'sprout', 'Sprout'),
      o('flower', 'flower', 'Flower')
    ], 'star', 'Star begins with /st/. Sss-tt!'),
    img('Which picture starts with the /tr/ blend?', [
      o('tree', 'tree', 'Tree'),
      o('frog', 'frog', 'Frog'),
      o('cloud', 'cloud', 'Cloud')
    ], 'tree', 'Tree begins with /tr/. Ttt-rr!'),
    img('Which picture begins with the letters wh?', [
      o('whale', 'whale', 'Whale'),
      o('apples', 'apples', 'Apples'),
      o('star', 'star', 'Star')
    ], 'whale', 'Whale begins with wh. The letters w and h say /w/.'),
    img('Which picture starts with the /fl/ blend?', [
      o('flower', 'flower', 'Flower'),
      o('frog', 'frog', 'Frog'),
      o('tree', 'tree', 'Tree')
    ], 'flower', 'Flower begins with /fl/. Fff-ll!'),
    word('Which word has the short /a/ sound?', [
      wr('cat', 'cat'),
      wr('cake', 'cake'),
      wr('car', 'car')
    ], 'cat', 'Cat has the short /a/ sound: c-a-t.'),
    word('Which word has the long /a/ sound?', [
      wr('cake', 'cake'),
      wr('cat', 'cat'),
      wr('cap', 'cap')
    ], 'cake', 'Cake has the long /a/ sound: c-a-k-e.'),
    word('Which word begins with the /sh/ sound?', [
      wr('ship', 'ship'),
      wr('sun', 'sun'),
      wr('tree', 'tree')
    ], 'ship', 'Ship begins with /sh/. Shh!'),
    word('Which word begins with the /ch/ sound?', [
      wr('chair', 'chair'),
      wr('cat', 'cat'),
      wr('tree', 'tree')
    ], 'chair', 'Chair begins with /ch/. Ch-ch!'),
    word('Which word begins with the /th/ sound?', [
      wr('thumb', 'thumb'),
      wr('tree', 'tree'),
      wr('sun', 'sun')
    ], 'thumb', 'Thumb begins with /th/. Th-th!'),
    letter('Which letters say /sh/?', [
      lt('sh'), lt('ch'), lt('th')
    ], 'sh', 'S and h together say /sh/, like ship.'),
    letter('Which letters say /ch/?', [
      lt('ch'), lt('sh'), lt('th')
    ], 'ch', 'C and h together say /ch/, like chair.'),
    letter('Which letters say /th/?', [
      lt('th'), lt('sh'), lt('ch')
    ], 'th', 'T and h together say /th/, like thumb.'),
    word('Which word ends with the /n/ sound?', [
      wr('sun', 'sun'),
      wr('cat', 'cat'),
      wr('book', 'book')
    ], 'sun', 'Sun ends with /n/. Listen: su-n.'),
    word('Which word ends with the /r/ sound?', [
      wr('star', 'star'),
      wr('fish', 'fish'),
      wr('tree', 'tree')
    ], 'star', 'Star ends with /r/. Listen: sta-r.'),
    letter('Which letter is silent in "cake"?', [
      lt('e'), lt('k'), lt('c')
    ], 'e', 'The e is silent. It makes the a say /ay/.', { word: 'cake' }),
    letter('Which letter is silent in "knee"?', [
      lt('k'), lt('n'), lt('e')
    ], 'k', 'The k is silent. We say /nee/.', { word: 'knee' }),
    word('Which word rhymes with "tree"?', [
      wr('bee', 'bee'),
      wr('train', 'train'),
      wr('boat', 'boat')
    ], 'bee', 'Tree and bee rhyme. Both end with /ee/.'),
    word('Which word rhymes with "cake"?', [
      wr('lake', 'lake'),
      wr('bike', 'bike'),
      wr('book', 'book')
    ], 'lake', 'Cake and lake rhyme. Both end with /ake/.'),
    word('Which word rhymes with "light"?', [
      wr('night', 'night'),
      wr('net', 'net'),
      wr('lot', 'lot')
    ], 'night', 'Light and night rhyme. Both end with /ight/.'),
    number('How many syllables are in "caterpillar"?', [
      num(3), num(4), num(5)
    ], '4', 'Clap it: cat-er-pil-lar. Four claps!', { word: 'caterpillar', note: 'cat - er - pil - lar' }),
    number('How many syllables are in "banana"?', [
      num(2), num(3), num(4)
    ], '3', 'Clap it: ba-na-na. Three claps!', { word: 'banana', note: 'ba - na - na' }),
    word('Which word begins with the /spr/ blend?', [
      wr('sprout', 'sprout'),
      wr('star', 'star'),
      wr('sun', 'sun')
    ], 'sprout', 'Sprout begins with /spr/. Sss-pr!'),
    word('Which word begins with the /fl/ blend?', [
      wr('flower', 'flower'),
      wr('frog', 'frog'),
      wr('fish', 'fish')
    ], 'flower', 'Flower begins with /fl/. Fff-ll!')
  ];

  const WRITING = {
    '3-4': {
      kind: 'uppercase',
      label: 'Big letters',
      hint: 'Trace the big letter from the green dot.',
      tolerance: 0.17,
      coverage: 0.4,
      floor: 0.24,
      guideAlpha: 0.24,
      items: [
        {
          text: 'S',
          name: 'big S',
          sound: 'sss',
          word: 'sun',
          prompt: 'Trace the big S. S says sss, like sun.'
        },
        {
          text: 'A',
          name: 'big A',
          sound: 'ah',
          word: 'apple',
          prompt: 'Trace the big A. A says ah, like apple.'
        },
        {
          text: 'M',
          name: 'big M',
          sound: 'mmm',
          word: 'moon',
          prompt: 'Trace the big M. M says mmm, like moon.'
        },
        {
          text: 'B',
          name: 'big B',
          sound: 'buh',
          word: 'ball',
          prompt: 'Trace the big B. B says buh, like ball.'
        },
        {
          text: 'C',
          name: 'big C',
          sound: 'kuh',
          word: 'cat',
          prompt: 'Trace the big C. C says kuh, like cat.'
        },
        {
          text: 'D',
          name: 'big D',
          sound: 'duh',
          word: 'dog',
          prompt: 'Trace the big D. D says duh, like dog.'
        },
        {
          text: 'T',
          name: 'big T',
          sound: 'tuh',
          word: 'tap',
          prompt: 'Trace the big T. T says tuh, like tap.'
        },
        {
          text: 'F',
          name: 'big F',
          sound: 'fff',
          word: 'fish',
          prompt: 'Trace the big F. F says fff, like fish.'
        },
        {
          text: 'G',
          name: 'big G',
          sound: 'guh',
          word: 'goat',
          prompt: 'Trace the big G. G says guh, like goat.'
        },
        {
          text: 'H',
          name: 'big H',
          sound: 'huh',
          word: 'hat',
          prompt: 'Trace the big H. H says huh, like hat.'
        },
        {
          text: 'J',
          name: 'big J',
          sound: 'juh',
          word: 'jam',
          prompt: 'Trace the big J. J says juh, like jam.'
        },
        {
          text: 'K',
          name: 'big K',
          sound: 'kuh',
          word: 'kite',
          prompt: 'Trace the big K. K says kuh, like kite.'
        },
        {
          text: 'L',
          name: 'big L',
          sound: 'lll',
          word: 'leaf',
          prompt: 'Trace the big L. L says lll, like leaf.'
        },
        {
          text: 'N',
          name: 'big N',
          sound: 'nnn',
          word: 'nest',
          prompt: 'Trace the big N. N says nnn, like nest.'
        },
        {
          text: 'P',
          name: 'big P',
          sound: 'puh',
          word: 'pig',
          prompt: 'Trace the big P. P says puh, like pig.'
        },
        {
          text: 'R',
          name: 'big R',
          sound: 'rrr',
          word: 'rain',
          prompt: 'Trace the big R. R says rrr, like rain.'
        },
        {
          text: 'V',
          name: 'big V',
          sound: 'vuh',
          word: 'van',
          prompt: 'Trace the big V. V says vuh, like van.'
        },
        {
          text: 'W',
          name: 'big W',
          sound: 'wuh',
          word: 'web',
          prompt: 'Trace the big W. W says wuh, like web.'
        },
        {
          text: 'Y',
          name: 'big Y',
          sound: 'yuh',
          word: 'yo-yo',
          prompt: 'Trace the big Y. Y says yuh, like yo-yo.'
        },
        {
          text: 'Z',
          name: 'big Z',
          sound: 'zzz',
          word: 'zebra',
          prompt: 'Trace the big Z. Z says zzz, like zebra.'
        }
      ]
    },
    '4-5': {
      kind: 'lowercase',
      label: 'Small letters',
      hint: 'Trace the lowercase letter from the green dot.',
      tolerance: 0.14,
      coverage: 0.48,
      floor: 0.3,
      guideAlpha: 0.18,
      items: [
        {
          text: 'c',
          name: 'lowercase c',
          sound: 'kuh',
          word: 'cat',
          prompt: 'Write lowercase c. C says kuh, like cat.'
        },
        {
          text: 'a',
          name: 'lowercase a',
          sound: 'ah',
          word: 'ant',
          prompt: 'Write lowercase a. A says ah, like ant.'
        },
        {
          text: 't',
          name: 'lowercase t',
          sound: 'tuh',
          word: 'tap',
          prompt: 'Write lowercase t. T says tuh, like tap.'
        },
        {
          text: 'b',
          name: 'lowercase b',
          sound: 'buh',
          word: 'ball',
          prompt: 'Write lowercase b. B says buh, like ball.'
        },
        {
          text: 'd',
          name: 'lowercase d',
          sound: 'duh',
          word: 'dog',
          prompt: 'Write lowercase d. D says duh, like dog.'
        },
        {
          text: 'f',
          name: 'lowercase f',
          sound: 'fuh',
          word: 'fish',
          prompt: 'Write lowercase f. F says fuh, like fish.'
        },
        {
          text: 'm',
          name: 'lowercase m',
          sound: 'mmm',
          word: 'moon',
          prompt: 'Write lowercase m. M says mmm, like moon.'
        },
        {
          text: 'e',
          name: 'lowercase e',
          sound: 'eh',
          word: 'egg',
          prompt: 'Write lowercase e. E says eh, like egg.'
        },
        {
          text: 'g',
          name: 'lowercase g',
          sound: 'guh',
          word: 'goat',
          prompt: 'Write lowercase g. G says guh, like goat.'
        },
        {
          text: 'h',
          name: 'lowercase h',
          sound: 'huh',
          word: 'hat',
          prompt: 'Write lowercase h. H says huh, like hat.'
        },
        {
          text: 'i',
          name: 'lowercase i',
          sound: 'ih',
          word: 'igloo',
          prompt: 'Write lowercase i. I says ih, like igloo.'
        },
        {
          text: 'k',
          name: 'lowercase k',
          sound: 'kuh',
          word: 'kite',
          prompt: 'Write lowercase k. K says kuh, like kite.'
        },
        {
          text: 'l',
          name: 'lowercase l',
          sound: 'lll',
          word: 'leaf',
          prompt: 'Write lowercase l. L says lll, like leaf.'
        },
        {
          text: 'n',
          name: 'lowercase n',
          sound: 'nnn',
          word: 'nest',
          prompt: 'Write lowercase n. N says nnn, like nest.'
        },
        {
          text: 'o',
          name: 'lowercase o',
          sound: 'aw',
          word: 'octopus',
          prompt: 'Write lowercase o. O says aw, like octopus.'
        },
        {
          text: 'p',
          name: 'lowercase p',
          sound: 'puh',
          word: 'pig',
          prompt: 'Write lowercase p. P says puh, like pig.'
        },
        {
          text: 'r',
          name: 'lowercase r',
          sound: 'rrr',
          word: 'rain',
          prompt: 'Write lowercase r. R says rrr, like rain.'
        },
        {
          text: 's',
          name: 'lowercase s',
          sound: 'sss',
          word: 'sun',
          prompt: 'Write lowercase s. S says sss, like sun.'
        },
        {
          text: 'u',
          name: 'lowercase u',
          sound: 'uh',
          word: 'umbrella',
          prompt: 'Write lowercase u. U says uh, like umbrella.'
        },
        {
          text: 'w',
          name: 'lowercase w',
          sound: 'wuh',
          word: 'web',
          prompt: 'Write lowercase w. W says wuh, like web.'
        }
      ]
    },
    '5-6': {
      kind: 'words',
      label: 'Little words',
      hint: 'Trace every letter of the word, left to right.',
      tolerance: 0.11,
      coverage: 0.54,
      floor: 0.34,
      guideAlpha: 0.13,
      items: [
        {
          text: 'cat',
          name: 'the word cat',
          sound: 'kuh, ah, tuh',
          word: 'cat',
          prompt: 'Write the word cat. C, A, T. Cat!'
        },
        {
          text: 'sun',
          name: 'the word sun',
          sound: 'sss, uh, nnn',
          word: 'sun',
          prompt: 'Write the word sun. S, U, N. Sun!'
        },
        {
          text: 'map',
          name: 'the word map',
          sound: 'mmm, ah, puh',
          word: 'map',
          prompt: 'Write the word map. M, A, P. Map!'
        },
        {
          text: 'dog',
          name: 'the word dog',
          sound: 'duh, aw, guh',
          word: 'dog',
          prompt: 'Write the word dog. D, O, G. Dog!'
        },
        {
          text: 'pig',
          name: 'the word pig',
          sound: 'puh, ih, guh',
          word: 'pig',
          prompt: 'Write the word pig. P, I, G. Pig!'
        },
        {
          text: 'hen',
          name: 'the word hen',
          sound: 'huh, eh, nnn',
          word: 'hen',
          prompt: 'Write the word hen. H, E, N. Hen!'
        },
        {
          text: 'bed',
          name: 'the word bed',
          sound: 'buh, eh, duh',
          word: 'bed',
          prompt: 'Write the word bed. B, E, D. Bed!'
        },
        {
          text: 'hat',
          name: 'the word hat',
          sound: 'huh, ah, tuh',
          word: 'hat',
          prompt: 'Write the word hat. H, A, T. Hat!'
        },
        {
          text: 'pen',
          name: 'the word pen',
          sound: 'puh, eh, nnn',
          word: 'pen',
          prompt: 'Write the word pen. P, E, N. Pen!'
        },
        {
          text: 'log',
          name: 'the word log',
          sound: 'lll, aw, guh',
          word: 'log',
          prompt: 'Write the word log. L, O, G. Log!'
        },
        {
          text: 'bug',
          name: 'the word bug',
          sound: 'buh, uh, guh',
          word: 'bug',
          prompt: 'Write the word bug. B, U, G. Bug!'
        },
        {
          text: 'top',
          name: 'the word top',
          sound: 'tuh, aw, puh',
          word: 'top',
          prompt: 'Write the word top. T, O, P. Top!'
        },
        {
          text: 'run',
          name: 'the word run',
          sound: 'rrr, uh, nnn',
          word: 'run',
          prompt: 'Write the word run. R, U, N. Run!'
        },
        {
          text: 'sit',
          name: 'the word sit',
          sound: 'sss, ih, tuh',
          word: 'sit',
          prompt: 'Write the word sit. S, I, T. Sit!'
        },
        {
          text: 'fan',
          name: 'the word fan',
          sound: 'fff, ah, nnn',
          word: 'fan',
          prompt: 'Write the word fan. F, A, N. Fan!'
        },
        {
          text: 'hop',
          name: 'the word hop',
          sound: 'huh, aw, puh',
          word: 'hop',
          prompt: 'Write the word hop. H, O, P. Hop!'
        },
        {
          text: 'mud',
          name: 'the word mud',
          sound: 'mmm, uh, duh',
          word: 'mud',
          prompt: 'Write the word mud. M, U, D. Mud!'
        },
        {
          text: 'red',
          name: 'the word red',
          sound: 'rrr, eh, duh',
          word: 'red',
          prompt: 'Write the word red. R, E, D. Red!'
        },
        {
          text: 'big',
          name: 'the word big',
          sound: 'buh, ih, guh',
          word: 'big',
          prompt: 'Write the word big. B, I, G. Big!'
        },
        {
          text: 'cup',
          name: 'the word cup',
          sound: 'kuh, uh, puh',
          word: 'cup',
          prompt: 'Write the word cup. C, U, P. Cup!'
        }
      ]
    }
  };

  Object.keys(WRITING).forEach(function (bandId) {
    var band = WRITING[bandId];
    band.items.forEach(function (item) {
      var sound = item.sound;
      var soundTitle = sound.charAt(0).toUpperCase() + sound.slice(1);
      var wordTitle = item.word.charAt(0).toUpperCase() + item.word.slice(1);
      if (band.kind === 'words') {
        item.say = wordTitle + '! Write the word ' + item.word + '. ' + soundTitle + '. ' + wordTitle + '! Say each sound as you trace.';
      } else {
        item.say = 'Listen to the sound: ' + sound + '. Trace the ' + (band.kind === 'uppercase' ? 'big' : 'small') + ' letter. ' + soundTitle + ', like ' + item.word + '. Say ' + sound + ' as you trace.';
      }
    });
  });

  /* ---------- Culture & Science ---------- */

  const CULTURE_CORE = [
    img('What does a globe show?', [
      o('earth', 'globe', 'Earth'),
      o('moon', 'moon', 'The Moon'),
      o('sun', 'sun', 'The Sun')
    ], 'earth', 'A globe is a tiny model of our big Earth. Hello, world!'),
    img('Which animal lives in the water?', [
      o('whale', 'whale', 'Whale'),
      o('camel', 'camel', 'Camel'),
      o('cat', 'cat', 'Cat')
    ], 'whale', 'Whales splash in the ocean. Whoosh!'),
    img('Which animal lives in the desert?', [
      o('camel', 'camel', 'Camel'),
      o('whale', 'whale', 'Whale'),
      o('frog', 'frog', 'Frog')
    ], 'camel', 'Camels walk on hot sand. They have a hump full of fat!'),
    img('Which animal is black and white?', [
      o('panda', 'panda', 'Panda'),
      o('frog', 'frog', 'Frog'),
      o('cat', 'cat', 'Cat')
    ], 'panda', 'Pandas munch bamboo all day. Crunch!'),
    img('Which one is a plant?', [
      o('flower', 'flower', 'Flower'),
      o('rock', 'rock', 'Rock'),
      o('cloud', 'cloud', 'Cloud')
    ], 'flower', 'Flowers grow with water and sunlight. Bloom!'),
    img('Which one is a living thing?', [
      o('tree', 'tree', 'Tree'),
      o('rock', 'rock', 'Rock'),
      o('cloud', 'cloud', 'Cloud')
    ], 'tree', 'The tree grows and drinks water. It is alive!'),
    img('What do plants drink?', [
      o('water', 'water-drop', 'Water'),
      o('rock', 'rock', 'Rock'),
      o('star', 'star', 'Star')
    ], 'water', 'Plants sip water through their roots. Glug, glug!'),
    img('What gives us light in the day?', [
      o('sun', 'sun', 'The sun'),
      o('moon', 'moon', 'The moon'),
      o('star', 'star', 'Stars')
    ], 'sun', 'The sun wakes up the day. Good morning!'),
    img('What do we see at night?', [
      o('moon', 'moon', 'The moon'),
      o('sun', 'sun', 'The sun'),
      o('tree', 'tree', 'The tree')
    ], 'moon', 'The moon glows at night. Twinkle!'),
    img('What falls from clouds when it rains?', [
      o('water', 'water-drop', 'Water'),
      o('rock', 'rock', 'Rocks'),
      o('star', 'star', 'Stars')
    ], 'water', 'Drip, drop! Rain waters the plants.'),
    img('Which animal can hop?', [
      o('frog', 'frog', 'Frog'),
      o('whale', 'whale', 'Whale'),
      o('camel', 'camel', 'Camel')
    ], 'frog', 'Boing, boing! The frog hops.'),
    img('Which small animal has six legs?', [
      o('ant', 'ant', 'Ant'),
      o('cat', 'cat', 'Cat'),
      o('panda', 'panda', 'Panda')
    ], 'ant', 'An ant has six tiny legs. March, march!'),
    img('Which one grows from a seed?', [
      o('sprout', 'sprout', 'Sprout'),
      o('rock', 'rock', 'Rock'),
      o('cloud', 'cloud', 'Cloud')
    ], 'sprout', 'A tiny sprout pops out of the soil. Hello, little plant!'),
    img('Where do bird eggs sit?', [
      o('nest', 'nest', 'In a nest'),
      o('burrow', 'burrow', 'In a burrow'),
      o('rock', 'rock', 'On a rock')
    ], 'nest', 'Eggs snuggle in a nest. Cheep, cheep!'),
    img('Which animal has wings?', [
      o('butterfly', 'butterfly', 'Butterfly'),
      o('frog', 'frog', 'Frog'),
      o('whale', 'whale', 'Whale')
    ], 'butterfly', 'Flutter, flutter! The butterfly flies.'),
    count('How many butterflies?', 'butterfly', 2, [
      num(1), num(2), num(3)
    ], '2', 'Two butterflies. Flutter, flutter!'),
    count('How many trees?', 'tree', 3, [
      num(2), num(3), num(4)
    ], '3', 'Three trees. Count one to three!'),
    compare('Which group has more animals?', [
      grp('butterflies', 'butterfly', 3, 'Three butterflies'),
      grp('frogs', 'frog', 1, 'One frog'),
      grp('ants', 'ant', 2, 'Two ants')
    ], 'butterflies', 'Three butterflies are more than one frog or two ants.'),
    letter('Which letter starts "Tree"?', [
      lt('T'), lt('D'), lt('B')
    ], 'T', 'Tree starts with T. T-t-tree!', { promptArt: 'tree' }),
    img('Which picture shows our planet?', [
      o('globe', 'globe', 'The globe'),
      o('sun', 'sun', 'The sun'),
      o('star', 'star', 'A star')
    ], 'globe', 'Earth is our home. Round and blue!')
  ];

  const CULTURE_MID = [
    img('A butterfly begins life as a...', [
      o('caterpillar', 'caterpillar', 'Caterpillar'),
      o('frog', 'frog', 'Frog'),
      o('panda', 'panda', 'Panda')
    ], 'caterpillar', 'A caterpillar becomes a chrysalis, then a butterfly. Wow!'),
    img('What comes out of a chrysalis?', [
      o('butterfly', 'butterfly', 'Butterfly'),
      o('frog', 'frog', 'Frog'),
      o('nest', 'nest', 'Nest')
    ], 'butterfly', 'Pop! Out comes a butterfly with colorful wings.'),
    img('Which animal has fur and drinks milk as a baby?', [
      o('panda', 'panda', 'Panda'),
      o('frog', 'frog', 'Frog'),
      o('butterfly', 'butterfly', 'Butterfly')
    ], 'panda', 'Pandas have fur and drink milk. They are mammals.'),
    img('Which animal lives underground?', [
      o('ant', 'ant', 'Ant'),
      o('whale', 'whale', 'Whale'),
      o('panda', 'panda', 'Panda')
    ], 'ant', 'Ants build tunnels under the ground. Busy ants!'),
    img('Which animal lives in a cold mountain forest?', [
      o('panda', 'panda', 'Panda'),
      o('camel', 'camel', 'Camel'),
      o('whale', 'whale', 'Whale')
    ], 'panda', 'Pandas live in cool bamboo forests.'),
    img('What do seeds need besides water?', [
      o('sun', 'sun', 'Sunlight'),
      o('rock', 'rock', 'A rock'),
      o('moon', 'moon', 'The moon')
    ], 'sun', 'Seeds need water, air, and sunlight. Grow, seed, grow!'),
    word('Which part of a plant drinks water?', [
      wr('roots', 'roots'),
      wr('leaves', 'leaves'),
      wr('petals', 'petals')
    ], 'roots', 'Roots hide under the ground and sip water.'),
    img('Which animal starts life in water as a tadpole?', [
      o('frog', 'frog', 'Frog'),
      o('whale', 'whale', 'Whale'),
      o('panda', 'panda', 'Panda')
    ], 'frog', 'A tadpole grows legs and becomes a frog. Ribbit!'),
    img('Which animal lays eggs on leaves?', [
      o('butterfly', 'butterfly', 'Butterfly'),
      o('frog', 'frog', 'Frog'),
      o('panda', 'panda', 'Panda')
    ], 'butterfly', 'Butterflies lay tiny eggs on leaves. So small!'),
    img('Which animal comes from an egg?', [
      o('frog', 'frog', 'Frog'),
      o('panda', 'panda', 'Panda'),
      o('cat', 'cat', 'Cat')
    ], 'frog', 'Frogs hatch from eggs. Tiny tadpoles swim out!'),
    number('How many legs does an ant have?', [
      num(4), num(6), num(8)
    ], '6', 'Insects have six legs. An ant is an insect.'),
    number('How many legs does a panda have?', [
      num(2), num(4), num(6)
    ], '4', 'Pandas have four legs. One, two, three, four!'),
    number('How many wings does a butterfly have?', [
      num(2), num(4), num(6)
    ], '4', 'Butterflies have four wings. Flutter, flutter!'),
    img('Which plant part smells sweet and makes seeds?', [
      o('flower', 'flower', 'Flower'),
      o('rock', 'rock', 'Rock'),
      o('cloud', 'cloud', 'Cloud')
    ], 'flower', 'Flowers smell sweet and make seeds.'),
    img('Which one gives light at night?', [
      o('moon', 'moon', 'The moon'),
      o('rock', 'rock', 'A rock'),
      o('tree', 'tree', 'A tree')
    ], 'moon', 'The moon glows at night. Goodnight, moon!'),
    img('Where does a bird keep its eggs?', [
      o('nest', 'nest', 'In a nest'),
      o('burrow', 'burrow', 'In a burrow'),
      o('cloud', 'cloud', 'In a cloud')
    ], 'nest', 'Bird eggs sit safe in a nest.'),
    img('Which animal swims in the ocean?', [
      o('whale', 'whale', 'Whale'),
      o('camel', 'camel', 'Camel'),
      o('ant', 'ant', 'Ant')
    ], 'whale', 'Whales swim in the salty ocean. Splash!'),
    img('Which animal walks in the desert?', [
      o('camel', 'camel', 'Camel'),
      o('whale', 'whale', 'Whale'),
      o('frog', 'frog', 'Frog')
    ], 'camel', 'Camels walk on hot sand with big soft feet.'),
    count('How many frogs are by the pond?', 'frog', 4, [
      num(3), num(4), num(5)
    ], '4', 'Four frogs. Ribbit, ribbit, ribbit, ribbit!'),
    compare('Which group has the most plants?', [
      grp('sprouts', 'sprout', 4, 'Four sprouts'),
      grp('flowers', 'flower', 2, 'Two flowers'),
      grp('seeds', 'seed', 3, 'Three seeds')
    ], 'sprouts', 'Four sprouts are more than two flowers or three seeds.'),
    letter('Which letter starts "Frog"?', [
      lt('F'), lt('T'), lt('B')
    ], 'F', 'Frog starts with F. Fff!', { promptArt: 'frog' }),
    letter('Which letter starts "Tree"?', [
      lt('T'), lt('D'), lt('P')
    ], 'T', 'Tree starts with T. T-t-tree!', { promptArt: 'tree' })
  ];

  const CULTURE_HIGH = [
    word('Which part of a plant takes in water?', [
      wr('roots', 'roots'),
      wr('leaves', 'leaves'),
      wr('petals', 'petals')
    ], 'roots', 'Roots drink water and hold the plant in the soil.'),
    word('Which part of a plant makes seeds?', [
      wr('flower', 'flower'),
      wr('roots', 'roots'),
      wr('leaves', 'leaves')
    ], 'flower', 'The flower makes seeds so new plants can grow.'),
    img('What do seeds need besides water and air?', [
      o('sun', 'sun', 'Sunlight'),
      o('moon', 'moon', 'The moon'),
      o('rock', 'rock', 'A rock')
    ], 'sun', 'Seeds need sunlight too. Grow, little seed!'),
    img('What comes out of a chrysalis?', [
      o('butterfly', 'butterfly', 'A butterfly'),
      o('seed', 'seed', 'A seed'),
      o('nest', 'nest', 'A nest')
    ], 'butterfly', 'A caterpillar rests inside, then out flies a butterfly!'),
    img('A tadpole grows into a...', [
      o('frog', 'frog', 'Frog'),
      o('whale', 'whale', 'Whale'),
      o('butterfly', 'butterfly', 'Butterfly')
    ], 'frog', 'Tadpole, tadpole, grow, grow! Hello, frog!'),
    number('One butterfly has 2 wings. Two butterflies have...?', [
      num(2), num(4), num(6)
    ], '4', 'Two plus two makes four wings.', {
      sequence: [{ text: '2' }, { text: '+' }, { text: '2' }, { text: '=' }, { text: '?' }]
    }),
    number('An ant is an insect. How many legs does it have?', [
      num(4), num(6), num(8)
    ], '6', 'Insects have six legs. Count them on an ant!'),
    number('Two pandas sit together. How many legs in all?', [
      num(6), num(8), num(10)
    ], '8', 'Four plus four makes eight paws.', {
      sequence: [{ text: '4' }, { text: '+' }, { text: '4' }, { text: '=' }, { text: '?' }]
    }),
    img('Which animal is a mammal?', [
      o('whale', 'whale', 'Whale'),
      o('frog', 'frog', 'Frog'),
      o('butterfly', 'butterfly', 'Butterfly')
    ], 'whale', 'Whales breathe air and feed milk. They are mammals!'),
    img('What is wood made from?', [
      o('tree', 'tree', 'Trees'),
      o('rock', 'rock', 'Rocks'),
      o('cloud', 'cloud', 'Clouds')
    ], 'tree', 'Wood comes from trees. Knock on a wooden table!'),
    word('Which season brings snow?', [
      wr('winter', 'winter'),
      wr('summer', 'summer'),
      wr('spring', 'spring')
    ], 'winter', 'Winter is cold and snowy. Brrr!'),
    word('What do we call a baby cat?', [
      wr('kitten', 'kitten'),
      wr('puppy', 'puppy'),
      wr('chick', 'chick')
    ], 'kitten', 'A baby cat is a kitten. Meow!'),
    img('Which animal is born live and drinks milk?', [
      o('panda', 'panda', 'Panda'),
      o('frog', 'frog', 'Frog'),
      o('butterfly', 'butterfly', 'Butterfly')
    ], 'panda', 'Panda babies are born live and drink milk.'),
    img('Which one moves around Earth?', [
      o('moon', 'moon', 'The Moon'),
      o('sun', 'sun', 'The Sun'),
      o('star', 'star', 'A star')
    ], 'moon', 'The moon travels around Earth. Round and round!'),
    img('Which one is a star?', [
      o('star', 'star', 'The star'),
      o('moon', 'moon', 'The moon'),
      o('cloud', 'cloud', 'The cloud')
    ], 'star', 'A star twinkles far away. Twinkle, twinkle!'),
    word('What covers a panda\'s body?', [
      wr('fur', 'fur'),
      wr('feathers', 'feathers'),
      wr('scales', 'scales')
    ], 'fur', 'Pandas are covered in soft fur.'),
    word('Which animal has feathers?', [
      wr('bird', 'bird'),
      wr('frog', 'frog'),
      wr('panda', 'panda')
    ], 'bird', 'Birds are covered in feathers. Flap, flap!'),
    img('Which animal lives in a burrow?', [
      o('ant', 'ant', 'Ant'),
      o('whale', 'whale', 'Whale'),
      o('panda', 'panda', 'Panda')
    ], 'ant', 'Ants dig tunnels underground. Busy builders!'),
    img('Which one grows into a tree?', [
      o('seed', 'seed', 'A seed'),
      o('rock', 'rock', 'A rock'),
      o('cloud', 'cloud', 'A cloud')
    ], 'seed', 'A tiny seed can grow into a big tree. Wow!'),
    number('Three butterflies have how many wings?', [
      num(4), num(6), num(8)
    ], '6', 'Two plus two plus two makes six wings.', {
      sequence: [{ text: '2' }, { text: '+' }, { text: '2' }, { text: '+' }, { text: '2' }, { text: '=' }, { text: '?' }]
    }),
    word('What do we call a bird\'s home?', [
      wr('nest', 'nest'),
      wr('burrow', 'burrow'),
      wr('den', 'den')
    ], 'nest', 'A nest is a cozy home for bird eggs.'),
    img('Which one is a baby plant?', [
      o('sprout', 'sprout', 'The sprout'),
      o('tree', 'tree', 'The tree'),
      o('rock', 'rock', 'The rock')
    ], 'sprout', 'A sprout is a baby plant. Grow, grow!'),
    word('Which part carries water up the plant?', [
      wr('stem', 'stem'),
      wr('roots', 'roots'),
      wr('petals', 'petals')
    ], 'stem', 'The stem carries water up to the leaves.'),
    img('Which animal lives in a bamboo forest?', [
      o('panda', 'panda', 'Panda'),
      o('camel', 'camel', 'Camel'),
      o('whale', 'whale', 'Whale')
    ], 'panda', 'Pandas live where bamboo grows. Crunch!'),
    img('Which part of a plant do bees visit?', [
      o('flower', 'flower', 'The flower'),
      o('seed', 'seed', 'The seed'),
      o('rock', 'rock', 'The rock')
    ], 'flower', 'Bees visit flowers for sweet nectar. Buzz!')
  ];

  const THEMES = [
    {
      id: 'practical',
      no: 1,
      trail: 'Home Helpers',
      name: 'Practical Life',
      english: 'Practical Life',
      tagline: 'I can do it myself!',
      blurb: 'Pouring, washing, tidying',
      world: 'home',
      scene: 'kitchen',
      color: '#ff8163',
      deep: '#cf4b2b',
      tint: '#fff1e9',
      soft: '#ffe1d3',
      icon: 'subject-practical',
      sticker: { name: 'Home Hero', art: 'subject-practical' },
      story: [
        {
          kind: 'story',
          scene: 'kitchen',
          kicker: 'Practical Life',
          title: 'Little jobs, big kid',
          text: 'Tap your hands together! At home we do real jobs: pour water, set the table, and tidy up. Every little job makes you stronger and kinder.',
          narration: 'Hello, home helper! Let us do real jobs together. Pour, wipe, tidy. Can you clap your hands? Every little job makes you a big kid!',
          art: ['wash', 'pitcher', 'toybox'],
          chips: ['Pour', 'Wipe', 'Tidy']
        },
        {
          kind: 'story',
          scene: 'bedroom',
          kicker: 'Why it matters',
          title: 'Slow hands get clever',
          text: 'When we try slowly, our hands learn. We also learn patience, care, and responsibility.',
          narration: 'Slow and steady, hands get clever! Watch your fingers learn. Patience, care, responsibility. You can do it!',
          art: ['pillow', 'lamp', 'teddy'],
          chips: ['Patience', 'Care', 'Responsibility']
        },
        {
          kind: 'story',
          scene: 'care',
          kicker: 'A home helper',
          title: 'A tidy home feels calm',
          text: 'We wash our hands, water the plant, and put toys away. Small hands can do big help.',
          narration: 'Wash, wash! Water, water! Tidy, tidy! A tidy home feels calm and cozy. Small hands can do big help!',
          art: ['wash', 'water-drop', 'shelf'],
          chips: ['Wash', 'Water', 'Tidy']
        },
        {
          kind: 'demo',
          scene: 'kitchen',
          kicker: 'Try it!',
          title: 'Pour the water',
          text: 'Tap the jug three times. Pour slowly so the water stays in the cup.',
          narration: 'Let us pour! Tap the jug three times. Slow and steady keeps the water in the cup. Ready? Pour!',
          demo: 'pour',
          success: 'Perfect pour! You used slow, careful hands.'
        },
        {
          kind: 'start',
          scene: 'kitchen',
          kicker: 'Quiz time',
          title: 'Ready to help?',
          text: 'Show what you know about being a home helper.',
          narration: 'High five! Time for the quiz. Let us see what you know. Let us go!'
        }
      ],
      questions: {
        '3-4': PRACTICAL_CORE,
        '4-5': PRACTICAL_MID,
        '5-6': PRACTICAL_HIGH
      }
    },

    {
      id: 'sensorial',
      no: 2,
      trail: 'Sense Safari',
      name: 'Sensorial',
      english: 'Sensorial',
      tagline: 'Explore with your senses',
      blurb: 'Size, color, sound, texture',
      world: 'senses',
      scene: 'senses',
      color: '#ef6f9b',
      deep: '#bf3e6a',
      tint: '#fff0f6',
      soft: '#ffdbe8',
      icon: 'subject-sensorial',
      sticker: { name: 'Sense Explorer', art: 'subject-sensorial' },
      story: [
        {
          kind: 'story',
          scene: 'senses',
          kicker: 'Sensorial',
          title: 'Five senses, one world',
          text: 'Eyes see, ears hear, hands touch, nose smells, and tongue tastes. Can you blink and listen?',
          narration: 'Welcome to Sense Safari! Blink your eyes! Wiggle your fingers! Listen closely! Our senses tell us about the world.',
          art: ['bell', 'ice', 'pillow'],
          chips: ['See', 'Hear', 'Touch']
        },
        {
          kind: 'story',
          scene: 'senses',
          kicker: 'Size and color',
          title: 'From biggest to smallest',
          text: 'The pink tower grows from a big block to a tiny block. Which one is the tallest?',
          narration: 'Look at the pink tower! Big, bigger, biggest! Stack them up, up, up. Which block is the tallest?',
          art: ['pinkTower', 'cube', 'star'],
          chips: ['Big', 'Small', 'Stack']
        },
        {
          kind: 'story',
          scene: 'senses',
          kicker: 'Touch and weight',
          title: 'Soft, rough, heavy, light',
          text: 'Fabric feels soft. A rock feels rough. A rock is heavy. A balloon is light.',
          narration: 'Squish the soft fabric! Tap the rough rock! Lift the heavy rock. Now float the light balloon!',
          art: ['fabric', 'rock', 'balloon'],
          chips: ['Soft', 'Rough', 'Heavy']
        },
        {
          kind: 'demo',
          scene: 'senses',
          kicker: 'Try it!',
          title: 'Tap the bell',
          text: 'Tap the bell. Listen for a high sound and a low sound.',
          narration: 'Ding-dong! Tap the bell. Listen for a high sound, then a low sound. Can you hear the difference?',
          demo: 'tones',
          success: 'Great listening! High sounds ring and low sounds feel heavy.'
        },
        {
          kind: 'start',
          scene: 'senses',
          kicker: 'Quiz time',
          title: 'Ready to explore?',
          text: 'Use your eyes and ears for the sense safari quiz.',
          narration: 'What a wonderful safari! Now let us play the quiz. Eyes open, ears ready. Let us go!'
        }
      ],
      questions: {
        '3-4': SENSORIAL_CORE,
        '4-5': SENSORIAL_MID,
        '5-6': SENSORIAL_HIGH
      }
    },

    {
      id: 'math',
      no: 3,
      trail: 'Number Cove',
      name: 'Mathematics',
      english: 'Mathematics',
      tagline: 'Counting is an adventure',
      blurb: 'Numbers, amounts, patterns',
      world: 'cove',
      scene: 'cove',
      color: '#2fb7a5',
      deep: '#1b7d70',
      tint: '#e9faf6',
      soft: '#c9f0e8',
      icon: 'subject-math',
      sticker: { name: 'Number Navigator', art: 'subject-math' },
      story: [
        {
          kind: 'story',
          scene: 'cove',
          kicker: 'Mathematics',
          title: 'Count the treasure',
          text: 'At Number Cove we count apples, stars, and cupcakes. Touch each thing once as you count.',
          narration: 'Welcome to Number Cove! Look at all the treasure! Touch each thing once and count with me. One, two, three!',
          art: ['apples', 'star', 'cupcake'],
          chips: ['Count', 'Touch', 'Say it']
        },
        {
          kind: 'story',
          scene: 'cove',
          kicker: 'Numbers and amounts',
          title: 'A number means a lot',
          text: 'The number 3 means three things. The number 5 means five things. Which group has more?',
          narration: 'Numbers are like magic words! Three means three things. Five means five. Can you show five fingers?',
          art: ['number-tiles', 'balloon', 'abacus'],
          chips: ['1, 2, 3', 'More', 'Fewer']
        },
        {
          kind: 'story',
          scene: 'cove',
          kicker: 'Add and take away',
          title: 'Treasures come and go',
          text: 'Two apples plus one apple makes three. Three balloons minus one leaves two. Counting helps us find out.',
          narration: 'Two plus one makes three. Three take away one leaves two. Count again to be sure!',
          art: ['apples', 'balloon', 'star'],
          chips: ['Plus', 'Minus', 'Count again']
        },
        {
          kind: 'demo',
          scene: 'cove',
          kicker: 'Try it!',
          title: 'Put in five stars',
          text: 'Tap the add button and count the stars until there are five.',
          narration: 'Let us count together. Tap add until you see five stars. One, two, three, four, five!',
          demo: 'counters',
          success: 'Five stars! Your counting is spot on.'
        },
        {
          kind: 'start',
          scene: 'cove',
          kicker: 'Quiz time',
          title: 'Ready to count?',
          text: 'Count, compare, and finish the patterns.',
          narration: 'Super counting! Now for the quiz. Count, compare, and find the patterns. Let us go!'
        }
      ],
      questions: {
        '3-4': MATH_CORE,
        '4-5': MATH_MID,
        '5-6': MATH_HIGH
      }
    },

    {
      id: 'language',
      no: 4,
      trail: 'Story Garden',
      name: 'Language',
      english: 'Language',
      tagline: 'Sounds grow into words',
      blurb: 'Letter sounds, words, reading',
      world: 'garden',
      scene: 'garden',
      color: '#8a6fe8',
      deep: '#5f45c4',
      tint: '#f2eefe',
      soft: '#e2d9ff',
      icon: 'subject-language',
      sticker: { name: 'Word Gardener', art: 'subject-language' },
      story: [
        {
          kind: 'story',
          scene: 'garden',
          kicker: 'Language',
          title: 'Every letter has a sound',
          text: 'B says /b/ like ball. A says /a/ like apple. Can you say them with me?',
          narration: 'Welcome to Story Garden! B says buh, like ball. A says ah, like apple. Say it with me! Buh! Ah!',
          art: ['subject-language', 'tree', 'cat'],
          chips: ['Hear', 'Say it', 'Find it']
        },
        {
          kind: 'story',
          scene: 'garden',
          kicker: 'Sandpaper letters',
          title: 'Trace, hear, remember',
          text: 'We trace a letter with two fingers. The hand feels it, the ear hears it, and the eye remembers it.',
          narration: 'Draw a letter in the air with your finger! Feel it, hear it, remember it. You are a letter artist!',
          art: ['subject-language', 'flower', 'cloud'],
          chips: ['Trace', 'Hear', 'Remember']
        },
        {
          kind: 'story',
          scene: 'garden',
          kicker: 'From sounds to words',
          title: 'Blend the sounds',
          text: 'We read from left to right. Put the sounds together: c-a-t makes cat. Every word is a little story.',
          narration: 'Left to right, sound by sound. C, a, t. Cat! You made a word. Hooray!',
          art: ['nest', 'tree', 'butterfly'],
          chips: ['Left to right', 'Blend', 'Read']
        },
        {
          kind: 'demo',
          scene: 'garden',
          kicker: 'Try it!',
          title: 'Tap the letter cards',
          text: 'Tap B, A, and M. Listen to each sound and say it with me.',
          narration: 'Tap the cards B, A, and M. Buh, ah, mmm. Say each sound with me!',
          demo: 'phonics',
          letters: [['B', 'buh'], ['A', 'ah'], ['M', 'mmm']],
          success: 'Buh, ah, mmm. Your ears know three letter sounds.'
        },
        {
          kind: 'demo',
          scene: 'garden',
          kicker: 'Write it!',
          title: 'Trace and say',
          text: 'Start at the green dot. Trace each letter with your finger and say its sound.',
          narration: 'Now let us write! Start at the green dot and trace with your finger. Say the sound as you write. Take your time!',
          demo: 'write',
          success: 'Beautiful writing! Your hand and your ears are learning together.'
        },
        {
          kind: 'start',
          scene: 'garden',
          kicker: 'Quiz time',
          title: 'Ready to read?',
          text: 'Find first sounds, letters, and little words.',
          narration: 'Lovely listening! Now let us play the quiz. Let us go!'
        }
      ],
      questions: {
        '3-4': LANGUAGE_CORE,
        '4-5': LANGUAGE_MID,
        '5-6': LANGUAGE_HIGH
      }
    },

    {
      id: 'culture',
      no: 5,
      trail: 'World Trail',
      name: 'Culture & Science',
      english: 'Culture & Science',
      tagline: 'Our world is amazing',
      blurb: 'Earth, animals, plants',
      world: 'world',
      scene: 'world',
      color: '#3f9d6b',
      deep: '#27794b',
      tint: '#edf9f1',
      soft: '#ccefda',
      icon: 'subject-culture',
      sticker: { name: 'World Wanderer', art: 'subject-culture' },
      story: [
        {
          kind: 'story',
          scene: 'world',
          kicker: 'Culture & Science',
          title: 'A big, beautiful world',
          text: 'A globe shows our Earth. Blue is water. Green and brown are land. Many people, animals, and plants live here.',
          narration: 'Welcome to the World Trail! Spin the globe! Blue is water, green is land. Our Earth is full of life!',
          art: ['globe', 'water-drop', 'tree'],
          chips: ['Earth', 'Water', 'Land']
        },
        {
          kind: 'story',
          scene: 'world',
          kicker: 'Homes for animals',
          title: 'Every animal has a home',
          text: 'Whales live in the ocean. Camels live in the desert. Pandas live in bamboo forests. Frogs live near ponds.',
          narration: 'Where do animals live? Whales splash in the ocean. Camels walk in the desert. Pandas munch bamboo. Frogs hop by ponds!',
          art: ['whale', 'camel', 'panda'],
          chips: ['Ocean', 'Desert', 'Forest']
        },
        {
          kind: 'story',
          scene: 'world',
          kicker: 'Living things grow',
          title: 'Seeds and butterflies change',
          text: 'A seed grows into a sprout, then a flower. A caterpillar becomes a butterfly. Living things grow and change.',
          narration: 'Magic in nature! A seed becomes a sprout, then a flower. A caterpillar becomes a butterfly. Grow, grow, grow!',
          art: ['seed', 'caterpillar', 'butterfly'],
          chips: ['Seed', 'Sprout', 'Butterfly']
        },
        {
          kind: 'demo',
          scene: 'world',
          kicker: 'Try it!',
          title: 'Grow a flower',
          text: 'Plant the seed, give water, then add sunlight.',
          narration: 'Let us grow a flower! Plant the seed. Give it water. Add sunlight. Watch it bloom!',
          demo: 'grow',
          success: 'Your flower bloomed! Plants need water and sunlight to grow.'
        },
        {
          kind: 'start',
          scene: 'world',
          kicker: 'Quiz time',
          title: 'Ready to explore?',
          text: 'Travel the world with Earth, animals, and plants.',
          narration: 'What a journey! Now let us play the quiz. Let us go!'
        }
      ],
      questions: {
        '3-4': CULTURE_CORE,
        '4-5': CULTURE_MID,
        '5-6': CULTURE_HIGH
      }
    }
  ];

  function cloneQuestion(source, bandId, index) {
    var copy = {
      id: 'q-' + bandId + '-' + (index + 1),
      type: source.type,
      prompt: source.prompt,
      options: source.options.map(function (option) {
        return Object.assign({}, option);
      }),
      correct: source.correct,
      explain: source.explain
    };
    if (source.sequence) {
      copy.sequence = source.sequence.map(function (item) {
        return Object.assign({}, item);
      });
    }
    if (source.count) copy.count = Object.assign({}, source.count);
    if (source.word) copy.word = source.word;
    if (source.note) copy.note = source.note;
    if (source.promptArt) copy.promptArt = source.promptArt;
    if (source.sound) copy.sound = source.sound;
    return copy;
  }

  THEMES.forEach(function (theme) {
    Object.keys(theme.questions).forEach(function (bandId) {
      theme.questions[bandId] = theme.questions[bandId].map(function (question, index) {
        var copy = cloneQuestion(question, bandId, index);
        copy.id = theme.id + '-' + bandId + '-' + (index + 1);
        return copy;
      });
    });
  });

  const CURRICULUM = [
    {
      icon: 'subject-practical',
      name: 'Practical Life',
      desc: 'Growing independence, care, and responsibility. Pouring water, washing hands, wiping a table, and keeping a home tidy.'
    },
    {
      icon: 'subject-sensorial',
      name: 'Sensorial',
      desc: 'Training the senses to notice size, shape, color, sound, weight, and texture. Inspired by the Pink Tower and sound bells.'
    },
    {
      icon: 'subject-math',
      name: 'Mathematics',
      desc: 'Meeting numbers through real objects first: counting, comparing, patterns, and simple adding and taking away.'
    },
    {
      icon: 'subject-language',
      name: 'Language',
      desc: 'Building phonics, reading, and writing with letter sounds, tracing, and first three-sound words.'
    },
    {
      icon: 'subject-culture',
      name: 'Culture & Science',
      desc: 'Exploring Earth, habitats, plants, animals, and life cycles while learning to care for the natural world.'
    }
  ];

  const PRAISE = {
    correct: [
      'Great job!',
      'Well done!',
      'Yes! You did it!',
      'Wonderful thinking!',
      'That is right. Great job!',
      'Superstar!'
    ],
    retry: [
      'Good try. Let us look together.',
      'Not this time. You can keep trying.',
      'Almost! Take your time.',
      'That was tricky. Good effort!'
    ],
    finish: [
      'You finished the whole trail. Great job!',
      'All done! I am so proud of you.',
      'You kept trying and you finished. Well done!',
      'Hooray! Wonderful work today.',
      'Superstar! You finished everything!'
    ],
    affirm: [
      'You are kind and you are clever.',
      'You can do hard things when you keep trying.',
      'Mistakes help your brain grow.',
      'Your effort matters more than being perfect.',
      'You are loved just the way you are.'
    ]
  };

  window.AGE_BANDS = AGE_BANDS;
  window.BUDDIES = BUDDIES;
  window.THEMES = THEMES;
  window.CURRICULUM = CURRICULUM;
  window.WRITING = WRITING;
  window.PRAISE = PRAISE;

  window.getBand = function (id) {
    return AGE_BANDS.find(function (band) { return band.id === id; }) || null;
  };
  window.getTheme = function (id) {
    return THEMES.find(function (theme) { return theme.id === id; }) || null;
  };
  window.getDeck = function (themeId, bandId) {
    var theme = window.getTheme(themeId);
    if (!theme) return [];
    return theme.questions[bandId] || theme.questions['3-4'] || [];
  };
  window.getWriting = function (bandId) {
    return WRITING[bandId] || WRITING['3-4'];
  };
  window.getNextTheme = function (id) {
    var index = THEMES.findIndex(function (theme) { return theme.id === id; });
    return THEMES[(index + 1) % THEMES.length];
  };
})();
