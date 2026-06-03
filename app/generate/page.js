'use client'

import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'

const API_URL = 'https://moncho-api-production-2c00.up.railway.app'

const SUBJECTS = [
  { id: 'Science', emoji: '🔬', color: '#1D9E75' },
  { id: 'Math', emoji: '📊', color: '#2E86C1' },
  { id: 'Language Arts', emoji: '📖', color: '#7D3C98' },
  { id: 'History', emoji: '📜', color: '#F0A500' },
  { id: 'Geography', emoji: '🌍', color: '#0277BD' },
  { id: 'Art', emoji: '🎨', color: '#E8522A' },
  { id: 'Music', emoji: '🎵', color: '#C2185B' },
  { id: 'Critical Thinking', emoji: '💡', color: '#7D3C98' },
  { id: 'Life Skills', emoji: '🛠', color: '#E64A19' },
  { id: 'Technology', emoji: '💻', color: '#283593' },
]

export default function GeneratorPage() {
  const [form, setForm] = useState({
    theme: '',
    age: '9',
    language: 'English',
    mode: 'mini',
    depth: 'light',
    learning_style: 'moncho',
    parent_note: '',
    subjects_available: SUBJECTS.map(s => s.id),
  })

  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
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

    try {
      const res = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
          const statusRes = await fetch(`${API_URL}/status/${jobId}`)
          const statusData = await statusRes.json()

          if (statusData.progress) {
            setProgress(statusData.progress)
          }

          if (statusData.status === 'done') {
            clearInterval(poll)
            setResult(statusData.result)
            setStatus('done')
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

  return (
    <main style={{
      minHeight: '100vh',
      background: '#F7F4EF',
      fontFamily: 'Georgia, serif',
    }}>

      {/* NAV */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 48px',
        background: 'white',
        borderBottom: '1px solid #E8E4DC',
      }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 700, color: '#1D9E75', textDecoration: 'none' }}>
          🐱 Moncho
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', color: '#5F5E5A' }}>
            Unit Study Generator
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: '1px solid #E8E4DC',
              borderRadius: '100px',
              padding: '8px 16px',
              fontSize: '13px',
              color: '#5F5E5A',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
            }}
          >
            Log out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>

        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          color: '#1A1A1A',
          letterSpacing: '-1px',
          marginBottom: '8px',
        }}>
          Generate a Unit Study
        </h1>
        <p style={{ color: '#5F5E5A', fontSize: '16px', marginBottom: '40px' }}>
          Fill in the details below and Moncho will create a complete unit study for your child.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Theme */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
              🌟 Theme or Topic *
            </label>
            <input
              type="text"
              placeholder="e.g. Volcanoes, Bees, Ancient Egypt, Harry Potter..."
              value={form.theme}
              onChange={e => setForm(f => ({ ...f, theme: e.target.value }))}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #E8E4DC',
                fontSize: '16px',
                fontFamily: 'Georgia, serif',
                background: 'white',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = '#1D9E75'}
              onBlur={e => e.target.style.borderColor = '#E8E4DC'}
            />
            {error && (
              <p style={{ color: '#E8522A', fontSize: '14px', marginTop: '6px' }}>{error}</p>
            )}
          </div>

          {/* Age + Language */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
                🎂 Child's Age
              </label>
              <select
                value={form.age}
                onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '12px',
                  border: '2px solid #E8E4DC', fontSize: '15px',
                  background: 'white', fontFamily: 'Georgia, serif',
                }}
              >
                {[5,6,7,8,9,10,11,12,13,14,15,16].map(a => (
                  <option key={a} value={a}>{a} years old</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
                🌍 Language
              </label>
              <select
                value={form.language}
                onChange={e => setForm(f => ({ ...f, language: e.target.value }))}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '12px',
                  border: '2px solid #E8E4DC', fontSize: '15px',
                  background: 'white', fontFamily: 'Georgia, serif',
                }}
              >
                <option value="English">English</option>
                <option value="Español">Español</option>
              </select>
            </div>
          </div>

          {/* Mode + Depth */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
                📚 Mode
              </label>
              <select
                value={form.mode}
                onChange={e => setForm(f => ({ ...f, mode: e.target.value }))}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '12px',
                  border: '2px solid #E8E4DC', fontSize: '15px',
                  background: 'white', fontFamily: 'Georgia, serif',
                }}
              >
                <option value="mini">Mini (3 subjects)</option>
                <option value="full">Full (6+ subjects)</option>
                <option value="stem">STEM focus</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
                🎯 Depth
              </label>
              <select
                value={form.depth}
                onChange={e => setForm(f => ({ ...f, depth: e.target.value }))}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '12px',
                  border: '2px solid #E8E4DC', fontSize: '15px',
                  background: 'white', fontFamily: 'Georgia, serif',
                }}
              >
                <option value="light">Light (2-3 subtopics)</option>
                <option value="medium">Medium (5-6 subtopics)</option>
                <option value="deep">Deep (up to 10)</option>
              </select>
            </div>
          </div>

          {/* Subjects */}
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
                      padding: '8px 16px',
                      borderRadius: '100px',
                      border: `2px solid ${selected ? s.color : '#E8E4DC'}`,
                      background: selected ? s.color + '22' : 'white',
                      color: selected ? s.color : '#5F5E5A',
                      fontWeight: selected ? 700 : 400,
                      fontSize: '14px',
                      cursor: 'pointer',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {s.emoji} {s.id}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Parent note */}
          <div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>
              💬 Parent note <span style={{ color: '#5F5E5A', fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              placeholder="e.g. She loves building things but hates writing..."
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

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={status === 'loading' || status === 'polling'}
            style={{
              background: status === 'loading' || status === 'polling' ? '#5F5E5A' : '#1D9E75',
              color: 'white', padding: '18px', borderRadius: '100px',
              border: 'none', fontSize: '18px', fontWeight: 700,
              cursor: status === 'loading' || status === 'polling' ? 'not-allowed' : 'pointer',
              fontFamily: 'Georgia, serif',
            }}
          >
            {status === 'loading' ? '🚀 Starting generation...' :
             status === 'polling' ? '⏳ Generating your unit study...' :
             '✨ Generate Unit Study'}
          </button>
        </div>

        {/* PROGRESS */}
        {(status === 'polling' || status === 'loading') && (
          <div style={{
            marginTop: '32px', background: 'white', borderRadius: '16px',
            padding: '24px', border: '1px solid #E8E4DC',
          }}>
            <p style={{ fontWeight: 700, marginBottom: '12px', color: '#1A1A1A' }}>
              🐱 Moncho is working on it...
            </p>
            {progress.length > 0 ? progress.map((p, i) => (
              <p key={i} style={{ color: '#1D9E75', fontSize: '14px', marginBottom: '4px' }}>
                ✅ {p}
              </p>
            )) : (
              <p style={{ color: '#5F5E5A', fontSize: '14px' }}>Starting up the agents...</p>
            )}
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

            <button
              onClick={() => {
                const blob = new Blob([result.output], { type: 'text/plain' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `Moncho_${form.theme}_Unit_Study.txt`
                a.click()
              }}
              style={{
                marginTop: '16px', background: '#1D9E75', color: 'white',
                padding: '14px 32px', borderRadius: '100px', border: 'none',
                fontSize: '16px', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'Georgia, serif',
              }}
            >
              📥 Download as Text
            </button>
          </div>
        )}

      </div>
    </main>
  )
}