'use client';

import React, { useState } from 'react';
import { Trophy, PlusCircle, Edit3, Trash2, Search, Save, X, Award, Users } from 'lucide-react';
import { ResultItem, ResultStatus } from '../../types/portal';

interface AdminResultsManagerProps {
  items: ResultItem[];
  onSave: (item: ResultItem) => void;
  onDelete: (id: string, title: string) => void;
  showToast: (msg: string) => void;
}

export const AdminResultsManager: React.FC<AdminResultsManagerProps> = ({
  items,
  onSave,
  onDelete,
  showToast,
}) => {
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<ResultItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartCreate = () => {
    const timestamp = Date.now();
    const newTemplate: ResultItem = {
      id: `res-${timestamp}`,
      slug: `result-${timestamp}`,
      title: '',
      organization: {
        name: '',
        shortName: '',
        logoText: 'NEW',
        badgeColor: 'bg-emerald-600',
      },
      sector: 'GOVERNMENT',
      examName: '',
      declarationDate: 'Today',
      status: 'DECLARED',
      resultUrl: 'https://example.gov.in/result',
      cutoffUrl: 'https://example.gov.in/cutoff',
      officialWebsiteUrl: 'https://example.gov.in',
      cutoffPreview: {
        UR: '310.00',
        OBC: '298.50',
        EWS: '295.00',
        SC: '275.00',
        ST: '260.00',
      },
      qualifiedCount: 5000,
      summary: 'Commission has announced official examination results and merit lists online.',
      viewsCount: 1,
    };
    setEditingItem(newTemplate);
    setIsModalOpen(true);
  };

  const handleStartEdit = (item: ResultItem) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    if (!editingItem.title.trim() || !editingItem.organization.name.trim()) {
      alert('Please fill in both title and organization.');
      return;
    }

    const cleanSlug = editingItem.slug && !editingItem.slug.startsWith('result-')
      ? editingItem.slug
      : editingItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `res-${Date.now()}`;

    const toSave: ResultItem = {
      ...editingItem,
      slug: cleanSlug,
      organization: {
        ...editingItem.organization,
        shortName: editingItem.organization.shortName || editingItem.organization.name.substring(0, 4).toUpperCase(),
        logoText: editingItem.organization.logoText || editingItem.organization.shortName?.substring(0, 3).toUpperCase() || 'NEW',
      },
    };

    onSave(toSave);
    showToast(`Saved Result Announcement: "${toSave.title.substring(0, 30)}..."`);
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
            <Trophy className="w-5 h-5 text-emerald-600" />
            <span>Manage Exam Results &amp; Cut-off Marks</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish declared results, merit list PDFs, scorecards, and category-wise cutoffs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search results..."
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Result</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Organization &amp; Result Title</th>
                <th className="p-3.5">Declared Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Selected Count</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No results found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {item.organization.name} ({item.organization.shortName})
                      </div>
                    </td>

                    <td className="p-3.5 font-semibold text-slate-800">
                      {item.declarationDate}
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'FINAL_RESULT'
                          ? 'bg-amber-100 text-amber-800'
                          : item.status === 'MERIT_LIST_OUT'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-700 font-medium">
                      {item.qualifiedCount ? `${item.qualifiedCount.toLocaleString()} Candidates` : 'N/A'}
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors font-bold flex items-center gap-1 text-xs"
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
                <Trophy className="w-4 h-4 text-emerald-600" />
                <span>{editingItem.id.startsWith('res-') ? 'Publish New Exam Result' : 'Edit Result Announcement'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Result Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. SSC CGL 2026 Tier-1 Written Result & Cut-off Marks Declared"
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
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as ResultStatus })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  >
                    <option value="DECLARED">✓ Result Declared</option>
                    <option value="FINAL_RESULT">🏆 Final Selection</option>
                    <option value="MERIT_LIST_OUT">📋 Merit List Out</option>
                    <option value="SCORECARD_LIVE">🎯 Scorecard Live</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Declaration Date</label>
                  <input
                    type="text"
                    value={editingItem.declarationDate}
                    onChange={(e) => setEditingItem({ ...editingItem, declarationDate: e.target.value })}
                    placeholder="Today, 06:30 PM"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Qualified Count</label>
                  <input
                    type="number"
                    value={editingItem.qualifiedCount || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, qualifiedCount: parseInt(e.target.value, 10) || 0 })}
                    placeholder="14500"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Cutoff Preview inputs */}
              <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 block mb-2 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" /> Category-wise Cut-off Marks Preview:
                </span>
                <div className="grid grid-cols-5 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block">UR</label>
                    <input
                      type="text"
                      value={editingItem.cutoffPreview?.UR || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        cutoffPreview: { ...editingItem.cutoffPreview, UR: e.target.value }
                      })}
                      placeholder="318.5"
                      className="w-full px-2 py-1 bg-white border border-emerald-300 rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block">OBC</label>
                    <input
                      type="text"
                      value={editingItem.cutoffPreview?.OBC || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        cutoffPreview: { ...editingItem.cutoffPreview, OBC: e.target.value }
                      })}
                      placeholder="307.2"
                      className="w-full px-2 py-1 bg-white border border-emerald-300 rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block">EWS</label>
                    <input
                      type="text"
                      value={editingItem.cutoffPreview?.EWS || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        cutoffPreview: { ...editingItem.cutoffPreview, EWS: e.target.value }
                      })}
                      placeholder="304.0"
                      className="w-full px-2 py-1 bg-white border border-emerald-300 rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block">SC</label>
                    <input
                      type="text"
                      value={editingItem.cutoffPreview?.SC || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        cutoffPreview: { ...editingItem.cutoffPreview, SC: e.target.value }
                      })}
                      placeholder="286.7"
                      className="w-full px-2 py-1 bg-white border border-emerald-300 rounded text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block">ST</label>
                    <input
                      type="text"
                      value={editingItem.cutoffPreview?.ST || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        cutoffPreview: { ...editingItem.cutoffPreview, ST: e.target.value }
                      })}
                      placeholder="274.5"
                      className="w-full px-2 py-1 bg-white border border-emerald-300 rounded text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1 text-emerald-700">Official Result Link *</label>
                  <input
                    type="url"
                    required
                    value={editingItem.resultUrl}
                    onChange={(e) => setEditingItem({ ...editingItem, resultUrl: e.target.value })}
                    placeholder="https://ssc.gov.in/results"
                    className="w-full px-3 py-2 bg-emerald-50/50 border border-emerald-300 rounded-lg font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Official Cut-off PDF URL</label>
                  <input
                    type="url"
                    value={editingItem.cutoffUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, cutoffUrl: e.target.value })}
                    placeholder="https://ssc.gov.in/cutoff.pdf"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Result Summary / Post Details</label>
                <textarea
                  rows={2}
                  value={editingItem.summary}
                  onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                  placeholder="Official allocation declared for qualified candidates..."
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
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Result Announcement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
