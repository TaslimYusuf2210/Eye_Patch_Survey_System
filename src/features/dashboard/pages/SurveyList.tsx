import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Copy, Trash2, Clock, BarChart3, Users, AlertTriangle, MessageSquare, Eye, Edit3 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface SurveyCardData {
    id: number;
    title: string;
    status: string;
    description: string;
    responses: number;
    completionRate: number;
    avgResponseTime: string;
    date: string;
}

const surveys: SurveyCardData[] = [
    {
        id: 1,
        title: 'User Journey Exploration',
        status: 'Active',
        description: 'This survey aims to understand the user experience throughout their journey on our platform.',
        responses: 83,
        completionRate: 76,
        avgResponseTime: '4m 32s',
        date: '14 Feb 2024',
    },
    {
        id: 2,
        title: 'Usability and UI Evaluation',
        status: 'Inactive',
        description: 'We strive to create a seamless user experience. By participating, you can provide valuable insights.',
        responses: 3,
        completionRate: 30,
        avgResponseTime: '6m 12s',
        date: '18 Feb 2024',
    },
    {
        id: 3,
        title: 'Product Feedback Survey',
        status: 'Active',
        description: 'Gathering feedback on the latest product features to prioritize future development.',
        responses: 45,
        completionRate: 82,
        avgResponseTime: '3m 45s',
        date: '20 Feb 2024',
    },
    {
        id: 4,
        title: 'Customer Satisfaction Score',
        status: 'Draft',
        description: 'Quarterly CSAT survey to measure customer happiness and identify areas for improvement.',
        responses: 0,
        completionRate: 0,
        avgResponseTime: '—',
        date: '22 Feb 2024',
    },
];

const SurveyCard = ({ survey }: { survey: SurveyCardData }) => {
    const { accent } = useTheme();
    const isDefaultTheme = accent === 'default';
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/survey/${survey.id}`);
        toast.success('Survey link copied to clipboard!');
    };

    return (
        <div className="bg-white dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-900 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
            {/* Header */}
            <div className="p-5 pb-3 flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                            survey.status === 'Active'
                                ? 'bg-green-50 dark:bg-emerald-950/30 text-green-600 dark:text-emerald-400 border-green-100 dark:border-emerald-900/30'
                                : survey.status === 'Draft'
                                    ? 'bg-gray-100 dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-transparent'
                                    : 'bg-red-50 dark:bg-rose-950/30 text-red-500 dark:text-rose-400 border-red-100 dark:border-rose-900/30'
                        }`}>
                            {survey.status}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-slate-500">{survey.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-slate-100 text-base truncate">{survey.title}</h3>
                </div>
            </div>

            {/* Description */}
            <div className="px-5 pb-3">
                <p className="text-gray-500 dark:text-slate-400 text-sm line-clamp-2">{survey.description}</p>
            </div>

            {/* Quick Analytics */}
            <div className="px-5 pb-4 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-slate-900/50">
                    <Users size={16} className="text-gray-400 dark:text-slate-500 mb-1" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">{survey.responses}</span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400">Responses</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-slate-900/50">
                    <BarChart3 size={16} className="text-gray-400 dark:text-slate-500 mb-1" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">{survey.completionRate}%</span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400">Completion</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-slate-900/50">
                    <Clock size={16} className="text-gray-400 dark:text-slate-500 mb-1" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">{survey.avgResponseTime}</span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400">Avg Time</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-5 pb-3 flex flex-wrap gap-2">
                <Link
                    to={`/dashboard/responses`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-xs font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900 hover:border-accent-300 dark:hover:border-accent-800 transition-all cursor-pointer"
                >
                    <MessageSquare size={14} />
                    Responses
                </Link>
                <Link
                    to={`/dashboard/participant`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-xs font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900 hover:border-accent-300 dark:hover:border-accent-800 transition-all cursor-pointer"
                >
                    <Eye size={14} />
                    Participants
                </Link>
                {survey.status === 'Draft' && (
                    <Link
                        to={`/dashboard/create-survey`}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-xs font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900 hover:border-accent-300 dark:hover:border-accent-800 transition-all cursor-pointer"
                    >
                        <Edit3 size={14} />
                        Edit
                    </Link>
                )}
            </div>

            {/* Bottom Bar */}
            <div className="mt-auto px-5 pb-5 pt-3 border-t border-gray-100 dark:border-slate-900 flex items-center justify-between">
                <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors cursor-pointer"
                >
                    <Copy size={14} />
                    Copy Link
                </button>
                <button
                    onClick={() => setDeleteDialogOpen(true)}
                    className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                    <Trash2 size={14} />
                    Delete
                </button>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={(open) => { setDeleteDialogOpen(open); }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                            <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">Delete Survey</DialogTitle>
                        </div>
                        <DialogDescription className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                            This action is <span className="font-semibold text-red-600 dark:text-red-400">permanent and cannot be undone</span>.
                            All responses and data for <span className="font-semibold text-gray-900 dark:text-slate-100">"{survey.title}"</span> will be deleted immediately.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-3 justify-end">
                        <button
                            onClick={() => setDeleteDialogOpen(false)}
                            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                                isDefaultTheme
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-red-600 hover:bg-red-700 text-white'
                            }`}
                        >
                            <Trash2 size={16} />
                            Delete Survey
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const STATUS_OPTIONS = ['All', 'Active', 'Draft', 'Inactive', 'Closed'] as const;
const SORT_OPTIONS = [
    { value: 'created_at|desc', label: 'Newest First' },
    { value: 'created_at|asc', label: 'Oldest First' },
    { value: 'title|asc', label: 'A–Z' },
    { value: 'title|desc', label: 'Z–A' },
] as const;

const SurveyList = () => {
    const { textTitle } = useTheme();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState('created_at|desc');
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    // Filter & sort surveys
    let filtered = surveys.filter((s) => {
        const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
        const matchesSearch = search === '' || s.title.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const [sortField, sortOrder] = sortBy.split('|');
    filtered = [...filtered].sort((a, b) => {
        const dir = sortOrder === 'asc' ? 1 : -1;
        if (sortField === 'title') return a.title.localeCompare(b.title) * dir;
        return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
    });

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Reset to page 1 when filters change
    const handleFilterChange = (newStatus: string) => {
        setStatusFilter(newStatus);
        setPage(1);
    };

    return (
        <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className={`text-2xl font-bold ${textTitle}`}>Surveys</h1>
                <Link
                    to="/dashboard/create-survey"
                    className="bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-700 active:bg-accent-800 shadow-sm shadow-accent-600/10 transition-all duration-300 whitespace-nowrap flex items-center gap-2 shrink-0"
                >
                    <Plus size={16} />
                    Create Survey
                </Link>
            </div>

            {/* Search & Sort Row */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        placeholder="Search surveys by name..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all text-sm"
                    />
                </div>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2.5 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-200 cursor-pointer"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
                {STATUS_OPTIONS.map((status) => (
                    <button
                        key={status}
                        onClick={() => handleFilterChange(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                            statusFilter === status
                                ? 'bg-accent-600 text-white shadow-sm shadow-accent-600/10'
                                : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-900'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Survey Cards Grid */}
            {paginated.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginated.map((survey) => (
                        <SurveyCard key={survey.id} survey={survey} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-slate-400 text-sm">No surveys found. Try adjusting your filters.</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-sm font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                                page === p
                                    ? 'bg-accent-600 text-white shadow-sm shadow-accent-600/10'
                                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-900 border border-gray-200 dark:border-slate-800'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-sm font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default SurveyList;

