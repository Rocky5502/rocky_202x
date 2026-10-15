import { searchDocs } from './search-core.mjs';

const input = document.querySelector('[data-docs-query]');
const results = document.querySelector('[data-docs-results]');
const status = document.querySelector('[data-docs-status]');
const form = document.querySelector('[data-docs-search]');

if (input && results && status && form) {
  function render() {
    const query = input.value.trim();
    const items = searchDocs(query);
    results.replaceChildren();
    if (!query) {
      status.textContent = 'Search the documentation and learning guides.';
      return;
    }
    status.textContent = items.length ? String(items.length) + (items.length === 1 ? ' result' : ' results') + ' for your search.' : 'No matching documentation found.';
    for (const item of items) {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.url; // URLs originate exclusively from the static, curated index.
      link.className = 'search-result';
      const title = document.createElement('strong');
      title.textContent = item.title;
      const category = document.createElement('span');
      category.className = 'search-category';
      category.textContent = item.category;
      const summary = document.createElement('span');
      summary.className = 'search-description';
      summary.textContent = item.summary;
      link.append(title, category, summary);
      li.append(link);
      results.append(li);
    }
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    render();
    results.querySelector('a')?.focus();
  });
  input.addEventListener('input', render);
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      input.focus();
      input.select();
    }
    if (event.key === 'Escape' && document.activeElement === input) {
      input.value = '';
      render();
    }
  });
  render();
}
