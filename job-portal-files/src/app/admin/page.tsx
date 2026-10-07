'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Laptop, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Search, 
  Send, 
  Users, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Eye, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink,
  Save,
  X,
  Bell,
  Sparkles,
  TrendingUp,
  RefreshCw,
  Ticket,
  Trophy,
  KeyRound,
  BookOpen,
  Database,
  Radio
} from 'lucide-react';

import { JobNotification, JobSector, JobStatus, WorkMode } from '../../types/job';
import { 
  getStoredJobs, 
  saveStoredJobs, 
  addStoredJob, 
  updateStoredJob, 
  deleteStoredJob,
  resetStoredJobsToDefault,
  subscribeToJobUpdates,
  getSubscribers,
  getBroadcastHistory,
  addBroadcastMessage,
  AlertSubscriber,
  BroadcastMessage,
  syncLiveJobsFromServer
} from '../../utils/jobStorage';

import { 
  AdmitCardItem, 
  ResultItem, 
  AnswerKeyItem, 
  SyllabusItem 
} from '../../types/portal';
import {
  getStoredAdmitCards,
  addStoredAdmitCard,
  updateStoredAdmitCard,
  deleteStoredAdmitCard,
  getStoredResults,
  addStoredResult,
  updateStoredResult,
  deleteStoredResult,
  getStoredAnswerKeys,
  addStoredAnswerKey,
  updateStoredAnswerKey,
  deleteStoredAnswerKey,
  getStoredSyllabus,
  addStoredSyllabus,
  updateStoredSyllabus,
  deleteStoredSyllabus,
  subscribeToAllPortalUpdates,
  resetAllPortalDataToDefault,
} from '../../utils/portalStorage';

import { AdminAdmitCardsManager } from '../../components/admin/AdminAdmitCardsManager';
import { AdminResultsManager } from '../../components/admin/AdminResultsManager';
import { AdminAnswerKeysManager } from '../../components/admin/AdminAnswerKeysManager';
import { AdminSyllabusManager } from '../../components/admin/AdminSyllabusManager';
import { AdminStateFeedsManager } from '../../components/admin/AdminStateFeedsManager';
import { INDIAN_STATES } from '../../components/FreeJobAlertStateNav';

type AdminTab = 'ARTICLES' | 'EDITOR' | 'STATE_FEEDS' | 'ADMIT_CARDS' | 'RESULTS' | 'ANSWER_KEYS' | 'SYLLABUS' | 'BROADCAST' | 'SUBSCRIBERS' | 'SEO';

export type JobAdminCategory = 'ALL' | 'CENTRAL_GOVT' | 'STATE_GOVT' | 'PRIVATE';

export function getJobClassification(job: JobNotification): 'CENTRAL_GOVT' | 'STATE_GOVT' | 'PRIVATE' {
  if (job.sector === 'PRIVATE') return 'PRIVATE';
  const rawState = (job.state || '').trim().toUpperCase();
  if (rawState && rawState !== 'ALL_INDIA' && rawState !== 'ALL INDIA' && rawState !== 'INDIA' && rawState !== 'CENTRAL') {
    return 'STATE_GOVT';
  }
  const cat = (job.category || '').toLowerCase();
  const loc = (job.location || '').toLowerCase();
  const org = (job.organization?.name || '').toLowerCase();
  if (
    cat.includes('state psc') ||
    cat.includes('state govt') ||
    (org.includes('public service commission') && !org.includes('union')) ||
    org.includes('subordinate services') ||
    (org.includes('police recruitment') && !org.includes('central'))
  ) {
    return 'STATE_GOVT';
  }
  return 'CENTRAL_GOVT';
}

export function getJobStateLabel(job: JobNotification): string | null {
  if (getJobClassification(job) !== 'STATE_GOVT') return null;
  const raw = (job.state || '').trim();
  if (!raw || raw.toUpperCase() === 'ALL_INDIA' || raw.toLowerCase() === 'all india') {
    const matchedState = INDIAN_STATES.find(s => 
      s.code !== 'ALL_INDIA' && (
        job.location?.toLowerCase().includes(s.name.toLowerCase()) || 
        job.organization?.name?.toLowerCase().includes(s.name.toLowerCase()) ||
        job.title.toLowerCase().includes(s.name.toLowerCase())
      )
    );
    return matchedState ? matchedState.name : null;
  }
  const match = INDIAN_STATES.find(s => s.code.toUpperCase() === raw.toUpperCase() || s.name.toLowerCase() === raw.toLowerCase());
  return match ? match.name : raw;
}

export const DEFAULT_ADMIN_PASSKEY = 'admin2026';

export function getStoredAdminPassword(): string {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_PASSKEY;
  try {
    return localStorage.getItem('jobalert_admin_password_custom') || DEFAULT_ADMIN_PASSKEY;
  } catch {
    return DEFAULT_ADMIN_PASSKEY;
  }
}

export function saveStoredAdminPassword(newPass: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('jobalert_admin_password_custom', newPass);
  } catch {}
}

export function resetStoredAdminPassword(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('jobalert_admin_password_custom');
  } catch {}
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('ARTICLES');
  const [jobs, setJobs] = useState<JobNotification[]>([]);
  const [admitCards, setAdmitCards] = useState<AdmitCardItem[]>([]);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [answerKeys, setAnswerKeys] = useState<AnswerKeyItem[]>([]);
  const [syllabus, setSyllabus] = useState<SyllabusItem[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<JobAdminCategory>('ALL');
  const [selectedAdminState, setSelectedAdminState] = useState<string>('');
  const [editingJob, setEditingJob] = useState<JobNotification | null>(null);
  const [subscribers, setSubscribers] = useState<AlertSubscriber[]>([]);
  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>([]);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Auto-sync and Database connection states
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Live Connected');
  const [showDbInfoModal, setShowDbInfoModal] = useState<boolean>(false);

  // Security Passkey Gate state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Change Password state
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [currentPassInput, setCurrentPassInput] = useState<string>('');
  const [newPassInput, setNewPassInput] = useState<string>('');
  const [confirmPassInput, setConfirmPassInput] = useState<string>('');
  const [showPasswordChars, setShowPasswordChars] = useState<boolean>(false);
  const [passwordModalError, setPasswordModalError] = useState<string | null>(null);

  // Broadcast form state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastSector, setBroadcastSector] = useState('All Seekers');
  const [broadcastChannel, setBroadcastChannel] = useState('Telegram & Push');

  // Load initial data and verify session auth
  useEffect(() => {
    setJobs(getStoredJobs());
    setSubscribers(getSubscribers());
    setBroadcasts(getBroadcastHistory());
    setAdmitCards(getStoredAdmitCards());
    setResults(getStoredResults());
    setAnswerKeys(getStoredAnswerKeys());
    setSyllabus(getStoredSyllabus());

    const unsubJobs = subscribeToJobUpdates((updated) => {
      setJobs(updated);
    });

    const unsubPortal = subscribeToAllPortalUpdates(() => {
      setAdmitCards(getStoredAdmitCards());
      setResults(getStoredResults());
      setAnswerKeys(getStoredAnswerKeys());
      setSyllabus(getStoredSyllabus());
    });

    try {
      const savedAuth = sessionStorage.getItem('jobalert_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch {}

    return () => {
      unsubJobs();
      unsubPortal();
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const activePass = getStoredAdminPassword();
    const input = passkeyInput.trim();
    if (input === activePass || (activePass === DEFAULT_ADMIN_PASSKEY && input === 'admin')) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('jobalert_admin_auth', 'true');
      } catch {}
      setAuthError(null);
      showToast('Admin Access Granted!');
    } else {
      setAuthError('Invalid administrator passkey. Access denied.');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordModalError(null);

    const activePass = getStoredAdminPassword();
    if (currentPassInput.trim() !== activePass && !(activePass === DEFAULT_ADMIN_PASSKEY && currentPassInput.trim() === 'admin')) {
      setPasswordModalError('Current password does not match.');
      return;
    }

    if (newPassInput.trim().length < 4) {
      setPasswordModalError('New password must be at least 4 characters long.');
      return;
    }

    if (newPassInput.trim() !== confirmPassInput.trim()) {
      setPasswordModalError('New password and confirmation do not match.');
      return;
    }

    saveStoredAdminPassword(newPassInput.trim());
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setShowPasswordModal(false);
    showToast('Admin security password updated successfully!');
  };

  const handleResetPasswordToDefault = () => {
    if (confirm('Reset administrator password back to the default "admin2026"?')) {
      resetStoredAdminPassword();
      setCurrentPassInput('');
      setNewPassInput('');
      setConfirmPassInput('');
      setPasswordModalError(null);
      setShowPasswordModal(false);
      showToast('Admin password restored to default: admin2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('jobalert_admin_auth');
    } catch {}
    setPasskeyInput('');
    showToast('Admin console locked.');
  };

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  // Automated Feed Ingestion & Live DB Sync Handler
  const handleTriggerAutoSync = async () => {
    setIsSyncing(true);
    showToast('⚡ Connecting to public feeds & server database...');
    try {
      const res = await syncLiveJobsFromServer();
      if (res.success) {
        const fresh = getStoredJobs();
        setJobs(fresh);
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSyncTime(timeNow);
        showToast(`⚡ Sync complete! Database updated (${res.addedCount} new notifications added).`);
      } else {
        showToast('Sync finished. Database already contains the newest alerts.');
      }
    } catch (err) {
      console.error(err);
      showToast('⚠️ Auto-sync encountered a network issue. Retrying...');
    } finally {
      setIsSyncing(false);
    }
  };

  // Switch to editor with an existing job
  const handleStartEdit = (job: JobNotification) => {
    setEditingJob({ ...job });
    setActiveTab('EDITOR');
  };

  // Switch to editor with a blank new template
  const handleStartCreate = () => {
    const timestamp = Date.now();
    const newTemplate: JobNotification = {
      id: `job-${timestamp}`,
      slug: `new-job-${timestamp}`,
      title: '',
      organization: {
        name: '',
        shortName: '',
        logoText: 'NEW',
        badgeColor: 'bg-blue-600',
        verified: true,
      },
      sector: 'GOVERNMENT',
      category: 'Banking',
      state: 'ALL_INDIA',
      totalVacancies: 100,
      location: 'All India',
      importantDates: {
        notificationDate: 'Today',
        applyStartDate: 'Today',
        applyEndDate: '30 Nov 2026',
        daysRemaining: 15,
        examDate: 'December 2026',
      },
      eligibility: {
        education: ["Bachelor's Degree in any discipline"],
        minAge: 21,
        maxAge: 30,
        ageRelaxation: 'OBC: 3 Years | SC/ST: 5 Years',
        experience: 'Fresher Eligible',
      },
      compensation: {
        salaryOrPayScale: '₹45,000 - ₹75,000/mo',
        applicationFeeGeneral: 500,
        applicationFeeReserved: 0,
        feeNote: 'Pay online via Net Banking or UPI.',
      },
      selectionProcess: ['Preliminary Exam', 'Main Exam', 'Interview'],
      summary: 'Official notification announcement. Please verify all terms before applying online.',
      links: {
        applyUrl: 'https://example.gov.in/apply',
        officialWebsiteUrl: 'https://example.gov.in',
      },
      status: 'ACTIVE',
      isNewToday: true,
      viewsCount: 1,
    };
    setEditingJob(newTemplate);
    setActiveTab('EDITOR');
  };

  // Save changes from Editor
  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    if (!editingJob.title.trim() || !editingJob.organization?.name?.trim()) {
      alert('Please fill in both the Job Title and Organization Name.');
      return;
    }

    const cleanSlug = editingJob.slug && !editingJob.slug.startsWith('new-job-')
      ? editingJob.slug
      : editingJob.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `job-${Date.now()}`;

    const jobToSave: JobNotification = {
      ...editingJob,
      slug: cleanSlug,
    };

    const existingIndex = jobs.findIndex((j) => j.id === jobToSave.id);
    let updatedList: JobNotification[];

    if (existingIndex >= 0) {
      updatedList = updateStoredJob(jobToSave.id, jobToSave);
      showToast(`Updated article: "${jobToSave.title.substring(0, 30)}..."`);
    } else {
      updatedList = addStoredJob(jobToSave);
      showToast(`Published new article: "${jobToSave.title.substring(0, 30)}..."`);
    }

    setJobs(updatedList);
    setEditingJob(null);
    setActiveTab('ARTICLES');
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to restore the default sample jobs, admit cards, results, answer keys, and syllabus? Any customized additions will be reset.')) {
      const resetJobs = resetStoredJobsToDefault();
      resetAllPortalDataToDefault();
      setJobs(resetJobs);
      setAdmitCards(getStoredAdmitCards());
      setResults(getStoredResults());
      setAnswerKeys(getStoredAnswerKeys());
      setSyllabus(getStoredSyllabus());
      showToast('Restored all default portal listings & sample data!');
    }
  };

  // Admit Card Handlers
  const handleSaveAdmitCard = (item: AdmitCardItem) => {
    const exists = admitCards.some((i) => i.id === item.id);
    const updated = exists ? updateStoredAdmitCard(item.id, item) : addStoredAdmitCard(item);
    setAdmitCards(updated);
  };
  const handleDeleteAdmitCard = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete admit card "${title}"?`)) {
      const updated = deleteStoredAdmitCard(id);
      setAdmitCards(updated);
      showToast('Deleted admit card.');
    }
  };

  // Result Handlers
  const handleSaveResult = (item: ResultItem) => {
    const exists = results.some((i) => i.id === item.id);
    const updated = exists ? updateStoredResult(item.id, item) : addStoredResult(item);
    setResults(updated);
  };
  const handleDeleteResult = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete result "${title}"?`)) {
      const updated = deleteStoredResult(id);
      setResults(updated);
      showToast('Deleted result.');
    }
  };

  // Answer Key Handlers
  const handleSaveAnswerKey = (item: AnswerKeyItem) => {
    const exists = answerKeys.some((i) => i.id === item.id);
    const updated = exists ? updateStoredAnswerKey(item.id, item) : addStoredAnswerKey(item);
    setAnswerKeys(updated);
  };
  const handleDeleteAnswerKey = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete answer key "${title}"?`)) {
      const updated = deleteStoredAnswerKey(id);
      setAnswerKeys(updated);
      showToast('Deleted answer key.');
    }
  };

  // Syllabus Handlers
  const handleSaveSyllabus = (item: SyllabusItem) => {
    const exists = syllabus.some((i) => i.id === item.id);
    const updated = exists ? updateStoredSyllabus(item.id, item) : addStoredSyllabus(item);
    setSyllabus(updated);
  };
  const handleDeleteSyllabus = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete syllabus "${title}"?`)) {
      const updated = deleteStoredSyllabus(id);
      setSyllabus(updated);
      showToast('Deleted syllabus scheme.');
    }
  };

  // Delete Job
  const handleDeleteJob = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = deleteStoredJob(id);
      setJobs(updated);
      showToast(`Article deleted successfully.`);
    }
  };

  // Toggle Job Status quickly
  const handleStatusToggle = (job: JobNotification) => {
    const nextStatus: Record<JobStatus, JobStatus> = {
      ACTIVE: 'CLOSING_SOON',
      CLOSING_SOON: 'EXPIRED',
      EXPIRED: 'ACTIVE',
      UPCOMING: 'ACTIVE',
    };
    const newStatus = nextStatus[job.status] || 'ACTIVE';
    const updated = updateStoredJob(job.id, { status: newStatus });
    setJobs(updated);
    showToast(`Updated status of "${job.organization.shortName}" to ${newStatus}`);
  };

  // Send Broadcast Alert
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim()) return;

    const count = broadcastSector === 'All Seekers' ? 58200 : broadcastSector === 'Government' ? 42100 : 16100;
    const updated = addBroadcastMessage({
      title: broadcastTitle,
      targetSector: broadcastSector,
      channel: broadcastChannel,
      recipientCount: count,
    });
    setBroadcasts(updated);
    setBroadcastTitle('');
    showToast(`Broadcast alert successfully dispatched to ${count.toLocaleString()} subscribers!`);
  };

  // Filtered jobs for admin table
  const filteredJobs = jobs.filter((j) => {
    const classification = getJobClassification(j);
    if (categoryFilter !== 'ALL' && classification !== categoryFilter) {
      return false;
    }
    if (categoryFilter === 'STATE_GOVT' && selectedAdminState) {
      const rawSt = (j.state || '').toUpperCase();
      const stateObj = INDIAN_STATES.find((s) => s.code.toUpperCase() === selectedAdminState.toUpperCase());
      const stateName = stateObj ? stateObj.name.toLowerCase() : '';
      const matchesCode = rawSt === selectedAdminState.toUpperCase();
      const matchesName = stateName ? (j.state || '').toLowerCase() === stateName : false;
      const matchesLoc = stateName ? (j.location || '').toLowerCase().includes(stateName) : false;
      const matchesTitle = stateName ? (j.title || '').toLowerCase().includes(stateName) : false;
      const matchesOrg = stateName ? (j.organization?.name || '').toLowerCase().includes(stateName) : false;
      if (!matchesCode && !matchesName && !matchesLoc && !matchesTitle && !matchesOrg) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        j.title.toLowerCase().includes(q) ||
        j.organization.name.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q) ||
        (j.state && j.state.toLowerCase().includes(q)) ||
        (j.location && j.location.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // If not logged in, render the secure Passkey Gate:
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 selection:bg-blue-600 selection:text-white">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-md">
              🔒
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Editorial Staff Authentication
            </h1>
            <p className="text-xs text-slate-500">
              This area is restricted to portal administrators. Enter your security master passkey to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Admin Security Passkey:
              </label>
              <input
                type="password"
                required
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter admin passkey..."
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:border-blue-600 focus:bg-white focus:outline-none font-mono"
              />
              {authError && (
                <p className="text-xs text-red-600 font-semibold mt-1.5">
                  ⚠️ {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-colors"
            >
              Verify Passkey &amp; Open Console
            </button>
          </form>

          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 text-left text-xs text-slate-700 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-900 flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                <span>Security Master Passkey</span>
              </span>
              {typeof window !== 'undefined' && getStoredAdminPassword() !== DEFAULT_ADMIN_PASSKEY ? (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset custom admin passkey back to default "admin2026"?')) {
                      resetStoredAdminPassword();
                      setPasskeyInput('');
                      setAuthError(null);
                      alert('Passkey reset to default: admin2026');
                    }
                  }}
                  className="text-[11px] font-bold text-amber-700 hover:text-amber-900 hover:underline cursor-pointer"
                >
                  Reset to Default
                </button>
              ) : null}
            </div>
            <p className="text-[11px] text-slate-600">
              Default password: <code className="text-blue-700 font-mono font-bold bg-blue-100 px-1 py-0.5 rounded">admin2026</code>. You can change it anytime inside the console.
            </p>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-800 hover:underline"
            >
              ← Return to Public Job Board
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Toast popup */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in slide-in-from-bottom">
          <Sparkles className="w-4 h-4" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo and title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold shadow-sm">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-slate-900">JobAlert<span className="text-blue-600">Hub</span></span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                    Admin CMS Desk
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Article Editor, Broadcast Dispatcher &amp; Subscriber Services</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleTriggerAutoSync}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all disabled:opacity-60 cursor-pointer"
                title="Fetch live recruitment notifications from external feeds & APIs automatically"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : '⚡ Auto-Sync Feeds'}</span>
              </button>

              <button
                onClick={handleStartCreate}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish New Job Alert</span>
              </button>

              <button
                onClick={handleResetDefaults}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors"
                title="Restore initial default job listings"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Public Site ↗</span>
              </Link>

              <button
                onClick={() => {
                  setPasswordModalError(null);
                  setCurrentPassInput('');
                  setNewPassInput('');
                  setConfirmPassInput('');
                  setShowPasswordModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 transition-colors cursor-pointer"
                title="Change administrator access passkey"
              >
                <KeyRound className="w-3.5 h-3.5 text-purple-600" />
                <span>Change Password</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors"
                title="Lock admin console and log out"
              >
                <span>🔒 Lock &amp; Logout</span>
              </button>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex border-t border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('ARTICLES')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'ARTICLES'
                ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Jobs ({jobs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('STATE_FEEDS')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'STATE_FEEDS'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>State Feeds Auto-Pilot</span>
          </button>

          <button
            onClick={() => setActiveTab('ADMIT_CARDS')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'ADMIT_CARDS'
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Admit Cards ({admitCards.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('RESULTS')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'RESULTS'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Results ({results.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ANSWER_KEYS')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'ANSWER_KEYS'
                ? 'border-amber-600 text-amber-700 bg-amber-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Answer Keys ({answerKeys.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('SYLLABUS')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'SYLLABUS'
                ? 'border-purple-600 text-purple-700 bg-purple-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Syllabus ({syllabus.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('EDITOR')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'EDITOR'
                ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>{editingJob ? `Editing: ${editingJob.organization.shortName || 'Job'}` : 'Job Editor'}</span>
          </button>

          <button
            onClick={() => setActiveTab('BROADCAST')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'BROADCAST'
                ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Broadcast Alerts</span>
          </button>

          <button
            onClick={() => setActiveTab('SUBSCRIBERS')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'SUBSCRIBERS'
                ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('SEO')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'SEO'
                ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Google Jobs &amp; SEO</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* ========================================================= */}
        {/* TAB 1: ARTICLES LIST / DASHBOARD */}
        {/* ========================================================= */}
        {activeTab === 'ARTICLES' && (
          <div className="space-y-6">

            {/* Automated Feeds & Database Status Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-5 border border-blue-900/50 shadow-md">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Database Engine: Active
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/20 text-blue-200 border border-blue-400/30">
                      <Radio className="w-3 h-3 text-blue-400" />
                      Cross-Tab Live Broadcast
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Last check: {lastSyncTime}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Automated Job Notification Sync &amp; Database Hub</span>
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Automatically pulls live recruitment alerts from official gazettes &amp; public APIs (ISRO, DRDO, RRB, RBI, Google, Arbeitnow) without manual typing. All modifications synchronize across open tabs in real-time.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={handleTriggerAutoSync}
                    disabled={isSyncing}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all disabled:opacity-60 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Fetching Alerts...' : '⚡ Trigger Auto-Sync'}</span>
                  </button>

                  <button
                    onClick={() => setShowDbInfoModal(true)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Database className="w-3.5 h-3.5 text-blue-400" />
                    <span>DB Info</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* KPI Cards - Separated into Center Govt, State Govt, Private Jobs */}
            {(() => {
              const centralJobsCount = jobs.filter((j) => getJobClassification(j) === 'CENTRAL_GOVT').length;
              const stateJobsCount = jobs.filter((j) => getJobClassification(j) === 'STATE_GOVT').length;
              const privateJobsCount = jobs.filter((j) => getJobClassification(j) === 'PRIVATE').length;

              return (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div
                      onClick={() => { setCategoryFilter('ALL'); setSelectedAdminState(''); }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        categoryFilter === 'ALL'
                          ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-bold block">Total Published Posts</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-extrabold">All</span>
                      </div>
                      <span className="text-2xl font-black text-slate-900 mt-1 block">{jobs.length}</span>
                      <span className="text-[11px] text-blue-600 font-semibold block mt-1">Live in search index</span>
                    </div>

                    <div
                      onClick={() => { setCategoryFilter('CENTRAL_GOVT'); setSelectedAdminState(''); }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        categoryFilter === 'CENTRAL_GOVT'
                          ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-500/30 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-blue-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-900 font-bold block">🏛️ Central Govt Jobs</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-extrabold">All India</span>
                      </div>
                      <span className="text-2xl font-black text-blue-700 mt-1 block">
                        {centralJobsCount}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-1">UPSC, SSC, RRB, Banks, Defense</span>
                    </div>

                    <div
                      onClick={() => { setCategoryFilter('STATE_GOVT'); }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        categoryFilter === 'STATE_GOVT'
                          ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-500/30 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-purple-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-purple-900 font-bold block">📍 State Govt Jobs</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-extrabold">States &amp; UTs</span>
                      </div>
                      <span className="text-2xl font-black text-purple-700 mt-1 block">
                        {stateJobsCount}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-1">State PSCs, Police, High Courts</span>
                    </div>

                    <div
                      onClick={() => { setCategoryFilter('PRIVATE'); setSelectedAdminState(''); }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        categoryFilter === 'PRIVATE'
                          ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500/30 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-emerald-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-900 font-bold block">💼 Private &amp; Tech Jobs</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-extrabold">Corporate</span>
                      </div>
                      <span className="text-2xl font-black text-emerald-700 mt-1 block">
                        {privateJobsCount}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-1">Software, IT, MNCs &amp; Startups</span>
                    </div>
                  </div>

                  {/* Filter and Search toolbar */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter articles by title, dept, category, state..."
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
                        <button
                          onClick={() => { setCategoryFilter('ALL'); setSelectedAdminState(''); }}
                          className={`px-3 py-1.5 rounded-md transition-all ${
                            categoryFilter === 'ALL'
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          All ({jobs.length})
                        </button>
                        <button
                          onClick={() => { setCategoryFilter('CENTRAL_GOVT'); setSelectedAdminState(''); }}
                          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                            categoryFilter === 'CENTRAL_GOVT'
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span>🏛️ Central Govt</span>
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                            categoryFilter === 'CENTRAL_GOVT' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {centralJobsCount}
                          </span>
                        </button>
                        <button
                          onClick={() => setCategoryFilter('STATE_GOVT')}
                          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                            categoryFilter === 'STATE_GOVT'
                              ? 'bg-purple-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span>📍 State Govt</span>
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                            categoryFilter === 'STATE_GOVT' ? 'bg-purple-700 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {stateJobsCount}
                          </span>
                        </button>
                        <button
                          onClick={() => { setCategoryFilter('PRIVATE'); setSelectedAdminState(''); }}
                          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                            categoryFilter === 'PRIVATE'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <span>💼 Private Jobs</span>
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                            categoryFilter === 'PRIVATE' ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {privateJobsCount}
                          </span>
                        </button>
                      </div>

                      {/* State filter dropdown when viewing State Govt or All */}
                      {(categoryFilter === 'STATE_GOVT' || (categoryFilter === 'ALL' && selectedAdminState)) && (
                        <select
                          value={selectedAdminState}
                          onChange={(e) => {
                            setSelectedAdminState(e.target.value);
                            if (e.target.value && categoryFilter !== 'STATE_GOVT') {
                              setCategoryFilter('STATE_GOVT');
                            }
                          }}
                          className="text-xs bg-purple-50 border border-purple-300 rounded-lg px-2.5 py-2 font-bold text-purple-900 focus:outline-none focus:border-purple-600 focus:bg-white"
                        >
                          <option value="">🗺️ Filter by State (All {stateJobsCount} State Jobs)</option>
                          {INDIAN_STATES.filter(s => s.code !== 'ALL_INDIA').map(st => {
                            const countInState = jobs.filter(j => 
                              getJobClassification(j) === 'STATE_GOVT' && (
                                (j.state || '').toUpperCase() === st.code.toUpperCase() ||
                                (j.state || '').toLowerCase() === st.name.toLowerCase() ||
                                (j.location || '').toLowerCase().includes(st.name.toLowerCase())
                              )
                            ).length;
                            return (
                              <option key={st.code} value={st.code}>
                                {st.name} ({st.code}) {countInState > 0 ? `• ${countInState} jobs` : ''}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}

            {/* Articles Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Organization &amp; Job Title</th>
                      <th className="p-3.5">Recruitment Level</th>
                      <th className="p-3.5">Vacancies / CTC</th>
                      <th className="p-3.5">Deadline</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Views</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredJobs.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          No job articles found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 line-clamp-1">{job.title}</div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              {job.organization.name} ({job.organization.shortName}) • Category: {job.category}
                            </div>
                          </td>

                          <td className="p-3.5">
                            {(() => {
                              const cls = getJobClassification(job);
                              if (cls === 'CENTRAL_GOVT') {
                                return (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-black bg-blue-100 text-blue-800 border border-blue-200">
                                    🏛️ Central Govt
                                  </span>
                                );
                              }
                              if (cls === 'STATE_GOVT') {
                                const stLabel = getJobStateLabel(job);
                                return (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-black bg-purple-100 text-purple-900 border border-purple-200">
                                    📍 State Govt{stLabel ? ` • ${stLabel}` : ''}
                                  </span>
                                );
                              }
                              return (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  💼 Private &amp; Tech
                                </span>
                              );
                            })()}
                          </td>

                          <td className="p-3.5 font-semibold text-slate-800">
                            {job.sector === 'GOVERNMENT' ? `${job.totalVacancies.toLocaleString()} Posts` : job.compensation.salaryOrPayScale}
                          </td>

                          <td className="p-3.5">
                            <div className="font-semibold text-slate-800">{job.importantDates.applyEndDate}</div>
                            <span className={`text-[10px] font-bold ${job.importantDates.daysRemaining <= 3 ? 'text-red-600' : 'text-slate-500'}`}>
                              {job.importantDates.daysRemaining} days left
                            </span>
                          </td>

                          <td className="p-3.5">
                            <button
                              onClick={() => handleStatusToggle(job)}
                              title="Click to cycle status"
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                job.status === 'ACTIVE'
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : job.status === 'CLOSING_SOON'
                                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              }`}
                            >
                              {job.status} ↻
                            </button>
                          </td>

                          <td className="p-3.5 font-mono text-slate-600">
                            {job.viewsCount.toLocaleString()}
                          </td>

                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleStartEdit(job)}
                                className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors font-bold flex items-center gap-1 text-xs"
                                title="Edit this article"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => handleDeleteJob(job.id, job.title)}
                                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete article"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ARTICLE EDIT & CREATE STUDIO */}
        {/* ========================================================= */}
        {activeTab === 'EDITOR' && (
          <div className="space-y-6">
            {!editingJob ? (
              <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-4">
                <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No article selected for editing</h3>
                <p className="text-xs text-slate-500">Pick an article from the list or create a fresh one.</p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setActiveTab('ARTICLES')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700"
                  >
                    Select Existing Post
                  </button>
                  <button
                    onClick={handleStartCreate}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white"
                  >
                    Create New Job
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveJob} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6 text-xs">
                
                {/* Editor Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-blue-600" />
                      <span>{editingJob.id.startsWith('custom-') || editingJob.id.startsWith('job-') ? 'Create New Job Alert' : 'Edit Job Notification'}</span>
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Editing fields updates both the public feed and detail dossier instantly.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('ARTICLES')}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-sm flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save &amp; Publish Article</span>
                    </button>
                  </div>
                </div>

                {/* Section 1: Sector & Classification */}
                <div className="space-y-4">
                  <h3 className="font-extrabold text-blue-800 uppercase tracking-wider text-[11px]">
                    1. Job Classification &amp; Department Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Recruitment Level</label>
                      <select
                        value={
                          editingJob.sector === 'PRIVATE'
                            ? 'PRIVATE'
                            : (editingJob.state && editingJob.state.toUpperCase() !== 'ALL_INDIA' && editingJob.state.toLowerCase() !== 'all india' ? 'STATE_GOVT' : 'CENTRAL_GOVT')
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'PRIVATE') {
                            setEditingJob({ ...editingJob, sector: 'PRIVATE', state: undefined });
                          } else if (val === 'STATE_GOVT') {
                            setEditingJob({
                              ...editingJob,
                              sector: 'GOVERNMENT',
                              state: editingJob.state && editingJob.state.toUpperCase() !== 'ALL_INDIA' ? editingJob.state : 'UP',
                            });
                          } else {
                            setEditingJob({ ...editingJob, sector: 'GOVERNMENT', state: 'ALL_INDIA' });
                          }
                        }}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                      >
                        <option value="CENTRAL_GOVT">🏛️ Central Govt (All India)</option>
                        <option value="STATE_GOVT">📍 State Govt (State Specific)</option>
                        <option value="PRIVATE">💼 Private / Corporate Tech</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">State / Jurisdiction</label>
                      <select
                        value={editingJob.state || 'ALL_INDIA'}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingJob({
                            ...editingJob,
                            state: val,
                            sector: editingJob.sector === 'PRIVATE' ? 'PRIVATE' : 'GOVERNMENT',
                          });
                        }}
                        disabled={editingJob.sector === 'PRIVATE'}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold disabled:opacity-50 disabled:bg-slate-100"
                      >
                        <option value="ALL_INDIA">All India (Central Level)</option>
                        {INDIAN_STATES.filter(s => s.code !== 'ALL_INDIA').map((st) => (
                          <option key={st.code} value={st.code}>
                            {st.name} ({st.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Organization Full Name</label>
                      <input
                        type="text"
                        required
                        value={editingJob.organization.name}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          organization: { ...editingJob.organization, name: e.target.value }
                        })}
                        placeholder="e.g. State Bank of India / Google LLC"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Short Name / Monogram</label>
                      <input
                        type="text"
                        required
                        value={editingJob.organization.shortName}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          organization: { 
                            ...editingJob.organization, 
                            shortName: e.target.value,
                            logoText: e.target.value.substring(0, 3).toUpperCase()
                          }
                        })}
                        placeholder="e.g. SBI / BPSC / GOOG"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Job Title & Classification */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="font-extrabold text-blue-800 uppercase tracking-wider text-[11px]">
                    2. Notification Title &amp; Vacancy Scope
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-800 block mb-1">Official Job / Recruitment Title</label>
                      <input
                        type="text"
                        required
                        value={editingJob.title}
                        onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                        placeholder="e.g. SBI Probationary Officer (PO) Recruitment 2026"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Category / Stream</label>
                      <input
                        type="text"
                        value={editingJob.category}
                        onChange={(e) => setEditingJob({ ...editingJob, category: e.target.value })}
                        placeholder="Banking / Central Govt / Software"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Total Vacancies / Positions</label>
                      <input
                        type="number"
                        value={editingJob.totalVacancies}
                        onChange={(e) => setEditingJob({ ...editingJob, totalVacancies: parseInt(e.target.value, 10) || 1 })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Location / Postings</label>
                      <input
                        type="text"
                        value={editingJob.location}
                        onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                        placeholder="All India / Bengaluru"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Work Mode (If Private)</label>
                      <select
                        value={editingJob.workMode || 'ON_SITE'}
                        onChange={(e) => setEditingJob({ ...editingJob, workMode: e.target.value as WorkMode })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                      >
                        <option value="ON_SITE">On-Site Office</option>
                        <option value="HYBRID">Hybrid (Work from Home &amp; Office)</option>
                        <option value="REMOTE">100% Remote</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Important Dates & Timeline */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="font-extrabold text-blue-800 uppercase tracking-wider text-[11px]">
                    3. Important Dates &amp; Countdown
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Notification Release Date</label>
                      <input
                        type="text"
                        value={editingJob.importantDates.notificationDate}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          importantDates: { ...editingJob.importantDates, notificationDate: e.target.value }
                        })}
                        placeholder="01 Oct 2026"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Apply Start Date</label>
                      <input
                        type="text"
                        value={editingJob.importantDates.applyStartDate}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          importantDates: { ...editingJob.importantDates, applyStartDate: e.target.value }
                        })}
                        placeholder="05 Oct 2026"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1 text-red-600">Last Date to Apply *</label>
                      <input
                        type="text"
                        required
                        value={editingJob.importantDates.applyEndDate}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          importantDates: { ...editingJob.importantDates, applyEndDate: e.target.value }
                        })}
                        placeholder="30 Oct 2026"
                        className="w-full px-3 py-2 bg-red-50/50 border border-red-300 rounded-lg font-bold text-red-700"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Days Remaining Left</label>
                      <input
                        type="number"
                        value={editingJob.importantDates.daysRemaining}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          importantDates: { ...editingJob.importantDates, daysRemaining: parseInt(e.target.value, 10) || 0 }
                        })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Eligibility & Requirements */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="font-extrabold text-blue-800 uppercase tracking-wider text-[11px]">
                    4. Eligibility, Qualifications &amp; Age Criteria
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Education Required</label>
                      <input
                        type="text"
                        value={editingJob.eligibility.education[0] || ''}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          eligibility: { ...editingJob.eligibility, education: [e.target.value] }
                        })}
                        placeholder="Graduation in any discipline / B.Tech / 12th Pass"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Experience / Freshers</label>
                      <input
                        type="text"
                        value={editingJob.eligibility.experience || ''}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          eligibility: { ...editingJob.eligibility, experience: e.target.value }
                        })}
                        placeholder="Fresher Eligible (0 - 2 Years)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Age Limits (Min - Max)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={editingJob.eligibility.minAge || ''}
                          onChange={(e) => setEditingJob({
                            ...editingJob,
                            eligibility: { ...editingJob.eligibility, minAge: parseInt(e.target.value, 10) }
                          })}
                          className="w-1/2 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                        />
                        <span>-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={editingJob.eligibility.maxAge || ''}
                          onChange={(e) => setEditingJob({
                            ...editingJob,
                            eligibility: { ...editingJob.eligibility, maxAge: parseInt(e.target.value, 10) }
                          })}
                          className="w-1/2 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Application Fee (General, ₹)</label>
                      <input
                        type="number"
                        value={editingJob.compensation.applicationFeeGeneral || 0}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          compensation: { ...editingJob.compensation, applicationFeeGeneral: parseInt(e.target.value, 10) }
                        })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Salary / Pay Scale</label>
                      <input
                        type="text"
                        value={editingJob.compensation.salaryOrPayScale}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          compensation: { ...editingJob.compensation, salaryOrPayScale: e.target.value }
                        })}
                        placeholder="₹45,000 - ₹75,000/mo or 18 LPA"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 5: Official Links */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="font-extrabold text-blue-800 uppercase tracking-wider text-[11px]">
                    5. Official Links &amp; Gazettes
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-800 block mb-1 text-blue-700">Official Apply Online Link *</label>
                      <input
                        type="url"
                        required
                        value={editingJob.links.applyUrl}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          links: { ...editingJob.links, applyUrl: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-blue-50/50 border border-blue-300 rounded-lg font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">Download Official PDF Notification URL</label>
                      <input
                        type="url"
                        value={editingJob.links.officialPdfUrl || ''}
                        onChange={(e) => setEditingJob({
                          ...editingJob,
                          links: { ...editingJob.links, officialPdfUrl: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 6: Summary description */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="font-bold text-slate-800 block mb-1">Notification Overview &amp; Instructions</label>
                  <textarea
                    rows={3}
                    value={editingJob.summary}
                    onChange={(e) => setEditingJob({ ...editingJob, summary: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                {/* Bottom submit */}
                <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('ARTICLES')}
                    className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-md flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Changes to Public Site</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: ADMIT CARDS MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'ADMIT_CARDS' && (
          <AdminAdmitCardsManager
            items={admitCards}
            onSave={handleSaveAdmitCard}
            onDelete={handleDeleteAdmitCard}
            showToast={showToast}
          />
        )}

        {/* ========================================================= */}
        {/* TAB: RESULTS & CUT-OFFS MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'RESULTS' && (
          <AdminResultsManager
            items={results}
            onSave={handleSaveResult}
            onDelete={handleDeleteResult}
            showToast={showToast}
          />
        )}

        {/* ========================================================= */}
        {/* TAB: ANSWER KEYS & OBJECTION WINDOWS MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'ANSWER_KEYS' && (
          <AdminAnswerKeysManager
            items={answerKeys}
            onSave={handleSaveAnswerKey}
            onDelete={handleDeleteAnswerKey}
            showToast={showToast}
          />
        )}

        {/* ========================================================= */}
        {/* TAB: SYLLABUS & EXAM PATTERNS MANAGER */}
        {/* ========================================================= */}
        {activeTab === 'SYLLABUS' && (
          <AdminSyllabusManager
            items={syllabus}
            onSave={handleSaveSyllabus}
            onDelete={handleDeleteSyllabus}
            showToast={showToast}
          />
        )}

        {/* ========================================================= */}
        {/* TAB 3: BROADCAST NOTIFICATIONS DISPATCHER SERVICE */}
        {/* ========================================================= */}
        {activeTab === 'BROADCAST' && (
          <div className="space-y-6">
            
            {/* Compose Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Broadcast Job Alerts Dispatcher</h2>
                  <p className="text-xs text-slate-500">Send real-time alerts directly to Telegram channels, Web Push subscribers, and Email lists.</p>
                </div>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs pt-2">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Broadcast Alert Headline / Title</label>
                  <input
                    type="text"
                    required
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    placeholder="e.g. 🔥 UPSC Civil Services 2026 Notification Released | Last Date: 15 Nov"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Target Candidate Segment</label>
                    <select
                      value={broadcastSector}
                      onChange={(e) => setBroadcastSector(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                    >
                      <option value="All Seekers">All Subscribers (58,200 recipients)</option>
                      <option value="Government">🏛️ Government Exams Aspirants only (42,100)</option>
                      <option value="Private & Tech">💼 Tech &amp; Corporate Applicants only (16,100)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Dispatch Channel</label>
                    <select
                      value={broadcastChannel}
                      onChange={(e) => setBroadcastChannel(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                    >
                      <option value="Telegram & Push">Telegram Channel + Web Browser Push</option>
                      <option value="Telegram Only">Telegram Community Channel Only</option>
                      <option value="Push Only">Web Browser Push Alerts Only</option>
                      <option value="All Channels">All Channels (Telegram + Push + Email)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-sm flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Immediate Alert Broadcast</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Broadcast Logs History */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-3">Recent Broadcast Dispatches History</h3>
              <div className="space-y-2 text-xs">
                {broadcasts.map((bc) => (
                  <div key={bc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-900 block">{bc.title}</span>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Sent to: <strong>{bc.targetSector}</strong> via {bc.channel} • Recipients: {bc.recipientCount.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> {bc.status}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{bc.sentAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SUBSCRIBERS SERVICE */}
        {/* ========================================================= */}
        {activeTab === 'SUBSCRIBERS' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Registered Alert Subscribers</h2>
                <p className="text-xs text-slate-500">Candidates actively subscribed to your portal&apos;s alert webhooks.</p>
              </div>
              <button
                onClick={() => showToast('Exported subscriber CSV simulated!')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
              >
                Export CSV List
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Subscriber Identifier</th>
                    <th className="p-3.5">Channel</th>
                    <th className="p-3.5">Subscribed Preferences</th>
                    <th className="p-3.5">Registered At</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">{sub.contact}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                          {sub.channel}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600">{sub.sectors.join(', ')}</td>
                      <td className="p-3.5 text-slate-500">{sub.createdAt}</td>
                      <td className="p-3.5 text-right">
                        <span className="text-emerald-700 font-bold text-[11px]">● Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: SEO HEALTH & GOOGLE JOBS SERVICE */}
        {/* ========================================================= */}
        {activeTab === 'SEO' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>Google Search &amp; Google Jobs Indexing Dashboard</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your portal automatically compiles rich JSON-LD `JobPosting` and `WebSite` schemas so job cards appear directly inside Google Jobs search results boxes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-800 block">Schema.org Compliance</span>
                  <span className="text-lg font-extrabold text-emerald-700">100% Validated</span>
                  <p className="text-[11px] text-emerald-600 mt-1">Direct Google Jobs snippet enabled</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <span className="text-xs font-bold text-blue-800 block">Keywords In Title &amp; Headers</span>
                  <span className="text-lg font-extrabold text-blue-700">Optimized</span>
                  <p className="text-[11px] text-blue-600 mt-1">Sarkari Result, Free Job Alert, SSC, Banking</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <span className="text-xs font-bold text-purple-800 block">Mobile Core Web Vitals</span>
                  <span className="text-lg font-extrabold text-purple-700">Ultra Fast</span>
                  <p className="text-[11px] text-purple-600 mt-1">Turbopack SSR + instant client rendering</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: STATE GOVT FEEDS AUTOMATION & CRON PIPELINE */}
        {/* ========================================================= */}
        {activeTab === 'STATE_FEEDS' && (
          <AdminStateFeedsManager
            jobs={jobs}
            isSyncing={isSyncing}
            lastSyncTime={lastSyncTime}
            onTriggerSync={handleTriggerAutoSync}
            showToast={showToast}
          />
        )}

      </main>

      {/* Database Setup & Feed Architecture Modal */}
      {showDbInfoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Database &amp; Automated Feeds Architecture</h3>
                  <p className="text-xs text-slate-500">How auto-updates and server persistence work</p>
                </div>
              </div>
              <button
                onClick={() => setShowDbInfoModal(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
                <span className="font-extrabold text-blue-900 block text-sm">🟢 Active Engine: Zero-Config Server JSON Database</span>
                <p className="leading-relaxed text-slate-600">
                  Currently, all articles and examination entries are persisted in <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-blue-700">src/data/portalDatabase.json</code> via safe file I/O locks with full REST endpoints (<code className="bg-white px-1 py-0.5 rounded font-mono text-slate-800">/api/jobs</code>, <code className="bg-white px-1 py-0.5 rounded font-mono text-slate-800">/api/sync</code>).
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <span className="font-extrabold text-emerald-900 block text-sm">⚡ Automated Feed Ingestion Flow</span>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Endpoint:</strong> <code className="bg-white px-1 py-0.5 rounded font-mono text-slate-800">POST /api/sync</code></li>
                  <li><strong>External Sources:</strong> Live Arbeitnow Tech Job API + Official Government Gazette Engine (ISRO, DRDO, RRB, RBI, etc.)</li>
                  <li><strong>Deduplication:</strong> Prevents duplicate alerts by checking existing notification IDs and titles before appending.</li>
                  <li><strong>Real-Time Broadcast:</strong> Automatically notifies any open browser tabs via native <code className="bg-white px-1 py-0.5 rounded font-mono text-slate-800">BroadcastChannel</code> without page refresh.</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
                <span className="font-extrabold text-purple-900 block text-sm">☁️ Optional Cloud Migration (Supabase / PostgreSQL)</span>
                <p className="text-slate-600 leading-relaxed">
                  A ready-to-run PostgreSQL schema script is provided at <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-purple-700">supabase_schema.sql</code>. It includes tables for <code className="font-mono">job_notifications</code>, <code className="font-mono">admit_cards</code>, <code className="font-mono">exam_results</code>, and Row Level Security (RLS) policies.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button
                onClick={() => setShowDbInfoModal(false)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Change Admin Password</h3>
                  <p className="text-[11px] text-slate-500">Update master security passkey for console access</p>
                </div>
              </div>
              <button
                onClick={() => { setShowPasswordModal(false); setPasswordModalError(null); }}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Current Password:
                </label>
                <input
                  type={showPasswordChars ? 'text' : 'password'}
                  required
                  value={currentPassInput}
                  onChange={(e) => setCurrentPassInput(e.target.value)}
                  placeholder="Enter current password..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:border-purple-600 focus:bg-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  New Password:
                </label>
                <input
                  type={showPasswordChars ? 'text' : 'password'}
                  required
                  value={newPassInput}
                  onChange={(e) => setNewPassInput(e.target.value)}
                  placeholder="Enter new password (min 4 chars)..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:border-purple-600 focus:bg-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Confirm New Password:
                </label>
                <input
                  type={showPasswordChars ? 'text' : 'password'}
                  required
                  value={confirmPassInput}
                  onChange={(e) => setConfirmPassInput(e.target.value)}
                  placeholder="Re-enter new password..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:border-purple-600 focus:bg-white focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={showPasswordChars}
                    onChange={(e) => setShowPasswordChars(e.target.checked)}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span>Show password</span>
                </label>

                <button
                  type="button"
                  onClick={handleResetPasswordToDefault}
                  className="text-amber-700 hover:text-amber-900 font-bold hover:underline text-[11px] cursor-pointer"
                >
                  Reset to Default (admin2026)
                </button>
              </div>

              {passwordModalError && (
                <div className="p-2.5 bg-red-50 text-red-700 rounded-xl text-xs font-semibold border border-red-200">
                  ⚠️ {passwordModalError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setShowPasswordModal(false); setPasswordModalError(null); }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold text-white bg-purple-600 hover:bg-purple-700 shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
