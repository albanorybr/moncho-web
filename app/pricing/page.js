'use client'

import { useState } from 'react'

const QPAYPRO = {
  GTQ_MONTHLY: 'https://payments.qpaypro.com/checkout/suscripcion/4825/uITsLTLZTD',
  GTQ_YEARLY:  'https://payments.qpaypro.com/checkout/suscripcion/4825/ODS4m1Olmn',
  USD_MONTHLY: 'https://payments.qpaypro.com/checkout/suscripcion/4825/1cmxAfMmtX',
  USD_YEARLY:  'https://payments.qpaypro.com/checkout/suscripcion/4825/xqq1WaATk9',
}

export default function PricingPage() {
  const [currency, setCurrency] = useState('GTQ')
  const [billing, setBilling] = useState('monthly')

  const isGTQ = currency === 'GTQ'
  const isYearly = billing === 'yearly'

  const checkoutUrl = isGTQ
    ? (isYearly ? QPAYPRO.GTQ_YEARLY : QPAYPRO.GTQ_MONTHLY)
    : (isYearly ? QPAYPRO.USD_YEARLY : QPAYPRO.USD_MONTHLY)

  const monthlyPrice = isGTQ ? 'Q69' : '$9'
  const yearlyPrice  = isGTQ ? 'Q602' : '$76'
  const yearlyMonthly = isGTQ ? 'Q50' : '$6.33'
  const savings = isGTQ ? 'Q226' : '$32'

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
          {/* Currency toggle */}
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

          {/* Billing toggle */}
          <div style={{
            background: 'white', borderRadius: '100px',
            padding: '4px', border: '1px solid #E8E4DC',
            display: 'flex', gap: '4px',
          }}>
            {[
              { key: 'monthly', label: 'Monthly' },
              { key: 'yearly',  label: `Yearly — save ${savings}` },
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
                'All modes (Mini, Full, STEM)',
                'All 12 subjects',
                'English & Spanish',
                'PDF download',
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
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', textAlign: 'center',
                padding: '14px', borderRadius: '100px',
                background: 'white', color: '#1D9E75',
                textDecoration: 'none', fontWeight: 700, fontSize: '15px',
              }}
            >
              Upgrade to Pro →
            </a>
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
              q: 'Can I cancel anytime?',
              a: 'Yes! You can cancel your Pro subscription at any time. You\'ll keep access until the end of your billing period.',
            },
            {
              q: 'What languages are supported?',
              a: 'Moncho generates unit studies in English and Spanish. More languages coming soon!',
            },
            {
              q: 'How long does generation take?',
              a: 'Usually 1-2 minutes for a Mini study (3 subjects) and 3-4 minutes for a Full study. You\'ll see progress updates while it generates.',
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