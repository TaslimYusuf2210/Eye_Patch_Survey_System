import { useState } from 'react';
import Table from '../../../components/table';
import { useTheme } from '@/contexts/ThemeContext';

const GlobalResponses = () => {
    const { textTitle } = useTheme();
    const [responses] = useState<any[]>([]);

    const columns = [
        { name: "Survey", key: "survey" },
        { name: "Email", key: "email" },
        { name: "Date", key: "date" },
        { name: "Time Taken", key: "timeTaken" },
    ];

    return (
        <>
            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>Global Responses</h1>
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

export default GlobalResponses;

