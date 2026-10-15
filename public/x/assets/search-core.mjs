/** Curated, offline navigation index for the X website. No network dependency. */
export const SEARCH_ITEMS = Object.freeze([
  { title: 'Getting started with X', category: 'Docs', url: '#getting-started', summary: 'Install Rust, clone the private repository and run xc check and xc run.', keywords: 'cargo rust install compiler bootstrap' },
  { title: 'X language overview', category: 'Docs', url: '#language', summary: 'Functions, types, ownership, borrow checking, effects, structs, enums and generics.', keywords: 'syntax let var fn match type semantics' },
  { title: 'Compiler architecture', category: 'Docs', url: '#architecture', summary: 'Lexer, parser, HIR, semantic analysis, reference interpreter and typed Core IR.', keywords: 'pipeline ssa middle end ir lowering verifier' },
  { title: 'Hello X: write a function', category: 'Learn', url: '../learn/index.html#lesson-1', summary: 'Write an X function and return a value.', keywords: 'beginner hello example function parameters' },
  { title: 'Check and run X programs', category: 'Learn', url: '../learn/index.html#lesson-2', summary: 'Use the canonical Rust xc driver to check and execute an example.', keywords: 'cargo terminal run execution check' },
  { title: 'Practice: change the result', category: 'Learn', url: '../learn/index.html#lesson-3', summary: 'Modify an example, make a prediction and test it.', keywords: 'tutorial exercise experiment' },
  { title: 'Implementation status', category: 'Status', url: '../status/index.html', summary: 'See which X language features are implemented, unmerged or planned.', keywords: 'available features roadmap current release' },
  { title: 'Browser playground status', category: 'Status', url: '../status/index.html', summary: 'The browser teaching subset remains an unmerged draft; no public executable site exists.', keywords: 'browser wasm javascript sandbox vscode web mobile' },
  { title: 'Ownership and borrowing', category: 'Language', url: '#language', summary: 'Inspect the implemented subset of affine moves, shared borrows and mutable borrows.', keywords: 'reference memory aliasing safety' },
  { title: 'Types and effects', category: 'Language', url: '#language', summary: 'Learn about types, functions and explicit effect contracts in X.', keywords: 'type checking effects static analysis' },
  { title: 'Governance and contribution', category: 'Community', url: '../community/index.html', summary: 'Review open-source preparation, responsible proposals and contributor expectations.', keywords: 'github rfc review code conduct' },
  { title: 'Donations and sponsorship status', category: 'Community', url: '../community/index.html#funding', summary: 'Funding is not active; no verified donation recipient is available.', keywords: 'funding sponsors donate payments support' },
  { title: 'X AI agents and research', category: 'Research', url: '../ai/index.html', summary: 'Research how coding agents can consume versioned X compiler diagnostics and limited tools.', keywords: 'codex claude gemini kimi grok ai agents MCP' },
]);

const normalized = value => String(value ?? '').normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
const tokens = value => [...new Set(normalized(value).match(/[\p{L}\p{N}]+/gu) ?? [])];

/** Deterministic token-AND search, with a title-first relevance score. */
export function searchDocs(query, limit = 8) {
  const words = tokens(String(query ?? '').slice(0, 120));
  if (words.length === 0 || !Number.isSafeInteger(limit) || limit < 1) return [];
  return SEARCH_ITEMS.map((item, index) => {
    const title = normalized(item.title);
    const category = normalized(item.category);
    const keywords = normalized(item.keywords);
    const summary = normalized(item.summary);
    let score = 0;
    for (const word of words) {
      if (title.includes(word)) score += 12;
      else if (keywords.includes(word)) score += 7;
      else if (category.includes(word)) score += 4;
      else if (summary.includes(word)) score += 2;
      else return null;
    }
    if (title.startsWith(normalized(query).trim())) score += 8;
    return { ...item, score, index };
  }).filter(Boolean).sort((a, b) => b.score - a.score || a.index - b.index).slice(0, Math.min(limit, 12))
    .map(({ index, score, ...item }) => item);
}
