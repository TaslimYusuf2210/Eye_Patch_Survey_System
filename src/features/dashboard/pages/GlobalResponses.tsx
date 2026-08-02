import { useState, type ReactNode } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';
import { formatDate } from '@/lib/utils';
import { useGlobalResponses, useSurveys } from '@/hooks/useQuery';
import { useNavigate } from 'react-router-dom';

interface GlobalResponseItem {
    id: string;
    survey_id: string;
    survey_title: string;
    respondent_email: string;
    completed_at: string;
    started_at: string;
    time_taken_sec: number;
}

interface GlobalResponseDisplay {
    id: string;
    survey_title: string;
    respondent_email: string;
    completed_at: string;
    survey_id: string;
}

const GlobalResponses = () => {
    const { textTitle } = useTheme();
    const [page, setPage] = useState(1);
    const [filterSurveyId, setFilterSurveyId] = useState('');
    const navigate = useNavigate();

    const { data: responseData, isLoading } = useGlobalResponses({
        page,
        limit: 10,
        survey_id: filterSurveyId || undefined,
    });
    console.log('getGlobalResponses raw:', responseData);
    const { data: surveysData } = useSurveys({ page: 1, limit: 100 });

    const surveys: { id: string; title: string }[] = (surveysData?.data || []).map((s: any) => ({
        id: s.id,
        title: s.title,
    }));

    const selectedSurvey = surveys.find((s) => s.id === filterSurveyId);

    // Client-side safety net — in case the backend ignores survey_id, still filter the fetched rows
    const responses: GlobalResponseDisplay[] = (responseData?.data || [])
        .filter((item: GlobalResponseItem) => !filterSurveyId || item.survey_id === filterSurveyId)
        .map((item: GlobalResponseItem) => ({
            id: item.id,
            survey_title: item.survey_title,
            respondent_email: item.respondent_email,
            completed_at: formatDate(item.completed_at),
            survey_id: item.survey_id,
        }));
    const pagination = responseData?.pagination;

    const emptyMessage: ReactNode = filterSurveyId ? (
        <div className="flex flex-col items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300 dark:text-slate-600"
            >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="12" y1="10" x2="12" y2="16" />
            </svg>
            <span>
                No responses yet for{" "}
                <span className="font-medium text-gray-700 dark:text-slate-200">
                    {selectedSurvey?.title ?? "this survey"}
                </span>
            </span>
            <button
                onClick={() => handleFilterChange('')}
                className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400 px-3 py-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
            >
                <Filter size={12} />
                Change Filter
            </button>
        </div>
    ) : (
        "No responses yet"
    );

    const columns = [
        { name: "Survey", key: "survey_title" },
        { name: "Email", key: "respondent_email" },
        { name: "Date", key: "completed_at" },
    ];

    function onView(row: GlobalResponseDisplay) {
        navigate(`/dashboard/responses/${row.survey_id}/${row.id}`, {
            state: { surveyTitle: row.survey_title }
        });
    }

    const handleFilterChange = (value: string) => {
        setFilterSurveyId(value);
        setPage(1);
    };

    const filterToolbar = (
        <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none" />
            <select
                value={filterSurveyId}
                onChange={(e) => handleFilterChange(e.target.value)}
                aria-label="Filter by survey"
                className="appearance-none pl-9 pr-8 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer max-w-[220px] truncate"
            >
                <option value="">All Surveys</option>
                {surveys.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none" />
        </div>
    );

    return (
        <>
            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>Global Responses</h1>
            </div>

            <Table
                columns={columns}
                data={responses}
                actions={['view']}
                onView={onView}
                searchable
                sortable
                loading={isLoading}
                emptyMessage={emptyMessage}
                totalItems={pagination?.total}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
                toolbar={filterToolbar}
            />
        </>
    );
};

export default GlobalResponses;

