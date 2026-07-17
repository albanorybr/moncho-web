'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const API_URL = 'https://moncho-api-production-2c00.up.railway.app'

const GREEN = '#1D9E75'
const DARK = '#085041'
const CREAM = '#F7F4EF'
const BORDER = '#E8E4DC'
const GRAY = '#5F5E5A'

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

export default function DashboardPage() {
  const [studies, setStudies] = useState([])
  const [tales, setTales] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
        return
      }
      setUser(session.user)

      const { data, error } = await supabase
        .from('studies')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) setStudies(data || [])

      // Tales live behind the API (service-key access)
      try {
        const res = await fetch(`${API_URL}/tales`, {
          headers: { 'Authorization': `Bearer ${session.access_token}` },
        })
        if (res.ok) {
          const json = await res.json()
          setTales(json.tales || [])
        }
      } catch (e) { /* tales are optional here */ }

      setLoading(false)
    }
    loadData()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    })
  }

  // Opens the designed PDF (built by the API with WeasyPrint) in a new tab
  async function downloadPDF(study) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { window.location.href = '/login'; return }

    const res = await fetch(`${API_URL}/pdf/${study.id}`, {
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

  // Opens a tale's picture-book PDF in a new tab
  async function openTale(tale) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { window.location.href = '/login'; return }

    const res = await fetch(`${API_URL}/tale-pdf/${tale.id}`, {
      headers: { 'Authorization': `Bearer ${session.access_token}` },
    })
    if (!res.ok) {
      alert('Could not open the tale. Please try again in a moment.')
      return
    }
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  // Studies + tales merged, newest first
  const items = [
    ...studies.map(s => ({ ...s, kind: 'study' })),
    ...tales.map(t => ({ ...t, kind: 'tale' })),
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

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
          <a href="/generate" style={{
            background: GREEN, color: 'white',
            padding: '8px 20px', borderRadius: '100px',
            textDecoration: 'none', fontSize: '14px', fontWeight: 700,
          }}>
            + New Study
          </a>
          <a href="/tales" style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>📖 Tales</a>
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

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '8px' }}>
            My Studies
          </h1>
          <p style={{ color: GRAY, fontSize: '15px' }}>
            {user?.email} · {studies.length} unit {studies.length === 1 ? 'study' : 'studies'}
            {tales.length > 0 && ` · ${tales.length} ${tales.length === 1 ? 'tale' : 'tales'}`}
          </p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '48px', color: GRAY }}>
            Loading your studies...
          </div>
        )}

        {!loading && items.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '64px 48px',
            background: 'white', borderRadius: '20px', border: `1px solid ${BORDER}`,
          }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>🐱</p>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>No studies yet!</h2>
            <p style={{ color: GRAY, marginBottom: '24px' }}>Generate your first unit study and it will appear here.</p>
            <a href="/generate" style={{
              background: GREEN, color: 'white',
              padding: '12px 28px', borderRadius: '100px',
              textDecoration: 'none', fontSize: '15px', fontWeight: 700,
            }}>
              Generate a study →
            </a>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {items.map(item => (
              <div key={`${item.kind}-${item.id}`} style={{
                background: 'white', borderRadius: '16px', padding: '24px',
                border: `1px solid ${BORDER}`,
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', gap: '16px',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A1A' }}>
                      {item.kind === 'tale' ? (item.title || item.theme) : item.theme}
                    </h3>
                    {item.kind === 'tale' && (
                      <span style={{
                        background: '#FDF3E0', color: '#9A6A1B',
                        padding: '2px 10px', borderRadius: '100px',
                        fontSize: '12px', fontWeight: 600,
                      }}>
                        📖 Tale
                      </span>
                    )}
                    <span style={{
                      background: item.language === 'Español' ? '#E8EAF6' : '#E8F7F2',
                      color: item.language === 'Español' ? '#283593' : GREEN,
                      padding: '2px 10px', borderRadius: '100px',
                      fontSize: '12px', fontWeight: 600,
                    }}>
                      {item.language}
                    </span>
                  </div>
                  {item.kind === 'tale' && item.title && item.theme && (
                    <p style={{ color: GRAY, fontSize: '13px', fontStyle: 'italic', marginBottom: '10px', lineHeight: 1.5 }}>
                      "{item.theme}"
                    </p>
                  )}
                  {item.kind === 'study' && item.creative_angle && (
                    <p style={{ color: GRAY, fontSize: '13px', fontStyle: 'italic', marginBottom: '10px', lineHeight: 1.5 }}>
                      "{item.creative_angle}"
                    </p>
                  )}
                  {item.kind === 'study' && item.subjects && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                      {item.subjects.map(s => (
                        <span key={s} style={{
                          background: CREAM, color: GRAY,
                          padding: '3px 10px', borderRadius: '100px', fontSize: '12px',
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  <p style={{ color: GRAY, fontSize: '12px' }}>{formatDate(item.created_at)}</p>
                </div>

                {/* PDF BUTTON — opens the designed PDF in a new tab */}
                <button
                  onClick={() => item.kind === 'tale' ? openTale(item) : downloadPDF(item)}
                  style={{
                    background: item.kind === 'tale' ? GREEN : DARK, color: 'white',
                    padding: '12px 20px', borderRadius: '12px',
                    border: 'none', fontSize: '13px', fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'Georgia, serif',
                    whiteSpace: 'nowrap', display: 'flex',
                    alignItems: 'center', gap: '6px',
                    boxShadow: '0 2px 8px rgba(8,80,65,0.2)',
                  }}
                >
                  {item.kind === 'tale' ? '📖 Read Tale' : '📄 View PDF'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
