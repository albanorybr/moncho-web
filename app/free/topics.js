// Free sample unit studies (Full, ages 7-11), each in English and Spanish.
// PDFs live in /public/free/<slug>-en.pdf and /public/free/<slug>-es.pdf.
// `teasers` are real challenge titles from each unit; `subjects` are its 10 subjects.

export const TOPICS = [
  {
    slug: 'baseball', color: '#2E6DA4',
    en: { title: 'Baseball', hook: 'Stats, pitches and the 90-foot diamond.' },
    es: { title: 'Béisbol', hook: 'Estadísticas, lanzamientos y el diamante de 90 pies.' },
  },
  {
    slug: 'football', color: '#5D4037',
    en: { title: 'American Football', hook: 'Yards, plays and the physics of a spiral pass.' },
    es: { title: 'Fútbol americano', hook: 'Yardas, jugadas y la física del pase en espiral.' },
  },
  {
    slug: 'basketball', color: '#C4461F',
    en: { title: 'Basketball', hook: 'Arcs, angles and the science of the bounce.' },
    es: { title: 'Baloncesto', hook: 'Arcos, ángulos y la ciencia del rebote.' },
  },
  {
    slug: 'board-games', color: '#6A1B9A',
    en: { title: 'Board Games', hook: 'Dice, strategy and games older than the pyramids.' },
    es: { title: 'Juegos de mesa', hook: 'Dados, estrategia y juegos más antiguos que las pirámides.' },
  },
  {
    slug: 'dance', color: '#AD1457',
    en: { title: 'Dance', hook: 'Rhythm, spins and stories told with the body.' },
    es: { title: 'Danza', hook: 'Ritmo, giros e historias contadas con el cuerpo.' },
  },
  {
    slug: 'airplanes', color: '#01579B',
    en: { title: 'Airplanes', hook: 'Lift, wings and the brothers who first flew.' },
    es: { title: 'Aviones', hook: 'Sustentación, alas y los hermanos que volaron primero.' },
  },
  {
    slug: 'dinosaurs', color: '#2E7D32',
    en: { title: 'Dinosaurs', hook: 'Fossils, footprints and giants measured in steps.' },
    es: { title: 'Dinosaurios', hook: 'Fósiles, huellas y gigantes medidos en pasos.' },
  },
  {
    slug: 'volcanoes', color: '#B23A1A',
    en: { title: 'Volcanoes', hook: 'Lava, ash and the mountains that build the Earth.' },
    es: { title: 'Volcanes', hook: 'Lava, ceniza y las montañas que construyen la Tierra.' },
  },
  {
    slug: 'leonardo', color: '#6D4C1F',
    en: { title: 'Leonardo da Vinci', hook: 'Art, flying machines and the notebooks of a genius.' },
    es: { title: 'Leonardo da Vinci', hook: 'Arte, máquinas voladoras y los cuadernos de un genio.' },
  },
  {
    slug: 'maya', color: '#085041',
    en: { title: 'The Maya', hook: 'Pyramids, glyphs and a number system with zero.' },
    es: { title: 'Los mayas', hook: 'Pirámides, glifos y un sistema numérico con cero.' },
  },
  {
    slug: 'cherry-blossoms', color: '#B0194F',
    en: { title: 'Cherry Blossoms', hook: 'Hanami, Japan’s festival of picnics under pink trees.' },
    es: { title: 'Flores de cerezo', hook: 'Hanami, la fiesta japonesa de picnics bajo árboles rosados.' },
  },
  {
    slug: 'anime', color: '#283593',
    en: { title: 'Anime', hook: 'How Japanese animation brings drawings to life.' },
    es: { title: 'Anime', hook: 'Cómo la animación japonesa da vida a los dibujos.' },
  },
]

export function getTopic(slug) {
  return TOPICS.find(t => t.slug === slug)
}

export function pdfPath(slug, lang) {
  return `/free/${slug}-${lang}.pdf`
}
