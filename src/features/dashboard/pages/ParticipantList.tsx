import ParticipantTable from '../components/ParticipantList/ParticipantTable';

const ParticipantList = () => {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Participants</h1>
            </div>

            <ParticipantTable />
        </>
    );
};

export default ParticipantList;
