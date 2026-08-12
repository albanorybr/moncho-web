'use client'

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#F7F4EF',
      fontFamily: "'Georgia', serif",
      overflowX: 'hidden',
    }}>

      {/* NAV */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        background: '#F7F4EF',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid #E8E4DC',
      }}>
        <div style={{
          fontSize: '22px',
          fontWeight: 700,
          color: '#1D9E75',
          letterSpacing: '-0.5px',
        }}>
          🐱 Moncho
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="/resources" style={{ color: '#5F5E5A', textDecoration: 'none', fontSize: '15px' }}>📚 Resources</a>
          <a href="/pricing" style={{ color: '#5F5E5A', textDecoration: 'none', fontSize: '15px' }}>Pricing</a>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a href="/dashboard" style={{
              color: '#5F5E5A',
              textDecoration: 'none',
              fontSize: '15px'
            }}>
              My Studies
            </a>
            <a href="/login" style={{
              background: '#1D9E75',
              color: 'white',
              padding: '10px 24px',
              borderRadius: '100px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
            }}>Get Started</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '100px 48px 80px',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block',
          background: '#E8F7F2',
          color: '#1D9E75',
          padding: '6px 18px',
          borderRadius: '100px',
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '32px',
          letterSpacing: '0.5px',
        }}>
          ✨ Unit studies in under 15 minutes
        </div>

        <h1 style={{
          fontSize: 'clamp(42px, 6vw, 72px)',
          fontWeight: 700,
          color: '#1A1A1A',
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-2px',
        }}>
          Learning adventures,<br />
          <span style={{ color: '#1D9E75' }}>made for your child.</span>
        </h1>

        <p style={{
          fontSize: '20px',
          color: '#5F5E5A',
          lineHeight: 1.7,
          maxWidth: '600px',
          margin: '0 auto 48px',
          fontFamily: 'Georgia, serif',
        }}>
          Moncho generates hands-on, print-ready unit study guides tailored to your child&apos;s age, interests, and learning style. In English or Spanish. In minutes.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/generate" style={{
            background: '#1D9E75',
            color: 'white',
            padding: '18px 40px',
            borderRadius: '100px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 700,
            display: 'inline-block',
            transition: 'transform 0.2s',
          }}>
            Generate a free study →
          </a>
          <a href="#how" style={{
            background: 'white',
            color: '#1A1A1A',
            padding: '18px 40px',
            borderRadius: '100px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 600,
            border: '2px solid #E8E4DC',
            display: 'inline-block',
          }}>
            See how it works
          </a>
        </div>

        {/* WHAT MONCHO IS (AND ISN'T) */}
        <div style={{
          maxWidth: '640px',
          margin: '56px auto 0',
          background: '#E8F7F2',
          border: '1px solid #C9EBDD',
          borderRadius: '20px',
          padding: '28px 32px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#085041',
            marginBottom: '10px',
          }}>
            Not a curriculum. Not worksheets. No answer key.
          </p>
          <p style={{
            fontSize: '16px',
            color: '#5F5E5A',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Every Moncho study is a guide full of ideas, challenges, and paths to explore — your child finds the answers by doing. <strong style={{ color: '#1D9E75' }}>AI plans. Kids DO.</strong>
          </p>
        </div>
      </section>

      {/* EXAMPLE CARD */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto 100px',
        padding: '0 48px',
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
          border: '1px solid #E8E4DC',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}>
            <div style={{
              background: '#E8F7F2',
              borderRadius: '12px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#1D9E75',
            }}>🌋 Volcanoes · Age 9 · English</div>
            <div style={{
              background: '#FFF8E1',
              borderRadius: '12px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#F0A500',
            }}>3 subjects · Mini mode</div>
          </div>

          <p style={{
            fontSize: '18px',
            color: '#1A1A1A',
            fontStyle: 'italic',
            lineHeight: 1.7,
            marginBottom: '32px',
            borderLeft: '4px solid #1D9E75',
            paddingLeft: '20px',
          }}>
            &quot;Build erupting models, explore the chemistry of lava lamps and baking soda reactions, and map real volcanic hotspots to understand the explosive forces that shape our planet from deep within.&quot;
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['🌋 Earth Science', '🧪 Chemistry', '🌍 Geography'].map(subject => (
              <div key={subject} style={{
                background: '#F7F4EF',
                borderRadius: '100px',
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#1A1A1A',
              }}>{subject}</div>
            ))}
          </div>

          <a href="/sample-study.pdf" target="_blank" style={{
            display: 'inline-block',
            background: '#085041',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '100px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 700,
          }}>
            📄 Download this sample study →
          </a>
        </div>
      </section>

      {/* LIVING BOOK TALES */}
      <section style={{ background: '#085041', padding: '100px 48px' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '64px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <div style={{ flex: '1 1 380px', minWidth: '320px' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.12)',
              color: '#FDF3E0',
              padding: '6px 18px',
              borderRadius: '100px',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '24px',
              letterSpacing: '0.5px',
            }}>
              ✨ New for Pro members
            </div>
            <h2 style={{
              fontSize: '42px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-1px',
              marginBottom: '20px',
              lineHeight: 1.15,
            }}>
              📖 Living Book Tales
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '18px',
              lineHeight: 1.7,
              marginBottom: '20px',
            }}>
              Beautifully illustrated storybooks in the Charlotte Mason spirit — real places, real life, told as a warm story your child can narrate back. Watercolor illustrations, a consistent main character, and a print-ready picture book delivered to your email.
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '15px',
              fontStyle: 'italic',
              marginBottom: '32px',
            }}>
              Pro members create up to 10 tales a month. In English or Spanish.
            </p>
            <a href="/tales" style={{
              background: 'white',
              color: '#085041',
              padding: '16px 36px',
              borderRadius: '100px',
              textDecoration: 'none',
              fontSize: '17px',
              fontWeight: 700,
              display: 'inline-block',
            }}>
              Create a tale →
            </a>
          </div>
          <div style={{ flex: '0 1 380px', textAlign: 'center' }}>
            <img
              src="/tale-sample.jpg"
              alt="Illustration from a Moncho living tale — the church steps of Santo Tomás, Chichicastenango"
              style={{
                width: '100%',
                maxWidth: '380px',
                borderRadius: '20px',
                boxShadow: '0 12px 48px rgba(0,0,0,0.35)',
              }}
            />
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px',
              fontStyle: 'italic',
              marginTop: '14px',
            }}>
              From &quot;El Tejido de Marta&quot; — a Moncho living tale
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{
        background: 'white',
        padding: '100px 48px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: '-1px',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            How it works
          </h2>
          <p style={{
            color: '#5F5E5A',
            fontSize: '18px',
            textAlign: 'center',
            marginBottom: '72px',
          }}>Three steps to a complete unit study</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
          }}>
            {[
              { num: '01', title: 'Choose a theme', desc: 'Enter any topic your child is curious about — Bees, Ancient Egypt, Zelda, Space, Cooking. Anything goes.' },
              { num: '02', title: 'Customize', desc: 'Set the age, language (English or Spanish), subjects, and learning style. Or just hit generate with the defaults.' },
              { num: '03', title: 'Print & explore', desc: 'Download a beautiful, print-ready PDF. Hands-on challenges, step-by-step, with Make it Easier and Level it Up options.' },
            ].map(step => (
              <div key={step.num} style={{
                background: '#F7F4EF',
                borderRadius: '20px',
                padding: '36px',
              }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#E8E4DC',
                  lineHeight: 1,
                  marginBottom: '16px',
                  fontFamily: 'Georgia, serif',
                }}>{step.num}</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginBottom: '12px',
                }}>{step.title}</h3>
                <p style={{
                  color: '#5F5E5A',
                  fontSize: '16px',
                  lineHeight: 1.6,
                }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section style={{ padding: '100px 48px', background: '#F7F4EF' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: '-1px',
            marginBottom: '16px',
          }}>Covers every subject</h2>
          <p style={{ color: '#5F5E5A', fontSize: '18px', marginBottom: '48px' }}>
            Moncho picks the subjects that fit your theme — not a rigid curriculum.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {[
              { emoji: '🔬', label: 'Science', color: '#E8F7F2', text: '#1D9E75' },
              { emoji: '📊', label: 'Math', color: '#EBF5FB', text: '#2E86C1' },
              { emoji: '🎨', label: 'Art', color: '#FFF0EB', text: '#E8522A' },
              { emoji: '📖', label: 'Language Arts', color: '#F5EEF8', text: '#7D3C98' },
              { emoji: '🌍', label: 'Geography', color: '#DDEEFF', text: '#0277BD' },
              { emoji: '📜', label: 'History', color: '#FFF8E1', text: '#F0A500' },
              { emoji: '💡', label: 'Critical Thinking', color: '#F5EEF8', text: '#7D3C98' },
              { emoji: '🛠', label: 'Life Skills', color: '#FBE9E7', text: '#E64A19' },
              { emoji: '💻', label: 'Technology', color: '#E8EAF6', text: '#283593' },
              { emoji: '🎵', label: 'Music', color: '#FCE4EC', text: '#C2185B' },
            ].map(s => (
              <div key={s.label} style={{
                background: s.color,
                color: s.text,
                padding: '10px 20px',
                borderRadius: '100px',
                fontSize: '15px',
                fontWeight: 600,
              }}>{s.emoji} {s.label}</div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: '100px 48px', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: '-1px',
            marginBottom: '16px',
          }}>Simple pricing</h2>
          <p style={{ color: '#5F5E5A', fontSize: '18px', marginBottom: '64px' }}>
            Start free. Upgrade when you&apos;re ready.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {/* Free */}
            <div style={{
              background: '#F7F4EF',
              borderRadius: '24px',
              padding: '48px 40px',
              textAlign: 'left',
            }}>
              <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Free</div>
              <div style={{ fontSize: '48px', fontWeight: 700, color: '#1A1A1A', marginBottom: '4px' }}>$0</div>
              <div style={{ color: '#5F5E5A', fontSize: '15px', marginBottom: '32px' }}>forever</div>
              {['2 unit studies/month', 'Mini mode', 'English & Spanish', 'PDF download'].map(f => (
                <div key={f} style={{ display: 'flex', gap: '10px', marginBottom: '12px', fontSize: '16px', color: '#1A1A1A' }}>
                  <span style={{ color: '#1D9E75' }}>✓</span> {f}
                </div>
              ))}
              <a href="/login" style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '32px',
                padding: '14px',
                borderRadius: '100px',
                border: '2px solid #1D9E75',
                color: '#1D9E75',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '16px',
              }}>Get started free</a>
            </div>

            {/* Pro */}
            <div style={{
              background: '#1D9E75',
              borderRadius: '24px',
              padding: '48px 40px',
              textAlign: 'left',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'white',
                color: '#1D9E75',
                padding: '4px 12px',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 700,
              }}>POPULAR</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Pro</div>
              <div style={{ fontSize: '48px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>$9</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginBottom: '32px' }}>per month</div>
              {['Unlimited unit studies', '📖 10 Living Book Tales/month', 'All modes & styles', 'All 12 subjects', 'English & Spanish', 'PDF download', 'Study history'].map(f => (
                <div key={f} style={{ display: 'flex', gap: '10px', marginBottom: '12px', fontSize: '16px', color: 'white' }}>
                  <span style={{ color: 'rgba(255,255,255,0.8)' }}>✓</span> {f}
                </div>
              ))}
              <a href="/login?plan=pro" style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '32px',
                padding: '14px',
                borderRadius: '100px',
                background: 'white',
                color: '#1D9E75',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '16px',
              }}>Start Pro →</a>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY FAQ */}
      <section style={{ padding: '100px 48px', background: '#F7F4EF' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '42px',
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: '-1px',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            Good questions, curious parents 💭
          </h2>
          <p style={{
            color: '#5F5E5A',
            fontSize: '18px',
            textAlign: 'center',
            marginBottom: '56px',
          }}>
            What Moncho is — and what it isn&apos;t.
          </p>

          {[
            {
              q: 'Does it come with the answers?',
              a: <>Nope — and it&apos;s on purpose. 😉 A Moncho unit study is an <strong>idea guide</strong>: it proposes themes, challenges, and paths to explore one topic through every subject. There&apos;s no answer key hiding on the last page — because the answers aren&apos;t ours to give. Curious minds don&apos;t need answers handed to them; they need something worth investigating. Your child finds the answers by building, experimenting, asking, and discovering. That&apos;s the whole adventure.</>,
            },
            {
              q: 'Is Moncho a curriculum?',
              a: <>No. A curriculum tells you what to learn, in what order, by what date. Moncho hands you a map with lots of trails — you and your child pick which ones to follow, skip, or invent along the way. Use one challenge or twenty. There&apos;s no falling behind, because there&apos;s no schedule to fall behind on.</>,
            },
            {
              q: 'Are these worksheets?',
              a: <>Not even close. You won&apos;t find fill-in-the-blanks here. You&apos;ll find challenges: build it, test it, draw it, measure it, tell its story. If it can be done sitting still with a pencil only… we probably didn&apos;t include it.</>,
            },
          ].map(item => (
            <div key={item.q} style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px 36px',
              marginBottom: '16px',
              border: '1px solid #E8E4DC',
            }}>
              <p style={{
                fontWeight: 700,
                fontSize: '19px',
                marginBottom: '12px',
                color: '#1A1A1A',
              }}>
                {item.q}
              </p>
              <p style={{
                color: '#5F5E5A',
                fontSize: '16px',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {item.a}
              </p>
            </div>
          ))}

          <p style={{
            textAlign: 'center',
            marginTop: '40px',
            fontSize: '20px',
            fontWeight: 700,
            color: '#1D9E75',
          }}>
            AI plans. Kids DO. 🚀
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#085041',
        padding: '100px 48px',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: 700,
          color: 'white',
          letterSpacing: '-1px',
          marginBottom: '20px',
        }}>Ready to explore?</h2>
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '20px',
          marginBottom: '48px',
        }}>Your first idea guide is minutes away. Free.</p>
        <a href="/generate" style={{
          background: '#1D9E75',
          color: 'white',
          padding: '20px 48px',
          borderRadius: '100px',
          textDecoration: 'none',
          fontSize: '20px',
          fontWeight: 700,
          display: 'inline-block',
        }}>Generate your first study →</a>

        {/* AI DISCLAIMER */}
        <div style={{
          marginTop: '32px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '16px 24px',
          maxWidth: '560px',
          margin: '32px auto 0',
          display: 'block',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', margin: '0', fontFamily: 'Georgia, serif' }}>
            🤖 <strong style={{ color: 'white' }}>Moncho is an AI-powered tool designed for parents and educators.</strong> AI can make mistakes — always review the generated unit study before sharing it with your child. You know your child best!
          </p>
        </div>

      </section>
      {/* FOOTER */}
      <footer style={{
        background: '#F7F4EF',
        padding: '48px',
        textAlign: 'center',
        borderTop: '1px solid #E8E4DC',
        color: '#5F5E5A',
        fontSize: '14px',
      }}>
        <div style={{ marginBottom: '8px', fontWeight: 600, color: '#1D9E75' }}>🐱 Moncho Unschooling</div>
        <div style={{ marginBottom: '16px' }}>By Alba Nory de González / Dicarba · monchounschooling.com</div>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', fontSize: '13px' }}>
          <a href="/terms" style={{ color: '#5F5E5A', textDecoration: 'none' }}>Terms of Service</a>
          <a href="/resources" style={{ color: '#5F5E5A', textDecoration: 'none' }}>Resources</a>
          <a href="/pricing" style={{ color: '#5F5E5A', textDecoration: 'none' }}>Pricing</a>
          <a href="https://www.instagram.com/monchounschooling/" target="_blank" rel="noopener"
             style={{ color: '#1D9E75', textDecoration: 'none', fontWeight: 600 }}>
            📷 Instagram
          </a>
        </div>
      </footer>

    </main>
  )
}
