'use client'

import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

const API_URL = 'https://moncho-api-production-2c00.up.railway.app'

const AGE_RANGES = [
  { id: '5-7',   label: '🌱 Early Childhood',  desc: '5-7 years' },
  { id: '7-11',  label: '📚 Elementary',        desc: '7-11 years' },
  { id: '12-15', label: '🔬 Middle School',      desc: '12-15 years' },
  { id: '15-18', label: '🎓 High School',        desc: '15-18 years' },
]

const PHILOSOPHIES = [
  { id: 'moncho',          emoji: '🐱', label: 'Moncho Style',     desc: 'Hands-on, curiosity-driven, project-based' },
  { id: 'montessori',      emoji: '🌱', label: 'Montessori',       desc: 'Child-led, self-paced, prepared environment' },
  { id: 'charlotte_mason', emoji: '📖', label: 'Charlotte Mason',  desc: 'Living books, narration, nature study' },
  { id: 'waldorf',         emoji: '🌿', label: 'Waldorf',          desc: 'Artistic, imaginative, developmental stages' },
  { id: 'forest_school',   emoji: '🌲', label: 'Forest School',    desc: 'Outdoor learning, nature connection' },
  { id: 'unschooling',     emoji: '🌎', label: 'Unschooling',      desc: 'Child-led, interest-based, no fixed curriculum' },
]

const SUBJECTS = [
  { id: 'Science',          emoji: '🔬', color: '#1D9E75' },
  { id: 'Biology',          emoji: '🧬', color: '#2E7D32' },
  { id: 'Chemistry',        emoji: '⚗️',  color: '#6A1B9A' },
  { id: 'Physics',          emoji: '⚡',  color: '#1565C0' },
  { id: 'Earth Science',    emoji: '🌍', color: '#4E342E' },
  { id: 'Astronomy',        emoji: '🌌', color: '#1A237E' },
  { id: 'Math',             emoji: '📊', color: '#2E86C1' },
  { id: 'Language Arts',    emoji: '📖', color: '#7D3C98' },
  { id: 'Geography',        emoji: '🗺️',  color: '#0277BD' },
  { id: 'History',          emoji: '📜', color: '#F0A500' },
  { id: 'Art & Creativity', emoji: '🎨', color: '#E8522A' },
  { id: 'Music',            emoji: '🎵', color: '#C2185B' },
  { id: 'Movement & Body',  emoji: '🏃', color: '#00796B' },
  { id: 'Critical Thinking',emoji: '💡', color: '#7D3C98' },
  { id: 'Life Skills & SEL',emoji: '🌱', color: '#388E3C' },
  { id: 'Technology',       emoji: '💻', color: '#283593' },
]

export default function GeneratorPage() {
  const [form, setForm] = useState({
    theme:              '',
    age_range:          '7-11',
    language:           'English',
    mode:               'mini',
    depth:              'light',
    philosophy:         'moncho',
    learning_style:     'moncho',
    parent_note:        '',
    subjects_available: SUBJECTS.map(s => s.id),
  })

  const [status,   setStatus]   = useState('idle')
  const [progress, setProgress] = useState([])
  const [result,   setResult]   = useState(null)
  const [error,    setError]    = useState('')

  useEffect(() => {
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

        if (count >= 999) {
          setError('🌟 You have used your 2 free studies this month. Upgrade to Pro for unlimited studies!')
        }
      }
    }
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

    // Build the payload — for mini/full, let the AI pick subjects
    const payload = {
      ...form,
      age: form.age_range,
      learning_style: form.philosophy,
      // For mini/full modes, pass all subjects so the AI can pick the best ones
      subjects_available: form.mode === 'custom'
        ? form.subjects_available
        : SUBJECTS.map(s => s.id),
      // Pass depth only for custom mode
      depth: form.mode === 'custom' ? form.depth : 'light',
    }

    try {
      const res = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
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
          const statusRes  = await fetch(`${API_URL}/status/${jobId}`)
          const statusData = await statusRes.json()

          if (statusData.progress) setProgress(statusData.progress)

          if (statusData.status === 'done') {
            clearInterval(poll)
            setResult(statusData.result)
            setStatus('done')

            // Save to Supabase
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
              await supabase.from('studies').insert({
                user_id:        session.user.id,
                theme:          form.theme,
                language:       form.language,
                subjects:       statusData.result.subjects_included,
                creative_angle: statusData.result.creative_angle,
                output:         statusData.result.output,
              })
            }
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

  const isGenerating = status === 'loading' || status === 'polling'

  return (
    <main style={{ minHeight: '100vh', background: '#F7F4EF', fontFamily: 'Georgia, serif' }}>

      {/* NAV */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 48px', background: 'white', borderBottom: '1px solid #E8E4DC',
      }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 700, color: '#1D9E75', textDecoration: 'none' }}>
          🐱 Moncho
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/dashboard" style={{ fontSize: '14px', color: '#5F5E5A', textDecoration: 'none' }}>
            My Studies
          </a>
          <button onClick={handleLogout} style={{
            background: 'none', border: '1px solid #E8E4DC', borderRadius: '100px',
            padding: '8px 16px', fontSize: '13px', color: '#5F5E5A',
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
        <p style={{ color: '#5F5E5A', fontSize: '16px', marginBottom: '40px' }}>
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
                border: '2px solid #E8E4DC', fontSize: '16px',
                fontFamily: 'Georgia, serif', background: 'white',
                outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = '#1D9E75'}
              onBlur={e => e.target.style.borderColor = '#E8E4DC'}
            />
            {error && (
              <div style={{ marginTop: '8px' }}>
                <p style={{ color: '#E8522A', fontSize: '14px', marginBottom: '12px' }}>{error}</p>
                {error.includes('Upgrade to Pro') && (
                  <a href="/pricing" style={{
                    display: 'inline-block', background: '#1D9E75', color: 'white',
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
                <button
                  key={a.id}
                  onClick={() => setForm(f => ({ ...f, age_range: a.id }))}
                  style={{
                    padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
                    border: `2px solid ${form.age_range === a.id ? '#1D9E75' : '#E8E4DC'}`,
                    background: form.age_range === a.id ? '#E8F7F2' : 'white',
                    fontFamily: 'Georgia, serif', textAlign: 'left',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '14px', color: form.age_range === a.id ? '#085041' : '#1A1A1A' }}>
                    {a.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#5F5E5A', marginTop: '2px' }}>{a.desc}</div>
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
                <button
                  key={lang}
                  onClick={() => setForm(f => ({ ...f, language: lang }))}
                  style={{
                    padding: '12px 24px', borderRadius: '100px', cursor: 'pointer',
                    border: `2px solid ${form.language === lang ? '#1D9E75' : '#E8E4DC'}`,
                    background: form.language === lang ? '#1D9E75' : 'white',
                    color: form.language === lang ? 'white' : '#5F5E5A',
                    fontWeight: form.language === lang ? 700 : 400,
                    fontSize: '15px', fontFamily: 'Georgia, serif',
                  }}
                >
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
            <p style={{ color: '#5F5E5A', fontSize: '13px', marginBottom: '12px' }}>
              Choose the educational approach that resonates with your family.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PHILOSOPHIES.map(p => (
                <button
                  key={p.id}
                  onClick={() => setForm(f => ({ ...f, philosophy: p.id }))}
                  style={{
                    padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
                    border: `2px solid ${form.philosophy === p.id ? '#1D9E75' : '#E8E4DC'}`,
                    background: form.philosophy === p.id ? '#E8F7F2' : 'white',
                    fontFamily: 'Georgia, serif', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{p.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: form.philosophy === p.id ? '#085041' : '#1A1A1A' }}>
                      {p.label} {p.id === 'moncho' && <span style={{ fontSize: '11px', background: '#1D9E75', color: 'white', padding: '2px 8px', borderRadius: '20px', marginLeft: '6px' }}>RECOMMENDED</span>}
                    </div>
                    <div style={{ fontSize: '12px', color: '#5F5E5A', marginTop: '2px' }}>{p.desc}</div>
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
            <p style={{ color: '#5F5E5A', fontSize: '13px', marginBottom: '12px' }}>
              Mini and Full let Moncho pick the best subjects. Custom lets you choose.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { id: 'mini',   label: '⚡ Mini',   desc: 'AI picks 3 best subjects' },
                { id: 'full',   label: '📦 Full',   desc: 'AI picks up to 10 subjects' },
                { id: 'custom', label: '🎛️ Custom',  desc: 'You choose the subjects' },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setForm(f => ({ ...f, mode: m.id }))}
                  style={{
                    padding: '14px 12px', borderRadius: '12px', cursor: 'pointer',
                    border: `2px solid ${form.mode === m.id ? '#1D9E75' : '#E8E4DC'}`,
                    background: form.mode === m.id ? '#E8F7F2' : 'white',
                    fontFamily: 'Georgia, serif', textAlign: 'center',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '14px', color: form.mode === m.id ? '#085041' : '#1A1A1A' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '11px', color: '#5F5E5A', marginTop: '4px' }}>{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* SUBJECTS — only show in Custom mode */}
          {form.mode === 'custom' && (
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
                📋 Subjects to include
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SUBJECTS.map(s => {
                  const selected = form.subjects_available.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleSubject(s.id)}
                      style={{
                        padding: '8px 16px', borderRadius: '100px', cursor: 'pointer',
                        border: `2px solid ${selected ? s.color : '#E8E4DC'}`,
                        background: selected ? s.color + '22' : 'white',
                        color: selected ? s.color : '#5F5E5A',
                        fontWeight: selected ? 700 : 400,
                        fontSize: '14px', fontFamily: 'Georgia, serif',
                      }}
                    >
                      {s.emoji} {s.id}
                    </button>
                  )
                })}
              </div>

              {/* Depth — only in Custom mode */}
              <div style={{ marginTop: '20px' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
                  🎯 Depth per subject
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    { id: 'light',  label: 'Light',  desc: '2-3 subtopics' },
                    { id: 'medium', label: 'Medium', desc: '5-6 subtopics' },
                    { id: 'deep',   label: 'Deep',   desc: 'Up to 10 subtopics' },
                  ].map(d => (
                    <button
                      key={d.id}
                      onClick={() => setForm(f => ({ ...f, depth: d.id }))}
                      style={{
                        padding: '10px 20px', borderRadius: '100px', cursor: 'pointer',
                        border: `2px solid ${form.depth === d.id ? '#1D9E75' : '#E8E4DC'}`,
                        background: form.depth === d.id ? '#1D9E75' : 'white',
                        color: form.depth === d.id ? 'white' : '#5F5E5A',
                        fontWeight: form.depth === d.id ? 700 : 400,
                        fontSize: '14px', fontFamily: 'Georgia, serif',
                      }}
                    >
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
              💬 Parent note <span style={{ color: '#5F5E5A', fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              placeholder="e.g. She loves building things but hates writing. He's really into Minecraft"
              value={form.parent_note}
              onChange={e => setForm(f => ({ ...f, parent_note: e.target.value }))}
              rows={3}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '12px',
                border: '2px solid #E8E4DC', fontSize: '15px',
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
              background: isGenerating ? '#5F5E5A' : '#1D9E75',
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
        </div>

        {/* PROGRESS */}
        {isGenerating && (
          <div style={{
            marginTop: '32px', background: 'white', borderRadius: '16px',
            padding: '28px', border: '2px solid #1D9E75',
          }}>
            <p style={{ fontWeight: 700, marginBottom: '8px', color: '#085041', fontSize: '18px' }}>
              🐱 Moncho is on it!
            </p>
            <p style={{ color: '#1D9E75', fontSize: '15px', marginBottom: '16px', fontStyle: 'italic' }}>
              This takes 3-5 minutes. Yes, minutes. But think about it —
              a curriculum specialist would take 3-5 <em>hours</em>. ☕
            </p>
            <p style={{ color: '#5F5E5A', fontSize: '13px', marginBottom: '20px' }}>
              Please don't close this window! Moncho is working hard behind the scenes. 🐾
            </p>
            {progress.length > 0 ? progress.map((p, i) => (
              <p key={i} style={{ color: '#1D9E75', fontSize: '14px', marginBottom: '4px' }}>✅ {p}</p>
            )) : (
              <div>
                <p style={{ color: '#5F5E5A', fontSize: '13px', marginBottom: '6px' }}>⏳ Waking up the agents...</p>
                <p style={{ color: '#5F5E5A', fontSize: '13px', marginBottom: '6px' }}>🧠 Planning your subjects...</p>
                <p style={{ color: '#5F5E5A', fontSize: '13px', marginBottom: '6px' }}>✍️ Writing hands-on challenges...</p>
                <p style={{ color: '#5F5E5A', fontSize: '13px' }}>🎨 Adding the Moncho magic...</p>
              </div>
            )}
            <div style={{
              marginTop: '20px', padding: '12px 16px', background: '#F7F4EF',
              borderRadius: '10px', fontSize: '12px', color: '#5F5E5A', fontStyle: 'italic',
            }}>
              💡 Fun fact: The average unit study takes 4-6 hours to create from scratch.
              Moncho does it in minutes — so you can spend that time actually exploring with your child! 🌍
            </div>
          </div>
        )}

        {/* RESULT */}
        {status === 'done' && result && (
          <div style={{ marginTop: '40px' }}>
            <div style={{
              background: '#E8F7F2', borderRadius: '16px', padding: '24px',
              marginBottom: '24px', border: '2px solid #1D9E75',
            }}>
              <p style={{ fontWeight: 700, color: '#085041', fontSize: '18px', marginBottom: '8px' }}>
                🎉 Your unit study is ready!
              </p>
              <p style={{ color: '#1D9E75', fontSize: '15px', fontStyle: 'italic', marginBottom: '12px' }}>
                "{result.creative_angle}"
              </p>
              <p style={{ color: '#085041', fontSize: '14px' }}>
                Subjects: {result.subjects_included?.join(', ')}
              </p>
            </div>

            <div style={{
              background: 'white', borderRadius: '16px', padding: '32px',
              border: '1px solid #E8E4DC', whiteSpace: 'pre-wrap',
              fontFamily: 'Georgia, serif', fontSize: '14px', lineHeight: '1.8',
              color: '#1A1A1A', maxHeight: '500px', overflowY: 'auto',
            }}>
              {result.output}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  const blob = new Blob([result.output], { type: 'text/plain' })
                  const url  = URL.createObjectURL(blob)
                  const a    = document.createElement('a')
                  a.href     = url
                  a.download = `Moncho_${form.theme}_Unit_Study.txt`
                  a.click()
                }}
                style={{
                  background: '#F7F4EF', color: '#1A1A1A', padding: '14px 24px',
                  borderRadius: '100px', border: '1px solid #E8E4DC', fontSize: '15px',
                  fontWeight: 600, cursor: 'pointer', fontFamily: 'Georgia, serif',
                }}
              >
                📄 Download as Text
              </button>

              <button
                onClick={() => {
                  const printWindow = window.open('', '_blank')
                  printWindow.document.write(`
                    <html>
                      <head>
                        <title>Moncho - ${form.theme} Unit Study</title>
                        <style>
                          * { box-sizing: border-box; margin: 0; padding: 0; }
                          body { font-family: Georgia, serif; max-width: 750px; margin: 40px auto; padding: 20px; background: #F7F4EF; color: #1A1A1A; line-height: 1.8; }
                          .header { background: #085041; color: white; padding: 32px; border-radius: 16px; margin-bottom: 32px; text-align: center; }
                          .header h1 { font-size: 32px; margin-bottom: 8px; }
                          .header .angle { font-style: italic; color: rgba(255,255,255,0.85); font-size: 15px; margin-top: 10px; }
                          .header .meta { color: rgba(255,255,255,0.6); font-size: 13px; margin-top: 6px; }
                          pre { white-space: pre-wrap; font-family: Georgia, serif; font-size: 14px; line-height: 2; background: white; padding: 28px; border-radius: 12px; }
                          .footer { text-align: center; color: #5F5E5A; font-size: 12px; margin-top: 32px; padding-top: 16px; border-top: 1px solid #E8E4DC; }
                          @media print { body { background: white; } }
                        </style>
                      </head>
                      <body>
                        <div class="header">
                          <div class="meta">🐱 Moncho Unschooling · ${form.language}</div>
                          <h1>${form.theme} Unit Study</h1>
                          <div class="angle">"${result.creative_angle}"</div>
                          <div class="meta" style="margin-top:12px">Subjects: ${result.subjects_included?.join(' · ')}</div>
                        </div>
                        <pre>${result.output.replace(/---/g, '</pre><hr style="border:none;border-top:3px solid #1D9E75;margin:28px 0;opacity:0.4"><pre>')}</pre>
                        <div class="footer">By Alba Nory de González · Moncho Unschooling · monchounschooling.com</div>
                      </body>
                    </html>
                  `)
                  printWindow.document.close()
                  printWindow.print()
                }}
                style={{
                  background: '#1D9E75', color: 'white', padding: '14px 24px',
                  borderRadius: '100px', border: 'none', fontSize: '15px',
                  fontWeight: 700, cursor: 'pointer', fontFamily: 'Georgia, serif',
                }}
              >
                📥 Download PDF
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}