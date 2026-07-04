import { getCollection } from 'astro:content';

export const isPublicPost = ({ data }: { data: { draft: boolean; hidden: boolean } }) =>
  !data.draft && !data.hidden;

export async function getPublicPosts() {
  return (await getCollection('blog', isPublicPost)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}
