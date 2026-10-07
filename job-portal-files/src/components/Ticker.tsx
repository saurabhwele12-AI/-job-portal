'use client';

import React from 'react';
import { Flame, Clock } from 'lucide-react';
import { JobNotification } from '../types/job';

interface TickerProps {
  jobs: JobNotification[];
  onSelectJob: (job: JobNotification) => void;
}

export const Ticker: React.FC<TickerProps> = ({ jobs, onSelectJob }) => {
  const highlightJobs = jobs.filter(j => j.status === 'CLOSING_SOON' || j.isTrending || j.isNewToday);

  return (
    <div className="w-full bg-blue-50/80 border-b border-blue-200 overflow-hidden py-2 px-3 text-xs flex items-center">
      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-red-600 text-white font-bold tracking-wide uppercase text-[10px] shrink-0 mr-3 shadow-2xs">
        <Flame className="w-3 h-3" />
        <span>Urgent Alerts</span>
      </div>

      <div className="overflow-hidden relative w-full">
        <div className="animate-marquee flex items-center gap-8 text-slate-700">
          {highlightJobs.concat(highlightJobs).map((job, idx) => (
            <button
              key={`${job.id}-${idx}`}
              onClick={() => onSelectJob(job)}
              className="flex items-center gap-2 hover:text-blue-700 transition-colors cursor-pointer group whitespace-nowrap"
            >
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                job.sector === 'GOVERNMENT' ? 'bg-blue-200 text-blue-900' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {job.organization.shortName}
              </span>
              <span className="font-semibold text-slate-800 group-hover:text-blue-600 group-hover:underline">
                {job.title}
              </span>
              {job.importantDates.daysRemaining <= 3 && (
                <span className="inline-flex items-center gap-1 text-[10px] text-red-700 font-bold bg-red-100 px-1.5 py-0.5 rounded border border-red-200">
                  <Clock className="w-2.5 h-2.5" /> Closes in {job.importantDates.daysRemaining}d
                </span>
              )}
              <span className="text-slate-400 font-light">|</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
