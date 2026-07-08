import assert from 'node:assert/strict';
import test from 'node:test';
import { extractIntroduction, getRelatedPosts, groupPostsByYear } from '../src/lib/article-discovery.ts';

test('extracts the first Markdown paragraph', () => {
  assert.equal(
    extractIntroduction('First paragraph across\ntwo lines.\n\nSecond paragraph.'),
    'First paragraph across two lines.',
  );
});

test('skips headings and removes inline Markdown', () => {
  assert.equal(
    extractIntroduction('## Introduction\n\nA **useful** [linked idea](https://example.com).\n\nMore.'),
    'A useful linked idea.',
  );
});

test('extracts the first paragraph from legacy HTML', () => {
  assert.equal(
    extractIntroduction('<div class="legacy-content"><style>p { color: red; }</style><p>Legacy <strong>opening</strong>.</p><p>Later.</p></div>'),
    'Legacy opening.',
  );
});

function post(slug, topic, date, tags = [], relatedSlugs = []) {
  return {
    body: '',
    data: { slug, topic, tags, relatedSlugs, publishDate: new Date(date) },
  };
}

test('groups posts by year in input order', () => {
  const grouped = groupPostsByYear([
    post('new', 'ai', '2026-01-01'),
    post('same-year', 'data', '2026-01-01'),
    post('old', 'data', '2025-01-01'),
  ]);
  assert.deepEqual(grouped.map(({ year, posts }) => [year, posts.map(({ data }) => data.slug)]), [
    [2026, ['new', 'same-year']],
    [2025, ['old']],
  ]);
});

test('selects related articles deterministically and honors overrides', () => {
  const current = post('current', 'ai', '2026-01-01', ['Agents'], ['manual']);
  const posts = [
    current,
    post('manual', 'data', '2020-01-01'),
    post('newer-topic', 'ai', '2025-01-01'),
    post('shared-tag', 'ai', '2024-01-01', ['agents']),
    post('other', 'data', '2026-01-01'),
  ];
  assert.deepEqual(
    getRelatedPosts(current, posts).map(({ data }) => data.slug),
    ['manual', 'shared-tag', 'newer-topic'],
  );
});

test('rejects unknown and self-referential overrides', () => {
  const unknown = post('current', 'ai', '2026-01-01', [], ['missing']);
  assert.throws(() => getRelatedPosts(unknown, [unknown]), /unknown related article/);
  const self = post('current', 'ai', '2026-01-01', [], ['current']);
  assert.throws(() => getRelatedPosts(self, [self]), /cannot relate to itself/);
});
