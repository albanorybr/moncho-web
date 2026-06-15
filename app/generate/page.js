'use client'

import { useState } from 'react'

const CATEGORIES = [
  { id: 'all',    label: '✨ All' },
  { id: 'books',  label: '📚 Books' },
  { id: 'gadgets',label: '🔬 Educational Gadgets' },
  { id: 'games',  label: '🎲 Games & Puzzles' },
]

const RESOURCES = [
  // ── BOOKS ──────────────────────────────────────────────────────────────────

  // Living Books
  { id: 1, category: 'books', emoji: '🌿',
    title: 'Handbook of Nature Study', author: 'Anna Botsford Comstock',
    description: 'The ultimate nature study companion — 900 pages of field observations, drawings, and lesson guides for every creature and plant you\'ll encounter outdoors.',
    highlight: 'Charlotte Mason essential',
    url: 'https://www.amazon.com/s?k=Handbook+of+Nature+Study+Comstock' },

  { id: 2, category: 'books', emoji: '🐦',
    title: 'The Burgess Bird Book for Children', author: 'Thornton W. Burgess',
    description: 'Stories about birds told through the eyes of a curious boy — science and storytelling woven together so naturally you forget you\'re learning.',
    highlight: 'Living book classic',
    url: 'https://www.amazon.com/s?k=Burgess+Bird+Book+Children' },

  { id: 3, category: 'books', emoji: '📜',
    title: 'A Child\'s History of the World', author: 'V. M. Hillyer',
    description: 'History as it should be told — as a story. From ancient civilizations to modern times, written for curious minds who want to understand how we got here.',
    highlight: 'Narrative history',
    url: 'https://www.amazon.com/s?k=Child+History+World+Hillyer' },

  { id: 4, category: 'books', emoji: '🦋',
    title: 'An Extraordinary Life: The Story of a Monarch Butterfly', author: 'Laurence Pringle',
    description: 'Follow one Monarch butterfly from egg to migration in vivid detail. The perfect companion for any butterfly or migration unit study.',
    highlight: 'Unit study companion',
    url: 'https://www.amazon.com/s?k=Extraordinary+Life+Monarch+Butterfly+Pringle' },

  { id: 5, category: 'books', emoji: '🌍',
    title: 'The Story of the World', author: 'Susan Wise Bauer',
    description: 'A narrative history of the world from ancient times to the modern age. Told as stories, not lectures. A homeschooling family staple.',
    highlight: 'History as story',
    url: 'https://www.amazon.com/s?k=Story+of+the+World+Susan+Wise+Bauer' },

  { id: 6, category: 'books', emoji: '🌸',
    title: 'The Story of Ferdinand', author: 'Munro Leaf',
    description: 'A gentle bull who prefers smelling flowers to fighting. A quiet, beautiful story about being true to yourself — beloved by children and adults for generations.',
    highlight: 'Gentle classic',
    url: 'https://www.amazon.com/s?k=Story+of+Ferdinand+Munro+Leaf' },

  { id: 7, category: 'books', emoji: '🦀',
    title: 'Pagoo', author: 'Holling C. Holling',
    description: 'The life of a hermit crab told with stunning detail and gorgeous illustrations. Science, ecology, and storytelling woven into one unforgettable book.',
    highlight: 'Ocean science story',
    url: 'https://www.amazon.com/s?k=Pagoo+Holling+C+Holling' },

  { id: 8, category: 'books', emoji: '🛶',
    title: 'Paddle-to-the-Sea', author: 'Holling C. Holling',
    description: 'A carved wooden canoe travels from the Great Lakes to the Atlantic Ocean. A geography and ecology adventure in stunning illustrated chapters.',
    highlight: 'Geography adventure',
    url: 'https://www.amazon.com/s?k=Paddle+to+the+Sea+Holling' },

  { id: 9, category: 'books', emoji: '🐢',
    title: 'Minn of the Mississippi', author: 'Holling C. Holling',
    description: 'A snapping turtle\'s journey down the Mississippi River, exploring river ecosystems, history, and geography through gorgeous detailed illustrations.',
    highlight: 'River ecosystem story',
    url: 'https://www.amazon.com/s?k=Minn+of+the+Mississippi+Holling' },

  { id: 10, category: 'books', emoji: '🐦',
    title: 'The Wheel on the School', author: 'Meindert DeJong',
    description: 'A Dutch village comes together to bring storks back to their town. A Newbery Medal winner about community, curiosity, and what happens when children ask one good question.',
    highlight: 'Newbery Medal winner',
    url: 'https://www.amazon.com/s?k=Wheel+on+the+School+DeJong' },

  // Biographies
  { id: 11, category: 'books', emoji: '⭐',
    title: 'Little People Big Dreams Series', author: 'Various Authors',
    description: 'Beautiful picture book biographies of inspiring figures — Marie Curie, Frida Kahlo, Ada Lovelace, Maya Angelou. Each book follows one person from childhood to their world-changing work.',
    highlight: 'Inspiring lives',
    url: 'https://www.amazon.com/s?k=Little+People+Big+Dreams+series' },

  { id: 12, category: 'books', emoji: '🎩',
    title: 'Lincoln: A Photobiography', author: 'Russell Freedman',
    description: 'A Newbery Medal biography of Abraham Lincoln told with rare photographs and primary sources. History that feels like a story, not a textbook.',
    highlight: 'Newbery Medal biography',
    url: 'https://www.amazon.com/s?k=Lincoln+Photobiography+Russell+Freedman' },

  { id: 13, category: 'books', emoji: '🎨',
    title: 'Diane Stanley Biography Series', author: 'Diane Stanley',
    description: 'Richly illustrated biographies of historical figures — Leonardo da Vinci, Cleopatra, Shakespeare, Michelangelo. Stunning artwork makes history come alive.',
    highlight: 'Illustrated biography',
    url: 'https://www.amazon.com/s?k=Diane+Stanley+biography+illustrated' },

  { id: 14, category: 'books', emoji: '👤',
    title: 'Who Was? Biography Series', author: 'Various Authors',
    description: 'Short, engaging biographies of famous people from history and science — Marie Curie, Ada Lovelace, Frida Kahlo, Albert Einstein. A new world in every book.',
    highlight: 'Real people, real stories',
    url: 'https://www.amazon.com/s?k=Who+Was+biography+series' },

  // Fiction
  { id: 15, category: 'books', emoji: '🦅',
    title: 'My Side of the Mountain', author: 'Jean Craighead George',
    description: 'A boy runs away to live alone in the Catskill Mountains, training a falcon and learning to survive from nature. The ultimate outdoor survival story for young readers.',
    highlight: 'Survival in nature',
    url: 'https://www.amazon.com/s?k=My+Side+of+the+Mountain+Jean+George' },

  { id: 16, category: 'books', emoji: '🏝️',
    title: 'Island of the Blue Dolphins', author: 'Scott O\'Dell',
    description: 'Based on a true story — a Native American girl survives alone on a Pacific island for 18 years. Courage, nature, and solitude woven into an unforgettable story.',
    highlight: 'Based on true story',
    url: 'https://www.amazon.com/s?k=Island+Blue+Dolphins+Scott+ODell' },

  { id: 17, category: 'books', emoji: '🔢',
    title: 'The Phantom Tollbooth', author: 'Norton Juster',
    description: 'A bored boy drives through a magic tollbooth into a land where words and numbers are at war. A wildly funny adventure about the joy of learning and curiosity.',
    highlight: 'Language & math adventure',
    url: 'https://www.amazon.com/s?k=Phantom+Tollbooth+Norton+Juster' },

  { id: 18, category: 'books', emoji: '🌹',
    title: 'The Secret Garden', author: 'Frances Hodgson Burnett',
    description: 'A lonely girl discovers a hidden garden and brings it back to life — along with herself. A classic about nature, healing, and the magic of growing things.',
    highlight: 'Nature & healing',
    url: 'https://www.amazon.com/s?k=Secret+Garden+Frances+Hodgson+Burnett' },

  { id: 19, category: 'books', emoji: '🕷️',
    title: "Charlotte's Web", author: 'E.B. White',
    description: 'A spider, a pig, and a little girl. One of the most beloved children\'s novels ever written — about friendship, nature, and the cycle of life.',
    highlight: 'Beloved classic',
    url: "https://www.amazon.com/s?k=Charlotte+Web+EB+White" },

  { id: 20, category: 'books', emoji: '🌾',
    title: 'Farmer Boy', author: 'Laura Ingalls Wilder',
    description: 'A year in the life of a farm boy in upstate New York — full of real food, real work, real seasons. Living history through story.',
    highlight: 'Historical fiction',
    url: 'https://www.amazon.com/s?k=Farmer+Boy+Laura+Ingalls+Wilder' },

  // Poetry & Literature
  { id: 21, category: 'books', emoji: '✏️',
    title: 'Where the Sidewalk Ends', author: 'Shel Silverstein',
    description: 'The most beloved collection of children\'s poetry in the English language. Funny, tender, surprising, and endlessly rereadable.',
    highlight: 'Poetry everyone loves',
    url: 'https://www.amazon.com/s?k=Where+the+Sidewalk+Ends+Shel+Silverstein' },

  { id: 22, category: 'books', emoji: '💡',
    title: 'A Light in the Attic', author: 'Shel Silverstein',
    description: 'More witty, tender, and ridiculous poems from the master. Perfect for reading aloud, memorizing, and illustrating.',
    highlight: 'Classic poetry',
    url: 'https://www.amazon.com/s?k=Light+in+the+Attic+Shel+Silverstein' },

  { id: 23, category: 'books', emoji: '🐻',
    title: 'Now We Are Six', author: 'A.A. Milne',
    description: 'Winnie-the-Pooh\'s creator at his most poetic — playful verses about childhood, seasons, and small joys. Perfect for memorization and narration.',
    highlight: 'Winnie-the-Pooh poet',
    url: 'https://www.amazon.com/s?k=Now+We+Are+Six+AA+Milne' },

  { id: 24, category: 'books', emoji: '🎵',
    title: "A Child's Garden of Verses", author: 'Robert Louis Stevenson',
    description: 'The most beloved collection of children\'s poetry ever written. Short, musical poems about childhood wonder — perfect for memorization.',
    highlight: 'Poetry classic',
    url: "https://www.amazon.com/s?k=Child+Garden+Verses+Stevenson" },

  // Mythology & Folklore
  { id: 25, category: 'books', emoji: '⚡',
    title: "D'Aulaires' Book of Greek Myths", author: 'Ingri and Edgar Parin d\'Aulaire',
    description: 'The most beloved introduction to Greek mythology. Gorgeous hand-lithographed illustrations bring the gods and heroes to life in a way no textbook ever could.',
    highlight: 'Mythology classic',
    url: "https://www.amazon.com/s?k=D+Aulaires+Book+Greek+Myths" },

  { id: 26, category: 'books', emoji: '🌩️',
    title: 'Norse Myths', author: 'Kevin Crossley-Holland',
    description: 'The definitive retelling of Norse mythology — Thor, Odin, Loki, and the nine worlds — written with the power and beauty of the original sagas.',
    highlight: 'Definitive Norse myths',
    url: 'https://www.amazon.com/s?k=Norse+Myths+Kevin+Crossley-Holland' },

  { id: 27, category: 'books', emoji: '🪓',
    title: "D'Aulaires' Book of Norse Myths", author: 'Ingri and Edgar Parin d\'Aulaire',
    description: 'The companion to their beloved Greek Myths — same stunning hand-lithographed illustrations, same accessible storytelling. The Viking world comes alive.',
    highlight: 'Stunning illustrations',
    url: "https://www.amazon.com/s?k=D+Aulaires+Book+Norse+Myths" },

  { id: 28, category: 'books', emoji: '🦊',
    title: "Aesop's Fables", author: 'Aesop (various editions)',
    description: 'Ancient stories, timeless lessons. Each fable is short enough for one sitting, deep enough for a lifetime of reflection.',
    highlight: 'Timeless wisdom',
    url: "https://www.amazon.com/s?k=Aesop+Fables+children+illustrated" },

  // Reference & Field Guides
  { id: 29, category: 'books', emoji: '🔍',
    title: 'National Audubon Society Field Guides', author: 'Audubon Society',
    description: 'The best field guides for real naturalist work. Birds, insects, wildflowers, rocks — get the one for your region and take it everywhere.',
    highlight: 'Real naturalist tool',
    url: 'https://www.amazon.com/s?k=Audubon+Society+field+guide' },

  { id: 30, category: 'books', emoji: '🌿',
    title: 'Peterson First Guides Series', author: 'Roger Tory Peterson',
    description: 'Simplified field guides perfect for beginners — birds, wildflowers, insects, rocks. Compact enough to fit in a pocket and clear enough for a child to use independently.',
    highlight: 'Beginner-friendly',
    url: 'https://www.amazon.com/s?k=Peterson+First+Guides+field+guide' },

  { id: 31, category: 'books', emoji: '📚',
    title: 'DK Eyewitness Encyclopedia Series', author: 'DK Publishing',
    description: 'Stunning visual reference books on every subject — animals, space, history, science. The best encyclopedia series for visual learners of any age.',
    highlight: 'Visual reference',
    url: 'https://www.amazon.com/s?k=DK+Eyewitness+encyclopedia' },

  { id: 32, category: 'books', emoji: '🌐',
    title: 'National Geographic Kids Encyclopedia of Science', author: 'National Geographic',
    description: 'Visually stunning science encyclopedia covering physics, chemistry, biology, earth science, and technology. Perfect for sparking unit study ideas.',
    highlight: 'Visual science reference',
    url: 'https://www.amazon.com/s?k=National+Geographic+Kids+Encyclopedia+Science' },

  { id: 33, category: 'books', emoji: '🗺️',
    title: 'The Usborne Encyclopedia of World History', author: 'Usborne',
    description: 'A comprehensive illustrated world history encyclopedia organized by time period and region. Clear timelines, maps, and colorful illustrations make history accessible.',
    highlight: 'Illustrated history',
    url: 'https://www.amazon.com/s?k=Usborne+Encyclopedia+World+History' },

  // ── EDUCATIONAL GADGETS ────────────────────────────────────────────────────

  { id: 34, category: 'gadgets', emoji: '🏛️',
    title: 'Build Ancient Buildings Kit', author: 'Various',
    description: 'Reconstruct iconic ancient buildings — the Colosseum, the Parthenon, the Pyramids — using detailed model kits. Architecture, history, and engineering in one project.',
    highlight: 'History + engineering',
    url: 'https://www.amazon.com/s?k=build+ancient+buildings' },

  { id: 35, category: 'gadgets', emoji: '🌍',
    title: 'Solar System Orbital Model Kit', author: 'Various',
    description: 'A mechanized model showing the Earth-Moon-Sun orbital system in motion. Watch the seasons, eclipses, and day/night cycles happen in real time on your desk.',
    highlight: 'Astronomy in motion',
    url: 'https://www.amazon.com/s?k=English+Solar+System+Sun+Earth+Moon+Orbital+Model+Educational+Planetarium' },

  { id: 36, category: 'gadgets', emoji: '🧬',
    title: 'Animal & Plant Cell Anatomy Model', author: 'Various',
    description: 'Detailed 3D models of animal and plant cells showing organelles in color. Touch and explore what biology textbooks can only illustrate.',
    highlight: 'Biology made visible',
    url: 'https://www.amazon.com/s?k=Animal+and+Plant+Cell+Anatomy+Model' },

  { id: 37, category: 'gadgets', emoji: '⚛️',
    title: 'Chemistry Molecular Model Kit', author: 'Various',
    description: 'Build real molecular structures with colored balls and connectors. Visualize elements, molecules, and chemical bonds in 3D — chemistry you can hold in your hands.',
    highlight: 'Chemistry in 3D',
    url: 'https://www.amazon.com/s?k=Chemistry+Molecular+Model' },

  { id: 38, category: 'gadgets', emoji: '💻',
    title: "Let's Start Coding Kit", author: "Let's Start Coding",
    description: 'A real C++ coding kit for kids — write actual code that makes LEDs blink, buzzers beep, and motors spin. No screens needed. Real hardware, real programming.',
    highlight: 'Real coding, real hardware',
    url: 'https://www.amazon.com/stores/LetsStartCoding/page/EEBC3559-DA4A-47D6-A926-BA891048B93D' },

  { id: 39, category: 'gadgets', emoji: '⚡',
    title: 'Snap Circuits Jr. SC-100', author: 'Elenco',
    description: 'Build real working circuits with snap-together components — over 100 projects, no soldering needed. Kids build radios, lights, alarms while learning electronics fundamentals.',
    highlight: 'Real circuits, 100+ projects',
    url: 'https://www.amazon.com/s?k=Snap+Circuits+Jr.+SC-100+Electronics+Exploration+Kit' },

  { id: 40, category: 'gadgets', emoji: '☀️',
    title: 'Green Energy Model Kit', author: 'Various',
    description: 'Build working models of solar panels, wind turbines, and water wheels. Explore renewable energy through hands-on experimentation — the science of the future, today.',
    highlight: 'Renewable energy',
    url: 'https://www.amazon.com/s?k=green+energy+model' },

  { id: 41, category: 'gadgets', emoji: '🫀',
    title: 'Squishy Human Body Kit', author: 'Various',
    description: 'A tactile, squeezable human body model with removable organs. Perfect for kinesthetic learners — feel where the heart, lungs, and stomach actually sit.',
    highlight: 'Tactile anatomy',
    url: 'https://www.amazon.com/s?k=squishy+human+body' },

  { id: 42, category: 'gadgets', emoji: '⚗️',
    title: 'Chemistry Science Kit', author: 'Various',
    description: 'Conduct real chemistry experiments at home — acids and bases, crystallization, color reactions. Comes with safe chemicals, equipment, and experiment guides.',
    highlight: 'Real experiments',
    url: 'https://www.amazon.com/s?k=chemistry+science+kit' },

  { id: 43, category: 'gadgets', emoji: '🪨',
    title: 'Rock & Geology Science Kit', author: 'Various',
    description: 'Dig, identify, and classify real rocks and minerals. Includes specimen collection, magnifying tools, and identification guides for young geologists.',
    highlight: 'Real rock specimens',
    url: 'https://www.amazon.com/s?k=rock+science+kit' },

  { id: 44, category: 'gadgets', emoji: '🎱',
    title: 'GraviTrax Starter Set', author: 'Ravensburger',
    description: 'A gravity-and-magnetic marble run that teaches physics through building. Design tracks, test hypotheses, and watch physics principles come alive. STEM-accredited for ages 8+.',
    highlight: 'Physics through building',
    url: 'https://www.amazon.com/s?k=Ravensburger+GraviTrax+Starter+Set' },

  { id: 45, category: 'gadgets', emoji: '🌍',
    title: 'ScrunchMap — USA Scrunchable Map', author: 'Waypoint Geographic',
    description: 'A soft, scrunchable fabric map that kids can touch, fold, and explore without tearing. Great for tactile geography learners — hang it, spread it, or scrunch it up.',
    highlight: 'Tactile geography',
    url: 'https://www.amazon.com/Waypoint-Geographic-USA-ScrunchMap-Date/dp/B00JG8M4BK' },

  { id: 46, category: 'gadgets', emoji: '🚩',
    title: 'Poppik World Map with Flag Stickers', author: 'Poppik',
    description: 'A giant poster map where children place 230 country flag stickers in their correct locations. Geography + flags + fine motor skills — all in one beautiful project.',
    highlight: '230 flag stickers',
    url: 'https://www.amazon.com/Poppik-Discovery-Sticker-Flags-World/dp/B07TK8ZD6H' },

  // ── GAMES & PUZZLES ────────────────────────────────────────────────────────

  { id: 47, category: 'games', emoji: '🌊',
    title: 'Ecosystem: Habitats Board Game', author: 'Genius Games',
    description: 'Build a living ecosystem by placing habitat cards — oceans, forests, wetlands. Balance predators, prey, and environments in a beautifully illustrated card drafting game.',
    highlight: 'Ecology + strategy',
    url: 'https://www.amazon.com/Ecosystem-Habitats-Classroom-Environments-Underwater/dp/B0BB4VXV1K' },

  { id: 48, category: 'games', emoji: '⚗️',
    title: 'Periodic: A Game of the Elements', author: 'Genius Games',
    description: 'Race across the periodic table using element properties and atomic energy. A scientifically accurate strategy game that makes chemistry feel like an adventure.',
    highlight: 'Periodic table comes alive',
    url: 'https://www.amazon.com/Genius-Games-Periodic-Game-Elements/dp/B07KBG6DVW' },

  { id: 49, category: 'games', emoji: '🧬',
    title: 'Cytosis: A Cell Biology Game', author: 'Genius Games',
    description: 'Work inside a human cell — collect resources, build proteins, and fight viruses. Scientifically accurate cell biology strategy game for ages 10 and up.',
    highlight: 'Scientifically accurate',
    url: 'https://www.amazon.com/Cytosis-Biology-Strategy-Accurate-Science/dp/B076V9CYW7' },

  { id: 50, category: 'games', emoji: '🗺️',
    title: 'QUOKKA World Geography Board Game', author: 'Quokka',
    description: 'Learn countries, capitals, and world geography through competitive gameplay. Cards, maps, and trivia make geography feel like a race around the world.',
    highlight: 'Geography through play',
    url: 'https://www.amazon.com/QUOKKA-Geography-Board-Game-Kids/dp/B0CGJ3X473' },

  { id: 51, category: 'games', emoji: '🦁',
    title: 'Skillmatics Animal World Card Game', author: 'Skillmatics',
    description: 'A fast-paced, screen-free card game about animals — their habitats, diets, and characteristics. Perfect for nature unit studies and family game night.',
    highlight: 'Animal facts through play',
    url: 'https://www.amazon.com/Skillmatics-Animal-Perfect-Animals-Screen-Free/dp/B07RMJ8SG6' },

  { id: 52, category: 'games', emoji: '🌱',
    title: 'Wildcraft! Herbal Adventure Game', author: 'LearningHerbs',
    description: 'A cooperative board game where players use herbal plants to heal ailments and get everyone home safely. Teaches 25 real plants while playing together — no one loses!',
    highlight: 'Herbology + cooperation',
    url: 'https://www.amazon.com/Wildcraft-Herbal-Adventure-cooperative-board/dp/B001M9JD9W' },

  { id: 53, category: 'games', emoji: '🤖',
    title: 'Makeblock mBot Robot Kit', author: 'Makeblock',
    description: 'Build a real programmable robot using Scratch and Arduino coding. Sensors, motors, and wireless control — a complete introduction to robotics and coding for kids.',
    highlight: 'Real robotics + coding',
    url: 'https://www.amazon.com/Makeblock-Robotics-Scratch-Arduino-Coding/dp/B00SK5RUQY' },

  { id: 54, category: 'games', emoji: '🃏',
    title: 'Timeline Card Game', author: 'Asmodee',
    description: 'Place historical events in order before your opponents. Sneaks in history, critical thinking, and chronology while everyone is busy having fun.',
    highlight: 'History through play',
    url: 'https://www.amazon.com/s?k=Timeline+card+game+Asmodee' },

  { id: 55, category: 'games', emoji: '🚗',
    title: 'Rush Hour Logic Puzzle', author: 'ThinkFun',
    description: 'A solo sliding puzzle game with 40 challenges from beginner to expert. Builds logical thinking and spatial reasoning quietly and independently.',
    highlight: 'Solo logic challenge',
    url: 'https://www.amazon.com/s?k=Rush+Hour+ThinkFun+logic+puzzle' },

  { id: 56, category: 'games', emoji: '🌳',
    title: 'Photosynthesis Board Game', author: 'Blue Orange',
    description: 'A stunning strategy game where players grow trees and compete for sunlight. Teaches ecology, seasons, and strategic thinking through gorgeous forest gameplay.',
    highlight: 'Ecology + strategy',
    url: 'https://www.amazon.com/s?k=Photosynthesis+board+game+Blue+Orange' },

  { id: 57, category: 'games', emoji: '🔢',
    title: 'Prime Climb Math Game', author: 'Math for Love',
    description: 'A beautiful board game that makes multiplication, division, and prime numbers feel like an adventure. Designed by mathematicians who love games.',
    highlight: 'Math through play',
    url: 'https://www.amazon.com/s?k=Prime+Climb+math+game' },

  { id: 58, category: 'games', emoji: '🍌',
    title: 'Bananagrams', author: 'Bananagrams',
    description: 'Fast-paced word building with letter tiles. Players race to build their own crossword grid. Portable, screenless, and endlessly replayable.',
    highlight: 'Word building fun',
    url: 'https://www.amazon.com/s?k=Bananagrams+word+game' },
]

const GREEN  = '#1D9E75'
const DARK   = '#085041'
const CREAM  = '#F7F4EF'
const BORDER = '#E8E4DC'
const GRAY   = '#5F5E5A'

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
        <p style={{ fontSize: '12px', color: GREEN, fontStyle: 'italic' }}>{r.author}</p>
      </div>
      <p style={{ fontSize: '13px', color: GRAY, lineHeight: 1.6, flex: 1 }}>{r.description}</p>
      <a
        href={r.url} target="_blank" rel="noopener noreferrer"
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

export default function ResourcesPage() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? RESOURCES
    : RESOURCES.filter(r => r.category === active)

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
          <a href="/generate"   style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>Generate</a>
          <a href="/dashboard"  style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>My Studies</a>
          <a href="/pricing"    style={{ fontSize: '14px', color: GRAY, textDecoration: 'none' }}>Pricing</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: DARK, color: 'white', padding: '56px 48px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', letterSpacing: '2px', opacity: 0.6, marginBottom: '12px', textTransform: 'uppercase' }}>
          Moncho Recommends
        </p>
        <h1 style={{ fontSize: '44px', fontWeight: 700, letterSpacing: '-1px', marginBottom: '12px' }}>
          Educational Resources
        </h1>
        <p style={{ fontSize: '17px', opacity: 0.8, maxWidth: '520px', margin: '0 auto 20px', lineHeight: 1.6 }}>
          Every book, gadget, and game here was chosen because it sparks real curiosity — not because it looks good in a catalog.
        </p>
        <p style={{
          fontSize: '11px', opacity: 0.4, display: 'inline-block',
          padding: '5px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px',
        }}>
          Some links are affiliate links — we earn a small commission at no cost to you 🐱
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '36px 24px' }}>

        {/* FILTER */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                padding: '10px 22px', borderRadius: '100px', cursor: 'pointer',
                border: `2px solid ${active === c.id ? GREEN : BORDER}`,
                background: active === c.id ? GREEN : 'white',
                color: active === c.id ? 'white' : GRAY,
                fontWeight: active === c.id ? 700 : 400,
                fontSize: '14px', fontFamily: 'Georgia, serif',
              }}
            >
              {c.label}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '13px', color: GRAY, alignSelf: 'center' }}>
            {filtered.length} resources
          </span>
        </div>

        {/* GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px',
        }}>
          {filtered.map(r => <ResourceCard key={r.id} r={r} />)}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '56px', padding: '32px', background: 'white',
          borderRadius: '16px', border: `1px solid ${BORDER}`, textAlign: 'center',
        }}>
          <p style={{ fontSize: '20px', marginBottom: '10px' }}>🐱</p>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
            Want personalized recommendations?
          </h3>
          <p style={{ fontSize: '14px', color: GRAY, marginBottom: '20px', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 20px' }}>
            Generate a unit study and Moncho will suggest specific books and materials
            tailored to your child's theme, age, and learning philosophy.
          </p>
          <a href="/generate" style={{
            display: 'inline-block', background: GREEN, color: 'white',
            padding: '14px 32px', borderRadius: '100px',
            textDecoration: 'none', fontSize: '15px', fontWeight: 700,
            fontFamily: 'Georgia, serif',
          }}>
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