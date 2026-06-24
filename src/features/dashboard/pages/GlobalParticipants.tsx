import { useState, useEffect } from 'react';
import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';
import { getGlobalParticipants } from '@/services/dashboard/participants';
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

const GlobalParticipants = () => {
    const { textTitle } = useTheme();
    const [participants, setParticipants] = useState<ParticipantDisplay[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo>()
    const [loading, setLoading] = useState(false)

    const columns = [
        { name: "Name", key: "name" },
        { name: "Email", key: "email" },
        { name: "Responses", key: "response_count" },
    ];

    useEffect(() => {
        async function fetchParticipants() {
            setLoading(true)
            try {
                const response = await getGlobalParticipants()
                const mapped = response.data.map((item: ParticipantItem) => ({
                    name: item.name,
                    email: item.email,
                    response_count: item.response_count,
                }))
                setParticipants(mapped)
                setPagination(response.pagination)
            } catch (error) {
                console.log(error)
                toast.error("Failed to load participants")
            } finally {
                setLoading(false)
            }
        }

        fetchParticipants()
    }, [])

    return (
        <>
            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>Participants</h1>
            </div>

            <Table
                columns={columns}
                data={participants}
                actions={['view']}
                onView={(row) => console.log(row)}
                searchable
                sortable
                loading={loading}
                emptyMessage="No participants yet"
                totalItems={pagination?.total}
                currentPage={pagination?.page}
                onPageChange={(page) => console.log("fetch page:", page)}
            />
        </>
    );
};

export default GlobalParticipants;
