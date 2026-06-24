import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';

const SurveyResponses = () => {
    const { id } = useParams();
    const { textTitle } = useTheme();
    const [responses] = useState<any[]>([]);

    const columns = [
        { name: "Respondent", key: "respondent" },
        { name: "Email", key: "email" },
        { name: "Date", key: "date" },
        { name: "Status", key: "status" },
    ];

    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                    <Link to={`/dashboard/survey/${id}`} className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                        <ChevronLeft size={16} />
                        Back to Survey Details
                    </Link>
                </div>
            </div>

            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>Responses for [Survey Title]</h1>
            </div>

            <Table
                columns={columns}
                data={responses}
                actions={['view']}
                onView={(row) => console.log(row)}
                searchable
                sortable
                emptyMessage="No responses yet"
            />
        </>
    );
};

export default SurveyResponses;
