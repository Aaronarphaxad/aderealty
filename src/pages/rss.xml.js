import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  return rss({
    title: 'Westend',
    description: 'Market notes and buying and selling advice from Westend.',
    site: context.site,
    items: posts
      .sort(
        (a, b) =>
          new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf(),
      )
      .map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: new Date(post.data.pubDate),
        link: `/blog/posts/${post.id}/`,
      })),
  });
}
