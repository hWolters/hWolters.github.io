import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { getPublicPosts } from '../../lib/posts';
import { ogImagePath, SITE } from '../../lib/site';
import { TOPICS, TOPIC_KEYS } from '../../lib/topics';

function escapeXml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function linesFor(title: string) {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  for (const word of words) {
    const current = lines.at(-1);
    if (!current || `${current} ${word}`.length > 32) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`;
  }
  return lines.slice(0, 4);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublicPosts();
  const titles = [
    `${SITE.name} — ${SITE.tagline}`,
    'Writing',
    'Projects',
    'Page not found',
    ...TOPIC_KEYS.map((topic) => `${TOPICS[topic].label} Articles`),
    ...posts.map((post) => post.data.title),
  ];

  return [...new Set(titles)].map((title) => ({
    params: { slug: ogImagePath(title).split('/').at(-1)?.replace(/\.png$/, '') },
    props: { title },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const titleLines = linesFor(String(props.title));
  const lineMarkup = titleLines.map((line, index) =>
    `<text x="88" y="${290 + index * 92}" font-size="72" font-weight="700" fill="#10233f">${escapeXml(line)}</text>`,
  ).join('');
  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#f5f1e8"/>
    <rect x="0" y="0" width="18" height="630" fill="#df5b3f"/>
    <text x="88" y="126" font-size="30" font-weight="600" fill="#df5b3f">${escapeXml(SITE.name)}</text>
    ${lineMarkup}
    <text x="88" y="574" font-size="25" fill="#536274">${escapeXml(SITE.tagline)}</text>
  </svg>`;
  const png = await sharp(new TextEncoder().encode(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
