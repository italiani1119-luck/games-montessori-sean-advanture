import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'assets/audio/narration');
const manifestPath = path.join(outDir, 'manifest.json');

const args = process.argv.slice(2);
const flag = (name) => args.includes('--' + name);
const option = (name, fallback) => {
  const prefix = '--' + name + '=';
  const hit = args.find((a) => a.startsWith(prefix));
  if (hit) return hit.slice(prefix.length);
  const index = args.indexOf('--' + name);
  const next = index === -1 ? '' : args[index + 1];
  return next && !next.startsWith('--') ? next : fallback;
};

const dryRun = flag('dry-run');
const force = flag('force');
const limit = Number(option('limit', '0')) || 0;

const MODEL = 'eleven_multilingual_v2';
const VOICE_PREFERENCES = ['Liam', 'Jessica', 'Laura', 'Alice', 'Matilda', 'Charlotte', 'Lily', 'Sarah', 'Aria', 'Elli'];
const VOICE_NAMES = { TX3LPaxmHKxFdv7VOQHJ: 'Liam' };
const VOICE_SETTINGS = {
  stability: 0.34,
  similarity_boost: 0.82,
  style: 0.62,
  use_speaker_boost: true
};

function hashText(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function loadGame() {
  globalThis.window = globalThis;
  vm.runInThisContext(fs.readFileSync(path.join(root, 'js/content.js'), 'utf8'), { filename: 'content.js' });
  return { themes: globalThis.THEMES, bands: globalThis.AGE_BANDS, buddies: globalThis.BUDDIES, writing: globalThis.WRITING };
}

function collectTexts() {
  const { themes, bands, buddies, writing } = loadGame();
  const texts = new Set();
  const add = (value) => {
    const text = String(value == null ? '' : value).trim();
    if (text) texts.add(text);
  };

  themes.forEach((theme) => {
    theme.story.forEach((slide) => {
      add(slide.narration);
      add(slide.success);
      (slide.letters || []).forEach((pair) => add(pair[0] + ' says ' + pair[1] + '.'));
    });
    add('You unlocked the ' + theme.sticker.name + ' badge!');
  });
  add('No badge this time. Try the trail again and earn a star.');
  add('Voice narration is on.');

  Object.values(globalThis.PRAISE || {}).forEach((pool) => {
    (pool || []).forEach(add);
  });

  themes.forEach((theme) => {
    bands.forEach((band) => {
      const deck = globalThis.getDeck(theme.id, band.id);
      deck.forEach((question) => {
        add(question.prompt);
        add(question.explain);
      });
    });
  });

  Object.values(writing || {}).forEach((band) => {
    (band.items || []).forEach((item) => {
      add(item.say || item.prompt);
    });
  });

  const buddyNames = buddies.map((buddy) => buddy.name);
  const expanded = new Set();
  texts.forEach((text) => {
    if (/\bMomo\b/.test(text)) {
      buddyNames.forEach((name) => expanded.add(text.replace(/\bMomo\b/g, name)));
    } else {
      expanded.add(text);
    }
  });
  return [...expanded].sort();
}

function readKey() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim();
  const keyPath = path.join(root, 'elevenlabs.key');
  if (fs.existsSync(keyPath)) return fs.readFileSync(keyPath, 'utf8').trim();
  return '';
}

async function api(url, key, init) {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(90000),
    headers: {
      'xi-api-key': key,
      'content-type': 'application/json',
      ...(init && init.headers ? init.headers : {})
    }
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body.slice(0, 300)}`);
  }
  return response;
}

async function pickVoice(key) {
  const override = option('voice', process.env.ELEVENLABS_VOICE_ID || '');
  if (override) return { voice_id: override, name: VOICE_NAMES[override] || 'custom' };
  const response = await api('https://api.elevenlabs.io/v1/voices', key, { method: 'GET' });
  const data = await response.json();
  const voices = data.voices || [];
  for (const wanted of VOICE_PREFERENCES) {
    const match = voices.find((voice) => voice.name && voice.name.toLowerCase() === wanted.toLowerCase());
    if (match) return match;
  }
  if (!voices.length) throw new Error('No voices available on this account');
  return voices[0];
}

async function withRetry(fn, label) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const wait = attempt * 1500;
      console.warn(`  retry ${attempt}/3 ${label}: ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
  }
  throw lastError;
}

async function synthesize(key, voiceId, text, filePath) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;
  const response = await api(url, key, {
    method: 'POST',
    body: JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: VOICE_SETTINGS
    })
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 800) throw new Error('clip too small, likely an error payload');
  fs.writeFileSync(filePath, buffer);
  return buffer.length;
}

const texts = collectTexts();
const key = readKey();
const chars = texts.reduce((sum, text) => sum + text.length, 0);
console.log(`${texts.length} narration clips, ${chars} characters (about ${Math.round(chars / 60)} seconds).`);

if (dryRun) {
  texts.slice(0, 12).forEach((text) => console.log(' - ' + text));
  console.log('Dry run only. Add elevenlabs.key (or ELEVENLABS_API_KEY) and run: node tools/generate-narration.mjs');
  process.exit(0);
}

if (!key) {
  console.error('Missing API key. Put it in elevenlabs.key at the project root, or set ELEVENLABS_API_KEY.');
  console.error('Preview only:');
  texts.slice(0, 8).forEach((text) => console.error(' - ' + text));
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const voice = await pickVoice(key);
console.log(`Voice: ${voice.name} (${voice.voice_id})`);

let manifest = { version: 1, model: MODEL, voice: { id: voice.voice_id, name: voice.name }, clips: {} };
if (fs.existsSync(manifestPath)) {
  try {
    const existing = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (existing && existing.clips && !force) manifest = { ...existing, ...manifest, clips: existing.clips };
  } catch (error) {
    console.warn('Existing manifest was unreadable, starting fresh.');
  }
}

const hashes = new Map();
texts.forEach((text) => {
  const hash = hashText(text);
  if (hashes.has(hash) && hashes.get(hash) !== text) {
    throw new Error(`Hash collision for "${text}" and "${hashes.get(hash)}"`);
  }
  hashes.set(hash, text);
});

const queue = [];
for (const text of texts) {
  const hash = hashText(text);
  const file = hash + '.mp3';
  const filePath = path.join(outDir, file);
  if (!force && manifest.clips[hash] && fs.existsSync(filePath)) continue;
  queue.push({ text, hash, file, filePath });
}

if (limit) queue.splice(limit);
console.log(`${queue.length} clips to generate, ${texts.length - queue.length} already present.`);

let done = 0;
let bytes = 0;
const saveManifest = () => {
  manifest.generatedAt = new Date().toISOString();
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
};

async function worker(items) {
  for (const item of items) {
    try {
      const size = await withRetry(
        () => synthesize(key, voice.voice_id, item.text, item.filePath),
        item.hash
      );
      manifest.clips[item.hash] = item.file;
      done += 1;
      bytes += size;
      console.log(`[${done}/${queue.length}] ${item.hash}.mp3 ${size} B - ${item.text.slice(0, 64)}`);
      if (done % 10 === 0) saveManifest();
    } catch (error) {
      console.error(`FAILED ${item.hash}: ${error.message}`);
    }
  }
}

const workers = 3;
await Promise.all(Array.from({ length: workers }, (_, index) => worker(queue.filter((_, i) => i % workers === index))));
saveManifest();
console.log(`Finished. ${done} new clips, ${(bytes / 1024 / 1024).toFixed(2)} MB. Manifest: ${manifestPath}`);
