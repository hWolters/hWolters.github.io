import { getCollection } from 'astro:content';
import { getRelatedPosts } from './article-discovery';

export const isPublicPost = ({ data }: { data: { draft: boolean; hidden: boolean } }) =>
  !data.draft && !data.hidden;

export async function getPublicPosts() {
  const posts = (await getCollection('blog', isPublicPost)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
  for (const post of posts) getRelatedPosts(post, posts);
  return posts;
}
