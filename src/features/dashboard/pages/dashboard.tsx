import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Analytic from './Analytic';

const Dashboard = () => {
    const { profileData } = useAuth();

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
