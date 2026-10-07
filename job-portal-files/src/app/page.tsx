'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Laptop, 
  Clock, 
  Briefcase, 
  Filter, 
  Sparkles, 
  GraduationCap, 
  CheckCircle,
  HelpCircle,
  Calendar,
  FileText,
  Search,
  Ticket,
  Trophy,
  KeyRound,
  BookOpen
} from 'lucide-react';

import { JobNotification, JobSector } from '../types/job';
import { INITIAL_JOBS } from '../data/mockJobs';
import { getStoredJobs, addStoredJob, subscribeToJobUpdates, syncLiveJobsFromServer } from '../utils/jobStorage';

import { 
  PortalSection, 
  AdmitCardItem, 
  ResultItem, 
  AnswerKeyItem, 
  SyllabusItem 
} from '../types/portal';
import { 
  INITIAL_ADMIT_CARDS, 
  INITIAL_RESULTS, 
  INITIAL_ANSWER_KEYS, 
  INITIAL_SYLLABUS 
} from '../data/mockPortalData';
import { 
  getStoredAdmitCards, 
  getStoredResults, 
  getStoredAnswerKeys, 
  getStoredSyllabus, 
  subscribeToAllPortalUpdates 
} from '../utils/portalStorage';

import { Navbar } from '../components/Navbar';
import { Ticker } from '../components/Ticker';
import { FilterHero } from '../components/FilterHero';
import { JobCard } from '../components/JobCard';
import { JobDetailModal } from '../components/JobDetailModal';
import { AlertSubscribeModal } from '../components/AlertSubscribeModal';
import { BookmarksDrawer } from '../components/BookmarksDrawer';
import { PostJobModal } from '../components/PostJobModal';
import { Footer } from '../components/Footer';

import { PortalSectionTabs } from '../components/PortalSectionTabs';
import { PortalQuickMatrix } from '../components/PortalQuickMatrix';
import { AdmitCardCard } from '../components/AdmitCardCard';
import { ResultCard } from '../components/ResultCard';
import { AnswerKeyCard } from '../components/AnswerKeyCard';
import { SyllabusCard } from '../components/SyllabusCard';

import { FreeJobAlertStateNav } from '../components/FreeJobAlertStateNav';
import { FreeJobAlertEduGrid } from '../components/FreeJobAlertEduGrid';
import { FreeJobAlertLiveBox } from '../components/FreeJobAlertLiveBox';
import { FreeJobAlertTableView } from '../components/FreeJobAlertTableView';
import { TableProperties, LayoutGrid } from 'lucide-react';

export default function Home() {
  // Active Section Navigation
  const [activeSection, setActiveSection] = useState<PortalSection>('JOBS');

  // Datasets
  const [jobs, setJobs] = useState<JobNotification[]>(INITIAL_JOBS);
  const [admitCards, setAdmitCards] = useState<AdmitCardItem[]>(INITIAL_ADMIT_CARDS);
  const [results, setResults] = useState<ResultItem[]>(INITIAL_RESULTS);
  const [answerKeys, setAnswerKeys] = useState<AnswerKeyItem[]>(INITIAL_ANSWER_KEYS);
  const [syllabus, setSyllabus] = useState<SyllabusItem[]>(INITIAL_SYLLABUS);

  // Filters state
  const [activeSector, setActiveSector] = useState<JobSector | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [viewMode, setViewMode] = useState<'TABLE' | 'GRID'>('TABLE');
  const [filterClosingSoon, setFilterClosingSoon] = useState(false);
  const [workModeFilter, setWorkModeFilter] = useState('');
  
  // Modals state
  const [selectedJob, setSelectedJob] = useState<JobNotification | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load datasets and subscribe to cross-tab updates
  useEffect(() => {
    // Initial loads
    setJobs(getStoredJobs());
    setAdmitCards(getStoredAdmitCards());
    setResults(getStoredResults());
    setAnswerKeys(getStoredAnswerKeys());
    setSyllabus(getStoredSyllabus());

    // 1. Subscribe to Jobs updates
    const unsubJobs = subscribeToJobUpdates((updated) => {
      setJobs(updated);
    });

    // 2. Subscribe to Admit Cards, Results, Answer Keys, Syllabus updates
    const unsubPortal = subscribeToAllPortalUpdates(() => {
      setAdmitCards(getStoredAdmitCards());
      setResults(getStoredResults());
      setAnswerKeys(getStoredAnswerKeys());
      setSyllabus(getStoredSyllabus());
    });

    // 3. Gentle background sync with server database for latest public recruitment feeds
    syncLiveJobsFromServer().then((res) => {
      if (res.success && res.addedCount > 0) {
        setJobs(getStoredJobs());
      }
    }).catch(() => {});

    try {
      const saved = localStorage.getItem('jobalert_saved_ids');
      if (saved) {
        setSavedJobIds(JSON.parse(saved));
      }
    } catch {}

    return () => {
      unsubJobs();
      unsubPortal();
    };
  }, []);

  // Save to local storage
  const handleToggleSave = (job: JobNotification) => {
    setSavedJobIds((prev) => {
      let updated: string[];
      if (prev.includes(job.id)) {
        updated = prev.filter((id) => id !== job.id);
        showToast(`Removed "${job.organization.shortName}" from bookmarks`);
      } else {
        updated = [...prev, job.id];
        showToast(`Saved "${job.title.substring(0, 30)}..." to bookmarks!`);
      }
      try {
        localStorage.setItem('jobalert_saved_ids', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearAllBookmarks = () => {
    setSavedJobIds([]);
    try {
      localStorage.removeItem('jobalert_saved_ids');
    } catch {}
    showToast('Cleared all saved bookmarks');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleShare = (job: JobNotification) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        `📌 ${job.title}\n🏢 ${job.organization.name}\n⏰ Last Date: ${job.importantDates?.applyEndDate || 'N/A'}\n🔗 Official apply: ${job.links?.applyUrl || '#'}`
      );
      showToast('Job details copied to clipboard!');
    }
  };

  const handleSharePortalItem = (title: string, org: string, url: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        `🔔 ${title}\n🏢 ${org}\n🔗 Official link: ${url}`
      );
      showToast('Item copied to clipboard!');
    }
  };

  const handleAddNewJob = (newJob: JobNotification) => {
    const updated = addStoredJob(newJob);
    setJobs(updated);
    showToast(`Published alert: "${newJob.title.substring(0, 30)}..."`);
  };

  // Helper for matching education qualifications
  const checkEduMatch = (eduArray: string[], qualKey: string, exp?: string) => {
    if (!qualKey) return true;
    const k = qualKey.toLowerCase();
    const text = (eduArray || []).join(' ').toLowerCase();
    if (k === '10th') return text.includes('10th') || text.includes('matric') || text.includes('high school') || text.includes('sslc');
    if (k === '12th') return text.includes('12th') || text.includes('intermediate') || text.includes('inter') || text.includes('10+2') || text.includes('higher secondary');
    if (k === 'iti') return text.includes('iti') || text.includes('apprentice') || text.includes('trade');
    if (k === 'diploma') return text.includes('diploma') || text.includes('polytechnic');
    if (k === 'graduate') return text.includes('graduate') || text.includes('degree') || text.includes('bachelor') || text.includes('b.a') || text.includes('b.sc') || text.includes('b.com');
    if (k === 'b.tech') return text.includes('b.tech') || text.includes('b.e') || text.includes('engineering') || text.includes('technology');
    if (k === 'post graduate') return text.includes('post graduate') || text.includes('pg') || text.includes('m.tech') || text.includes('m.sc') || text.includes('master') || text.includes('mba') || text.includes('mca');
    if (k === 'b.com') return text.includes('b.com') || text.includes('commerce') || text.includes('accounting') || text.includes('account');
    if (k === '8th') return text.includes('8th') || text.includes('middle school') || text.includes('safai karmachari') || text.includes('peon') || text.includes('attendant') || text.includes('mts');
    if (k.includes('fresher')) return exp?.toLowerCase().includes('fresher') || exp?.includes('0 -') || false;
    return text.includes(k);
  };

  // State Counts for State Government Navigation Bar
  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach((job) => {
      if (job.state) {
        counts[job.state] = (counts[job.state] || 0) + 1;
      }
    });
    return counts;
  }, [jobs]);

  // Qualification Counts for FreeJobAlert Education Grid
  const qualificationCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const keys = ['10th', '12th', 'diploma', 'iti', 'graduate', 'b.tech', 'post graduate', 'b.com', '8th'];
    keys.forEach((key) => {
      counts[key] = jobs.filter((j) => {
        const edus = Array.isArray(j.eligibility?.education) ? j.eligibility.education : [];
        return checkEduMatch(edus, key, j.eligibility?.experience);
      }).length;
    });
    return counts;
  }, [jobs]);

  // Filtered Jobs Computation
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (activeSector !== 'ALL' && job.sector !== activeSector) return false;
      if (selectedCategory && !job.category?.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
      if (workModeFilter && job.workMode !== workModeFilter) return false;
      if (filterClosingSoon && (job.importantDates?.daysRemaining ?? 99) > 3) return false;

      // State Filter (FreeJobAlert State-wise)
      if (selectedState) {
        if (selectedState === 'ALL_INDIA') {
          const isAllIndia = job.state === 'ALL_INDIA' || 
            !job.state || 
            job.location?.toLowerCase().includes('all india');
          if (!isAllIndia) return false;
        } else {
          const matchesState = 
            job.state?.toUpperCase() === selectedState.toUpperCase() ||
            job.location?.toLowerCase().includes(selectedState.toLowerCase());
          if (!matchesState) return false;
        }
      }

      // Qualification Filter (FreeJobAlert 9-block & standard)
      if (selectedQualification) {
        const eduArray = Array.isArray(job.eligibility?.education) ? job.eligibility.education : [];
        const matchesEdu = checkEduMatch(eduArray, selectedQualification, job.eligibility?.experience);
        if (!matchesEdu) return false;
      }

      // Universal Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const eduArray = Array.isArray(job.eligibility?.education) ? job.eligibility.education : [];
        const inTitle = job.title?.toLowerCase().includes(q);
        const inOrg = job.organization?.name?.toLowerCase().includes(q) || job.organization?.shortName?.toLowerCase().includes(q);
        const inCat = job.category?.toLowerCase().includes(q);
        const inLocation = job.location?.toLowerCase().includes(q);
        const inState = job.state?.toLowerCase().includes(q);
        const inEdu = eduArray.some((e) => e?.toLowerCase().includes(q));
        const inSkills = job.eligibility?.skills?.some((s) => s?.toLowerCase().includes(q));
        if (!inTitle && !inOrg && !inCat && !inLocation && !inState && !inEdu && !inSkills) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, activeSector, selectedCategory, selectedQualification, selectedState, filterClosingSoon, workModeFilter, searchQuery]);

  // Filtered Admit Cards
  const filteredAdmitCards = useMemo(() => {
    return admitCards.filter((item) => {
      if (activeSector !== 'ALL' && item.sector !== activeSector) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.organization.name.toLowerCase().includes(q) ||
          item.organization.shortName.toLowerCase().includes(q) ||
          item.examName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [admitCards, activeSector, searchQuery]);

  // Filtered Results
  const filteredResults = useMemo(() => {
    return results.filter((item) => {
      if (activeSector !== 'ALL' && item.sector !== activeSector) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.organization.name.toLowerCase().includes(q) ||
          item.organization.shortName.toLowerCase().includes(q) ||
          item.examName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [results, activeSector, searchQuery]);

  // Filtered Answer Keys
  const filteredAnswerKeys = useMemo(() => {
    return answerKeys.filter((item) => {
      if (activeSector !== 'ALL' && item.sector !== activeSector) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.organization.name.toLowerCase().includes(q) ||
          item.organization.shortName.toLowerCase().includes(q) ||
          item.examName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [answerKeys, activeSector, searchQuery]);

  // Filtered Syllabus
  const filteredSyllabus = useMemo(() => {
    return syllabus.filter((item) => {
      if (activeSector !== 'ALL' && item.sector !== activeSector) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.organization.name.toLowerCase().includes(q) ||
          item.organization.shortName.toLowerCase().includes(q) ||
          item.examName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [syllabus, activeSector, searchQuery]);

  const govtCount = useMemo(() => jobs.filter((j) => j.sector === 'GOVERNMENT').length, [jobs]);
  const privateCount = useMemo(() => jobs.filter((j) => j.sector === 'PRIVATE').length, [jobs]);
  const savedJobsList = useMemo(() => jobs.filter((j) => savedJobIds.includes(j.id)), [jobs, savedJobIds]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border-2 border-blue-600 text-slate-900 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        activeSector={activeSector}
        onSectorChange={(sector) => {
          setActiveSector(sector);
          setSelectedCategory('');
        }}
        savedCount={savedJobIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenAlerts={() => setIsAlertModalOpen(true)}
        onOpenPostJob={() => setIsPostJobModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Sticky Portal Section Switcher Tabs */}
      <PortalSectionTabs
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        counts={{
          jobs: jobs.length,
          admitCards: admitCards.length,
          results: results.length,
          answerKeys: answerKeys.length,
          syllabus: syllabus.length,
        }}
      />

      {/* Urgent Announcements Ticker */}
      <Ticker
        jobs={jobs}
        onSelectJob={(job) => {
          setSelectedJob(job);
          setActiveSection('JOBS');
        }}
      />

      {/* ======================================================== */}
      {/* SECTION 1: LATEST JOBS FEED (FREEJOBALERT FULL FIDELITY) */}
      {/* ======================================================== */}
      {activeSection === 'JOBS' && (
        <>
          {/* 1. FreeJobAlert State-Wise Govt Jobs Directory Bar */}
          <FreeJobAlertStateNav
            selectedState={selectedState}
            onSelectState={setSelectedState}
            stateCounts={stateCounts}
          />

          {/* 2. FreeJobAlert Live Box: Closing Soon (Urgent) + Today Updates LIVE */}
          <FreeJobAlertLiveBox
            jobs={jobs}
            onSelectJob={(j) => setSelectedJob(j)}
          />

          {/* 3. FreeJobAlert Jobs by Education Qualification 9-Block Matrix */}
          <FreeJobAlertEduGrid
            selectedQualification={selectedQualification}
            onSelectQualification={setSelectedQualification}
            qualificationCounts={qualificationCounts}
          />

          {/* 4. Quick Access Matrix for All 4 Stages (Admit Cards, Results, Answer Key, Syllabus) */}
          <PortalQuickMatrix
            admitCards={admitCards}
            results={results}
            answerKeys={answerKeys}
            syllabus={syllabus}
            onSelectSection={setActiveSection}
          />

          {/* 5. Hero Section with Large Search and Sector Filters */}
          <FilterHero
            activeSector={activeSector}
            onSectorChange={(sector) => {
              setActiveSector(sector);
              setSelectedCategory('');
            }}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedQualification={selectedQualification}
            onQualificationChange={setSelectedQualification}
            filterClosingSoon={filterClosingSoon}
            onToggleClosingSoon={() => setFilterClosingSoon(!filterClosingSoon)}
            workModeFilter={workModeFilter}
            onWorkModeChange={setWorkModeFilter}
            govtCount={govtCount}
            privateCount={privateCount}
            totalCount={jobs.length}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Main Content Feed with FreeJobAlert Table & Grid Views */}
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <section aria-labelledby="latest-notifications-heading" className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
                <div>
                  <h2 id="latest-notifications-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
                    <span>Recruitment Notifications 2026</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                      {filteredJobs.length} {filteredJobs.length === 1 ? 'opening' : 'openings'} available
                    </span>
                    {selectedState && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-extrabold flex items-center gap-1">
                        📍 State: {selectedState}
                      </span>
                    )}
                    {selectedQualification && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center gap-1">
                        🎓 Edu: {selectedQualification}
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    FreeJobAlert Authentic Directory • Central UPSC/SSC/Railway, State PSCs, High Courts &amp; Police boards
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* View Mode Switcher Toggle */}
                  <div className="inline-flex rounded-xl bg-slate-200/90 p-1 border border-slate-300">
                    <button
                      onClick={() => setViewMode('TABLE')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        viewMode === 'TABLE'
                          ? 'bg-blue-700 text-white shadow-xs'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
                      }`}
                      title="FreeJobAlert Compact Table View"
                    >
                      <TableProperties className="w-3.5 h-3.5" />
                      <span>Table View</span>
                    </button>
                    <button
                      onClick={() => setViewMode('GRID')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        viewMode === 'GRID'
                          ? 'bg-blue-700 text-white shadow-xs'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/60'
                      }`}
                      title="Card Grid View"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Cards View</span>
                    </button>
                  </div>

                  {/* Reset Filter Button */}
                  {(selectedCategory || selectedQualification || selectedState || filterClosingSoon || workModeFilter || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setSelectedQualification('');
                        setSelectedState('');
                        setFilterClosingSoon(false);
                        setWorkModeFilter('');
                        setSearchQuery('');
                      }}
                      className="text-xs text-blue-700 hover:text-blue-900 font-bold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
                    >
                      Reset All Filters ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Feed Display: Table or Grid */}
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-xs space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No Job Notifications Found</h3>
                  <p className="text-xs text-slate-600">
                    No active notifications matched your search query or state/qualification filter settings. Try clearing some filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setSelectedQualification('');
                      setSelectedState('');
                      setFilterClosingSoon(false);
                      setWorkModeFilter('');
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center justify-center text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : viewMode === 'TABLE' ? (
                <FreeJobAlertTableView
                  jobs={filteredJobs}
                  savedJobIds={savedJobIds}
                  onToggleSave={handleToggleSave}
                  onSelectJob={(j) => setSelectedJob(j)}
                  onShare={handleShare}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={savedJobIds.includes(job.id)}
                      onToggleSave={handleToggleSave}
                      onSelectJob={(j) => setSelectedJob(j)}
                      onShare={handleShare}
                    />
                  ))}
                </div>
              )}
            </section>
          </main>
        </>
      )}

      {/* ======================================================== */}
      {/* SECTION 2: ADMIT CARD / HALL TICKET */}
      {/* ======================================================== */}
      {activeSection === 'ADMIT_CARD' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 mb-3">
                <Ticket className="w-3.5 h-3.5 text-indigo-300" />
                <span>Central &amp; State Examination Hall Tickets</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                Download Admit Cards &amp; City Intimation Slips 2026
              </h1>
              <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
                Direct official server links for UPSC, SSC, Banking, Railways, Defense &amp; Teaching recruitment hall tickets. Verify reporting time, shift timings, and mandatory identity guidelines.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>All Active Hall Tickets</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                {filteredAdmitCards.length} Available
              </span>
            </h2>

            {searchQuery && (
              <span className="text-xs text-slate-500">
                Filtered by &quot;{searchQuery}&quot;
              </span>
            )}
          </div>

          {filteredAdmitCards.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-xs space-y-3">
              <Ticket className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Admit Cards Found</h3>
              <p className="text-xs text-slate-500">Try adjusting your search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAdmitCards.map((ac) => (
                <AdmitCardCard
                  key={ac.id}
                  item={ac}
                  onShare={(item) => handleSharePortalItem(item.title, item.organization.name, item.admitCardUrl)}
                />
              ))}
            </div>
          )}
        </main>
      )}

      {/* ======================================================== */}
      {/* SECTION 3: RESULTS & CUT-OFFS */}
      {/* ======================================================== */}
      {activeSection === 'RESULT' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 mb-3">
                <Trophy className="w-3.5 h-3.5 text-emerald-300" />
                <span>Declared Merit Lists &amp; Scorecards</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                Exam Results, Merit Lists &amp; Cut-off Marks 2026
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
                Check official merit lists, roll-number PDFs, scorecards, and category-wise cut-off marks for competitive government examinations across India.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>Declared Exam Results</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {filteredResults.length} Results
              </span>
            </h2>

            {searchQuery && (
              <span className="text-xs text-slate-500">
                Filtered by &quot;{searchQuery}&quot;
              </span>
            )}
          </div>

          {filteredResults.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-xs space-y-3">
              <Trophy className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Results Found</h3>
              <p className="text-xs text-slate-500">Try adjusting your search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((res) => (
                <ResultCard
                  key={res.id}
                  item={res}
                  onShare={(item) => handleSharePortalItem(item.title, item.organization.name, item.resultUrl)}
                />
              ))}
            </div>
          )}
        </main>
      )}

      {/* ======================================================== */}
      {/* SECTION 4: ANSWER KEY & OBJECTION WINDOWS */}
      {/* ======================================================== */}
      {activeSection === 'ANSWER_KEY' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/30 text-amber-200 border border-amber-400/30 mb-3">
                <KeyRound className="w-3.5 h-3.5 text-amber-300" />
                <span>Question Papers &amp; Response Sheets</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                Official Answer Keys &amp; Objection Portals 2026
              </h1>
              <p className="text-xs sm:text-sm text-amber-200 leading-relaxed">
                Download candidate response sheets, tentative master answer keys, and submit question challenges within official objection windows.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>Answer Keys &amp; Challenge Windows</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                {filteredAnswerKeys.length} Active
              </span>
            </h2>

            {searchQuery && (
              <span className="text-xs text-slate-500">
                Filtered by &quot;{searchQuery}&quot;
              </span>
            )}
          </div>

          {filteredAnswerKeys.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-xs space-y-3">
              <KeyRound className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Answer Keys Found</h3>
              <p className="text-xs text-slate-500">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnswerKeys.map((ak) => (
                <AnswerKeyCard
                  key={ak.id}
                  item={ak}
                  onShare={(item) => handleSharePortalItem(item.title, item.organization.name, item.answerKeyUrl)}
                />
              ))}
            </div>
          )}
        </main>
      )}

      {/* ======================================================== */}
      {/* SECTION 5: SYLLABUS & EXAM PATTERNS */}
      {/* ======================================================== */}
      {activeSection === 'SYLLABUS' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30 mb-3">
                <BookOpen className="w-3.5 h-3.5 text-purple-300" />
                <span>Curriculum, Marking Schemes &amp; Patterns</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                Exam Syllabus &amp; Selection Schemes 2026
              </h1>
              <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
                Detailed subject-wise syllabus, question blueprints, negative marking rules, and official PDF downloads for all major competitive exams.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>Syllabus &amp; Exam Patterns</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900">
                {filteredSyllabus.length} Schemes
              </span>
            </h2>

            {searchQuery && (
              <span className="text-xs text-slate-500">
                Filtered by &quot;{searchQuery}&quot;
              </span>
            )}
          </div>

          {filteredSyllabus.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-xs space-y-3">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Syllabus Found</h3>
              <p className="text-xs text-slate-500">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSyllabus.map((sy) => (
                <SyllabusCard
                  key={sy.id}
                  item={sy}
                  onShare={(item) => handleSharePortalItem(item.title, item.organization.name, item.pdfUrl || item.officialWebsiteUrl)}
                />
              ))}
            </div>
          )}
        </main>
      )}

      {/* Detail Dossier Modal for Jobs */}
      <JobDetailModal
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
        onShare={handleShare}
      />

      {/* Free Alerts Subscription Modal */}
      <AlertSubscribeModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />

      {/* Bookmarks & Saved Alerts Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedJobs={savedJobsList}
        onSelectJob={(j) => {
          setSelectedJob(j);
          setIsBookmarksOpen(false);
        }}
        onRemove={handleToggleSave}
        onClearAll={handleClearAllBookmarks}
      />

      {/* Public Alert Submission Modal */}
      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        onAddJob={handleAddNewJob}
      />

      {/* Footer */}
      <Footer
        onOpenAlerts={() => setIsAlertModalOpen(true)}
        onFilterCategory={(cat: string) => {
          setSelectedCategory(cat);
          setActiveSection('JOBS');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
