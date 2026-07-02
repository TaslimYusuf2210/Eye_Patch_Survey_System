import { useState, useEffect } from 'react';
import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';
import { formatDate } from '@/lib/utils';
import { getGlobalResponse } from '@/services/dashboard/responses';
import {toast} from "sonner"
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
    survey_title: string;
    respondent_email: string;
    completed_at: string;
    time_taken_sec: number;
    survey_id: string;
}

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const GlobalResponses = () => {
    const { textTitle } = useTheme();
    const [responses, setResponses] = useState<GlobalResponseDisplay[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const columns = [
        { name: "Survey", key: "survey_title" },
        { name: "Email", key: "respondent_email" },
        { name: "Date", key: "completed_at" },
        { name: "Time Taken", key: "time_taken_sec" },
    ];

    const [page, setPage] = useState(1);

    useEffect(() => {
        async function getResponses() {
            setLoading(true)
            try {
                const response = await getGlobalResponse({ page, limit: 10 })
                const mapped = response.data.map((item: GlobalResponseItem) => ({
                    survey_title: item.survey_title,
                    respondent_email: item.respondent_email,
                    completed_at: formatDate(item.completed_at),
                    time_taken_sec: item.time_taken_sec,
                    survey_id: item.survey_id,
                }))
                setResponses(mapped)
                setPagination(response.pagination)
            } catch (error: any) {
                console.log(error)
                toast.error(error?.userMessage || "Failed to get global response")
            } finally {
                setLoading(false)
            }
        }

        getResponses()
    }, [page])

    function onView (row:GlobalResponseDisplay) {
        navigate(`/dashboard/responses/${row.survey_id}`, {
            state: { surveyTitle: row.survey_title }
        })
    }

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
                loading={loading}
                emptyMessage="No responses yet"
                totalItems={pagination?.total}
                currentPage={pagination?.page}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
            />
        </>
    );
};

export default GlobalResponses;

