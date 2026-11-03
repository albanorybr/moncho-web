export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/dashboard', '/account', '/generate'] },
    sitemap: 'https://www.monchounschooling.com/sitemap.xml',
  }
}
