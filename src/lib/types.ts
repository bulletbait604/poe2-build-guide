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
  act: string;
  zone: string;
  quest: string;
  npc: string;
  reward: string;
  /** Concrete stat targets when this step tells you to change gear. */
  gear?: string;
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

export type LinkedGem = {
  name: string;
  supports: string[];
};

export type GemGroup = {
  label: string;
  detail: string;
  skills: LinkedGem[];
};

export type GearStage = {
  slot: string;
  early: string;
  late: string;
  maps: string;
};

export type LevelStep = {
  levels: string;
  text: string;
};

export type StepCheck = {
  text: string;
  act: string;
  zone: string;
  quest: string;
  /** True when this line is a gear target. The text must contain a number. */
  gear?: boolean;
};

export type TimelineStep = {
  level: number;
  title: string;
  checks: StepCheck[];
};

export type GearAffix = {
  name: string;
  kind: "Prefix" | "Suffix";
  rank: "Must" | "Nice" | "Ignore";
  leveling: string;
  earlyMaps: string;
  endgame: string;
};

export type GearCard = {
  slot: string;
  base: string;
  why: string;
  note: string;
  affixes: GearAffix[];
  how: string;
};

export type GearTotal = {
  label: string;
  leveling: string;
  earlyMaps: string;
  endgame: string;
};

export type Loadout = {
  overview: string;
  numbers: string[];
  ascendancy: string[];
  groups: GemGroup[];
  rotation: string[];
  leveling: LevelStep[];
  gear: GearStage[];
  sources: GuideLink[];
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
  support: string;
  damage: string;
  summary: string;
  fantasy: string;
  links: GuideLink[];
  treeUrl: string;
  treeKey: string;
  weaponNoun: string;
  defence: string;
  uniques: UniqueSuggestion[];
  levelBands: LevelBand[];
  phases: GuidePhase[];
  loadout: Loadout;
  timeline: TimelineStep[];
  gearCards: GearCard[];
  gearTotals: GearTotal[];
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
