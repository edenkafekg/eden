export const SITE = {
  name: "Eden",
  tagline: "Dečija igraonica i rođendaonica",
  city: "Kragujevac",
  address: "Milovana Gušića 95b, Kragujevac 34104",
  phone: "061 172 1394",
  email: "edenkafekg@gmail.com",
  hours: "Pon – Ned: 10:00 – 21:00",
  mapsUrl:
    "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDAgCECMYJxiABBiKBTIGCAAQRRg8MgwIARAuGEMYgAQYigUyDAgCECMYJxiABBiKBTISCAMQLhhDGK8BGMcBGIAEGIoFMgwIBBAuGEMYgAQYigUyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgyNDc4ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=rs&sa=X&geocode=KctDc6guIVdHMXOzqGOnd1l-&daddr=Milovana+Gu%C5%A1i%C4%87a+95b,+Kragujevac+34104",
  mapsEmbed:
    "https://maps.google.com/maps?q=Milovana+Gu%C5%A1i%C4%87a+95b,+Kragujevac+34104&hl=sr&z=16&output=embed",
  googleReviewsShareUrl: "https://share.google/FHJGuV0rLyGorCENl",
  googleReviewsUrl:
    "https://www.google.com/search?q=Eden+-+Cafe+%26+Kids+Playground+Reviews&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOYR2vj9u4UKqFoZCA9nZdE6kI3Jadf7CQGZ4-euGQ2RYxFMSPZEa8iIr-1MxWCTw7eizkvgBLwutMWDqB_442LsQzBBqBaVTmrdrySY0y6zfVyZuCw%3D%3D",
  cafeMenuPdfUrl: "/eden-kafic-meni.pdf",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Početna" },
  { href: "/igraonica", label: "Igraonica" },
  { href: "/cuvaonica", label: "Čuvaonica" },
  { href: "/rodjendani", label: "Rođendani" },
  { href: "/kafic", label: "Kafić" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const FEATURES = [
  "Bezbednost i higijena na prvom mestu",
  "Stručan tim koji se stara o deci",
  "Moderno opremljena igraonica",
  "Prostor za roditelje u kafiću",
  "Fleksibilni paketi za rođendane",
  "Parking u blizini objekta",
] as const;

export const INSTAGRAM = {
  handle: "edenkafe",
  profileUrl: "https://www.instagram.com/edenkafe/",
  posts: [
    "https://www.instagram.com/edenkafe/reel/DX6Rs6wgPDn/",
    "https://www.instagram.com/edenkafe/p/DXuHZsYjEwR/",
    "https://www.instagram.com/edenkafe/p/DXo9_eyDJOj/",
    "https://www.instagram.com/edenkafe/reel/DXlp4nvmVi9/",
    "https://www.instagram.com/edenkafe/reel/DXccd4RCOBx/",
    "https://www.instagram.com/edenkafe/p/DXRO7pTDLbZ/",
    "https://www.instagram.com/edenkafe/reel/DXO2fmmFBOn/",
    "https://www.instagram.com/edenkafe/p/DW3hTEhDGHt/",
  ],
} as const;
