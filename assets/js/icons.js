/* Icon paths — copied verbatim from the design system bundle
   (components/icons/iconPaths.js), Lucide icons (ISC), subset actually
   used by this site. Inner geometry only; shared viewBox 0 0 24 24,
   stroke-width 2, round caps. */
window.ICON_PATHS = {
  "arrow-up-right": '<path d="M7 7h10v10"></path> <path d="M7 17 17 7"></path>',
  "chevron-left": '<path d="m15 18-6-6 6-6"></path>',
  "church": '<path d="M10 9h4"></path> <path d="M12 7v5"></path> <path d="M14 21v-3a2 2 0 0 0-4 0v3"></path> <path d="m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9"></path> <path d="M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14"></path>',
  "compass": '<circle cx="12" cy="12" r="10"></circle> <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"></path>',
  "factory": '<path d="M12 16h.01"></path> <path d="M16 16h.01"></path> <path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path> <path d="M8 16h.01"></path>',
  "graduation-cap": '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path> <path d="M22 10v6"></path> <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>',
  "landmark": '<path d="M10 18v-7"></path> <path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"></path> <path d="M14 18v-7"></path> <path d="M18 18v-7"></path> <path d="M3 22h18"></path> <path d="M6 18v-7"></path>',
  "leaf": '<path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"></path> <path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"></path>',
  "menu": '<path d="M4 5h16"></path> <path d="M4 12h16"></path> <path d="M4 19h16"></path>',
  "mountain": '<path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>',
  "qr-code": '<rect width="5" height="5" x="3" y="3" rx="1"></rect> <rect width="5" height="5" x="16" y="3" rx="1"></rect> <rect width="5" height="5" x="3" y="16" rx="1"></rect> <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path> <path d="M21 21v.01"></path> <path d="M12 7v3a2 2 0 0 1-2 2H7"></path> <path d="M3 12h.01"></path> <path d="M12 3h.01"></path> <path d="M12 16v.01"></path> <path d="M16 12h1"></path> <path d="M21 12v.01"></path> <path d="M12 21v-1"></path>',
  "route": '<circle cx="6" cy="19" r="3"></circle> <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path> <circle cx="18" cy="5" r="3"></circle>',
  "trees": '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"></path> <path d="M7 16v6"></path> <path d="M13 19v3"></path> <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"></path>',
  "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path> <path d="M16 3.128a4 4 0 0 1 0 7.744"></path> <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path> <circle cx="9" cy="7" r="4"></circle>'
  /* 'move-right' is not in this design's icon set — RotaSection.jsx names it
     for the next-stop arrow but the bundle never defined it, so that slot
     renders empty there too. window.icon() below reproduces that faithfully:
     an unknown name falls through to an empty <svg>. */
};

/** Build an inline <svg> string for a Lucide-derived icon. */
window.icon = function icon(name, { size = 20, stroke = 1.6, color = 'currentColor', className = '' } = {}) {
  const inner = window.ICON_PATHS[name] || '';
  return `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
};
