import ParticipantTable from '../components/ParticipantTable';

const ParticipantList = () => {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Participants</h1>
            </div>

            <ParticipantTable />
        </>
    );
};

export default ParticipantList;
