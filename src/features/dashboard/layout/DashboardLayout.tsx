import Sidebar from './Sidebar';
import type { DashboardLayoutProps } from '@/types/dashboard/common';

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-50 font-poppins">
            <Sidebar />
            <main className="md:ml-64 min-h-screen p-8">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
