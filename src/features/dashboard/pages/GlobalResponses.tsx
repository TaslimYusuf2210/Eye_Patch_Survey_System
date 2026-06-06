import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';

const GlobalResponses = () => {
    const { textTitle } = useTheme();
    return (
        <>
            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>All Responses</h1>
            </div>

            <Table />
        </>
    );
};

export default GlobalResponses;

