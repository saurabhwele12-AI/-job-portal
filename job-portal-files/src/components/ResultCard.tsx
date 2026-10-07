'use client';

import React from 'react';
import { Award, Download, ExternalLink, Share2, Users, FileText, CheckCircle2 } from 'lucide-react';
import { ResultItem } from '../types/portal';

interface ResultCardProps {
  item: ResultItem;
  onShare: (item: ResultItem) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ item, onShare }) => {
  const isFinal = item.status === 'FINAL_RESULT';

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all p-5 flex flex-col justify-between relative group">
      {/* Top accent */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${
        isFinal ? 'bg-amber-500' : 'bg-emerald-600'
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
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Declared: {item.declarationDate}
                </span>
                {item.qualifiedCount && (
                  <span className="text-[11px] text-slate-600 font-semibold flex items-center gap-1">
                    <Users className="w-3 h-3 text-emerald-600" />
                    {item.qualifiedCount.toLocaleString()} Qualified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="shrink-0">
            {isFinal && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                🏆 FINAL SELECTION
              </span>
            )}
            {item.status === 'MERIT_LIST_OUT' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
                📋 MERIT LIST OUT
              </span>
            )}
            {item.status === 'SCORECARD_LIVE' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                🎯 SCORECARD LIVE
              </span>
            )}
            {item.status === 'DECLARED' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ✓ RESULT DECLARED
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 leading-snug">
          {item.title}
        </h3>

        {/* Exam Name & Summary */}
        <p className="text-xs text-slate-600 mb-3 line-clamp-2">
          {item.summary}
        </p>

        {/* Cut-off Marks Preview if available */}
        {item.cutoffPreview && (
          <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100 mb-4">
            <span className="text-[11px] font-bold text-emerald-900 block mb-1.5 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" /> Category-wise Cut-off Marks:
            </span>
            <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
              {item.cutoffPreview.UR && (
                <div className="bg-white p-1.5 rounded-lg border border-emerald-200 shadow-2xs">
                  <span className="block text-[10px] text-slate-500 font-bold">UR</span>
                  <span className="font-extrabold text-slate-900">{item.cutoffPreview.UR}</span>
                </div>
              )}
              {item.cutoffPreview.OBC && (
                <div className="bg-white p-1.5 rounded-lg border border-emerald-200 shadow-2xs">
                  <span className="block text-[10px] text-slate-500 font-bold">OBC</span>
                  <span className="font-extrabold text-slate-900">{item.cutoffPreview.OBC}</span>
                </div>
              )}
              {item.cutoffPreview.EWS && (
                <div className="bg-white p-1.5 rounded-lg border border-emerald-200 shadow-2xs">
                  <span className="block text-[10px] text-slate-500 font-bold">EWS</span>
                  <span className="font-extrabold text-slate-900">{item.cutoffPreview.EWS}</span>
                </div>
              )}
              {item.cutoffPreview.SC && (
                <div className="bg-white p-1.5 rounded-lg border border-emerald-200 shadow-2xs">
                  <span className="block text-[10px] text-slate-500 font-bold">SC</span>
                  <span className="font-extrabold text-slate-900">{item.cutoffPreview.SC}</span>
                </div>
              )}
              {item.cutoffPreview.ST && (
                <div className="bg-white p-1.5 rounded-lg border border-emerald-200 shadow-2xs">
                  <span className="block text-[10px] text-slate-500 font-bold">ST</span>
                  <span className="font-extrabold text-slate-900">{item.cutoffPreview.ST}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onShare(item)}
          className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 border border-slate-200 rounded-xl transition-colors"
          title="Share result"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {item.cutoffUrl && (
            <a
              href={item.cutoffUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            >
              Cut-off PDF ↗
            </a>
          )}

          <a
            href={item.resultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Check Result &amp; PDF</span>
          </a>
        </div>
      </div>
    </article>
  );
};
