export type JobSector = 'GOVERNMENT' | 'PRIVATE';
export type JobStatus = 'ACTIVE' | 'CLOSING_SOON' | 'UPCOMING' | 'EXPIRED';
export type WorkMode = 'REMOTE' | 'HYBRID' | 'ON_SITE';

export interface VacancyItem {
  postName: string;
  totalPosts: number;
  payScale: string;
  categoryBreakup?: {
    UR?: number;
    OBC?: number;
    SC?: number;
    ST?: number;
    EWS?: number;
  };
}

export interface JobNotification {
  id: string;
  slug: string;
  title: string;
  organization: {
    name: string;
    shortName: string;
    logoText: string;
    badgeColor: string;
    verified: boolean;
  };
  sector: JobSector;
  category: string; // e.g., 'Banking', 'Software & IT', 'Railways', 'Defense'
  state?: string; // e.g., 'All India', 'UP', 'Bihar', 'Rajasthan', 'Delhi', 'Maharashtra', etc.
  qualificationLevel?: string; // e.g., '10TH', '12TH', 'GRADUATE', 'BTECH', 'DIPLOMA', 'ITI', 'PG', '8TH'
  totalVacancies: number;
  location: string;
  
  // Important Dates
  importantDates: {
    notificationDate: string;
    applyStartDate: string;
    applyEndDate: string; // ISO format or display format
    daysRemaining: number;
    examDate?: string;
    admitCardDate?: string;
  };

  // Eligibility
  eligibility: {
    education: string[]; // e.g., ["Bachelor's Degree in any discipline"]
    minAge?: number;
    maxAge?: number;
    ageCutoffDate?: string;
    ageRelaxation?: string;
    experience?: string; // "Freshers Eligible" or "2+ Years"
    skills?: string[]; // For tech jobs: ["React", "TypeScript", "Node.js"]
  };

  // Financial / Salary
  compensation: {
    salaryOrPayScale: string; // "₹45,000 - ₹85,000 / month" or "14 - 22 LPA"
    applicationFeeGeneral?: number;
    applicationFeeReserved?: number;
    feeNote?: string;
  };

  // Private Job specific
  workMode?: WorkMode;

  // Selection process
  selectionProcess: string[]; // ["Preliminary Exam", "Main Exam", "Personal Interview"]

  // Detailed Description
  summary: string;
  responsibilitiesOrSyllabus?: string[];

  // Links
  links: {
    applyUrl: string;
    officialPdfUrl?: string;
    officialWebsiteUrl: string;
    syllabusUrl?: string;
  };

  status: JobStatus;
  isTrending?: boolean;
  isNewToday?: boolean;
  viewsCount: number;
}
