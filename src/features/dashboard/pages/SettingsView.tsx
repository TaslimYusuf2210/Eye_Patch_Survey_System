import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { useProfile } from '@/hooks/useQuery/useProfile';
import avatar1 from '@/assets/avatars/avatar1.svg';
import avatar2 from '@/assets/avatars/avatar2.svg';
import avatar3 from '@/assets/avatars/avatar3.svg';
import avatar4 from '@/assets/avatars/avatar4.svg';
import avatar5 from '@/assets/avatars/avatar5.svg';
import avatar6 from '@/assets/avatars/avatar6.svg';
import avatar7 from '@/assets/avatars/avatar7.svg';
import avatar8 from '@/assets/avatars/avatar8.svg';
import avatar9 from '@/assets/avatars/avatar9.svg';
import avatar10 from '@/assets/avatars/avatar10.svg';
import avatar11 from '@/assets/avatars/avatar11.svg';
import ProfileTab from '../components/settings/ProfileTab';
import AppearanceTab from '../components/settings/AppearanceTab';
import ThemeTab from '../components/settings/ThemeTab';

const avatarOptions = [
    avatar1, avatar2, avatar3, avatar4, avatar5,
    avatar6, avatar7, avatar8, avatar9, avatar10, avatar11,
];

const SettingsView = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabFromUrl && ['profile', 'appearance', 'theme'].includes(tabFromUrl) ? tabFromUrl : 'profile');
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const { accent, textTitle, textSubtitle } = useTheme();
    const { data: profileData } = useProfile();

    const isDefaultTheme = accent === 'default';

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'appearance', label: 'Global Appearance' },
        { id: 'theme', label: 'Theme Picture' },
    ];

    useEffect(() => {
        if (profileData) {
            setSelectedAvatar(profileData.avatar_url);
        }
    }, [profileData]);

    // Sync active tab to URL whenever it changes
    useEffect(() => {
        setSearchParams({ tab: activeTab }, { replace: true });
    }, [activeTab]);

    return (
        <div className="">
            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>Settings</h1>
                <p className={`${textSubtitle} text-sm mt-1`}>Manage your account settings and preferences.</p>
            </div>

            {/* Horizontal Tabs */}
            <div className="border-b border-gray-200 dark:border-slate-800 mb-6">
                <div className="flex items-center gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-sm font-medium transition-all relative ${
                                activeTab === tab.id
                                    ? `${textTitle} font-semibold`
                                    : 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200'
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${textTitle.includes('text-white') ? 'bg-white' : 'bg-slate-900 dark:bg-white'}`}></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-900 shadow-sm min-h-[400px] p-8 transition-colors duration-300">
                <div className="mb-6 pb-6 border-b border-gray-100 dark:border-slate-900">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        {tabs.find(t => t.id === activeTab)?.label}
                    </h2>
                </div>

                {activeTab === 'appearance' ? (
                <AppearanceTab />
                ) : activeTab === 'theme' ? (
                    <ThemeTab />
                ) : activeTab === 'profile' ? (
                    <ProfileTab
                        selectedAvatar={selectedAvatar}
                        setSelectedAvatar={setSelectedAvatar}
                        avatarOptions={avatarOptions}
                        user={profileData ?? null}
                        isDefaultTheme={isDefaultTheme}
                        textTitle={textTitle}
                        textSubtitle={textSubtitle}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-full mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-gray-900 dark:text-white font-medium mb-1">Feature coming soon</h3>
                        <p className="text-gray-500 text-sm max-w-sm">
                            We are currently working on this feature. Check back later for updates.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsView;
