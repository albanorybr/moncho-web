import FreeLibrary from './FreeLibrary'
import { FreeHeader, FreeFooter } from './SiteChrome'

export const metadata = {
  title: 'Free Unit Studies for Homeschool (Ages 7–11) | Moncho',
  description: 'Download 12 free, print-ready homeschool unit studies in English or Spanish: baseball, football, basketball, board games, dance, airplanes, dinosaurs, volcanoes, Leonardo da Vinci, the Maya, cherry blossoms and anime.',
  alternates: { canonical: 'https://www.monchounschooling.com/free' },
  openGraph: {
    title: 'Free Unit Studies for Homeschool | Moncho',
    description: '12 free, hands-on unit studies in English or Spanish. Download, print, explore.',
    url: 'https://www.monchounschooling.com/free',
    type: 'website',
  },
}

export default function FreePage() {
  return (
    <div style={{ background: '#F7F4EF', minHeight: '100vh' }}>
      <FreeHeader />
      <main>
        <FreeLibrary />
      </main>
      <FreeFooter />
    </div>
  )
}
