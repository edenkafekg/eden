export const BIRTHDAY_HERO_PHOTO = {
  src: "/rodjendani/slavljenica-ruza.png",
  alt: "Slavljenica sa ružom na rođendanu u EDEN-u",
  caption: "Poseban trenutak za slavljenika",
} as const;

export const BIRTHDAY_PHOTOS = [
  {
    id: "pizza-sokici",
    src: "/rodjendani/pizza-sokici.png",
    alt: "Deca jedu pizzu na rođendanu u EDEN-u sa dekoracijom",
    caption: "Hrana, dekoracija i vesela atmosfera",
    featured: true,
  },
  {
    id: "porodica-torte",
    src: "/rodjendani/porodica-torte.png",
    alt: "Porodica slavi rođendan sa tortama u EDEN-u",
    caption: "Porodični trenuci uz tortu",
    featured: true,
  },
  {
    id: "crtanje-licu-1",
    src: "/rodjendani/crtanje-licu-1.png",
    alt: "Animatorke rade crtanje po licu na rođendanu",
    caption: "Crtanje po licu i animacija",
    featured: true,
  },
  {
    id: "hrana-deca",
    src: "/rodjendani/hrana-deca.png",
    alt: "Deca jedu užinu za stolom na rođendanu",
    caption: "Užina i piće za decu",
  },
  {
    id: "slavljenica-ruza",
    src: "/rodjendani/slavljenica-ruza.png",
    alt: "Slavljenica sa ružom na rođendanu u EDEN-u",
    caption: "Poseban trenutak za slavljenika",
  },
  {
    id: "crtanje-licu-2",
    src: "/rodjendani/crtanje-licu-2.png",
    alt: "Crtanje po licu u EDEN igraonici tokom proslave",
    caption: "Animatorke brinu o zabavi",
  },
  {
    id: "igra-zabava",
    src: "/rodjendani/igra-zabava.png",
    alt: "Dete se igra u EDEN prostoru tokom proslave",
    caption: "Igra i radost u našem prostoru",
  },
] as const;

export type BirthdayPhoto = (typeof BIRTHDAY_PHOTOS)[number];
