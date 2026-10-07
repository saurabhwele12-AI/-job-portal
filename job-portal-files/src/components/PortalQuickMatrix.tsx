'use client';

import React from 'react';
import { Ticket, Trophy, KeyRound, BookOpen, ArrowRight, Flame } from 'lucide-react';
import { AdmitCardItem, ResultItem, AnswerKeyItem, SyllabusItem, PortalSection } from '../types/portal';

interface PortalQuickMatrixProps {
  admitCards: AdmitCardItem[];
  results: ResultItem[];
  answerKeys: AnswerKeyItem[];
  syllabus: SyllabusItem[];
  onSelectSection: (section: PortalSection) => void;
}

export const PortalQuickMatrix: React.FC<PortalQuickMatrixProps> = ({
  admitCards,
  results,
  answerKeys,
  syllabus,
  onSelectSection,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Exam Lifecycle Quick Desk 2026
            </h2>
            <p className="text-xs text-slate-500">Fast access to current admit cards, declared results, objection keys &amp; syllabus</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Column 1: Admit Cards */}
        <div className="bg-white rounded-2xl border border-indigo-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="bg-indigo-600 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider">Admit Card 2026</h3>
            </div>
            <span className="text-[10px] bg-white/20 font-bold px-2 py-0.5 rounded-full">
              {admitCards.length} Live
            </span>
          </div>

          <div className="p-3 divide-y divide-slate-100 flex-1 space-y-2">
            {admitCards.slice(0, 4).map((ac) => (
              <a
                key={ac.id}
                href={ac.admitCardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block pt-2 group"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-indigo-700 mb-0.5">
                  <span>{ac.organization.shortName}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{ac.examDate.substring(0, 12)}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                  {ac.title}
                </p>
              </a>
            ))}
          </div>

          <button
            onClick={() => onSelectSection('ADMIT_CARD')}
            className="w-full py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-extrabold flex items-center justify-center gap-1 transition-colors border-t border-indigo-100"
          >
            <span>View All Admit Cards ({admitCards.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Column 2: Results */}
        <div className="bg-white rounded-2xl border border-emerald-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="bg-emerald-600 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider">Results &amp; Cut-offs</h3>
            </div>
            <span className="text-[10px] bg-white/20 font-bold px-2 py-0.5 rounded-full">
              {results.length} Declared
            </span>
          </div>

          <div className="p-3 divide-y divide-slate-100 flex-1 space-y-2">
            {results.slice(0, 4).map((res) => (
              <a
                key={res.id}
                href={res.resultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block pt-2 group"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-emerald-700 mb-0.5">
                  <span>{res.organization.shortName}</span>
                  <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-50 px-1.5 rounded">
                    {res.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                  {res.title}
                </p>
              </a>
            ))}
          </div>

          <button
            onClick={() => onSelectSection('RESULT')}
            className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center justify-center gap-1 transition-colors border-t border-emerald-100"
          >
            <span>View All Exam Results ({results.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Column 3: Answer Keys */}
        <div className="bg-white rounded-2xl border border-amber-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="bg-amber-600 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider">Answer Key &amp; Challenge</h3>
            </div>
            <span className="text-[10px] bg-white/20 font-bold px-2 py-0.5 rounded-full">
              {answerKeys.length} Active
            </span>
          </div>

          <div className="p-3 divide-y divide-slate-100 flex-1 space-y-2">
            {answerKeys.slice(0, 4).map((ak) => (
              <a
                key={ak.id}
                href={ak.answerKeyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block pt-2 group"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 mb-0.5">
                  <span>{ak.organization.shortName}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{ak.releaseDate}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 group-hover:text-amber-800 transition-colors line-clamp-2 leading-snug">
                  {ak.title}
                </p>
              </a>
            ))}
          </div>

          <button
            onClick={() => onSelectSection('ANSWER_KEY')}
            className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-extrabold flex items-center justify-center gap-1 transition-colors border-t border-amber-100"
          >
            <span>View All Answer Keys ({answerKeys.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Column 4: Syllabus */}
        <div className="bg-white rounded-2xl border border-purple-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="bg-purple-600 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <h3 className="font-extrabold text-xs uppercase tracking-wider">Syllabus &amp; Pattern</h3>
            </div>
            <span className="text-[10px] bg-white/20 font-bold px-2 py-0.5 rounded-full">
              {syllabus.length} Patterns
            </span>
          </div>

          <div className="p-3 divide-y divide-slate-100 flex-1 space-y-2">
            {syllabus.slice(0, 4).map((sy) => (
              <a
                key={sy.id}
                href={sy.pdfUrl || sy.officialWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block pt-2 group"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-purple-700 mb-0.5">
                  <span>{sy.organization.shortName}</span>
                  <span className="text-[10px] text-purple-800 font-semibold">{sy.examPattern?.totalMarks ? `${sy.examPattern.totalMarks} Mks` : 'Full Details'}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug">
                  {sy.title}
                </p>
              </a>
            ))}
          </div>

          <button
            onClick={() => onSelectSection('SYLLABUS')}
            className="w-full py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-extrabold flex items-center justify-center gap-1 transition-colors border-t border-purple-100"
          >
            <span>View All Syllabus Patterns ({syllabus.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
