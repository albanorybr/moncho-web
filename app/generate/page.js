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
      return
    }

    // Check user plan
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', session.user.id)
      .single()

    const isPro = profile?.plan === 'pro'

    if (!isPro) {
      // Check generation count this month
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
  
  // Save study to Supabase
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    await supabase.from('studies').insert({
      user_id: session.user.id,
      theme: form.theme,
      language: form.language,
      subjects: statusData.result.subjects_included,
      creative_angle: statusData.result.creative_angle,
      output: statusData.result.output,
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
          <a href="/dashboard" style={{
  fontSize: '14px', color: '#5F5E5A', textDecoration: 'none'
}}>
  My Studies
</a>
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
            disabled={status === 'loading' || status === 'polling' || !!error}
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
    marginTop: '32px', background: 'white',
    borderRadius: '16px', padding: '28px',
    border: '2px solid #1D9E75',
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
      <p key={i} style={{ color: '#1D9E75', fontSize: '14px', marginBottom: '4px' }}>
        ✅ {p}
      </p>
    )) : (
      <div>
        <p style={{ color: '#5F5E5A', fontSize: '13px', marginBottom: '6px' }}>⏳ Waking up the agents...</p>
        <p style={{ color: '#5F5E5A', fontSize: '13px', marginBottom: '6px' }}>🧠 Planning your subjects...</p>
        <p style={{ color: '#5F5E5A', fontSize: '13px', marginBottom: '6px' }}>✍️ Writing hands-on challenges...</p>
        <p style={{ color: '#5F5E5A', fontSize: '13px' }}>🎨 Adding the Moncho magic...</p>
      </div>
    )}
    <div style={{
      marginTop: '20px', padding: '12px 16px',
      background: '#F7F4EF', borderRadius: '10px',
      fontSize: '12px', color: '#5F5E5A', fontStyle: 'italic',
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
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Moncho_${form.theme}_Unit_Study.txt`
      a.click()
    }}
    style={{
      background: '#F7F4EF', color: '#1A1A1A',
      padding: '14px 24px', borderRadius: '100px',
      border: '1px solid #E8E4DC', fontSize: '15px',
      fontWeight: 600, cursor: 'pointer',
      fontFamily: 'Georgia, serif',
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
          body { 
            font-family: Georgia, serif; 
            max-width: 750px; 
            margin: 40px auto; 
            padding: 20px; 
            line-height: 1.8; 
            color: #1A1A1A;
            background: #F7F4EF;
          }
          .header {
            background: #085041;
            color: white;
            padding: 32px;
            border-radius: 16px;
            margin-bottom: 32px;
            text-align: center;
          }
          .header h1 { font-size: 36px; margin-bottom: 8px; }
          .header p { color: rgba(255,255,255,0.8); font-size: 14px; }
          .section {
            background: white;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            border-left: 6px solid #1D9E75;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          }
          .section h2 {
            color: #085041;
            font-size: 22px;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 2px solid #E8F7F2;
          }
          .challenge {
            background: #F7F4EF;
            border-radius: 10px;
            padding: 16px;
            margin: 12px 0;
            border-left: 4px solid #1D9E75;
          }
          .challenge h3 {
            color: #1D9E75;
            font-size: 16px;
            margin-bottom: 8px;
          }
          .easier { 
            color: #085041; 
            font-style: italic;
            margin-top: 8px;
            padding: 8px;
            background: #E8F7F2;
            border-radius: 6px;
          }
          .harder { 
            color: #7D3C98; 
            font-style: italic;
            margin-top: 6px;
            padding: 8px;
            background: #F5EEF8;
            border-radius: 6px;
          }
          .divider {
            border: none;
            border-top: 2px solid #E8E4DC;
            margin: 20px 0;
          }
          pre { 
            white-space: pre-wrap; 
            font-family: Georgia, serif;
            font-size: 14px;
            line-height: 1.8;
          }
          .footer {
            text-align: center;
            color: #5F5E5A;
            font-size: 12px;
            margin-top: 32px;
            padding-top: 16px;
            border-top: 1px solid #E8E4DC;
          }
          @media print {
            body { background: white; margin: 20px; }
            .section { box-shadow: none; }
          }
          .divider {
            border: none;
            border-top: 3px solid #1D9E75;
            margin: 28px 0;
            opacity: 0.4;
        }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🐱 ${form.theme}</h1>
          <p>Moncho Unschooling · Unit Study · ${form.language}</p>
          <p style="margin-top:8px; font-style:italic; color:rgba(255,255,255,0.9)">"${result.creative_angle}"</p>
        </div>
        <pre>${result.output.replace(/---/g, '</pre><hr style="border:none;border-top:3px solid #1D9E75;margin:28px 0;opacity:0.4"><pre>')}</pre>
        <div class="footer">
          By Alba Nory de González · Moncho Unschooling · monchounschooling.com
        </div>
      </body>
    </html>
  `)
  printWindow.document.close()
  printWindow.print()
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