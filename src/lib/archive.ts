import { getPublicPosts } from './posts';

export const ARCHIVE_PAGE_SIZE = 5;

export async function getArchivePosts() {
  return getPublicPosts();
}
