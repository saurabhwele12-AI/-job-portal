'use client';

import React from 'react';
import { Clock, Zap, ArrowRight, AlertTriangle, Sparkles, Building2 } from 'lucide-react';
import { JobNotification } from '../types/job';

interface FreeJobAlertLiveBoxProps {
  jobs: JobNotification[];
  onSelectJob: (job: JobNotification) => void;
}

export function FreeJobAlertLiveBox({ jobs, onSelectJob }: FreeJobAlertLiveBoxProps) {
  // 1. Closing soon jobs (sorted by least days remaining)
  const closingSoonJobs = [...jobs]
    .filter((j) => (j.importantDates?.daysRemaining ?? 99) <= 7)
    .sort((a, b) => (a.importantDates?.daysRemaining ?? 99) - (b.importantDates?.daysRemaining ?? 99))
    .slice(0, 5);

  // 2. Today's live updates (flagged isNewToday or top 5)
  const todayUpdates = [...jobs]
    .filter((j) => j.isNewToday)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* PANEL 1: CLOSING SOON (LAST CHANCE) */}
        <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-red-200/80 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-red-600 text-white flex items-center justify-center">
                  <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
                </span>
                <div>
                  <h3 className="text-sm font-black text-red-950 uppercase tracking-wide flex items-center gap-2">
                    <span>Closing Soon (Last Chance to Apply)</span>
                    <span className="text-[10px] bg-red-600 text-white font-extrabold px-1.5 py-0.2 rounded-full">
                      URGENT
                    </span>
                  </h3>
                  <p className="text-[11px] text-red-800">
                    Online application windows ending within next few days
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {closingSoonJobs.map((job) => {
                const days = job.importantDates?.daysRemaining ?? 0;
                const isToday = days <= 1;

                return (
                  <div
                    key={job.id}
                    onClick={() => onSelectJob(job)}
                    className="cursor-pointer bg-white p-2.5 rounded-xl border border-red-100 hover:border-red-400 hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md shrink-0 ${
                          isToday
                            ? 'bg-red-600 text-white animate-pulse'
                            : days <= 3
                            ? 'bg-amber-500 text-white'
                            : 'bg-orange-100 text-orange-900 font-bold'
                        }`}
                      >
                        {isToday ? 'Ends Today!' : `${days} Days Left`}
                      </span>

                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 group-hover:text-red-700 truncate transition-colors">
                          {job.title}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {job.organization.name} • {job.totalVacancies.toLocaleString()} Posts • Last Date: {job.importantDates?.applyEndDate}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-2 text-[11px] text-red-700/80 font-medium flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>Do not wait for server slowdown on last day. Complete fees now.</span>
          </div>
        </div>

        {/* PANEL 2: TODAY'S LIVE UPDATES */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-200/80 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-black text-emerald-950 uppercase tracking-wide flex items-center gap-2">
                    <span>Today Updates LIVE (2026)</span>
                    <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.2 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      ACTIVE NOW
                    </span>
                  </h3>
                  <p className="text-[11px] text-emerald-800">
                    Freshly notified government jobs & state recruitments
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {todayUpdates.map((job) => (
                <div
                  key={job.id}
                  onClick={() => onSelectJob(job)}
                  className="cursor-pointer bg-white p-2.5 rounded-xl border border-emerald-100 hover:border-emerald-400 hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 shrink-0 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                      NEW
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs font-black text-slate-900 group-hover:text-emerald-700 truncate transition-colors">
                        {job.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {job.organization.name} • {job.totalVacancies.toLocaleString()} Posts • {job.location}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 text-[11px] text-emerald-800 font-medium flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>All official notifications checked & verified from respective government portals.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
