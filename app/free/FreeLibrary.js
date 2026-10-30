'use client'

import { useState, useEffect } from 'react'
import { TOPICS, pdfPath } from './topics'
import { TopicIcon, DownloadIcon } from './icons'

const GREEN = '#1D9E75'
const DARK = '#085041'
const CREAM = '#F7F4EF'
const BORDER = '#E8E4DC'
const GRAY = '#5F5E5A'
const LANG_KEY = 'moncho_free_lang'

const T = {
  en: {
    eyebrow: 'Free · No sign-up needed',
    title: 'Try a full Moncho unit study, free.',
    sub: 'Twelve hands-on unit studies made with Moncho. Download the PDF, print it, and let your child start exploring today.',
    langLabel: 'Language of the unit studies',
    unitStudy: 'Unit study',
    meta: 'Ages 7–11 · 10 subjects · 25+ challenges · PDF',
    download: 'Download PDF',
    details: 'See what’s inside',
    insideTitle: 'What’s inside every unit study',
    inside: [
      ['Challenges, not worksheets', 'Every subject comes with hands-on missions to build, measure, cook, move and discover.'],
      ['Fits every child', 'Each challenge has “Make it Easier” and “Level it Up”, so siblings of different ages can share it.'],
      ['Print-ready', 'A clean PDF in English or Spanish, ready for the kitchen table today.'],
    ],
    ctaTitle: 'Your child loves something that’s not on this list?',
    ctaText: 'Moncho creates a unit study about any topic in minutes, in English or Spanish, with local examples from your country.',
    ctaButton: 'Create yours free',
    ctaNote: '2 free unit studies every month. No credit card.',
    suggestTitle: 'Which topic should we add next?',
    suggestText: 'Tell us what your kids are into. We add new free unit studies regularly.',
    suggestPlaceholder: 'e.g. Trains, bees, space…',
    suggestButton: 'Suggest on Instagram',
  },
  es: {
    eyebrow: 'Gratis · Sin registrarte',
    title: 'Prueba una unidad de estudio completa de Moncho, gratis.',
    sub: 'Doce unidades de estudio prácticas hechas con Moncho. Descarga el PDF, imprímelo y deja que tu hijo empiece a explorar hoy.',
    langLabel: 'Idioma de las unidades',
    unitStudy: 'Unidad de estudio',
    meta: '7–11 años · 10 materias · más de 25 desafíos · PDF',
    download: 'Descargar PDF',
    details: 'Ver qué incluye',
    insideTitle: 'Qué trae cada unidad de estudio',
    inside: [
      ['Desafíos, no hojas de trabajo', 'Cada materia trae misiones prácticas para construir, medir, cocinar, moverse y descubrir.'],
      ['Para cada niño', 'Cada desafío trae “Hazlo más fácil” y “Súbele el nivel”, así funciona para hermanos de distintas edades.'],
      ['Lista para imprimir', 'Un PDF claro, en español o inglés, para usar hoy mismo en la mesa de la cocina.'],
    ],
    ctaTitle: '¿A tu hijo le encanta algo que no está en la lista?',
    ctaText: 'Moncho crea una unidad de estudio sobre cualquier tema en minutos, en español o inglés, con ejemplos de tu país.',
    ctaButton: 'Crea la tuya gratis',
    ctaNote: '2 unidades de estudio gratis cada mes. Sin tarjeta de crédito.',
    suggestTitle: '¿Qué tema agregamos después?',
    suggestText: 'Cuéntanos qué le apasiona a tus hijos. Agregamos nuevas unidades gratis con frecuencia.',
    suggestPlaceholder: 'Ej.: trenes, abejas, el espacio…',
    suggestButton: 'Sugerir en Instagram',
  },
}

export default function FreeLibrary() {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LANG_KEY)
      if (saved === 'es' || saved === 'en') setLang(saved)
    } catch { /* storage blocked: stay in English */ }
  }, [])

  function pick(l) {
    setLang(l)
    try { window.localStorage.setItem(LANG_KEY, l) } catch { /* ignore */ }
  }

  const t = T[lang]

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', background: CREAM }}>
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 24px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 18 }}>
        <p style={{ margin: 0, background: '#E8F7F2', color: DARK, fontSize: 14, fontWeight: 700, padding: '8px 16px', borderRadius: 100 }}>{t.eyebrow}</p>
        <h1 style={{ margin: 0, fontSize: 'clamp(34px, 6vw, 56px)', lineHeight: 1.1, maxWidth: 820 }}>{t.title}</h1>
        <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: GRAY, maxWidth: 640 }}>{t.sub}</p>
        <div role="group" aria-label={t.langLabel} style={{ display: 'flex', gap: 6, background: 'white', border: `1px solid ${BORDER}`, padding: 6, borderRadius: 100, marginTop: 6 }}>
          {[['en', 'English'], ['es', 'Español']].map(([code, label]) => (
            <button key={code} type="button" onClick={() => pick(code)} aria-pressed={lang === code} style={{
              minHeight: 44, padding: '0 22px', border: 'none', borderRadius: 100, cursor: 'pointer',
              background: lang === code ? GREEN : 'transparent', color: lang === code ? 'white' : GRAY,
              fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: lang === code ? 700 : 400,
            }}>{label}</button>
          ))}
        </div>
      </section>

      <section aria-label={t.title} style={{ maxWidth: 1120, margin: '0 auto', padding: '8px 24px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
          {TOPICS.map(topic => {
            const c = topic[lang]
            const teasers = (topic[lang].teasers || []).slice(0, 2)
            return (
              <article key={topic.slug} style={{ background: 'white', border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: topic.color, color: 'white', padding: 22, minHeight: 210, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 8 }}>
                  <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'auto' }}>
                    <TopicIcon slug={topic.slug} />
                  </div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.9 }}>{t.unitStudy}</p>
                  <h2 style={{ margin: 0, fontSize: 30, lineHeight: 1.1 }}>{c.title}</h2>
                  <p style={{ margin: 0, fontSize: 14, opacity: 0.95 }}>{c.hook}</p>
                </div>
                <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 14, flexGrow: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, color: GRAY }}>{t.meta}</p>
                  {teasers.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 15, lineHeight: 1.4, flexGrow: 1 }}>
                      {teasers.map(x => <li key={x}>{x}</li>)}
                    </ul>
                  )}
                  <a href={pdfPath(topic.slug, lang)} download style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 48, background: GREEN, color: 'white', textDecoration: 'none', fontWeight: 700, fontSize: 15, borderRadius: 100 }}>
                    <DownloadIcon /> {t.download}
                  </a>
                  <a href={`/free/${topic.slug}`} style={{ textAlign: 'center', fontSize: 14, color: DARK }}>{t.details}</a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section style={{ background: 'white', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '52px 24px', display: 'flex', flexDirection: 'column', gap: 26 }}>
          <h2 style={{ margin: 0, fontSize: 30, textAlign: 'center' }}>{t.insideTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 22 }}>
            {t.inside.map(([title, text]) => (
              <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 22, borderRadius: 16, background: CREAM }}>
                <h3 style={{ margin: 0, fontSize: 19, color: DARK }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: GRAY }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ background: DARK, color: 'white', borderRadius: 24, padding: '46px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(26px, 4vw, 38px)', lineHeight: 1.15, maxWidth: 720 }}>{t.ctaTitle}</h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, maxWidth: 620, color: '#D6EFE6' }}>{t.ctaText}</p>
          <a href="/login" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 52, padding: '0 30px', background: 'white', color: DARK, textDecoration: 'none', fontWeight: 700, fontSize: 17, borderRadius: 100 }}>{t.ctaButton}</a>
          <p style={{ margin: 0, fontSize: 14, color: '#D6EFE6' }}>{t.ctaNote}</p>
        </div>
      </section>

      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
        <h2 style={{ margin: 0, fontSize: 26 }}>{t.suggestTitle}</h2>
        <p style={{ margin: 0, fontSize: 16, color: GRAY }}>{t.suggestText}</p>
        <a href="https://www.instagram.com/monchounschooling/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 48, padding: '0 24px', background: 'white', color: DARK, border: `2px solid ${GREEN}`, borderRadius: 100, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>{t.suggestButton}</a>
      </section>
    </div>
  )
}
