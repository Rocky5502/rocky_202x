import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const code = readFileSync(new URL('../public/x/assets/site.js', import.meta.url), 'utf8');

function createPage({ clipboard, canSelect = true, label = 'Copy code' } = {}) {
  const attributes = new Map([['aria-label', label]]);
  const listeners = new Map();
  const selection = {
    cleared: false, added: false,
    removeAllRanges() { this.cleared = true; },
    addRange() { this.added = true; },
  };
  const range = {
    selected: false,
    selectNodeContents(node) {
      assert.equal(node, target);
      this.selected = true;
    },
  };
  const target = { textContent: 'fn main() -> i32 { return 42; }' };
  const button = {
    dataset: { copyTarget: 'source' },
    textContent: 'Copy code',
    getAttribute(name) { return attributes.get(name) ?? null; },
    setAttribute(name, value) { attributes.set(name, value); },
    removeAttribute(name) { attributes.delete(name); },
    addEventListener(name, callback) { listeners.set(name, callback); },
  };
  const callbacks = [];
  const document = {
    documentElement: { dataset: {} },
    querySelectorAll(selector) { return selector === '[data-copy-target]' ? [button] : []; },
    querySelector() { return null; },
    getElementById(id) { return id === 'source' ? target : null; },
    createRange: canSelect ? () => range : undefined,
    getSelection: canSelect ? () => selection : undefined,
  };
  runInNewContext(code, {
    document,
    navigator: clipboard === undefined ? {} : { clipboard },
    localStorage: { getItem() { return null; } },
    setTimeout(callback) { callbacks.push(callback); },
  }, { filename: 'site.js' });
  return { button, attributes, selection, range,
    async click() { await listeners.get('click')(); },
    restore() { callbacks.forEach(fn => fn()); },
  };
}

test('copy success writes exact source and restores original accessible name', async () => {
  const written = [];
  const page = createPage({
    clipboard: { async writeText(text) { written.push(text); } },
    label: 'Copy first example',
  });
  await page.click();
  assert.deepEqual(written, ['fn main() -> i32 { return 42; }']);
  assert.equal(page.button.textContent, 'Copied');
  assert.equal(page.attributes.get('aria-label'), 'Code copied to clipboard');
  page.restore();
  assert.equal(page.button.textContent, 'Copy code');
  assert.equal(page.attributes.get('aria-label'), 'Copy first example');
});

test('missing clipboard API selects actual source text for manual copy', async () => {
  const page = createPage();
  await page.click();
  assert.equal(page.range.selected, true);
  assert.equal(page.selection.cleared, true);
  assert.equal(page.selection.added, true);
  assert.match(page.attributes.get('aria-label'), /selected/i);
  page.restore();
  assert.equal(page.button.textContent, 'Copy code');
});

test('rejected clipboard promise still selects code and preserves accessible name', async () => {
  const page = createPage({
    clipboard: { async writeText() { throw Error('Clipboard denied'); } },
    label: 'Copy second example',
  });
  await page.click();
  assert.equal(page.range.selected, true);
  assert.equal(page.selection.added, true);
  page.restore();
  assert.equal(page.attributes.get('aria-label'), 'Copy second example');
});

test('when selection is unavailable, fallback does not claim text was selected', async () => {
  const page = createPage({ canSelect: false });
  await page.click();
  assert.match(page.button.textContent, /select code manually/i);
  assert.doesNotMatch(page.attributes.get('aria-label'), /code selected/i);
});
