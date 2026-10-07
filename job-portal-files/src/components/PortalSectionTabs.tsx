'use client';

import React from 'react';
import { Briefcase, Ticket, Trophy, KeyRound, BookOpen, Sparkles } from 'lucide-react';
import { PortalSection } from '../types/portal';

interface PortalSectionTabsProps {
  activeSection: PortalSection;
  onSectionChange: (section: PortalSection) => void;
  counts: {
    jobs: number;
    admitCards: number;
    results: number;
    answerKeys: number;
    syllabus: number;
  };
}

export const PortalSectionTabs: React.FC<PortalSectionTabsProps> = ({
  activeSection,
  onSectionChange,
  counts,
}) => {
  const tabs: {
    id: PortalSection;
    label: string;
    icon: React.ReactNode;
    count: number;
    badge?: string;
    activeColor: string;
  }[] = [
    {
      id: 'JOBS',
      label: 'Latest Job Alerts',
      icon: <Briefcase className="w-4 h-4" />,
      count: counts.jobs,
      badge: 'Active Feed',
      activeColor: 'bg-blue-600 text-white shadow-blue-500/25',
    },
    {
      id: 'ADMIT_CARD',
      label: 'Admit Card / Hall Ticket',
      icon: <Ticket className="w-4 h-4" />,
      count: counts.admitCards,
      badge: 'Out Today',
      activeColor: 'bg-indigo-600 text-white shadow-indigo-500/25',
    },
    {
      id: 'RESULT',
      label: 'Results & Cut-offs',
      icon: <Trophy className="w-4 h-4" />,
      count: counts.results,
      badge: 'Declared',
      activeColor: 'bg-emerald-600 text-white shadow-emerald-500/25',
    },
    {
      id: 'ANSWER_KEY',
      label: 'Answer Key & Objections',
      icon: <KeyRound className="w-4 h-4" />,
      count: counts.answerKeys,
      badge: 'Window Open',
      activeColor: 'bg-amber-600 text-white shadow-amber-500/25',
    },
    {
      id: 'SYLLABUS',
      label: 'Syllabus & Pattern',
      icon: <BookOpen className="w-4 h-4" />,
      count: counts.syllabus,
      badge: '2026 Schemes',
      activeColor: 'bg-purple-600 text-white shadow-purple-500/25',
    },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSectionChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? `${tab.activeColor} shadow-md`
                    : 'text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-600'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
