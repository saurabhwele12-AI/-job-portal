'use client';

import React from 'react';
import { KeyRound, Download, ExternalLink, Share2, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { AnswerKeyItem } from '../types/portal';

interface AnswerKeyCardProps {
  item: AnswerKeyItem;
  onShare: (item: AnswerKeyItem) => void;
}

export const AnswerKeyCard: React.FC<AnswerKeyCardProps> = ({ item, onShare }) => {
  const isObjectionOpen = item.status === 'OBJECTION_WINDOW_ACTIVE';

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all p-5 flex flex-col justify-between relative group">
      {/* Top accent */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${
        isObjectionOpen ? 'bg-amber-500 animate-pulse' : 'bg-blue-600'
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
                <span className="text-[11px] text-slate-500 font-medium">Exam Date: {item.examDate}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            {isObjectionOpen && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                OBJECTION WINDOW OPEN
              </span>
            )}
            {item.status === 'FINAL_KEY_OUT' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ✓ FINAL KEY FROZEN
              </span>
            )}
            {item.status === 'RELEASED' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                ✓ PROVISIONAL KEY OUT
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors mb-2 leading-snug">
          {item.title}
        </h3>

        {/* Objection Window Banner if active */}
        {item.objectionEndDate && (
          <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200 mb-3 space-y-1 text-xs text-slate-800">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> Objection Timeline:
              </span>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                Closes: {item.objectionEndDate}
              </span>
            </div>
            {item.objectionFeeNote && (
              <p className="text-[11px] text-amber-800 pt-0.5">
                ⚠️ <strong>Challenge Fee:</strong> {item.objectionFeeNote}
              </p>
            )}
          </div>
        )}

        {/* Summary */}
        <p className="text-xs text-slate-600 mb-4 line-clamp-2">
          {item.summary}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onShare(item)}
          className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 rounded-xl transition-colors"
          title="Share answer key"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {item.objectionUrl && isObjectionOpen && (
            <a
              href={item.objectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors border border-amber-300"
            >
              Raise Objection ↗
            </a>
          )}

          <a
            href={item.answerKeyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Download Answer Key</span>
          </a>
        </div>
      </div>
    </article>
  );
};
