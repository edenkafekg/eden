export const CHILD_COUNT_OPTIONS = [
  { value: "do-15", label: "do 15" },
  { value: "16-20", label: "16–20" },
  { value: "21-25", label: "21–25" },
  { value: "26-30", label: "26–30" },
  { value: "31-35", label: "31–35" },
  { value: "36-40", label: "36–40" },
] as const;

export const CHILD_FOOD_OPTIONS = [
  { value: "pizza", label: "Pizza" },
  { value: "chicken-nuggets", label: "Chicken nuggets" },
] as const;

export const ADULT_FOOD_OPTIONS = [
  { value: "rostilj", label: "Roštilj" },
  { value: "pizza", label: "Pizza" },
  { value: "mix", label: "Mix roštilj i pizza" },
  { value: "ketering", label: "Ketering" },
] as const;

export const PARENT_DRINK_OPTIONS = [
  { value: "kafa-caj", label: "Kafa i čajevi" },
  { value: "voda-sokovi", label: "Voda i sokovi" },
  { value: "alkohol-ukljucen", label: "Alkohol uključen u cenu" },
  { value: "alkohol-potrosnja", label: "Alkohol po potrošnji na dan rođendana" },
] as const;

export const EXTRA_OPTIONS = [
  { value: "dekoracija", label: "Dekoracija" },
  { value: "premium-dekoracija", label: "Premium dekoracija" },
  { value: "maskota", label: "Maskota" },
  { value: "instagram-reel", label: "Instagram video reel" },
  { value: "fotografije", label: "Profesionalne fotografije" },
] as const;

export const VISITED_OPTIONS = [
  { value: "da", label: "Da" },
  { value: "ne", label: "Ne" },
] as const;
