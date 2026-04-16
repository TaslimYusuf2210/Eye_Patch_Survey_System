import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, MessageSquare, Users, Settings } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-black';
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: FileText, label: 'Survey', path: '/dashboard/survey' },
        { icon: MessageSquare, label: 'Responses', path: '/dashboard/responses' },
        { icon: Users, label: 'Participant', path: '/dashboard/participant' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <aside className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 hidden md:flex flex-col font-poppins">
            <div className="p-6">
                <div className="font-gravitas text-xl tracking-wide cursor-pointer text-black">
                    Eye_Patch
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.path)}`}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 mt-auto border-t border-gray-100">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src="https://ui-avatars.com/api/?name=Indra+Lesmana&background=random"
                            alt="User"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 truncate">Indra Lesmana</p>
                        <p className="text-xs text-gray-500 truncate">View Profile</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
