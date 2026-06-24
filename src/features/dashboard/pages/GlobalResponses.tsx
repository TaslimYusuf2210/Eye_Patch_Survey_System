import { useState, useEffect } from 'react';
import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';
import { getGlobalResponse } from '@/services/dashboard/responses';
import {toast} from "sonner"

interface GlobalResponseItem {
    id: string;
    survey_id: string;
    survey_title: string;
    respondent_email: string;
    completed_at: string;
    started_at: string;
    time_taken_sec: number;
}

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const GlobalResponses = () => {
    const { textTitle } = useTheme();
    const [responses, setResponses] = useState<GlobalResponseItem[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>()

    const columns = [
        { name: "Survey", key: "survey_title" },
        { name: "Email", key: "respondent_email" },
        { name: "Date", key: "completed_at" },
        { name: "Time Taken", key: "time_taken_sec" },
    ];

    useEffect(() => {
        async function getResponses() {
            try {
                const response = await getGlobalResponse()
                setResponses(response.data)
                setPagination(response.pagination)
            } catch (error) {
                console.log(error)
                toast.error("Failed to get global response")
            }
        }

        getResponses()
    }, [])

    return (
        <>
            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>Global Responses</h1>
            </div>

            <Table
                columns={columns}
                data={responses}
                actions={['view']}
                onView={(row) => console.log(row)}
                searchable
                sortable
                emptyMessage="No responses yet"
                totalItems={pagination?.total}
                currentPage={pagination?.page}
                onPageChange={(page) => console.log("fetch page:", page)}
            />
        </>
    );
};

export default GlobalResponses;

