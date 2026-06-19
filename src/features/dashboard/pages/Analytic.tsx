import StatsCard from '../components/Analytic/StatsCard';
import RecentSurveyList from '../components/Analytic/RecentSurveyList';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Spiral } from 'ldrs/react'
import 'ldrs/react/Spiral.css'
import {getDashboardStats, getRecentSurveys} from '@/services/dashboard/analytics';
import type { DashboardStats, RecentSurvey } from '@/types';
import {toast} from 'sonner';
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'


const Analytic = () => {
    const { user } = useAuth();
    const { textTitle } = useTheme();

    const [recentSurveys, setRecentSurveys] = useState<RecentSurvey[]>([]);
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await getDashboardStats();
                console.log('Dashboard Stats:', response.data);
                setDashboardStats(response.data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
                toast.error('Error fetching dashboard stats. Please refresh page or try again later.');
            }
        };

        const fetchRecentSurveys = async () => {
            try {
                const response = await getRecentSurveys();
                console.log('Recent Surveys:', response.data.data);
                setRecentSurveys(response.data.data);
            } catch (error) {
                console.error('Error fetching recent surveys:', error);
                toast.error('Error fetching recent surveys. Please refresh page or try again later.');
            }
        };

        fetchDashboardStats();
        fetchRecentSurveys();
    }, []);

    // Statistics derived from the dashboardStats state, with fallbacks to "..." while loading
    const surveyQuantity = dashboardStats ? dashboardStats.survey_quantity.toString() : <Bouncy size="25" speed="1.5" color="black" />;
    const totalResponses = dashboardStats ? dashboardStats.total_responses.toString() : <Bouncy size="25" speed="1.5" color="black" />;
    const questionsResponded = dashboardStats ? dashboardStats.questions_responded.toString() : <Bouncy size="25" speed="1.5" color="black" />;
    const newQuestions = dashboardStats ? dashboardStats.new_questions.toString() : <Bouncy size="25" speed="1.5" color="black" />;
    const surveyQuantityChange = dashboardStats ? dashboardStats.change_percentages.survey_quantity : 0;
    const totalResponsesChange = dashboardStats ? dashboardStats.change_percentages.total_responses : 0;
    const questionsRespondedChange = dashboardStats ? dashboardStats.change_percentages.questions_responded : 0;
    const newQuestionsChange = dashboardStats ? dashboardStats.change_percentages.new_questions : 0;

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
                        value={surveyQuantity}
                        change={surveyQuantityChange}
                        chartColor="bg-accent-600"
                    />
                    <StatsCard
                        title="Responses"
                        value={totalResponses}
                        change={totalResponsesChange}
                        chartColor="bg-accent-600"
                    />
                    <StatsCard
                        title="Question Responded"
                        value={questionsResponded}
                        change={questionsRespondedChange}
                        chartColor="bg-accent-600"
                    />
                    <StatsCard
                        title="New Questions"
                        value={newQuestions}
                        change={newQuestionsChange}
                        chartColor="bg-accent-600"
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1  gap-8">
                {/* Recent Surveys */}
                <div className="w-full lg:w-3/4">
                    <RecentSurveyList surveys={recentSurveys} />
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
