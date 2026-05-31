import StatsCard from '../components/Analytic/StatsCard';
import RecentSurveyList from '../components/Analytic/RecentSurveyList';
import { Search, Bell } from 'lucide-react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Analytic = () => {
    const { user } = useAuth();

    useEffect(() => {
    }, [])

    
    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className='flex justify-between w-full'>
                    <div></div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={20} />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all text-sm"
                            />
                        </div>

                        <button className="bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
                            <Bell size={20} />
                        </button>

                        {/* <button className="bg-white cursor-pointer text-black px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-50 transition-all whitespace-nowrap">
                            Create Survey
                        </button> */}
                    </div>
                </div>
            </div>

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
