'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [mode, setMode] = useState('login') // login | signup
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit() {
    setLoading(true)
    setError('')
    setMessage('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      setLoading(false)
      return
    }

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setMessage('✅ Account created! Check your email to confirm, then log in.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        window.location.href = '/generate'
      }
    }

    setLoading(false)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#F7F4EF',
      fontFamily: 'Georgia, serif',
      display: 'flex',
      flexDirection: 'column',
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
      </nav>

      {/* FORM */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px',
          width: '100%',
          maxWidth: '440px',
          border: '1px solid #E8E4DC',
          boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: '-0.5px',
            marginBottom: '8px',
          }}>
            {mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </h1>
          <p style={{
            color: '#5F5E5A',
            fontSize: '15px',
            marginBottom: '32px',
          }}>
            {mode === 'login'
              ? 'Log in to generate unit studies for your child.'
              : 'Start free — 2 unit studies per month, no credit card needed.'}
          </p>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontWeight: 700,
              fontSize: '14px',
              marginBottom: '6px',
              color: '#1A1A1A',
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '2px solid #E8E4DC',
                fontSize: '15px',
                fontFamily: 'Georgia, serif',
                background: '#FAFAFA',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = '#1D9E75'}
              onBlur={e => e.target.style.borderColor = '#E8E4DC'}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontWeight: 700,
              fontSize: '14px',
              marginBottom: '6px',
              color: '#1A1A1A',
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '2px solid #E8E4DC',
                fontSize: '15px',
                fontFamily: 'Georgia, serif',
                background: '#FAFAFA',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = '#1D9E75'}
              onBlur={e => e.target.style.borderColor = '#E8E4DC'}
            />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#FFF0EB',
              border: '1px solid #E8522A',
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '16px',
              color: '#E8522A',
              fontSize: '14px',
            }}>
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div style={{
              background: '#E8F7F2',
              border: '1px solid #1D9E75',
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '16px',
              color: '#085041',
              fontSize: '14px',
            }}>
              {message}
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#5F5E5A' : '#1D9E75',
              color: 'white',
              padding: '14px',
              borderRadius: '100px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Georgia, serif',
              marginBottom: '20px',
            }}
          >
            {loading ? '...' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>

          {/* Toggle mode */}
          <p style={{
            textAlign: 'center',
            color: '#5F5E5A',
            fontSize: '14px',
          }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setError('')
                setMessage('')
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#1D9E75',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'Georgia, serif',
              }}
            >
              {mode === 'login' ? 'Sign up free' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}
