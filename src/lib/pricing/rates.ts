export const PLAY_RATES = {
  singleFirstHour: 500,
  singleAdditionalHour: 400,
  pairFirstHour: 800,
  pairAdditionalHour: 700,
} as const;

export const DAYCARE_RATES = {
  hourly: 650,
  fullDay: 3000,
} as const;

export const POS_LABELS = {
  playSingleFirstHour: "Igranje 1h",
  playSingleAdditionalHour: "Igranje - dodatan sat",
  playPairFirstHour: "Igranje dvoje dece 1h",
  playPairAdditionalHour: "Igranje dvoje dece - dodatan sat",
  daycareHourly: "Cuvanje deteta 1h",
  daycareFullDay: "Cuvanje deteta celodnevno",
} as const;

export const GRACE_MINUTES = 10;
export const FIRST_HOUR_MINUTES = 60;
