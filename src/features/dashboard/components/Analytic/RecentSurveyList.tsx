import { MoreHorizontal, FileText } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { formatDate } from '@/lib/utils';
import type {RecentSurvey} from '@/types/dashboard/analytic';

const statusColors: Record<string, string> = {
    active: 'bg-green-50 dark:bg-emerald-950/30 text-green-600 dark:text-emerald-400 border-green-100 dark:border-emerald-900/30',
    draft: 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-700',
    inactive: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30',
    closed: 'bg-red-50 dark:bg-rose-950/30 text-red-500 dark:text-rose-400 border-red-100 dark:border-rose-900/30',
};

const RecentSurveyList = ({ surveys }: { surveys: RecentSurvey[] }) => {
    const { textTitle } = useTheme();
    return (
        <div className="space-y-4 w-full">
            <h2 className={`text-xl font-bold ${textTitle} mb-4`}>Recent Survey</h2>

            {surveys.length > 0 ? (
                surveys.map((survey) => (
                    <div key={survey.id} className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-gray-100 dark:border-slate-900 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <h3 className="font-bold text-gray-900 dark:text-slate-100 text-lg">{survey.title}</h3>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[survey.status?.toLowerCase()] || 'bg-gray-100 dark:bg-slate-900 text-gray-500 dark:text-slate-400'}`}>
                                    ● {survey.status}
                                </span>
                            </div>
                            <button className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <p className="text-gray-500 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">
                            {survey.description}
                        </p>

                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-400 font-medium">
                                <div className="flex items-center gap-2">
                                    {survey.author_avatar ? (
                                        <img src={survey.author_avatar} alt={survey.author_name} className="w-5 h-5 rounded-full" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-medium text-gray-500 dark:text-slate-400">
                                            {survey.author_name?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                    )}
                                    <span>{survey.author_name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {survey.response_count}
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(survey.created_at)}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="px-4 py-1.5 cursor-pointer rounded-full border border-accent-300 dark:border-accent-800/60 text-sm font-semibold text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-950/20 active:bg-accent-100 dark:active:bg-accent-900/30 transition-all duration-200">
                                    Manage
                                </button>
                                <button className="px-4 py-1.5 cursor-pointer rounded-full bg-accent-600 hover:bg-accent-700 active:bg-accent-800 text-white text-sm font-semibold transition-all duration-200 border border-transparent shadow-sm shadow-accent-600/10">
                                    Result
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                /* Empty State */
                <div className="bg-white dark:bg-slate-950 p-10 rounded-xl border border-gray-100 dark:border-slate-900 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 rounded-full bg-gray-50 dark:bg-slate-900 flex items-center justify-center mb-4">
                        <FileText size={28} className="text-gray-300 dark:text-slate-700" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-1">No recent surveys</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs">
                        You haven't created any surveys yet. Create your first survey to get started.
                    </p>
                </div>
            )}
        </div>
    );
};

export default RecentSurveyList;
