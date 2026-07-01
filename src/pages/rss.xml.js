import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { articlePath, SITE } from '../lib/site';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  return rss({
    title: `${SITE.name} · ${SITE.title}`,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: articlePath(post.data.publishDate, post.data.slug),
      categories: post.data.tags,
    })),
  });
}
