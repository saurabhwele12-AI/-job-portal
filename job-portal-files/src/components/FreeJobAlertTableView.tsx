'use client';

import React from 'react';
import { 
  Building2, 
  ExternalLink, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  Eye, 
  GraduationCap, 
  MapPin, 
  Share2 
} from 'lucide-react';
import { JobNotification } from '../types/job';

interface FreeJobAlertTableViewProps {
  jobs: JobNotification[];
  savedJobIds: string[];
  onToggleSave: (job: JobNotification) => void;
  onSelectJob: (job: JobNotification) => void;
  onShare: (job: JobNotification) => void;
}

export function FreeJobAlertTableView({
  jobs,
  savedJobIds,
  onToggleSave,
  onSelectJob,
  onShare,
}: FreeJobAlertTableViewProps) {
  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-xs">
        <p className="text-slate-500 font-medium text-sm">No notifications found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Header info */}
      <div className="bg-slate-900 text-white px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-xs font-black uppercase tracking-wider text-slate-100">
            FreeJobAlert Official Vacancies Table
          </span>
          <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
            {jobs.length} Active Records
          </span>
        </div>
        <p className="text-[11px] text-slate-400">
          Click any row to open the full syllabus, age limit, fee & notification PDF breakdown
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-800 text-[11px] font-black uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-4 w-28">Post Date</th>
              <th className="py-3 px-4 w-44">Recruitment Board</th>
              <th className="py-3 px-4 min-w-[240px]">Post Name & Vacancies</th>
              <th className="py-3 px-4 min-w-[180px]">Qualification</th>
              <th className="py-3 px-4 w-36">Last Date</th>
              <th className="py-3 px-4 w-40 text-right">Action / Apply</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {jobs.map((job, idx) => {
              const isSaved = savedJobIds.includes(job.id);
              const daysRemaining = job.importantDates?.daysRemaining ?? 99;
              const isUrgent = daysRemaining <= 3;
              const isGovt = job.sector === 'GOVERNMENT';
              const eduText = Array.isArray(job.eligibility?.education)
                ? job.eligibility.education.join(', ')
                : 'Check Official Notification';

              return (
                <tr
                  key={job.id}
                  className={`hover:bg-blue-50/60 transition-colors cursor-pointer group ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  }`}
                  onClick={() => onSelectJob(job)}
                >
                  {/* Col 1: Post Date */}
                  <td className="py-3.5 px-4 align-top">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700">
                        {job.importantDates?.notificationDate || 'Active'}
                      </span>
                      {job.isNewToday && (
                        <span className="inline-block mt-1 text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded border border-emerald-300 w-max">
                          NEW
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Col 2: Recruitment Board */}
                  <td className="py-3.5 px-4 align-top">
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 shadow-2xs ${
                          job.organization?.badgeColor || (isGovt ? 'bg-blue-700' : 'bg-emerald-600')
                        }`}
                      >
                        {job.organization?.logoText || 'ORG'}
                      </div>
                      <div className="min-w-0">
                        <span className="font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors block leading-tight">
                          {job.organization?.shortName || job.organization?.name}
                        </span>
                        <span className="text-[10px] text-slate-500 line-clamp-1">
                          {job.state ? `${job.state} State` : job.location || 'All India'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Col 3: Post Name & Vacancies */}
                  <td className="py-3.5 px-4 align-top">
                    <div>
                      <h4 className="font-extrabold text-slate-900 group-hover:text-blue-700 text-xs sm:text-[13px] leading-snug transition-colors">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                          {job.totalVacancies > 0
                            ? `${job.totalVacancies.toLocaleString()} Posts`
                            : 'Various Posts'}
                        </span>
                        {job.category && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded border border-slate-200">
                            {job.category}
                          </span>
                        )}
                        {job.compensation?.salaryOrPayScale && (
                          <span className="text-[10px] text-slate-500 font-medium hidden md:inline">
                            Pay: {job.compensation.salaryOrPayScale}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Col 4: Qualification */}
                  <td className="py-3.5 px-4 align-top">
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2 text-xs font-medium leading-tight">
                        {eduText}
                      </span>
                    </div>
                  </td>

                  {/* Col 5: Last Date */}
                  <td className="py-3.5 px-4 align-top">
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">
                        {job.importantDates?.applyEndDate || 'See Notice'}
                      </span>
                      {daysRemaining !== undefined && (
                        <span
                          className={`inline-block mt-1 text-[10px] font-black px-1.5 py-0.2 rounded ${
                            isUrgent
                              ? 'bg-red-100 text-red-700 font-extrabold animate-pulse'
                              : 'bg-slate-100 text-slate-600 font-semibold'
                          }`}
                        >
                          {daysRemaining <= 0
                            ? 'Ends Today!'
                            : `${daysRemaining} days left`}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Col 6: Action */}
                  <td
                    className="py-3.5 px-4 align-top text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Save Bookmark */}
                      <button
                        onClick={() => onToggleSave(job)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved
                            ? 'bg-amber-50 text-amber-600 border-amber-300'
                            : 'bg-white text-slate-400 hover:text-slate-700 border-slate-200'
                        }`}
                        title={isSaved ? 'Remove Bookmark' : 'Save Notification'}
                      >
                        {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>

                      {/* Share */}
                      <button
                        onClick={() => onShare(job)}
                        className="p-1.5 rounded-lg bg-white text-slate-400 hover:text-slate-700 border border-slate-200 transition-colors"
                        title="Share Notification"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      {/* View Details modal button */}
                      <button
                        onClick={() => onSelectJob(job)}
                        className="inline-flex items-center gap-1 bg-blue-700 hover:bg-blue-800 text-white font-extrabold px-2.5 py-1.5 rounded-lg shadow-2xs text-[11px] transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Details</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="bg-slate-50 border-t border-slate-200 px-5 py-2.5 flex items-center justify-between text-[11px] text-slate-500">
        <span>Displaying latest verified notifications • FreeJobAlert Format</span>
        <span>Updated Today for 2026 Recruitment Cycle</span>
      </div>
    </div>
  );
}
