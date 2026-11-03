// Free sample unit studies (Full, ages 7-11), each in English and Spanish.
// PDFs live in /public/free/<slug>-en.pdf and /public/free/<slug>-es.pdf.
// `teasers` are real challenge titles from each unit; `subjects` are its 10 subjects.

export const TOPICS = [
  {
    slug: 'baseball', color: '#2E6DA4',
    en: { title: 'Baseball', hook: 'Stats, pitches and the 90-foot diamond.', intro: "Step up to the plate and discover that every pitch, swing, and slide hides a secret about science, numbers, words, and people.", subjects: ["Math", "Physics", "Language Arts", "History", "Geography", "Art & Creativity", "Movement & Body", "Critical Thinking", "Life Skills & SEL", "Music"], teasers: ["Build a Mini Diamond", "Your Backyard Verse", "Who Owns the Stadium Sky?", "Prove It With Evidence"] },
    es: { title: 'Béisbol', hook: 'Estadísticas, lanzamientos y el diamante de 90 pies.', intro: "Cada jugada de béisbol es un pequeño misterio de ciencia, números e historia que tú puedes resolver con una pelota, un palo y mucha curiosidad.", subjects: ["Matemáticas", "Física", "Lenguaje y Literatura", "Historia", "Movimiento y Cuerpo", "Habilidades para la Vida y Socioemocionales", "Biología", "Geografía", "Arte y Creatividad", "Pensamiento Crítico"], teasers: ["¿Llega a .300?", "El diccionario beisbolero", "Entrenamiento de jardinero", "Cazadores de árboles"] },
  },
  {
    slug: 'football', color: '#5D4037',
    en: { title: 'American Football', hook: 'Yards, plays and the physics of a spiral pass.', intro: "Step onto the field and discover that every snap, spiral and touchdown is a hidden science lab, math puzzle and team story all at once.", subjects: ["Physics", "Math", "Movement & Body", "History", "Language Arts", "Art & Creativity", "Life Skills & SEL", "Biology", "Geography", "Music"], teasers: ["Spiral vs. Wobble", "Rookie Training Camp Circuit", "Radio Play-by-Play", "Winning and Losing with Class"] },
    es: { title: 'Fútbol americano', hook: 'Yardas, jugadas y la física del pase en espiral.', intro: "Imagina que eres parte del equipo: cada pase, cada tacleada y cada touchdown esconde un secreto de ciencia, números, historia y trabajo en equipo que vas a descubrir con tus propias manos y tu propio cuerpo.", subjects: ["Física", "Matemáticas", "Movimiento y Cuerpo", "Historia", "Lenguaje y Literatura", "Arte y Creatividad", "Habilidades para la Vida", "Biología", "Geografía", "Música"], teasers: ["¡Espiral o tambaleo!", "¡Partido de bandera!", "¡Se escapa por la banda!", "Revisión antes del kickoff"] },
  },
  {
    slug: 'basketball', color: '#C4461F',
    en: { title: 'Basketball', hook: 'Arcs, angles and the science of the bounce.', intro: "What if the whole world, from the physics of a bounce to the story of a peach basket, were hiding inside one orange ball and a hoop?", subjects: ["Physics", "Math", "Movement & Body", "History", "Geography", "Language Arts", "Life Skills & SEL", "Art & Creativity", "Music", "Biology"], teasers: ["The Bounce Lab", "The Shoe Slalom Dribble", "The Basketball Highway", "Beat the 24-Second Clock"] },
    es: { title: 'Baloncesto', hook: 'Arcos, ángulos y la ciencia del rebote.', intro: "Imagina que un balón que rebota puede enseñarte física, matemáticas, historia y hasta cómo ser un buen compañero de equipo.", subjects: ["Física", "Matemáticas", "Movimiento y Cuerpo", "Historia", "Lenguaje y Literatura", "Habilidades para la Vida y Socioemocionales", "Arte y Creatividad", "Música", "Pensamiento Crítico", "Geografía"], teasers: ["¿Quién rebota más alto?", "Circuito de conos locos", "¡Último minuto, partido empatado!", "El Pabellón de Tus Sueños"] },
  },
  {
    slug: 'board-games', color: '#6A1B9A',
    en: { title: 'Board Games', hook: 'Dice, strategy and games older than the pyramids.', intro: "Every board game is a tiny world with rules you can bend, break and rebuild, so what happens when YOU become the game designer?", subjects: ["Math", "History", "Language Arts", "Art & Creativity", "Critical Thinking", "Life Skills & SEL", "Geography", "Music", "Movement & Body", "Technology"], teasers: ["Dice Detective", "The Word Log", "The Fairness Trial", "The Catan Trade Merchant"] },
    es: { title: 'Juegos de mesa', hook: 'Dados, estrategia y juegos más antiguos que las pirámides.', intro: "Cada caja de juego guarda un mundo entero: ¡abre la tapa y descubre quién lo inventó, cómo funciona y cómo puedes crear el tuyo!", subjects: ["Matemáticas", "Lenguaje y Literatura", "Historia", "Geografía", "Arte y Creatividad", "Pensamiento Crítico", "Habilidades para la Vida", "Movimiento y Cuerpo", "Música", "Tecnología"], teasers: ["¿Por qué gana el 7?", "¡Una partida en Ur!", "Piezas con personalidad", "El banquero con plan"] },
  },
  {
    slug: 'dance', color: '#AD1457',
    en: { title: 'Dance', hook: 'Rhythm, spins and stories told with the body.', intro: "Every person on Earth has a body that can tell a story without a single word, and dance is the oldest way we have of doing it.", subjects: ["Movement & Body", "Music", "Physics", "Biology", "Language Arts", "Math", "History", "Geography", "Art & Creativity", "Life Skills & SEL"], teasers: ["Foot Position Secret Handshake", "The Balance Audition", "Fraction Stomp-Clap-Snap!", "The Dance Passport"] },
    es: { title: 'Danza', hook: 'Ritmo, giros e historias contadas con el cuerpo.', intro: "Tu cuerpo es un instrumento secreto: descubre cómo el mundo entero ha bailado, desde los latidos del corazón hasta las pistas de baile de cada rincón del planeta.", subjects: ["Movimiento y Cuerpo", "Música", "Arte y Creatividad", "Lenguaje y Literatura", "Matemáticas", "Biología", "Física", "Geografía", "Historia", "Habilidades para la Vida"], teasers: ["Cinco posiciones, un mapa en el suelo", "Tu coreografía de 1 minuto", "Tu corazón también baila", "La gira mundial"] },
  },
  {
    slug: 'airplanes', color: '#01579B',
    en: { title: 'Airplanes', hook: 'Lift, wings and the brothers who first flew.', intro: "What if the same invisible air that tickles your hand could hold up a machine heavier than a hundred elephants?", subjects: ["Physics", "Math", "Language Arts", "History", "Art & Creativity", "Geography", "Biology", "Technology", "Life Skills & SEL", "Movement & Body"], teasers: ["Make Paper Lift Off", "Word Detectives in the Sky", "The World From 10,000 Meters", "Black Box Challenge"] },
    es: { title: 'Aviones', hook: 'Sustentación, alas y los hermanos que volaron primero.', intro: "¿Cómo logró el ser humano convencer a toneladas de metal de quedarse flotando entre las nubes? ¡Vas a construir, lanzar y volar tu propia respuesta!", subjects: ["Física", "Matemáticas", "Lenguaje y Literatura", "Historia", "Arte y Creatividad", "Geografía", "Tecnología", "Habilidades para la Vida", "Movimiento y Cuerpo", "Ciencias de la Tierra"], teasers: ["¡Sopla y Mira Cómo se Levanta!", "Carta desde la Cabina", "Móvil de Aviones", "La checklist del copiloto"] },
  },
  {
    slug: 'dinosaurs', color: '#2E7D32',
    en: { title: 'Dinosaurs', hook: 'Fossils, footprints and giants measured in steps.', intro: "Step into the shoes of a fossil hunter and discover that the ground under your feet holds the stories of giants who once shook the Earth.", subjects: ["Biology", "Earth Science", "Astronomy", "Math", "Language Arts", "Geography", "Art & Creativity", "History", "Music", "Movement & Body"], teasers: ["Bone Detective", "Crater Lab", "Letter From the Cliffs", "Footprint Stampede"] },
    es: { title: 'Dinosaurios', hook: 'Fósiles, huellas y gigantes medidos en pasos.', intro: "¿Y si pudieras convertirte en paleontólogo por una semana y descubrir cómo vivían los gigantes que caminaron por la Tierra mucho antes que nosotros?", subjects: ["Ciencias", "Biología", "Ciencias de la Tierra", "Matemáticas", "Lenguaje y Literatura", "Arte y Creatividad", "Movimiento y Cuerpo", "Historia", "Geografía", "Habilidades para la Vida"], teasers: ["Fósil casero", "Arma y rompe Pangea", "Carta desde el año 66.000.000", "¡Protejan a las Crías!"] },
  },
  {
    slug: 'volcanoes', color: '#B23A1A',
    en: { title: 'Volcanoes', hook: 'Lava, ash and the mountains that build the Earth.', intro: "What if you could stand at the edge of the Earth's biggest secret and learn to read the mountain that breathes fire, ash and new land?", subjects: ["Earth Science", "Chemistry", "Geography", "History", "Math", "Language Arts", "Art & Creativity", "Life Skills & SEL", "Movement & Body", "Astronomy"], teasers: ["Two Mountains, Two Slopes", "The Island That Rose From the Sea", "Steep or Gentle?", "Pack the Ash-Ready Go-Bag"] },
    es: { title: 'Volcanes', hook: 'Lava, ceniza y las montañas que construyen la Tierra.', intro: "¿Y si pudieras asomarte al interior de la Tierra y descubrir por qué a veces la montaña despierta, ruge y renace?", subjects: ["Ciencias de la Tierra", "Química", "Física", "Geografía", "Historia", "Lenguaje y Literatura", "Matemáticas", "Arte y Creatividad", "Habilidades para la Vida", "Astronomía"], teasers: ["Viaje al centro de la Tierra", "El estruendo que dio la vuelta al mundo", "El espejo del artesano", "Una montaña entre las olas"] },
  },
  {
    slug: 'leonardo', color: '#6D4C1F',
    en: { title: 'Leonardo da Vinci', hook: 'Art, flying machines and the notebooks of a genius.', intro: "What if you kept a secret notebook for a whole month, filling it with questions about birds, water, and flying machines, just like the boy from Vinci who never stopped asking 'why?'", subjects: ["Art & Creativity", "Language Arts", "Physics", "Biology", "Math", "History", "Technology", "Critical Thinking", "Earth Science", "Music"], teasers: ["Smoky Soft Portrait", "The Paper Spinner", "Shrink the Mona Lisa", "Eyes or Books?"] },
    es: { title: 'Leonardo da Vinci', hook: 'Arte, máquinas voladoras y los cuadernos de un genio.', intro: "¿Y si tu cuaderno de notas se convirtiera en un taller secreto donde cada pregunta, cada garabato y cada invento torcido te acerca a la mente más curiosa de la historia?", subjects: ["Arte y Creatividad", "Física", "Matemáticas", "Biología", "Lenguaje y Literatura", "Historia", "Tecnología", "Geografía", "Música", "Ciencias de la Tierra"], teasers: ["Retrato sin líneas duras", "Mi propio Hombre de Vitruvio", "Fábulas con moraleja", "La ruta de una vida"] },
  },
  {
    slug: 'maya', color: '#085041',
    en: { title: 'The Maya', hook: 'Pyramids, glyphs and a number system with zero.', intro: "Imagine stepping into a jungle where people read the stars, wrote in glowing picture-words, and built stone cities that still stand in Guatemala, Mexico and Belize today.", subjects: ["History", "Geography", "Math", "Language Arts", "Astronomy", "Biology", "Art & Creativity", "Movement & Body", "Chemistry", "Physics"], teasers: ["Pacal's 68-Year Path", "How Many of Me Tall?", "Grow a Milpa in Pots", "Pyramid Stair Climb"] },
    es: { title: 'Los mayas', hook: 'Pirámides, glifos y un sistema numérico con cero.', intro: "Imagina que encuentras una ciudad escondida en la selva y descubres que sus constructores medían las estrellas, escribían con dibujos y contaban con tres símbolos, ¡y que sus descendientes siguen vivos en Guatemala hoy!", subjects: ["Matemáticas", "Lenguaje y Literatura", "Historia", "Geografía", "Astronomía", "Biología", "Arte y Creatividad", "Movimiento y Cuerpo", "Pensamiento Crítico", "Música"], teasers: ["Suma como escriba maya", "La estela del rey", "Gnomon y serpiente de luz", "¡Solo cadera y rodillas!"] },
  },
  {
    slug: 'cherry-blossoms', color: '#B0194F',
    en: { title: 'Cherry Blossoms', hook: 'Hanami, Japan’s festival of picnics under pink trees.', intro: "For one short week each spring, whole cities stop to sit under trees that bloom, fall and vanish like pink snow, and you get to find out why the world holds its breath for it.", subjects: ["Biology", "Earth Science", "Geography", "History", "Language Arts", "Math", "Art & Creativity", "Life Skills & SEL", "Chemistry", "Music"], teasers: ["Flower Surgery", "Navigator's Route to Washington", "Word-Building Card Game", "Keeper of the Picnic Spot"] },
    es: { title: 'Flores de cerezo', hook: 'Hanami, la fiesta japonesa de picnics bajo árboles rosados.', intro: "Imagina que solo tienes unos pocos días al año para ver el árbol más famoso de Japón vestido de nubes rosadas: ¿cómo lo atraparías antes de que el viento se lo lleve?", subjects: ["Biología", "Ciencias de la Tierra", "Física", "Matemáticas", "Lenguaje y Literatura", "Geografía", "Historia", "Arte y Creatividad", "Habilidades para la Vida y Socioemocionales", "Movimiento y Cuerpo"], teasers: ["Cuenta los pétalos de una flor", "Fábrica de tormentas", "Voces bajo los cerezos", "Árbol-nube de esponja"] },
  },
  {
    slug: 'anime', color: '#283593',
    en: { title: 'Anime', hook: 'How Japanese animation brings drawings to life.', intro: "Every anime begins as a pencil line on blank paper, so what worlds could your own pencil bring to life?", subjects: ["Art & Creativity", "Language Arts", "Math", "Music", "Geography", "History", "Life Skills & SEL", "Physics", "Critical Thinking", "Movement & Body"], teasers: ["Make Your Own Great Wave", "Grow Your Drawing", "Cut-Out Pioneer", "Shadow Puppet Theater"] },
    es: { title: 'Anime', hook: 'Cómo la animación japonesa da vida a los dibujos.', intro: "¿Y si descubrieras cómo miles de dibujos quietos se convierten en un mundo que se mueve, y cómo Japón se esconde detrás de cada trazo?", subjects: ["Arte y Creatividad", "Tecnología", "Lenguaje y Literatura", "Matemáticas", "Geografía", "Historia", "Música", "Movimiento y Cuerpo", "Habilidades para la Vida", "Pensamiento Crítico"], teasers: ["Una cara, seis emociones", "Palabras Viajeras", "Calendario de paisajes", "¡Congélate como héroe de anime!"] },
  },
]

export function getTopic(slug) {
  return TOPICS.find(t => t.slug === slug)
}

export function pdfPath(slug, lang) {
  return `/free/${slug}-${lang}.pdf`
}
