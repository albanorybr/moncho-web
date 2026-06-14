'use client'

import { useState } from 'react'

const CATEGORIES = [
  { id: 'all', label: '✨ All' },
  { id: 'books', label: '📚 Books' },
  { id: 'art', label: '🎨 Art Supplies' },
  { id: 'science', label: '🔬 Science Kits' },
  { id: 'games', label: '🎲 Games & Puzzles' },
  { id: 'nature', label: '🌿 Nature Tools' },
]

const PHILOSOPHIES = [
  { id: 'all', label: '🐱 All Styles' },
  { id: 'moncho', label: '🐱 Moncho Style' },
  { id: 'charlotte_mason', label: '📖 Charlotte Mason' },
  { id: 'waldorf', label: '🌿 Waldorf' },
  { id: 'forest_school', label: '🌲 Forest School' },
  { id: 'montessori', label: '🌱 Montessori' },
  { id: 'unschooling', label: '🌎 Unschooling' },
]

const RESOURCES = [
  // Charlotte Mason Books
  {
    id: 1,
    title: 'Handbook of Nature Study',
    author: 'Anna Botsford Comstock',
    description: 'The ultimate nature study companion — 900 pages of field observations, drawings, and lesson guides for every creature and plant you\'ll encounter outdoors.',
    category: 'books',
    philosophies: ['charlotte_mason', 'forest_school', 'unschooling'],
    emoji: '🌿',
    searchUrl: 'https://www.amazon.com/s?k=Handbook+of+Nature+Study+Comstock',
    age: 'All ages',
    highlight: 'Charlotte Mason essential',
  },
  {
    id: 2,
    title: 'The Burgess Bird Book for Children',
    author: 'Thornton W. Burgess',
    description: 'A living book classic — stories about birds told through the eyes of a curious boy, making ornithology feel like an adventure, not a lesson.',
    category: 'books',
    philosophies: ['charlotte_mason', 'unschooling'],
    emoji: '🐦',
    searchUrl: 'https://www.amazon.com/s?k=Burgess+Bird+Book+Children',
    age: '6-12',
    highlight: 'Living book classic',
  },
  {
    id: 3,
    title: 'A Child\'s History of the World',
    author: 'V. M. Hillyer',
    description: 'History as it should be told — as a story. From ancient civilizations to modern times, written for curious minds who want to understand how we got here.',
    category: 'books',
    philosophies: ['charlotte_mason'],
    emoji: '📜',
    searchUrl: 'https://www.amazon.com/s?k=Child+History+World+Hillyer',
    age: '8-14',
    highlight: 'Narrative history',
  },
  {
    id: 4,
    title: 'An Extraordinary Life: The Story of a Monarch Butterfly',
    author: 'Laurence Pringle',
    description: 'Follow one Monarch butterfly from egg to migration in vivid detail. Perfect companion for any butterfly or migration unit study.',
    category: 'books',
    philosophies: ['charlotte_mason', 'moncho', 'unschooling'],
    emoji: '🦋',
    searchUrl: 'https://www.amazon.com/s?k=Extraordinary+Life+Monarch+Butterfly+Pringle',
    age: '8-12',
    highlight: 'Unit study companion',
  },
  {
    id: 5,
    title: 'Waiting for Wings',
    author: 'Lois Ehlert',
    description: 'Gorgeous die-cut illustrations show the butterfly life cycle in a way that\'s as beautiful as any picture book. Perfect for younger learners.',
    category: 'books',
    philosophies: ['charlotte_mason', 'waldorf', 'moncho'],
    emoji: '🌸',
    searchUrl: 'https://www.amazon.com/s?k=Waiting+for+Wings+Lois+Ehlert',
    age: '4-8',
    highlight: 'Beautiful illustrations',
  },

  // Waldorf supplies
  {
    id: 6,
    title: 'Stockmar Beeswax Crayons',
    author: 'Stockmar',
    description: 'The gold standard for Waldorf art. Pure beeswax crayons with rich, translucent colors that blend beautifully. Last for years and feel like real art tools.',
    category: 'art',
    philosophies: ['waldorf'],
    emoji: '🕯️',
    searchUrl: 'https://www.amazon.com/s?k=Stockmar+Beeswax+Crayons',
    age: 'All ages',
    highlight: 'Waldorf essential',
  },
  {
    id: 7,
    title: 'Stockmar Watercolor Paints',
    author: 'Stockmar',
    description: 'Transparent watercolors made for wet-on-wet painting — the Waldorf technique where paint flows freely on wet paper, creating luminous, dreamy results.',
    category: 'art',
    philosophies: ['waldorf'],
    emoji: '🌈',
    searchUrl: 'https://www.amazon.com/s?k=Stockmar+Watercolor+Paints',
    age: 'All ages',
    highlight: 'Wet-on-wet painting',
  },
  {
    id: 8,
    title: 'Natural Beeswax Modeling Wax',
    author: 'Filana',
    description: 'Soft, warm beeswax that children warm with their hands before molding. Develops fine motor skills while creating beautiful, natural sculptures.',
    category: 'art',
    philosophies: ['waldorf'],
    emoji: '🐝',
    searchUrl: 'https://www.amazon.com/s?k=natural+beeswax+modeling+wax+children',
    age: '5-adult',
    highlight: 'Sensory & calming',
  },

  // Montessori materials
  {
    id: 9,
    title: 'Sandpaper Letters — Lowercase',
    author: 'Montessori Services',
    description: 'The classic Montessori reading material. Children trace the letters with their fingers, learning through touch, sight, and sound simultaneously.',
    category: 'nature',
    philosophies: ['montessori'],
    emoji: '🔤',
    searchUrl: 'https://www.amazon.com/s?k=Montessori+sandpaper+letters+lowercase',
    age: '3-6',
    highlight: 'Multi-sensory learning',
  },
  {
    id: 10,
    title: 'Wooden Math Counting Beads',
    author: 'Various',
    description: 'Hands-on math the Montessori way — count, sort, add, and multiply with tactile beads that make abstract numbers concrete and real.',
    category: 'nature',
    philosophies: ['montessori'],
    emoji: '🧮',
    searchUrl: 'https://www.amazon.com/s?k=Montessori+wooden+counting+beads+math',
    age: '4-9',
    highlight: 'Concrete math',
  },

  // Science kits
  {
    id: 11,
    title: 'Butterfly Garden with Live Caterpillars',
    author: 'Insect Lore',
    description: 'Watch the complete metamorphosis happen in your own home. Ships with live caterpillars and a pop-up habitat. The most powerful science lesson we know.',
    category: 'science',
    philosophies: ['moncho', 'forest_school', 'unschooling', 'charlotte_mason'],
    emoji: '🦋',
    searchUrl: 'https://www.amazon.com/s?k=Insect+Lore+butterfly+garden+live+caterpillars',
    age: '5-12',
    highlight: 'Real metamorphosis',
  },
  {
    id: 12,
    title: 'National Audubon Society Field Guides',
    author: 'Audubon Society',
    description: 'The best field guides for real naturalist work. Birds, insects, wildflowers, rocks — get the one for your region and take it everywhere.',
    category: 'books',
    philosophies: ['charlotte_mason', 'forest_school', 'unschooling', 'moncho'],
    emoji: '🔍',
    searchUrl: 'https://www.amazon.com/s?k=Audubon+Society+field+guide',
    age: '8-adult',
    highlight: 'Real naturalist tool',
  },
  {
    id: 13,
    title: 'Kids Microscope with Prepared Slides',
    author: 'AmScope',
    description: 'A real microscope (not a toy) that opens up the invisible world. Comes with prepared slides and blank ones for your own specimens.',
    category: 'science',
    philosophies: ['moncho', 'unschooling'],
    emoji: '🔬',
    searchUrl: 'https://www.amazon.com/s?k=kids+microscope+prepared+slides+AmScope',
    age: '8-adult',
    highlight: 'Real science tool',
  },

  // Games & Puzzles
  {
    id: 14,
    title: 'Timeline Card Game',
    author: 'Asmodee',
    description: 'Place historical events in order before your opponents. Sneaks in history, critical thinking, and chronology while everyone is busy having fun.',
    category: 'games',
    philosophies: ['moncho', 'unschooling', 'charlotte_mason'],
    emoji: '🃏',
    searchUrl: 'https://www.amazon.com/s?k=Timeline+card+game+Asmodee',
    age: '8-adult',
    highlight: 'History through play',
  },
  {
    id: 15,
    title: 'Wildcraft! Cooperative Herbal Adventure Game',
    author: 'LearningHerbs',
    description: 'A cooperative board game where players use herbal plants to heal ailments and get everyone home safely. Teaches 25 plants while playing.',
    category: 'games',
    philosophies: ['forest_school', 'waldorf', 'unschooling'],
    emoji: '🌱',
    searchUrl: 'https://www.amazon.com/s?k=Wildcraft+herbal+adventure+board+game',
    age: '6-adult',
    highlight: 'Nature + cooperation',
  },
  {
    id: 16,
    title: 'Botany in 8 Lessons Card Game',
    author: 'Various',
    description: 'A beautiful card game that teaches plant anatomy, life cycles, and ecology through gorgeous illustrated cards and simple gameplay.',
    category: 'games',
    philosophies: ['moncho', 'charlotte_mason', 'forest_school'],
    emoji: '🌻',
    searchUrl: 'https://www.amazon.com/s?k=botany+card+game+educational',
    age: '7-adult',
    highlight: 'Science through play',
  },

  // Nature tools
  {
    id: 17,
    title: 'Children\'s Nature Journal',
    author: 'Various',
    description: 'A blank journal with prompts for nature observation — date, weather, location, sketch, and notes. The cornerstone of any Charlotte Mason practice.',
    category: 'nature',
    philosophies: ['charlotte_mason', 'forest_school', 'unschooling'],
    emoji: '📓',
    searchUrl: 'https://www.amazon.com/s?k=children+nature+journal+blank',
    age: '6-adult',
    highlight: 'Charlotte Mason essential',
  },
  {
    id: 18,
    title: 'Kids Bug Catching Kit',
    author: 'Various',
    description: 'Magnifying glass, net, collection containers, and tweezers — everything needed to catch, observe, and release insects safely.',
    category: 'nature',
    philosophies: ['forest_school', 'moncho', 'unschooling'],
    emoji: '🐛',
    searchUrl: 'https://www.amazon.com/s?k=kids+bug+catching+kit+magnifying+glass',
    age: '4-12',
    highlight: 'Outdoor exploration',
  },
]

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activePhilosophy, setActivePhilosophy] = useState('all')

  const filtered = RESOURCES.filter(r => {
    const catMatch = activeCategory === 'all' || r.category === activeCategory
    const philMatch = activePhilosophy === 'all' || r.philosophies.includes(activePhilosophy)
    return catMatch && philMatch
  })

  return (
    <main style={{ minHeight: '100vh', background: '#F7F4EF', fontFamily: 'Georgia, serif' }}>

      {/* NAV */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 48px', background: 'white', borderBottom: '1px solid #E8E4DC',
      }}>
        <a href="/" style={{ fontSize: '20px', fontWeight: 700, color: '#1D9E75', textDecoration: 'none' }}>
          🐱 Moncho
        </a>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/generate" style={{ fontSize: '14px', color: '#5F5E5A', textDecoration: 'none' }}>Generate</a>
          <a href="/dashboard" style={{ fontSize: '14px', color: '#5F5E5A', textDecoration: 'none' }}>My Studies</a>
          <a href="/pricing" style={{ fontSize: '14px', color: '#5F5E5A', textDecoration: 'none' }}>Pricing</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        background: '#085041', color: 'white',
        padding: '64px 48px', textAlign: 'center',
      }}>
        <p style={{ fontSize: '14px', letterSpacing: '2px', opacity: 0.7, marginBottom: '16px', textTransform: 'uppercase' }}>
          Moncho Recommends
        </p>
        <h1 style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-1px', marginBottom: '16px' }}>
          Tools for Curious Learners
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.85, maxWidth: '560px', margin: '0 auto 24px', lineHeight: 1.6 }}>
          Every book, kit, and game here has been chosen because it sparks real curiosity — not because it looks good in a catalog.
        </p>
        <p style={{
          fontSize: '12px', opacity: 0.5,
          background: 'rgba(255,255,255,0.1)',
          display: 'inline-block', padding: '6px 16px', borderRadius: '20px',
        }}>
          Some links are affiliate links — we earn a small commission at no cost to you 🐱
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px' }}>

        {/* PHILOSOPHY FILTER */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '12px', color: '#5F5E5A', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
            Filter by Learning Philosophy
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {PHILOSOPHIES.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePhilosophy(p.id)}
                style={{
                  padding: '8px 16px', borderRadius: '100px', cursor: 'pointer',
                  border: `2px solid ${activePhilosophy === p.id ? '#1D9E75' : '#E8E4DC'}`,
                  background: activePhilosophy === p.id ? '#1D9E75' : 'white',
                  color: activePhilosophy === p.id ? 'white' : '#5F5E5A',
                  fontWeight: activePhilosophy === p.id ? 700 : 400,
                  fontSize: '13px', fontFamily: 'Georgia, serif',
                  transition: 'all 0.15s',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '12px', color: '#5F5E5A', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
            Filter by Category
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                style={{
                  padding: '8px 16px', borderRadius: '100px', cursor: 'pointer',
                  border: `2px solid ${activeCategory === c.id ? '#085041' : '#E8E4DC'}`,
                  background: activeCategory === c.id ? '#085041' : 'white',
                  color: activeCategory === c.id ? 'white' : '#5F5E5A',
                  fontWeight: activeCategory === c.id ? 700 : 400,
                  fontSize: '13px', fontFamily: 'Georgia, serif',
                  transition: 'all 0.15s',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <p style={{ color: '#5F5E5A', fontSize: '14px', marginBottom: '24px' }}>
          Showing {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* RESOURCE GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {filtered.map(resource => (
            <div
              key={resource.id}
              style={{
                background: 'white', borderRadius: '16px',
                border: '1px solid #E8E4DC',
                padding: '24px', display: 'flex',
                flexDirection: 'column', gap: '12px',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Emoji + highlight badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '32px' }}>{resource.emoji}</span>
                <span style={{
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px',
                  background: '#E8F7F2', color: '#085041',
                  padding: '4px 10px', borderRadius: '20px',
                  textTransform: 'uppercase',
                }}>
                  {resource.highlight}
                </span>
              </div>

              {/* Title + Author */}
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1A1A1A', marginBottom: '4px', lineHeight: 1.3 }}>
                  {resource.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#1D9E75', fontStyle: 'italic' }}>
                  {resource.author}
                </p>
              </div>

              {/* Description */}
              <p style={{ fontSize: '14px', color: '#5F5E5A', lineHeight: 1.6, flex: 1 }}>
                {resource.description}
              </p>

              {/* Age + philosophies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{
                  fontSize: '11px', padding: '3px 10px', borderRadius: '20px',
                  background: '#F7F4EF', color: '#5F5E5A', border: '1px solid #E8E4DC',
                }}>
                  {resource.age}
                </span>
                {resource.philosophies.map(p => {
                  const phil = PHILOSOPHIES.find(ph => ph.id === p)
                  return phil ? (
                    <span key={p} style={{
                      fontSize: '11px', padding: '3px 10px', borderRadius: '20px',
                      background: '#F7F4EF', color: '#5F5E5A', border: '1px solid #E8E4DC',
                    }}>
                      {phil.label}
                    </span>
                  ) : null
                })}
              </div>

              {/* CTA */}
              <a
                href={resource.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', textAlign: 'center',
                  background: '#1D9E75', color: 'white',
                  padding: '12px', borderRadius: '100px',
                  textDecoration: 'none', fontSize: '14px', fontWeight: 700,
                  fontFamily: 'Georgia, serif',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#085041'}
                onMouseLeave={e => e.currentTarget.style.background = '#1D9E75'}
              >
                Find on Amazon →
              </a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#5F5E5A' }}>
            <p style={{ fontSize: '32px', marginBottom: '16px' }}>🐱</p>
            <p style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
              No resources found for this combination
            </p>
            <p style={{ fontSize: '15px' }}>
              Try removing one of the filters to see more options.
            </p>
          </div>
        )}

        {/* BOTTOM NOTE */}
        <div style={{
          marginTop: '64px', padding: '32px', background: 'white',
          borderRadius: '16px', border: '1px solid #E8E4DC', textAlign: 'center',
        }}>
          <p style={{ fontSize: '20px', marginBottom: '12px' }}>🐱</p>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
            Want more recommendations?
          </h3>
          <p style={{ fontSize: '15px', color: '#5F5E5A', marginBottom: '20px', lineHeight: 1.6 }}>
            Generate a unit study and Moncho will suggest specific books and materials
            tailored to your child's theme, age, and learning philosophy.
          </p>
          <a
            href="/generate"
            style={{
              display: 'inline-block', background: '#1D9E75', color: 'white',
              padding: '14px 32px', borderRadius: '100px',
              textDecoration: 'none', fontSize: '16px', fontWeight: 700,
              fontFamily: 'Georgia, serif',
            }}
          >
            ✨ Generate a Unit Study
          </a>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{
        textAlign: 'center', padding: '32px',
        color: '#5F5E5A', fontSize: '13px',
        borderTop: '1px solid #E8E4DC',
      }}>
        <p>🐱 Moncho Unschooling · <a href="/" style={{ color: '#1D9E75', textDecoration: 'none' }}>monchounschooling.com</a></p>
        <p style={{ marginTop: '8px', fontSize: '12px', opacity: 0.7 }}>
          As an Amazon Associate, Moncho earns from qualifying purchases at no extra cost to you.
        </p>
      </footer>

    </main>
  )
}