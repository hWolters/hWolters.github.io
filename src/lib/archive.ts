import { getCollection } from 'astro:content';

export const ARCHIVE_PAGE_SIZE = 5;

export async function getArchivePosts() {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}
