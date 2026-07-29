import { useEffect } from 'react';
import { useProfile } from '@/hooks/useQuery/useProfile';
import Analytic from './Analytic';

const Dashboard = () => {
    const { data: profileData } = useProfile();

    useEffect(() => {
        console.log('Dashboard profileData:', profileData);
    }, [profileData]);

    return (
        <div>
            <Analytic />
        </div>
    );
};

export default Dashboard;
