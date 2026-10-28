(function () {
  'use strict';

  const view = document.getElementById('view');
  const overlay = document.getElementById('overlay');
  const live = document.getElementById('live');
  const fx = document.getElementById('fx');
  const tabbar = document.getElementById('tabbar');

  const STORAGE_KEY = 'momo-adventure-v1';
  const BAND_IDS = ['3-4', '4-5', '5-6'];
  const TOTAL_TRAILS = THEMES.length;
  const MAX_STARS = THEMES.length * 3;

  let db = loadData();
  let resetTimer = null;
  let speechTimer = null;
  let speechSeq = 0;
  let demo = null;
  let writeTimer = null;

  const state = {
    screen: 'who',
    themeId: null,
    slide: 0,
    quiz: null,
    result: null,
    form: null,
    rewardsBand: null,
    chestOpen: false,
    celebrationDone: false,
    overlayDismiss: false
  };

  Sound.init(db.settings);

  /* ---------- Storage ---------- */

  function defaultData() {
    return {
      version: 1,
      activeId: null,
      players: [],
      settings: { music: true, sfx: true, voice: true }
    };
  }

  function sanitizeName(value) {
    return String(value == null ? '' : value).replace(/\s+/g, ' ').trim().slice(0, 14);
  }

  function validStars(source) {
    const out = {};
    if (!source || typeof source !== 'object') return out;
    THEMES.forEach(function (theme) {
      const value = parseInt(source[theme.id], 10);
      if (value > 0) out[theme.id] = Math.min(3, value);
    });
    return out;
  }

  function validDone(source) {
    const out = {};
    if (!source || typeof source !== 'object') return out;
    THEMES.forEach(function (theme) {
      if (source[theme.id]) out[theme.id] = true;
    });
    return out;
  }

  function normalizePlayer(raw) {
    const source = raw && typeof raw === 'object' ? raw : {};
    const band = getBand(source.band) ? source.band : '3-4';
    const buddy = getBuddy(source.buddy) ? source.buddy : 'momo';
    const player = {
      id: String(source.id || 'p' + Math.random().toString(36).slice(2, 9)),
      name: sanitizeName(source.name) || 'Explorer',
      band: band,
      buddy: buddy,
      sparkles: Math.max(0, parseInt(source.sparkles, 10) || 0),
      bands: {},
      last: null,
      createdAt: source.createdAt || Date.now()
    };
    const bands = source.bands && typeof source.bands === 'object' ? source.bands : {};
    BAND_IDS.forEach(function (bandId) {
      const info = bands[bandId] && typeof bands[bandId] === 'object' ? bands[bandId] : {};
      player.bands[bandId] = {
        stars: validStars(info.stars),
        done: validDone(info.done),
        perfect: validDone(info.perfect)
      };
    });
    const last = source.last;
    if (last && typeof last === 'object' && getTheme(last.themeId)) {
      const mode = last.mode === 'quiz' || last.mode === 'result' ? last.mode : 'story';
      player.last = {
        themeId: last.themeId,
        mode: mode,
        slide: Math.max(0, Math.min(parseInt(last.slide, 10) || 0, 8)),
        index: Math.max(0, parseInt(last.index, 10) || 0),
        score: Math.max(0, parseInt(last.score, 10) || 0),
        streak: Math.max(0, parseInt(last.streak, 10) || 0),
        bestStreak: Math.max(0, parseInt(last.bestStreak, 10) || 0),
        runSparkles: Math.max(0, parseInt(last.runSparkles, 10) || 0),
        answered: !!last.answered
      };
    }
    return player;
  }

  function loadData() {
    const safe = defaultData();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return safe;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return safe;
      if (parsed.settings && typeof parsed.settings === 'object') {
        safe.settings = {
          music: parsed.settings.music !== false,
          sfx: parsed.settings.sfx !== false,
          voice: parsed.settings.voice !== false
        };
      }
      if (Array.isArray(parsed.players)) {
        safe.players = parsed.players.slice(0, 8).map(normalizePlayer);
      }
      safe.activeId = typeof parsed.activeId === 'string' ? parsed.activeId : null;
      if (!safe.players.some(function (player) { return player.id === safe.activeId; })) {
        safe.activeId = safe.players.length ? safe.players[0].id : null;
      }
    } catch (error) {
      return safe;
    }
    return safe;
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (error) {}
  }

  function activePlayer() {
    return db.players.find(function (player) { return player.id === db.activeId; }) || null;
  }

  function ensureBand(player, bandId) {
    if (!player.bands[bandId]) {
      player.bands[bandId] = { stars: {}, done: {}, perfect: {} };
    }
    return player.bands[bandId];
  }

  function bandData(player, bandId) {
    return ensureBand(player, bandId || player.band);
  }

  function getBuddy(id) {
    return BUDDIES.find(function (buddy) { return buddy.id === id; }) || BUDDIES[0];
  }

  function currentBuddy() {
    const player = activePlayer();
    return getBuddy(player ? player.buddy : 'momo');
  }

  /* ---------- Utilities ---------- */

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function plural(count, singular, pluralForm) {
    return count + ' ' + (count === 1 ? singular : (pluralForm || singular + 's'));
  }

  function fillBuddy(text) {
    const buddy = currentBuddy();
    return String(text == null ? '' : text).replace(/\bMomo\b/g, buddy.name);
  }

  function say(text) {
    return esc(fillBuddy(text));
  }

  function themeStyle(theme) {
    return '--c:' + theme.color + ';--deep:' + theme.deep + ';--tint:' + theme.tint + ';--soft:' + theme.soft + ';';
  }

  function buddyStyle(buddy) {
    return '--bc:' + buddy.color + ';--bd:' + buddy.deep + ';--bt:' + buddy.tint + ';';
  }

  function starRow(stars) {
    return [0, 1, 2].map(function (index) {
      return '<span class="mini-star' + (index < stars ? ' is-on' : '') + '">' + Art.star(index < stars) + '</span>';
    }).join('');
  }

  function bandStars(player, bandId) {
    const data = bandData(player, bandId);
    return THEMES.reduce(function (sum, theme) {
      return sum + (data.stars[theme.id] || 0);
    }, 0);
  }

  function bandBadges(player, bandId) {
    const data = bandData(player, bandId);
    return THEMES.filter(function (theme) { return !!data.done[theme.id]; }).length;
  }

  function starsFor(score, total, band) {
    if (!total) return 0;
    const ratio = score / total;
    if (ratio >= band.starCut[0]) return 3;
    if (ratio >= band.starCut[1]) return 2;
    if (ratio >= band.starCut[2]) return 1;
    return 0;
  }

  function setLive(text) {
    live.textContent = String(text || '');
  }

  function scheduleSpeak(text, delay) {
    const token = ++speechSeq;
    clearTimeout(speechTimer);
    speechTimer = setTimeout(function () {
      if (token !== speechSeq) return;
      const spoken = fillBuddy(text);
      if (!Sound.speak(spoken)) setLive(spoken);
    }, delay || 420);
  }

  function pickLine(pool) {
    if (!pool || !pool.length) return '';
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function speakLines(lines, gap) {
    const token = ++speechSeq;
    const queue = lines.filter(Boolean);
    let index = 0;
    const step = function () {
      if (token !== speechSeq || index >= queue.length) return;
      const spoken = fillBuddy(queue[index]);
      index += 1;
      const next = function () {
        if (token !== speechSeq) return;
        setTimeout(step, gap == null ? 160 : gap);
      };
      if (!Sound.speak(spoken, next)) {
        setLive(spoken);
        setTimeout(step, 0);
      }
    };
    step();
  }

  function scheduleLines(lines, delay, gap) {
    clearTimeout(speechTimer);
    speechTimer = setTimeout(function () {
      speakLines(lines, gap);
    }, delay || 420);
  }

  function stopSpeech() {
    speechSeq += 1;
    clearTimeout(speechTimer);
    Sound.stopSpeech();
  }

  function finishSpeech() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      stopSpeech();
    }
  }

  function iconButton(action, icon, label, extraClass) {
    return '<button class="adv-icon-btn ' + (extraClass || '') + '" type="button" data-action="' + action + '" aria-label="' + esc(label) + '">' + Art.icon(icon) + '</button>';
  }

  function showScreen(inner, screenName, vars, tab) {
    finishSpeech();
    if (screenName !== 'story') clearTimeout(writeTimer);
    view.innerHTML = '<div class="screen adv-screen scr-' + screenName + '"' + (vars ? ' style="' + vars + '"' : '') + '>' + inner + '</div>';
    view.scrollTop = 0;
    state.screen = screenName;
    const inTrail = screenName === 'story' || screenName === 'quiz' || screenName === 'result';
    Sound.setScene(inTrail ? state.themeId : null);
    updateTabbar(tab || null);
  }

  function updateTabbar(active) {
    const visible = active === 'map' || active === 'rewards' || active === 'parents';
    tabbar.hidden = !visible;
    ['map', 'rewards', 'parents'].forEach(function (name) {
      const button = document.getElementById('tab-' + name);
      if (!button) return;
      const isActive = name === active;
      button.classList.toggle('is-active', isActive);
      if (isActive) {
        button.setAttribute('aria-current', 'page');
      } else {
        button.removeAttribute('aria-current');
      }
    });
  }

  function hideOverlay() {
    overlay.hidden = true;
    overlay.innerHTML = '';
    state.overlayDismiss = false;
  }

  function renderMapFromOverlay() {
    hideOverlay();
    renderMap();
  }

  /* ---------- Who is playing ---------- */

  function renderWho() {
    if (!db.players.length) {
      state.form = state.form || { name: '', band: '3-4', buddy: 'momo', add: false };
      renderWelcome(false);
      return;
    }
    const active = activePlayer();
    const cards = db.players.map(function (player) {
      const buddy = getBuddy(player.buddy);
      const band = getBand(player.band);
      const stars = bandStars(player, player.band);
      const badges = bandBadges(player, player.band);
      return '<button class="who-card' + (active && active.id === player.id ? ' is-active' : '') + '" type="button" data-action="pick-player" data-id="' + esc(player.id) + '" style="' + buddyStyle(buddy) + '">' +
        '<span class="who-art">' + Art.art(buddy.art) + '</span>' +
        '<span class="who-copy"><strong>' + esc(player.name) + '</strong><small>' + band.label + ' - ' + esc(band.name) + '</small><em>' + plural(badges, 'badge') + ' - ' + plural(stars, 'star') + ' - ' + plural(player.sparkles, 'sparkle') + '</em></span>' +
        '<span class="who-go">' + Art.icon('chevron') + '</span>' +
        '</button>';
    }).join('');

    const inner =
      '<header class="who-head"><span class="who-mascot" aria-hidden="true">' + Art.art('sean') + '</span><span class="who-kicker">Sean Adventure</span><h1>Who is exploring today?</h1><p>Pick your name to keep going.</p></header>' +
      '<div class="who-list">' + cards + '</div>' +
      '<button class="add-card" type="button" data-action="new-player">' + Art.icon('plus') + ' Add a new explorer</button>' +
      (active ? '<button class="link-btn" type="button" data-action="back-to-map">Back to the trail map</button>' : '') +
      '<p class="map-note">Every explorer has their own stars, badges, and sparkle jar.</p>';

    showScreen(inner, 'who', '--c:#ff8163;--deep:#cf4b2b;--tint:#fff7ec;--soft:#ffe9dc;', null);
  }

  function renderWelcome(isAdding) {
    const form = state.form || { name: '', band: '3-4', buddy: 'momo', add: false };
    const buddy = getBuddy(form.buddy);
    const selectedBand = getBand(form.band) || AGE_BANDS[0];
    const hasPlayers = db.players.length > 0;

    const bands = AGE_BANDS.map(function (band) {
      const selected = band.id === selectedBand.id;
      return '<button class="band-option' + (selected ? ' is-selected' : '') + '" type="button" data-action="pick-band" data-id="' + band.id + '" style="--bc:' + band.color + ';--bd:' + band.deep + ';--bt:' + band.tint + ';" aria-pressed="' + selected + '">' +
        '<span class="band-age">' + band.label + '</span>' +
        '<span class="band-name">' + esc(band.name) + '</span>' +
        '<span class="band-blurb">' + esc(band.blurb) + '</span>' +
        '<span class="band-q">' + band.questions + ' questions</span>' +
        (selected ? '<span class="band-check">' + Art.icon('check') + '</span>' : '') +
        '</button>';
    }).join('');

    const buddies = BUDDIES.map(function (item) {
      const selected = item.id === form.buddy;
      return '<button class="buddy-option' + (selected ? ' is-selected' : '') + '" type="button" data-action="pick-buddy" data-id="' + item.id + '" style="' + buddyStyle(item) + '" aria-pressed="' + selected + '">' +
        '<span class="buddy-art">' + Art.art(item.art) + '</span>' +
        '<span class="buddy-name">' + esc(item.name) + '</span>' +
        '</button>';
    }).join('');

    const inner =
      '<header class="welcome-head">' +
        (hasPlayers ? iconButton('back-to-who', 'back', 'Back to explorers', 'welcome-back') : '') +
        '<span class="who-kicker">Sean Adventure</span>' +
        '<h1>Let\'s meet you</h1>' +
        '<p>One name, one buddy, and a whole world to explore.</p>' +
      '</header>' +
      '<section class="welcome-guide">' +
        '<span class="welcome-guide-art">' + Art.art('sean-cute') + '</span>' +
        '<span class="welcome-guide-bubble">Hi, I\'m Sean! I tell the stories and cheer you on.</span>' +
      '</section>' +
      '<section class="buddy-preview" style="' + buddyStyle(buddy) + '">' +
        '<span class="buddy-preview-art">' + Art.art(buddy.art) + '</span>' +
        '<span class="buddy-preview-copy"><span class="preview-label">Your buddy</span><strong>' + esc(buddy.name) + ' the ' + esc(buddy.kind) + '</strong><p>' + esc(buddy.cheer) + '</p></span>' +
      '</section>' +
      '<label class="field">' +
        '<span class="field-label">What is your name?</span>' +
        '<input id="name-input" class="name-input" type="text" maxlength="14" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="Type your name" value="' + esc(form.name) + '">' +
        '<span class="field-hint" id="name-hint">This name stays on this device.</span>' +
      '</label>' +
      '<section class="pick-block">' +
        '<h2>How old are you?</h2>' +
        '<div class="band-grid">' + bands + '</div>' +
      '</section>' +
      '<section class="pick-block">' +
        '<h2>Pick a buddy</h2>' +
        '<div class="buddy-grid">' + buddies + '</div>' +
      '</section>' +
      '<button class="btn btn-primary start-btn" type="button" data-action="create-player">' + Art.icon('play') + (isAdding ? 'Start my adventure' : 'Let\'s go') + '</button>' +
      '<p class="map-note">Your progress saves on this device. You can continue after closing the game.</p>';

    state.form = form;
    showScreen(inner, 'welcome', '--c:' + buddy.color + ';--deep:' + buddy.deep + ';--tint:' + buddy.tint + ';--soft:' + buddy.tint + ';', null);
  }

  function createPlayer() {
    const form = state.form || { name: '', band: '3-4', buddy: 'momo' };
    const name = sanitizeName(form.name);
    const input = document.getElementById('name-input');
    const hint = document.getElementById('name-hint');
    if (!name) {
      if (input) {
        input.classList.add('is-error');
        input.focus();
      }
      if (hint) hint.textContent = 'Please type a name first.';
      setLive('Please type a name first.');
      return;
    }
    const player = normalizePlayer({
      name: name,
      band: form.band,
      buddy: form.buddy,
      sparkles: 0,
      bands: {},
      last: null
    });
    db.players.push(player);
    db.activeId = player.id;
    state.form = null;
    saveData();
    Sound.star();
    setLive('Welcome, ' + name + '. Your adventure starts now.');
    renderMap();
  }

  /* ---------- Adventure map ---------- */

  function suggestedTheme(player) {
    const data = bandData(player, player.band);
    return THEMES.find(function (theme) { return !data.done[theme.id]; }) || THEMES[0];
  }

  function continueInfo(player) {
    const last = player.last;
    if (!last || !last.themeId) return null;
    const theme = getTheme(last.themeId);
    if (!theme) return null;
    if (last.mode === 'story') {
      const slide = Math.min(last.slide || 0, theme.story.length - 1);
      return {
        action: 'continue-last',
        kicker: 'Continue your story',
        title: theme.trail,
        detail: 'Chapter ' + (slide + 1) + ' of ' + theme.story.length
      };
    }
    if (last.mode === 'quiz') {
      const deck = getDeck(theme.id, player.band);
      let index = last.index || 0;
      if (last.answered) index += 1;
      index = Math.min(index + 1, deck.length);
      return {
        action: 'continue-last',
        kicker: 'Continue your quiz',
        title: theme.trail,
        detail: 'Question ' + index + ' of ' + deck.length
      };
    }
    if (last.mode === 'result') {
      return {
        action: 'continue-last',
        kicker: 'Your reward is waiting',
        title: theme.trail,
        detail: 'See your stars and open the chest'
      };
    }
    return null;
  }

  function renderMap() {
    const player = activePlayer();
    if (!player) {
      renderWho();
      return;
    }
    const band = getBand(player.band) || AGE_BANDS[0];
    const buddy = getBuddy(player.buddy);
    const data = bandData(player, player.band);
    const stars = bandStars(player, player.band);
    const badges = bandBadges(player, player.band);
    const doneCount = THEMES.filter(function (theme) { return data.done[theme.id]; }).length;
    const info = continueInfo(player);
    const suggestion = suggestedTheme(player);
    const currentId = player.last ? player.last.themeId : suggestion.id;
    const allDone = doneCount === TOTAL_TRAILS;
    const nextTheme = (info && getTheme(player.last.themeId)) || suggestion;

    const rail = THEMES.map(function (theme) {
      const done = !!data.done[theme.id];
      const current = currentId === theme.id;
      return '<span class="map-seg' + (done ? ' is-done' : '') + (current ? ' is-current' : '') + '" style="' + themeStyle(theme) + '"></span>';
    }).join('');

    const continueCard = info
      ? '<button class="continue-card" type="button" data-action="' + info.action + '" style="' + themeStyle(nextTheme) + '">' +
          '<span class="continue-art" aria-hidden="true">' + Art.art(nextTheme.icon) + '</span>' +
          '<span class="continue-copy"><span class="continue-kicker">' + esc(info.kicker) + '</span><strong>' + esc(info.title) + '</strong><small>' + esc(info.detail) + '</small></span>' +
          '<span class="continue-go" aria-hidden="true">' + Art.icon('chevron') + '</span>' +
        '</button>'
      : '<button class="continue-card start-card" type="button" data-action="open-theme" data-id="' + suggestion.id + '" style="' + themeStyle(suggestion) + '">' +
          '<span class="continue-art" aria-hidden="true">' + Art.art(suggestion.icon) + '</span>' +
          '<span class="continue-copy"><span class="continue-kicker">' + (allDone ? 'All trails complete' : 'Start here') + '</span><strong>Start ' + esc(suggestion.trail) + '</strong><small>' + (allDone ? 'Replay a trail to earn more stars.' : 'Story first, then a fun quiz.') + '</small></span>' +
          '<span class="continue-go" aria-hidden="true">' + Art.icon('chevron') + '</span>' +
        '</button>';

    const stops = THEMES.map(function (theme, index) {
      const themeStars = data.stars[theme.id] || 0;
      const done = !!data.done[theme.id];
      const perfect = !!data.perfect[theme.id];
      const current = currentId === theme.id;
      const label = 'Trail ' + (index + 1) + ': ' + theme.trail + ', ' + theme.name + ', ' + themeStars + ' of 3 stars' + (perfect ? ', perfect' : done ? ', badge earned' : '') + '.';
      return '<li class="trail-stop' + (done ? ' is-done' : '') + (current ? ' is-current' : '') + '" style="' + themeStyle(theme) + '">' +
        '<button class="stop-btn" type="button" data-action="open-theme" data-id="' + theme.id + '" aria-label="' + esc(label) + '">' +
          '<span class="stop-num" aria-hidden="true">' + (index + 1) + '</span>' +
          '<span class="stop-art" aria-hidden="true">' + Art.art(theme.icon) + '</span>' +
          '<span class="stop-copy">' +
            '<span class="stop-kicker">' + esc(theme.name) + '</span>' +
            '<span class="stop-name">' + esc(theme.trail) + '</span>' +
            '<span class="stop-stars" aria-hidden="true">' + starRow(themeStars) + '<span class="stop-score">' + themeStars + ' of 3</span></span>' +
          '</span>' +
          '<span class="stop-side" aria-hidden="true">' + (perfect ? '<span class="perfect-flag">Perfect</span>' : done ? '<span class="done-flag">' + Art.icon('check') + '</span>' : Art.icon('chevron')) + '</span>' +
        '</button>' +
      '</li>';
    }).join('');

    const inner =
      '<header class="map-head">' +
        '<button class="profile-chip" type="button" data-action="switch-player" style="' + buddyStyle(buddy) + '" aria-label="Switch explorer. Playing as ' + esc(player.name) + ', ' + esc(band.label) + ' ' + esc(band.name) + '.">' +
          '<span class="profile-art">' + Art.art(buddy.art) + '</span>' +
          '<span class="profile-copy"><strong>' + esc(player.name) + '</strong><small>' + band.label + ' - ' + esc(band.name) + '</small></span>' +
          '<span class="profile-swap">Switch' + Art.icon('chevron') + '</span>' +
        '</button>' +
      '</header>' +
      '<section class="map-hero">' +
        '<div class="map-hero-copy"><h1>Hi, ' + esc(player.name) + '!</h1><p>Pick a trail and let\'s learn together.</p></div>' +
        '<div class="map-buddy" aria-hidden="true">' + Art.art(buddy.art) + '</div>' +
        '<div class="map-progress">' +
          '<div class="map-rail" role="progressbar" aria-label="Badges earned" aria-valuemin="0" aria-valuemax="' + TOTAL_TRAILS + '" aria-valuenow="' + badges + '" aria-valuetext="' + badges + ' of ' + TOTAL_TRAILS + ' badges earned">' + rail + '</div>' +
          '<div class="map-progress-meta">' +
            '<span class="map-meta">' + Art.icon('shield') + '<strong>' + badges + '</strong> of ' + TOTAL_TRAILS + ' badges</span>' +
            '<span class="map-meta">' + Art.star(true) + '<strong>' + stars + '</strong> of ' + MAX_STARS + ' stars</span>' +
            '<span class="map-meta">' + Art.icon('sparkle', 'map-spark') + '<strong>' + player.sparkles + '</strong> sparkles</span>' +
          '</div>' +
        '</div>' +
      '</section>' +
      continueCard +
      '<section class="trail-section">' +
        '<div class="trail-head"><h2>Your trails</h2></div>' +
        '<ol class="trail-list">' + stops + '</ol>' +
      '</section>' +
      '<p class="map-note">Finish a trail quiz to earn its badge. Every right answer fills your sparkle jar.</p>';

    showScreen(inner, 'map', '--c:' + band.color + ';--deep:' + band.deep + ';--tint:' + band.tint + ';--soft:' + band.soft + ';', 'map');
  }

  /* ---------- Scenes ---------- */

  function sceneHTML(scene, items) {
    const photo = Art.photo(scene);
    const art = (items || []).map(function (key, index) {
      return '<span class="scene-item si-' + index + '">' + Art.art(key) + '</span>';
    }).join('');
    return '<div class="scene scene-' + scene + (photo ? ' has-photo' : '') + '">' +
      (photo ? '<span class="scene-photo" style="background-image:url(' + photo + ')"></span><span class="scene-shade"></span>' : '') +
      '<span class="scene-sun"></span>' +
      '<span class="scene-cloud sc-a"></span>' +
      '<span class="scene-cloud sc-b"></span>' +
      '<span class="scene-hill hill-a"></span>' +
      '<span class="scene-hill hill-b"></span>' +
      '<span class="scene-ground"></span>' +
      (art ? '<div class="scene-items">' + art + '</div>' : '') +
    '</div>';
  }

  /* ---------- Story ---------- */

  function openTheme(themeId, options) {
    const theme = getTheme(themeId);
    const player = activePlayer();
    if (!theme || !player) {
      renderMap();
      return;
    }
    state.themeId = themeId;
    state.slide = Math.max(0, Math.min((options && options.slide) || 0, theme.story.length - 1));
    state.quiz = null;
    state.result = null;
    state.chestOpen = false;
    demo = null;
    player.last = { themeId: themeId, mode: 'story', slide: state.slide };
    saveData();
    renderStory(false);
  }

  function currentStorySlide() {
    const theme = getTheme(state.themeId);
    return theme ? theme.story[state.slide] : null;
  }

  function freshDemo() {
    return { step: 0, count: 0, heard: {}, letters: [], grow: 0, write: 0, writeTries: 0, done: false };
  }

  function currentBand() {
    const player = activePlayer();
    return getBand(player ? player.band : '3-4') || AGE_BANDS[0];
  }

  function writingData() {
    return getWriting(currentBand().id);
  }

  function writingSpeech(item) {
    return item ? item.say || item.prompt : '';
  }

  function demoHint(kind) {
    if (kind === 'pour') return 'Tap Pour three times.';
    if (kind === 'counters') return 'Count the counters up to five.';
    if (kind === 'tones') return 'Tap both sound boxes.';
    if (kind === 'phonics') return 'Tap all three letters.';
    if (kind === 'grow') return 'Follow the three steps.';
    if (kind === 'write') return writingData().hint + ' Use a finger or the mouse.';
    return 'Tap to try it!';
  }

  function demoInner(slide) {
    const data = demo || freshDemo();
    const done = data.done;
    let body = '<div class="demo-head"><span class="demo-kicker">' + esc(slide.kicker) + '</span><strong>' + esc(slide.title) + '</strong></div>';

    if (slide.demo === 'pour') {
      body += '<div class="pour-stage">' +
        '<span class="pour-jug' + (data.step > 0 && !done ? ' is-tilt' : '') + '">' + Art.art('pitcher') + '</span>' +
      '</div>' +
      '<div class="pour-drops">' + [0, 1, 2].map(function (index) {
        return '<span class="pour-drop' + (index < data.step ? ' is-on' : '') + '">' + Art.art('water-drop') + '</span>';
      }).join('') + '</div>' +
      '<div class="demo-row">' +
        '<button class="demo-btn" type="button" data-action="demo-pour"' + (done ? ' disabled' : '') + '>' + Art.icon('plus') + ' Pour</button>' +
        '<span class="demo-progress">' + Math.min(data.step, 3) + ' / 3</span>' +
      '</div>';
    } else if (slide.demo === 'counters') {
      body += '<div class="counter-board">' + [0, 1, 2, 3, 4].map(function (index) {
        return '<span class="counter-slot' + (index < data.count ? ' is-on' : '') + '">' + (index < data.count ? Art.art('star') : '') + '</span>';
      }).join('') + '</div>' +
      '<div class="demo-row">' +
        '<button class="demo-btn" type="button" data-action="demo-counter"' + (done ? ' disabled' : '') + '>' + Art.icon('plus') + ' Add a counter</button>' +
        '<span class="demo-progress">' + data.count + ' / 5</span>' +
      '</div>';
    } else if (slide.demo === 'tones') {
      body += '<div class="tone-row">' +
        '<button class="tone-box is-high' + (data.heard.high ? ' is-heard' : '') + '" type="button" data-action="demo-tone" data-tone="high"' + (done ? ' disabled' : '') + '>' +
          '<span class="tone-art">' + Art.art('bell') + '</span><span>High</span>' + (data.heard.high ? '<span class="tone-check">' + Art.icon('check') + '</span>' : '') +
        '</button>' +
        '<button class="tone-box is-low' + (data.heard.low ? ' is-heard' : '') + '" type="button" data-action="demo-tone" data-tone="low"' + (done ? ' disabled' : '') + '>' +
          '<span class="tone-art is-low">' + Art.art('bell') + '</span><span>Low</span>' + (data.heard.low ? '<span class="tone-check">' + Art.icon('check') + '</span>' : '') +
        '</button>' +
      '</div>';
    } else if (slide.demo === 'phonics') {
      body += '<div class="letter-row">' + [['B', 'buh'], ['A', 'ah'], ['M', 'mmm']].map(function (pair) {
        const heard = data.letters.indexOf(pair[0]) >= 0;
        return '<button class="phonics-card' + (heard ? ' is-heard' : '') + '" type="button" data-action="demo-letter" data-letter="' + pair[0] + '">' +
          '<span class="phonics-letter">' + pair[0] + '</span><small>' + pair[1] + '</small>' + (heard ? '<span class="tone-check">' + Art.icon('check') + '</span>' : '') +
        '</button>';
      }).join('') + '</div>';
    } else if (slide.demo === 'write') {
      const writing = writingData();
      const index = Math.min(data.write || 0, writing.items.length - 1);
      const item = writing.items[index];
      if (done) {
        body += '<div class="write-done">' + writing.items.map(function (entry) {
          return '<span class="write-done-chip">' + esc(entry.text) + Art.icon('check') + '</span>';
        }).join('') + '</div>';
      } else {
        body += '<div class="write-wrap">' +
          '<div class="write-paper" data-write-paper>' +
            '<canvas class="write-ink" data-write-canvas aria-label="Trace ' + esc(item.name) + ' here"></canvas>' +
            '<span class="write-start" data-write-start aria-hidden="true"></span>' +
            '<span class="write-stamp" aria-hidden="true">' + Art.icon('check') + '</span>' +
          '</div>' +
          '<div class="write-meter"><span data-write-meter></span></div>' +
        '</div>' +
        '<p class="write-prompt">' + esc(item.prompt) + '</p>' +
        '<div class="demo-row write-row">' +
          '<button class="demo-btn is-ghost" type="button" data-action="demo-write-clear">Clear</button>' +
          '<button class="demo-btn is-ghost" type="button" data-action="demo-write-hear">' + Art.icon('speaker') + ' Hear</button>' +
          '<span class="demo-progress">' + (index + 1) + ' / ' + writing.items.length + '</span>' +
        '</div>';
      }
    } else if (slide.demo === 'grow') {
      const stageArt = data.grow >= 3 ? 'flower' : data.grow >= 1 ? 'sprout' : 'seed';
      const steps = ['Plant', 'Water', 'Sun'];
      body += '<div class="grow-stage">' + Art.art(stageArt) + '</div>' +
        '<div class="grow-steps">' + steps.map(function (label, index) {
          const isDone = data.grow > index;
          const enabled = !done && data.grow === index;
          return '<button class="step-chip' + (isDone ? ' is-done' : '') + '" type="button" data-action="demo-grow" data-step="' + index + '"' + (enabled ? '' : ' disabled') + '>' +
            (isDone ? Art.icon('check') : '') + label + '</button>';
        }).join('') + '</div>';
    }

    return body +
      '<div class="demo-foot">' +
        (done
          ? '<span class="demo-success">' + Art.icon('check') + ' ' + say(slide.success) + '</span>'
          : '<span class="demo-hint">' + esc(demoHint(slide.demo)) + '</span>') +
      '</div>';
  }

  function completeDemo() {
    if (!demo || demo.done) return;
    demo.done = true;
    Sound.star();
    refreshDemo();
    const slide = currentStorySlide();
    if (slide) {
      scheduleSpeak(slide.success, 260);
      setLive(slide.success);
    }
  }

  function refreshDemo() {
    const panel = document.getElementById('demo-panel');
    const slide = currentStorySlide();
    if (!panel || !slide) return;
    panel.classList.toggle('is-done', !!(demo && demo.done));
    panel.innerHTML = demoInner(slide);
    const avatar = view.querySelector('.guide-avatar');
    if (avatar) {
      const expr = demo && demo.done ? 'sean-happy' : slide.demo === 'pour' ? 'sean-pouring' : 'sean-speaking';
      const name = avatar.querySelector('.guide-name');
      avatar.innerHTML = Art.art(expr) + (name ? name.outerHTML : '<span class="guide-name">Sean</span>');
    }
    attachWriteDemo();
    syncStoryNext();
  }

  function nextButtonLabel(theme) {
    const slide = theme.story[state.slide];
    if (state.slide === theme.story.length - 1) return 'Start quiz';
    if (slide.kind === 'demo' && !(demo && demo.done)) return 'Finish the activity';
    return 'Next';
  }

  function syncStoryNext() {
    const theme = getTheme(state.themeId);
    const button = view.querySelector('[data-action="story-next"]');
    if (!theme || !button) return;
    const slide = theme.story[state.slide];
    const locked = slide.kind === 'demo' && !(demo && demo.done);
    button.disabled = locked;
    button.innerHTML = (locked ? '' : Art.icon('chevron')) + nextButtonLabel(theme);
  }

  function storyStage(theme, slide) {
    if (slide.kind === 'demo') {
      if (!demo) demo = freshDemo();
      return '<div class="story-stage has-demo">' + sceneHTML(slide.scene, []) +
        '<div class="demo-panel" id="demo-panel">' + demoInner(slide) + '</div></div>';
    }
    if (slide.kind === 'start') {
      return '<div class="story-stage">' + sceneHTML(slide.scene, []) +
        '<div class="scene-showcase"><span class="showcase-ring">' + Art.art(theme.sticker.art) + '</span><span class="showcase-label">' + esc(theme.sticker.name) + '</span><span class="showcase-sub">Trail badge</span></div></div>';
    }
    return '<div class="story-stage">' + sceneHTML(slide.scene, slide.art) + '</div>';
  }

  function renderStory(silent) {
    const theme = getTheme(state.themeId);
    const player = activePlayer();
    if (!theme || !player) {
      renderMap();
      return;
    }
    clearTimeout(writeTimer);
    const slide = theme.story[state.slide];
    if (!slide) {
      startQuiz(theme.id);
      return;
    }
    if (slide.kind !== 'demo') demo = null;
    if (slide.kind === 'demo' && !demo) demo = freshDemo();

    const buddy = getBuddy(player.buddy);
    const isLast = state.slide === theme.story.length - 1;
    const locked = slide.kind === 'demo' && !(demo && demo.done);
    const progress = ((state.slide + 1) / theme.story.length) * 100;
    const guideArt = slide.kind === 'demo'
      ? (demo && demo.done ? 'sean-happy' : slide.demo === 'pour' ? 'sean-pouring' : 'sean-speaking')
      : (state.slide === 0 ? 'sean-cute' : 'sean-speaking');
    const speech = slide.kind === 'demo' && demo && demo.done ? slide.success : slide.narration;
    const chips = (slide.chips || []).map(function (chip) {
      return '<span class="story-chip">' + esc(chip) + '</span>';
    }).join('');

    const inner =
      '<header class="story-head">' +
        iconButton('story-map', 'home', 'Back to map') +
        '<span class="story-head-copy"><span class="story-kicker">' + esc(theme.trail) + '</span><strong>' + esc(theme.name) + '</strong></span>' +
        '<span class="story-step">' + (state.slide + 1) + '/' + theme.story.length + '</span>' +
      '</header>' +
      '<div class="story-progress" role="progressbar" aria-valuemin="0" aria-valuemax="' + theme.story.length + '" aria-valuenow="' + (state.slide + 1) + '"><span style="width:' + progress.toFixed(1) + '%"></span></div>' +
      storyStage(theme, slide) +
      '<section class="story-sheet">' +
        '<span class="sheet-kicker">' + esc(slide.kicker) + '</span>' +
        '<h1 class="sheet-title">' + esc(slide.title) + '</h1>' +
        '<p class="sheet-text">' + esc(fillBuddy(slide.text)) + '</p>' +
        (chips ? '<div class="story-chips">' + chips + '</div>' : '') +
      '</section>' +
      '<div class="guide-row">' +
        '<span class="guide-avatar" style="' + buddyStyle(buddy) + '">' + Art.art(guideArt) + '<span class="guide-name">Sean</span></span>' +
        '<div class="guide-bubble"><p>' + say(speech) + '</p><button class="guide-speak" type="button" data-action="replay-narration" aria-label="Hear it again">' + Art.icon('speaker') + '</button></div>' +
      '</div>' +
      '<footer class="story-foot">' +
        '<button class="adv-icon-btn story-back" type="button" data-action="story-back" aria-label="' + (state.slide === 0 ? 'Back to map' : 'Previous chapter') + '">' + Art.icon('back') + '</button>' +
        '<button class="btn btn-primary story-next" type="button" data-action="story-next"' + (locked ? ' disabled' : '') + '>' +
          (locked ? '' : Art.icon(isLast ? 'play' : 'chevron')) + nextButtonLabel(theme) +
        '</button>' +
      '</footer>';

    state.themeId = theme.id;
    player.last = { themeId: theme.id, mode: 'story', slide: state.slide };
    saveData();
    showScreen(inner, 'story', themeStyle(theme), null);
    if (slide.kind === 'demo') {
      const screenEl = view.querySelector('.screen');
      if (screenEl) screenEl.classList.add('is-demo');
      attachWriteDemo();
    }
    if (!silent) scheduleSpeak(speech, 520);
    setLive(slide.title + '. ' + slide.text);
  }

  function nextStory() {
    const theme = getTheme(state.themeId);
    if (!theme) return;
    const slide = theme.story[state.slide];
    if (slide.kind === 'demo' && !(demo && demo.done)) return;
    if (state.slide < theme.story.length - 1) {
      state.slide += 1;
      demo = null;
      Sound.tap();
      renderStory(false);
    } else {
      startQuiz(theme.id);
    }
  }

  function previousStory() {
    const theme = getTheme(state.themeId);
    if (!theme) return;
    if (state.slide > 0) {
      state.slide -= 1;
      demo = null;
      Sound.tap();
      renderStory(false);
    } else {
      Sound.tap();
      renderMap();
    }
  }

  /* ---------- Quiz ---------- */

  function saveLastQuiz() {
    const player = activePlayer();
    const quiz = state.quiz;
    if (!player || !quiz) return;
    player.last = {
      themeId: quiz.themeId,
      mode: 'quiz',
      index: quiz.index,
      score: quiz.score,
      streak: quiz.streak,
      bestStreak: quiz.bestStreak,
      runSparkles: quiz.runSparkles,
      answered: quiz.answered
    };
    saveData();
  }

  function startQuiz(themeId, resume) {
    const theme = getTheme(themeId);
    const player = activePlayer();
    if (!theme || !player) {
      renderMap();
      return;
    }
    const deck = getDeck(themeId, player.band);
    state.themeId = themeId;
    state.quiz = {
      themeId: themeId,
      bandId: player.band,
      deck: deck,
      index: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      runSparkles: 0,
      answered: false,
      lastPick: null,
      lastCorrect: null,
      perfectBonus: 0
    };
    if (resume) {
      state.quiz.index = Math.max(0, Math.min(resume.index || 0, deck.length - 1));
      state.quiz.score = Math.max(0, resume.score || 0);
      state.quiz.streak = Math.max(0, resume.streak || 0);
      state.quiz.bestStreak = Math.max(state.quiz.streak, resume.bestStreak || 0);
      state.quiz.runSparkles = Math.max(0, resume.runSparkles || 0);
    }
    state.result = null;
    state.chestOpen = false;
    state.celebrationDone = false;
    saveLastQuiz();
    renderQuiz();
  }

  function currentQuestion() {
    return state.quiz ? state.quiz.deck[state.quiz.index] : null;
  }

  function countBoardHTML(question) {
    let items = '';
    for (let i = 0; i < question.count.n; i++) {
      items += '<span class="count-item" style="animation-delay:' + (i * 0.05).toFixed(2) + 's">' + Art.art(question.count.art) + '</span>';
    }
    return '<div class="count-board">' + items + '</div>';
  }

  function sequenceHTML(question) {
    return '<div class="seq-row">' + question.sequence.map(function (item) {
      if (item.art) return '<span class="seq-item seq-art">' + Art.art(item.art) + '</span>';
      return '<span class="seq-item seq-text' + (item.text === '?' ? ' is-question' : '') + '">' + esc(item.text) + '</span>';
    }).join('') + '</div>';
  }

  function questionVisual(question) {
    let html = '';
    if (question.type === 'count' && question.count) {
      html += countBoardHTML(question);
    }
    if (question.sequence) {
      html += sequenceHTML(question);
    }
    if (question.promptArt) {
      html += '<div class="prompt-art">' + Art.art(question.promptArt) + '</div>';
    }
    if (question.word) {
      html += '<div class="word-card"><span class="word-text">' + esc(question.word) + '</span>' + (question.note ? '<span class="word-note">' + esc(question.note) + '</span>' : '') + '</div>';
    }
    if (question.type === 'sound') {
      html += '<button class="q-play" type="button" data-action="play-tone">' + Art.icon('play') + ' Play the sound</button>';
    }
    return html ? '<div class="q-visual">' + html + '</div>' : '';
  }

  function optionInner(question, option) {
    if (question.type === 'image' || question.type === 'sound') {
      return '<span class="opt-art">' + Art.art(option.art) + '</span><span class="opt-label">' + esc(option.label) + '</span>';
    }
    if (question.type === 'compare') {
      let groups = '';
      const shown = Math.min(option.n || 1, 5);
      for (let i = 0; i < shown; i++) groups += Art.art(option.art);
      return '<span class="opt-group">' + groups + '</span><span class="opt-label">' + esc(option.label) + '</span>';
    }
    if (question.type === 'word') {
      return '<span class="opt-word">' + esc(option.word || option.label) + '</span>';
    }
    if (question.type === 'letter') {
      return '<span class="opt-letter">' + esc(option.label) + '</span>';
    }
    if (question.type === 'pattern' && option.art) {
      return '<span class="opt-art">' + Art.art(option.art) + '</span><span class="opt-label">' + esc(option.label) + '</span>';
    }
    return '<span class="opt-num">' + esc(option.label) + '</span>';
  }

  function renderQuiz() {
    const theme = getTheme(state.themeId);
    const player = activePlayer();
    const quiz = state.quiz;
    if (!theme || !player || !quiz) {
      renderMap();
      return;
    }
    if (quiz.index >= quiz.deck.length) {
      finishQuiz();
      return;
    }
    const question = quiz.deck[quiz.index];
    const total = quiz.deck.length;
    const progress = ((quiz.index + 1) / total) * 100;
    const streakChip = quiz.streak >= 2 ? '<span class="quiz-streak">' + quiz.streak + ' in a row</span>' : '';

    const options = question.options.map(function (option) {
      return '<button class="opt" type="button" data-action="answer" data-id="' + esc(option.id) + '">' + optionInner(question, option) + '</button>';
    }).join('');
    const photo = Art.photo(theme.scene);

    const inner =
      (photo ? '<span class="theme-photo scene-' + theme.scene + '" aria-hidden="true" style="background-image:url(' + photo + ')"></span>' : '') +
      '<header class="quiz-head">' +
        iconButton('quiz-exit', 'back', 'Leave quiz') +
        '<span class="quiz-head-copy"><span class="quiz-kicker">' + esc(theme.trail) + '</span><strong>Question ' + (quiz.index + 1) + ' of ' + total + '</strong></span>' +
        '<span class="quiz-spark" aria-label="' + quiz.runSparkles + ' sparkles this quiz">' + Art.icon('sparkle') + quiz.runSparkles + '</span>' +
      '</header>' +
      '<div class="quiz-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + (quiz.index + 1) + '"><span style="width:' + progress.toFixed(1) + '%"></span></div>' +
      '<div class="quiz-meta"><span>' + esc(player.band) + ' yrs - ' + esc(getBand(player.band).name) + '</span><span class="quiz-meta-right">' + streakChip + '<button class="mini-speak" type="button" data-action="replay-question" aria-label="Hear the question">' + Art.icon('speaker') + '</button></span></div>' +
      '<section class="q-card">' +
        '<span class="q-kicker">' + esc(theme.name) + '</span>' +
        '<h1 class="q-prompt">' + say(question.prompt) + '</h1>' +
        questionVisual(question) +
      '</section>' +
      '<div class="options">' + options + '</div>' +
      '<p class="quiz-note">Tap one answer. There is no rush.</p>';

    showScreen(inner, 'quiz', themeStyle(theme), null);
    scheduleSpeak(question.prompt, 480);
    setLive('Question ' + (quiz.index + 1) + ' of ' + total + '. ' + question.prompt);
  }

  function answer(optionId) {
    const quiz = state.quiz;
    const player = activePlayer();
    if (!quiz || !player || quiz.answered) return;
    const question = currentQuestion();
    if (!question) return;
    quiz.answered = true;
    quiz.lastPick = optionId;
    const correct = optionId === question.correct;
    quiz.lastCorrect = correct;
    let gain = 0;
    let bonus = false;

    const buttons = view.querySelectorAll('.opt');
    buttons.forEach(function (button) {
      button.disabled = true;
      if (button.dataset.id === question.correct) button.classList.add('is-correct');
      if (button.dataset.id === optionId && !correct) button.classList.add('is-wrong');
    });

    if (correct) {
      quiz.score += 1;
      quiz.streak += 1;
      quiz.bestStreak = Math.max(quiz.bestStreak, quiz.streak);
      gain = 1;
      if (quiz.streak % 3 === 0) {
        gain = 3;
        bonus = true;
      }
      quiz.runSparkles += gain;
      player.sparkles += gain;
      Sound.correct();
    } else {
      quiz.streak = 0;
      Sound.wrong();
    }

    saveLastQuiz();
    showFeedback(question, correct, gain, bonus);
  }

  function showFeedback(question, correct, gain, bonus) {
    const quiz = state.quiz;
    const theme = getTheme(state.themeId);
    if (!quiz || !theme) return;
    const isLast = quiz.index + 1 >= quiz.deck.length;
    overlay.innerHTML =
      '<div class="feedback-sheet ' + (correct ? 'is-correct' : 'is-wrong') + '" role="dialog" aria-modal="true" aria-label="' + (correct ? 'Correct answer' : 'Try again') + '" style="' + themeStyle(theme) + '">' +
        '<div class="feedback-top">' +
          '<span class="fb-face ' + (correct ? 'is-good' : 'is-oops') + '">' + Art.art(correct ? 'sean-happy' : 'sean-confused') + '</span>' +
          '<div class="fb-copy"><span class="fb-kicker">' + (correct ? 'Great job' : 'Almost there') + '</span><h2>' + (correct ? 'That is right!' : 'Not quite.') + '</h2></div>' +
        '</div>' +
        '<div class="fb-explain-row"><p class="fb-explain">' + say(question.explain) + '</p>' +
          '<button class="mini-speak fb-hear" type="button" data-action="replay-explain" aria-label="Hear the explanation again">' + Art.icon('speaker') + '</button>' +
        '</div>' +
        (gain ? '<div class="fb-reward">' + Art.icon('sparkle') + ' +' + gain + ' sparkle' + (gain > 1 ? 's' : '') + (bonus ? '<span class="fb-bonus">3 in a row!</span>' : '') + '</div>' : '') +
        '<button class="btn btn-primary" type="button" data-action="next-question">' + (isLast ? 'See results' : 'Next question') + Art.icon('chevron') + '</button>' +
      '</div>';
    overlay.hidden = false;
    state.overlayDismiss = false;
    scheduleLines([pickLine(correct ? PRAISE.correct : PRAISE.retry), question.explain], 320, 200);
    setTimeout(function () {
      const button = overlay.querySelector('[data-action="next-question"]');
      if (button) button.focus({ preventScroll: true });
    }, 140);
  }

  function nextQuestion() {
    const quiz = state.quiz;
    if (!quiz) return;
    hideOverlay();
    if (quiz.index + 1 >= quiz.deck.length) {
      finishQuiz();
      return;
    }
    quiz.index += 1;
    quiz.answered = false;
    quiz.lastPick = null;
    quiz.lastCorrect = null;
    saveLastQuiz();
    Sound.tap();
    renderQuiz();
  }

  function finishQuiz() {
    const quiz = state.quiz;
    const player = activePlayer();
    const theme = getTheme(state.themeId);
    if (!quiz || !player || !theme) {
      renderMap();
      return;
    }
    const band = getBand(player.band) || AGE_BANDS[0];
    const data = bandData(player, player.band);
    const previousStars = data.stars[theme.id] || 0;
    const wasDone = !!data.done[theme.id];
    const stars = starsFor(quiz.score, quiz.deck.length, band);
    const perfect = quiz.score === quiz.deck.length;

    data.stars[theme.id] = Math.max(previousStars, stars);
    if (stars > 0) data.done[theme.id] = true;
    if (perfect && !data.perfect[theme.id]) {
      data.perfect[theme.id] = true;
      player.sparkles += 5;
      quiz.runSparkles += 5;
      quiz.perfectBonus = 5;
    } else {
      quiz.perfectBonus = 0;
    }

    player.last = { themeId: theme.id, mode: 'result', score: quiz.score, stars: stars, runSparkles: quiz.runSparkles, bestStreak: quiz.bestStreak };
    state.result = {
      themeId: theme.id,
      score: quiz.score,
      total: quiz.deck.length,
      stars: stars,
      perfect: perfect,
      perfectBonus: quiz.perfectBonus,
      runSparkles: quiz.runSparkles,
      bestStreak: quiz.bestStreak,
      freshBadge: !wasDone && stars > 0
    };
    state.chestOpen = false;
    state.celebrationDone = false;
    saveData();
    renderResult(false);
  }

  function resumeLast() {
    const player = activePlayer();
    if (!player || !player.last) {
      renderMap();
      return;
    }
    const last = player.last;
    if (last.mode === 'story') {
      openTheme(last.themeId, { slide: last.slide || 0 });
      return;
    }
    if (last.mode === 'quiz') {
      const theme = getTheme(last.themeId);
      if (!theme) {
        renderMap();
        return;
      }
      const deck = getDeck(theme.id, player.band);
      let index = last.index || 0;
      if (last.answered) index += 1;
      if (index >= deck.length) {
        state.themeId = theme.id;
        state.quiz = {
          themeId: theme.id,
          bandId: player.band,
          deck: deck,
          index: deck.length - 1,
          score: last.score || 0,
          streak: last.streak || 0,
          bestStreak: last.bestStreak || 0,
          runSparkles: last.runSparkles || 0,
          answered: true
        };
        finishQuiz();
        return;
      }
      startQuiz(theme.id, {
        index: index,
        score: last.score,
        streak: last.streak,
        bestStreak: last.bestStreak,
        runSparkles: last.runSparkles
      });
      return;
    }
    if (last.mode === 'result') {
      const theme = getTheme(last.themeId);
      if (!theme) {
        renderMap();
        return;
      }
      state.themeId = theme.id;
      state.quiz = {
        themeId: theme.id,
        bandId: player.band,
        deck: getDeck(theme.id, player.band),
        index: 0,
        score: last.score || 0,
        streak: 0,
        bestStreak: last.bestStreak || 0,
        runSparkles: last.runSparkles || 0,
        answered: true
      };
      finishQuiz();
      return;
    }
    renderMap();
  }

  /* ---------- Result ---------- */

  function chestGraphic() {
    return '<span class="chest-graphic">' +
      Art.art('treasure') +
      '<span class="chest-spark sp-a">' + Art.star(true) + '</span>' +
      '<span class="chest-spark sp-b">' + Art.star(true) + '</span>' +
      '<span class="chest-spark sp-c">' + Art.star(true) + '</span>' +
    '</span>';
  }

  function renderResult(silent) {
    const result = state.result;
    const player = activePlayer();
    if (!result || !player) {
      renderMap();
      return;
    }
    const theme = getTheme(result.themeId);
    const band = getBand(player.band) || AGE_BANDS[0];
    const faceArt = result.stars === 0 ? 'sean-sad' : state.chestOpen ? 'sean-surprised' : 'sean-happy';
    const data = bandData(player, player.band);
    const best = data.stars[theme.id] || 0;
    const title = result.stars === 3 ? 'Trail mastered!' : result.stars === 2 ? 'Great exploring!' : result.stars === 1 ? 'Nice try!' : 'Keep going!';
    const next = getNextTheme(theme.id);
    const photo = Art.photo(theme.scene);
    const badgeContent = result.stars > 0
      ? '<span class="badge-art" style="' + themeStyle(theme) + '">' + Art.art(theme.sticker.art) + '</span>' +
        '<span class="badge-copy"><span class="badge-kicker">' + (result.freshBadge ? 'New badge unlocked' : 'Badge in your collection') + '</span><strong>' + esc(theme.sticker.name) + '</strong><small>' + esc(theme.trail) + ' - ' + esc(theme.name) + '</small></span>'
      : '<span class="badge-art is-empty">' + Art.icon('lock') + '</span>' +
        '<span class="badge-copy"><span class="badge-kicker">No badge yet</span><strong>Try the trail again</strong><small>One star or more opens the badge.</small></span>';

    const chest = !state.chestOpen
      ? '<button class="chest-btn" type="button" data-action="open-chest">' +
          chestGraphic() +
          '<span class="chest-label">Tap to open your reward</span>' +
          '<span class="chest-sub">' + (result.stars > 0 ? (result.freshBadge ? 'A new badge is waiting inside.' : 'Your trail badge is inside.') : 'Practice makes progress.') + '</span>' +
        '</button>'
      : '<div class="badge-reveal">' + badgeContent + '</div>' +
        '<div class="reward-summary">' +
          '<span class="reward-line">' + Art.icon('sparkle') + ' +' + plural(result.runSparkles, 'sparkle') + ' this run</span>' +
          (result.perfect && result.perfectBonus ? '<span class="reward-line is-perfect">' + Art.icon('star') + ' Perfect score bonus +' + result.perfectBonus + '</span>' : '') +
          (result.bestStreak >= 2 ? '<span class="reward-line">' + Art.icon('star') + ' Best streak: ' + result.bestStreak + ' in a row</span>' : '') +
          '<span class="reward-total">' + plural(player.sparkles, 'sparkle') + ' in your jar</span>' +
        '</div>';

    const inner =
      (photo ? '<span class="theme-photo scene-' + theme.scene + '" aria-hidden="true" style="background-image:url(' + photo + ')"></span>' : '') +
      '<section class="result-hero">' +
        '<span class="result-kicker">' + esc(theme.trail) + ' - Complete</span>' +
        '<h1>' + title + '</h1>' +
        '<div class="stars-row" aria-label="' + result.stars + ' of 3 stars">' + [0, 1, 2].map(function (index) {
          return '<span class="big-star' + (index < result.stars ? ' is-on' : '') + '">' + Art.star(index < result.stars) + '</span>';
        }).join('') + '</div>' +
        '<p class="result-score">' + result.score + ' of ' + result.total + ' correct</p>' +
        '<div class="result-buddy">' + Art.art(faceArt) + '</div>' +
      '</section>' +
      '<section class="chest-zone' + (state.chestOpen ? ' is-open' : '') + '">' + chest + '</section>' +
      '<div class="result-actions">' +
        '<button class="btn btn-primary" type="button" data-action="result-next">Next trail: ' + esc(next.trail) + Art.icon('chevron') + '</button>' +
        '<div class="result-row">' +
          '<button class="btn btn-soft" type="button" data-action="result-again">' + Art.icon('reset') + ' Play again</button>' +
          '<button class="btn btn-soft" type="button" data-action="result-map">' + Art.icon('home') + ' Map</button>' +
        '</div>' +
      '</div>' +
      '<p class="result-note">Best for this trail: ' + best + ' of 3 stars. ' + (best < 3 ? 'Replay to reach three stars.' : 'Perfect stars, keep shining!') + '</p>';

    showScreen(inner, 'result', themeStyle(theme), null);

    if (!silent) {
      const lines = [pickLine(PRAISE.finish)];
      if (result.score < result.total) lines.push(pickLine(PRAISE.affirm));
      scheduleLines(lines, 700, 220);
      setLive('You answered ' + result.score + ' of ' + result.total + ' correctly.');
      if (!state.celebrationDone && result.stars > 0) {
        state.celebrationDone = true;
        Sound.win();
        celebrate(result.freshBadge ? 80 : 46);
      }
    }
  }

  function openChest() {
    if (!state.result || state.chestOpen) return;
    state.chestOpen = true;
    const result = state.result;
    if (result.stars > 0) {
      Sound.win();
      celebrate(50);
      scheduleSpeak('You unlocked the ' + getTheme(result.themeId).sticker.name + ' badge!', 320);
    } else {
      Sound.star();
      scheduleSpeak('No badge this time. Try the trail again and earn a star.', 320);
    }
    renderResult(true);
  }

  /* ---------- Rewards ---------- */

  function renderRewards() {
    const player = activePlayer();
    if (!player) {
      renderWho();
      return;
    }
    const bandId = getBand(state.rewardsBand) ? state.rewardsBand : player.band;
    const band = getBand(bandId);
    const data = bandData(player, bandId);
    const badges = bandBadges(player, bandId);
    const stars = bandStars(player, bandId);
    const perfectCount = THEMES.filter(function (theme) { return data.perfect[theme.id]; }).length;
    const buddy = getBuddy(player.buddy);

    const tabs = AGE_BANDS.map(function (item) {
      const active = item.id === bandId;
      return '<button class="band-tab' + (active ? ' is-active' : '') + '" type="button" aria-pressed="' + active + '" data-action="rewards-band" data-id="' + item.id + '" style="--bc:' + item.color + ';--bd:' + item.deep + ';--bt:' + item.tint + ';">' + item.label + '</button>';
    }).join('');

    const rail = THEMES.map(function (theme) {
      return '<span class="reward-seg' + (data.done[theme.id] ? ' is-done' : '') + '" style="' + themeStyle(theme) + '"></span>';
    }).join('');

    const tiles = THEMES.map(function (theme) {
      const unlocked = !!data.done[theme.id];
      const themeStars = data.stars[theme.id] || 0;
      const perfect = !!data.perfect[theme.id];
      if (!unlocked) {
        return '<div class="sticker-tile locked" style="' + themeStyle(theme) + '">' +
          '<span class="lock-badge">' + Art.icon('lock') + '</span>' +
          '<span class="sticker-art">' + Art.art(theme.sticker.art) + '</span>' +
          '<span class="sticker-theme">' + esc(theme.trail) + '</span>' +
          '<span class="sticker-name"><span class="sr-only">Locked. </span>Mystery badge</span>' +
        '</div>';
      }
      return '<button class="sticker-tile" type="button" data-action="open-theme" data-id="' + theme.id + '" style="' + themeStyle(theme) + '" aria-label="' + esc(theme.sticker.name) + ', ' + esc(theme.trail) + ' badge, ' + themeStars + ' of 3 stars' + (perfect ? ', perfect' : '') + '. Replay this trail.">' +
        '<span class="sticker-art">' + Art.art(theme.sticker.art) + '</span>' +
        '<span class="sticker-theme">' + esc(theme.trail) + '</span>' +
        '<span class="sticker-name">' + esc(theme.sticker.name) + '</span>' +
        '<span class="tile-star">' + starRow(themeStars) + '</span>' +
        (perfect ? '<span class="perfect-ribbon" aria-hidden="true">Perfect</span>' : '') +
      '</button>';
    }).join('');

    const inner =
      '<header class="page-head"><div><div class="page-kicker">' + esc(player.name) + '\'s collection</div><h1>Reward shelf</h1></div></header>' +
      '<section class="reward-hero">' +
        '<div class="reward-hero-art">' + Art.art(buddy.art) + '</div>' +
        '<div class="reward-hero-copy"><span class="reward-band">' + band.label + ' - ' + esc(band.name) + '</span><h2>' + badges + ' of ' + TOTAL_TRAILS + ' badges</h2><p>Finish a trail quiz to add its badge to the shelf.</p></div>' +
        '<div class="reward-rail" role="progressbar" aria-label="Badges earned" aria-valuemin="0" aria-valuemax="' + TOTAL_TRAILS + '" aria-valuenow="' + badges + '" aria-valuetext="' + badges + ' of ' + TOTAL_TRAILS + ' badges earned">' + rail + '</div>' +
      '</section>' +
      '<div class="band-tabs" role="group" aria-label="Age band">' + tabs + '</div>' +
      '<div class="shelf-stats">' +
        '<span class="shelf-stat">' + Art.star(true) + '<strong>' + stars + '</strong><small>of ' + MAX_STARS + ' stars</small></span>' +
        '<span class="shelf-stat">' + Art.icon('sparkle') + '<strong>' + player.sparkles + '</strong><small>sparkles</small></span>' +
        '<span class="shelf-stat">' + Art.icon('star') + '<strong>' + perfectCount + '</strong><small>perfect trails</small></span>' +
      '</div>' +
      '<div class="sticker-grid">' + tiles + '</div>' +
      '<p class="page-note">Tap an unlocked badge to replay that trail. A perfect score adds a gold tag.</p>' +
      '<section class="buddy-note" style="' + buddyStyle(buddy) + '">' +
        '<span class="buddy-note-art">' + Art.art(buddy.art) + '</span>' +
        '<span><strong>' + esc(buddy.name) + ' the ' + esc(buddy.kind) + '</strong><p>' + esc(buddy.cheer) + '</p></span>' +
      '</section>';

    showScreen(inner, 'rewards', '--c:' + band.color + ';--deep:' + band.deep + ';--tint:' + band.tint + ';--soft:' + band.soft + ';', 'rewards');
  }

  /* ---------- Grown-ups ---------- */

  function renderParents(keepScroll) {
    const player = activePlayer();
    if (!player) {
      renderWho();
      return;
    }
    const band = getBand(player.band);
    const buddy = getBuddy(player.buddy);
    const settings = db.settings;
    const voiceOk = Sound.hasEnglishVoice();

    const inner =
      '<header class="page-head"><div><div class="page-kicker">For grown-ups</div><h1>Grown-up corner</h1></div></header>' +
      '<section class="parent-card player-card" style="' + buddyStyle(buddy) + '">' +
        '<div class="player-row"><span class="player-art">' + Art.art(buddy.art) + '</span><span class="player-copy"><strong>' + esc(player.name) + '</strong><small>' + band.label + ' - ' + esc(band.name) + '</small></span><span class="player-spark">' + Art.icon('sparkle') + player.sparkles + '<span class="sr-only"> sparkles</span></span></div>' +
        '<div class="stat-pills"><span class="stat-pill">' + plural(bandBadges(player, player.band), 'badge') + '</span> <span class="stat-pill">' + bandStars(player, player.band) + '/' + MAX_STARS + ' stars</span> <span class="stat-pill">' + plural(THEMES.filter(function (theme) { return bandData(player, player.band).perfect[theme.id]; }).length, 'perfect trail') + '</span></div>' +
        '<div class="player-actions"><button class="btn btn-soft" type="button" data-action="switch-player">Switch explorer</button><button class="btn btn-soft" type="button" data-action="new-player">Add explorer</button></div>' +
      '</section>' +
      '<section class="parent-card">' +
        '<h2>' + Art.icon('star') + ' Age band</h2>' +
        '<p>The quiz changes with the chosen age band. You can adjust it here.</p>' +
        '<div class="band-tabs is-parent" role="group" aria-label="Age band">' + AGE_BANDS.map(function (item) {
          const active = item.id === player.band;
          return '<button class="band-tab' + (active ? ' is-active' : '') + '" type="button" aria-pressed="' + active + '" data-action="set-band" data-id="' + item.id + '" style="--bc:' + item.color + ';--bd:' + item.deep + ';--bt:' + item.tint + ';">' + item.label + '</button>';
        }).join('') + '</div>' +
      '</section>' +
      '<section class="parent-card">' +
        '<h2>' + Art.icon('music') + ' Sound and narration</h2>' +
        '<div class="setting-row"><span class="setting-label">' + Art.icon('music') + '<span class="setting-text">Background music<span class="setting-sub">Public-domain melody arrangement</span></span></span><button class="switch" type="button" role="switch" aria-checked="' + settings.music + '" aria-label="Background music" data-action="toggle-music"></button></div>' +
        '<div class="setting-row"><span class="setting-label">' + Art.icon('sparkle') + '<span class="setting-text">Sound effects<span class="setting-sub">Buttons, answers, and rewards</span></span></span><button class="switch" type="button" role="switch" aria-checked="' + settings.sfx + '" aria-label="Sound effects" data-action="toggle-sfx"></button></div>' +
        '<div class="setting-row"><span class="setting-label">' + Art.icon('speaker') + '<span class="setting-text">Voice narration<span class="setting-sub">English</span></span></span><button class="switch" type="button" role="switch" aria-checked="' + settings.voice + '" aria-label="Voice narration" data-action="toggle-voice"></button></div>' +
        '<p class="voice-note"' + (voiceOk ? ' hidden' : '') + '>This device has no English voice installed. All narration still appears as text, and the game remains fully playable.</p>' +
      '</section>' +
      '<section class="parent-card is-quiet">' +
        '<h2>' + Art.icon('sparkle') + ' How rewards work</h2>' +
        '<p>Every correct answer adds one sparkle. Three correct in a row adds a bonus. A perfect quiz adds five more.</p>' +
        '<p>Finishing a trail quiz with at least one star unlocks its badge. Perfect scores add a gold tag to the badge.</p>' +
      '</section>' +
      '<section class="parent-card is-quiet">' +
        '<h2>' + Art.icon('book') + ' Five Montessori areas</h2>' +
        CURRICULUM.map(function (area) {
          return '<div class="curriculum-mini"><div class="mini-art">' + Art.art(area.icon) + '</div><div><h3>' + esc(area.name) + '</h3><p>' + esc(area.desc) + '</p></div></div>';
        }).join('') +
      '</section>' +
      '<section class="parent-card is-quiet">' +
        '<h2>' + Art.icon('heart') + ' Tips for grown-ups</h2>' +
        '<ul class="tips-list">' +
          '<li>Play together for 10 to 15 minutes, then stop before your child is tired.</li>' +
          '<li>Let your child choose the trail and tap the answers.</li>' +
          '<li>Praise effort and careful thinking, not only correct answers.</li>' +
          '<li>Repeat a favorite trail. Repetition is part of Montessori learning.</li>' +
          '<li>Ask about real objects at home after playing to connect the ideas.</li>' +
        '</ul>' +
      '</section>' +
      '<section class="parent-card">' +
        '<h2>' + Art.icon('reset') + ' Progress on this device</h2>' +
        '<p>Resetting clears this explorer\'s stars, badges, perfect tags, and sparkles. The name and settings stay.</p>' +
        '<button class="danger-btn" type="button" data-action="reset-progress">Reset this explorer\'s progress</button>' +
      '</section>' +
      '<section class="parent-card credits-card is-quiet">' +
        '<h2>' + Art.icon('info') + ' About this game</h2>' +
        '<p>Storybook illustrations come from the watercolor Montessori asset pack included with this game. Interface icons are original drawings in a playful cartoon style.</p>' +
        '<p>Fredoka and Nunito fonts use the SIL Open Font License.</p>' +
        '<p>The background music is an instrumental arrangement of the public-domain melody Twinkle, Twinkle, Little Star.</p>' +
        '<p>Sean Adventure is inspired by the Montessori approach and is not an official Montessori product.</p>' +
      '</section>' +
      '<p class="parents-foot">Sean Adventure - Version 2.0 - Made for learning at home.</p>';

    const y = keepScroll ? view.scrollTop : 0;
    showScreen(inner, 'parents', '--c:#ff8163;--deep:#cf4b2b;--tint:#fff7ec;--soft:#ffe9dc;', 'parents');
    if (keepScroll) view.scrollTop = y;
  }

  function toggleSetting(key) {
    db.settings[key] = !db.settings[key];
    Sound.applySettings({ [key]: db.settings[key] });
    saveData();
    Sound.tap();
    if (key === 'voice' && db.settings.voice) {
      if (!Sound.speak('Voice narration is on.')) setLive('Voice narration is not available on this device.');
    }
    if (key === 'music') setLive(db.settings.music ? 'Music on.' : 'Music off.');
    if (key === 'sfx') setLive(db.settings.sfx ? 'Sound effects on.' : 'Sound effects off.');
    renderParents(true);
  }

  function changeBand(bandId) {
    const player = activePlayer();
    if (!player || !getBand(bandId)) return;
    player.band = bandId;
    ensureBand(player, bandId);
    player.last = null;
    state.rewardsBand = bandId;
    saveData();
    Sound.tap();
    setLive('Age band set to ' + getBand(bandId).label + '.');
    renderParents(true);
  }

  function resetProgress(button) {
    const player = activePlayer();
    if (!player) return;
    if (!button.classList.contains('is-armed')) {
      button.classList.add('is-armed');
      button.textContent = 'Tap once more to reset';
      clearTimeout(resetTimer);
      resetTimer = setTimeout(function () {
        if (!button.isConnected) return;
        button.classList.remove('is-armed');
        button.textContent = 'Reset this explorer\'s progress';
      }, 4000);
      return;
    }
    clearTimeout(resetTimer);
    player.sparkles = 0;
    player.last = null;
    BAND_IDS.forEach(function (bandId) {
      player.bands[bandId] = { stars: {}, done: {}, perfect: {} };
    });
    saveData();
    Sound.tap();
    setLive('Progress reset for this explorer.');
    renderParents(true);
  }

  /* ---------- Demo interactions ---------- */

  function demoPour() {
    if (!demo || demo.done) return;
    demo.step = Math.min(3, demo.step + 1);
    Sound.pop();
    if (demo.step >= 3) completeDemo();
    else refreshDemo();
  }

  function demoCounter() {
    if (!demo || demo.done) return;
    demo.count = Math.min(5, demo.count + 1);
    Sound.pop();
    if (demo.count >= 5) completeDemo();
    else refreshDemo();
  }

  function demoTone(button) {
    if (!demo || demo.done) return;
    const tone = button.dataset.tone === 'low' ? 'low' : 'high';
    Sound.playTone(tone);
    demo.heard[tone] = true;
    if (demo.heard.high && demo.heard.low) completeDemo();
    else refreshDemo();
  }

  function demoLetter(button) {
    if (!demo || demo.done) return;
    const letter = button.dataset.letter;
    if (!letter || demo.letters.indexOf(letter) >= 0) return;
    demo.letters.push(letter);
    const sounds = { B: 'buh', A: 'ah', M: 'mmm' };
    if (!Sound.speak(letter + ' says ' + sounds[letter] + '.')) Sound.playTone('high');
    Sound.pop();
    if (demo.letters.length >= 3) completeDemo();
    else refreshDemo();
  }

  function demoGrow(button) {
    if (!demo || demo.done) return;
    const step = parseInt(button.dataset.step, 10);
    if (step !== demo.grow) return;
    demo.grow += 1;
    Sound.pop();
    if (demo.grow >= 3) completeDemo();
    else refreshDemo();
  }

  /* ---------- Writing practice ---------- */

  function traceFontSize(context, width, height, text, kind) {
    if (kind !== 'words') {
      return Math.round(Math.min(height * 0.72, width * 0.62));
    }
    let size = Math.round(height * 0.58);
    context.font = '600 ' + size + 'px Fredoka, "Trebuchet MS", sans-serif';
    const room = width * 0.84;
    const measured = context.measureText(text).width;
    if (measured > room) size = Math.max(24, Math.floor(size * room / measured));
    return size;
  }

  function buildTraceMask(width, height, fontSpec, x, y, text) {
    const off = document.createElement('canvas');
    off.width = width;
    off.height = height;
    const context = off.getContext('2d');
    context.font = fontSpec;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#000';
    context.fillText(text, x, y);
    let pixels;
    try {
      pixels = context.getImageData(0, 0, width, height).data;
    } catch (error) {
      return null;
    }
    const xs = [];
    const ys = [];
    for (let py = 0; py < height; py += 3) {
      for (let px = 0; px < width; px += 3) {
        if (pixels[(py * width + px) * 4 + 3] > 90) {
          xs.push(px);
          ys.push(py);
        }
      }
    }
    return { xs: xs, ys: ys };
  }

  function placeTraceStart(dot, mask, width, height, kind) {
    if (!dot) return;
    if (!mask || !mask.xs.length) {
      dot.hidden = true;
      return;
    }
    dot.hidden = false;
    let x = mask.xs[0];
    let y = mask.ys[0];
    for (let i = 1; i < mask.xs.length; i++) {
      const better = kind === 'words'
        ? mask.xs[i] < x
        : mask.ys[i] < y || (mask.ys[i] === y && mask.xs[i] < x);
      if (better) {
        x = mask.xs[i];
        y = mask.ys[i];
      }
    }
    dot.style.left = (x / width * 100).toFixed(2) + '%';
    dot.style.top = (y / height * 100).toFixed(2) + '%';
  }

  function attachWriteDemo() {
    const paper = view.querySelector('[data-write-paper]');
    if (!paper || paper.dataset.ready === '1') return;
    if (!demo || demo.done) return;
    const canvas = paper.querySelector('[data-write-canvas]');
    const writing = writingData();
    const item = writing.items[Math.min(demo.write || 0, writing.items.length - 1)];
    if (!canvas || !item) return;

    const box = paper.getBoundingClientRect();
    if (box.width < 60 || box.height < 60) {
      requestAnimationFrame(attachWriteDemo);
      return;
    }
    paper.dataset.ready = '1';

    const width = Math.round(box.width);
    const height = Math.round(box.height);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const context = canvas.getContext('2d');
    if (!context) return;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.lineCap = 'round';
    context.lineJoin = 'round';

    const size = traceFontSize(context, width, height, item.text, writing.kind);
    const fontSpec = '600 ' + size + 'px Fredoka, "Trebuchet MS", sans-serif';
    const centerX = width / 2;
    const centerY = height / 2 + size * 0.015;
    const deep = (getComputedStyle(paper).getPropertyValue('--deep') || '#5f45c4').trim();
    const tolerance = Math.max(14, Math.round(Math.min(width, height) * writing.tolerance));
    const startDot = paper.querySelector('[data-write-start]');
    const meter = view.querySelector('[data-write-meter]');
    const points = [];
    let mask = buildTraceMask(width, height, fontSpec, centerX, centerY, item.text);
    let lastPoint = null;
    let drawing = false;
    let activePointer = null;
    let meterAt = 0;

    placeTraceStart(startDot, mask, width, height, writing.kind);

    context.strokeStyle = deep;
    context.fillStyle = deep;
    context.lineWidth = Math.max(6, Math.round(height * 0.045));

    const drawGuide = function () {
      context.clearRect(0, 0, width, height);
      context.save();
      context.globalAlpha = writing.guideAlpha == null ? 0.2 : writing.guideAlpha;
      context.fillStyle = deep;
      context.font = fontSpec;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(item.text, centerX, centerY);
      context.restore();
    };
    drawGuide();

    if (document.fonts && document.fonts.load) {
      document.fonts.load('600 100px Fredoka').then(function () {
        if (!paper.isConnected) return;
        mask = buildTraceMask(width, height, fontSpec, centerX, centerY, item.text);
        placeTraceStart(startDot, mask, width, height, writing.kind);
        if (!points.length) drawGuide();
      }).catch(function () {});
    }

    const requirement = function () {
      const tries = demo.writeTries || 0;
      return Math.max(writing.floor, writing.coverage - tries * 0.07);
    };

    const setMeter = function (value) {
      if (!meter) return;
      meter.style.width = Math.round(Math.max(0, Math.min(1, value)) * 100) + '%';
    };

    const coverage = function () {
      if (!mask || !mask.xs.length || !points.length) return 0;
      const grid = new Map();
      points.forEach(function (point) {
        const key = Math.floor(point[0] / tolerance) + ':' + Math.floor(point[1] / tolerance);
        let bucket = grid.get(key);
        if (!bucket) {
          bucket = [];
          grid.set(key, bucket);
        }
        bucket.push(point);
      });
      const tol2 = tolerance * tolerance;
      let covered = 0;
      for (let i = 0; i < mask.xs.length; i++) {
        const x = mask.xs[i];
        const y = mask.ys[i];
        const gx = Math.floor(x / tolerance);
        const gy = Math.floor(y / tolerance);
        let hit = false;
        for (let ox = -1; ox <= 1 && !hit; ox++) {
          for (let oy = -1; oy <= 1 && !hit; oy++) {
            const bucket = grid.get((gx + ox) + ':' + (gy + oy));
            if (!bucket) continue;
            for (let j = 0; j < bucket.length; j++) {
              const dx = bucket[j][0] - x;
              const dy = bucket[j][1] - y;
              if (dx * dx + dy * dy <= tol2) {
                hit = true;
                break;
              }
            }
          }
        }
        if (hit) covered++;
      }
      return covered / mask.xs.length;
    };

    const localPoint = function (event) {
      const rect = canvas.getBoundingClientRect();
      return [
        Math.max(0, Math.min(width, (event.clientX - rect.left) * (width / rect.width))),
        Math.max(0, Math.min(height, (event.clientY - rect.top) * (height / rect.height)))
      ];
    };

    const paint = function (x, y) {
      if (lastPoint) {
        context.beginPath();
        context.moveTo(lastPoint[0], lastPoint[1]);
        context.lineTo(x, y);
        context.stroke();
      } else {
        context.beginPath();
        context.arc(x, y, context.lineWidth / 2, 0, Math.PI * 2);
        context.fill();
      }
      const previous = points[points.length - 1];
      if (!previous || (x - previous[0]) * (x - previous[0]) + (y - previous[1]) * (y - previous[1]) >= 6) {
        points.push([x, y]);
      }
      lastPoint = [x, y];
    };

    canvas.addEventListener('pointerdown', function (event) {
      if (!demo || demo.done || drawing || paper.classList.contains('is-traced')) return;
      event.preventDefault();
      drawing = true;
      activePointer = event.pointerId;
      lastPoint = null;
      paper.classList.add('is-writing');
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch (error) {}
      const point = localPoint(event);
      paint(point[0], point[1]);
    });

    canvas.addEventListener('pointermove', function (event) {
      if (!drawing || event.pointerId !== activePointer) return;
      event.preventDefault();
      const point = localPoint(event);
      paint(point[0], point[1]);
      const now = Date.now();
      if (now - meterAt > 160) {
        meterAt = now;
        setMeter(coverage() / requirement());
      }
    });

    const endStroke = function (event) {
      if (!drawing || (event && event.pointerId !== activePointer)) return;
      drawing = false;
      activePointer = null;
      lastPoint = null;
      paper.classList.remove('is-writing');
      if (event && event.pointerId != null) {
        try {
          canvas.releasePointerCapture(event.pointerId);
        } catch (error) {}
      }
      if (!demo || demo.done) return;
      const ratio = coverage();
      const needed = requirement();
      setMeter(ratio / needed);
      if (ratio >= needed) {
        finishWriteItem(paper);
        return;
      }
      demo.writeTries = (demo.writeTries || 0) + 1;
      paper.classList.remove('is-retry');
      void paper.offsetWidth;
      paper.classList.add('is-retry');
      Sound.tap();
    };

    canvas.addEventListener('pointerup', endStroke);
    canvas.addEventListener('pointercancel', endStroke);

    paper.writeReset = function () {
      points.length = 0;
      lastPoint = null;
      setMeter(0);
      drawGuide();
    };
  }

  function finishWriteItem(paper) {
    if (!demo || demo.done) return;
    if (paper && paper.classList.contains('is-traced')) return;
    const writing = writingData();
    demo.write = Math.min(writing.items.length, (demo.write || 0) + 1);
    demo.writeTries = 0;
    Sound.correct();
    if (paper) paper.classList.add('is-traced');
    clearTimeout(writeTimer);
    writeTimer = setTimeout(function () {
      const slide = currentStorySlide();
      if (!demo || !slide || slide.demo !== 'write') return;
      if (demo.write >= writing.items.length) {
        completeDemo();
      } else {
        refreshDemo();
        const item = writing.items[demo.write];
        if (item) scheduleSpeak(writingSpeech(item), 260);
      }
    }, 950);
  }

  function demoWriteClear() {
    const paper = view.querySelector('[data-write-paper]');
    if (!paper || paper.classList.contains('is-traced')) return;
    Sound.tap();
    if (paper.writeReset) paper.writeReset();
  }

  function demoWriteHear() {
    const writing = writingData();
    const item = writing.items[Math.min((demo && demo.write) || 0, writing.items.length - 1)];
    if (!item) return;
    Sound.tap();
    const speech = writingSpeech(item);
    if (!Sound.speak(speech)) setLive(speech);
  }

  /* ---------- Celebration ---------- */

  function celebrate(count) {
    if (!fx) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const colors = ['#ff8163', '#ffd23f', '#6bc77c', '#5aa9e6', '#ef6f9b', '#8a6fe8'];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const star = Math.random() < 0.22;
      piece.className = 'confetti' + (star ? ' is-star' : Math.random() < 0.4 ? ' is-round' : '');
      piece.style.left = Math.random() * 100 + '%';
      piece.style.color = color;
      if (!star) piece.style.background = color;
      piece.style.setProperty('--drift', (Math.random() * 120 - 60).toFixed(0) + 'px');
      piece.style.animationDelay = (Math.random() * 0.35).toFixed(2) + 's';
      piece.style.animationDuration = (1.8 + Math.random() * 0.9).toFixed(2) + 's';
      if (star) piece.innerHTML = Art.star(true);
      fx.appendChild(piece);
      setTimeout(function () {
        if (piece.parentNode) piece.parentNode.removeChild(piece);
      }, 3200);
    }
  }

  /* ---------- Overlay flows ---------- */

  function confirmQuizExit() {
    const theme = getTheme(state.themeId);
    overlay.innerHTML =
      '<div class="feedback-sheet oops" role="dialog" aria-modal="true" aria-label="Leave the quiz"' + (theme ? ' style="' + themeStyle(theme) + '"' : '') + '>' +
        '<div class="feedback-top"><span class="fb-face is-oops">' + Art.art('sean-angry') + '</span><div class="fb-copy"><span class="fb-kicker">Leaving so soon?</span><h2>Leave the quiz?</h2></div></div>' +
        '<p class="fb-explain">Your progress is saved. You can continue from the trail map.</p>' +
        '<button class="btn btn-primary" type="button" data-action="quiz-exit-confirm">Yes, save and leave</button>' +
        '<button class="btn btn-ghost" type="button" data-action="close-overlay">Keep playing</button>' +
      '</div>';
    overlay.hidden = false;
    state.overlayDismiss = true;
    setTimeout(function () {
      const button = overlay.querySelector('[data-action="quiz-exit-confirm"]');
      if (button) button.focus({ preventScroll: true });
    }, 140);
  }

  /* ---------- Events ---------- */

  function onClick(event) {
    if (event.target === overlay) {
      if (state.overlayDismiss) {
        hideOverlay();
        Sound.tap();
      }
      return;
    }
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled) return;
    const action = button.dataset.action;

    switch (action) {
      case 'tab-map':
        Sound.tap();
        hideOverlay();
        renderMap();
        break;
      case 'tab-rewards':
        Sound.tap();
        hideOverlay();
        renderRewards();
        break;
      case 'tab-parents':
        Sound.tap();
        hideOverlay();
        renderParents(false);
        break;
      case 'switch-player':
        Sound.tap();
        stopSpeech();
        renderWho();
        break;
      case 'new-player':
        Sound.tap();
        state.form = {
          name: '',
          band: activePlayer() ? activePlayer().band : '3-4',
          buddy: 'momo',
          add: true
        };
        renderWelcome(true);
        break;
      case 'back-to-map':
        Sound.tap();
        renderMap();
        break;
      case 'back-to-who':
        Sound.tap();
        renderWho();
        break;
      case 'pick-player': {
        const player = db.players.find(function (item) { return item.id === button.dataset.id; });
        if (!player) break;
        db.activeId = player.id;
        state.rewardsBand = null;
        state.form = null;
        saveData();
        Sound.star();
        renderMap();
        break;
      }
      case 'pick-band':
        if (!state.form) break;
        state.form.band = button.dataset.id;
        Sound.tap();
        renderWelcome(!!state.form.add);
        break;
      case 'pick-buddy':
        if (!state.form) break;
        state.form.buddy = button.dataset.id;
        Sound.tap();
        renderWelcome(!!state.form.add);
        break;
      case 'create-player':
        createPlayer();
        break;
      case 'open-theme':
        Sound.tap();
        openTheme(button.dataset.id);
        break;
      case 'continue-last':
        Sound.tap();
        resumeLast();
        break;
      case 'story-map':
        Sound.tap();
        renderMap();
        break;
      case 'story-back':
        previousStory();
        break;
      case 'story-next':
        nextStory();
        break;
      case 'replay-narration': {
        const slide = currentStorySlide();
        if (!slide) break;
        Sound.tap();
        const text = slide.kind === 'demo' && demo && demo.done ? slide.success : slide.narration;
        if (!Sound.speak(fillBuddy(text))) setLive(text);
        break;
      }
      case 'replay-explain': {
        const question = currentQuestion();
        if (!question) break;
        Sound.tap();
        if (!Sound.speak(fillBuddy(question.explain))) setLive(question.explain);
        break;
      }
      case 'demo-pour':
        demoPour();
        break;
      case 'demo-counter':
        demoCounter();
        break;
      case 'demo-tone':
        demoTone(button);
        break;
      case 'demo-letter':
        demoLetter(button);
        break;
      case 'demo-grow':
        demoGrow(button);
        break;
      case 'demo-write-clear':
        demoWriteClear();
        break;
      case 'demo-write-hear':
        demoWriteHear();
        break;
      case 'quiz-exit':
        Sound.tap();
        confirmQuizExit();
        break;
      case 'quiz-exit-confirm':
        Sound.tap();
        hideOverlay();
        renderMap();
        break;
      case 'close-overlay':
        hideOverlay();
        Sound.tap();
        break;
      case 'answer':
        answer(button.dataset.id);
        break;
      case 'next-question':
        nextQuestion();
        break;
      case 'replay-question': {
        const question = currentQuestion();
        if (!question) break;
        Sound.tap();
        if (!Sound.speak(fillBuddy(question.prompt))) setLive(question.prompt);
        break;
      }
      case 'play-tone': {
        const question = currentQuestion();
        if (question && question.sound) Sound.playTone(question.sound);
        break;
      }
      case 'open-chest':
        openChest();
        break;
      case 'result-next': {
        const result = state.result;
        if (!result) break;
        const next = getNextTheme(result.themeId);
        Sound.tap();
        openTheme(next.id);
        break;
      }
      case 'result-again':
        if (!state.result) break;
        Sound.tap();
        startQuiz(state.result.themeId);
        break;
      case 'result-map': {
        const player = activePlayer();
        if (player && player.last && player.last.mode === 'result') {
          player.last = null;
          saveData();
        }
        Sound.tap();
        renderMap();
        break;
      }
      case 'rewards-band':
        state.rewardsBand = button.dataset.id;
        Sound.tap();
        renderRewards();
        break;
      case 'set-band':
        changeBand(button.dataset.id);
        break;
      case 'toggle-music':
        toggleSetting('music');
        break;
      case 'toggle-sfx':
        toggleSetting('sfx');
        break;
      case 'toggle-voice':
        toggleSetting('voice');
        break;
      case 'reset-progress':
        resetProgress(button);
        break;
      default:
        break;
    }
  }

  function onInput(event) {
    if (event.target && event.target.id === 'name-input' && state.form) {
      state.form.name = event.target.value;
      const hint = document.getElementById('name-hint');
      if (hint) hint.textContent = 'This name stays on this device.';
      event.target.classList.remove('is-error');
    }
  }

  function onKey(event) {
    if (event.key === 'Enter' && event.target && event.target.id === 'name-input') {
      event.preventDefault();
      createPlayer();
      return;
    }
    if (event.key !== 'Escape') return;
    if (!overlay.hidden && state.overlayDismiss) {
      hideOverlay();
      return;
    }
    if (state.screen === 'story') {
      renderMap();
    }
  }

  function unlockAudio() {
    Sound.unlock();
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (!/^https?:$/.test(location.protocol)) return;
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }

  document.addEventListener('click', onClick);
  document.addEventListener('input', onInput);
  document.addEventListener('keydown', onKey);
  document.addEventListener('pointerdown', unlockAudio, { once: true, capture: true });
  document.addEventListener('keydown', unlockAudio, { once: true, capture: true });
  window.addEventListener('load', registerServiceWorker);

  if ('speechSynthesis' in window) {
    window.speechSynthesis.addEventListener('voiceschanged', function () {
      if (state.screen === 'parents') renderParents(true);
    });
  }

  if (activePlayer()) {
    renderMap();
  } else {
    renderWho();
  }
})();
