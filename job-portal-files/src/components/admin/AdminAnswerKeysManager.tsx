'use client';

import React, { useState } from 'react';
import { KeyRound, PlusCircle, Edit3, Trash2, Search, Save, X, Calendar, AlertTriangle } from 'lucide-react';
import { AnswerKeyItem, AnswerKeyStatus } from '../../types/portal';

interface AdminAnswerKeysManagerProps {
  items: AnswerKeyItem[];
  onSave: (item: AnswerKeyItem) => void;
  onDelete: (id: string, title: string) => void;
  showToast: (msg: string) => void;
}

export const AdminAnswerKeysManager: React.FC<AdminAnswerKeysManagerProps> = ({
  items,
  onSave,
  onDelete,
  showToast,
}) => {
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<AnswerKeyItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartCreate = () => {
    const timestamp = Date.now();
    const newTemplate: AnswerKeyItem = {
      id: `ak-${timestamp}`,
      slug: `answer-key-${timestamp}`,
      title: '',
      organization: {
        name: '',
        shortName: '',
        logoText: 'NEW',
        badgeColor: 'bg-amber-600',
      },
      sector: 'GOVERNMENT',
      examName: '',
      examDate: 'October 2026',
      releaseDate: 'Available Now',
      status: 'OBJECTION_WINDOW_ACTIVE',
      objectionStartDate: 'Today',
      objectionEndDate: '15 Oct 2026 (05:00 PM)',
      objectionFeeNote: '₹100 per question challenged online',
      answerKeyUrl: 'https://example.gov.in/answerkey',
      objectionUrl: 'https://example.gov.in/objection',
      officialWebsiteUrl: 'https://example.gov.in',
      summary: 'Candidate response sheets along with provisional master answer keys are available for verification.',
      viewsCount: 1,
    };
    setEditingItem(newTemplate);
    setIsModalOpen(true);
  };

  const handleStartEdit = (item: AnswerKeyItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    if (!editingItem.title.trim() || !editingItem.organization.name.trim()) {
      alert('Please fill in title and organization.');
      return;
    }

    const cleanSlug = editingItem.slug && !editingItem.slug.startsWith('answer-key-')
      ? editingItem.slug
      : editingItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `ak-${Date.now()}`;

    const toSave: AnswerKeyItem = {
      ...editingItem,
      slug: cleanSlug,
      organization: {
        ...editingItem.organization,
        shortName: editingItem.organization.shortName || editingItem.organization.name.substring(0, 4).toUpperCase(),
        logoText: editingItem.organization.logoText || editingItem.organization.shortName?.substring(0, 3).toUpperCase() || 'NEW',
      },
    };

    onSave(toSave);
    showToast(`Saved Answer Key: "${toSave.title.substring(0, 30)}..."`);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const filtered = items.filter((i) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      i.title.toLowerCase().includes(q) ||
      i.organization.name.toLowerCase().includes(q) ||
      i.examName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-amber-600" />
            <span>Manage Answer Keys &amp; Objection Windows</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish provisional &amp; final answer keys, response sheet links, and objection deadlines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search answer keys..."
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Answer Key</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Organization &amp; Key Title</th>
                <th className="p-3.5">Exam Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Objection Deadline</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No answer keys found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {item.organization.name} ({item.organization.shortName})
                      </div>
                    </td>

                    <td className="p-3.5 font-semibold text-slate-800">
                      {item.examDate}
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'OBJECTION_WINDOW_ACTIVE'
                          ? 'bg-amber-100 text-amber-800'
                          : item.status === 'FINAL_KEY_OUT'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-3.5 font-medium text-slate-700">
                      {item.objectionEndDate || 'None'}
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors font-bold flex items-center gap-1 text-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => onDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-600" />
                <span>{editingItem.id.startsWith('ak-') ? 'Publish New Answer Key' : 'Edit Answer Key'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Answer Key Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. SSC CPO 2026 Paper-1 Tentative Answer Key Released"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Organization Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.organization.name}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      organization: { ...editingItem.organization, name: e.target.value }
                    })}
                    placeholder="Staff Selection Commission"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Short Name / Monogram *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.organization.shortName}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      organization: { ...editingItem.organization, shortName: e.target.value }
                    })}
                    placeholder="SSC"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Status</label>
                  <select
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as AnswerKeyStatus })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  >
                    <option value="OBJECTION_WINDOW_ACTIVE">⚠️ Objection Window Open</option>
                    <option value="RELEASED">✓ Provisional Key Out</option>
                    <option value="FINAL_KEY_OUT">✓ Final Key Frozen</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Exam Date Conducted *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.examDate}
                    onChange={(e) => setEditingItem({ ...editingItem, examDate: e.target.value })}
                    placeholder="27 - 29 September 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Release Date Display</label>
                  <input
                    type="text"
                    value={editingItem.releaseDate}
                    onChange={(e) => setEditingItem({ ...editingItem, releaseDate: e.target.value })}
                    placeholder="Available Now"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Objection timeline */}
              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-amber-900 block mb-1">Objection Deadline Date &amp; Time</label>
                  <input
                    type="text"
                    value={editingItem.objectionEndDate || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, objectionEndDate: e.target.value })}
                    placeholder="09 Oct 2026 (05:00 PM)"
                    className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg font-bold text-amber-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-amber-900 block mb-1">Challenge Fee Note</label>
                  <input
                    type="text"
                    value={editingItem.objectionFeeNote || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, objectionFeeNote: e.target.value })}
                    placeholder="₹100 per question challenged"
                    className="w-full px-3 py-2 bg-white border border-amber-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1 text-blue-700">Official Answer Key Link *</label>
                  <input
                    type="url"
                    required
                    value={editingItem.answerKeyUrl}
                    onChange={(e) => setEditingItem({ ...editingItem, answerKeyUrl: e.target.value })}
                    placeholder="https://ssc.gov.in/answerkey"
                    className="w-full px-3 py-2 bg-blue-50/50 border border-blue-300 rounded-lg font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1 text-amber-800">Objection Window Challenge Link</label>
                  <input
                    type="url"
                    value={editingItem.objectionUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, objectionUrl: e.target.value })}
                    placeholder="https://ssc.gov.in/challenge"
                    className="w-full px-3 py-2 bg-amber-50/50 border border-amber-300 rounded-lg font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Summary / Challenge Guidelines</label>
                <textarea
                  rows={2}
                  value={editingItem.summary}
                  onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                  placeholder="Candidate response sheets along with tentative keys are available..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Answer Key</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
