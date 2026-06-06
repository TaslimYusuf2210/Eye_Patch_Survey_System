import ParticipantTable from '../components/ParticipantList/ParticipantTable';
import { useTheme } from '@/contexts/ThemeContext';

const ParticipantList = () => {
    const { textTitle } = useTheme();
    return (
        <>
            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>Participants</h1>
            </div>

            <ParticipantTable />
        </>
    );
};

export default ParticipantList;

