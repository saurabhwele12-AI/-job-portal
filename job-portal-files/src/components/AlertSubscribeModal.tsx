'use client';

import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Bell, 
  Mail, 
  Check, 
  CheckCircle2
} from 'lucide-react';

interface AlertSubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertSubscribeModal: React.FC<AlertSubscribeModalProps> = ({ isOpen, onClose }) => {
  const [channel, setChannel] = useState<'TELEGRAM' | 'PUSH' | 'EMAIL'>('TELEGRAM');
  const [prefGovt, setPrefGovt] = useState(true);
  const [prefTech, setPrefTech] = useState(true);
  const [contactValue, setContactValue] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 p-6 sm:p-7">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Get Free Job Alerts</h2>
              <p className="text-xs text-slate-500">Instant notification when official vacancy notices are released.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubscribed ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Alerts Activated Successfully!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              You are now subscribed to free job alerts for{' '}
              <strong className="text-blue-700">
                {prefGovt && prefTech ? 'Government & Tech Jobs' : prefGovt ? 'Government Jobs' : 'Tech Jobs'}
              </strong>.
            </p>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-left text-xs space-y-1">
              <span className="text-blue-900 font-bold block">📱 Sample Alert:</span>
              <p className="text-slate-700">
                "🔥 SSC CGL 2026: Application portal closing soon! Download admit cards &amp; apply before deadline."
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
            >
              Close &amp; Back to Job Board
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Choose Channel */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Select Your Alert Delivery Channel:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setChannel('TELEGRAM')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    channel === 'TELEGRAM'
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                  }`}
                >
                  <Send className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                  <span className="text-[11px] block font-bold">Telegram</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel('PUSH')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    channel === 'PUSH'
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                  }`}
                >
                  <Bell className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                  <span className="text-[11px] block font-bold">Web Push</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChannel('EMAIL')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    channel === 'EMAIL'
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                  }`}
                >
                  <Mail className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                  <span className="text-[11px] block font-bold">Daily Email</span>
                </button>
              </div>
            </div>

            {/* Notification Categories */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Select Sectors You Want Alerts For:
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800 bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 flex-1 hover:bg-blue-50/50">
                  <input
                    type="checkbox"
                    checked={prefGovt}
                    onChange={(e) => setPrefGovt(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold">🏛️ Govt Jobs</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-800 bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 flex-1 hover:bg-blue-50/50">
                  <input
                    type="checkbox"
                    checked={prefTech}
                    onChange={(e) => setPrefTech(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold">💼 Private &amp; Tech</span>
                </label>
              </div>
            </div>

            {/* Input field */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                {channel === 'TELEGRAM' ? 'Telegram Handle or Mobile Phone' : channel === 'EMAIL' ? 'Email Address' : 'Device Browser'}
              </label>
              {channel !== 'PUSH' ? (
                <input
                  type={channel === 'EMAIL' ? 'email' : 'text'}
                  required
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  placeholder={channel === 'TELEGRAM' ? '@username or +91 9876543210' : 'name@example.com'}
                  className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none text-xs"
                />
              ) : (
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-xs text-slate-700">
                  Click the button below to allow instant browser alerts when new recruitment notifications are published.
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors"
            >
              Activate Free Alerts Now
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
