import ResponseTable from '../../components/dashboard/ResponseTable';
import Table from '../../components/utils/table';

const GlobalResponses = () => {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">All Responses</h1>
            </div>

            <Table />
        </>
    );
};

export default GlobalResponses;
