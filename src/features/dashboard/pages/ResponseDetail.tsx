import { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';
import { formatDate } from '@/lib/utils';
import { getResponseById } from '@/services/dashboard/responses';
import { toast } from "sonner"

interface AnswerItem {
    question_id: string;
    question_text: string;
    answer_text?: string;
    likert_value?: number;
    yes_no_value?: boolean;
    selected_options?: string[];
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
    time_taken_sec: number;
    answers: AnswerItem[];
}

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const ResponseDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const { textTitle } = useTheme();
    const surveyTitle = (location.state as { surveyTitle?: string })?.surveyTitle;

    const navigate = useNavigate()

    const [responses, setResponses] = useState<ResponseDisplay[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>()
    const [loading, setLoading] = useState(false)

    const columns = [
        { name: "Email", key: "respondent_email" },
        { name: "Date", key: "completed_at" },
        { name: "Time Taken", key: "time_taken_sec" },
    ];

    useEffect(() => {
        console.log('ResponseDetail reached — survey ID:', id);
        async function fetchResponses() {
            setLoading(true)
            try {
                const response = await getResponseById({ id: id!, page: 1, limit: 20 })
                const mapped = response.data.map((item: ResponseItem) => ({
                    id: item.id,
                    respondent_email: item.respondent_email,
                    completed_at: formatDate(item.completed_at),
                    time_taken_sec: item.time_taken_sec,
                    answers: item.answers,
                }))
                setResponses(mapped)
                setPagination(response.pagination)
            } catch (error: any) {
                console.log(error)
                toast.error(error?.userMessage || "Failed to load responses")
            } finally {
                setLoading(false)
            }
        }

        fetchResponses()
    }, [id])

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
                loading={loading}
                emptyMessage="No responses for this survey yet"
                totalItems={pagination?.total}
                currentPage={pagination?.page}
                onPageChange={(page) => console.log("fetch page:", page)}
            />
        </>
    );
};

export default ResponseDetail;
