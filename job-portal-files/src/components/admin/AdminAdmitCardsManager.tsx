'use client';

import React, { useState } from 'react';
import { Ticket, PlusCircle, Edit3, Trash2, Search, ExternalLink, Save, X, Calendar, Download } from 'lucide-react';
import { AdmitCardItem, AdmitCardStatus } from '../../types/portal';

interface AdminAdmitCardsManagerProps {
  items: AdmitCardItem[];
  onSave: (item: AdmitCardItem) => void;
  onDelete: (id: string, title: string) => void;
  showToast: (msg: string) => void;
}

export const AdminAdmitCardsManager: React.FC<AdminAdmitCardsManagerProps> = ({
  items,
  onSave,
  onDelete,
  showToast,
}) => {
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<AdmitCardItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartCreate = () => {
    const timestamp = Date.now();
    const newTemplate: AdmitCardItem = {
      id: `ac-${timestamp}`,
      slug: `admit-card-${timestamp}`,
      title: '',
      organization: {
        name: '',
        shortName: '',
        logoText: 'NEW',
        badgeColor: 'bg-indigo-600',
      },
      sector: 'GOVERNMENT',
      category: 'Central Govt',
      examName: '',
      examDate: 'November 2026',
      releaseDate: 'Available Now',
      status: 'OUT_TODAY',
      admitCardUrl: 'https://example.gov.in/admitcard',
      officialWebsiteUrl: 'https://example.gov.in',
      instructions: 'Bring printed admit card and original photo ID proof to the examination center.',
      viewsCount: 1,
    };
    setEditingItem(newTemplate);
    setIsModalOpen(true);
  };

  const handleStartEdit = (item: AdmitCardItem) => {
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

    const cleanSlug = editingItem.slug && !editingItem.slug.startsWith('admit-card-')
      ? editingItem.slug
      : editingItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `ac-${Date.now()}`;

    const toSave: AdmitCardItem = {
      ...editingItem,
      slug: cleanSlug,
      organization: {
        ...editingItem.organization,
        shortName: editingItem.organization.shortName || editingItem.organization.name.substring(0, 4).toUpperCase(),
        logoText: editingItem.organization.logoText || editingItem.organization.shortName?.substring(0, 3).toUpperCase() || 'NEW',
      },
    };

    onSave(toSave);
    showToast(`Saved Admit Card: "${toSave.title.substring(0, 30)}..."`);
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
            <Ticket className="w-5 h-5 text-indigo-600" />
            <span>Manage Admit Cards &amp; Hall Tickets</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Add hall ticket releases, exam city slips, and direct student download URLs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search admit cards..."
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Admit Card</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Organization &amp; Admit Card Title</th>
                <th className="p-3.5">Exam Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Release Info</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No admit cards found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {item.organization.name} ({item.organization.shortName}) • Category: {item.category}
                      </div>
                    </td>

                    <td className="p-3.5 font-semibold text-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{item.examDate}</span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'OUT_TODAY'
                          ? 'bg-rose-100 text-rose-700'
                          : item.status === 'RELEASED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-3.5 text-slate-600">
                      {item.releaseDate}
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors font-bold flex items-center gap-1 text-xs"
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
                <Ticket className="w-4 h-4 text-indigo-600" />
                <span>{editingItem.id.startsWith('ac-') ? 'Publish New Admit Card' : 'Edit Admit Card'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Admit Card Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. UPSC Civil Services Prelims 2026 e-Admit Card Out"
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
                    placeholder="Union Public Service Commission"
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
                    placeholder="UPSC"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Status</label>
                  <select
                    value={editingItem.status}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as AdmitCardStatus })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  >
                    <option value="OUT_TODAY">🔥 Out Today</option>
                    <option value="RELEASED">✓ Released</option>
                    <option value="EXPECTED_SOON">⏳ Expected Soon</option>
                    <option value="POSTPONED">Postponed</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Category</label>
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    placeholder="Civil Services / Banking"
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Exam Conduct Date *</label>
                  <input
                    type="text"
                    required
                    value={editingItem.examDate}
                    onChange={(e) => setEditingItem({ ...editingItem, examDate: e.target.value })}
                    placeholder="25 May 2026 (Two Shifts)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold text-indigo-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Exam / Scheme Name</label>
                  <input
                    type="text"
                    value={editingItem.examName}
                    onChange={(e) => setEditingItem({ ...editingItem, examName: e.target.value })}
                    placeholder="Civil Services (Preliminary) Exam 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1 text-indigo-700">Direct Download Link *</label>
                  <input
                    type="url"
                    required
                    value={editingItem.admitCardUrl}
                    onChange={(e) => setEditingItem({ ...editingItem, admitCardUrl: e.target.value })}
                    placeholder="https://upsconline.nic.in"
                    className="w-full px-3 py-2 bg-indigo-50/50 border border-indigo-300 rounded-lg font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Official Website Link</label>
                  <input
                    type="url"
                    value={editingItem.officialWebsiteUrl}
                    onChange={(e) => setEditingItem({ ...editingItem, officialWebsiteUrl: e.target.value })}
                    placeholder="https://upsc.gov.in"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Candidate Instructions</label>
                <textarea
                  rows={2}
                  value={editingItem.instructions}
                  onChange={(e) => setEditingItem({ ...editingItem, instructions: e.target.value })}
                  placeholder="Bring printed hall ticket and original Photo ID..."
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
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Admit Card Alert</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
