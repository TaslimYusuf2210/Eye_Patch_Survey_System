import StatsCard from '../components/Analytic/StatsCard';
import RecentSurveyList from '../components/Analytic/RecentSurveyList';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Spiral } from 'ldrs/react'
import 'ldrs/react/Spiral.css'
import { useDashboardStats, useRecentSurveys } from '@/hooks/useQuery';
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'


const Analytic = () => {
    const { profileData } = useAuth();
    const { textTitle } = useTheme();

    const {
        data: dashboardStats,
    } = useDashboardStats();

    const {
        data: recentSurveys,
    } = useRecentSurveys();

    // Statistics derived from the dashboardStats state, with fallbacks to loading spinners
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
                <h1 className={`text-2xl font-bold ${textTitle} mb-6`}>Welcome {profileData?.user_name || 
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
                    <RecentSurveyList surveys={recentSurveys || []} />
                </div>
            </div>
        </>
    );
};

export default Analytic;
