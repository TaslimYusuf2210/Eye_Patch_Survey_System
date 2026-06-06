import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MoreHorizontal, Copy, QrCode, Code, Edit3, Settings, PieChart, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const SurveyDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('builder');
    const { textTitle, textSubtitle } = useTheme();

    // Mock data based on ID (real app would fetch this)
    const survey = {
        id: id,
        title: 'User Journey Exploration',
        status: 'Active',
        responses: 83,
        total: 50,
        lastUpdated: '2 hours ago'
    };

    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                    <Link to="/dashboard/survey" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                        <ChevronLeft size={16} />
                        Back to List
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-100 dark:bg-emerald-950/50 text-green-700 dark:text-emerald-300 rounded-full text-xs font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Live
                    </span>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-lg text-gray-500 dark:text-slate-400 transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>

            <div className="mb-8">
                <h1 className={`text-3xl font-bold ${textTitle}`}>{survey.title}</h1>
                <p className={`${textSubtitle} mt-2 text-sm`}>Last updated {survey.lastUpdated} • {survey.responses} Responses</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-slate-800 mb-8 overflow-x-auto">
                <div className="flex items-center gap-8 min-w-max">
                    <button
                        onClick={() => setActiveTab('builder')}
                        className={`pb-4 text-sm font-medium flex items-center gap-2 transition-colors relative ${activeTab === 'builder' ? textTitle : `${textSubtitle} hover:${textTitle}`
                            }`}
                    >
                        <Edit3 size={18} />
                        Builder
                        {activeTab === 'builder' && <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-t-full ${textTitle.includes('text-white') ? 'bg-white' : 'bg-slate-900 dark:bg-white'}`}></span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('share')}
                        className={`pb-4 text-sm font-medium flex items-center gap-2 transition-colors relative ${activeTab === 'share' ? textTitle : `${textSubtitle} hover:${textTitle}`
                            }`}
                    >
                        <Share2 size={18} />
                        Share
                        {activeTab === 'share' && <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-t-full ${textTitle.includes('text-white') ? 'bg-white' : 'bg-slate-900 dark:bg-white'}`}></span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`pb-4 text-sm font-medium flex items-center gap-2 transition-colors relative ${activeTab === 'analytics' ? textTitle : `${textSubtitle} hover:${textTitle}`
                            }`}
                    >
                        <PieChart size={18} />
                        Analytics
                        {activeTab === 'analytics' && <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-t-full ${textTitle.includes('text-white') ? 'bg-white' : 'bg-slate-900 dark:bg-white'}`}></span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`pb-4 text-sm font-medium flex items-center gap-2 transition-colors relative ${activeTab === 'settings' ? textTitle : `${textSubtitle} hover:${textTitle}`
                            }`}
                    >
                        <Settings size={18} />
                        Settings
                        {activeTab === 'settings' && <span className={`absolute bottom-0 left-0 w-full h-0.5 rounded-t-full ${textTitle.includes('text-white') ? 'bg-white' : 'bg-slate-900 dark:bg-white'}`}></span>}
                    </button>
                </div>
            </div>

            {/* Content based on Tab */}
            <div className="bg-white dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm min-h-[400px] p-8">
                {activeTab === 'builder' && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-slate-500">
                            <Edit3 size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Survey Builder</h3>
                        <p className="text-gray-500 dark:text-slate-400 max-w-md mx-auto mt-2">Edit your questions, themes, and logic here.</p>
                        <button className="mt-6 px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                            Edit Survey Questions
                        </button>
                    </div>
                )}

                {activeTab === 'share' && (
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Share your survey</h3>

                        <div className="space-y-6">
                            <div className="p-4 border border-gray-200 dark:border-slate-800 rounded-lg hover:border-black dark:hover:border-white transition-colors group cursor-pointer bg-white dark:bg-slate-950">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 text-blue-600 rounded-full flex items-center justify-center">
                                        <Copy size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white">Copy Link</h4>
                                        <p className="text-sm text-gray-500 dark:text-slate-400">Share via email, chat, or social media</p>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-300 dark:text-slate-500 group-hover:text-black dark:group-hover:text-white" />
                                </div>
                            </div>

                            <div className="p-4 border border-gray-200 dark:border-slate-800 rounded-lg hover:border-black dark:hover:border-white transition-colors group cursor-pointer bg-white dark:bg-slate-950">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950 text-purple-600 rounded-full flex items-center justify-center">
                                        <QrCode size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white">QR Code</h4>
                                        <p className="text-sm text-gray-500 dark:text-slate-400">Download a generic QR code</p>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-300 dark:text-slate-500 group-hover:text-black dark:group-hover:text-white" />
                                </div>
                            </div>

                            <div className="p-4 border border-gray-200 dark:border-slate-800 rounded-lg hover:border-black dark:hover:border-white transition-colors group cursor-pointer bg-white dark:bg-slate-950">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950 text-orange-600 rounded-full flex items-center justify-center">
                                        <Code size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white">Embed Code</h4>
                                        <p className="text-sm text-gray-500 dark:text-slate-400">Embed survey in your website</p>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-300 dark:text-slate-500 group-hover:text-black dark:group-hover:text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-slate-500">
                            <PieChart size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Analytics Preview</h3>
                        <p className="text-gray-500 dark:text-slate-400 max-w-md mx-auto mt-2">83 Responses collected. View detailed breakdown of answers.</p>
                        <div className="flex justify-center gap-4 mt-6">
                            <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">83</div>
                                <div className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide font-medium mt-1">Total Responses</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">65%</div>
                                <div className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide font-medium mt-1">Completion Rate</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-slate-900 px-6 py-4 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">4m 12s</div>
                                <div className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wide font-medium mt-1">Avg. Time</div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link
                                to={`/dashboard/survey/${id}/responses`}
                                className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                            >
                                View Responses
                            </Link>
                        </div>
                    </div>
                )}
                {activeTab === 'settings' && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-slate-500">
                            <Settings size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Survey Settings</h3>
                        <p className="text-gray-500 dark:text-slate-400 max-w-md mx-auto mt-2">Manage survey availability, notifications, and access control.</p>

                        <div className="max-w-md mx-auto mt-8 text-left border-t border-gray-100 dark:border-slate-800 pt-6">
                            <button className="text-red-600 dark:text-red-400 font-medium hover:text-red-700 text-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                                Delete this survey
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SurveyDetail;
