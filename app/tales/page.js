'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const API_URL = 'https://moncho-api-production-2c00.up.railway.app'

const GREEN = '#1D9E75'
const DARK = '#085041'
const CREAM = '#F7F4EF'
const BORDER = '#E8E4DC'
const GRAY = '#5F5E5A'

const AGE_RANGES = [
  { id: '5-7', label: '🌱 5-7 years' },
  { id: '7-11', label: '📚 7-11 years' },
  { id: '12-15', label: '🔬 12-15 years' },
]

export default function TalesPage() {
  const [theme, setTheme] = useState('')
  const [age, setAge] = useState('7-11')
  const [language, setLanguage] = useState('English')
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isPro, setIsPro] = useState(null)
  const [tales, setTales] = useState([])

  async function loadTales(token) {
    try {
      const res = await fetch(`${API_URL}/tales`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const data = await res.json()
      setTales(data.tales || [])
    } catch (e) { /* ignore */ }
  }

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/login'; return }
      try {
        const res = await fetch(`${API_URL}/billing/status`, {
          headers: { 'Authorization': `Bearer ${session.access_token}` },
        })
        const data = await res.json()
        setIsPro(data.plan === 'pro')
      } catch (e) { setIsPro(false) }
      loadTales(session.access_token)
    }
    init()
  }, [])

  async function handleGenerate() {
    if (!theme.trim()) { setError('Please enter a theme!'); return }
    setError('')
    setStatus('loading')
    setProgress([])
    setResult(null)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { window.location.href = '/login'; return }

    try {
      const res = await fetch(`${API_URL}/generate-tale`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ theme, age, language }),
      })
      if (res.status === 403) {
        const d = await res.json()
        setError(d.message || 'Tales are a Pro feature.')
        setStatus('idle')
        return
      }
      const data = await res.json()
      if (!data.job_id) {
        setError(data.error || 'Could not start. Please try again.')
        setStatus('idle')
        return
      }
      setStatus('polling')
      const poll = setInterval(async () => {
        try {
          const sRes = await fetch(`${API_URL}/status/${data.job_id}`)
          const s = await sRes.json()
          if (s.progress) setProgress(s.progress)
          if (s.status === 'done') {
            clearInterval(poll)
            setResult(s.result)
            setStatus('done')
            loadTales(session.access_token)
          } else if (s.status === 'error') {
            clearInterval(poll)
            setError(s.error || 'Something went wrong.')
            setStatus('idle')
          }
        } catch (e) { /* ignore poll errors */ }
      }, 3000)
    } catch (e) {
      setError('Could not connect. Please try again.')
      setStatus('idle')
    }
  }

  async function openTale(taleId) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { window.location.href = '/login'; return }
    const res = await fetch(`${API_URL}/tale-pdf/${taleId}`, {
      headers: { 'Authorization': `Bearer ${session.access_token}` },
    })
    if (!res.ok) { alert('Could not open the tale. Please try again.'); return }
    const blob = await res.blob()
    window.open(URL.createObjectURL(blob), '_blank')
  }

  const busy = status === 'loading' || status === 'polling'

  return (
    <main style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Georgia, serif' }}>

      {/* NAV */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 48px', background: 'white', borderBottom: `1px solid ${BORDER}`,
      }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 700, color: GREEN, textDecoration: 'none' }}>
          🐱 Moncho
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/generate" style={{
            background: GREEN, color: 'white', padding: '8px 20px',
            borderRadius: '100px', textDecoration: 'none', fontSize: '14px', fontWeight: 700,
          }}>
            + New Study
          </a>
          <a href="/dashboard" style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>My Studies</a>
          <a href="/account" style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>⭐ My Plan</a>
        </div>
      </nav>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 24px' }}>

        <h1 style={{ fontSize: '34px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '8px' }}>
          📖 Living Tales
        </h1>
        <p style={{ color: GRAY, fontSize: '16px', marginBottom: '32px', lineHeight: 1.7 }}>
          A short illustrated story about any theme your child loves —
          written and painted just for them, ready in a few minutes.
        </p>

        {isPro === false && (
          <div style={{
            background: DARK, borderRadius: '20px', padding: '32px',
            color: 'white', marginBottom: '32px',
          }}>
            <p style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              ✨ Tales are a Pro feature
            </p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              Pro families create up to 10 illustrated tales per month —
              plus unlimited unit studies, all modes, and email delivery.
            </p>
            <a href="/pricing" style={{
              display: 'inline-block', background: 'white', color: GREEN,
              padding: '12px 28px', borderRadius: '100px',
              textDecoration: 'none', fontWeight: 700, fontSize: '15px',
            }}>
              🌟 Upgrade to Pro →
            </a>
          </div>
        )}

        {/* FORM */}
        <div style={{
          background: 'white', borderRadius: '20px', padding: '28px',
          border: `1px solid ${BORDER}`, marginBottom: '28px',
          opacity: isPro === false ? 0.55 : 1,
        }}>
          <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
            🌟 What should the tale be about?
          </label>
          <input
            type="text"
            placeholder="e.g. A brave little volcano, Butterflies, The ocean at night..."
            value={theme}
            onChange={e => setTheme(e.target.value)}
            disabled={isPro === false}
            style={{
              width: '100%', padding: '14px 16px', borderRadius: '12px',
              border: `2px solid ${BORDER}`, fontSize: '16px',
              fontFamily: 'Georgia, serif', boxSizing: 'border-box', marginBottom: '20px',
            }}
          />

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {AGE_RANGES.map(a => (
              <button key={a.id} onClick={() => setAge(a.id)} disabled={isPro === false} style={{
                padding: '10px 18px', borderRadius: '100px', cursor: 'pointer',
                border: `2px solid ${age === a.id ? GREEN : BORDER}`,
                background: age === a.id ? '#E8F7F2' : 'white',
                color: age === a.id ? DARK : GRAY,
                fontWeight: age === a.id ? 700 : 400,
                fontSize: '14px', fontFamily: 'Georgia, serif',
              }}>
                {a.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            {['English', 'Español'].map(lang => (
              <button key={lang} onClick={() => setLanguage(lang)} disabled={isPro === false} style={{
                padding: '10px 22px', borderRadius: '100px', cursor: 'pointer',
                border: `2px solid ${language === lang ? GREEN : BORDER}`,
                background: language === lang ? GREEN : 'white',
                color: language === lang ? 'white' : GRAY,
                fontWeight: language === lang ? 700 : 400,
                fontSize: '14px', fontFamily: 'Georgia, serif',
              }}>
                {lang === 'English' ? '🇺🇸 English' : '🇬🇹 Español'}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={busy || isPro === false}
            style={{
              width: '100%', background: busy ? GRAY : GREEN, color: 'white',
              padding: '16px', borderRadius: '100px', border: 'none',
              fontSize: '17px', fontWeight: 700,
              cursor: busy || isPro === false ? 'not-allowed' : 'pointer',
              fontFamily: 'Georgia, serif',
            }}
          >
            {busy ? '📖 Creating your tale...' : '✨ Create the tale'}
          </button>

          {error && (
            <p style={{ color: '#E8522A', fontSize: '14px', marginTop: '12px' }}>{error}</p>
          )}
        </div>

        {/* PROGRESS */}
        {busy && (
          <div style={{
            background: 'white', borderRadius: '16px', padding: '28px',
            border: `2px solid ${GREEN}`, marginBottom: '28px',
          }}>
            <img
              src="/moncho-cat.gif"
              alt="Moncho is working"
              onError={e => { e.currentTarget.style.display = 'none' }}
              style={{ width: '140px', display: 'block', margin: '0 auto 12px auto' }}
            />
            <p style={{ fontWeight: 700, color: DARK, fontSize: '16px', textAlign: 'center', marginBottom: '16px' }}>
              🐱 Moncho is writing and painting...
            </p>
            {progress.length > 0 ? progress.map((p, i) => (
              <p key={i} style={{
                color: i === progress.length - 1 ? DARK : GREEN,
                fontWeight: i === progress.length - 1 ? 700 : 400,
                fontSize: '14px', marginBottom: '4px',
              }}>
                {i === progress.length - 1 ? '➡️ ' : '✅ '}{p}
              </p>
            )) : (
              <p style={{ color: GRAY, fontSize: '13px', textAlign: 'center' }}>⏳ Warming up the paintbrushes...</p>
            )}
          </div>
        )}

        {/* DONE */}
        {status === 'done' && result && (
          <div style={{
            background: '#E8F7F2', borderRadius: '16px', padding: '24px',
            border: `2px solid ${GREEN}`, marginBottom: '28px', textAlign: 'center',
          }}>
            <p style={{ fontWeight: 700, color: DARK, fontSize: '18px', marginBottom: '12px' }}>
              🎉 "{result.title}" is ready!
            </p>
            <button onClick={() => openTale(result.tale_id)} style={{
              background: DARK, color: 'white', padding: '14px 32px',
              borderRadius: '100px', border: 'none', fontSize: '16px',
              fontWeight: 700, cursor: 'pointer', fontFamily: 'Georgia, serif',
            }}>
              📖 Open your tale
            </button>
            <p style={{ color: GRAY, fontSize: '12px', marginTop: '10px' }}>
              Also sent to your email 💌
            </p>
          </div>
        )}

        {/* PREVIOUS TALES */}
        {tales.length > 0 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1A1A', marginBottom: '16px' }}>
              Your tales
            </h2>
            {tales.map(t => (
              <div key={t.id} style={{
                background: 'white', borderRadius: '14px', padding: '18px 22px',
                border: `1px solid ${BORDER}`, marginBottom: '10px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
              }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '15px', color: '#1A1A1A', marginBottom: '2px' }}>
                    {t.title || t.theme}
                  </p>
                  <p style={{ color: GRAY, fontSize: '12px' }}>
                    {t.language} · {new Date(t.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button onClick={() => openTale(t.id)} style={{
                  background: DARK, color: 'white', padding: '10px 18px',
                  borderRadius: '12px', border: 'none', fontSize: '13px',
                  fontWeight: 700, cursor: 'pointer', fontFamily: 'Georgia, serif',
                  whiteSpace: 'nowrap',
                }}>
                  📖 Open
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}
