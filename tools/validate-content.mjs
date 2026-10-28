import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
globalThis.window = globalThis;

vm.runInThisContext(fs.readFileSync(path.join(root, 'js/content.js'), 'utf8'), { filename: 'content.js' });
vm.runInThisContext(fs.readFileSync(path.join(root, 'js/art.js'), 'utf8'), { filename: 'art.js' });

const artSrc = fs.readFileSync(path.join(root, 'js/art.js'), 'utf8');
const imgBlock = artSrc.slice(artSrc.indexOf('const IMG = {'), artSrc.indexOf('const CUTOUT_IMG'));
const raster = new Set([...imgBlock.matchAll(/['"]?([\w-]+)['"]?\s*:\s*'([^']+\.webp)'/g)].map((m) => m[1]));

const errors = [];
const stats = [];
let total = 0;

for (const theme of window.THEMES) {
  const expectedSlides = theme.id === 'language' ? 6 : 5;
  if (theme.story.length !== expectedSlides) errors.push(`${theme.id}: story has ${theme.story.length} slides`);
  [['icon', theme.icon], ['sticker', theme.sticker.art]].forEach(([where, key]) => {
    if (!raster.has(key)) errors.push(`${theme.id}: ${where} art "${key}" is not raster`);
  });
  theme.story.forEach((slide, index) => {
    (slide.art || []).forEach((key) => {
      if (!raster.has(key)) errors.push(`${theme.id} story ${index + 1}: art "${key}" is not raster`);
    });
    const speech = [slide.narration, slide.success].filter(Boolean).join(' ');
    if (speech.length < 20) errors.push(`${theme.id} story ${index + 1}: narration too short`);
  });
  for (const band of window.AGE_BANDS) {
    const deck = window.getDeck(theme.id, band.id);
    total += deck.length;
    stats.push(`${theme.id}/${band.id}: ${deck.length}`);
    if (deck.length !== band.questions) errors.push(`${theme.id}/${band.id}: expected ${band.questions}, got ${deck.length}`);
    const prompts = new Set();
    deck.forEach((q, i) => {
      const tag = `${theme.id}/${band.id}#${i + 1}`;
      if (!q.id) errors.push(`${tag}: missing id`);
      if (!q.prompt || q.prompt.length < 4) errors.push(`${tag}: weak prompt`);
      if (prompts.has(q.prompt)) errors.push(`${tag}: duplicate prompt "${q.prompt}"`);
      prompts.add(q.prompt);
      if (!q.explain || q.explain.length < 8) errors.push(`${tag}: weak explanation`);
      const ids = q.options.map((o) => o.id);
      if (!ids.includes(q.correct)) errors.push(`${tag}: correct "${q.correct}" not in options`);
      if (new Set(ids).size !== ids.length) errors.push(`${tag}: duplicate option ids`);
      const artKeys = [];
      if (q.count) artKeys.push(['count', q.count.art]);
      if (q.promptArt) artKeys.push(['promptArt', q.promptArt]);
      q.options.forEach((o) => { if (o.art) artKeys.push(['option', o.art]); });
      (q.sequence || []).forEach((s) => { if (s.art) artKeys.push(['sequence', s.art]); });
      artKeys.forEach(([where, key]) => {
        if (!raster.has(key)) errors.push(`${tag}: ${where} art "${key}" is not a raster IMG key`);
        else if (!window.Art.has(key)) errors.push(`${tag}: ${where} art "${key}" unresolved`);
      });
    });
  }
}

window.CURRICULUM.forEach((item) => {
  if (!raster.has(item.icon)) errors.push(`curriculum: icon "${item.icon}" is not raster`);
});

console.log(stats.join('\n'));
console.log(`Total questions: ${total}`);
if (errors.length) {
  console.error(`\n${errors.length} issue(s):`);
  errors.slice(0, 80).forEach((e) => console.error(' - ' + e));
  process.exit(1);
}
console.log('Content OK');
