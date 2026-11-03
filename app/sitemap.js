import { TOPICS } from './free/topics'

const SITE = 'https://www.monchounschooling.com'

export default function sitemap() {
  const now = new Date()
  return [
    { url: SITE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/free`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...TOPICS.map(t => ({ url: `${SITE}/free/${t.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 })),
    { url: `${SITE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/resources`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/tales`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]
}
