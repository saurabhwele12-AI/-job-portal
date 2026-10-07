'use client';

import React from 'react';
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  ArrowUpRight, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  ShieldCheck, 
  Briefcase, 
  Share2 
} from 'lucide-react';
import { JobNotification } from '../types/job';

interface JobCardProps {
  job: JobNotification;
  isSaved: boolean;
  onToggleSave: (job: JobNotification) => void;
  onSelectJob: (job: JobNotification) => void;
  onShare: (job: JobNotification) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onToggleSave,
  onSelectJob,
  onShare,
}) => {
  const isGovt = job.sector === 'GOVERNMENT';
  const isUrgent = job.importantDates.daysRemaining <= 3;

  return (
    <article 
      className={`bg-white rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 relative group border ${
        isUrgent ? 'border-red-300 shadow-xs' : 'border-slate-200 shadow-2xs hover:border-blue-500 hover:shadow-md'
      }`}
    >
      {/* Top sector stripe */}
      <div 
        className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${
          isGovt ? 'bg-blue-600' : 'bg-emerald-600'
        }`} 
      />

      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          
          <div className="flex items-center gap-3">
            {/* Org Logo Monogram */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-xs text-sm shrink-0 ${job.organization.badgeColor}`}>
              {job.organization.logoText}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-800">
                  {job.organization.name}
                </span>
                {job.organization.verified && (
                  <span title="Verified Official Notification">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  isGovt ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}>
                  {isGovt ? '🏛️ Govt Exam' : '💼 Private & Tech'}
                </span>
                {job.state && (
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    📍 {job.state}
                  </span>
                )}
                <span className="text-[11px] text-slate-500 font-medium">
                  {job.category}
                </span>
              </div>
            </div>
          </div>

          {/* Bookmark & Share */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onShare(job)}
              className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              title="Share Job"
              aria-label="Share Job"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleSave(job)}
              className={`p-1.5 rounded-lg transition-colors ${
                isSaved ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save for later'}
              aria-label="Save Job"
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-blue-600" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Job Title */}
        <h3 
          onClick={() => onSelectJob(job)}
          className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-snug mb-3"
        >
          {job.title}
        </h3>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 mb-3 bg-blue-50/40 p-3 rounded-xl border border-blue-100">
          
          {/* Vacancies / Salary */}
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate font-semibold text-slate-900">
              {isGovt ? `${job.totalVacancies.toLocaleString()} Posts` : job.compensation.salaryOrPayScale}
            </span>
          </div>

          {/* Location / Work Mode */}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate text-slate-700">
              {job.workMode ? `${job.workMode}` : job.location}
            </span>
          </div>

          {/* Qualification */}
          <div className="flex items-center gap-1.5 col-span-2 pt-1 border-t border-blue-100/60">
            <GraduationCap className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span className="truncate text-[11px] text-slate-700 font-medium">
              {job.eligibility?.education?.[0] || 'Graduation / Relevant Degree'}
            </span>
          </div>

        </div>

        {/* Skills for Private roles */}
        {!isGovt && Array.isArray(job.eligibility?.skills) && job.eligibility.skills.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-4">
            {job.eligibility.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                {skill}
              </span>
            ))}
            {job.eligibility.skills.length > 3 && (
              <span className="text-[10px] text-slate-500 font-medium">+{job.eligibility.skills.length - 3} more</span>
            )}
          </div>
        )}

        {/* Govt specific age & fee summary */}
        {isGovt && (
          <div className="flex items-center justify-between text-[11px] text-slate-600 mb-4 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <span>Age Limit: <strong className="text-slate-900">{job.eligibility.minAge} - {job.eligibility.maxAge} Yrs</strong></span>
            <span>Fee: <strong className="text-blue-700 font-bold">{job.compensation.applicationFeeGeneral ? `₹${job.compensation.applicationFeeGeneral}` : 'Free'}</strong></span>
          </div>
        )}

      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        
        {/* Deadline Countdown */}
        <div className="flex items-center gap-1.5 text-xs">
          <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'text-red-600' : 'text-slate-500'}`} />
          <div className="text-[11px]">
            <span className="text-slate-500 block -mb-0.5">Last Date</span>
            <span className={`font-bold ${isUrgent ? 'text-red-600' : 'text-slate-800'}`}>
              {job.importantDates.applyEndDate} ({job.importantDates.daysRemaining}d left)
            </span>
          </div>
        </div>

        {/* Public Candidate Action Button */}
        <button
          onClick={() => onSelectJob(job)}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors hover:gap-1.5"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </article>
  );
};
