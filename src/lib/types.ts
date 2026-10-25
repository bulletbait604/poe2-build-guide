export type ItemRef = {
  name: string;
  slot: string;
  icon?: string | null;
};

export type ArmorLine = {
  slot: string;
  lookFor: string;
};

export type UniqueSuggestion = {
  name: string;
  slot: string;
  level: number;
  note: string;
  icon?: string | null;
};

export type LevelBand = {
  from: number;
  to: number;
  title: string;
  equip: string;
  gem: string;
  ignore: string;
  armor: ArmorLine[];
  pointsIntro: string;
  points: string[];
  questPoints: string[];
};

export type GuideStep = {
  title: string;
  detail: string;
  items?: ItemRef[];
};

export type GuideChapter = "acts" | "interludes" | "endgame";

export type GuidePhase = {
  id: string;
  chapter: GuideChapter;
  title: string;
  levelRange: string;
  levelMin: number;
  levelMax: number;
  steps: GuideStep[];
};

export type GuideLink = {
  label: string;
  url: string;
};

export type Guide = {
  id: string;
  patch: "0.5.5";
  updated: string;
  classId: string;
  ascendancyId: string;
  name: string;
  skill: string;
  helper: string;
  summary: string;
  fantasy: string;
  links: GuideLink[];
  treeUrl: string;
  uniques: UniqueSuggestion[];
  levelBands: LevelBand[];
  phases: GuidePhase[];
};

export type PoeCharacter = {
  name: string;
  class: string;
  level: number;
  league?: string;
};

export type PublicItem = {
  name: string;
  typeLine: string;
  slot: string;
  icon: string | null;
};
