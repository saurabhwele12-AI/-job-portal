'use client';

import React from 'react';
import { 
  Building2, 
  GraduationCap, 
  Clock, 
  Briefcase, 
  Laptop, 
  Search,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { JobSector } from '../types/job';

interface FilterHeroProps {
  activeSector: JobSector | 'ALL';
  onSectorChange: (sector: JobSector | 'ALL') => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedQualification: string;
  onQualificationChange: (qual: string) => void;
  filterClosingSoon: boolean;
  onToggleClosingSoon: () => void;
  workModeFilter: string;
  onWorkModeChange: (mode: string) => void;
  govtCount: number;
  privateCount: number;
  totalCount: number;
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

const QUALIFICATIONS = [
  'All Degrees',
  '10th / 12th Pass',
  'Any Graduate',
  'B.Tech / B.E',
  'Fresher Eligible'
];

export const FilterHero: React.FC<FilterHeroProps> = ({
  activeSector,
  onSectorChange,
  selectedCategory,
  onCategoryChange,
  selectedQualification,
  onQualificationChange,
  filterClosingSoon,
  onToggleClosingSoon,
  workModeFilter,
  onWorkModeChange,
  govtCount,
  privateCount,
  totalCount,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <section className="bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200 pt-8 pb-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SEO Header & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3 border border-blue-200">
            <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Updated Hourly with Official Gazettes &amp; Career Portals</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Latest Job Notifications &amp; <span className="text-blue-600">Sarkari Alerts 2026</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Find active Government exam announcements (SSC, Banking, Railways, UPSC) and verified Private Tech careers. Check exact eligibility, age limit, application fee matrix, and official apply links.
          </p>
        </div>

        {/* Big Prominent Center Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative shadow-md rounded-2xl bg-white border-2 border-blue-600 p-1 flex items-center">
            <Search className="w-5 h-5 text-blue-600 ml-3 shrink-0" />
            <input
              id="hero-main-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by job title, department (e.g. SBI, SSC, ISRO, Google), qualification..."
              className="w-full pl-3 pr-4 py-2.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="mr-3 text-xs text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => {}}
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
            >
              Search Jobs
            </button>
          </div>

          {/* Popular Quick Search Chips */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-xs mt-3">
            <span className="text-slate-500 font-semibold flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular:
            </span>
            {['SSC CGL', 'SBI Bank', 'Railways RRB', 'ISRO', 'Google', 'Fresher'].map((tag) => (
              <button
                key={tag}
                onClick={() => onSearchChange(searchQuery === tag ? '' : tag)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 shadow-2xs'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Master Sector Switcher Tabs in Blue & White - Pure Public Visitor UX */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 bg-white border border-slate-300 rounded-2xl shadow-xs">
            <button
              onClick={() => onSectorChange('ALL')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSector === 'ALL'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>All Openings</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeSector === 'ALL' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {totalCount}
              </span>
            </button>

            <button
              onClick={() => onSectorChange('GOVERNMENT')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSector === 'GOVERNMENT'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50/60'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Government Jobs</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeSector === 'GOVERNMENT' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800'}`}>
                {govtCount}
              </span>
            </button>

            <button
              onClick={() => onSectorChange('PRIVATE')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSector === 'PRIVATE'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50/60'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Private &amp; Tech</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${activeSector === 'PRIVATE' ? 'bg-blue-700 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                {privateCount}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Filter Badges (Degree & Deadlines) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
            
            {/* Qualification Filter Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mr-1">
                <GraduationCap className="w-4 h-4 text-blue-600" /> Filter by Degree:
              </span>
              {QUALIFICATIONS.map((qual) => (
                <button
                  key={qual}
                  onClick={() => onQualificationChange(qual === 'All Degrees' ? '' : qual)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    (selectedQualification === qual || (qual === 'All Degrees' && !selectedQualification))
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200'
                  }`}
                >
                  {qual}
                </button>
              ))}
            </div>

            {/* Quick Action Toggles */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onToggleClosingSoon}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  filterClosingSoon
                    ? 'bg-red-600 text-white border-red-600 shadow-2xs'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-red-500 hover:text-red-600'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Closing Soon (&le;3 Days)</span>
              </button>

              {activeSector !== 'GOVERNMENT' && (
                <button
                  onClick={() => onWorkModeChange(workModeFilter === 'REMOTE' ? '' : 'REMOTE')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    workModeFilter === 'REMOTE'
                      ? 'bg-blue-700 text-white border-blue-700 shadow-2xs'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5 text-blue-600" />
                  <span>Remote Only</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
