export type MenuItem = {
  name: string;
  volume?: string;
  price: string;
  altName?: string;
  description?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  navLabel: string;
  items: MenuItem[];
  note?: string;
  variant?: "default" | "description" | "combo";
  defaultOpen?: boolean;
};

export type FeaturedDrink = {
  id: string;
  name: string;
  description: string;
  volume: string;
  price: string;
  badge: string;
  accent: string;
  emoji: string;
  secondary?: boolean;
};

export const SUMMER_FAVORITES: FeaturedDrink[] = [
  {
    id: "heineken-035",
    name: "Heineken točeno pivo",
    description: "Rashlađeno točeno pivo za opušteno letnje popodne",
    volume: "0.35l",
    price: "375 RSD",
    badge: "Letnji favorit",
    accent: "from-amber-100 to-amber-50",
    emoji: "🍺",
  },
  {
    id: "heineken-05",
    name: "Heineken točeno pivo",
    description: "Kada želite veću čašu osveženja",
    volume: "0.5l",
    price: "435 RSD",
    badge: "Najbolji izbor",
    accent: "from-yellow-100 to-amber-50",
    emoji: "🍻",
  },
  {
    id: "orange-juice",
    name: "Ceđena pomorandža",
    description: "Sveže ceđena pomorandža, bez komplikovanja",
    volume: "0.25l",
    price: "350 RSD",
    badge: "Sveže ceđeno",
    accent: "from-orange-100 to-orange-50",
    emoji: "🍊",
  },
  {
    id: "cedevita",
    name: "Cedevita",
    description: "Klasično letnje osveženje",
    volume: "0.25l",
    price: "225 RSD",
    badge: "Osvežavajuće",
    accent: "from-sky-100 to-cyan-50",
    emoji: "🧊",
  },
  {
    id: "iced-coffee",
    name: "Ledena kafa",
    description: "Hladna kafa za vrele dane",
    volume: "200ml",
    price: "245 RSD",
    badge: "Hladno i kremasto",
    accent: "from-stone-200 to-amber-50",
    emoji: "☕",
  },
  {
    id: "lemonade",
    name: "Limunada",
    description: "Jednostavno, sveže i rashlađeno",
    volume: "0.25l",
    price: "290 RSD",
    badge: "Letnji klasik",
    accent: "from-lime-100 to-yellow-50",
    emoji: "🍋",
  },
  {
    id: "aperol",
    name: "Aperol Spritz",
    description: "Lagani koktel za opušteno druženje",
    volume: "240ml",
    price: "550 RSD",
    badge: "Preporuka",
    accent: "from-orange-200 to-rose-100",
    emoji: "🍹",
    secondary: true,
  },
  {
    id: "tropical-smoothie",
    name: "Tropski Zalazak smuti",
    description: "Banana, ananas, mango, narandža, led i jogurt",
    volume: "350ml",
    price: "370 RSD",
    badge: "Smuti hit",
    accent: "from-pink-100 to-orange-100",
    emoji: "🥤",
    secondary: true,
  },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "kafe",
    title: "Kafe",
    navLabel: "Kafe",
    defaultOpen: true,
    items: [
      { name: "Domaća kafa", volume: "200ml", price: "175 RSD" },
      { name: "Espresso", volume: "25ml", price: "185 RSD" },
      { name: "Kraći sa mlekom", volume: "80ml", price: "205 RSD" },
      { name: "Cappuccino", volume: "200ml", price: "255 RSD" },
      { name: "Duži sa mlekom", volume: "200ml", price: "245 RSD" },
      { name: "Americano", volume: "200ml", price: "225 RSD" },
      { name: "Nescafe", volume: "200ml", price: "235 RSD" },
      { name: "Ledena kafa", volume: "200ml", price: "245 RSD", altName: "Ice Coffee" },
    ],
  },
  {
    id: "dodaci-kafe",
    title: "Dodaci za kafu",
    navLabel: "Dodaci",
    items: [
      { name: "Sojino mleko", price: "35 RSD" },
      { name: "Bademovo ili kokosovo mleko", price: "40 RSD" },
      { name: "Šlag", price: "40 RSD" },
    ],
    note: "Doplata za zamenu mleka u kafi.",
  },
  {
    id: "kafe-ukus",
    title: "Kafe sa ukusom",
    navLabel: "Kafe sa ukusom",
    items: [
      { name: "Mocaccino", volume: "200ml", price: "325 RSD" },
      { name: "Caramel Latte", volume: "200ml", price: "335 RSD" },
      { name: "Hazelnut Heaven", volume: "200ml", price: "335 RSD" },
    ],
  },
  {
    id: "topli",
    title: "Topli napici",
    navLabel: "Topli napici",
    items: [
      { name: "Kamilica sa medom", volume: "250ml", price: "210 RSD" },
      { name: "Nana čaj sa medom", volume: "250ml", price: "210 RSD" },
      { name: "Voćna mešavina — Crvena šuma", volume: "250ml", price: "225 RSD" },
      { name: "Zeleni čaj sa medom i limunom", volume: "250ml", price: "225 RSD" },
      { name: "Topla čokolada — crna ili bela", volume: "220ml", price: "350 RSD" },
    ],
  },
  {
    id: "bezalkoholna",
    title: "Bezalkoholna pića",
    navLabel: "Bezalkoholna pića",
    items: [
      { name: "Rosa", volume: "0.33l", price: "205 RSD" },
      { name: "Rosa velika", volume: "0.7l", price: "320 RSD" },
      { name: "Rosa kisela", volume: "0.33l", price: "220 RSD" },
      { name: "Limunska trava", volume: "0.33l", price: "235 RSD" },
      { name: "Coca-Cola", volume: "0.25l", price: "235 RSD" },
      { name: "Coca-Cola Zero", volume: "0.25l", price: "235 RSD" },
      { name: "Cockta", volume: "0.275l", price: "230 RSD" },
      { name: "Fanta / Sprite", volume: "0.25l", price: "235 RSD" },
      { name: "Schweppes — Tonic / Bitter Lemon", volume: "0.25l", price: "235 RSD" },
      { name: "Fuse Tea", volume: "0.25l", price: "235 RSD" },
      { name: "Limunada", volume: "0.25l", price: "290 RSD" },
      { name: "Ceđena pomorandža", volume: "0.25l", price: "350 RSD" },
      { name: "Cedevita", volume: "0.25l", price: "225 RSD" },
      { name: "Ultra Energy", volume: "0.25l", price: "245 RSD" },
      { name: "Red Bull", volume: "0.25l", price: "365 RSD" },
    ],
  },
  {
    id: "decija-pica",
    title: "Dečija pića",
    navLabel: "Dečija pića",
    items: [
      { name: "Pomorandža", volume: "0.2l", price: "295 RSD" },
      { name: "Jabuka", volume: "0.2l", price: "295 RSD" },
      { name: "Breskva", volume: "0.2l", price: "295 RSD" },
      { name: "Šumsko voće", volume: "0.2l", price: "295 RSD" },
      { name: "Jagoda", volume: "0.2l", price: "295 RSD" },
      { name: "Plazma šejk", volume: "0.3l", price: "380 RSD" },
    ],
  },
  {
    id: "smuti",
    title: "Smuti napici",
    navLabel: "Smuti napici",
    variant: "description",
    items: [
      {
        name: "Tropski Zalazak",
        volume: "350ml",
        price: "370 RSD",
        description: "Banana, ananas, mango, narandža, led i jogurt",
      },
      {
        name: "Rani Mamurluk",
        volume: "350ml",
        price: "395 RSD",
        description: "Banana, jagoda, narandža, malo meda i led",
      },
      {
        name: "Sunčani Udar",
        volume: "400ml",
        price: "415 RSD",
        description: "Mango, ananas, limeta, kokosovo mleko i led",
      },
      {
        name: "Power Boost",
        volume: "400ml",
        price: "455 RSD",
        description: "Banana, bademovo mleko, puter od kikirikija, protein prah od vanile i led",
      },
    ],
  },
  {
    id: "pivo",
    title: "Pivo",
    navLabel: "Pivo",
    items: [
      { name: "Heineken točeno pivo", volume: "0.35l", price: "375 RSD" },
      { name: "Heineken točeno pivo", volume: "0.5l", price: "435 RSD" },
      { name: "Heineken", volume: "0.25l", price: "310 RSD" },
      { name: "Heineken Silver 4%", volume: "0.25l", price: "310 RSD" },
      { name: "Heineken 0.0", volume: "0.25l", price: "310 RSD" },
      { name: "Zaječarsko", volume: "0.33l", price: "290 RSD" },
    ],
  },
  {
    id: "vino",
    title: "Vino i Somersby",
    navLabel: "Vino",
    items: [
      { name: "Prosecco La Delizia", volume: "125ml", price: "410 RSD" },
      { name: "Luda Mara Temjanika", volume: "150ml", price: "495 RSD" },
      { name: "Chardonnay", volume: "150ml", price: "320 RSD" },
      { name: "Luda Mara Cuvée", volume: "150ml", price: "315 RSD" },
      { name: "Aleksandrija Rosé", volume: "150ml", price: "350 RSD" },
      { name: "Aleksandrija Crveno", volume: "150ml", price: "345 RSD" },
      { name: "Somersby", volume: "150ml", price: "345 RSD" },
    ],
  },
  {
    id: "zestina",
    title: "Žestina",
    navLabel: "Žestina",
    items: [
      { name: "Rakija šljiva", volume: "0.03l", price: "440 RSD" },
      { name: "Rakija dunja ili kajsija", volume: "0.03l", price: "470 RSD" },
      { name: "Vodka", volume: "0.03l", price: "315 RSD" },
      { name: "Jägermeister", volume: "0.03l", price: "320 RSD" },
      { name: "Gin", volume: "0.03l", price: "320 RSD" },
      { name: "Tequila", volume: "0.03l", price: "320 RSD" },
      { name: "Jack Daniel's", volume: "0.04l", price: "345 RSD" },
    ],
  },
  {
    id: "kokteli",
    title: "Kokteli",
    navLabel: "Kokteli",
    items: [
      { name: "Gin Tonic", volume: "400ml", price: "415 RSD" },
      { name: "Aperol Spritz", volume: "240ml", price: "550 RSD" },
      { name: "Martini Bianco", volume: "175ml", price: "465 RSD" },
      { name: "Mojito", volume: "160ml", price: "455 RSD" },
      { name: "Cuba Libre", volume: "250ml", price: "415 RSD" },
      { name: "Margarita", volume: "250ml", price: "530 RSD" },
    ],
  },
  {
    id: "deciji-kokteli",
    title: "Zdravi voćni kokteli za decu",
    navLabel: "Dečiji voćni kokteli",
    variant: "description",
    items: [
      {
        name: "Elzin Ledeni Cvet",
        volume: "200ml",
        price: "335 RSD",
        description: "Banana, kokosovo mleko, limun i med",
      },
      {
        name: "Paukova Mreža",
        volume: "200ml",
        price: "345 RSD",
        description: "Jagoda, banana, narandža i med",
      },
      {
        name: "Mikelanđelov Mix",
        volume: "200ml",
        price: "355 RSD",
        description: "Mango, ananas i narandža",
      },
      {
        name: "Minion Banana Bomb",
        volume: "200ml",
        price: "335 RSD",
        description: "Banana, mango, jogurt i med",
      },
    ],
  },
  {
    id: "kombo",
    title: "Kombo ponude",
    navLabel: "Kombo ponude",
    variant: "combo",
    items: [
      { name: "Kafa & Mehurići", price: "320 RSD", description: "Espresso + Coca-Cola" },
      { name: "Kafa & Aqua", price: "320 RSD", description: "Espresso + Rosa 0.33l ili Rosa kisela 0.33l" },
      { name: "Slatki Set", price: "425 RSD", description: "Cappuccino + Next sokić" },
      { name: "Mamin Odmor", price: "550 RSD", description: "Tropski Zalazak + Espresso" },
      { name: "After Work Chill", price: "650 RSD", description: "Espresso + čaša vina Luda Mara Temjanika" },
    ],
  },
];

export const MENU_NAV_ITEMS = [
  { id: "letnji-favoriti", label: "Letnji favoriti" },
  ...MENU_CATEGORIES.filter((c) => c.id !== "dodaci-kafe").map((c) => ({
    id: c.id,
    label: c.navLabel,
  })),
  { id: "igra-cuvanje", label: "Igra i čuvanje" },
];

export const PLAY_AND_CARE_ITEMS = [
  { name: "Igranje deteta — prvi sat", price: "500 RSD" },
  { name: "Igranje deteta — svaki naredni sat", price: "400 RSD" },
  { name: "Igranje dvoje dece — prvi sat", price: "800 RSD" },
  { name: "Igranje dvoje dece — svaki naredni sat", price: "700 RSD" },
  { name: "Čuvanje deteta — 1 sat", price: "650 RSD" },
  { name: "Čuvanje deteta — ceo dan", price: "3.000 RSD" },
];
