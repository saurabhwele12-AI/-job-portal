'use client';

import React from 'react';
import { 
  X, 
  Trash2, 
  BookmarkCheck, 
  Clock, 
  ArrowUpRight
} from 'lucide-react';
import { JobNotification } from '../types/job';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedJobs: JobNotification[];
  onRemove: (job: JobNotification) => void;
  onSelectJob: (job: JobNotification) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedJobs,
  onRemove,
  onSelectJob,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <BookmarkCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Saved Job Notifications</h2>
                <span className="text-xs text-slate-500 font-medium">{savedJobs.length} bookmarked alerts</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {savedJobs.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-red-600 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 font-semibold"
                  title="Clear all bookmarks"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List of saved jobs */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {savedJobs.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <BookmarkCheck className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
                <p className="text-sm font-bold text-slate-700">No jobs saved yet.</p>
                <p className="text-xs max-w-xs mx-auto text-slate-500">
                  Click the bookmark icon on any job card to save it and track application deadlines easily.
                </p>
              </div>
            ) : (
              savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2 hover:border-blue-500 transition-colors shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-blue-100 text-blue-800">
                      {job.organization.shortName}
                    </span>
                    <button
                      onClick={() => onRemove(job)}
                      className="text-slate-400 hover:text-red-600 p-1"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3
                    onClick={() => {
                      onSelectJob(job);
                      onClose();
                    }}
                    className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-2"
                  >
                    {job.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-500" />
                      <span>Last Date: <strong>{job.importantDates.applyEndDate}</strong></span>
                    </span>

                    <button
                      onClick={() => {
                        onSelectJob(job);
                        onClose();
                      }}
                      className="text-blue-600 hover:underline flex items-center gap-0.5 font-bold"
                    >
                      <span>View</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="p-4 bg-white border-t border-slate-200 text-[11px] text-slate-500 text-center">
            Saved jobs are preserved locally in your browser storage.
          </div>

        </div>
      </div>
    </div>
  );
};
