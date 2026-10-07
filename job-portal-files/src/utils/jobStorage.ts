'use client';

import { JobNotification } from '../types/job';
import { INITIAL_JOBS } from '../data/mockJobs';

const STORAGE_KEY = 'jobalert_all_jobs';
const SUBSCRIBERS_KEY = 'jobalert_subscribers';
const BROADCASTS_KEY = 'jobalert_broadcasts';
const BROADCAST_CHANNEL_NAME = 'jobalert_sync_channel';

export interface AlertSubscriber {
  id: string;
  channel: 'TELEGRAM' | 'PUSH' | 'EMAIL';
  contact: string;
  sectors: string[];
  createdAt: string;
}

export interface BroadcastMessage {
  id: string;
  title: string;
  targetSector: string;
  channel: string;
  sentAt: string;
  recipientCount: number;
  status: 'DELIVERED' | 'FAILED';
}

// Default initial subscribers
const DEFAULT_SUBSCRIBERS: AlertSubscriber[] = [
  { id: 'sub-1', channel: 'TELEGRAM', contact: '@rahul_upsc26', sectors: ['Government'], createdAt: 'Today, 10:30 AM' },
  { id: 'sub-2', channel: 'PUSH', contact: 'Chrome (Windows 11)', sectors: ['Government', 'Private'], createdAt: 'Today, 11:15 AM' },
  { id: 'sub-3', channel: 'EMAIL', contact: 'priya.sharma@gmail.com', sectors: ['Private'], createdAt: 'Yesterday, 04:20 PM' },
  { id: 'sub-4', channel: 'TELEGRAM', contact: '+91 98765 43210', sectors: ['Government'], createdAt: 'Yesterday, 06:45 PM' },
];

// Default broadcast history
const DEFAULT_BROADCASTS: BroadcastMessage[] = [
  { id: 'bc-1', title: '🔥 SBI PO 2026: 2000 Posts Notification Live', targetSector: 'Government', channel: 'Telegram & Push', sentAt: '05 Oct 2026, 09:00 AM', recipientCount: 42500, status: 'DELIVERED' },
  { id: 'bc-2', title: '🚀 Google Early Career SWE 2026 Batch Open', targetSector: 'Private & Tech', channel: 'Telegram & Email', sentAt: '03 Oct 2026, 02:30 PM', recipientCount: 18200, status: 'DELIVERED' },
  { id: 'bc-3', title: '⚠️ SSC CGL 2026: Last date in 24 hours - Apply Now', targetSector: 'Government', channel: 'All Channels', sentAt: 'Today, 08:00 AM', recipientCount: 54100, status: 'DELIVERED' },
];

// Shared BroadcastChannel reference
let sharedChannel: BroadcastChannel | null = null;
const getSharedChannel = (): BroadcastChannel | null => {
  if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return null;
  if (!sharedChannel) {
    try {
      sharedChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    } catch {
      sharedChannel = null;
    }
  }
  return sharedChannel;
};

// Defensive sanitizer to make sure newly created / edited jobs never crash components
export const sanitizeJob = (job: JobNotification): JobNotification => {
  const cleanSlug = job.slug && !job.slug.startsWith('new-job-')
    ? job.slug
    : (job.title ? job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : `job-${Date.now()}`);

  const rawEdu = job.eligibility?.education;
  const eduList = Array.isArray(rawEdu)
    ? rawEdu.filter(Boolean)
    : typeof rawEdu === 'string' && (rawEdu as string).trim()
    ? [(rawEdu as string).trim()]
    : ["Bachelor's Degree in any discipline"];

  return {
    ...job,
    id: job.id || `job-${Date.now()}`,
    slug: cleanSlug || `job-${Date.now()}`,
    title: job.title || 'Job Notification',
    organization: {
      name: job.organization?.name || 'Organization',
      shortName: job.organization?.shortName || job.organization?.name?.substring(0, 4).toUpperCase() || 'ORG',
      logoText: job.organization?.logoText || job.organization?.shortName?.substring(0, 3).toUpperCase() || 'NEW',
      badgeColor: job.organization?.badgeColor || (job.sector === 'GOVERNMENT' ? 'bg-blue-600' : 'bg-emerald-600'),
      verified: job.organization?.verified ?? true,
    },
    sector: job.sector || 'GOVERNMENT',
    category: job.category || 'General',
    state: job.state || 'All India',
    qualificationLevel: job.qualificationLevel || 'GRADUATE',
    totalVacancies: Number(job.totalVacancies) > 0 ? Number(job.totalVacancies) : 10,
    location: job.location || 'All India',
    status: job.status || 'ACTIVE',
    importantDates: {
      notificationDate: job.importantDates?.notificationDate || 'Today',
      applyStartDate: job.importantDates?.applyStartDate || 'Today',
      applyEndDate: job.importantDates?.applyEndDate || 'Open',
      daysRemaining: Number(job.importantDates?.daysRemaining) >= 0 ? Number(job.importantDates?.daysRemaining) : 15,
      examDate: job.importantDates?.examDate || 'TBA',
    },
    eligibility: {
      education: eduList.length > 0 ? eduList : ["Bachelor's Degree in any discipline"],
      minAge: Number(job.eligibility?.minAge) || 21,
      maxAge: Number(job.eligibility?.maxAge) || 30,
      experience: job.eligibility?.experience || 'Fresher Eligible',
      ageRelaxation: job.eligibility?.ageRelaxation || 'As per rules',
      skills: job.eligibility?.skills || [],
    },
    compensation: {
      salaryOrPayScale: job.compensation?.salaryOrPayScale || 'Competitive / As per rules',
      applicationFeeGeneral: Number(job.compensation?.applicationFeeGeneral) || 0,
      applicationFeeReserved: Number(job.compensation?.applicationFeeReserved) || 0,
      feeNote: job.compensation?.feeNote || 'Pay online.',
    },
    selectionProcess: job.selectionProcess?.length ? job.selectionProcess : ['Written Examination / Interview'],
    summary: job.summary || 'Official notification details. Please verify all requirements before applying.',
    links: {
      applyUrl: job.links?.applyUrl || 'https://example.gov.in/apply',
      officialWebsiteUrl: job.links?.officialWebsiteUrl || 'https://example.gov.in',
      officialPdfUrl: job.links?.officialPdfUrl || '',
    },
    viewsCount: Number(job.viewsCount) || 1,
  };
};

export const getStoredJobs = (): JobNotification[] => {
  if (typeof window === 'undefined') return INITIAL_JOBS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
    return parsed.map(sanitizeJob);
  } catch {
    return INITIAL_JOBS;
  }
};

export const saveStoredJobs = (jobs: JobNotification[]): void => {
  if (typeof window === 'undefined') return;
  try {
    const sanitized = jobs.map(sanitizeJob);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));

    // 1. Dispatch custom event for current window/tab
    window.dispatchEvent(new CustomEvent('jobs_updated', { detail: sanitized }));

    // 2. Broadcast to other tabs/windows via BroadcastChannel
    const channel = getSharedChannel();
    if (channel) {
      channel.postMessage({ type: 'JOBS_UPDATED', timestamp: Date.now() });
    }
  } catch (err) {
    console.error('Failed to save jobs to localStorage', err);
  }
};

export const addStoredJob = (job: JobNotification): JobNotification[] => {
  const sanitized = sanitizeJob({
    ...job,
    isNewToday: true,
  });
  const current = getStoredJobs();
  // Remove duplicate ID if exists, then prepend newly created job
  const filtered = current.filter((j) => j.id !== sanitized.id);
  const updated = [sanitized, ...filtered];
  saveStoredJobs(updated);
  return updated;
};

export const updateStoredJob = (id: string, updatedFields: Partial<JobNotification>): JobNotification[] => {
  const current = getStoredJobs();
  const updated = current.map((j) => {
    if (j.id === id) {
      return sanitizeJob({ ...j, ...updatedFields });
    }
    return j;
  });
  saveStoredJobs(updated);
  return updated;
};

export const deleteStoredJob = (id: string): JobNotification[] => {
  const current = getStoredJobs();
  const updated = current.filter((j) => j.id !== id);
  saveStoredJobs(updated);
  return updated;
};

export const resetStoredJobsToDefault = (): JobNotification[] => {
  if (typeof window !== 'undefined') {
    saveStoredJobs(INITIAL_JOBS);
  }
  return INITIAL_JOBS;
};

// Auto-sync live job alerts from server scraper/aggregator
export const syncLiveJobsFromServer = async (): Promise<{ success: boolean; addedCount: number; totalJobs: number }> => {
  try {
    const res = await fetch('/api/sync', { method: 'POST' });
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      saveStoredJobs(json.data);
      return { success: true, addedCount: json.addedCount || 0, totalJobs: json.totalJobs || json.data.length };
    }
    return { success: false, addedCount: 0, totalJobs: getStoredJobs().length };
  } catch (err) {
    console.error('Failed to sync live jobs from server:', err);
    return { success: false, addedCount: 0, totalJobs: getStoredJobs().length };
  }
};

// Subscribe to real-time updates across the same window AND other browser tabs
export const subscribeToJobUpdates = (callback: (jobs: JobNotification[]) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  // 1. Same-window custom event
  const handleLocalSync = (e: Event) => {
    const custom = e as CustomEvent<JobNotification[]>;
    if (custom.detail && Array.isArray(custom.detail)) {
      callback(custom.detail.map(sanitizeJob));
    } else {
      callback(getStoredJobs());
    }
  };
  window.addEventListener('jobs_updated', handleLocalSync);

  // 2. Cross-tab storage event (triggers when another tab writes to localStorage)
  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(getStoredJobs());
    }
  };
  window.addEventListener('storage', handleStorageEvent);

  // 3. Cross-tab BroadcastChannel listener (instant cross-tab messaging)
  const channel = getSharedChannel();
  const handleBroadcast = (event: MessageEvent) => {
    if (event.data?.type === 'JOBS_UPDATED') {
      callback(getStoredJobs());
    }
  };
  if (channel) {
    channel.addEventListener('message', handleBroadcast);
  }

  // Return clean unsubscriber
  return () => {
    window.removeEventListener('jobs_updated', handleLocalSync);
    window.removeEventListener('storage', handleStorageEvent);
    if (channel) {
      channel.removeEventListener('message', handleBroadcast);
    }
  };
};

export const getSubscribers = (): AlertSubscriber[] => {
  if (typeof window === 'undefined') return DEFAULT_SUBSCRIBERS;
  try {
    const data = localStorage.getItem(SUBSCRIBERS_KEY);
    if (!data) {
      localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(DEFAULT_SUBSCRIBERS));
      return DEFAULT_SUBSCRIBERS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_SUBSCRIBERS;
  }
};

export const getBroadcastHistory = (): BroadcastMessage[] => {
  if (typeof window === 'undefined') return DEFAULT_BROADCASTS;
  try {
    const data = localStorage.getItem(BROADCASTS_KEY);
    if (!data) {
      localStorage.setItem(BROADCASTS_KEY, JSON.stringify(DEFAULT_BROADCASTS));
      return DEFAULT_BROADCASTS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_BROADCASTS;
  }
};

export const addBroadcastMessage = (broadcast: Omit<BroadcastMessage, 'id' | 'sentAt' | 'status'>): BroadcastMessage[] => {
  const current = getBroadcastHistory();
  const newBc: BroadcastMessage = {
    ...broadcast,
    id: `bc-${Date.now()}`,
    sentAt: 'Just now',
    status: 'DELIVERED',
  };
  const updated = [newBc, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(BROADCASTS_KEY, JSON.stringify(updated));
  }
  return updated;
};
