'use client';

import React from 'react';
import { Bell, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenAlerts: () => void;
  onFilterCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAlerts, onFilterCategory }) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 pt-12 pb-8 mt-16 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top SEO Guidance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Bell className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                JobAlert<span className="text-blue-600">Hub</span>
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              India&apos;s fastest job notification portal providing verified updates for Sarkari Naukri, Central &amp; State Government competitive exams, and top-tier Corporate Tech openings.
            </p>
            <button
              onClick={onOpenAlerts}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Join Free Telegram Channel</span>
            </button>
          </div>

          {/* Quick Govt Sections */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">
              Government Job Sectors
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => onFilterCategory('Banking')} className="hover:text-blue-600 transition-colors">Banking Jobs (SBI, IBPS, RBI)</button></li>
              <li><button onClick={() => onFilterCategory('Central Govt')} className="hover:text-blue-600 transition-colors">SSC Exams (CGL, CHSL, MTS, GD)</button></li>
              <li><button onClick={() => onFilterCategory('Railways')} className="hover:text-blue-600 transition-colors">Railways (RRB NTPC, Group D, ALP)</button></li>
              <li><button onClick={() => onFilterCategory('Engineering & Defense')} className="hover:text-blue-600 transition-colors">Defense &amp; Space (ISRO, DRDO, AFCAT)</button></li>
              <li><button onClick={() => onFilterCategory('Central Govt')} className="hover:text-blue-600 transition-colors">UPSC Civil Services &amp; CDS</button></li>
            </ul>
          </div>

          {/* Quick Tech & Private Sections */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">
              Private &amp; Tech Careers
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => onFilterCategory('Software & IT')} className="hover:text-blue-600 transition-colors">Software Engineer Jobs (2026 Batch)</button></li>
              <li><button onClick={() => onFilterCategory('Analytics & Data')} className="hover:text-blue-600 transition-colors">Data Analyst &amp; Business Intelligence</button></li>
              <li><button onClick={() => onFilterCategory('Software & IT')} className="hover:text-blue-600 transition-colors">Full Stack &amp; Frontend Developers</button></li>
              <li><button onClick={() => onFilterCategory('Software & IT')} className="hover:text-blue-600 transition-colors">Product Design &amp; UI/UX Roles</button></li>
              <li><span className="text-slate-500">100% Remote Tech Jobs</span></li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-2">
              Verified &amp; Official Sources
            </h4>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px] space-y-1.5">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Gazette Authentic</span>
              </div>
              <p className="text-slate-600 leading-snug">
                Every job notification on JobAlertHub is cross-referenced with official recruitment gazette PDFs or direct corporate careers sites. We do not charge fees from candidates.
              </p>
            </div>
          </div>

        </div>

        {/* SEO Explanatory Content for Search Ranking */}
        <div className="border-t border-slate-200 pt-6 pb-6 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p className="font-bold text-slate-700">About JobAlertHub Portal (Free Job Alerts 2026):</p>
          <p>
            JobAlertHub is a dedicated job notification platform engineered to deliver timely, structured vacancy announcements for job seekers in India and globally. We categorize jobs by qualification (10th pass, 12th pass, Diploma, Any Graduate, B.Tech/BE, Post Graduate), sector (Banking, Railways, SSC, UPSC, Defense, IT &amp; Software), and location. Each job posting features complete details including application start and closing dates, examination schedules, admit card dates, category-wise application fee exemptions, candidate age limit with cutoff date calculations, selection criteria stages, and direct links to official notification PDFs and official application portals.
          </p>
        </div>

        {/* Bottom copyright line with discrete staff portal link */}
        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© 2026 JobAlertHub. All rights reserved.</p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Built with Next.js, Tailwind CSS &amp; TypeScript</span>
            <span>•</span>
            <a 
              href="/admin" 
              className="text-slate-400 hover:text-slate-600 transition-colors"
              title="Editorial Staff Portal (Shortcut: Ctrl + Shift + A)"
            >
              Staff Access
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
