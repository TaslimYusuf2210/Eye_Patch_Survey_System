import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, Loader2, ExternalLink, Settings } from 'lucide-react';
import { globalSearch } from '@/services/dashboard/surveys';

interface SearchResults {
    surveys: { id: string; title: string; status: string }[];
    responses: { id: string; respondent_email: string; survey_id: string }[];
}

const settingsSearchMap = [
    { keywords: ['theme', 'dark', 'dark mode', 'light', 'light mode', 'default mode'], tab: 'appearance', label: 'Appearance (Theme)' },
    { keywords: ['accent', 'accent color', 'color', 'blue', 'green', 'red', 'purple', 'ocean blue', 'forest green', 'crimson red', 'royal purple'], tab: 'appearance', label: 'Appearance (Accent Color)' },
    { keywords: ['avatar', 'picture', 'profile picture', 'profile photo', 'profile pic', 'theme picture'], tab: 'theme', label: 'Theme Picture & Avatar' },
    { keywords: ['profile', 'username', 'name', 'email', 'password', 'user info', 'personal'], tab: 'profile', label: 'Profile Settings' },
    { keywords: ['billing', 'account', 'subscription', 'payment', 'plan', 'invoice'], tab: 'billing', label: 'Account & Billing' },
    { keywords: ['settings', 'preferences', 'preference', 'setting', 'options'], tab: 'profile', label: 'Settings' },
];

interface HeaderProps {
    onOpenMobile: () => void;
}

const Header = ({ onOpenMobile }: HeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResults | null>(null);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Clear search when navigating to a different route
    useEffect(() => {
        setQuery('');
        setResults(null);
        setShowDropdown(false);
    }, [location.pathname]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
                inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    // Debounced search
    useEffect(() => {
        if (!query.trim()) {
            setResults(null);
            setShowDropdown(false);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await globalSearch({ q: query, type: 'all', limit: 5 });
                setResults(res);
                setShowDropdown(true);
            } catch {
                setResults(null);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const q = query.trim().toLowerCase();
    const matchedSettings = q ? settingsSearchMap.filter(item =>
        item.keywords.some(kw => q.includes(kw) || kw.includes(q))
    ) : [];

    const totalCount = (results?.surveys?.length || 0) +
        (results?.responses?.length || 0) +
        matchedSettings.length;

    return (
        <header className="flex justify-between items-center w-full mb-4 sm:mb-6 lg:mb-8 gap-4">
            <button
                onClick={onOpenMobile}
                className="md:hidden p-2 rounded-lg bg-white dark:bg-slate-950 dark:border-slate-800 text-gray-500 hover:text-black dark:hover:text-white border border-gray-200 transition-colors cursor-pointer"
                aria-label="Open navigation menu"
            >
                <Menu size={20} />
            </button>

            <div className="flex items-center gap-4 justify-end ml-auto">
                <div className="relative w-36 sm:w-48 md:w-72 lg:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search surveys, responses..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query.trim() && setShowDropdown(true)}
                        className="w-full pl-10 pr-10 py-2 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-200 focus:border-accent-500 transition-all text-sm"
                    />
                    {loading && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 animate-spin" size={18} />
                    )}

                    {/* Search Dropdown */}
                    {showDropdown && query.trim() && (
                        <div
                            ref={dropdownRef}
                            className="absolute top-full mt-1 left-0 right-0 z-50"
                        >
                            <div className="bg-white dark:bg-slate-950 rounded-xl border border-gray-200 dark:border-slate-800 shadow-lg overflow-hidden max-h-[70vh] overflow-y-auto">
                                {totalCount === 0 && !loading ? (
                                    <div className="p-6 text-center text-sm text-gray-500 dark:text-slate-400">
                                        No results found for "{query}"
                                    </div>
                            ) : (
                                <div className="py-2">
                                    {/* Surveys */}
                                    {results?.surveys && results.surveys.length > 0 && (
                                        <div>
                                            <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                                                Surveys
                                            </p>
                                            {results.surveys.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => { navigate(`/dashboard/surveys/${item.id}/view`); setShowDropdown(false); setQuery(''); }}
                                                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors text-left cursor-pointer"
                                                >
                                                    <span className="text-xs font-medium text-gray-900 dark:text-white flex-1 truncate">{item.title}</span>
                                                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium uppercase ${
                                                        item.status?.toLowerCase() === 'active' ? 'text-green-600 bg-green-50 dark:text-emerald-400 dark:bg-emerald-950/30' :
                                                        item.status?.toLowerCase() === 'draft' ? 'text-gray-500 bg-gray-100 dark:text-slate-400 dark:bg-slate-800' :
                                                        item.status?.toLowerCase() === 'inactive' ? 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30' :
                                                        'text-red-500 bg-red-50 dark:text-rose-400 dark:bg-rose-950/30'
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                    <ExternalLink size={12} className="text-gray-300 dark:text-slate-600 shrink-0" />
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Responses */}
                                    {results?.responses && results.responses.length > 0 && (
                                        <div className="mt-1">
                                            <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                                                Responses
                                            </p>
                                            {results.responses.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => { navigate(`/dashboard/responses/${item.survey_id}/${item.id}`); setShowDropdown(false); setQuery(''); }}
                                                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors text-left cursor-pointer"
                                                >
                                                    <span className="text-xs text-gray-700 dark:text-slate-300 flex-1 truncate">{item.respondent_email}</span>
                                                    <ExternalLink size={12} className="text-gray-300 dark:text-slate-600 shrink-0" />
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Settings */}
                                    {matchedSettings.length > 0 && (
                                        <div className="mt-1">
                                            <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                                                Settings
                                            </p>
                                            {matchedSettings.map((item, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => { navigate(`/dashboard/settings?tab=${item.tab}`); setShowDropdown(false); setQuery(''); }}
                                                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors text-left cursor-pointer"
                                                >
                                                    <Settings size={14} className="text-gray-400 dark:text-slate-500 shrink-0" />
                                                    <span className="text-xs font-medium text-gray-900 dark:text-white flex-1 truncate">{item.label}</span>
                                                    <ExternalLink size={12} className="text-gray-300 dark:text-slate-600 shrink-0" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                    </div>

                    <button className="bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900 p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors cursor-pointer">
                        <Bell size={20} />
                    </button>
                </div>
        </header>
    );
};

export default Header;
