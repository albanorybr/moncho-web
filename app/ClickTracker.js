'use client'

import { useEffect } from 'react'
import { track } from './lib/track'

// One listener for the whole site, so we don't have to touch every link.
//  - pdf_download: any link to a .pdf (free unit studies, sample study)
//  - cta_click:    any link to /login or /generate ("Create yours free", "Generate", ...)
export default function ClickTracker() {
  useEffect(() => {
    function onClick(e) {
      const a = e.target.closest && e.target.closest('a[href]')
      if (!a) return
      let url
      try { url = new URL(a.href, window.location.href) } catch { return }
      if (url.origin !== window.location.origin) return

      const path = url.pathname
      const text = (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60)

      if (path.toLowerCase().endsWith('.pdf')) {
        const fileName = path.split('/').pop()
        // Free units are /free/<slug>-<en|es>.pdf
        const m = path.match(/^\/free\/(.+)-(en|es)\.pdf$/i)
        track('pdf_download', {
          file_name: fileName,
          link_url: path,
          topic: m ? m[1] : undefined,
          language: m ? m[2].toLowerCase() : undefined,
          page_path: window.location.pathname,
        })
        return
      }

      if (path === '/login' || path === '/generate') {
        track('cta_click', {
          cta_text: text,
          link_url: path,
          page_path: window.location.pathname,
        })
      }
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
