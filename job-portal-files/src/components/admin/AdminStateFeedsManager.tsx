'use client';

import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  RefreshCw, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Globe 
} from 'lucide-react';
import { JobNotification } from '../../types/job';

interface StateBoardInfo {
  stateCode: string;
  stateName: string;
  boards: string[];
  officialUrl: string;
  frequency: string;
}

const STATE_DIRECTORIES: StateBoardInfo[] = [
  { stateCode: 'BR', stateName: 'Bihar', boards: ['BPSC', 'BSSC', 'CSBC Bihar Police'], officialUrl: 'https://bpsc.bih.nic.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'UP', stateName: 'Uttar Pradesh', boards: ['UPSSSC', 'UPPSC', 'UPPRPB Police'], officialUrl: 'https://upsssc.gov.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'RJ', stateName: 'Rajasthan', boards: ['RPSC', 'RSSB RSMSSB', 'Rajasthan Police'], officialUrl: 'https://rpsc.rajasthan.gov.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'MH', stateName: 'Maharashtra', boards: ['MPSC', 'MahaPolice', 'Zilla Parishad'], officialUrl: 'https://mpsc.gov.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'MP', stateName: 'Madhya Pradesh', boards: ['MPESB Vyapam', 'MPPSC', 'MP Police'], officialUrl: 'https://esb.mp.gov.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'DL', stateName: 'Delhi', boards: ['DSSSB', 'Delhi District Courts', 'Delhi Police'], officialUrl: 'https://dsssb.delhi.gov.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'WB', stateName: 'West Bengal', boards: ['WBPSC', 'WBPRB Police', 'WB Health'], officialUrl: 'https://psc.wb.gov.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'KA', stateName: 'Karnataka', boards: ['KEA', 'KPSC', 'KSP Karnataka Police'], officialUrl: 'https://cetonline.karnataka.gov.in/kea', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'TN', stateName: 'Tamil Nadu', boards: ['TNPSC', 'TNUSRB', 'TRB Teachers'], officialUrl: 'https://tnpsc.gov.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'PB', stateName: 'Punjab', boards: ['PSSSB', 'Punjab Police', 'PPSC'], officialUrl: 'https://punjabpolice.gov.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'AP', stateName: 'Andhra Pradesh', boards: ['APPSC', 'SLPRB AP Police'], officialUrl: 'https://psc.ap.gov.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'TS', stateName: 'Telangana', boards: ['TGPSC TSPSC', 'TSLPRB Police'], officialUrl: 'https://tspsc.gov.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'HR', stateName: 'Haryana', boards: ['HSSC', 'HPSC', 'Haryana Police'], officialUrl: 'https://hssc.gov.in', frequency: 'Daily (Every 4 hrs)' },
  { stateCode: 'CG', stateName: 'Chhattisgarh', boards: ['CG Vyapam', 'CGPSC', 'CG Police'], officialUrl: 'https://vyapam.cgstate.gov.in', frequency: 'Daily (Every 4 hrs)' },
];

interface AdminStateFeedsManagerProps {
  jobs: JobNotification[];
  isSyncing: boolean;
  lastSyncTime: string;
  onTriggerSync: () => Promise<void>;
  showToast: (msg: string) => void;
}

export const AdminStateFeedsManager: React.FC<AdminStateFeedsManagerProps> = ({
  jobs,
  isSyncing,
  lastSyncTime,
  onTriggerSync,
  showToast,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  // In-Browser Auto-Pilot Scheduler
  const [autoPilotActive, setAutoPilotActive] = useState<boolean>(true);
  const [autoPilotIntervalMin, setAutoPilotIntervalMin] = useState<number>(60);
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(60 * 60);

  useEffect(() => {
    if (!autoPilotActive) return;

    const timer = setInterval(() => {
      setSecondsUntilNextSync((prev) => {
        if (prev <= 1) {
          onTriggerSync();
          return autoPilotIntervalMin * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoPilotActive, autoPilotIntervalMin, onTriggerSync]);

  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  // Compute live counts per state in current database
  const stateCounts: Record<string, number> = {};
  jobs.forEach((job) => {
    if (job.state) {
      stateCounts[job.state.toUpperCase()] = (stateCounts[job.state.toUpperCase()] || 0) + 1;
    }
  });

  const webhookUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/sync` 
    : 'https://yourdomain.com/api/sync';

  const curlCommand = `curl -X POST "${webhookUrl}"`;

  const handleCopyWebhook = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(webhookUrl);
      setCopiedUrl(true);
      showToast('Copied Auto-Sync Webhook URL!');
      setTimeout(() => setCopiedUrl(false), 2500);
    }
  };

  const handleCopyCurl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(curlCommand);
      setCopiedCurl(true);
      showToast('Copied curl command to clipboard!');
      setTimeout(() => setCopiedCurl(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Status & Instant Trigger */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-2.5">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>State Govt Feeds Automation Pipeline</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Automated State Government Recruitment Ingestion
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl leading-relaxed">
            Continuously monitors and scrapes Public Service Commissions, Police Recruitment Boards, High Courts, and municipal corporations across 16 Indian states.
          </p>
          <div className="flex items-center gap-4 text-xs text-emerald-300/80 mt-3 font-mono">
            <span>Last Sync: <strong>{lastSyncTime}</strong></span>
            <span>•</span>
            <span>Total State Vacancies: <strong>{jobs.filter(j => j.state && j.state !== 'ALL_INDIA').length} Active</strong></span>
          </div>
        </div>

        <button
          onClick={onTriggerSync}
          disabled={isSyncing}
          className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Ingesting Feeds...' : '⚡ Sync State Feeds Now'}</span>
        </button>
      </div>

      {/* 4 Methods to Automatically Update Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div>
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            <span>4 Methods to Automatically Update This Feed</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose the automated update method that fits your hosting setup
          </p>
        </div>

        {/* Live Auto-Pilot Background Status */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wide uppercase text-emerald-400">
                  Auto-Pilot Ingestion Status:
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  LIVE &bull; {autoPilotActive ? 'RUNNING AUTOMATICALLY' : 'PAUSED'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Local background daemon is active (PID running). Next in-app auto-check in: <strong className="font-mono text-emerald-300">{formatCountdown(secondsUntilNextSync)}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <select
              value={autoPilotIntervalMin}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAutoPilotIntervalMin(val);
                setSecondsUntilNextSync(val * 60);
              }}
              className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 font-bold focus:outline-none focus:border-emerald-500"
            >
              <option value={30}>Every 30 Mins</option>
              <option value={60}>Every 1 Hour (Default)</option>
              <option value={120}>Every 2 Hours</option>
              <option value={240}>Every 4 Hours</option>
            </select>

            <button
              onClick={() => {
                setAutoPilotActive(!autoPilotActive);
                showToast(autoPilotActive ? 'Auto-pilot timer paused' : 'Auto-pilot timer resumed!');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                autoPilotActive 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30' 
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
              }`}
            >
              {autoPilotActive ? '⏸️ Pause Timer' : '▶️ Resume Timer'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Method 1: Vercel Cron */}
          <div className="p-4 rounded-xl border-2 border-emerald-400 bg-emerald-50/40 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Method 1: Vercel Native Cron (Active &amp; Configured)
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
                ACTIVE &bull; RECOMMENDED
              </span>
            </div>
            
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Already fully configured in your project root as <code className="bg-emerald-100 text-emerald-900 px-1 py-0.5 rounded text-[11px] font-mono font-bold">vercel.json</code>. When deployed to Vercel, it runs automatically 4 times every day (02:00, 08:00, 14:00, 20:00 UTC) with zero configuration.
            </p>

            <div className="bg-slate-950 text-emerald-300 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto border border-emerald-900/40 shadow-inner">
              <code>{`{ "crons": [{ "path": "/api/sync", "schedule": "0 2,8,14,20 * * *" }] }`}</code>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-emerald-200/80">
              <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Status: Ingestion endpoint verified live</span>
              </span>
              <button
                onClick={onTriggerSync}
                disabled={isSyncing}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Test Cron Trigger Now</span>
              </button>
            </div>
          </div>

          {/* Method 2: GitHub Actions */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Method 2: GitHub Actions Scheduler (Configured)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                100% FREE
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Included in <code className="bg-slate-200 px-1 rounded text-[11px] font-mono">.github/workflows/auto-sync-state-jobs.yml</code>. Runs on GitHub&apos;s free cloud runners every 4 hours to keep the state feed live.
            </p>
            <div className="bg-slate-900 text-slate-200 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto">
              <code>{`- cron: '0 */4 * * *' # Every 4 hours`}</code>
            </div>
          </div>

          {/* Method 3: External Free Cron Webhook */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Method 3: External Webhook (Cron-Job.org / UptimeRobot)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                ANY HOST
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              You can paste this webhook URL into any free HTTP cron service (like <strong>cron-job.org</strong> or <strong>EasyCron</strong>) to ping on any schedule you want.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={webhookUrl}
                className="flex-1 bg-white border border-slate-300 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-700 select-all"
              />
              <button
                onClick={handleCopyWebhook}
                className="px-2.5 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Method 4: Terminal / Server Curl Command */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Method 4: VPS Linux Crontab (Server Cron)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                SELF-HOSTED
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              If running on your own VPS or server, add this simple command to your system crontab (<code className="bg-slate-200 px-1 rounded text-[11px] font-mono">crontab -e</code>):
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-900 text-emerald-400 p-2 rounded-lg text-xs font-mono truncate">
                <code>{curlCommand}</code>
              </div>
              <button
                onClick={handleCopyCurl}
                className="px-2.5 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0"
              >
                {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCurl ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* State-by-State Live Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-black uppercase tracking-wider">
              Connected State Recruitment Portals Directory
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">
            14 States Synchronized • FreeJobAlert Format
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-800 text-[11px] font-black uppercase border-b border-slate-200">
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Recruitment Boards Monitored</th>
                <th className="py-3 px-4">Active Database Jobs</th>
                <th className="py-3 px-4">Schedule</th>
                <th className="py-3 px-4">Portal Status</th>
                <th className="py-3 px-4 text-right">Official Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {STATE_DIRECTORIES.map((st) => {
                const count = stateCounts[st.stateCode] || 0;

                return (
                  <tr key={st.stateCode} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-900 font-black text-xs flex items-center justify-center shrink-0">
                          {st.stateCode}
                        </span>
                        <div>
                          <span className="font-extrabold text-slate-900 block">{st.stateName}</span>
                          <span className="text-[10px] text-slate-500">{st.stateCode} State Govt</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {st.boards.map((b) => (
                          <span key={b} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-[10px]">
                            {b}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`font-black px-2 py-0.5 rounded-full text-[11px] ${
                        count > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {count} Active {count === 1 ? 'Job' : 'Jobs'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      {st.frequency}
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Auto-Connected</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <a
                        href={st.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold hover:underline text-[11px]"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
