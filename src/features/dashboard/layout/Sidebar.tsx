import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, MessageSquare, Users, Settings, PencilRuler } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuth();
    const { accent } = useTheme();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: FileText, label: 'Surveys', path: '/dashboard/surveys' },
        { icon: PencilRuler, label: 'Create Survey', path: '/dashboard/create-survey' },
        { icon: MessageSquare, label: 'Responses', path: '/dashboard/responses' },
        { icon: Users, label: 'Participant', path: '/dashboard/participant' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-slate-950 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-slate-900 hidden md:flex flex-col font-poppins transition-colors duration-300">
            <div className="p-6">
                <div className="font-gravitas text-xl tracking-wide cursor-pointer text-black dark:text-white">
                    Eye_Patch
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                active
                                    ? accent === 'default'
                                        ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 font-semibold shadow-sm'
                                        : 'bg-accent-600 text-white font-semibold shadow-sm'
                                    : 'text-slate-600 hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/30'
                            }`}
                        >
                            <item.icon 
                                size={20} 
                                className={`transition-colors duration-200 ${
                                    active
                                        ? accent === 'default'
                                            ? 'text-slate-900 dark:text-slate-100'
                                            : 'text-white'
                                        : 'text-slate-400 dark:text-slate-500 group-hover:text-accent-600 dark:group-hover:text-accent-400'
                                }`} 
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-gray-150 dark:border-slate-900">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden">
                        <img
                            src="https://ui-avatars.com/api/?name=Indra+Lesmana&background=random"
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">{user?.user_name || "Loading..."}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 truncate">View Profile</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
