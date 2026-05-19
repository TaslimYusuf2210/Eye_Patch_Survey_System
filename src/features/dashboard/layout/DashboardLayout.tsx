import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import type { DashboardLayoutProps } from '@/types/dashboard/common';

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-poppins">
            <Sidebar />
            <main className="md:ml-64 min-h-screen p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
