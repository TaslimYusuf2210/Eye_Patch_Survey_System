import { Search, Bell, Menu } from 'lucide-react';

interface HeaderProps {
    onOpenMobile: () => void;
}

const Header = ({ onOpenMobile }: HeaderProps) => {
    return (
        <header className="flex justify-between items-center w-full mb-8 gap-4">
            <button 
                onClick={onOpenMobile} 
                className="md:hidden p-2 rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800 text-gray-500 hover:text-black dark:hover:text-white border border-gray-200 transition-colors"
                aria-label="Open navigation menu"
            >
                <Menu size={20} />
            </button>

            <div className="flex items-center gap-4 justify-end ml-auto">
                <div className="relative w-36 sm:w-48 md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all text-sm"
                    />
                </div>

                <button className="bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                    <Bell size={20} />
                </button>
            </div>
        </header>
    );
};

export default Header;
