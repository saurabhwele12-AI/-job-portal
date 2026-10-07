'use client';

import React from 'react';
import { 
  GraduationCap, 
  Award, 
  BookCheck, 
  Wrench, 
  Cpu, 
  Briefcase, 
  Building,
  CheckCircle2
} from 'lucide-react';

export interface EduCategory {
  id: string;
  name: string;
  subText: string;
  defaultVacancies: string;
  filterKey: string;
  icon: any;
  color: string;
}

export const EDU_CATEGORIES: EduCategory[] = [
  {
    id: '10th',
    name: '10th Pass Jobs',
    subText: 'Matric / High School / GD',
    defaultVacancies: '16,881+ Vacancies',
    filterKey: '10th',
    icon: GraduationCap,
    color: 'from-blue-600 to-indigo-700',
  },
  {
    id: '12th',
    name: '12th Pass Jobs',
    subText: 'Intermediate / CHSL / Police',
    defaultVacancies: '15,375+ Vacancies',
    filterKey: '12th',
    icon: BookCheck,
    color: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'diploma',
    name: 'Diploma Govt Jobs',
    subText: 'Polytechnic / JE / Tech Assistants',
    defaultVacancies: '9,831+ Vacancies',
    filterKey: 'diploma',
    icon: Cpu,
    color: 'from-amber-600 to-orange-700',
  },
  {
    id: 'iti',
    name: 'ITI Govt Jobs',
    subText: 'Trade Apprentices / Technicians',
    defaultVacancies: '8,076+ Vacancies',
    filterKey: 'iti',
    icon: Wrench,
    color: 'from-purple-600 to-violet-700',
  },
  {
    id: 'graduate',
    name: 'Any Degree / Graduate',
    subText: 'BA, BSc, BCom, BBA (NTPC, CGL, Banks)',
    defaultVacancies: '12,955+ Vacancies',
    filterKey: 'graduate',
    icon: Award,
    color: 'from-rose-600 to-pink-700',
  },
  {
    id: 'engineering',
    name: 'B.Tech / B.E (Engineering)',
    subText: 'Civil, Mech, Electrical, CSE, ISRO',
    defaultVacancies: '5,420+ Vacancies',
    filterKey: 'b.tech',
    icon: Briefcase,
    color: 'from-cyan-600 to-blue-800',
  },
  {
    id: 'post-graduate',
    name: 'Post Graduate (PG / Master)',
    subText: 'MA, MSc, MTech, MBA, MCA Officers',
    defaultVacancies: '3,890+ Vacancies',
    filterKey: 'post graduate',
    icon: Building,
    color: 'from-slate-700 to-slate-900',
  },
  {
    id: 'commerce',
    name: 'B.Com / Accounting Jobs',
    subText: 'Auditors, Accounts Clerk, Banking',
    defaultVacancies: '2,100+ Vacancies',
    filterKey: 'b.com',
    icon: CheckCircle2,
    color: 'from-lime-600 to-emerald-700',
  },
  {
    id: '8th-pass',
    name: '8th Pass / MTS Jobs',
    subText: 'Safai Karmachari, Attendants, Peon',
    defaultVacancies: '26,500+ Vacancies',
    filterKey: '8th',
    icon: GraduationCap,
    color: 'from-teal-600 to-cyan-800',
  },
];

interface FreeJobAlertEduGridProps {
  selectedQualification: string;
  onSelectQualification: (filterKey: string) => void;
  qualificationCounts?: Record<string, number>;
}

export function FreeJobAlertEduGrid({
  selectedQualification,
  onSelectQualification,
  qualificationCounts = {},
}: FreeJobAlertEduGridProps) {
  return (
    <section className="bg-slate-100/70 border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Jobs by Qualification (FreeJobAlert Matrix)</span>
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Select your highest qualification to filter 70,000+ government vacancies instantly
            </p>
          </div>

          {selectedQualification && (
            <button
              onClick={() => onSelectQualification('')}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs transition-colors"
            >
              Clear Qualification Filter ✕
            </button>
          )}
        </div>

        {/* 9-Block Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5 sm:gap-3">
          {EDU_CATEGORIES.map((edu) => {
            const Icon = edu.icon;
            const isSelected = selectedQualification.toLowerCase() === edu.filterKey.toLowerCase();
            const liveMatchCount = qualificationCounts[edu.filterKey];

            return (
              <button
                key={edu.id}
                onClick={() => onSelectQualification(isSelected ? '' : edu.filterKey)}
                className={`relative text-left p-3 rounded-xl border transition-all duration-150 flex flex-col justify-between group overflow-hidden ${
                  isSelected
                    ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-500 ring-offset-1'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-blue-400 hover:shadow-sm'
                }`}
              >
                {/* Accent Header line */}
                <div className={`h-1 w-full absolute top-0 left-0 bg-gradient-to-r ${edu.color}`} />

                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isSelected
                        ? 'bg-blue-800 text-blue-200'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {liveMatchCount !== undefined && liveMatchCount > 0 && (
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-emerald-500 text-white'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {liveMatchCount} Active
                    </span>
                  )}
                </div>

                <div>
                  <h3 className={`text-xs font-black line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {edu.name}
                  </h3>
                  <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                    {edu.subText}
                  </p>
                  <p className={`text-[10px] font-extrabold mt-1 ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    {edu.defaultVacancies}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
