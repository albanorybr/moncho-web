'use client'

// Sends an event to Google Tag Manager's dataLayer.
// GTM (container GTM-58X798ZL, loaded in app/layout.tsx) turns these into GA4 events.
// Never send personal data here (no emails, names or free-text the user typed).
export function track(event, params = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
