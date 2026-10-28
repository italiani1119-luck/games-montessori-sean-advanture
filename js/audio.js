(function () {
  'use strict';

  const settings = { music: true, sfx: true, voice: true };
  let ctx = null;
  let master = null;
  let unlocked = false;
  let voices = [];
  let englishVoice = null;
  let activeUtterance = null;
  let activeClip = null;
  let clipManifest = null;
  let clipLoading = false;

  const CLIP_DIR = 'assets/audio/narration/';
  const CLIP_VERSION = 'v2';

  const MUSIC_HOME = 'assets/audio/bgm.wav';
  const MUSIC_DIR = 'assets/audio/bgm/';
  const MUSIC_VERSION = '2';
  const MUSIC_BASE = 0.24;
  const MUSIC_TRACKS = {
    practical: MUSIC_DIR + 'practical.mp3',
    sensorial: MUSIC_DIR + 'sensorial.mp3',
    math: MUSIC_DIR + 'math.mp3',
    language: MUSIC_DIR + 'language.mp3',
    culture: MUSIC_DIR + 'culture.mp3'
  };

  let musicTarget = 'home';
  let musicPlayers = {};
  let musicFailed = {};
  let activeMusic = null;
  let musicDuck = 1;
  let musicFadeTimer = null;

  function hashText(text) {
    let hash = 2166136261;
    for (let i = 0; i < text.length; i++) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function loadClips() {
    if (clipManifest !== null || clipLoading) return;
    clipLoading = true;
    fetch(CLIP_DIR + 'manifest.json', { cache: 'no-cache' })
      .then(function (response) {
        return response.ok ? response.json() : null;
      })
      .then(function (data) {
        clipManifest = data && data.clips && typeof data.clips === 'object' ? data.clips : {};
      })
      .catch(function () {
        clipManifest = {};
      })
      .then(function () {
        clipLoading = false;
      });
  }

  function ensureCtx() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
      return true;
    } catch (e) {
      ctx = null;
      return false;
    }
  }

  function musicSrc(id) {
    const track = MUSIC_TRACKS[id];
    return track ? track + '?v=' + MUSIC_VERSION : MUSIC_HOME;
  }

  function ensurePlayer(id) {
    const key = MUSIC_TRACKS[id] ? id : 'home';
    if (musicPlayers[key]) return musicPlayers[key];
    if (musicFailed[key]) return key === 'home' ? null : ensurePlayer('home');
    const el = new Audio(musicSrc(key));
    el.loop = true;
    el.preload = 'none';
    el.volume = 0;
    el.addEventListener('error', function () {
      musicFailed[key] = true;
      if (activeMusic === el) {
        activeMusic = null;
        if (key !== 'home') {
          musicTarget = 'home';
          crossfadeTo('home');
        }
      }
    });
    musicPlayers[key] = el;
    return el;
  }

  function musicLevel() {
    return MUSIC_BASE * musicDuck;
  }

  function duckMusic(level) {
    musicDuck = level;
    if (musicFadeTimer) return;
    if (activeMusic) activeMusic.volume = musicLevel();
  }

  function pauseAllMusic() {
    clearInterval(musicFadeTimer);
    musicFadeTimer = null;
    Object.keys(musicPlayers).forEach(function (key) {
      const el = musicPlayers[key];
      if (!el.paused) el.pause();
    });
  }

  function crossfadeTo(id) {
    const to = ensurePlayer(id);
    if (!to) return;
    if (activeMusic === to) {
      to.volume = musicLevel();
      if (to.paused && settings.music && unlocked) {
        const resumed = to.play();
        if (resumed && typeof resumed.catch === 'function') resumed.catch(function () {});
      }
      return;
    }
    const from = activeMusic;
    clearInterval(musicFadeTimer);
    musicFadeTimer = null;
    activeMusic = to;
    try {
      to.currentTime = 0;
    } catch (e) {}
    to.volume = 0;
    const started = to.play();
    if (started && typeof started.catch === 'function') {
      started.catch(function () {});
    }
    if (!from) {
      to.volume = musicLevel();
      return;
    }
    const began = Date.now();
    const span = 900;
    musicFadeTimer = setInterval(function () {
      const k = Math.min(1, (Date.now() - began) / span);
      const eased = k * k * (3 - 2 * k);
      to.volume = musicLevel() * eased;
      from.volume = musicLevel() * (1 - eased);
      if (k >= 1) {
        clearInterval(musicFadeTimer);
        musicFadeTimer = null;
        from.volume = 0;
        if (!from.paused) from.pause();
      }
    }, 30);
  }

  function setScene(id) {
    const target = MUSIC_TRACKS[id] && !musicFailed[id] ? id : 'home';
    if (musicTarget === target) return;
    musicTarget = target;
    if (settings.music && unlocked) crossfadeTo(target);
  }

  function playMusic() {
    if (!settings.music || !unlocked) return;
    const target = ensurePlayer(musicTarget);
    if (!target) return;
    if (activeMusic === target && !target.paused) return;
    crossfadeTo(musicTarget);
  }

  function pauseMusic() {
    pauseAllMusic();
  }

  function unlock() {
    if (!unlocked) {
      unlocked = true;
      ensureCtx();
      if (ctx && ctx.state === 'suspended') ctx.resume().catch(function () {});
      if (settings.music) crossfadeTo(musicTarget);
    } else if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(function () {});
    }
  }

  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    try {
      voices = window.speechSynthesis.getVoices() || [];
    } catch (e) {
      voices = [];
    }
    englishVoice = voices.find(function (v) {
      return /^en[-_]US/i.test(v.lang || '') && v.localService !== false;
    }) || voices.find(function (v) {
      return /^en[-_]US/i.test(v.lang || '');
    }) || voices.find(function (v) {
      return /^en([-_]|$)/i.test(v.lang || '');
    }) || null;
  }

  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
  }

  function speakSynth(text, onDone) {
    if (!settings.voice || !text || !('speechSynthesis' in window)) return false;
    if (!englishVoice) return false;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      if (englishVoice) u.voice = englishVoice;
      u.rate = 0.94;
      u.pitch = 1.06;
      u.volume = 0.95;
      if (settings.music) duckMusic(0.66);
      u.onend = function () {
        activeUtterance = null;
        duckMusic(1);
        if (onDone) onDone();
      };
      u.onerror = function () {
        activeUtterance = null;
        duckMusic(1);
        if (onDone) onDone();
      };
      activeUtterance = u;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) {
      return false;
    }
  }

  function stopClip() {
    if (!activeClip) return;
    const clip = activeClip;
    activeClip = null;
    try {
      clip.pause();
    } catch (e) {}
  }

  function stopSpeech() {
    stopClip();
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    activeUtterance = null;
    duckMusic(1);
  }

  function playClip(file, text, onDone) {
    stopSpeech();
    const clip = new Audio(CLIP_DIR + file + '?v=' + CLIP_VERSION);
    clip.preload = 'auto';
    clip.volume = 0.98;
    activeClip = clip;
    if (settings.music) duckMusic(0.58);
    let finished = false;
    const done = function () {
      if (activeClip === clip) activeClip = null;
      duckMusic(1);
      if (finished) return;
      finished = true;
      if (onDone) onDone();
    };
    clip.addEventListener('ended', done, { once: true });
    clip.addEventListener('error', function () {
      done();
    }, { once: true });
    const started = clip.play();
    if (started && typeof started.catch === 'function') {
      started.catch(function () {
        if (activeClip === clip) activeClip = null;
        duckMusic(1);
        speakSynth(text, onDone);
      });
    }
    return true;
  }

  function speak(text, onDone) {
    if (!settings.voice || !text) return false;
    if (clipManifest === null) loadClips();
    if (clipManifest) {
      const file = clipManifest[hashText(text)];
      if (file) return playClip(file, text, onDone);
    }
    return speakSynth(text, onDone);
  }

  function blip(freq, dur, opts) {
    if (!settings.sfx || !ensureCtx()) return;
    const o = opts || {};
    const t0 = ctx.currentTime + 0.015;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (o.to) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, o.to), t0 + dur);
    }
    const vol = o.vol == null ? 0.16 : o.vol;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.04);
  }

  function chime(freq, startDelay, dur, vol) {
    setTimeout(function () {
      blip(freq, dur || 0.5, { vol: vol == null ? 0.18 : vol });
      blip(freq * 2.01, (dur || 0.5) * 0.7, { vol: (vol == null ? 0.18 : vol) * 0.22 });
    }, Math.max(0, startDelay || 0));
  }

  function tap() {
    blip(680, 0.075, { to: 900, vol: 0.09 });
  }

  function pop() {
    blip(300, 0.11, { to: 720, vol: 0.14 });
  }

  function correct() {
    chime(523.25, 0, 0.32, 0.2);
    chime(659.25, 95, 0.34, 0.18);
    chime(783.99, 190, 0.46, 0.17);
    chime(1046.5, 300, 0.6, 0.09);
  }

  function wrong() {
    blip(330, 0.22, { type: 'triangle', to: 262, vol: 0.11 });
    setTimeout(function () {
      blip(262, 0.32, { type: 'triangle', to: 220, vol: 0.08 });
    }, 150);
  }

  function star() {
    chime(880, 0, 0.28, 0.14);
    chime(1174.66, 80, 0.3, 0.12);
    chime(1567.98, 160, 0.45, 0.1);
  }

  function win() {
    const seq = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    seq.forEach(function (f, i) {
      chime(f, i * 110, 0.6, 0.17 - i * 0.012);
    });
    setTimeout(function () {
      chime(1567.98, 0, 0.9, 0.08);
    }, 620);
  }

  function playTone(kind) {
    if (!ensureCtx()) return;
    if (ctx.state === 'suspended') ctx.resume().catch(function () {});
    const map = {
      high: { f: 880, vol: 0.32, dur: 1.15 },
      low: { f: 196, vol: 0.34, dur: 1.3 },
      soft: { f: 659.25, vol: 0.055, dur: 0.9 },
      loud: { f: 659.25, vol: 0.42, dur: 0.9 }
    };
    const t = map[kind] || map.high;
    const t0 = ctx.currentTime + 0.02;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc2.type = 'sine';
    osc.frequency.value = t.f;
    osc2.frequency.value = t.f * 2.01;
    const g2 = ctx.createGain();
    g2.gain.value = 0.16;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(t.vol, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + t.dur);
    osc.connect(gain);
    osc2.connect(g2);
    g2.connect(gain);
    gain.connect(master);
    osc.start(t0);
    osc2.start(t0);
    osc.stop(t0 + t.dur + 0.05);
    osc2.stop(t0 + t.dur + 0.05);
  }

  function applySettings(s) {
    if (!s) return;
    if (typeof s.music === 'boolean') settings.music = s.music;
    if (typeof s.sfx === 'boolean') settings.sfx = s.sfx;
    if (typeof s.voice === 'boolean') settings.voice = s.voice;
    if (settings.music && unlocked) {
      playMusic();
    } else if (!settings.music) {
      pauseMusic();
    }
    if (!settings.voice) stopSpeech();
  }

  loadClips();

  window.Sound = {
    init: applySettings,
    applySettings: applySettings,
    settings: settings,
    unlock: unlock,
    speak: speak,
    stopSpeech: stopSpeech,
    tap: tap,
    pop: pop,
    correct: correct,
    wrong: wrong,
    star: star,
    win: win,
    playTone: playTone,
    hasEnglishVoice: function () { return !!englishVoice; },
    setScene: setScene,
    musicElement: function () { return activeMusic || musicPlayers[musicTarget] || null; },
    toggleMusic: function () {
      settings.music = !settings.music;
      if (settings.music) {
        if (unlocked) crossfadeTo(musicTarget);
      } else {
        pauseMusic();
      }
      return settings.music;
    }
  };
})();
