'use client';

import React from 'react';
import { 
  X, 
  ExternalLink, 
  Globe, 
  Calendar, 
  IndianRupee, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Download,
  Building2,
  MapPin
} from 'lucide-react';
import { JobNotification } from '../types/job';

interface JobDetailModalProps {
  job: JobNotification | null;
  isOpen: boolean;
  onClose: () => void;
  onShare: (job: JobNotification) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isOpen,
  onClose,
  onShare,
}) => {
  if (!isOpen || !job) return null;

  const isGovt = job.sector === 'GOVERNMENT';
  const isUrgent = job.importantDates.daysRemaining <= 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[92vh]">
        
        {/* Top colored accent line */}
        <div className={`h-1.5 w-full ${isGovt ? 'bg-blue-600' : 'bg-emerald-600'}`} />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-blue-50/60 border-b border-blue-100 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-white shadow-xs text-lg shrink-0 ${job.organization.badgeColor}`}>
              {job.organization.logoText}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-sm font-bold text-slate-800">
                  {job.organization.name}
                </span>
                {job.organization.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Official Notification
                  </span>
                )}
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md uppercase ${
                  isGovt ? 'bg-blue-200 text-blue-900' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isGovt ? 'Government Examination' : 'Corporate / Private Opening'}
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {job.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-slate-600 mt-2 flex-wrap">
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  {job.state ? `${job.state} - ${job.location}` : job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  Category: <strong className="text-slate-800">{job.category}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-slate-400">Post ID:</span>
                  <code className="text-slate-600 font-mono text-[11px]">{job.id}</code>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onShare(job)}
              className="p-2 text-slate-500 hover:text-blue-600 bg-white hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors"
              title="Share alert"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          
          {/* Urgent Deadline Alert Box */}
          {isUrgent && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center justify-between gap-3 text-red-900">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold">
                  Deadline Alert: Application closes on <u>{job.importantDates.applyEndDate}</u> ({job.importantDates.daysRemaining} days left). Apply early to avoid last minute server rush.
                </span>
              </div>
            </div>
          )}

          {/* Section 1: Important Dates & Schedule */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-800 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" /> Important Dates &amp; Examination Schedule
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block font-medium">Notification Issued</span>
                <span className="text-xs font-bold text-slate-900">{job.importantDates.notificationDate}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block font-medium">Apply Start Date</span>
                <span className="text-xs font-bold text-blue-700">{job.importantDates.applyStartDate}</span>
              </div>
              <div className="bg-red-50/60 p-3 rounded-xl border border-red-200">
                <span className="text-[11px] text-red-600 block font-bold">Last Date To Apply</span>
                <span className="text-xs font-extrabold text-red-700">{job.importantDates.applyEndDate}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 block font-medium">Exam Date / Window</span>
                <span className="text-xs font-bold text-slate-900">{job.importantDates.examDate || 'To be announced'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Application Fee Matrix */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-800 mb-3 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-blue-600" /> Application Fee Details &amp; Payment Mode
            </h3>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200 text-xs">
                    <span className="text-slate-600 font-medium">General / OBC / EWS Candidates:</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      {job.compensation.applicationFeeGeneral ? `₹${job.compensation.applicationFeeGeneral}` : '₹0 (Free / No Fee)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-200 text-xs">
                    <span className="text-slate-600 font-medium">SC / ST / PwD / Female Candidates:</span>
                    <span className="font-extrabold text-emerald-700 text-sm">
                      {job.compensation.applicationFeeReserved ? `₹${job.compensation.applicationFeeReserved}` : '₹0 (Exempted)'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-slate-800">Fee Payment Modes:</span>
                  <p className="text-[11px] text-slate-600">
                    {job.compensation.feeNote || 'Pay examination fee online via Net Banking, Debit Card, Credit Card or UPI.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Eligibility & Age Limits */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-800 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" /> Eligibility Criteria &amp; Age Limits
            </h3>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
              
              {/* Educational qualification */}
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1">Prescribed Educational Qualification:</span>
                <ul className="space-y-1.5">
                  {(Array.isArray(job.eligibility?.education) ? job.eligibility.education : [job.eligibility?.education || 'Graduation in relevant discipline']).map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Age & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                {job.eligibility?.minAge && (
                  <div className="text-xs">
                    <span className="text-slate-500 block">Candidate Age Limit:</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {job.eligibility.minAge} to {job.eligibility.maxAge} Years
                    </span>
                    {job.eligibility.ageCutoffDate && (
                      <span className="text-[11px] text-slate-500 block">
                        (Age calculated as on {job.eligibility.ageCutoffDate})
                      </span>
                    )}
                  </div>
                )}

                <div className="text-xs">
                  <span className="text-slate-500 block">Experience / Freshers:</span>
                  <span className="font-bold text-emerald-700 text-sm">
                    {job.eligibility?.experience || 'Freshers Eligible'}
                  </span>
                </div>
              </div>

              {/* Age Relaxation for Govt */}
              {job.eligibility?.ageRelaxation && (
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-800">Reservation Age Relaxation: </span>
                  {job.eligibility.ageRelaxation}
                </div>
              )}

              {/* Tech Skills for Private roles */}
              {!isGovt && Array.isArray(job.eligibility?.skills) && job.eligibility.skills.length > 0 && (
                <div className="pt-3 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block mb-2">Required Technical Skills:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {job.eligibility.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-md text-xs bg-blue-100 text-blue-800 font-mono font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Section 4: Vacancies & Pay Scale */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-800 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" /> Vacancy Details &amp; Pay Scale
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1 font-medium">Total Open Vacancies</span>
                <span className="text-2xl font-extrabold text-slate-900">
                  {job.totalVacancies.toLocaleString()} Posts
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Refer to the official notification PDF for category-wise (UR/OBC/SC/ST/EWS) quota distribution.
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1 font-medium">Salary / Compensation</span>
                <span className="text-sm font-extrabold text-blue-700">
                  {job.compensation.salaryOrPayScale}
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Includes applicable Dearness Allowance (DA), House Rent Allowance (HRA) and perks.
                </span>
              </div>
            </div>
          </div>

          {/* Section 5: Selection Process */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Selection Process Stages
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              {job.selectionProcess.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </div>
                  <span className="pt-0.5 font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Syllabus / Overview */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-800 mb-2">
              Syllabus Summary &amp; Overview
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {job.summary}
            </p>
            {job.responsibilitiesOrSyllabus && (
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                {job.responsibilitiesOrSyllabus.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer with Direct Action Buttons */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Secondary document links */}
          <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
            {job.links.officialPdfUrl && (
              <a
                href={job.links.officialPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-red-50 text-red-700 border border-red-200 transition-colors shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official PDF</span>
              </a>
            )}

            <a
              href={job.links.officialWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Official Website</span>
            </a>
          </div>

          {/* Primary Apply Online Button */}
          <a
            id="modal-apply-btn"
            href={job.links.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-105"
          >
            <span>Apply Online Now</span>
            <ExternalLink className="w-4 h-4" />
          </a>

        </div>

      </div>
    </div>
  );
};
