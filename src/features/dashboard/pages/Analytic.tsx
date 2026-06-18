import StatsCard from '../components/Analytic/StatsCard';
import RecentSurveyList from '../components/Analytic/RecentSurveyList';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Spiral } from 'ldrs/react'
import 'ldrs/react/Spiral.css'

const Analytic = () => {
    const { user } = useAuth();
    const { textTitle } = useTheme();

    useEffect(() => {
    }, [])

    
    return (
        <>
            {/* Stats Grid */}

            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle} mb-6`}>Welcome {user?.userName || 
                    <Spiral
                    size="40"
                    speed="0.9"
                    color="black" 
                    />
                    }

                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-col-4 gap-6">
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
            <div className="grid grid-cols-1  gap-8">
                {/* Recent Surveys */}
                <div className="w-full lg:w-3/4">
                    <RecentSurveyList />
                </div>

                {/* Right Column (Placeholder for future widgets or just empty space as requested to remove "AI Power") */}
                {/* <div className="hidden xl:block"> */}
                    {/* Intentionally left empty or could be used for other widgets */}
                {/* </div> */}
            </div>
        </>
    );
};

export default Analytic;
