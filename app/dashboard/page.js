'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function DashboardPage() {
  const [studies, setStudies] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadData() {
      // Check auth
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
        return
      }
      setUser(session.user)

      // Load studies
      const { data, error } = await supabase
        .from('studies')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) {
        setStudies(data || [])
      }
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

  function downloadStudy(study) {
    const blob = new Blob([study.output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Moncho_${study.theme}_Unit_Study.txt`
    a.click()
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
        <a href="/" style={{
          fontSize: '20px', fontWeight: 700,
          color: '#1D9E75', textDecoration: 'none'
        }}>
          🐱 Moncho
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="/generate" style={{
            background: '#1D9E75', color: 'white',
            padding: '8px 20px', borderRadius: '100px',
            textDecoration: 'none', fontSize: '14px', fontWeight: 700,
          }}>
            + New Study
          </a>
          <button
            onClick={handleLogout}
            style={{
              background: 'none', border: '1px solid #E8E4DC',
              borderRadius: '100px', padding: '8px 16px',
              fontSize: '13px', color: '#5F5E5A',
              cursor: 'pointer', fontFamily: 'Georgia, serif',
            }}
          >
            Log out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '32px', fontWeight: 700,
            color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '8px',
          }}>
            My Studies
          </h1>
          <p style={{ color: '#5F5E5A', fontSize: '15px' }}>
            {user?.email} · {studies.length} unit {studies.length === 1 ? 'study' : 'studies'} generated
          </p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#5F5E5A' }}>
            Loading your studies...
          </div>
        )}

        {!loading && studies.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '64px 48px',
            background: 'white', borderRadius: '20px',
            border: '1px solid #E8E4DC',
          }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>🐱</p>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
              No studies yet!
            </h2>
            <p style={{ color: '#5F5E5A', marginBottom: '24px' }}>
              Generate your first unit study and it will appear here.
            </p>
            <a href="/generate" style={{
              background: '#1D9E75', color: 'white',
              padding: '12px 28px', borderRadius: '100px',
              textDecoration: 'none', fontSize: '15px', fontWeight: 700,
            }}>
              Generate a study →
            </a>
          </div>
        )}

        {!loading && studies.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {studies.map(study => (
              <div key={study.id} style={{
                background: 'white', borderRadius: '16px',
                padding: '24px', border: '1px solid #E8E4DC',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', gap: '16px',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A1A' }}>
                      {study.theme}
                    </h3>
                    <span style={{
                      background: study.language === 'Español' ? '#E8EAF6' : '#E8F7F2',
                      color: study.language === 'Español' ? '#283593' : '#1D9E75',
                      padding: '2px 10px', borderRadius: '100px',
                      fontSize: '12px', fontWeight: 600,
                    }}>
                      {study.language}
                    </span>
                  </div>
                  {study.creative_angle && (
                    <p style={{
                      color: '#5F5E5A', fontSize: '13px',
                      fontStyle: 'italic', marginBottom: '10px',
                      lineHeight: 1.5,
                    }}>
                      "{study.creative_angle}"
                    </p>
                  )}
                  {study.subjects && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                      {study.subjects.map(s => (
                        <span key={s} style={{
                          background: '#F7F4EF', color: '#5F5E5A',
                          padding: '3px 10px', borderRadius: '100px', fontSize: '12px',
                        }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                  <p style={{ color: '#5F5E5A', fontSize: '12px' }}>
                    {formatDate(study.created_at)}
                  </p>
                </div>
                <button
                  onClick={() => downloadStudy(study)}
                  style={{
                    background: '#F7F4EF', color: '#1A1A1A',
                    padding: '10px 18px', borderRadius: '100px',
                    border: '1px solid #E8E4DC', fontSize: '13px',
                    fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'Georgia, serif', whiteSpace: 'nowrap',
                  }}
                >
                  📥 Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}