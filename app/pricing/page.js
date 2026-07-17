'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

const API_URL = 'https://moncho-api-production-2c00.up.railway.app'

// PayPal (USD only) — the client id is public by design
const PAYPAL_CLIENT_ID = 'AcZ6YN0OxH1P_Z1cNk5r1VYiqTwFc7OZpt8yoNc1Jh9tw-SxbWPzl657OF4CsvyujrjE71f6eT3vKmFr'
const PAYPAL_PLAN_MONTHLY = 'P-144282947W404122GNJMFA7Y' // $9/mo
const PAYPAL_PLAN_YEARLY = 'P-7FV029950U1023700NJMFA7Y'  // $76/yr

export default function PricingPage() {
  const [currency, setCurrency] = useState('GTQ')
  const [billing, setBilling] = useState('monthly')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [needLogin, setNeedLogin] = useState(false)
  const paypalRef = useRef(null)

  const isGTQ = currency === 'GTQ'
  const isYearly = billing === 'yearly'

  const monthlyPrice = isGTQ ? 'Q69' : '$9'
  const yearlyPrice = isGTQ ? 'Q602' : '$76'
  const yearlyMonthly = isGTQ ? 'Q50' : '$6.33'
  const savings = isGTQ ? 'Q226' : '$32'

  // ── Card checkout via Recurrente (GTQ + USD) ────────────────
  async function cardCheckout() {
    setError('')
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) { window.location.href = '/login'; return }
    setBusy(true)
    try {
      const plan = `${isYearly ? 'yearly' : 'monthly'}_${isGTQ ? 'gtq' : 'usd'}`
      const res = await fetch(`${API_URL}/billing/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        setError(data.error || 'Could not start checkout. Please try again.')
        setBusy(false)
      }
    } catch (e) {
      setError('Could not connect. Please try again.')
      setBusy(false)
    }
  }

  // ── PayPal buttons (USD only) ───────────────────────────────
  useEffect(() => {
    if (isGTQ) return

    let cancelled = false
    async function renderPayPal() {
      const { data: { session } } = await supabase.auth.getSession()
      if (cancelled) return
      if (!session) { setNeedLogin(true); return }
      setNeedLogin(false)
      const userId = session.user.id

      function draw() {
        if (cancelled || !window.paypal || !paypalRef.current) return
        paypalRef.current.innerHTML = ''
        window.paypal.Buttons({
          style: { shape: 'pill', label: 'subscribe', height: 45 },
          createSubscription: (data, actions) => actions.subscription.create({
            plan_id: isYearly ? PAYPAL_PLAN_YEARLY : PAYPAL_PLAN_MONTHLY,
            custom_id: userId, // ← how the webhook knows WHO to upgrade
          }),
          onApprove: () => {
            window.location.href = '/dashboard?upgraded=1'
          },
          onError: () => setError('PayPal error — please try again or use a card.'),
        }).render(paypalRef.current)
      }

      if (window.paypal) { draw(); return }
      const s = document.createElement('script')
      s.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`
      s.onload = draw
      document.body.appendChild(s)
    }
    renderPayPal()
    return () => { cancelled = true }
  }, [currency, billing, isGTQ, isYearly])

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
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="/dashboard" style={{ color: '#5F5E5A', textDecoration: 'none', fontSize: '14px' }}>
            My Studies
          </a>
          <a href="/login" style={{
            background: '#1D9E75', color: 'white',
            padding: '8px 20px', borderRadius: '100px',
            textDecoration: 'none', fontSize: '14px', fontWeight: 700,
          }}>
            Get Started
          </a>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '42px', fontWeight: 700,
            color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '12px',
          }}>
            Simple, honest pricing
          </h1>
          <p style={{ color: '#5F5E5A', fontSize: '18px' }}>
            Start free. Upgrade when you're ready for unlimited unit studies.
          </p>
        </div>

        {/* Currency + Billing toggles */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '16px', marginBottom: '40px', flexWrap: 'wrap',
        }}>
          <div style={{
            background: 'white', borderRadius: '100px',
            padding: '4px', border: '1px solid #E8E4DC',
            display: 'flex', gap: '4px',
          }}>
            {['GTQ', 'USD'].map(c => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                style={{
                  padding: '8px 20px', borderRadius: '100px', border: 'none',
                  background: currency === c ? '#1D9E75' : 'transparent',
                  color: currency === c ? 'white' : '#5F5E5A',
                  fontWeight: currency === c ? 700 : 400,
                  fontSize: '14px', cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {c === 'GTQ' ? '🇬🇹 Quetzales' : '🇺🇸 Dollars'}
              </button>
            ))}
          </div>

          <div style={{
            background: 'white', borderRadius: '100px',
            padding: '4px', border: '1px solid #E8E4DC',
            display: 'flex', gap: '4px',
          }}>
            {[
              { key: 'monthly', label: 'Monthly' },
              { key: 'yearly', label: `Yearly — save ${savings}` },
            ].map(b => (
              <button
                key={b.key}
                onClick={() => setBilling(b.key)}
                style={{
                  padding: '8px 20px', borderRadius: '100px', border: 'none',
                  background: billing === b.key ? '#1D9E75' : 'transparent',
                  color: billing === b.key ? 'white' : '#5F5E5A',
                  fontWeight: billing === b.key ? 700 : 400,
                  fontSize: '14px', cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '64px',
        }}>

          {/* Free */}
          <div style={{
            background: 'white', borderRadius: '24px',
            padding: '40px', border: '1px solid #E8E4DC',
          }}>
            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#1A1A1A' }}>
              Free
            </div>
            <div style={{ fontSize: '48px', fontWeight: 700, color: '#1A1A1A', marginBottom: '4px' }}>
              {isGTQ ? 'Q0' : '$0'}
            </div>
            <div style={{ color: '#5F5E5A', fontSize: '14px', marginBottom: '32px' }}>
              para siempre / forever
            </div>
            {[
              '2 unit studies per month',
              'Mini mode (3 subjects)',
              'English & Spanish',
              'PDF download',
            ].map(f => (
              <div key={f} style={{
                display: 'flex', gap: '10px',
                marginBottom: '10px', fontSize: '15px', color: '#1A1A1A',
              }}>
                <span style={{ color: '#1D9E75' }}>✓</span> {f}
              </div>
            ))}
            <a href="/login" style={{
              display: 'block', textAlign: 'center', marginTop: '28px',
              padding: '14px', borderRadius: '100px',
              border: '2px solid #1D9E75', color: '#1D9E75',
              textDecoration: 'none', fontWeight: 700, fontSize: '15px',
            }}>
              Start free
            </a>
          </div>

          {/* Pro */}
          <div style={{
            background: '#1D9E75', borderRadius: '24px',
            padding: '40px', position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'white', color: '#1D9E75',
              padding: '4px 12px', borderRadius: '100px',
              fontSize: '11px', fontWeight: 700,
            }}>
              POPULAR
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: 'white' }}>
              Pro
            </div>
            <div style={{ fontSize: '48px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
              {isYearly ? yearlyMonthly : monthlyPrice}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '8px' }}>
              per month
            </div>
            {isYearly && (
              <div style={{
                color: 'rgba(255,255,255,0.9)', fontSize: '13px',
                marginBottom: '24px', fontStyle: 'italic',
              }}>
                Billed {yearlyPrice}/year — save {savings}!
              </div>
            )}
            <div style={{ marginBottom: '32px', marginTop: isYearly ? '0' : '32px' }}>
              {[
                'Unlimited unit studies',
                '📖 10 illustrated Living Book Tales / month',
                'All modes (Mini, Full, Custom)',
                'All subjects',
                'English & Spanish',
                'PDF download + email delivery',
                'Study history',
              ].map(f => (
                <div key={f} style={{
                  display: 'flex', gap: '10px',
                  marginBottom: '10px', fontSize: '15px', color: 'white',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>✓</span> {f}
                </div>
              ))}
            </div>

            {/* Card checkout (Recurrente) — GTQ and USD */}
            <button
              onClick={cardCheckout}
              disabled={busy}
              style={{
                display: 'block', width: '100%', textAlign: 'center',
                padding: '14px', borderRadius: '100px',
                background: 'white', color: '#1D9E75', border: 'none',
                fontWeight: 700, fontSize: '15px', cursor: busy ? 'wait' : 'pointer',
                fontFamily: 'Georgia, serif', marginBottom: '12px',
              }}
            >
              {busy ? 'Opening secure checkout…' : '💳 Upgrade with card →'}
            </button>

            {/* PayPal (USD only) */}
            {!isGTQ && (
              <div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  margin: '16px 0',
                }}>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.35)' }} />
                  <span style={{
                    color: 'white', fontSize: '15px', fontWeight: 700,
                  }}>
                    or pay with PayPal
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.35)' }} />
                </div>
                {needLogin ? (
                  <a href="/login" style={{
                    display: 'block', textAlign: 'center',
                    padding: '14px', borderRadius: '100px',
                    background: '#FFC439', color: '#003087',
                    textDecoration: 'none', fontWeight: 700, fontSize: '15px',
                  }}>
                    🅿️ PayPal — log in to subscribe
                  </a>
                ) : (
                  <div ref={paypalRef} />
                )}
              </div>
            )}

            {error && (
              <p style={{
                color: 'white', background: 'rgba(0,0,0,0.2)',
                padding: '10px 14px', borderRadius: '10px',
                fontSize: '13px', marginTop: '12px',
              }}>
                {error}
              </p>
            )}
            <p style={{
              color: 'rgba(255,255,255,0.6)', fontSize: '11px',
              textAlign: 'center', marginTop: '14px',
            }}>
              Cancel anytime. Secure payments by Recurrente{isGTQ ? '' : ' & PayPal'}.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px', fontWeight: 700,
            color: '#1A1A1A', letterSpacing: '-0.5px',
            marginBottom: '32px', textAlign: 'center',
          }}>
            Common questions
          </h2>
          {[
            {
              q: 'What is a unit study?',
              a: 'A unit study is a hands-on learning guide that explores one theme across multiple subjects — science, math, art, and more. Perfect for homeschooling and unschooling families.',
            },
            {
              q: 'What are Living Book Tales?',
              a: 'Illustrated storybooks in the Charlotte Mason "living books" spirit — real places, real life, told as a warm story with beautiful watercolor illustrations. Pro members can create up to 10 tales per month, in English or Spanish.',
            },
            {
              q: 'Can I cancel anytime?',
              a: 'Yes! You can cancel your Pro subscription at any time. You\'ll keep access until the end of your billing period.',
            },
            {
              q: 'How can I pay?',
              a: 'With any credit or debit card (in Quetzales or Dollars, processed securely by Recurrente), or with PayPal for Dollar subscriptions.',
            },
            {
              q: 'What languages are supported?',
              a: 'Moncho generates unit studies in English and Spanish. More languages coming soon!',
            },
            {
              q: 'How long does generation take?',
              a: 'Usually 1-2 minutes for a Mini study (3 subjects) and around 3 minutes for a Full study. You\'ll see live progress while it generates — with our running cat. 🐱',
            },
          ].map(item => (
            <div key={item.q} style={{
              background: 'white', borderRadius: '16px',
              padding: '24px', marginBottom: '12px',
              border: '1px solid #E8E4DC',
            }}>
              <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: '#1A1A1A' }}>
                {item.q}
              </p>
              <p style={{ color: '#5F5E5A', fontSize: '14px', lineHeight: 1.6 }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer style={{
        background: '#F7F4EF', padding: '48px',
        textAlign: 'center', borderTop: '1px solid #E8E4DC',
        color: '#5F5E5A', fontSize: '14px',
      }}>
        <div style={{ marginBottom: '8px', fontWeight: 600, color: '#1D9E75' }}>🐱 Moncho Unschooling</div>
        <div>By Alba Nory de González · monchounschooling.com</div>
      </footer>

    </main>
  )
}
