import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, MessageSquare, Users, Settings, PencilRuler, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useRef, useEffect } from 'react';

interface SidebarProps {
    isMobileOpen: boolean;
    onCloseMobile: () => void;
    isTabletToggled: boolean;
    setIsTabletToggled: (val: boolean) => void;
    isTabletHovered: boolean;
    setIsTabletHovered: (val: boolean) => void;
}

const Sidebar = ({
    isMobileOpen,
    onCloseMobile,
    isTabletToggled,
    setIsTabletToggled,
    isTabletHovered,
    setIsTabletHovered
}: SidebarProps) => {
    const location = useLocation();
    const { user } = useAuth();
    const { accent } = useTheme();
    const sidebarRef = useRef<HTMLDivElement>(null);

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

    // Detect click outside for tablet touch toggled state
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isTabletToggled && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsTabletToggled(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isTabletToggled, setIsTabletToggled]);

    const isExpanded = isTabletHovered || isTabletToggled;

    // Render navigation list
    const renderNavLinks = (showLabels: boolean) => {
        return navItems.map((item) => {
            const active = isActive(item.path);
            return (
                <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                        onCloseMobile();
                        setIsTabletToggled(false);
                    }}
                    className={`group flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        active
                            ? accent === 'default'
                                ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100 font-semibold shadow-sm'
                                : 'bg-accent-600 text-white font-semibold shadow-sm'
                            : 'text-slate-600 hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/30'
                    }`}
                >
                    <item.icon 
                        size={20} 
                        className={`min-w-[20px] transition-colors duration-200 ${
                            active
                                ? accent === 'default'
                                    ? 'text-slate-900 dark:text-slate-100'
                                    : 'text-white'
                                : 'text-slate-400 dark:text-slate-500 group-hover:text-accent-600 dark:group-hover:text-accent-400'
                        }`} 
                    />
                    <span 
                        className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
                            showLabels 
                                ? 'opacity-100 max-w-xs' 
                                : 'opacity-0 max-w-0 md:hidden lg:opacity-100 lg:max-w-xs lg:block'
                        }`}
                    >
                        {item.label}
                    </span>
                </Link>
            );
        });
    };

    return (
        <>
            {/* MOBILE BACKDROP */}
            <div 
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden ${
                    isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={onCloseMobile}
            />

            {/* MOBILE DRAWER */}
            <aside 
                role="dialog"
                aria-modal="true"
                aria-label="Navigation Menu"
                className={`fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-white dark:bg-slate-950 z-50 md:hidden flex flex-col font-poppins transition-transform duration-300 border-l border-gray-200 dark:border-slate-900 ${
                    isMobileOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-150 dark:border-slate-900">
                    <div className={`font-gravitas text-xl tracking-wide ${
                        accent === 'default' ? 'text-black dark:text-white' : 'text-accent-600 dark:text-accent-400'
                    }`}>
                        Eye_Patch
                    </div>
                    <button 
                        onClick={onCloseMobile}
                        className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-6">
                    {renderNavLinks(true)}
                </nav>

                <div className="p-4 border-t border-gray-150 dark:border-slate-900">
                    <div className="flex items-center gap-3 p-2 rounded-lg">
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

            {/* TABLET / DESKTOP SIDEBAR */}
            <aside 
                ref={sidebarRef}
                onMouseEnter={() => setIsTabletHovered(true)}
                onMouseLeave={() => setIsTabletHovered(false)}
                className={`bg-white dark:bg-slate-950 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-slate-900 hidden md:flex flex-col font-poppins transition-all duration-300 ease-in-out z-40 ${
                    isExpanded 
                        ? 'w-64 shadow-xl' 
                        : 'w-16 lg:w-64'
                }`}
            >
                <div className="px-4 py-10 flex items-center justify-between">
                    <div 
                        onClick={() => setIsTabletToggled(!isTabletToggled)}
                        className={`font-gravitas text-xl tracking-wide cursor-pointer transition-all duration-300 ${
                            accent === 'default'
                                ? 'text-black dark:text-white'
                                : 'text-accent-600 dark:text-accent-400'
                        }`}
                    >
                        <span className="hidden lg:inline">Eye_Patch</span>
                        <span className="lg:hidden">{isExpanded ? 'Eye_Patch' : 'EP'}</span>
                    </div>
                </div>

                <nav className="flex-1 px-2 space-y-2 mt-4">
                    {renderNavLinks(isExpanded)}
                </nav>

                <div className="p-4 border-t border-gray-150 dark:border-slate-900">
                    <div 
                        onClick={() => setIsTabletToggled(!isTabletToggled)}
                        className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden shrink-0">
                            <img
                                src="https://ui-avatars.com/api/?name=Indra+Lesmana&background=random"
                                alt="User"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className={`flex-1 overflow-hidden transition-all duration-300 ${
                            isExpanded ? 'opacity-100' : 'opacity-0 md:hidden lg:opacity-100 lg:block'
                        }`}>
                            <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">{user?.user_name || "Loading..."}</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400 truncate">View Profile</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
