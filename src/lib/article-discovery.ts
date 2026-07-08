import { load } from 'cheerio';
import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

function normalizeText(value: string): string {
  return load(`<div>${value}</div>`)('div').first().text().replace(/\s+/g, ' ').trim();
}

function markdownToText(value: string): string {
  return normalizeText(
    value
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[`*_~]/g, '')
      .replace(/^>\s?/gm, ''),
  );
}

export function extractIntroduction(body: string): string {
  if (/^\s*<(?:article|div|p|style)\b/i.test(body)) {
    const $ = load(body);
    const paragraph = $('p').toArray().map((element) => $(element).text().replace(/\s+/g, ' ').trim())
      .find(Boolean);
    if (paragraph) return paragraph;
  }

  const lines = body.replace(/\r\n/g, '\n').split('\n');
  let inFence = false;
  let inHtmlBlock = false;
  let paragraph: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    if (!paragraph.length && /^<(figure|div|style|table|picture)\b/i.test(line)) {
      inHtmlBlock = !new RegExp(`</${line.match(/^<(\w+)/)?.[1]}>`, 'i').test(line);
      continue;
    }
    if (inHtmlBlock) {
      if (/<\/(figure|div|style|table|picture)>/i.test(line)) inHtmlBlock = false;
      continue;
    }
    if (!paragraph.length && (!line || /^#{1,6}\s/.test(line) || /^---+$/.test(line))) continue;
    if (!line) break;
    paragraph.push(line);
  }

  return markdownToText(paragraph.join(' '));
}

export function groupPostsByYear(posts: Post[]): Array<{ year: number; posts: Post[] }> {
  const groups = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.publishDate.getUTCFullYear();
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups].map(([year, groupedPosts]) => ({ year, posts: groupedPosts }));
}

function normalizeTag(tag: string): string {
  return tag.trim().toLocaleLowerCase('en');
}

export function getRelatedPosts(post: Post, allPosts: Post[], limit = 3): Post[] {
  const bySlug = new Map(allPosts.map((candidate) => [candidate.data.slug, candidate]));
  const selected: Post[] = [];

  for (const slug of post.data.relatedSlugs) {
    if (slug === post.data.slug) throw new Error(`Article ${slug} cannot relate to itself.`);
    const related = bySlug.get(slug);
    if (!related) throw new Error(`Article ${post.data.slug} references unknown related article ${slug}.`);
    if (!selected.some((candidate) => candidate.data.slug === slug)) selected.push(related);
  }

  const tags = new Set(post.data.tags.map(normalizeTag));
  const candidates = allPosts
    .filter((candidate) => candidate.data.slug !== post.data.slug)
    .filter((candidate) => !selected.some((item) => item.data.slug === candidate.data.slug))
    .map((candidate) => ({
      candidate,
      score: (candidate.data.topic === post.data.topic ? 100 : 0)
        + candidate.data.tags.filter((tag) => tags.has(normalizeTag(tag))).length * 10,
    }))
    .sort((a, b) => b.score - a.score
      || b.candidate.data.publishDate.valueOf() - a.candidate.data.publishDate.valueOf()
      || a.candidate.data.slug.localeCompare(b.candidate.data.slug));

  return [...selected, ...candidates.map(({ candidate }) => candidate)].slice(0, limit);
}
