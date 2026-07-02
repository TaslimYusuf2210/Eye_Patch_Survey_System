import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';
import { getParticipantsBySurveyId } from '@/services/dashboard/participants';
import { toast } from "sonner"

interface ParticipantItem {
    id: string;
    name: string;
    email: string;
    status: string;
    response_count: number;
    created_at: string;
}

interface ParticipantDisplay {
    name: string;
    email: string;
    response_count: number;
}

interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

const ParticipantDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const { textTitle } = useTheme();
    const participantName = (location.state as { participantName?: string })?.participantName;

    const [participants, setParticipants] = useState<ParticipantDisplay[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>()
    const [loading, setLoading] = useState(false)

    const columns = [
        { name: "Name", key: "name" },
        { name: "Email", key: "email" },
        { name: "Responses", key: "response_count" },
    ];

    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchParticipants() {
            setLoading(true)
            try {
                const response = await getParticipantsBySurveyId({ id: id!, page, limit: 10 })
                const mapped = response.data.map((item: ParticipantItem) => ({
                    name: item.name,
                    email: item.email,
                    response_count: item.response_count,
                }))
                setParticipants(mapped)
                setPagination(response.pagination)
            } catch (error: any) {
                console.log(error)
                toast.error(error?.userMessage || "Failed to load participants")
            } finally {
                setLoading(false)
            }
        }

        fetchParticipants()
    }, [id, page])

    return (
        <>
            {/* Header */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-8">
                <Link to="/dashboard/participant" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                    <ChevronLeft size={16} />
                    Back to Participants
                </Link>
            </div>

            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>{participantName ?? "Survey Participants"}</h1>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Survey ID: {id}</p>
            </div>

            <Table
                columns={columns}
                data={participants}
                actions={[]}
                searchable
                sortable
                loading={loading}
                emptyMessage="No participants for this survey yet"
                totalItems={pagination?.total}
                currentPage={pagination?.page}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
            />
        </>
    );
};

export default ParticipantDetail;
