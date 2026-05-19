import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Table from '../../../components/table';

const SurveyResponses = () => {
    const { id } = useParams();

    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link to={`/dashboard/survey/${id}`} className="hover:text-black flex items-center gap-1">
                        <ChevronLeft size={16} />
                        Back to Survey Details
                    </Link>
                </div>
            </div>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Responses for [Survey Title]</h1>
            </div>

            <Table/>
        </>
    );
};

export default SurveyResponses;
