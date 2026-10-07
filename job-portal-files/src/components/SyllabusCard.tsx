'use client';

import React from 'react';
import { BookOpen, Download, ExternalLink, Share2, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { SyllabusItem } from '../types/portal';

interface SyllabusCardProps {
  item: SyllabusItem;
  onShare: (item: SyllabusItem) => void;
}

export const SyllabusCard: React.FC<SyllabusCardProps> = ({ item, onShare }) => {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-purple-400 transition-all p-5 flex flex-col justify-between relative group">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-purple-600" />

      <div>
        {/* Header Org & Pattern Year */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-xs text-sm shrink-0 ${item.organization.badgeColor}`}>
              {item.organization.logoText}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800">{item.organization.name}</span>
              <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                <span className="text-[11px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                  {item.updatedYear}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Scheme: {item.examName}</span>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200 shrink-0">
            📚 SYLLABUS &amp; PATTERN
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors mb-2 leading-snug">
          {item.title}
        </h3>

        {/* Exam Pattern Grid */}
        <div className="bg-purple-50/50 rounded-xl p-3 border border-purple-100 mb-3 space-y-2 text-xs text-slate-700">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div>
              <span className="text-[10px] text-slate-500 block font-medium">Total Marks:</span>
              <span className="font-extrabold text-slate-900 text-sm">
                {item.examPattern?.totalMarks ?? item.totalMarks ?? 'Check PDF'} Marks
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block font-medium">Duration:</span>
              <span className="font-semibold text-slate-800">
                {item.examPattern?.duration ?? (item.durationMinutes ? `${item.durationMinutes} Mins` : 'Standard')}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-500 block font-medium">Marking / Negative:</span>
              <span className="font-semibold text-rose-700 line-clamp-1">
                {item.examPattern?.negativeMarking ?? (item.markingScheme ? '1/4 Negative Marking' : 'Norms apply')}
              </span>
            </div>
          </div>

          {/* Stages or Sections */}
          {(item.examPattern?.stages || item.sections) && (
            <div className="pt-2 border-t border-purple-100 flex items-center gap-1.5 flex-wrap text-[11px]">
              <Layers className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="font-bold text-slate-800">Sections / Stages:</span>
              {(item.examPattern?.stages || item.sections?.map(s => s.name) || []).slice(0, 3).map((stg, i) => (
                <span key={i} className="bg-white px-2 py-0.5 rounded border border-purple-200 text-purple-900 font-medium truncate max-w-[200px]">
                  {stg}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Topics highlights */}
        {((item.topicsSummary && item.topicsSummary.length > 0) || (item.sections && item.sections.length > 0)) && (
          <div className="space-y-1 mb-4 text-[11px] text-slate-600">
            <span className="font-bold text-slate-800 block text-xs mb-1">Key Curriculum / Papers:</span>
            {(item.topicsSummary || item.sections?.map(s => `${s.name}${s.marks ? ` (${s.marks} Marks)` : ''}`) || []).slice(0, 2).map((tpc, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <p className="line-clamp-2">{typeof tpc === 'string' ? tpc : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onShare(item)}
          className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 border border-slate-200 rounded-xl transition-colors"
          title="Share syllabus"
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
            Official Portal ↗
          </a>

          {item.pdfUrl ? (
            <a
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Syllabus PDF</span>
            </a>
          ) : (
            <a
              href={item.officialWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>View Exam Scheme</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
