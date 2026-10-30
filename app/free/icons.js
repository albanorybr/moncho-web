// Line icons for the free unit study topics (white stroke on a colored cover).
// Same drawings as the approved page mockup.

const PATHS = {
  baseball: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M6.5 5.2c2 2.2 2 11.4 0 13.6" />
      <path d="M17.5 5.2c-2 2.2-2 11.4 0 13.6" />
      <path d="M7.6 8.2l-1.5.4M8 11.2l-1.6.2M8 14.2l-1.6-.1M17.9 8.6l-1.5-.4M17.6 11.4l-1.6-.2M17.6 14.1l-1.6.1" />
    </>
  ),
  football: (
    <>
      <path d="M4.5 19.5c-1.6-5.4.6-11.3 5.6-13.6 3.2-1.5 6.6-1.6 9.4-1.4.2 2.8.1 6.2-1.4 9.4-2.3 5-8.2 7.2-13.6 5.6z" />
      <path d="M9.5 14.5l5-5" />
      <path d="M10.8 11.2l2 2M12.3 9.7l2 2M9.3 12.7l2 2" />
      <path d="M5 15.5l3.5 3.5M15.5 5l3.5 3.5" />
    </>
  ),
  basketball: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3v18" />
      <path d="M5.6 5.6c3 2.6 3 10.2 0 12.8M18.4 5.6c-3 2.6-3 10.2 0 12.8" />
    </>
  ),
  'board-games': (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" />
      <circle cx="15.5" cy="8.5" r="1.1" fill="currentColor" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
      <circle cx="8.5" cy="15.5" r="1.1" fill="currentColor" />
      <circle cx="15.5" cy="15.5" r="1.1" fill="currentColor" />
    </>
  ),
  dance: (
    <>
      <circle cx="13" cy="4" r="1.8" />
      <path d="M13 6.5l-1.5 6 3 3-1 5.5" />
      <path d="M11.5 12.5L8 17l-3 .5" />
      <path d="M12.6 8.2L8 6.5 5 8" />
      <path d="M12.6 8.2l4.4 1.3 2-3" />
    </>
  ),
  airplanes: (
    <path d="M21 4.5c-.8-.8-2.2-.6-3 .2l-3.8 3.8L5 6 3.5 7.5l7.3 3.7-3.3 3.3-2.8-.3L3.5 15.4l3.6 1.5 1.5 3.6 1.2-1.2-.3-2.8 3.3-3.3 3.7 7.3 1.5-1.5-2.5-9.2 3.8-3.8c.8-.8 1-2.2.2-3z" />
  ),
  dinosaurs: (
    <>
      <path d="M12 21c-3 0-5-1.8-5-4.4 0-2.6 2.2-4.6 5-4.6s5 2 5 4.6c0 2.6-2 4.4-5 4.4z" />
      <path d="M7.5 13.5L4 8.5" />
      <path d="M12 12V4.5" />
      <path d="M16.5 13.5L20 8.5" />
      <path d="M4 8.5l-.8-1.8M12 4.5l0-2M20 8.5l.8-1.8" />
    </>
  ),
  volcanoes: (
    <>
      <path d="M2.5 20.5l6.5-10h6l6.5 10z" />
      <path d="M9 10.5l1.5 2.5 1.5-1.5 1.5 1.5 1.5-2.5" />
      <path d="M10 7c-.5-1.5.5-2.5 1.5-2.5S12.5 3 14 3.5c1.5.5 1 2 2 2.5" />
    </>
  ),
  leonardo: (
    <>
      <path d="M12 3.5c-4.9 0-8.5 3.5-8.5 7.9 0 3.5 2.6 5.6 5 5.6 1.4 0 1.9.9 1.9 1.9 0 1.2.8 1.6 1.9 1.6 4.4 0 8.2-3.6 8.2-8.4 0-4.8-3.8-8.6-8.5-8.6z" />
      <circle cx="8" cy="10" r="1.2" />
      <circle cx="12" cy="7.5" r="1.2" />
      <circle cx="16" cy="10" r="1.2" />
      <circle cx="15.5" cy="14.5" r="1.2" />
    </>
  ),
  maya: (
    <>
      <path d="M2.5 20.5h19" />
      <path d="M4 20.5v-3h16v3" />
      <path d="M6 17.5v-3h12v3" />
      <path d="M8 14.5v-3h8v3" />
      <path d="M10 11.5V8h4v3.5" />
      <path d="M11 8V5.5h2V8" />
      <path d="M12 20.5v-9" />
    </>
  ),
  'cherry-blossoms': (
    <>
      <circle cx="12" cy="12" r="1.8" />
      <path d="M12 10.2c-1.6-1.6-1.8-4.4 0-6.2 1.8 1.8 1.6 4.6 0 6.2z" />
      <path d="M13.7 11.4c.6-2.2 2.9-3.6 5.4-3-.4 2.5-2.9 4-5.4 3z" />
      <path d="M13.1 13.7c2.2.4 3.7 2.6 3.2 5.1-2.4-.5-3.9-2.8-3.2-5.1z" />
      <path d="M10.9 13.7c.7 2.3-.8 4.6-3.2 5.1-.5-2.5 1-4.7 3.2-5.1z" />
      <path d="M10.3 11.4c-2.5 1-5-.5-5.4-3 2.5-.6 4.8.8 5.4 3z" />
    </>
  ),
  anime: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 8.5h18M3 15.5h18" />
      <path d="M6.5 4.5v4M10.5 4.5v4M14.5 4.5v4M18.5 4.5v4M6.5 15.5v4M10.5 15.5v4M14.5 15.5v4M18.5 15.5v4" />
      <path d="M10.5 10.3l3.5 1.7-3.5 1.7z" />
    </>
  ),
}

export function TopicIcon({ slug, size = 36 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {PATHS[slug]}
    </svg>
  )
}

export function DownloadIcon({ size = 18 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v11" /><path d="M7 10l5 5 5-5" /><path d="M5 20h14" />
    </svg>
  )
}
