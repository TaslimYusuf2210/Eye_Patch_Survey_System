import { useState } from 'react';

const SettingsView = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'billing', label: 'Account & Billing' },
        { id: 'appearance', label: 'Global Appearance' },
        { id: 'theme', label: 'Theme Picture' },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your account settings and preferences.</p>
            </div>

            {/* Horizontal Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex items-center gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab.id
                                    ? 'text-black'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm min-h-[400px] p-8">
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">
                        {tabs.find(t => t.id === activeTab)?.label}
                    </h2>
                </div>

                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-4 bg-gray-50 rounded-full mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-gray-900 font-medium mb-1">Feature coming soon</h3>
                    <p className="text-gray-500 text-sm max-w-sm">
                        We are currently working on this feature. Check back later for updates.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
