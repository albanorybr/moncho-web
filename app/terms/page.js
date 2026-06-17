export default function TermsPage() {
  const GREEN  = '#1D9E75'
  const DARK   = '#085041'
  const CREAM  = '#F7F4EF'
  const BORDER = '#E8E4DC'
  const GRAY   = '#5F5E5A'

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
        <a href="/" style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>
          ← Back home
        </a>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '56px 24px 80px' }}>

        <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '8px' }}>
          Terms of Service
        </h1>
        <p style={{ color: GRAY, fontSize: '14px', marginBottom: '40px' }}>
          Last updated: June 2026
        </p>

        <div style={{
          background: 'white', borderRadius: '16px', border: `1px solid ${BORDER}`,
          padding: '40px', lineHeight: 1.8, fontSize: '16px', color: '#1A1A1A',
        }}>

          <p style={{ marginBottom: '24px' }}>
            Welcome to Moncho Unschooling ("Moncho," "we," "us"). By creating an account or using
            our unit study generator, you agree to these Terms of Service. Please read them carefully.
          </p>

          <h2 style={sectionStyle()}>1. What Moncho Is</h2>
          <p style={pStyle()}>
            Moncho is an AI-powered tool that generates bilingual (English/Spanish) unit studies for
            homeschooling and unschooling families. Moncho is designed to be used by <strong>parents,
            guardians, and educators</strong> — not directly by children. Generated content should
            always be reviewed by an adult before being shared with or used by a child.
          </p>

          <h2 style={sectionStyle()}>2. AI-Generated Content & Its Limitations</h2>
          <p style={pStyle()}>
            Moncho uses artificial intelligence to generate unit study content. AI can make mistakes —
            it may occasionally produce inaccurate, incomplete, or inappropriate suggestions. You are
            responsible for reviewing all generated content before using it with your child. Moncho is
            an educational tool intended to support your homeschooling journey, not a substitute for
            your own judgment as a parent or educator.
          </p>

          <h2 style={sectionStyle()}>3. Personal & Family Use Only</h2>
          <p style={pStyle()}>
            Unit studies generated through Moncho are licensed for your <strong>personal, family, or
            individual educational use only</strong>. You may not resell, redistribute, sublicense, or
            commercially share generated unit studies — in whole or in part — with other families,
            students, or third parties. This includes selling PDFs, repackaging content for other
            homeschool groups, or distributing generated material as your own curriculum product.
          </p>
          <p style={pStyle()}>
            Moncho retains all rights to the underlying system, prompts, methodology, and technology
            used to generate content. Your subscription grants you a license to use the output for your
            own family or teaching practice — not ownership of the generative system itself.
          </p>

          <h2 style={sectionStyle()}>4. Restricted Themes</h2>
          <p style={pStyle()}>
            To keep Moncho appropriate for children of all ages, we do not generate unit studies about:
            politics, religion, gender ideology, violence, weapons, substance use, or other sensitive
            or inappropriate topics. Requests for these themes will be automatically declined. If you
            believe a theme was blocked in error, you're welcome to contact us.
          </p>

          <h2 style={sectionStyle()}>5. Accounts & Subscriptions</h2>
          <p style={pStyle()}>
            Free accounts include a limited number of unit study generations per month. Pro accounts
            include unlimited generations and additional features, for a recurring subscription fee.
            We may change pricing, limits, or included features from time to time; we'll make reasonable
            efforts to notify active subscribers of material changes in advance.
          </p>

          <h2 style={sectionStyle()}>6. How We Handle Your Data</h2>
          <p style={pStyle()}>
            We believe in being transparent about this. Unit studies you generate are stored securely
            in our database so they appear in your "My Studies" dashboard. Our team does not routinely
            browse or review individual unit studies. However, we may access stored content when
            necessary — for example, to provide technical support, troubleshoot issues, or investigate
            a suspected violation of these Terms (such as reselling or restricted-theme abuse).
          </p>
          <p style={pStyle()}>
            Generation requests are processed using Anthropic's API to power the AI. We do not sell
            your personal data to third parties.
          </p>

          <h2 style={sectionStyle()}>7. Acceptable Use</h2>
          <p style={pStyle()}>
            You agree not to misuse Moncho — including attempting to bypass restricted-theme protections,
            abusing the generation system (e.g., automated bulk requests), or using the service in any
            way that could harm Moncho, other users, or third parties.
          </p>

          <h2 style={sectionStyle()}>8. No Professional Advice</h2>
          <p style={pStyle()}>
            Moncho provides educational content suggestions only. It does not constitute professional
            curriculum certification, medical, psychological, or legal advice. For decisions involving
            your child's specific educational, developmental, or health needs, please consult an
            appropriate licensed professional.
          </p>

          <h2 style={sectionStyle()}>9. Limitation of Liability</h2>
          <p style={pStyle()}>
            Moncho is provided "as is." To the fullest extent permitted by law, we are not liable for
            any damages, losses, or issues arising from your use of the service or generated content —
            including but not limited to AI inaccuracies or how generated material is used with a child.
            Our total liability for any claim related to Moncho is limited to the amount you paid us in
            the past month of service.
          </p>

          <h2 style={sectionStyle()}>10. Termination</h2>
          <p style={pStyle()}>
            We may suspend or terminate accounts that violate these Terms — including reselling
            generated content, attempting to generate restricted themes, or abusing the system.
            We'll generally try to reach out first, except in cases of clear or repeated violations.
          </p>

          <h2 style={sectionStyle()}>11. Changes to These Terms</h2>
          <p style={pStyle()}>
            We may update these Terms from time to time as Moncho grows. We'll post the updated version
            here with a new "Last updated" date. Continued use of Moncho after changes means you accept
            the updated Terms.
          </p>

          <h2 style={sectionStyle()}>12. Contact Us</h2>
          <p style={{ ...pStyle(), marginBottom: 0 }}>
            Questions about these Terms? Reach out anytime at{' '}
            <a href="mailto:hello@monchounschooling.com" style={{ color: GREEN, fontWeight: 700 }}>
              hello@monchounschooling.com
            </a>.
          </p>

        </div>

        <p style={{ textAlign: 'center', color: GRAY, fontSize: '13px', marginTop: '32px' }}>
          🐱 Moncho Unschooling · monchounschooling.com
        </p>
      </div>
    </main>
  )
}

function sectionStyle() {
  return {
    fontSize: '19px', fontWeight: 700, color: '#085041',
    marginTop: '32px', marginBottom: '12px',
  }
}

function pStyle() {
  return { marginBottom: '16px', color: '#1A1A1A' }
}