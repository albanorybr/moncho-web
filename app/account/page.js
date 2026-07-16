'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const API_URL = 'https://moncho-api-production-2c00.up.railway.app'

const GREEN = '#1D9E75'
const DARK = '#085041'
const CREAM = '#F7F4EF'
const BORDER = '#E8E4DC'
const GRAY = '#5F5E5A'

export default function AccountPage() {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(null) // {plan, processor, can_cancel_online}
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/login'; return }
      setUser(session.user)
      try {
        const res = await fetch(`${API_URL}/billing/status`, {
          headers: { 'Authorization': `Bearer ${session.access_token}` },
        })
        setStatus(await res.json())
      } catch (e) {
        setError('Could not load your plan. Please refresh.')
      }
      setLoading(false)
    }
    load()
  }, [])

  async function cancelSubscription() {
    const sure = window.confirm(
      'Cancel your Pro subscription? You will keep Pro access until the end of your current billing period.')
    if (!sure) return
    setBusy(true)
    setError('')
    setMessage('')
    const { data: { session } } = await supabase.auth.getSession()
    try {
      const res = await fetch(`${API_URL}/billing/cancel`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session.access_token}` },
      })
      const data = await res.json()
      if (data.success) setMessage(data.message)
      else setError(data.error || 'Something went wrong.')
    } catch (e) {
      setError('Could not connect. Please try again.')
    }
    setBusy(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const isPro = status?.plan === 'pro'

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

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '48px 24px' }}>

        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '8px' }}>
          ⭐ My Plan
        </h1>
        <p style={{ color: GRAY, fontSize: '15px', marginBottom: '32px' }}>
          {user?.email}
        </p>

        {loading && (
          <div style={{ textAlign: 'center', padding: '48px', color: GRAY }}>
            Loading your plan...
          </div>
        )}

        {!loading && status && (
          <div style={{
            background: isPro ? DARK : 'white',
            borderRadius: '20px', padding: '32px',
            border: `1px solid ${BORDER}`,
          }}>
            <div style={{
              fontSize: '14px', fontWeight: 700,
              color: isPro ? 'rgba(255,255,255,0.7)' : GRAY, marginBottom: '4px',
            }}>
              CURRENT PLAN
            </div>
            <div style={{
              fontSize: '36px', fontWeight: 700,
              color: isPro ? 'white' : '#1A1A1A', marginBottom: '12px',
            }}>
              {isPro ? '🐱 Pro' : 'Free'}
            </div>
            <p style={{
              color: isPro ? 'rgba(255,255,255,0.85)' : GRAY,
              fontSize: '14px', lineHeight: 1.7, marginBottom: '24px',
            }}>
              {isPro
                ? 'Unlimited unit studies, all modes and subjects, PDF + email delivery.'
                : '2 unit studies per month, Mini mode, PDF download.'}
            </p>

            {!isPro && (
              <a href="/pricing" style={{
                display: 'block', textAlign: 'center',
                padding: '14px', borderRadius: '100px',
                background: GREEN, color: 'white',
                textDecoration: 'none', fontWeight: 700, fontSize: '15px',
              }}>
                🌟 Upgrade to Pro →
              </a>
            )}

            {isPro && (
              <div>
                <button
                  onClick={cancelSubscription}
                  disabled={busy}
                  style={{
                    display: 'block', width: '100%', textAlign: 'center',
                    padding: '12px', borderRadius: '100px',
                    background: 'none', color: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(255,255,255,0.4)',
                    fontWeight: 400, fontSize: '14px',
                    cursor: busy ? 'wait' : 'pointer', fontFamily: 'Georgia, serif',
                  }}
                >
                  {busy ? 'Cancelling…' : 'Cancel subscription'}
                </button>
                <p style={{
                  color: 'rgba(255,255,255,0.6)', fontSize: '12px',
                  textAlign: 'center', marginTop: '10px',
                }}>
                  You keep Pro access until the end of your billing period.
                </p>
              </div>
            )}
          </div>
        )}

        {message && (
          <p style={{
            background: '#E8F7F2', color: DARK, padding: '14px 18px',
            borderRadius: '12px', fontSize: '14px', marginTop: '16px',
          }}>
            ✅ {message}
          </p>
        )}
        {error && (
          <p style={{
            background: '#FDEDEA', color: '#B3261E', padding: '14px 18px',
            borderRadius: '12px', fontSize: '14px', marginTop: '16px',
          }}>
            {error}
          </p>
        )}

        <p style={{ color: GRAY, fontSize: '13px', marginTop: '32px', lineHeight: 1.7 }}>
          Questions about your subscription? Write to us and we'll help:
          {' '}<a href="mailto:hello@monchounschooling.com" style={{ color: GREEN }}>hello@monchounschooling.com</a>
        </p>

      </div>
    </main>
  )
}
