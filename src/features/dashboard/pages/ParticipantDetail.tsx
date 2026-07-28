import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';
import { useSurveyParticipants } from '@/hooks/useQuery';

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

const ParticipantDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const { textTitle } = useTheme();
    const participantName = (location.state as { participantName?: string })?.participantName;
    const [page, setPage] = useState(1);

    const { data: responseData, isLoading } = useSurveyParticipants({ id: id!, page, limit: 10 });

    const participants: ParticipantDisplay[] = (responseData?.data || []).map((item: ParticipantItem) => ({
        name: item.name,
        email: item.email,
        response_count: item.response_count,
    }));
    const pagination = responseData?.pagination;

    const columns = [
        { name: "Name", key: "name" },
        { name: "Email", key: "email" },
        { name: "Responses", key: "response_count" },
    ];

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
                loading={isLoading}
                emptyMessage="No participants for this survey yet"
                totalItems={pagination?.total}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
            />
        </>
    );
};

export default ParticipantDetail;
