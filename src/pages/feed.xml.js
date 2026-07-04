import rss from '@astrojs/rss';
import { getPublicPosts } from '../lib/posts';
import { articlePath, SITE } from '../lib/site';

export async function GET(context) {
  const posts = await getPublicPosts();

  return rss({
    title: `${SITE.name} — ${SITE.tagline}`,
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
