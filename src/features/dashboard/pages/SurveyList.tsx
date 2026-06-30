import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import SurveyCard, { type SurveyCardData } from '../components/Surveys/SurveyCard';
import {getSurveys} from "@/services/dashboard/surveys";
import {toast} from 'sonner'

interface PaginationData {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
}

const STATUS_OPTIONS = ['All', 'Active', 'Draft', 'Inactive', 'Closed'] as const;
const SORT_OPTIONS = [
    { value: 'created_at|desc', label: 'Newest First' },
    { value: 'created_at|asc', label: 'Oldest First' },
    { value: 'title|asc', label: 'A–Z' },
    { value: 'title|desc', label: 'Z–A' },
] as const;

const SurveyList = () => {
    const { textTitle } = useTheme();
    const [surveys, setSurveys] = useState<SurveyCardData[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({ page: 1, limit: 20, total: 0, total_pages: 0 });
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState('created_at|desc');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 8;

    useEffect(() => {
        async function fetchSurveys() {
            setLoading(true);
            try {
                const response = await getSurveys({ page: 1, limit: 20 });
                setSurveys(response.data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    status: item.status,
                    description: item.description,
                    responses: item.response_count,
                    completionRate: item.completion_rate,
                    avgResponseTime: item.avg_response_time,
                    date: item.created_at,
                })));
                setPagination(response.pagination);
            } catch (error) {
                console.log(error);
                toast.error("Failed to get surveys. Please try again later")
            } finally {
                setLoading(false);
            }
        }

        fetchSurveys();
    }, []);

    // Filter & sort surveys (client-side until backend filtering is wired up)
    let filtered = surveys.filter((s) => {
        const matchesStatus = statusFilter === 'All' || s.status?.toLowerCase() === statusFilter.toLowerCase();
        const matchesSearch = search === '' || s.title.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const [sortField, sortOrder] = sortBy.split('|');
    filtered = [...filtered].sort((a, b) => {
        const dir = sortOrder === 'asc' ? 1 : -1;
        if (sortField === 'title') return a.title.localeCompare(b.title) * dir;
        return (new Date(a.date).getTime() - new Date(b.date).getTime()) * dir;
    });

    const totalPages = pagination.total_pages || Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 animate-pulse"
                        >
                            <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-3/4 mb-4" />
                            <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-full mb-3" />
                            <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-5/6 mb-4" />
                            <div className="flex items-center gap-4">
                                <div className="h-8 w-16 bg-gray-200 dark:bg-slate-800 rounded-full" />
                                <div className="h-8 w-16 bg-gray-200 dark:bg-slate-800 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : paginated.length > 0 ? (
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
                <div className="mt-10">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={(e) => { e.preventDefault(); setPage(Math.max(1, page - 1)); }}
                                    className={page === 1 ? 'pointer-events-none opacity-30' : 'cursor-pointer'}
                                    href="#"
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <PaginationItem key={p}>
                                    <PaginationLink
                                        isActive={page === p}
                                        onClick={(e) => { e.preventDefault(); setPage(p); }}
                                        href="#"
                                        className="cursor-pointer"
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={(e) => { e.preventDefault(); setPage(Math.min(totalPages, page + 1)); }}
                                    className={page === totalPages ? 'pointer-events-none opacity-30' : 'cursor-pointer'}
                                    href="#"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </>
    );
};

export default SurveyList;

