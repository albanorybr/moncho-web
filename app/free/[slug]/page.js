import { notFound } from 'next/navigation'
import { TOPICS, getTopic, pdfPath } from '../topics'
import { TopicIcon, DownloadIcon } from '../icons'
import { FreeHeader, FreeFooter } from '../SiteChrome'

const GREEN = '#1D9E75'
const DARK = '#085041'
const CREAM = '#F7F4EF'
const BORDER = '#E8E4DC'
const GRAY = '#5F5E5A'
const SITE = 'https://www.monchounschooling.com'

export function generateStaticParams() {
  return TOPICS.map(t => ({ slug: t.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) return {}
  const title = `Free ${topic.en.title} Unit Study for Kids (Ages 7–11) | Moncho`
  const description = `Download a free, print-ready ${topic.en.title.toLowerCase()} unit study for homeschool: 10 subjects and 25+ hands-on challenges. In English or Spanish (${topic.es.title}).`
  return {
    title,
    description,
    alternates: { canonical: `${SITE}/free/${slug}` },
    openGraph: { title, description, url: `${SITE}/free/${slug}`, type: 'article' },
  }
}

function Downloads({ topic }) {
  const btn = (href, label) => (
    <a href={href} download style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 50,
      padding: '0 24px', background: 'white', color: DARK, textDecoration: 'none', fontWeight: 700,
      fontSize: 16, borderRadius: 100,
    }}><DownloadIcon /> {label}</a>
  )
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {btn(pdfPath(topic.slug, 'en'), 'Download PDF · English')}
      {btn(pdfPath(topic.slug, 'es'), 'Descargar PDF · Español')}
    </div>
  )
}

function Section({ lang, topic }) {
  const c = topic[lang]
  const es = lang === 'es'
  const subjects = c.subjects || []
  const teasers = c.teasers || []
  return (
    <section lang={lang} style={{ background: 'white', border: `1px solid ${BORDER}`, borderRadius: 20, padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h2 style={{ margin: 0, fontSize: 26 }}>
        {es ? `Dentro de la unidad: ${c.title}` : `Inside the unit study: ${c.title}`}
      </h2>
      {c.intro && <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: '#333' }}>{c.intro}</p>}
      {subjects.length > 0 && (
        <div>
          <h3 style={{ margin: '0 0 10px', fontSize: 17, color: DARK }}>{es ? 'Las 10 materias' : 'The 10 subjects'}</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {subjects.map(s => (
              <li key={s} style={{ padding: '6px 14px', borderRadius: 100, background: CREAM, border: `1px solid ${BORDER}`, fontSize: 14 }}>{s}</li>
            ))}
          </ul>
        </div>
      )}
      {teasers.length > 0 && (
        <div>
          <h3 style={{ margin: '0 0 10px', fontSize: 17, color: DARK }}>{es ? 'Algunos desafíos' : 'A few of the challenges'}</h3>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 16, lineHeight: 1.45 }}>
            {teasers.map(x => <li key={x}>{x}</li>)}
          </ul>
        </div>
      )}
      <a href={pdfPath(topic.slug, lang)} download style={{
        alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 48,
        padding: '0 24px', background: GREEN, color: 'white', textDecoration: 'none', fontWeight: 700,
        fontSize: 15, borderRadius: 100,
      }}><DownloadIcon /> {es ? 'Descargar PDF gratis' : 'Download the free PDF'}</a>
    </section>
  )
}

export default async function FreeTopicPage({ params }) {
  const { slug } = await params
  const topic = getTopic(slug)
  if (!topic) notFound()
  const others = TOPICS.filter(t => t.slug !== slug)

  return (
    <div style={{ background: CREAM, minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1A1A1A' }}>
      <FreeHeader />
      <main>
        <section style={{ background: topic.color, color: 'white' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px 44px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a href="/free" style={{ color: 'white', fontSize: 14, opacity: 0.9 }}>← All free unit studies</a>
            <div style={{ width: 72, height: 72, borderRadius: 18, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TopicIcon slug={topic.slug} size={42} />
            </div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.9 }}>Free unit study · Ages 7–11</p>
            <h1 style={{ margin: 0, fontSize: 'clamp(34px, 6vw, 54px)', lineHeight: 1.08 }}>{topic.en.title} Unit Study</h1>
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.5, maxWidth: 680 }}>{topic.en.hook} 10 subjects, 25+ hands-on challenges, print-ready. Also in Spanish: <span lang="es">{topic.es.title}</span>.</p>
            <Downloads topic={topic} />
          </div>
        </section>

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Section lang="en" topic={topic} />
          <Section lang="es" topic={topic} />

          <section style={{ background: DARK, color: 'white', borderRadius: 22, padding: '40px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14 }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 34px)', lineHeight: 1.2, maxWidth: 680 }}>Make one about anything your child loves</h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, maxWidth: 600, color: '#D6EFE6' }}>Moncho creates a unit study on any topic in minutes, in English or Spanish. 2 free every month, no credit card.</p>
            <a href="/login" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 52, padding: '0 30px', background: 'white', color: DARK, textDecoration: 'none', fontWeight: 700, fontSize: 17, borderRadius: 100 }}>Create yours free</a>
          </section>

          <section aria-labelledby="more" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2 id="more" style={{ margin: 0, fontSize: 24 }}>More free unit studies</h2>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {others.map(t => (
                <li key={t.slug}>
                  <a href={`/free/${t.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, padding: '0 16px', background: 'white', border: `1px solid ${BORDER}`, borderRadius: 100, color: '#1A1A1A', textDecoration: 'none', fontSize: 15 }}>
                    <span style={{ color: t.color, display: 'inline-flex' }}><TopicIcon slug={t.slug} size={20} /></span>
                    {t.en.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <FreeFooter />
    </div>
  )
}
