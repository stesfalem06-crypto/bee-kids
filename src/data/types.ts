export interface ExamQuestion {
  id: string;
  num: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  subject: string;
  year: number;
  grade: number;
  topic?: string;
}

export interface NationalExam {
  id: string;
  title: string;
  subject: string;
  year: number;
  version: string;
  durationMinutes: number;
  totalQuestions: number;
  instructions: string[];
  questions: ExamQuestion[];
}

export interface ExerciseItem {
  id: string;
  num: number;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  hint?: string;
}

export interface WorkedExample {
  title: string;
  problem: string;
  solutionSteps: string[];
  finalAnswer: string;
}

export interface CurriculumSection {
  title: string;
  content: string;
  keyTerms?: string[];
}

export interface UnitNotes {
  id: string;
  grade: 6 | 7 | 8;
  subject: string;
  subjectKey: 'math' | 'science' | 'english' | 'social_studies' | 'citizenship' | 'ict' | 'life_skills';
  unitNumber: number;
  title: string;
  summary: string;
  keyTerms: string[];
  keyIdeas: string[];
  sections: CurriculumSection[];
  examples: WorkedExample[];
  exercises: ExerciseItem[];
  illustratedBadge?: string;
}

export interface SubjectInfo {
  key: 'math' | 'science' | 'english' | 'social_studies' | 'citizenship' | 'ict' | 'life_skills';
  name: string;
  tigrinyaName: string;
  icon: string;
  color: string;
  accentBg: string;
  description: string;
}

// Bee Kids (Singapore Math in Tigrinya) Types
export type StrandType = 'number' | 'operations' | 'bonds' | 'barmodel' | 'geometry' | 'fractions';

export interface ManipulativeItem {
  id: string;
  type: 'apple' | 'star' | 'sheep' | 'block' | 'counter';
  label?: string;
  count: number;
  color: string;
}

export interface NumberBondData {
  whole: number;
  part1: number | null; // null if child must fill this
  part2: number | null; // null if child must fill this
  missing: 'whole' | 'part1' | 'part2';
}

export interface BarModelData {
  total: number | null;
  bars: { label: string; value: number; color: string }[];
  missingLabel: string;
}

export interface SingaporeMathLesson {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  strand: StrandType;
  titleTigrinya: string;
  titleEnglish: string;
  pedagogyStage: 'concrete' | 'pictorial' | 'abstract';
  storyTigrinya: string;
  promptTigrinya: string;
  audioVoicePrompt: string;
  manipulative?: ManipulativeItem;
  numberBond?: NumberBondData;
  barModel?: BarModelData;
  choices: (number | string)[];
  correctAnswer: number | string;
  explanationTigrinya: string;
  rewardStars: number;
}

export interface KidsLevelMap {
  level: number;
  titleTigrinya: string;
  ageRange: string;
  descriptionTigrinya: string;
  lessons: SingaporeMathLesson[];
  isLocked?: boolean;
}

export interface VideoPackItem {
  id: string;
  titleTigrinya: string;
  duration: string;
  isVertical: boolean;
  category: 'math_reel' | 'song' | 'story';
  thumbnailUrl: string;
  previewUrl: string;
  encryptedSize: string;
}
