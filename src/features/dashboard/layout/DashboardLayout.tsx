import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';


const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-poppins transition-colors duration-300">
            <Sidebar />
            <main className="md:ml-64 min-h-screen p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
