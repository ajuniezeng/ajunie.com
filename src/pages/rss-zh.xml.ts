import { SITE } from '@/constants'
import { useTranslations } from '@/i18n/utils';
import { getPosts } from '@/lib/utils'
import rss from '@astrojs/rss'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  try {
    const lang = 'zh';
    const posts = await getPosts(lang);
    const translation = useTranslations(lang);

    return rss({
      title: SITE.TITLE,
      description: translation('layout.defaultDescription'),
      site: context.site ?? SITE.SITE_URL,
      items: posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.date,
        link: `/${lang}/articles/${post.id}/`,
      })),
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new Response('Error generating RSS feed', { status: 500 })
  }
}