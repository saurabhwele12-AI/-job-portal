'use client';

import React from 'react';
import { MapPin, X } from 'lucide-react';

export interface StateItem {
  code: string;
  name: string;
  popular?: boolean;
}

export const INDIAN_STATES: StateItem[] = [
  { code: 'ALL_INDIA', name: 'All India Govt' },
  { code: 'AP', name: 'Andhra Pradesh' },
  { code: 'AS', name: 'Assam' },
  { code: 'BR', name: 'Bihar', popular: true },
  { code: 'CG', name: 'Chhattisgarh' },
  { code: 'DL', name: 'Delhi', popular: true },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'HP', name: 'Himachal Pradesh' },
  { code: 'HR', name: 'Haryana' },
  { code: 'JH', name: 'Jharkhand' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'KL', name: 'Kerala' },
  { code: 'MH', name: 'Maharashtra', popular: true },
  { code: 'MP', name: 'Madhya Pradesh' },
  { code: 'OD', name: 'Odisha' },
  { code: 'PB', name: 'Punjab' },
  { code: 'RJ', name: 'Rajasthan', popular: true },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'TS', name: 'Telangana' },
  { code: 'UK', name: 'Uttarakhand' },
  { code: 'UP', name: 'Uttar Pradesh', popular: true },
  { code: 'WB', name: 'West Bengal', popular: true },
];

interface FreeJobAlertStateNavProps {
  selectedState: string;
  onSelectState: (stateCode: string) => void;
  stateCounts?: Record<string, number>;
}

export function FreeJobAlertStateNav({
  selectedState,
  onSelectState,
  stateCounts = {},
}: FreeJobAlertStateNavProps) {
  return (
    <div className="bg-white border-y border-slate-200 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-100 text-blue-700">
              <MapPin className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-slate-800">
              State Govt Jobs (FreeJobAlert Directory)
            </span>
            <span className="hidden sm:inline-block text-[11px] text-slate-500 font-medium">
              — Quick filter by state recruitment boards (PSC, High Courts, Police & Municipal)
            </span>
          </div>

          {selectedState && (
            <button
              onClick={() => onSelectState('')}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Clear State ({selectedState})</span>
            </button>
          )}
        </div>

        {/* Scrollable / wrap state pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {INDIAN_STATES.map((st) => {
            const isSelected = selectedState === st.code;
            const count = stateCounts[st.code] || 0;

            return (
              <button
                key={st.code}
                onClick={() => onSelectState(isSelected ? '' : st.code)}
                className={`text-xs px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-blue-700 text-white border-blue-700 shadow-sm scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
                }`}
                title={`${st.name} Government Jobs`}
              >
                <span>{st.code}</span>
                <span className="text-[10px] font-normal opacity-85 hidden md:inline">
                  {st.name}
                </span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1 py-0.2 rounded-full font-extrabold ${
                      isSelected
                        ? 'bg-white text-blue-800'
                        : 'bg-slate-200 text-slate-800'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
