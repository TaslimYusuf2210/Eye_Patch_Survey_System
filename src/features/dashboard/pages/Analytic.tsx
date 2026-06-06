import StatsCard from '../components/Analytic/StatsCard';
import RecentSurveyList from '../components/Analytic/RecentSurveyList';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Analytic = () => {
    const { user } = useAuth();

    useEffect(() => {
    }, [])

    
    return (
        <>
            {/* Stats Grid */}

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-6">Welcome {user?.user_name || "Loading..."}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Survey Quantity"
                        value="13"
                        change={8}
                        chartColor="bg-accent-600"
                    />
                    <StatsCard
                        title="Responses"
                        value="8"
                        change={3}
                        chartColor="bg-accent-600"
                    />
                    <StatsCard
                        title="Question Responded"
                        value="38"
                        change={3}
                        chartColor="bg-accent-600"
                    />
                    <StatsCard
                        title="New Questions"
                        value="83"
                        change={80}
                        chartColor="bg-accent-600"
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Surveys */}
                <div className="lg:col-span-2">
                    <RecentSurveyList />
                </div>

                {/* Right Column (Placeholder for future widgets or just empty space as requested to remove "AI Power") */}
                <div className="hidden lg:block">
                    {/* Intentionally left empty or could be used for other widgets */}
                </div>
            </div>
        </>
    );
};

export default Analytic;
