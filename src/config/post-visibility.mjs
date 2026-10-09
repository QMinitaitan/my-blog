// Set false to restore all non-draft articles. Source files and assets stay intact.
export const focusHot100 = true;
export function isPublicPost({ slug, data }) {
  return data.draft !== true && (!focusHot100 || slug.startsWith('leetcode-hot100-'));
}
