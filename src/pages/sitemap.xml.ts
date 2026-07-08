import type { APIRoute } from 'astro';
import { getPublicPosts } from '../lib/posts';
import { absoluteUrl, articlePath } from '../lib/site';

const escapeXml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export const GET: APIRoute = async () => {
  const posts = await getPublicPosts();
  const latestModified = posts.reduce(
    (latest, post) => Math.max(latest, (post.data.updatedDate ?? post.data.publishDate).valueOf()),
    0,
  );
  const commonLastmod = latestModified ? new Date(latestModified).toISOString() : undefined;
  const entries = [
    { path: '/', lastmod: commonLastmod },
    { path: '/archive/', lastmod: commonLastmod },
    { path: '/projects/' },
    ...posts.map((post) => ({
      path: articlePath(post.data.publishDate, post.data.slug),
      lastmod: (post.data.updatedDate ?? post.data.publishDate).toISOString(),
    })),
  ];

  const urls = entries.map(({ path, lastmod }) => [
    '  <url>',
    `    <loc>${escapeXml(absoluteUrl(path))}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod.slice(0, 10)}</lastmod>`] : []),
    '  </url>',
  ].join('\n')).join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
