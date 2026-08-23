import { useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';
import { formatDate } from '@/lib/utils';
import { useSurveyResponses } from '@/hooks/useQuery';

interface AnswerItem {
    question_id: string;
    question_text: string;
    question_required: boolean;
    section_title?: string;
    answer_text?: string;
    likert_value?: number;
    yes_no_value?: boolean;
    selected_options?: string[];
    options?: string[];
}

interface ResponseItem {
    id: string;
    survey_id: string;
    survey_title: string;
    respondent_email: string;
    completed_at: string;
    started_at: string;
    time_taken_sec: number;
    answers: AnswerItem[];
}

interface ResponseDisplay {
    id: string;
    respondent_email: string;
    completed_at: string;
    answers: AnswerItem[];
}

const ResponseDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const { textTitle } = useTheme();
    const surveyTitle = (location.state as { surveyTitle?: string })?.surveyTitle;
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { data: responseData, isLoading } = useSurveyResponses({ id: id!, page, limit: 10 });

    const responses: ResponseDisplay[] = (responseData?.data || []).map((item: ResponseItem) => ({
        id: item.id,
        respondent_email: item.respondent_email,
        completed_at: formatDate(item.completed_at),
        answers: item.answers,
    }));
    const pagination = responseData?.pagination;

    const columns = [
        { name: "Email", key: "respondent_email" },
        { name: "Date", key: "completed_at" },
    ];

    return (
        <>
            {/* Header */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-8">
                <Link to="/dashboard/responses" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                    <ChevronLeft size={16} />
                    Back to Responses
                </Link>
            </div>

            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>{surveyTitle ?? "Survey Responses"}</h1>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Survey ID: {id}</p>
            </div>

            <Table
                columns={columns}
                data={responses}
                actions={['view']}
                onView={(row: any) => navigate(`/dashboard/responses/${id}/${row.id}`, {
                    state: { response: row }
                })}
                searchable
                sortable
                responsive
                loading={isLoading}
                emptyMessage="No responses for this survey yet"
                totalItems={pagination?.total}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
            />
        </>
    );
};

export default ResponseDetail;
