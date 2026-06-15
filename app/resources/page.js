'use client'

import { useState } from 'react'

// ── FILTER DEFINITIONS ────────────────────────────────────────

const TOPICS = [
  { id: 'all',       label: '✨ All Topics' },
  { id: 'nature',    label: '🌿 Nature' },
  { id: 'history',   label: '📜 History' },
  { id: 'science',   label: '🔬 Science' },
  { id: 'art',       label: '🎨 Art' },
  { id: 'geography', label: '🗺️ Geography' },
  { id: 'math',      label: '📊 Math' },
  { id: 'language',  label: '📖 Language Arts' },
]

const BOOK_TYPES = [
  { id: 'all',        label: '✨ All Types' },
  { id: 'living',     label: '📖 Living Book' },
  { id: 'biography',  label: '👤 Biography' },
  { id: 'fiction',    label: '🌙 Fiction' },
  { id: 'field',      label: '🔍 Field Guide' },
  { id: 'reference',  label: '📚 Reference / Encyclopedia' },
  { id: 'poetry',     label: '🎵 Poetry & Literature' },
  { id: 'mythology',  label: '🎭 Mythology & Folklore' },
]

const GAME_TYPES = [
  { id: 'all',        label: '✨ All Types' },
  { id: 'strategy',   label: '♟️ Strategy' },
  { id: 'logic',      label: '🧩 Logic & Puzzles' },
  { id: 'cooperative',label: '🤝 Cooperative' },
  { id: 'memory',     label: '🧠 Memory' },
  { id: 'language',   label: '📝 Language & Literacy' },
  { id: 'science',    label: '🔬 Science & Nature' },
  { id: 'history',    label: '🗺️ History & Geography' },
  { id: 'math',       label: '📊 Math & Numbers' },
]

const GAME_PLAYERS = [
  { id: 'all',   label: '✨ All' },
  { id: 'solo',  label: '🧒 Solo' },
  { id: 'duo',   label: '👫 2 Players' },
  { id: 'group', label: '👨‍👩‍👧‍👦 Family / Group' },
]

const KIT_TYPES = [
  { id: 'all',        label: '✨ All Types' },
  { id: 'biology',    label: '🌱 Live Science & Biology' },
  { id: 'chemistry',  label: '⚗️ Chemistry' },
  { id: 'physics',    label: '⚡ Physics & Electronics' },
  { id: 'astronomy',  label: '🔭 Astronomy' },
  { id: 'coding',     label: '🤖 Coding & Robotics' },
  { id: 'math',       label: '🧮 Math Manipulatives' },
  { id: 'montessori', label: '🌿 Montessori Materials' },
  { id: 'earth',      label: '🌍 Earth & Environment' },
]

const ART_MEDIUMS = [
  { id: 'all',      label: '✨ All' },
  { id: 'drawing',  label: '✏️ Drawing' },
  { id: 'painting', label: '🖌️ Painting' },
  { id: 'sculpting',label: '🏺 Sculpting' },
  { id: 'mixed',    label: '🎨 Mixed Media' },
]

const AGES = [
  { id: 'all',  label: '✨ All Ages' },
  { id: '4-7',  label: '🌱 4-7 years' },
  { id: '8-12', label: '📚 8-12 years' },
  { id: '12+',  label: '🎓 12+ years' },
]

// ── RESOURCE DATA ─────────────────────────────────────────────

const RESOURCES = [
  // ── BOOKS ──────────────────────────────────────────
  {
    id: 1, category: 'books',
    title: 'Handbook of Nature Study',
    author: 'Anna Botsford Comstock',
    description: 'The ultimate nature study companion — 900 pages of field observations, drawings, and lesson guides for every creature and plant you\'ll encounter outdoors.',
    bookType: 'reference', topics: ['nature', 'science'],
    emoji: '🌿', age: '8+', ageGroup: '8-12',
    searchUrl: 'https://www.amazon.com/s?k=Handbook+of+Nature+Study+Comstock',
    highlight: 'Charlotte Mason essential',
  },
  {
    id: 2, category: 'books',
    title: 'The Burgess Bird Book for Children',
    author: 'Thornton W. Burgess',
    description: 'A living book classic — stories about birds told through the eyes of a curious boy, making ornithology feel like an adventure, not a lesson.',
    bookType: 'living', topics: ['nature', 'science'],
    emoji: '🐦', age: '6-12', ageGroup: '4-7',
    searchUrl: 'https://www.amazon.com/s?k=Burgess+Bird+Book+Children',
    highlight: 'Living book classic',
  },
  {
    id: 3, category: 'books',
    title: 'A Child\'s History of the World',
    author: 'V. M. Hillyer',
    description: 'History as it should be told — as a story. From ancient civilizations to modern times, written for curious minds who want to understand how we got here.',
    bookType: 'living', topics: ['history', 'geography'],
    emoji: '📜', age: '8-14', ageGroup: '8-12',
    searchUrl: 'https://www.amazon.com/s?k=Child+History+World+Hillyer',
    highlight: 'Narrative history',
  },
  {
    id: 4, category: 'books',
    title: 'An Extraordinary Life: The Story of a Monarch Butterfly',
    author: 'Laurence Pringle',
    description: 'Follow one Monarch butterfly from egg to migration in vivid detail. Perfect companion for any butterfly or migration unit study.',
    bookType: 'living', topics: ['nature', 'science', 'geography'],
    emoji: '🦋', age: '8-12', ageGroup: '8-12',
    searchUrl: 'https://www.amazon.com/s?k=Extraordinary+Life+Monarch+Butterfly+Pringle',
    highlight: 'Unit study companion',
  },
  {
    id: 5, category: 'books',
    title: 'D\'Aulaires\' Book of Greek Myths',
    author: 'Ingri and Edgar Parin d\'Aulaire',
    description: 'The most beloved introduction to Greek mythology. Gorgeous hand-lithographed illustrations bring the gods and heroes to life in a way no textbook ever could.',
    bookType: 'mythology', topics: ['history', 'language'],
    emoji: '⚡', age: '6-adult', ageGroup: '4-7',
    searchUrl: 'https://www.amazon.com/s?k=D+Aulaires+Book+Greek+Myths',
    highlight: 'Mythology classic',
  },
  {
    id: 6, category: 'books',
    title: 'National Audubon Society Field Guides',
    author: 'Audubon Society',
    description: 'The best field guides for real naturalist work. Birds, insects, wildflowers, rocks — get the one for your region and take it everywhere.',
    bookType: 'field', topics: ['nature', 'science'],
    emoji: '🔍', age: '8-adult', ageGroup: '8-12',
    searchUrl: 'https://www.amazon.com/s?k=Audubon+Society+field+guide',
    highlight: 'Real naturalist tool',
  },
  {
    id: 7, category: 'books',
    title: 'The Story of the World',
    author: 'Susan Wise Bauer',
    description: 'A narrative history of the world from ancient times to the modern age. Told as stories, not lectures. A homeschooling family favorite.',
    bookType: 'living', topics: ['history', 'geography'],
    emoji: '🌍', age: '6-14', ageGroup: '4-7',
    searchUrl: 'https://www.amazon.com/s?k=Story+of+the+World+Susan+Wise+Bauer',
    highlight: 'History as story',
  },
  {
    id: 8, category: 'books',
    title: 'DK Eyewitness Encyclopedia Series',
    author: 'DK Publishing',
    description: 'Stunning visual reference books on every subject — animals, space, history, science. The best encyclopedia series for visual learners.',
    bookType: 'reference', topics: ['science', 'history', 'nature', 'geography'],
    emoji: '📚', age: '7-adult', ageGroup: '8-12',
    searchUrl: 'https://www.amazon.com/s?k=DK+Eyewitness+encyclopedia',
    highlight: 'Visual reference',
  },
  {
    id: 9, category: 'books',
    title: 'Farmer Boy',
    author: 'Laura Ingalls Wilder',
    description: 'A year in the life of a farm boy in upstate New York — full of real food, real work, real seasons. Living history through story.',
    bookType: 'fiction', topics: ['history', 'nature'],
    emoji: '🌾', age: '7-12', ageGroup: '4-7',
    searchUrl: 'https://www.amazon.com/s?k=Farmer+Boy+Laura+Ingalls+Wilder',
    highlight: 'Historical fiction',
  },
  {
    id: 10, category: 'books',
    title: 'Who Was? Biography Series',
    author: 'Various Authors',
    description: 'Short, engaging biographies of famous people from history and science — Marie Curie, Ada Lovelace, Frida Kahlo, Albert Einstein. A new world in every book.',
    bookType: 'biography', topics: ['history', 'science', 'art'],
    emoji: '👤', age: '7-12', ageGroup: '8-12',
    searchUrl: 'https://www.amazon.com/s?k=Who+Was+biography+series',
    highlight: 'Real people, real stories',
  },
  {
    id: 11, category: 'books',
    title: 'A Child\'s Garden of Verses',
    author: 'Robert Louis Stevenson',
    description: 'The most beloved collection of children\'s poetry ever written. Short, musical poems about childhood wonder — perfect for memorization and narration.',
    bookType: 'poetry', topics: ['language', 'art'],
    emoji: '🎵', age: '4-10', ageGroup: '4-7',
    searchUrl: 'https://www.amazon.com/s?k=Child+Garden+Verses+Stevenson',
    highlight: 'Poetry classic',
  },
  {
    id: 12, category: 'books',
    title: 'Aesop\'s Fables',
    author: 'Aesop (various editions)',
    description: 'Ancient stories, timeless lessons. Each fable is short enough for one sitting, deep enough for a lifetime of reflection.',
    bookType: 'mythology', topics: ['history', 'language'],
    emoji: '🦊', age: '5-adult', ageGroup: '4-7',
    searchUrl: 'https://www.amazon.com/s?k=Aesop+Fables+children+illustrated',
    highlight: 'Timeless wisdom',
  },

  // ── GAMES ──────────────────────────────────────────
  {
    id: 13, category: 'games',
    title: 'Timeline Card Game',
    author: 'Asmodee',
    description: 'Place historical events in order before your opponents. Sneaks in history, critical thinking, and chronology while everyone is busy having fun.',
    gameType: 'history', players: 'group', ageGroup: '8-12',
    emoji: '🃏', age: '8-adult',
    searchUrl: 'https://www.amazon.com/s?k=Timeline+card+game+Asmodee',
    highlight: 'History through play',
  },
  {
    id: 14, category: 'games',
    title: 'Wildcraft! Cooperative Herbal Adventure',
    author: 'LearningHerbs',
    description: 'A cooperative board game where players use herbal plants to heal ailments. Teaches 25 plants while playing together — no one loses!',
    gameType: 'cooperative', players: 'group', ageGroup: '4-7',
    emoji: '🌱', age: '6-adult',
    searchUrl: 'https://www.amazon.com/s?k=Wildcraft+herbal+adventure+board+game',
    highlight: 'Nature + cooperation',
  },
  {
    id: 15, category: 'games',
    title: 'Rush Hour Logic Puzzle',
    author: 'ThinkFun',
    description: 'A solo sliding puzzle game with 40 challenges from beginner to expert. Builds logical thinking and spatial reasoning quietly and independently.',
    gameType: 'logic', players: 'solo', ageGroup: '8-12',
    emoji: '🚗', age: '8-adult',
    searchUrl: 'https://www.amazon.com/s?k=Rush+Hour+ThinkFun+logic+puzzle',
    highlight: 'Solo logic challenge',
  },
  {
    id: 16, category: 'games',
    title: 'Hive Pocket',
    author: 'Gen42',
    description: 'A two-player strategy game with no board — you build the board as you play. Fast, deep, and endlessly replayable. Perfect for 1-on-1 learning time.',
    gameType: 'strategy', players: 'duo', ageGroup: '8-12',
    emoji: '🐝', age: '9-adult',
    searchUrl: 'https://www.amazon.com/s?k=Hive+Pocket+game+Gen42',
    highlight: '2-player strategy',
  },
  {
    id: 17, category: 'games',
    title: 'Bananagrams',
    author: 'Bananagrams',
    description: 'Fast-paced word building with letter tiles. Players race to build their own crossword grid. Portable, screenless, and endlessly replayable.',
    gameType: 'language', players: 'group', ageGroup: '8-12',
    emoji: '🍌', age: '7-adult',
    searchUrl: 'https://www.amazon.com/s?k=Bananagrams+word+game',
    highlight: 'Word building fun',
  },
  {
    id: 18, category: 'games',
    title: 'Prime Climb Math Game',
    author: 'Math for Love',
    description: 'A beautiful board game that makes multiplication, division, and prime numbers feel like an adventure. Designed by mathematicians who love games.',
    gameType: 'math', players: 'group', ageGroup: '8-12',
    emoji: '🔢', age: '8-adult',
    searchUrl: 'https://www.amazon.com/s?k=Prime+Climb+math+game',
    highlight: 'Math through play',
  },
  {
    id: 19, category: 'games',
    title: 'Photosynthesis Board Game',
    author: 'Blue Orange',
    description: 'A stunning strategy game where players grow trees and compete for sunlight. Teaches ecology, seasons, and strategic thinking through gorgeous forest gameplay.',
    gameType: 'science', players: 'group', ageGroup: '8-12',
    emoji: '🌳', age: '8-adult',
    searchUrl: 'https://www.amazon.com/s?k=Photosynthesis+board+game+Blue+Orange',
    highlight: 'Ecology + strategy',
  },
  {
    id: 20, category: 'games',
    title: 'Spot It! (Dobble)',
    author: 'Asmodee',
    description: 'A lightning-fast matching game that trains visual perception and focus. Every card has exactly one matching symbol with every other card — pure mathematical magic.',
    gameType: 'memory', players: 'group', ageGroup: '4-7',
    emoji: '🎯', age: '4-adult',
    searchUrl: 'https://www.amazon.com/s?k=Spot+It+Dobble+card+game',
    highlight: 'Visual memory',
  },

  // ── ART SUPPLIES ───────────────────────────────────
  {
    id: 21, category: 'art',
    title: 'Stockmar Beeswax Crayons',
    author: 'Stockmar',
    description: 'Pure beeswax crayons with rich, translucent colors that blend beautifully. Last for years and feel like real art tools, not toys. A Waldorf essential.',
    medium: 'drawing', ageGroup: '4-7',
    emoji: '🕯️', age: 'All ages',
    searchUrl: 'https://www.amazon.com/s?k=Stockmar+Beeswax+Crayons',
    highlight: 'Waldorf essential',
  },
  {
    id: 22, category: 'art',
    title: 'Stockmar Watercolor Paints',
    author: 'Stockmar',
    description: 'Transparent watercolors made for wet-on-wet painting — the Waldorf technique where paint flows freely on wet paper, creating luminous results.',
    medium: 'painting', ageGroup: '4-7',
    emoji: '🌈', age: 'All ages',
    searchUrl: 'https://www.amazon.com/s?k=Stockmar+Watercolor+Paints',
    highlight: 'Wet-on-wet painting',
  },
  {
    id: 23, category: 'art',
    title: 'Natural Beeswax Modeling Wax',
    author: 'Filana',
    description: 'Soft, warm beeswax children warm with their hands before molding. Develops fine motor skills while creating beautiful natural sculptures.',
    medium: 'sculpting', ageGroup: '4-7',
    emoji: '🐝', age: '5-adult',
    searchUrl: 'https://www.amazon.com/s?k=natural+beeswax+modeling+wax+children',
    highlight: 'Sensory & calming',
  },
  {
    id: 24, category: 'art',
    title: 'Crayola Washable Watercolors',
    author: 'Crayola',
    description: 'Affordable, washable watercolors that actually work. Perfect starting point for any art project. Easy to find, easy to use, easy to clean up.',
    medium: 'painting', ageGroup: '4-7',
    emoji: '🎨', age: '4+',
    searchUrl: 'https://www.amazon.com/s?k=Crayola+washable+watercolors',
    highlight: 'Budget-friendly starter',
  },
  {
    id: 25, category: 'art',
    title: 'Air-Dry Clay (White)',
    author: 'Various',
    description: 'No kiln needed. Sculpt, dry, paint. Perfect for nature-inspired sculptures, butterfly life cycles, volcano models, or any 3D challenge in a Moncho unit study.',
    medium: 'sculpting', ageGroup: '8-12',
    emoji: '🏺', age: '5-adult',
    searchUrl: 'https://www.amazon.com/s?k=white+air+dry+clay+children',
    highlight: 'No kiln needed',
  },
  {
    id: 26, category: 'art',
    title: 'Oil Pastels Set',
    author: 'Mungyo / Pentel',
    description: 'Rich, vibrant sticks that blend like paint but handle like crayons. Gorgeous for resist techniques, texture work, and expressive mixed media art.',
    medium: 'mixed', ageGroup: '8-12',
    emoji: '🖍️', age: '6-adult',
    searchUrl: 'https://www.amazon.com/s?k=oil+pastels+set+children',
    highlight: 'Blend & resist',
  },

  // ── EDUCATIONAL KITS ───────────────────────────────
  {
    id: 27, category: 'kits',
    title: 'Butterfly Garden with Live Caterpillars',
    author: 'Insect Lore',
    description: 'Watch complete metamorphosis happen in your own home. Ships with live caterpillars and a pop-up habitat. The most powerful science lesson we know.',
    kitType: 'biology', ageGroup: '4-7',
    emoji: '🦋', age: '5-12',
    searchUrl: 'https://www.amazon.com/s?k=Insect+Lore+butterfly+garden+live+caterpillars',
    highlight: 'Real metamorphosis',
  },
  {
    id: 28, category: 'kits',
    title: 'Kids Microscope with Prepared Slides',
    author: 'AmScope',
    description: 'A real microscope (not a toy) that opens up the invisible world. Comes with prepared slides and blank ones for your own specimens.',
    kitType: 'biology', ageGroup: '8-12',
    emoji: '🔬', age: '8-adult',
    searchUrl: 'https://www.amazon.com/s?k=kids+microscope+prepared+slides+AmScope',
    highlight: 'Real science tool',
  },
  {
    id: 29, category: 'kits',
    title: 'Atom Building Model Kit',
    author: 'Various',
    description: 'Build real atomic structures with colored balls and connectors. Visualize elements, molecules, and chemical bonds in 3D — chemistry you can hold in your hands.',
    kitType: 'chemistry', ageGroup: '8-12',
    emoji: '⚛️', age: '10-adult',
    searchUrl: 'https://www.amazon.com/s?k=atom+model+kit+chemistry+educational',
    highlight: 'Chemistry in 3D',
  },
  {
    id: 30, category: 'kits',
    title: 'Snap Circuits Electronics Kit',
    author: 'Elenco',
    description: 'Build real working circuits with snap-together components — no soldering needed. Kids build radios, lights, alarms, and more while learning electronics fundamentals.',
    kitType: 'physics', ageGroup: '8-12',
    emoji: '⚡', age: '8-adult',
    searchUrl: 'https://www.amazon.com/s?k=Snap+Circuits+electronics+kit+Elenco',
    highlight: 'Real circuits',
  },
  {
    id: 31, category: 'kits',
    title: 'Telescope for Kids — Beginner',
    author: 'Gskyer / National Geographic',
    description: 'A real refractor telescope sized for young astronomers. See craters on the moon, Saturn\'s rings, and Jupiter\'s moons with your own eyes.',
    kitType: 'astronomy', ageGroup: '8-12',
    emoji: '🔭', age: '8-adult',
    searchUrl: 'https://www.amazon.com/s?k=telescope+for+kids+beginner+moon',
    highlight: 'See the moon up close',
  },
  {
    id: 32, category: 'kits',
    title: 'Solar System Model Kit',
    author: 'Various',
    description: 'Paint and assemble a hanging model of all 8 planets to scale. Goes from craft project to science tool — how big is Jupiter compared to Earth?',
    kitType: 'astronomy', ageGroup: '4-7',
    emoji: '🪐', age: '6-adult',
    searchUrl: 'https://www.amazon.com/s?k=solar+system+model+kit+paint',
    highlight: 'Scale model',
  },
  {
    id: 33, category: 'kits',
    title: 'Coding Robot — Botley or Ozobot',
    author: 'Learning Resources / Ozobot',
    description: 'Screen-free coding robots that introduce sequencing, loops, and logical thinking through physical play. No tablet needed — draw paths and give commands with cards.',
    kitType: 'coding', ageGroup: '4-7',
    emoji: '🤖', age: '5-12',
    searchUrl: 'https://www.amazon.com/s?k=Botley+coding+robot+screen+free',
    highlight: 'Screen-free coding',
  },
  {
    id: 34, category: 'kits',
    title: 'Sandpaper Letters — Lowercase',
    author: 'Montessori Services',
    description: 'The classic Montessori reading material. Children trace letters with their fingers, learning through touch, sight, and sound simultaneously.',
    kitType: 'montessori', ageGroup: '4-7',
    emoji: '🔤', age: '3-6',
    searchUrl: 'https://www.amazon.com/s?k=Montessori+sandpaper+letters+lowercase',
    highlight: 'Multi-sensory reading',
  },
  {
    id: 35, category: 'kits',
    title: 'Wooden Counting Beads & Number Rods',
    author: 'Montessori Services',
    description: 'Hands-on math the Montessori way — count, sort, add, and multiply with tactile beads that make abstract numbers concrete and real.',
    kitType: 'montessori', ageGroup: '4-7',
    emoji: '🧮', age: '4-9',
    searchUrl: 'https://www.amazon.com/s?k=Montessori+wooden+counting+beads+math',
    highlight: 'Concrete math',
  },

  // ── NATURE TOOLS ───────────────────────────────────
  {
    id: 36, category: 'nature',
    title: 'Children\'s Nature Journal',
    author: 'Various',
    description: 'A blank journal with prompts for nature observation — date, weather, location, sketch, and notes. The cornerstone of any Charlotte Mason practice.',
    ageGroup: '4-7',
    emoji: '📓', age: '6-adult',
    searchUrl: 'https://www.amazon.com/s?k=children+nature+journal+blank',
    highlight: 'Charlotte Mason essential',
  },
  {
    id: 37, category: 'nature',
    title: 'Kids Bug Catching Kit',
    author: 'Various',
    description: 'Magnifying glass, net, collection containers, and tweezers — everything needed to catch, observe, and release insects safely.',
    ageGroup: '4-7',
    emoji: '🐛', age: '4-12',
    searchUrl: 'https://www.amazon.com/s?k=kids+bug+catching+kit+magnifying+glass',
    highlight: 'Outdoor exploration',
  },
  {
    id: 38, category: 'nature',
    title: 'Hand Lens / Loupe Magnifier 10x',
    author: 'Various',
    description: 'A real jeweler\'s loupe that fits in a pocket. See the veins in a leaf, the scales on a butterfly wing, the cells in a piece of onion skin. The world gets bigger.',
    ageGroup: '8-12',
    emoji: '🔎', age: '6-adult',
    searchUrl: 'https://www.amazon.com/s?k=hand+lens+loupe+10x+naturalist',
    highlight: 'See the invisible',
  },
  {
    id: 39, category: 'nature',
    title: 'Children\'s Waterproof Rain Boots',
    author: 'Various',
    description: 'The most important piece of Forest School equipment. When you\'re not afraid of mud, you\'ll explore anywhere. The best outdoor learning investment you can make.',
    ageGroup: '4-7',
    emoji: '🥾', age: '2-adult',
    searchUrl: 'https://www.amazon.com/s?k=children+waterproof+rain+boots',
    highlight: 'Mud-ready explorer',
  },
  {
    id: 40, category: 'nature',
    title: 'Backyard Bird Feeder + Seed',
    author: 'Various',
    description: 'Turn any window into a nature observation station. Bird feeders bring the wild world close enough to sketch and identify from indoors.',
    ageGroup: '4-7',
    emoji: '🐦', age: 'All ages',
    searchUrl: 'https://www.amazon.com/s?k=backyard+bird+feeder+seed+children',
    highlight: 'Window nature study',
  },
]

// ── SECTIONS ──────────────────────────────────────────────────

const SECTIONS = [
  { id: 'books',  label: '📚 Books' },
  { id: 'games',  label: '🎲 Games & Puzzles' },
  { id: 'art',    label: '🎨 Art Supplies' },
  { id: 'kits',   label: '🔬 Educational Kits' },
  { id: 'nature', label: '🌿 Nature Tools' },
]

const GREEN  = '#1D9E75'
const DARK   = '#085041'
const CREAM  = '#F7F4EF'
const BORDER = '#E8E4DC'
const GRAY   = '#5F5E5A'

// ── FILTER BAR ────────────────────────────────────────────────

function FilterBar({ label, options, active, onSelect }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <p style={{ fontSize: '11px', color: GRAY, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            style={{
              padding: '6px 14px', borderRadius: '100px', cursor: 'pointer',
              border: `2px solid ${active === opt.id ? GREEN : BORDER}`,
              background: active === opt.id ? GREEN : 'white',
              color: active === opt.id ? 'white' : GRAY,
              fontWeight: active === opt.id ? 700 : 400,
              fontSize: '13px', fontFamily: 'Georgia, serif',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── RESOURCE CARD ─────────────────────────────────────────────

function ResourceCard({ r }) {
  return (
    <div
      style={{
        background: 'white', borderRadius: '14px', border: `1px solid ${BORDER}`,
        padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '28px' }}>{r.emoji}</span>
        <span style={{
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px',
          background: '#E8F7F2', color: DARK,
          padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase',
        }}>
          {r.highlight}
        </span>
      </div>
      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A1A', marginBottom: '3px', lineHeight: 1.3 }}>
          {r.title}
        </h3>
        <p style={{ fontSize: '12px', color: GREEN, fontStyle: 'italic' }}>
          {r.author} · {r.age}
        </p>
      </div>
      <p style={{ fontSize: '13px', color: GRAY, lineHeight: 1.6, flex: 1 }}>
        {r.description}
      </p>
      <a
        href={r.searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block', textAlign: 'center',
          background: GREEN, color: 'white',
          padding: '10px', borderRadius: '100px',
          textDecoration: 'none', fontSize: '13px', fontWeight: 700,
          fontFamily: 'Georgia, serif',
        }}
        onMouseEnter={e => e.currentTarget.style.background = DARK}
        onMouseLeave={e => e.currentTarget.style.background = GREEN}
      >
        Find on Amazon →
      </a>
    </div>
  )
}

// ── PAGE ──────────────────────────────────────────────────────

export default function ResourcesPage() {
  const [section,   setSection]   = useState('books')
  const [topic,     setTopic]     = useState('all')
  const [bookType,  setBookType]  = useState('all')
  const [gameType,  setGameType]  = useState('all')
  const [players,   setPlayers]   = useState('all')
  const [kitType,   setKitType]   = useState('all')
  const [medium,    setMedium]    = useState('all')
  const [age,       setAge]       = useState('all')

  function switchSection(id) {
    setSection(id)
    setTopic('all'); setBookType('all'); setGameType('all')
    setPlayers('all'); setKitType('all'); setMedium('all'); setAge('all')
  }

  const pool = RESOURCES.filter(r => r.category === section)

  const filtered = pool.filter(r => {
    if (topic    !== 'all' && !r.topics?.includes(topic))   return false
    if (age      !== 'all' && r.ageGroup !== age)           return false
    if (section === 'books'  && bookType !== 'all' && r.bookType !== bookType) return false
    if (section === 'games'  && gameType !== 'all' && r.gameType !== gameType) return false
    if (section === 'games'  && players  !== 'all' && r.players  !== players)  return false
    if (section === 'kits'   && kitType  !== 'all' && r.kitType  !== kitType)  return false
    if (section === 'art'    && medium   !== 'all' && r.medium   !== medium)   return false
    return true
  })

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
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="/generate"  style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>Generate</a>
          <a href="/dashboard" style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>My Studies</a>
          <a href="/pricing"   style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>Pricing</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: DARK, color: 'white', padding: '56px 48px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', letterSpacing: '2px', opacity: 0.6, marginBottom: '12px', textTransform: 'uppercase' }}>
          Moncho Recommends
        </p>
        <h1 style={{ fontSize: '44px', fontWeight: 700, letterSpacing: '-1px', marginBottom: '12px' }}>
          Tools for Curious Learners
        </h1>
        <p style={{ fontSize: '17px', opacity: 0.8, maxWidth: '520px', margin: '0 auto 20px', lineHeight: 1.6 }}>
          Every book, kit, and game here was chosen because it sparks real curiosity — not because it looks good in a catalog.
        </p>
        <p style={{
          fontSize: '11px', opacity: 0.4,
          display: 'inline-block', padding: '5px 14px',
          background: 'rgba(255,255,255,0.1)', borderRadius: '20px',
        }}>
          Some links are affiliate links — we earn a small commission at no cost to you 🐱
        </p>
      </div>

      {/* SECTION TABS */}
      <div style={{ background: 'white', borderBottom: `1px solid ${BORDER}`, padding: '0 24px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', maxWidth: '960px', margin: '0 auto' }}>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => switchSection(s.id)}
              style={{
                padding: '16px 18px', background: 'none', border: 'none',
                borderBottom: `3px solid ${section === s.id ? GREEN : 'transparent'}`,
                color: section === s.id ? DARK : GRAY,
                fontWeight: section === s.id ? 700 : 400,
                fontSize: '14px', cursor: 'pointer',
                fontFamily: 'Georgia, serif', whiteSpace: 'nowrap',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '36px 24px' }}>

        {/* FILTERS */}
        <div style={{
          background: 'white', borderRadius: '14px', border: `1px solid ${BORDER}`,
          padding: '20px 24px', marginBottom: '28px',
        }}>
          {/* Topic filter — books, kits */}
          {(section === 'books' || section === 'kits') && (
            <FilterBar label="Topic" options={TOPICS} active={topic} onSelect={setTopic} />
          )}

          {/* Book-specific */}
          {section === 'books' && (
            <FilterBar label="Book Type" options={BOOK_TYPES} active={bookType} onSelect={setBookType} />
          )}

          {/* Game-specific */}
          {section === 'games' && (
            <>
              <FilterBar label="Game Type"        options={GAME_TYPES}   active={gameType} onSelect={setGameType} />
              <FilterBar label="Number of Players" options={GAME_PLAYERS} active={players}  onSelect={setPlayers} />
            </>
          )}

          {/* Kit-specific */}
          {section === 'kits' && (
            <FilterBar label="Kit Type" options={KIT_TYPES} active={kitType} onSelect={setKitType} />
          )}

          {/* Art-specific */}
          {section === 'art' && (
            <FilterBar label="Medium" options={ART_MEDIUMS} active={medium} onSelect={setMedium} />
          )}

          {/* Age — all sections */}
          <FilterBar label="Age Range" options={AGES} active={age} onSelect={setAge} />
        </div>

        {/* COUNT */}
        <p style={{ color: GRAY, fontSize: '13px', marginBottom: '18px' }}>
          Showing {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}>
          {filtered.map(r => <ResourceCard key={r.id} r={r} />)}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: GRAY }}>
            <p style={{ fontSize: '32px', marginBottom: '12px' }}>🐱</p>
            <p style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
              No resources found for this combination
            </p>
            <p style={{ fontSize: '14px' }}>Try removing one of the filters to see more options.</p>
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: '56px', padding: '32px', background: 'white',
          borderRadius: '16px', border: `1px solid ${BORDER}`, textAlign: 'center',
        }}>
          <p style={{ fontSize: '20px', marginBottom: '10px' }}>🐱</p>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
            Want more recommendations?
          </h3>
          <p style={{ fontSize: '14px', color: GRAY, marginBottom: '20px', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 20px' }}>
            Generate a unit study and Moncho will suggest specific books and materials
            tailored to your child's theme, age, and learning philosophy.
          </p>
          <a
            href="/generate"
            style={{
              display: 'inline-block', background: GREEN, color: 'white',
              padding: '14px 32px', borderRadius: '100px',
              textDecoration: 'none', fontSize: '15px', fontWeight: 700,
              fontFamily: 'Georgia, serif',
            }}
          >
            ✨ Generate a Unit Study
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '28px', color: GRAY, fontSize: '12px', borderTop: `1px solid ${BORDER}` }}>
        <p>🐱 Moncho Unschooling · <a href="/" style={{ color: GREEN, textDecoration: 'none' }}>monchounschooling.com</a></p>
        <p style={{ marginTop: '6px', opacity: 0.6 }}>
          As an Amazon Associate, Moncho earns from qualifying purchases at no extra cost to you.
        </p>
      </footer>

    </main>
  )
}