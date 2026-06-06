export type GoogleReview = {
  author: string;
  rating: number;
  date: string;
  text: string;
};

/** Recenzije sa Google-a, sortirane po najvišoj oceni (5 zvezdica). */
export const GOOGLE_REVIEWS = {
  rating: 4.4,
  count: 21,
  reviews: [
    {
      author: "stefan petricevic",
      rating: 5,
      date: "pre 4 meseca",
      text: "Odlično iskustvo. Bili smo nekoliko puta i brzo stekli poverenje u radnike jer su više nego pažljivi, pa možemo da ostavimo dete i radimo u kafiću u potpunom miru.",
    },
    {
      author: "Andrej Marjanovic",
      rating: 5,
      date: "pre 4 meseca",
      text: "Najbolja koncepcija igraonice u gradu, vrhunska usluga, razumne cene. Deca mogu bezbedno da se igraju satima dok ih osoblje gleda, a ja mogu da popijem kafu ili uradim nešto u kafiću.",
    },
    {
      author: "Milan Nešić",
      rating: 5,
      date: "pre 5 meseci",
      text: "Prelep prostor za decu i ljubazno osoblje. Radnici su posvećeni deci tokom igre, što je veoma važno!",
    },
    {
      author: "Johnsky Johnsky",
      rating: 5,
      date: "pre 5 meseci",
      text: "Atmosfera je prelepa, osoblje je veoma ljubazno i zaista znaju kako da se nose sa decom, pa mogu da pijem kafu u miru. Najvažnije mi je da je toplo i čisto.",
    },
    {
      author: "Nikolija Sakac",
      rating: 5,
      date: "pre 3 meseca",
      text: "Konačno pravi kutak za decu sa puno sadržaja i odgovornim osobljem.",
    },
    {
      author: "Andrea Spasojević",
      rating: 5,
      date: "pre nedelju dana",
      text: "Odlično okruženje, lepa atmosfera i usluga. Deca su uživala!",
    },
    {
      author: "Katarina Mijailović",
      rating: 5,
      date: "pre nedelju dana",
      text: "Najbolja igraonica u gradu i prave odličnu kafu.",
    },
    {
      author: "Ljiljana Todorovic",
      rating: 5,
      date: "pre 2 meseca",
      text: "Svaka preporuka, devojke koje čuvaju decu su divne i veoma posvećene.",
    },
    {
      author: "Slavica Kojcic",
      rating: 5,
      date: "pre 2 meseca",
      text: "Mesto za brigu o deci, igraonica i nešto za jelo i piće — odličan izbor za roditelje, a posebno za decu.",
    },
  ] satisfies GoogleReview[],
} as const;
