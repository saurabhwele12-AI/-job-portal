'use client';

import { AdmitCardItem, ResultItem, AnswerKeyItem, SyllabusItem } from '../types/portal';
import { 
  INITIAL_ADMIT_CARDS, 
  INITIAL_RESULTS, 
  INITIAL_ANSWER_KEYS, 
  INITIAL_SYLLABUS 
} from '../data/mockPortalData';

const ADMIT_CARDS_KEY = 'jobalert_admit_cards';
const RESULTS_KEY = 'jobalert_results';
const ANSWER_KEYS_KEY = 'jobalert_answer_keys';
const SYLLABUS_KEY = 'jobalert_syllabus';
const BROADCAST_CHANNEL_NAME = 'jobalert_sync_channel';

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

const notifyUpdate = (section: string) => {
  if (typeof window === 'undefined') return;
  // Local window event
  window.dispatchEvent(new CustomEvent('portal_updated', { detail: { section } }));
  // Cross-tab BroadcastChannel
  const ch = getSharedChannel();
  if (ch) {
    ch.postMessage({ type: 'PORTAL_UPDATED', section, timestamp: Date.now() });
  }
};

// ==========================================
// 1. ADMIT CARDS
// ==========================================
export const getStoredAdmitCards = (): AdmitCardItem[] => {
  if (typeof window === 'undefined') return INITIAL_ADMIT_CARDS;
  try {
    const data = localStorage.getItem(ADMIT_CARDS_KEY);
    if (!data) {
      localStorage.setItem(ADMIT_CARDS_KEY, JSON.stringify(INITIAL_ADMIT_CARDS));
      return INITIAL_ADMIT_CARDS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ADMIT_CARDS;
  } catch {
    return INITIAL_ADMIT_CARDS;
  }
};

export const saveStoredAdmitCards = (items: AdmitCardItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ADMIT_CARDS_KEY, JSON.stringify(items));
    notifyUpdate('ADMIT_CARD');
  } catch (err) {
    console.error('Failed to save admit cards', err);
  }
};

export const addStoredAdmitCard = (item: AdmitCardItem): AdmitCardItem[] => {
  const current = getStoredAdmitCards();
  const updated = [{ ...item, id: item.id || `ac-${Date.now()}` }, ...current.filter(i => i.id !== item.id)];
  saveStoredAdmitCards(updated);
  return updated;
};

export const updateStoredAdmitCard = (id: string, updatedFields: Partial<AdmitCardItem>): AdmitCardItem[] => {
  const current = getStoredAdmitCards();
  const updated = current.map(i => i.id === id ? { ...i, ...updatedFields } : i);
  saveStoredAdmitCards(updated);
  return updated;
};

export const deleteStoredAdmitCard = (id: string): AdmitCardItem[] => {
  const current = getStoredAdmitCards();
  const updated = current.filter(i => i.id !== id);
  saveStoredAdmitCards(updated);
  return updated;
};

// ==========================================
// 2. RESULTS
// ==========================================
export const getStoredResults = (): ResultItem[] => {
  if (typeof window === 'undefined') return INITIAL_RESULTS;
  try {
    const data = localStorage.getItem(RESULTS_KEY);
    if (!data) {
      localStorage.setItem(RESULTS_KEY, JSON.stringify(INITIAL_RESULTS));
      return INITIAL_RESULTS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_RESULTS;
  } catch {
    return INITIAL_RESULTS;
  }
};

export const saveStoredResults = (items: ResultItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(items));
    notifyUpdate('RESULT');
  } catch (err) {
    console.error('Failed to save results', err);
  }
};

export const addStoredResult = (item: ResultItem): ResultItem[] => {
  const current = getStoredResults();
  const updated = [{ ...item, id: item.id || `res-${Date.now()}` }, ...current.filter(i => i.id !== item.id)];
  saveStoredResults(updated);
  return updated;
};

export const updateStoredResult = (id: string, updatedFields: Partial<ResultItem>): ResultItem[] => {
  const current = getStoredResults();
  const updated = current.map(i => i.id === id ? { ...i, ...updatedFields } : i);
  saveStoredResults(updated);
  return updated;
};

export const deleteStoredResult = (id: string): ResultItem[] => {
  const current = getStoredResults();
  const updated = current.filter(i => i.id !== id);
  saveStoredResults(updated);
  return updated;
};

// ==========================================
// 3. ANSWER KEYS
// ==========================================
export const getStoredAnswerKeys = (): AnswerKeyItem[] => {
  if (typeof window === 'undefined') return INITIAL_ANSWER_KEYS;
  try {
    const data = localStorage.getItem(ANSWER_KEYS_KEY);
    if (!data) {
      localStorage.setItem(ANSWER_KEYS_KEY, JSON.stringify(INITIAL_ANSWER_KEYS));
      return INITIAL_ANSWER_KEYS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ANSWER_KEYS;
  } catch {
    return INITIAL_ANSWER_KEYS;
  }
};

export const saveStoredAnswerKeys = (items: AnswerKeyItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ANSWER_KEYS_KEY, JSON.stringify(items));
    notifyUpdate('ANSWER_KEY');
  } catch (err) {
    console.error('Failed to save answer keys', err);
  }
};

export const addStoredAnswerKey = (item: AnswerKeyItem): AnswerKeyItem[] => {
  const current = getStoredAnswerKeys();
  const updated = [{ ...item, id: item.id || `ak-${Date.now()}` }, ...current.filter(i => i.id !== item.id)];
  saveStoredAnswerKeys(updated);
  return updated;
};

export const updateStoredAnswerKey = (id: string, updatedFields: Partial<AnswerKeyItem>): AnswerKeyItem[] => {
  const current = getStoredAnswerKeys();
  const updated = current.map(i => i.id === id ? { ...i, ...updatedFields } : i);
  saveStoredAnswerKeys(updated);
  return updated;
};

export const deleteStoredAnswerKey = (id: string): AnswerKeyItem[] => {
  const current = getStoredAnswerKeys();
  const updated = current.filter(i => i.id !== id);
  saveStoredAnswerKeys(updated);
  return updated;
};

// ==========================================
// 4. SYLLABUS
// ==========================================
export const getStoredSyllabus = (): SyllabusItem[] => {
  if (typeof window === 'undefined') return INITIAL_SYLLABUS;
  try {
    const data = localStorage.getItem(SYLLABUS_KEY);
    if (!data) {
      localStorage.setItem(SYLLABUS_KEY, JSON.stringify(INITIAL_SYLLABUS));
      return INITIAL_SYLLABUS;
    }
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_SYLLABUS;
  } catch {
    return INITIAL_SYLLABUS;
  }
};

export const saveStoredSyllabus = (items: SyllabusItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SYLLABUS_KEY, JSON.stringify(items));
    notifyUpdate('SYLLABUS');
  } catch (err) {
    console.error('Failed to save syllabus', err);
  }
};

export const addStoredSyllabus = (item: SyllabusItem): SyllabusItem[] => {
  const current = getStoredSyllabus();
  const updated = [{ ...item, id: item.id || `syl-${Date.now()}` }, ...current.filter(i => i.id !== item.id)];
  saveStoredSyllabus(updated);
  return updated;
};

export const updateStoredSyllabus = (id: string, updatedFields: Partial<SyllabusItem>): SyllabusItem[] => {
  const current = getStoredSyllabus();
  const updated = current.map(i => i.id === id ? { ...i, ...updatedFields } : i);
  saveStoredSyllabus(updated);
  return updated;
};

export const deleteStoredSyllabus = (id: string): SyllabusItem[] => {
  const current = getStoredSyllabus();
  const updated = current.filter(i => i.id !== id);
  saveStoredSyllabus(updated);
  return updated;
};

// Reset all portal data to factory initial defaults
export const resetAllPortalDataToDefault = () => {
  if (typeof window !== 'undefined') {
    saveStoredAdmitCards(INITIAL_ADMIT_CARDS);
    saveStoredResults(INITIAL_RESULTS);
    saveStoredAnswerKeys(INITIAL_ANSWER_KEYS);
    saveStoredSyllabus(INITIAL_SYLLABUS);
  }
};

// Cross-tab and in-tab listener for any portal sections
export const subscribeToAllPortalUpdates = (callback: (section?: string) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const handleLocal = (e: Event) => {
    const custom = e as CustomEvent<{ section: string }>;
    callback(custom.detail?.section);
  };
  window.addEventListener('portal_updated', handleLocal);

  const handleStorage = (e: StorageEvent) => {
    if (
      e.key === ADMIT_CARDS_KEY ||
      e.key === RESULTS_KEY ||
      e.key === ANSWER_KEYS_KEY ||
      e.key === SYLLABUS_KEY
    ) {
      callback();
    }
  };
  window.addEventListener('storage', handleStorage);

  const ch = getSharedChannel();
  const handleBroadcast = (event: MessageEvent) => {
    if (event.data?.type === 'PORTAL_UPDATED') {
      callback(event.data?.section);
    }
  };
  if (ch) {
    ch.addEventListener('message', handleBroadcast);
  }

  return () => {
    window.removeEventListener('portal_updated', handleLocal);
    window.removeEventListener('storage', handleStorage);
    if (ch) {
      ch.removeEventListener('message', handleBroadcast);
    }
  };
};
