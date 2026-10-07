'use client';

import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Building2, 
  Calendar, 
  IndianRupee, 
  GraduationCap
} from 'lucide-react';
import { JobNotification, JobSector } from '../types/job';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: JobNotification) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ isOpen, onClose, onAddJob }) => {
  const [sector, setSector] = useState<JobSector>('GOVERNMENT');
  const [orgName, setOrgName] = useState('');
  const [orgShort, setOrgShort] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Banking');
  const [vacancies, setVacancies] = useState('500');
  const [location, setLocation] = useState('All India');
  const [applyEndDate, setApplyEndDate] = useState('30 Nov 2026');
  const [daysRemaining, setDaysRemaining] = useState('15');
  const [education, setEducation] = useState('Bachelor Degree in any discipline');
  const [salary, setSalary] = useState('₹40,000 - ₹70,000/mo');
  const [feeGeneral, setFeeGeneral] = useState('500');
  const [applyUrl, setApplyUrl] = useState('https://example.gov.in/apply');
  const [summary, setSummary] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newJob: JobNotification = {
      id: `custom-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      organization: {
        name: orgName || 'National Recruitment Board',
        shortName: orgShort || (orgName ? orgName.substring(0, 4).toUpperCase() : 'NRB'),
        logoText: orgShort ? orgShort.substring(0, 3) : 'NEW',
        badgeColor: sector === 'GOVERNMENT' ? 'bg-blue-600' : 'bg-emerald-600',
        verified: true,
      },
      sector,
      category,
      totalVacancies: parseInt(vacancies, 10) || 100,
      location,
      importantDates: {
        notificationDate: 'Today',
        applyStartDate: 'Today',
        applyEndDate,
        daysRemaining: parseInt(daysRemaining, 10) || 10,
        examDate: 'To be announced',
      },
      eligibility: {
        education: [education],
        minAge: 18,
        maxAge: 32,
        experience: sector === 'PRIVATE' ? '0 - 2 Years' : 'Fresher Eligible',
        skills: sector === 'PRIVATE' ? ['React', 'TypeScript', 'Node.js'] : undefined,
      },
      compensation: {
        salaryOrPayScale: salary,
        applicationFeeGeneral: parseInt(feeGeneral, 10) || 0,
        applicationFeeReserved: 0,
      },
      selectionProcess: [
        'Written Examination / Computer Based Test',
        'Interview / Skill Assessment',
        'Document Verification',
      ],
      summary: summary || `Official recruitment announcement for ${title} under ${orgName}. Check complete details before applying.`,
      links: {
        applyUrl,
        officialWebsiteUrl: applyUrl,
      },
      status: 'ACTIVE',
      isNewToday: true,
      viewsCount: 1,
    };

    onAddJob(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 p-6 sm:p-7">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Post New Job Alert</h2>
              <p className="text-xs text-slate-500">Publish a verified vacancy notice with dates &amp; eligibility.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Sector Selector */}
          <div>
            <label className="font-bold text-slate-800 block mb-1.5">Sector Type:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSector('GOVERNMENT')}
                className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-2 ${
                  sector === 'GOVERNMENT'
                    ? 'bg-blue-50 border-blue-600 text-blue-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <span>🏛️ Government Exam</span>
              </button>
              <button
                type="button"
                onClick={() => setSector('PRIVATE')}
                className={`py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-2 ${
                  sector === 'PRIVATE'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <span>💼 Private / Tech</span>
              </button>
            </div>
          </div>

          {/* Org Name & Short Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Organization / Department Name</label>
              <input
                type="text"
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. Reserve Bank of India / Google"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Short Name / Monogram</label>
              <input
                type="text"
                required
                value={orgShort}
                onChange={(e) => setOrgShort(e.target.value)}
                placeholder="e.g. RBI / GOOG"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">Recruitment Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. RBI Grade B Officer Recruitment 2026"
              className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Category, Vacancies & Location */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Banking / IT"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Vacancies</label>
              <input
                type="number"
                value={vacancies}
                onChange={(e) => setVacancies(e.target.value)}
                placeholder="250"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="All India / Bengaluru"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Dates & Salary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Apply Last Date</label>
              <input
                type="text"
                value={applyEndDate}
                onChange={(e) => setApplyEndDate(e.target.value)}
                placeholder="25 Nov 2026"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Days Left</label>
              <input
                type="number"
                value={daysRemaining}
                onChange={(e) => setDaysRemaining(e.target.value)}
                placeholder="10"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Salary / Pay Scale</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="₹55,000/mo or 18 LPA"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Education & Fee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Required Education</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Any Graduate / B.Tech / 12th Pass"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Fee (General, ₹)</label>
              <input
                type="number"
                value={feeGeneral}
                onChange={(e) => setFeeGeneral(e.target.value)}
                placeholder="850"
                className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Apply URL */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">Official Apply Link</label>
            <input
              type="url"
              required
              value={applyUrl}
              onChange={(e) => setApplyUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">Notification Summary</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Summary of qualifications and vacancy notice..."
              className="w-full px-3 py-2 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-800 bg-slate-100 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs transition-colors"
            >
              Publish Job Alert
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
