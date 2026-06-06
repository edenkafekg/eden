export const PLAYROOM_VIDEO = {
  src: "/igraonica/igraonica-video.mov",
  poster: "/igraonica/ucimo-zajedno.png",
  title: "Video iz EDEN igraonice",
} as const;

export const PLAYROOM_PHOTOS = [
  {
    id: "ucimo-zajedno",
    src: "/igraonica/ucimo-zajedno.png",
    alt: "Radnica u EDEN-u čita deci knjigu u igraonici",
    caption: "Učimo i igramo zajedno",
    placement: "hero",
  },
  {
    id: "dete-i-radnica",
    src: "/igraonica/dete-i-radnica.png",
    alt: "Dete i radnica u EDEN igraonici",
    caption: "Topao odnos sa našim timom",
    placement: "story",
  },
  {
    id: "cuvamo-dete-1",
    src: "/igraonica/cuvamo-dete-1.png",
    alt: "Osoblje EDEN-a sa detetom u kafiću",
    caption: "Brinemo o deci dok vi odmorite",
    placement: "story",
  },
  {
    id: "deca-boje",
    src: "/igraonica/deca-boje.png",
    alt: "Deca slikaju akvarelom u EDEN igraonici",
    caption: "Kreativne aktivnosti",
    placement: "gallery",
  },
  {
    id: "idemo-na-put",
    src: "/igraonica/idemo-na-put.png",
    alt: "Devojčica sa igračkama u EDEN igraonici",
    caption: "Mašta, igra i radost",
    placement: "gallery",
  },
  {
    id: "cuvamo-dete-2",
    src: "/igraonica/cuvamo-dete-2.png",
    alt: "Osoblje EDEN-a drži dete u prostoru kafića",
    caption: "Sigurno i pažljivo okruženje",
    placement: "gallery",
  },
] as const;

export const PLAYROOM_GALLERY_PHOTOS = PLAYROOM_PHOTOS.filter((p) => p.placement === "gallery");

export const PLAYROOM_HERO_PHOTO = PLAYROOM_PHOTOS.find((p) => p.placement === "hero")!;
export const PLAYROOM_STORY_PHOTOS = PLAYROOM_PHOTOS.filter((p) => p.placement === "story");
