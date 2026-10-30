// Header and footer for the free unit study pages (matches the site's inline style).
const GREEN = '#1D9E75'
const DARK = '#085041'
const BORDER = '#E8E4DC'
const GRAY = '#5F5E5A'

export function FreeHeader() {
  return (
    <header style={{ background: 'white', borderBottom: `1px solid ${BORDER}`, fontFamily: 'Georgia, serif' }}>
      <nav aria-label="Main" style={{ maxWidth: 1120, margin: '0 auto', padding: '16px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
        <a href="/" style={{ fontSize: 22, fontWeight: 700, color: GREEN, textDecoration: 'none' }}>🐱 Moncho</a>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18, fontSize: 15 }}>
          <a href="/free" style={{ color: DARK, textDecoration: 'none', fontWeight: 700 }}>🎁 Free unit studies</a>
          <a href="/resources" style={{ color: GRAY, textDecoration: 'none' }}>📚 Resources</a>
          <a href="/pricing" style={{ color: GRAY, textDecoration: 'none' }}>Pricing</a>
          <a href="/login" style={{ background: GREEN, color: 'white', textDecoration: 'none', fontWeight: 700, padding: '11px 20px', borderRadius: 100 }}>Get Started</a>
        </div>
      </nav>
    </header>
  )
}

export function FreeFooter() {
  return (
    <footer style={{ borderTop: `1px solid ${BORDER}`, background: 'white', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '26px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, fontSize: 13, color: GRAY }}>
        <p style={{ margin: 0 }}>🐱 Moncho Unschooling · <a href="/" style={{ color: GREEN, textDecoration: 'none' }}>monchounschooling.com</a></p>
        <p style={{ margin: 0 }}>AI-generated content — please review before sharing with your child.</p>
      </div>
    </footer>
  )
}
