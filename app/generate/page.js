'use client'

import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

const API_URL = 'https://moncho-api-production-2c00.up.railway.app'

const AGE_RANGES = [
  { id: '5-7', label: '🌱 Early Childhood', desc: '5-7 years' },
  { id: '7-11', label: '📚 Elementary', desc: '7-11 years' },
  { id: '12-15', label: '🔬 Middle School', desc: '12-15 years' },
  { id: '15-18', label: '🎓 High School', desc: '15-18 years' },
]

const PHILOSOPHIES = [
  { id: 'moncho', emoji: '🐱', label: 'Moncho Style', desc: 'Hands-on, curiosity-driven, project-based' },
  { id: 'montessori', emoji: '🌱', label: 'Montessori', desc: 'Child-led, self-paced, prepared environment' },
  { id: 'charlotte_mason', emoji: '📖', label: 'Charlotte Mason', desc: 'Living books, narration, nature study' },
  { id: 'waldorf', emoji: '🌿', label: 'Waldorf', desc: 'Artistic, imaginative, developmental stages' },
  { id: 'forest_school', emoji: '🌲', label: 'Forest School', desc: 'Outdoor learning, nature connection' },
  { id: 'unschooling', emoji: '🌎', label: 'Unschooling', desc: 'Child-led, interest-based, no fixed curriculum' },
]

const SUBJECTS = [
  { id: 'Science', emoji: '🔬', color: '#1D9E75' },
  { id: 'Biology', emoji: '🧬', color: '#2E7D32' },
  { id: 'Chemistry', emoji: '⚗️', color: '#6A1B9A' },
  { id: 'Physics', emoji: '⚡', color: '#1565C0' },
  { id: 'Earth Science', emoji: '🌍', color: '#4E342E' },
  { id: 'Astronomy', emoji: '🌌', color: '#1A237E' },
  { id: 'Math', emoji: '📊', color: '#2E86C1' },
  { id: 'Language Arts', emoji: '📖', color: '#7D3C98' },
  { id: 'Geography', emoji: '🗺️', color: '#0277BD' },
  { id: 'History', emoji: '📜', color: '#F0A500' },
  { id: 'Art & Creativity', emoji: '🎨', color: '#E8522A' },
  { id: 'Music', emoji: '🎵', color: '#C2185B' },
  { id: 'Movement & Body', emoji: '🏃', color: '#00796B' },
  { id: 'Critical Thinking', emoji: '💡', color: '#7D3C98' },
  { id: 'Life Skills & SEL', emoji: '🌱', color: '#388E3C' },
  { id: 'Technology', emoji: '💻', color: '#283593' },
]

const GREEN = '#1D9E75'
const DARK = '#085041'
const CREAM = '#F7F4EF'
const BORDER = '#E8E4DC'
const GRAY = '#5F5E5A'

// ── Scroll to top button ──────────────────────────────────────
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '32px', right: '32px',
        background: GREEN, color: 'white',
        border: 'none', borderRadius: '100px',
        padding: '12px 20px', fontSize: '14px', fontWeight: 700,
        cursor: 'pointer', fontFamily: 'Georgia, serif',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        zIndex: 1000,
      }}
    >
      ↑ Top
    </button>
  )
}

export default function GeneratorPage() {
  const [form, setForm] = useState({
    theme: '',
    age_range: '7-11',
    language: 'English',
    mode: 'mini',
    depth: 'light',
    philosophy: 'moncho',
    learning_style: 'moncho',
    parent_note: '',
    subjects_available: [],
  })

  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  // Moved out of useEffect so we can re-check after each generation
  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      window.location.href = '/login'
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', session.user.id)
      .single()

    const isPro = profile?.plan === 'pro'

    if (!isPro) {
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { count } = await supabase
        .from('studies')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id)
        .gte('created_at', startOfMonth.toISOString())

      if (count >= 2) {
        setError('🌟 You have used your 2 free studies this month. Upgrade to Pro for unlimited studies!')
      }
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  function toggleSubject(id) {
    setForm(f => ({
      ...f,
      subjects_available: f.subjects_available.includes(id)
        ? f.subjects_available.filter(s => s !== id)
        : [...f.subjects_available, id],
    }))
  }

  async function handleGenerate() {
    if (!form.theme.trim()) {
      setError('Please enter a theme!')
      return
    }
    setError('')
    setStatus('loading')
    setProgress([])
    setResult(null)

    const payload = {
      ...form,
      age: form.age_range,
      learning_style: form.philosophy,
      subjects_available: form.mode === 'custom'
        ? form.subjects_available
        : SUBJECTS.map(s => s.id),
      depth: form.mode === 'custom' ? form.depth : 'light',
    }

    try {
      // The API now requires a logged-in user
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
        return
      }

      const res = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(payload),
      })

      // Server may refuse: 401 = not logged in, 403 = free limit reached
      if (res.status === 401) {
        window.location.href = '/login'
        return
      }
      if (res.status === 403) {
        const d = await res.json()
        setError(d.message || '🌟 You have used your 2 free studies this month. Upgrade to Pro for unlimited studies!')
        setStatus('idle')
        return
      }

      const data = await res.json()
      const jobId = data.job_id

      if (!jobId) {
        setError('Failed to start generation. Please try again.')
        setStatus('error')
        return
      }

      setStatus('polling')

      const poll = setInterval(async () => {
        try {
          const statusRes = await fetch(`${API_URL}/status/${jobId}`)
          const statusData = await statusRes.json()

          if (statusData.progress) setProgress(statusData.progress)

          if (statusData.status === 'done') {
            clearInterval(poll)
            setResult(statusData.result)
            setStatus('done')
            // The study is saved by the SERVER now (no browser insert).
            // Re-check the limit so the button disables honestly if this
            // was the 2nd free study.
            checkAuth()
          } else if (statusData.status === 'error') {
            clearInterval(poll)
            setError(statusData.error || 'Something went wrong.')
            setStatus('error')
          }
        } catch (e) {
          // ignore poll errors
        }
      }, 3000)

    } catch (e) {
      setError('Could not connect to the API. Please try again.')
      setStatus('error')
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  async function downloadPDF() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { window.location.href = '/login'; return }
    if (!result?.study_id) {
      alert('PDF not ready — check your dashboard in a few seconds.')
      return
    }
    const res = await fetch(`${API_URL}/pdf/${result.study_id}`, {
      headers: { 'Authorization': `Bearer ${session.access_token}` },
    })
    if (!res.ok) {
      alert('Could not create the PDF. Please try again in a moment.')
      return
    }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  const isGenerating = status === 'loading' || status === 'polling'

  return (
    <main style={{ minHeight: '100vh', background: CREAM, fontFamily: 'Georgia, serif' }}>

      <ScrollToTopButton />

      {/* NAV */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 48px', background: 'white', borderBottom: `1px solid ${BORDER}`,
      }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 700, color: GREEN, textDecoration: 'none' }}>
          🐱 Moncho
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/dashboard" style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>My Studies</a>
          <a href="/account" style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>⭐ My Plan</a>
          <a href="/resources" style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>📚 Resources</a>
          <button onClick={handleLogout} style={{
            background: 'none', border: `1px solid ${BORDER}`, borderRadius: '100px',
            padding: '8px 16px', fontSize: '13px', color: GRAY,
            cursor: 'pointer', fontFamily: 'Georgia, serif',
          }}>
            Log out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>

        <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '8px' }}>
          Generate a Unit Study
        </h1>
        <p style={{ color: GRAY, fontSize: '16px', marginBottom: '40px' }}>
          Fill in the details below and Moncho will create a complete unit study for your child.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* THEME */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
              🌟 Theme or Topic *
            </label>
            <input
              type="text"
              placeholder="e.g. Volcanoes, Bees, Ancient Egypt, Harry Potter, Dance Competition..."
              value={form.theme}
              onChange={e => setForm(f => ({ ...f, theme: e.target.value }))}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '12px',
                border: `2px solid ${BORDER}`, fontSize: '16px',
                fontFamily: 'Georgia, serif', background: 'white',
                outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = GREEN}
              onBlur={e => e.target.style.borderColor = BORDER}
            />
            {error && (
              <div style={{ marginTop: '8px' }}>
                <p style={{ color: '#E8522A', fontSize: '14px', marginBottom: '12px' }}>{error}</p>
                {error.includes('Upgrade to Pro') && (
                  <a href="/pricing" style={{
                    display: 'inline-block', background: GREEN, color: 'white',
                    padding: '12px 24px', borderRadius: '100px', textDecoration: 'none',
                    fontSize: '15px', fontWeight: 700,
                  }}>
                    🌟 Upgrade to Pro →
                  </a>
                )}
              </div>
            )}
          </div>

          {/* AGE RANGE */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '12px', fontSize: '15px' }}>
              🎂 Learning Level
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {AGE_RANGES.map(a => (
                <button key={a.id} onClick={() => setForm(f => ({ ...f, age_range: a.id }))} style={{
                  padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
                  border: `2px solid ${form.age_range === a.id ? GREEN : BORDER}`,
                  background: form.age_range === a.id ? '#E8F7F2' : 'white',
                  fontFamily: 'Georgia, serif', textAlign: 'left',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: form.age_range === a.id ? DARK : '#1A1A1A' }}>{a.label}</div>
                  <div style={{ fontSize: '12px', color: GRAY, marginTop: '2px' }}>{a.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* LANGUAGE */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
              🌍 Language
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['English', 'Español'].map(lang => (
                <button key={lang} onClick={() => setForm(f => ({ ...f, language: lang }))} style={{
                  padding: '12px 24px', borderRadius: '100px', cursor: 'pointer',
                  border: `2px solid ${form.language === lang ? GREEN : BORDER}`,
                  background: form.language === lang ? GREEN : 'white',
                  color: form.language === lang ? 'white' : GRAY,
                  fontWeight: form.language === lang ? 700 : 400,
                  fontSize: '15px', fontFamily: 'Georgia, serif',
                }}>
                  {lang === 'English' ? '🇺🇸 English' : '🇬🇹 Español'}
                </button>
              ))}
            </div>
          </div>

          {/* LEARNING PHILOSOPHY */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px', fontSize: '15px' }}>
              🧭 Learning Philosophy
            </label>
            <p style={{ color: GRAY, fontSize: '13px', marginBottom: '12px' }}>
              Choose the educational approach that resonates with your family.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PHILOSOPHIES.map(p => (
                <button key={p.id} onClick={() => setForm(f => ({ ...f, philosophy: p.id }))} style={{
                  padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
                  border: `2px solid ${form.philosophy === p.id ? GREEN : BORDER}`,
                  background: form.philosophy === p.id ? '#E8F7F2' : 'white',
                  fontFamily: 'Georgia, serif', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                  <span style={{ fontSize: '20px' }}>{p.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: form.philosophy === p.id ? DARK : '#1A1A1A' }}>
                      {p.label}
                      {p.id === 'moncho' && (
                        <span style={{ fontSize: '11px', background: GREEN, color: 'white', padding: '2px 8px', borderRadius: '20px', marginLeft: '6px' }}>
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: GRAY, marginTop: '2px' }}>{p.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* MODE */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px', fontSize: '15px' }}>
              📚 Unit Study Type
            </label>
            <p style={{ color: GRAY, fontSize: '13px', marginBottom: '12px' }}>
              Mini and Full let Moncho pick the best subjects. Custom lets you choose.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { id: 'mini', label: '⚡ Mini', desc: 'AI picks 3 best subjects' },
                { id: 'full', label: '📦 Full', desc: 'AI picks up to 10 subjects' },
                { id: 'custom', label: '🎛️ Custom', desc: 'You choose the subjects' },
              ].map(m => (
                <button key={m.id} onClick={() => setForm(f => ({ ...f, mode: m.id }))} style={{
                  padding: '14px 12px', borderRadius: '12px', cursor: 'pointer',
                  border: `2px solid ${form.mode === m.id ? GREEN : BORDER}`,
                  background: form.mode === m.id ? '#E8F7F2' : 'white',
                  fontFamily: 'Georgia, serif', textAlign: 'center',
                }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: form.mode === m.id ? DARK : '#1A1A1A' }}>{m.label}</div>
                  <div style={{ fontSize: '11px', color: GRAY, marginTop: '4px' }}>{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* SUBJECTS — only in Custom mode */}
          {form.mode === 'custom' && (
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px', fontSize: '15px' }}>
                📋 Subjects to include
              </label>
              <p style={{ color: GRAY, fontSize: '13px', marginBottom: '12px' }}>
                Select the subjects your child is most interested in exploring.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SUBJECTS.map(s => {
                  const selected = form.subjects_available.includes(s.id)
                  return (
                    <button key={s.id} onClick={() => toggleSubject(s.id)} style={{
                      padding: '8px 16px', borderRadius: '100px', cursor: 'pointer',
                      border: `2px solid ${selected ? s.color : BORDER}`,
                      background: selected ? s.color + '22' : 'white',
                      color: selected ? s.color : GRAY,
                      fontWeight: selected ? 700 : 400,
                      fontSize: '14px', fontFamily: 'Georgia, serif',
                    }}>
                      {s.emoji} {s.id}
                    </button>
                  )
                })}
              </div>

              {/* Depth */}
              <div style={{ marginTop: '20px' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
                  🎯 Depth per subject
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'light', label: 'Light', desc: '2-3 subtopics' },
                    { id: 'medium', label: 'Medium', desc: '5-6 subtopics' },
                    { id: 'deep', label: 'Deep', desc: 'Up to 10 subtopics' },
                  ].map(d => (
                    <button key={d.id} onClick={() => setForm(f => ({ ...f, depth: d.id }))} style={{
                      padding: '10px 20px', borderRadius: '100px', cursor: 'pointer',
                      border: `2px solid ${form.depth === d.id ? GREEN : BORDER}`,
                      background: form.depth === d.id ? GREEN : 'white',
                      color: form.depth === d.id ? 'white' : GRAY,
                      fontWeight: form.depth === d.id ? 700 : 400,
                      fontSize: '14px', fontFamily: 'Georgia, serif',
                    }}>
                      {d.label} <span style={{ opacity: 0.7, fontSize: '12px' }}>({d.desc})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PARENT NOTE */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
              💬 Parent note <span style={{ color: GRAY, fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              placeholder="e.g. She loves building things but hates writing. He's really into Minecraft..."
              value={form.parent_note}
              onChange={e => setForm(f => ({ ...f, parent_note: e.target.value }))}
              rows={3}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '12px',
                border: `2px solid ${BORDER}`, fontSize: '15px',
                fontFamily: 'Georgia, serif', background: 'white',
                resize: 'vertical', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* GENERATE BUTTON */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !!error}
            style={{
              background: isGenerating ? GRAY : GREEN,
              color: 'white', padding: '18px', borderRadius: '100px',
              border: 'none', fontSize: '18px', fontWeight: 700,
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              fontFamily: 'Georgia, serif',
            }}
          >
            {status === 'loading' ? '🚀 Starting generation...' :
              status === 'polling' ? '⏳ Generating your unit study...' :
                '✨ Generate Unit Study'}
          </button>

          {/* AI DISCLAIMER — below generate button */}
          <p style={{
            fontSize: '12px', color: GRAY, textAlign: 'center',
            lineHeight: 1.6, marginTop: '-12px',
          }}>
            🤖 AI-generated content — please review before sharing with your child.
          </p>

        </div>

        {/* PROGRESS */}
        {isGenerating && (
          <div style={{
            marginTop: '32px', background: 'white', borderRadius: '16px',
            padding: '28px', border: `2px solid ${GREEN}`,
          }}>
            {/* Running Moncho cat (public/moncho-cat.gif). If the GIF
                isn't uploaded yet, it hides itself gracefully. */}
            <img
              src="/moncho-cat.gif"
              alt="Moncho is running!"
              onError={e => { e.currentTarget.style.display = 'none' }}
              style={{ width: '140px', display: 'block', margin: '0 auto 12px auto' }}
            />
            <p style={{ fontWeight: 700, marginBottom: '8px', color: DARK, fontSize: '18px', textAlign: 'center' }}>
              🐱 Moncho is on it!
            </p>
            <p style={{ color: GREEN, fontSize: '15px', marginBottom: '16px', fontStyle: 'italic', textAlign: 'center' }}>
              A few minutes of cat-speed work — a curriculum specialist
              would take <em>hours</em>. ☕
            </p>
            <p style={{ color: GRAY, fontSize: '13px', marginBottom: '20px', textAlign: 'center' }}>
              Please don't close this window! Moncho is working hard behind the scenes. 🐾
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
              <p style={{ color: GRAY, fontSize: '13px' }}>⏳ Waking up the agents...</p>
            )}
          </div>
        )}

        {/* RESULT */}
        {status === 'done' && result && (
          <div style={{ marginTop: '40px' }}>
            <div style={{
              background: '#E8F7F2', borderRadius: '16px', padding: '24px',
              marginBottom: '24px', border: `2px solid ${GREEN}`,
            }}>
              <p style={{ fontWeight: 700, color: DARK, fontSize: '18px', marginBottom: '8px' }}>
                🎉 Your unit study is ready!
              </p>
              <p style={{ color: GREEN, fontSize: '15px', fontStyle: 'italic', marginBottom: '12px' }}>
                "{result.creative_angle}"
              </p>
              <p style={{ color: DARK, fontSize: '14px' }}>
                Subjects: {result.subjects_included?.join(', ')}
              </p>
            </div>

            <div style={{
              background: 'white', borderRadius: '16px', padding: '32px',
              border: `1px solid ${BORDER}`, whiteSpace: 'pre-wrap',
              fontFamily: 'Georgia, serif', fontSize: '14px', lineHeight: '1.8',
              color: '#1A1A1A', maxHeight: '500px', overflowY: 'auto',
            }}>
              {result.output}
            </div>

            {/* PDF BUTTON — opens the designed PDF in a new tab */}
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={downloadPDF}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '10px', width: '100%',
                  background: DARK, color: 'white',
                  padding: '18px 24px', borderRadius: '14px',
                  border: 'none', fontSize: '17px', fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'Georgia, serif',
                  boxShadow: '0 4px 16px rgba(8,80,65,0.25)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#063d31'}
                onMouseLeave={e => e.currentTarget.style.background = DARK}
              >
                📄 View Unit Study PDF
              </button>
              <p style={{ fontSize: '12px', color: GRAY, textAlign: 'center', marginTop: '8px' }}>
                Opens in a new tab — ready to save or print
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
