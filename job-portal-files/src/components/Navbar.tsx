'use client';

import React from 'react';
import { Bell, Bookmark, Search, Send, PlusCircle, Ticket, Trophy, KeyRound, BookOpen } from 'lucide-react';
import { JobSector } from '../types/job';
import { PortalSection } from '../types/portal';

interface NavbarProps {
  activeSector: JobSector | 'ALL';
  onSectorChange: (sector: JobSector | 'ALL') => void;
  savedCount: number;
  onOpenBookmarks: () => void;
  onOpenAlerts: () => void;
  onOpenPostJob: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeSection?: PortalSection;
  onSectionChange?: (section: PortalSection) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSector,
  onSectorChange,
  savedCount,
  onOpenBookmarks,
  onOpenAlerts,
  onOpenPostJob,
  searchQuery,
  onSearchChange,
  activeSection = 'JOBS',
  onSectionChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Top Utility Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-[11px] py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <span>📢 Official Gazette 2026: UPSC, SSC CGL, Banking, Railways Admit Cards &amp; Results Declared</span>
          <div className="hidden md:flex items-center gap-4 text-[10px] uppercase font-bold tracking-wider">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Server Sync: Live</span>
            <span>All India Verified</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSectorChange('ALL');
                if (onSectionChange) onSectionChange('JOBS');
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
              aria-label="JobAlertHub Home"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center">
                  JobAlert<span className="text-blue-600">Hub</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-bold text-blue-600 block -mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Jobs • Admit Card • Result 2026
                </span>
              </div>
            </button>
          </div>

          {/* Quick Search bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="search-jobs-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search jobs, admit cards, results, syllabus..."
                className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Direct Section Links */}
          {onSectionChange && (
            <nav aria-label="Quick Sections" className="hidden xl:flex items-center gap-1 text-xs font-bold text-slate-700">
              <button
                onClick={() => onSectionChange('JOBS')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                  activeSection === 'JOBS' ? 'bg-blue-100 text-blue-800' : 'hover:bg-slate-100'
                }`}
              >
                Jobs
              </button>
              <button
                onClick={() => onSectionChange('ADMIT_CARD')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                  activeSection === 'ADMIT_CARD' ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-slate-100'
                }`}
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Admit Card</span>
              </button>
              <button
                onClick={() => onSectionChange('RESULT')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                  activeSection === 'RESULT' ? 'bg-emerald-100 text-emerald-800' : 'hover:bg-slate-100'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Result</span>
              </button>
              <button
                onClick={() => onSectionChange('ANSWER_KEY')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                  activeSection === 'ANSWER_KEY' ? 'bg-amber-100 text-amber-800' : 'hover:bg-slate-100'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Answer Key</span>
              </button>
              <button
                onClick={() => onSectionChange('SYLLABUS')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                  activeSection === 'SYLLABUS' ? 'bg-purple-100 text-purple-800' : 'hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Syllabus</span>
              </button>
            </nav>
          )}

          {/* Sector Switcher Pill Navigation */}
          <nav aria-label="Job Sector Navigation" className="hidden lg:flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl">
            <button
              onClick={() => onSectorChange('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSector === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onSectorChange('GOVERNMENT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                activeSector === 'GOVERNMENT'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏛️</span> Govt
            </button>
            <button
              onClick={() => onSectorChange('PRIVATE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                activeSector === 'PRIVATE'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>💼</span> Private
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              id="get-alerts-btn"
              onClick={onOpenAlerts}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Free Alerts</span>
              <span className="sm:hidden">Alerts</span>
            </button>

            <button
              id="saved-jobs-btn"
              onClick={onOpenBookmarks}
              className="relative p-2 text-slate-700 hover:text-blue-600 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors shadow-2xs"
              title="Saved Items"
              aria-label="Saved Items"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 min-w-4.5 h-4.5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              id="post-job-btn"
              onClick={onOpenPostJob}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post Job</span>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search jobs, admit cards, results, syllabus..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
