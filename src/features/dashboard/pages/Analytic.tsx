import StatsCard from '../components/StatsCard';
import RecentSurveyList from '../components/RecentSurveyList';
import { Search, Bell, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const Analytic = () => {
    const [userName, setUserName] = useState()

    async function getUserData() {
        // Get current user
        const { data, error } = await supabase.auth.getUser();
         if (error) throw error;
        const user = data.user;
        if (!user) throw new Error("User not logged in");
        // Fetch Profile
        const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        if (profileError) throw profileError;
        return profile;
    }
    useEffect(() => {
        getUserData().then(profile => {
            console.log(profile)
            setUserName(profile.user_name)
            console.log(userName)
        })
        // const userData = getUserData()
        // console.log(userData)
    }, [])
    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                {/* <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Dashboard</span>
                    <ChevronRight size={16} />
                    <span className="font-medium text-black">Analytic</span>
                </div> */}

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/10 transition-all text-sm"
                        />
                    </div>

                    <button className="bg-white p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
                        <Bell size={20} />
                    </button>

                    <button className="bg-white cursor-pointer text-black px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 shadow-sm hover:bg-gray-50 transition-all whitespace-nowrap">
                        Create Survey
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome {userName || "Guest"}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Survey Quantity"
                        value="13"
                        change={8}
                        chartColor="bg-black"
                    />
                    <StatsCard
                        title="Responses"
                        value="8"
                        change={3}
                        chartColor="bg-black"
                    />
                    <StatsCard
                        title="Question Responded"
                        value="38"
                        change={3}
                        chartColor="bg-black"
                    />
                    <StatsCard
                        title="New Questions"
                        value="83"
                        change={80}
                        chartColor="bg-black"
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
