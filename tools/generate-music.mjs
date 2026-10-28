import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const SR = 44100;
const TAIL = 4; // seconds rendered past the loop point so decays and reverb wrap cleanly
const OUT_DIR = path.resolve('assets/audio/bgm');

const TIMBRES = {
  ukulele: { parts: [[1, 1, 0.55], [2, 0.32, 0.3], [3, 0.16, 0.2], [4, 0.08, 0.14]], attack: 0.003, release: 0.12 },
  celesta: { parts: [[1, 1, 1.4], [2.01, 0.28, 0.7], [3, 0.09, 0.4], [5.43, 0.05, 0.22]], attack: 0.002, release: 0.2 },
  marimba: { parts: [[1, 1, 0.7], [3.98, 0.24, 0.22], [9.1, 0.07, 0.09]], attack: 0.002, release: 0.1 },
  harp: { parts: [[1, 1, 1.6], [2, 0.42, 0.8], [3, 0.18, 0.5], [4, 0.07, 0.3]], attack: 0.004, release: 0.25 },
  kalimba: { parts: [[1, 1, 1.1], [5.4, 0.13, 0.35], [10.8, 0.05, 0.15]], attack: 0.003, release: 0.15 }
};

const CONFIGS = [
  {
    id: 'practical',
    bpm: 100,
    bars: 16,
    seed: 11,
    root: 60,
    scale: [0, 2, 4, 5, 7, 9, 11],
    progression: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14], [0, 4, 7]],
    padOctave: 0,
    padGain: 0.021,
    bassOctave: -12,
    bassGain: 0.085,
    bassPattern: [[0, 0, 2.2], [8, 0, 1.7]],
    arpOctave: 12,
    arpGain: 0.05,
    arpStep16: 2,
    arpPattern: [0, 1, 2, 3, 2, 1, 2, 3],
    arpDur16: 3,
    arpTimbre: 'ukulele',
    melodyTimbre: 'celesta',
    melodyGain: 0.075,
    melodyBase: 77,
    rhythms: [
      [[0, 3], [4, 2], [6, 2], [8, 3], [11, 2], [14, 2]],
      [[0, 2], [2, 2], [4, 2], [6, 2], [8, 6], [14, 2]]
    ],
    reverb: 0.42
  },
  {
    id: 'sensorial',
    bpm: 76,
    bars: 16,
    seed: 23,
    root: 62,
    scale: [0, 2, 4, 5, 7, 9, 11],
    progression: [[0, 4, 7], [7, 11, 14], [9, 12, 16], [5, 9, 12]],
    padOctave: 0,
    padGain: 0.02,
    bassOctave: -12,
    bassGain: 0.085,
    bassPattern: [[0, 0, 3.6]],
    arpOctave: 12,
    arpGain: 0.045,
    arpStep16: 4,
    arpPattern: [0, 2, 1, 3],
    arpDur16: 7,
    arpTimbre: 'celesta',
    melodyTimbre: 'flute',
    melodyGain: 0.062,
    melodyBase: 79,
    rhythms: [
      [[0, 8], [8, 4], [12, 4]],
      [[0, 4], [4, 4], [8, 6], [14, 2]]
    ],
    reverb: 0.52
  },
  {
    id: 'math',
    bpm: 112,
    bars: 16,
    seed: 37,
    root: 55,
    scale: [0, 2, 4, 5, 7, 9, 11],
    progression: [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7], [4, 7, 11], [5, 9, 12], [7, 11, 14], [0, 4, 7]],
    padOctave: 12,
    padGain: 0.019,
    bassOctave: -12,
    bassGain: 0.09,
    bassPattern: [[0, 0, 1.8], [8, 0, 1.2], [12, 7, 0.9]],
    arpOctave: 12,
    arpGain: 0.052,
    arpStep16: 2,
    arpPattern: [0, 1, 2, 3, 2, 1, 0, 1],
    arpDur16: 2,
    arpTimbre: 'marimba',
    melodyTimbre: 'celesta',
    melodyGain: 0.07,
    melodyBase: 79,
    rhythms: [
      [[0, 2], [2, 2], [4, 2], [8, 2], [10, 2], [12, 4]],
      [[0, 2], [2, 2], [4, 2], [6, 2], [8, 4], [12, 2], [14, 2]]
    ],
    reverb: 0.38
  },
  {
    id: 'language',
    bpm: 84,
    bars: 16,
    seed: 51,
    root: 53,
    scale: [0, 2, 4, 5, 7, 9, 11],
    progression: [[0, 4, 7], [2, 5, 9], [5, 9, 12], [7, 11, 14], [0, 4, 7], [2, 5, 9], [5, 9, 12], [0, 4, 7]],
    padOctave: 12,
    padGain: 0.02,
    bassOctave: -12,
    bassGain: 0.08,
    bassPattern: [[0, 0, 2.2], [8, 7, 1.8]],
    arpOctave: 12,
    arpGain: 0.045,
    arpStep16: 2,
    arpPattern: [0, 1, 2, 3, 2, 3, 2, 1],
    arpDur16: 5,
    arpTimbre: 'harp',
    melodyTimbre: 'flute',
    melodyGain: 0.062,
    melodyBase: 77,
    rhythms: [
      [[0, 4], [4, 2], [6, 2], [8, 4], [12, 4]],
      [[0, 3], [3, 3], [6, 2], [8, 4], [12, 4]]
    ],
    reverb: 0.5
  },
  {
    id: 'culture',
    bpm: 92,
    bars: 16,
    seed: 67,
    root: 60,
    scale: [0, 2, 4, 5, 7, 9, 11],
    progression: [[0, 4, 7], [9, 12, 16], [5, 9, 12], [7, 11, 14]],
    padOctave: 0,
    padGain: 0.02,
    bassOctave: -12,
    bassGain: 0.088,
    bassPattern: [[0, 0, 2.2], [8, 0, 1.6]],
    arpOctave: 12,
    arpGain: 0.048,
    arpStep16: 2,
    arpPattern: [0, 2, 1, 3, 0, 2, 3, 2],
    arpDur16: 4,
    arpTimbre: 'kalimba',
    melodyTimbre: 'kalimba',
    melodyGain: 0.07,
    melodyBase: 83,
    rhythms: [
      [[0, 2], [2, 2], [4, 4], [8, 2], [10, 2], [12, 4]],
      [[0, 3], [4, 2], [6, 3], [8, 4], [12, 4]]
    ],
    reverb: 0.46
  }
];

const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyArg = args.find(function (arg) { return arg.startsWith('--only='); });
const only = onlyArg ? onlyArg.split('=')[1] : null;

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function makeRng(seed) {
  let s = (seed >>> 0) || 1;
  return function () {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

function makeBus(seconds) {
  const n = Math.ceil(seconds * SR);
  return { n: n, L: new Float32Array(n), R: new Float32Array(n) };
}

function panGains(pan) {
  const a = ((Math.max(-1, Math.min(1, pan || 0)) + 1) * Math.PI) / 4;
  return [Math.cos(a), Math.sin(a)];
}

const TAU = Math.PI * 2;

function addOsc(bus, t0, dur, freq, gain, opts) {
  if (!(freq > 0) || !(gain > 0) || !(dur > 0)) return;
  const o = opts || {};
  const start = Math.max(0, Math.round(t0 * SR));
  const total = Math.round(dur * SR);
  const end = Math.min(bus.n, start + total);
  if (end <= start) return;
  const gains = panGains(o.pan);
  let attack = Math.min((o.attack == null ? 0.004 : o.attack) * SR, total * 0.5);
  let release = Math.min((o.release == null ? 0.06 : o.release) * SR, total * 0.5);
  attack = Math.max(attack, 1);
  release = Math.max(release, 1);
  const decay = o.decay || 0;
  const vib = o.vibrato || 0;
  const vibRate = o.vibratoRate || 5;
  const base = freq * Math.pow(2, (o.detune || 0) / 1200);
  let phase = 0;
  const count = end - start;
  for (let i = 0; i < count; i++) {
    const t = i / SR;
    let env = 1;
    if (i < attack) env = i / attack;
    const remain = count - i;
    if (remain < release) env *= remain / release;
    if (decay) env *= Math.exp(-t / decay);
    const f = vib ? base * (1 + vib * Math.sin(TAU * vibRate * t)) : base;
    phase += (TAU * f) / SR;
    const s = Math.sin(phase) * env * gain;
    bus.L[start + i] += s * gains[0];
    bus.R[start + i] += s * gains[1];
  }
}

function addTone(bus, t0, dur, freq, gain, spec) {
  const s = spec || {};
  const parts = s.parts || [[1, 1, 0]];
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    addOsc(bus, t0, dur, freq * part[0], gain * part[1], {
      attack: s.attack,
      release: s.release,
      decay: part[2] || s.decay,
      pan: s.pan,
      vibrato: s.vibrato,
      vibratoRate: s.vibratoRate,
      detune: part[3]
    });
  }
}

function addNoise(bus, t0, dur, gain, opts) {
  const o = opts || {};
  if (!(gain > 0) || !(dur > 0)) return;
  const start = Math.max(0, Math.round(t0 * SR));
  const total = Math.round(dur * SR);
  const end = Math.min(bus.n, start + total);
  if (end <= start) return;
  const gains = panGains(o.pan);
  const decay = o.decay || 0.05;
  const attack = Math.max((o.attack == null ? 0.002 : o.attack) * SR, 1);
  const hp = o.highpass == null ? 0.5 : o.highpass;
  const lpCoef = o.lowpass || 0;
  let prev = 0;
  let lp = 0;
  for (let i = start; i < end; i++) {
    const t = (i - start) / SR;
    const n = Math.random() * 2 - 1;
    let v = n - prev * hp;
    prev = n;
    if (lpCoef) {
      lp += (v - lp) * lpCoef;
      v = lp;
    }
    const env = Math.exp(-t / decay) * Math.min(1, (i - start) / attack);
    const s = v * env * gain;
    bus.L[i] += s * gains[0];
    bus.R[i] += s * gains[1];
  }
}

function addKick(bus, t0, gain) {
  const start = Math.max(0, Math.round(t0 * SR));
  const total = Math.round(0.34 * SR);
  const end = Math.min(bus.n, start + total);
  let phase = 0;
  for (let i = start; i < end; i++) {
    const t = (i - start) / SR;
    const f = 46 + 88 * Math.exp(-t / 0.03);
    phase += (TAU * f) / SR;
    const env = Math.exp(-t / 0.13) * Math.min(1, t / 0.004);
    const s = Math.sin(phase) * env * gain;
    bus.L[i] += s * 0.95;
    bus.R[i] += s * 0.95;
  }
}

function addShaker(bus, t0, gain, pan) {
  const start = Math.max(0, Math.round(t0 * SR));
  const total = Math.round(0.09 * SR);
  const end = Math.min(bus.n, start + total);
  const gains = panGains(pan);
  let prev = 0;
  for (let i = start; i < end; i++) {
    const t = (i - start) / SR;
    const n = Math.random() * 2 - 1;
    const hp = n - prev;
    prev = n;
    const env = Math.exp(-t / 0.028) * Math.min(1, t / 0.003);
    const s = hp * env * gain;
    bus.L[i] += s * gains[0];
    bus.R[i] += s * gains[1];
  }
}

function addWood(bus, t0, gain, pan) {
  addTone(bus, t0, 0.1, 1150, gain, {
    parts: [[1, 1, 0.05], [2.83, 0.25, 0.03]],
    attack: 0.001,
    release: 0.03,
    pan: pan || 0
  });
}

function addDrum(bus, t0, gain) {
  addOsc(bus, t0, 0.4, 150, gain, { attack: 0.002, release: 0.1, decay: 0.14 });
  addOsc(bus, t0, 0.4, 104, gain * 0.8, { attack: 0.002, release: 0.1, decay: 0.1 });
  addNoise(bus, t0, 0.06, gain * 0.45, { decay: 0.02, highpass: 0.3 });
}

function addClap(bus, t0, gain) {
  [0, 0.012, 0.026].forEach(function (offset) {
    addNoise(bus, t0 + offset, 0.05, gain, { decay: 0.015, highpass: 0.7, pan: -0.1 });
  });
}

function addFlute(bus, t0, dur, freq, gain, pan) {
  addOsc(bus, t0, dur, freq, gain, { attack: 0.09, release: 0.22, vibrato: 0.006, vibratoRate: 4.6, pan: pan });
  addOsc(bus, t0, dur, freq * 2, gain * 0.12, { attack: 0.12, release: 0.22, pan: pan });
  addNoise(bus, t0, dur, gain * 0.22, { attack: 0.1, decay: dur + 0.2, lowpass: 0.08, pan: pan });
}

function combInto(input, out, delay, feedback, damp, weight) {
  if (delay < 2) return;
  const line = new Float32Array(delay);
  let idx = 0;
  let lp = 0;
  for (let i = 0; i < input.length; i++) {
    const delayed = line[idx];
    lp = delayed * (1 - damp) + lp * damp;
    line[idx] = input[i] + lp * feedback;
    out[i] += delayed * weight;
    idx += 1;
    if (idx === delay) idx = 0;
  }
}

function allpassInto(input, out, delay, gain) {
  if (delay < 2) return;
  const line = new Float32Array(delay);
  let idx = 0;
  for (let i = 0; i < input.length; i++) {
    const delayed = line[idx];
    const v = input[i] + delayed * gain;
    out[i] = delayed - v * gain;
    line[idx] = v;
    idx += 1;
    if (idx === delay) idx = 0;
  }
}

function addReverb(bus, mix) {
  const dryL = bus.L.slice();
  const dryR = bus.R.slice();
  const wetL = new Float32Array(bus.n);
  const wetR = new Float32Array(bus.n);
  const combs = [0.0297, 0.0371, 0.0411, 0.0437];
  combs.forEach(function (time, index) {
    combInto(dryL, wetL, Math.round(time * SR * (1 + index * 0.011)), 0.72, 0.4, 0.25);
    combInto(dryR, wetR, Math.round(time * SR * (1 - index * 0.009)), 0.72, 0.4, 0.25);
  });
  const apL = new Float32Array(bus.n);
  const apR = new Float32Array(bus.n);
  allpassInto(wetL, apL, Math.round(0.005 * SR), 0.5);
  allpassInto(wetR, apR, Math.round(0.0043 * SR), 0.5);
  for (let i = 0; i < bus.n; i++) {
    bus.L[i] = dryL[i] + apL[i] * mix;
    bus.R[i] = dryR[i] + apR[i] * mix;
  }
}

function foldTail(bus, loopSamples) {
  for (let i = loopSamples; i < bus.n; i++) {
    bus.L[i - loopSamples] += bus.L[i];
    bus.R[i - loopSamples] += bus.R[i];
  }
  bus.L = bus.L.slice(0, loopSamples);
  bus.R = bus.R.slice(0, loopSamples);
  bus.n = loopSamples;
}

function normalize(bus, peakTarget) {
  let peak = 0;
  for (let i = 0; i < bus.n; i++) {
    const l = Math.abs(bus.L[i]);
    const r = Math.abs(bus.R[i]);
    if (l > peak) peak = l;
    if (r > peak) peak = r;
  }
  const gain = peak > 0 ? peakTarget / peak : 1;
  for (let i = 0; i < bus.n; i++) {
    bus.L[i] *= gain;
    bus.R[i] *= gain;
  }
}

function writeWav(file, bus) {
  const n = bus.n;
  const buffer = Buffer.alloc(44 + n * 4);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + n * 4, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(2, 22);
  buffer.writeUInt32LE(SR, 24);
  buffer.writeUInt32LE(SR * 4, 28);
  buffer.writeUInt16LE(4, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(n * 4, 40);
  let offset = 44;
  for (let i = 0; i < n; i++) {
    const l = Math.max(-1, Math.min(1, bus.L[i]));
    const r = Math.max(-1, Math.min(1, bus.R[i]));
    buffer.writeInt16LE(Math.round(l * 32767), offset);
    offset += 2;
    buffer.writeInt16LE(Math.round(r * 32767), offset);
    offset += 2;
  }
  fs.writeFileSync(file, buffer);
}

function scalePitch(root, scale, deg) {
  const octave = Math.floor(deg / scale.length);
  let index = deg % scale.length;
  if (index < 0) index += scale.length;
  return root + octave * 12 + scale[index];
}

function nearestDeg(root, scale, target) {
  let best = 0;
  let bestDiff = Infinity;
  for (let deg = -28; deg <= 56; deg++) {
    const diff = Math.abs(scalePitch(root, scale, deg) - target);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = deg;
    }
  }
  return best;
}

function snapToChord(cfg, deg, chord, min, max) {
  const toneClasses = chord.map(function (offset) {
    return (((cfg.root + offset) % 12) + 12) % 12;
  });
  for (let distance = 0; distance <= 5; distance++) {
    const candidates = distance === 0 ? [deg] : [deg + distance, deg - distance];
    for (let c = 0; c < candidates.length; c++) {
      const pitch = scalePitch(cfg.root, cfg.scale, candidates[c]);
      if (pitch < min || pitch > max) continue;
      if (toneClasses.indexOf((((pitch % 12) + 12) % 12)) !== -1) return candidates[c];
    }
  }
  return deg;
}

function renderMelody(bus, cfg, rng) {
  const beat = 60 / cfg.bpm;
  const step = beat / 4;
  const bar = beat * 4;
  const min = cfg.melodyBase - 7;
  const max = cfg.melodyBase + 10;
  let deg = nearestDeg(cfg.root, cfg.scale, cfg.melodyBase);
  let dir = rng() < 0.5 ? 1 : -1;

  for (let b = 0; b < cfg.bars; b++) {
    const chord = cfg.progression[b % cfg.progression.length];
    const rhythm = cfg.rhythms[b % cfg.rhythms.length];
    const phrasePos = b % 4;
    if (phrasePos === 0) {
      deg = snapToChord(cfg, deg, chord, min, max);
      dir = rng() < 0.5 ? 1 : -1;
    }
    for (let i = 0; i < rhythm.length; i++) {
      const pos = rhythm[i][0];
      const len = rhythm[i][1];
      const strong = pos % 8 === 0;
      const lastOfPhrase = phrasePos === 3 && i === rhythm.length - 1;

      if (i > 0 || b % 4 !== 0) {
        const roll = rng();
        let move;
        if (roll < 0.16) move = 0;
        else if (roll < 0.54) move = dir;
        else if (roll < 0.82) move = -dir;
        else move = dir * 2;
        deg += move;
        if (rng() < 0.25) dir += rng() < 0.5 ? 1 : -1;
        if (dir === 0) dir = 1;
        if (dir > 2) dir = 2;
        if (dir < -2) dir = -2;
      }

      let pitch = scalePitch(cfg.root, cfg.scale, deg);
      let guard = 0;
      while ((pitch < min || pitch > max) && guard < 10) {
        deg += pitch < min ? 2 : -2;
        pitch = scalePitch(cfg.root, cfg.scale, deg);
        guard += 1;
      }

      if (strong || lastOfPhrase) {
        const snapped = snapToChord(cfg, deg, chord, min, max);
        if (Math.abs(snapped - deg) <= 3) {
          deg = snapped;
          pitch = scalePitch(cfg.root, cfg.scale, deg);
        }
      }

      const t = b * bar + pos * step;
      const dur = len * step + (lastOfPhrase ? step * 3 : 0);
      const accent = pos === 0 ? 1.12 : strong ? 1 : 0.86;
      const freq = midiToFreq(pitch);
      if (cfg.melodyTimbre === 'flute') {
        addFlute(bus, t, dur, freq, cfg.melodyGain * accent, (i % 2 ? 0.12 : -0.12));
      } else {
        addTone(bus, t, dur, freq, cfg.melodyGain * accent, Object.assign({ pan: i % 2 ? 0.14 : -0.14 }, TIMBRES[cfg.melodyTimbre]));
      }
    }
  }
}

function renderTheme(cfg) {
  const beat = 60 / cfg.bpm;
  const step = beat / 4;
  const bar = beat * 4;
  const loopSeconds = cfg.bars * bar;
  const bus = makeBus(loopSeconds + TAIL);
  const rng = makeRng(cfg.seed);

  for (let b = 0; b < cfg.bars; b++) {
    const chord = cfg.progression[b % cfg.progression.length];
    const t = b * bar;
    for (let i = 0; i < chord.length; i++) {
      const freq = midiToFreq(cfg.root + cfg.padOctave + chord[i]);
      addOsc(bus, t, bar + 1, freq, cfg.padGain, {
        attack: 0.55,
        release: 1,
        vibrato: 0.0012,
        vibratoRate: 0.13 + i * 0.017,
        pan: (i - 1) * 0.22
      });
      addOsc(bus, t, bar + 1, freq, cfg.padGain * 0.5, {
        attack: 0.75,
        release: 1,
        detune: 7,
        pan: -(i - 1) * 0.22
      });
    }
  }

  for (let b = 0; b < cfg.bars; b++) {
    const chord = cfg.progression[b % cfg.progression.length];
    for (let p = 0; p < cfg.bassPattern.length; p++) {
      const entry = cfg.bassPattern[p];
      const t = b * bar + entry[0] * step;
      const dur = entry[2] * beat;
      const freq = midiToFreq(cfg.root + cfg.bassOctave + chord[0] + entry[1]);
      addTone(bus, t, dur, freq, cfg.bassGain, {
        parts: [[1, 1, dur * 0.9], [2, 0.18, dur * 0.5]],
        attack: 0.015,
        release: 0.12
      });
    }
  }

  for (let b = 0; b < cfg.bars; b++) {
    const chord = cfg.progression[b % cfg.progression.length];
    const tones = [chord[0], chord[1], chord[2], chord[0] + 12];
    for (let s = 0; s < cfg.arpPattern.length; s++) {
      const pos = s * cfg.arpStep16;
      if (pos >= 16) break;
      const t = b * bar + pos * step;
      const freq = midiToFreq(cfg.root + cfg.arpOctave + tones[cfg.arpPattern[s]]);
      const accent = s % 4 === 0 ? 1 : 0.75;
      addTone(bus, t, cfg.arpDur16 * step, freq, cfg.arpGain * accent, Object.assign({
        pan: s % 2 ? 0.3 : -0.3
      }, TIMBRES[cfg.arpTimbre]));
    }
  }

  renderMelody(bus, cfg, rng);

  for (let b = 0; b < cfg.bars; b++) {
    const t = b * bar;
    if (cfg.id === 'practical') {
      addKick(bus, t, 0.13);
      addKick(bus, t + 2 * beat, 0.09);
      for (let s = 0; s < 8; s++) {
        const off = s % 2 === 1;
        addShaker(bus, t + s * 2 * step + (off ? 0.01 : 0), off ? 0.032 : 0.018, off ? 0.3 : -0.3);
      }
      addWood(bus, t + beat, 0.034, -0.25);
      addWood(bus, t + 3 * beat, 0.028, 0.25);
    } else if (cfg.id === 'math') {
      addKick(bus, t, 0.15);
      addKick(bus, t + 2 * beat, 0.11);
      for (let s = 0; s < 16; s += 2) {
        addShaker(bus, t + s * step, s % 4 === 0 ? 0.02 : 0.028, s % 4 === 0 ? -0.3 : 0.3);
      }
      addWood(bus, t + beat, 0.05, -0.25);
      addWood(bus, t + 3 * beat, 0.05, 0.25);
      addWood(bus, t + 2.5 * beat, 0.028, 0.1);
    } else if (cfg.id === 'culture') {
      addDrum(bus, t, 0.15);
      addDrum(bus, t + 1.5 * beat, 0.075);
      addDrum(bus, t + 2 * beat, 0.11);
      addDrum(bus, t + 3.5 * beat, 0.075);
      for (let s = 0; s < 16; s += 2) {
        addShaker(bus, t + s * step, s % 4 === 0 ? 0.02 : 0.026, s % 4 === 0 ? -0.35 : 0.35);
      }
      if (b % 2 === 1) {
        addClap(bus, t + beat, 0.022);
        addClap(bus, t + 3 * beat, 0.018);
      }
    } else if (cfg.id === 'language') {
      if (b % 2 === 1) {
        for (let s = 0; s < 8; s++) {
          addShaker(bus, t + s * 2 * step, 0.016, s % 2 ? 0.28 : -0.28);
        }
      }
      if (b % 4 === 3) {
        const chord = cfg.progression[b % cfg.progression.length];
        const base = cfg.root + cfg.arpOctave + chord[0] + 12;
        const intervals = [0, chord[1] - chord[0], chord[2] - chord[0], 12, 12 + (chord[1] - chord[0]), 24];
        for (let i = 0; i < intervals.length; i++) {
          addTone(bus, t + 2 * beat + i * 0.055, 0.55, midiToFreq(base + intervals[i]), 0.028, Object.assign({
            pan: -0.3 + i * 0.12
          }, TIMBRES.harp));
        }
      }
    } else if (cfg.id === 'sensorial') {
      if (b % 2 === 0) {
        const chord = cfg.progression[b % cfg.progression.length];
        const pitch = cfg.root + 36 + chord[1];
        addTone(bus, t, 1.8, midiToFreq(pitch), 0.022, Object.assign({
          pan: b % 4 === 0 ? 0.35 : -0.35
        }, TIMBRES.celesta));
      }
    }
  }

  addReverb(bus, cfg.reverb);
  foldTail(bus, Math.round(loopSeconds * SR));
  normalize(bus, 0.88);

  const wavPath = path.join(OUT_DIR, cfg.id + '.wav');
  const mp3Path = path.join(OUT_DIR, cfg.id + '.mp3');
  writeWav(wavPath, bus);
  execFileSync('ffmpeg', [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-i', wavPath,
    '-af', 'loudnorm=I=-16.2:TP=-1.5:LRA=11',
    '-ar', String(SR),
    '-codec:a', 'libmp3lame',
    '-b:a', '96k',
    mp3Path
  ], { stdio: 'inherit' });
  fs.unlinkSync(wavPath);
  console.log('Wrote ' + path.relative(process.cwd(), mp3Path) + '  (' + loopSeconds.toFixed(1) + 's loop, ' + cfg.bpm + ' BPM)');
}

fs.mkdirSync(OUT_DIR, { recursive: true });

CONFIGS.forEach(function (cfg) {
  if (only && cfg.id !== only) return;
  const target = path.join(OUT_DIR, cfg.id + '.mp3');
  if (!force && fs.existsSync(target)) {
    console.log('Skip ' + cfg.id + ' (exists, use --force to rebuild)');
    return;
  }
  console.log('Rendering ' + cfg.id + '...');
  renderTheme(cfg);
});
