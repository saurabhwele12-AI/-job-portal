'use client';

import React, { useState } from 'react';
import { BookOpen, PlusCircle, Edit3, Trash2, Search, Save, X, Layers } from 'lucide-react';
import { SyllabusItem } from '../../types/portal';

interface AdminSyllabusManagerProps {
  items: SyllabusItem[];
  onSave: (item: SyllabusItem) => void;
  onDelete: (id: string, title: string) => void;
  showToast: (msg: string) => void;
}

export const AdminSyllabusManager: React.FC<AdminSyllabusManagerProps> = ({
  items,
  onSave,
  onDelete,
  showToast,
}) => {
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState<SyllabusItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicsInput, setTopicsInput] = useState('');
  const [stagesInput, setStagesInput] = useState('');

  const handleStartCreate = () => {
    const timestamp = Date.now();
    const newTemplate: SyllabusItem = {
      id: `syl-${timestamp}`,
      slug: `syllabus-${timestamp}`,
      title: '',
      organization: {
        name: '',
        shortName: '',
        logoText: 'NEW',
        badgeColor: 'bg-purple-600',
      },
      sector: 'GOVERNMENT',
      examName: '',
      updatedYear: '2026 Latest Pattern',
      examPattern: {
        totalMarks: 200,
        duration: '120 Minutes',
        stages: ['Stage 1: Written Examination', 'Stage 2: Personal Interview / Skill Test'],
        negativeMarking: '0.25 (1/4th) deduction per wrong answer',
      },
      topicsSummary: [
        'General Knowledge & Current Affairs',
        'Quantitative Aptitude & Numerical Ability',
        'Reasoning & Logical Comprehension',
      ],
      pdfUrl: 'https://example.gov.in/syllabus.pdf',
      officialWebsiteUrl: 'https://example.gov.in',
      summary: 'Complete exam scheme and topic-wise marking blueprint.',
      viewsCount: 1,
    };
    setEditingItem(newTemplate);
    setTopicsInput(newTemplate.topicsSummary.join('\n'));
    setStagesInput(newTemplate.examPattern.stages.join(', '));
    setIsModalOpen(true);
  };

  const handleStartEdit = (item: SyllabusItem) => {
    setEditingItem({ ...item });
    setTopicsInput(item.topicsSummary?.join('\n') || '');
    setStagesInput(item.examPattern?.stages?.join(', ') || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    if (!editingItem.title.trim() || !editingItem.organization.name.trim()) {
      alert('Please fill in both title and organization.');
      return;
    }

    const cleanSlug = editingItem.slug && !editingItem.slug.startsWith('syllabus-')
      ? editingItem.slug
      : editingItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `syl-${Date.now()}`;

    const parsedTopics = topicsInput
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    const parsedStages = stagesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const toSave: SyllabusItem = {
      ...editingItem,
      slug: cleanSlug,
      organization: {
        ...editingItem.organization,
        shortName: editingItem.organization.shortName || editingItem.organization.name.substring(0, 4).toUpperCase(),
        logoText: editingItem.organization.logoText || editingItem.organization.shortName?.substring(0, 3).toUpperCase() || 'NEW',
      },
      examPattern: {
        ...editingItem.examPattern,
        stages: parsedStages.length > 0 ? parsedStages : ['Stage 1: Written Exam'],
      },
      topicsSummary: parsedTopics.length > 0 ? parsedTopics : ['General Syllabus Topics'],
    };

    onSave(toSave);
    showToast(`Saved Syllabus Scheme: "${toSave.title.substring(0, 30)}..."`);
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
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span>Manage Exam Syllabus &amp; Selection Patterns</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish subject blueprints, stage-wise examination criteria, marks breakdown &amp; syllabus PDFs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search syllabus..."
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Syllabus</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Organization &amp; Syllabus Title</th>
                <th className="p-3.5">Pattern Scheme</th>
                <th className="p-3.5">Total Marks</th>
                <th className="p-3.5">Duration</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No syllabus schemes found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {item.organization.name} ({item.organization.shortName})
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                        {item.updatedYear}
                      </span>
                    </td>

                    <td className="p-3.5 font-bold text-slate-800">
                      {item.examPattern.totalMarks} Marks
                    </td>

                    <td className="p-3.5 text-slate-700">
                      {item.examPattern.duration}
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 rounded-lg text-purple-700 hover:bg-purple-50 transition-colors font-bold flex items-center gap-1 text-xs"
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
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span>{editingItem.id.startsWith('syl-') ? 'Publish New Syllabus Pattern' : 'Edit Syllabus Pattern'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Syllabus Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. UPSC CSE 2026 Complete Syllabus & Scheme"
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
                  <label className="font-bold text-slate-800 block mb-1">Updated Year / Badge</label>
                  <input
                    type="text"
                    value={editingItem.updatedYear}
                    onChange={(e) => setEditingItem({ ...editingItem, updatedYear: e.target.value })}
                    placeholder="2026 Latest Scheme"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Total Marks</label>
                  <input
                    type="number"
                    value={editingItem.examPattern.totalMarks}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      examPattern: { ...editingItem.examPattern, totalMarks: parseInt(e.target.value, 10) || 100 }
                    })}
                    placeholder="2025"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Exam Duration</label>
                  <input
                    type="text"
                    value={editingItem.examPattern.duration}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      examPattern: { ...editingItem.examPattern, duration: e.target.value }
                    })}
                    placeholder="120 Minutes"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Exam Scheme Name</label>
                  <input
                    type="text"
                    value={editingItem.examName}
                    onChange={(e) => setEditingItem({ ...editingItem, examName: e.target.value })}
                    placeholder="Civil Services Examination 2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Negative Marking Rule</label>
                  <input
                    type="text"
                    value={editingItem.examPattern.negativeMarking}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      examPattern: { ...editingItem.examPattern, negativeMarking: e.target.value }
                    })}
                    placeholder="1/3rd deduction per wrong answer"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-rose-700 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Selection Stages (comma separated)</label>
                <input
                  type="text"
                  value={stagesInput}
                  onChange={(e) => setStagesInput(e.target.value)}
                  placeholder="Stage 1: Prelims, Stage 2: Mains, Stage 3: Interview"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Curriculum Topics Highlights (1 per line)</label>
                <textarea
                  rows={3}
                  value={topicsInput}
                  onChange={(e) => setTopicsInput(e.target.value)}
                  placeholder="General Studies Paper I: History, Polity, Geography&#10;CSAT Paper II: Reasoning, Comprehension"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1 text-purple-700">Official Syllabus PDF Link</label>
                  <input
                    type="url"
                    value={editingItem.pdfUrl || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, pdfUrl: e.target.value })}
                    placeholder="https://upsc.gov.in/syllabus.pdf"
                    className="w-full px-3 py-2 bg-purple-50/50 border border-purple-300 rounded-lg font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Official Portal URL</label>
                  <input
                    type="url"
                    value={editingItem.officialWebsiteUrl}
                    onChange={(e) => setEditingItem({ ...editingItem, officialWebsiteUrl: e.target.value })}
                    placeholder="https://upsc.gov.in"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-[11px]"
                  />
                </div>
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
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Syllabus Scheme</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
