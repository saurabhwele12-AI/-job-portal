import { JobSector } from './job';

export type PortalSection = 'JOBS' | 'ADMIT_CARD' | 'RESULT' | 'ANSWER_KEY' | 'SYLLABUS';

export type AdmitCardStatus = 'RELEASED' | 'EXPECTED_SOON' | 'OUT_TODAY' | 'POSTPONED';
export type ResultStatus = 'DECLARED' | 'MERIT_LIST_OUT' | 'FINAL_RESULT' | 'SCORECARD_LIVE';
export type AnswerKeyStatus = 'RELEASED' | 'OBJECTION_WINDOW_ACTIVE' | 'FINAL_KEY_OUT' | 'TENTATIVE' | 'FINAL';

export interface AdmitCardItem {
  id: string;
  slug: string;
  title: string;
  organization: {
    name: string;
    shortName: string;
    logoText: string;
    badgeColor: string;
  };
  sector: JobSector;
  category: string;
  examName: string;
  examDate: string;
  releaseDate: string;
  status: AdmitCardStatus;
  admitCardUrl: string;
  officialWebsiteUrl: string;
  instructions: string;
  viewsCount: number;
}

export interface ResultItem {
  id: string;
  slug: string;
  title: string;
  organization: {
    name: string;
    shortName: string;
    logoText: string;
    badgeColor: string;
  };
  sector: JobSector;
  category?: string;
  examName: string;
  declarationDate: string;
  resultDate?: string;
  status: ResultStatus;
  resultUrl: string;
  cutoffUrl?: string;
  officialWebsiteUrl: string;
  cutOffMarksSummary?: string;
  cutoffPreview?: {
    UR?: string;
    OBC?: string;
    SC?: string;
    ST?: string;
    EWS?: string;
  };
  qualifiedCount?: number;
  summary?: string;
  viewsCount: number;
}

export interface AnswerKeyItem {
  id: string;
  slug: string;
  title: string;
  organization: {
    name: string;
    shortName: string;
    logoText: string;
    badgeColor: string;
  };
  sector: JobSector;
  category?: string;
  examName: string;
  examDate?: string;
  releaseDate: string;
  status: AnswerKeyStatus;
  objectionStartDate?: string;
  objectionEndDate?: string;
  objectionFeeNote?: string;
  challengeFee?: string;
  instructions?: string;
  answerKeyUrl: string;
  objectionUrl?: string;
  officialWebsiteUrl: string;
  summary?: string;
  viewsCount: number;
}

export interface SyllabusSection {
  name: string;
  marks?: number;
  questionsCount?: number;
}

export interface SyllabusItem {
  id: string;
  slug: string;
  title: string;
  organization: {
    name: string;
    shortName: string;
    logoText: string;
    badgeColor: string;
  };
  sector: JobSector;
  category?: string;
  examName: string;
  updatedYear?: string;
  totalMarks?: number;
  durationMinutes?: number;
  sections?: SyllabusSection[];
  markingScheme?: string;
  examPattern: {
    totalMarks: number;
    duration: string;
    stages: string[];
    negativeMarking: string;
  };
  topicsSummary: string[];
  pdfUrl?: string;
  officialWebsiteUrl: string;
  summary?: string;
  viewsCount: number;
}
