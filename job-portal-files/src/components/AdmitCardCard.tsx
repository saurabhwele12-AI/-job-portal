'use client';

import React from 'react';
import { Download, Calendar, ExternalLink, Share2, ShieldCheck, Clock, AlertCircle } from 'lucide-react';
import { AdmitCardItem } from '../types/portal';

interface AdmitCardCardProps {
  item: AdmitCardItem;
  onShare: (item: AdmitCardItem) => void;
}

export const AdmitCardCard: React.FC<AdmitCardCardProps> = ({ item, onShare }) => {
  const isOutToday = item.status === 'OUT_TODAY';
  const isReleased = item.status === 'RELEASED';

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-400 transition-all p-5 flex flex-col justify-between relative group">
      {/* Top accent */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${
        isOutToday ? 'bg-rose-500 animate-pulse' : 'bg-indigo-600'
      }`} />

      <div>
        {/* Header Org & Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-xs text-sm shrink-0 ${item.organization.badgeColor}`}>
              {item.organization.logoText}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800">{item.organization.name}</span>
              <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Released: {item.releaseDate}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            {isOutToday && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                OUT TODAY
              </span>
            )}
            {isReleased && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ✓ RELEASED
              </span>
            )}
            {item.status === 'EXPECTED_SOON' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                <Clock className="w-3 h-3" /> EXPECTED SOON
              </span>
            )}
            {item.status === 'POSTPONED' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                POSTPONED
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
          {item.title}
        </h3>

        {/* Exam Date Box */}
        <div className="bg-indigo-50/60 rounded-xl p-3 border border-indigo-100 mb-3 space-y-1.5 text-xs text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Exam Date: <span className="text-indigo-900 font-bold">{item.examDate}</span></span>
          </div>
          <p className="text-[11px] text-slate-600 pl-6">
            <strong>Exam Scheme:</strong> {item.examName}
          </p>
        </div>

        {/* Instructions */}
        {item.instructions && (
          <div className="flex items-start gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
            <p className="line-clamp-2">{item.instructions}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onShare(item)}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 rounded-xl transition-colors"
          title="Share admit card link"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <a
            href={item.officialWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
          >
            Portal ↗
          </a>

          <a
            href={item.admitCardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Admit Card</span>
          </a>
        </div>
      </div>
    </article>
  );
};
