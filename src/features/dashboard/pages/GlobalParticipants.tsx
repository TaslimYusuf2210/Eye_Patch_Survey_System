import { useState } from 'react';
import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';
import { useGlobalParticipants } from '@/hooks/useQuery';
import { useNavigate } from 'react-router-dom';


interface ParticipantItem {
    id: string;
    name: string;
    email: string;
    status: string;
    response_count: number;
    created_at: string;
}

interface ParticipantDisplay {
    id: string;
    name: string;
    email: string;
    response_count: number;
}

const GlobalParticipants = () => {
    const { textTitle } = useTheme();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { data: responseData, isLoading } = useGlobalParticipants({ page, limit: 10 });

    const participants: ParticipantDisplay[] = (responseData?.data || []).map((item: ParticipantItem) => ({
        id: item.id,
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
            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>Participants</h1>
            </div>

            <Table
                columns={columns}
                data={participants}
                actions={['view']}
                onView={(row) => navigate(`/dashboard/participant/${row.id}`, {
                    state: { participantName: row.name }
                })}
                searchable
                sortable
                loading={isLoading}
                emptyMessage="No participants yet"
                totalItems={pagination?.total}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
            />
        </>
    );
};

export default GlobalParticipants;
