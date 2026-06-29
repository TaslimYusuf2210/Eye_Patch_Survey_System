import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Trash2, Clock, BarChart3, Users, AlertTriangle, MessageSquare, Eye, Edit3 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export interface SurveyCardData {
    id: number;
    title: string;
    status: string;
    description: string;
    responses: number;
    completionRate: number;
    avgResponseTime: string;
    date: string;
}

const SurveyCard = ({ survey }: { survey: SurveyCardData }) => {
    const { accent } = useTheme();
    const isDefaultTheme = accent === 'default';
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/survey/${survey.id}`);
        toast.success('Survey link copied to clipboard!');
    };

    return (
        <div className="bg-white dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-900 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
            {/* Header */}
            <div className="p-5 pb-3 flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                            survey.status?.toLowerCase() === 'active'
                                ? 'bg-green-50 dark:bg-emerald-950/30 text-green-600 dark:text-emerald-400 border-green-100 dark:border-emerald-900/30'
                                : survey.status?.toLowerCase() === 'draft'
                                    ? 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-700'
                                    : survey.status?.toLowerCase() === 'inactive'
                                        ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30'
                                        : 'bg-red-50 dark:bg-rose-950/30 text-red-500 dark:text-rose-400 border-red-100 dark:border-rose-900/30'
                        }`}>
                            {survey.status}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-slate-500">
                            {new Date(survey.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            &nbsp;
                            {new Date(survey.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-slate-100 text-base truncate">{survey.title}</h3>
                </div>
            </div>

            {/* Description */}
            <div className="px-5 pb-3">
                <p className="text-gray-500 dark:text-slate-400 text-sm line-clamp-2">{survey.description}</p>
            </div>

            {/* Quick Analytics */}
            <div className="px-5 pb-4 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-slate-900/50">
                    <Users size={16} className="text-gray-400 dark:text-slate-500 mb-1" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">{survey.responses}</span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400">Responses</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-slate-900/50">
                    <BarChart3 size={16} className="text-gray-400 dark:text-slate-500 mb-1" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">{survey.completionRate}%</span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400">Completion</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-slate-900/50">
                    <Clock size={16} className="text-gray-400 dark:text-slate-500 mb-1" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">{survey.avgResponseTime}</span>
                    <span className="text-[10px] text-gray-500 dark:text-slate-400">Avg Time</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-5 pb-3 flex flex-wrap gap-2">
                <Link
                    to={`/dashboard/responses`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-xs font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900 hover:border-accent-300 dark:hover:border-accent-800 transition-all cursor-pointer"
                >
                    <MessageSquare size={14} />
                    Responses
                </Link>
                <Link
                    to={`/dashboard/participant`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-xs font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900 hover:border-accent-300 dark:hover:border-accent-800 transition-all cursor-pointer"
                >
                    <Eye size={14} />
                    Participants
                </Link>
                        {survey.status?.toLowerCase() === 'draft' && (
                    <Link
                        to={`/dashboard/create-survey?draftId=${survey.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-xs font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900 hover:border-accent-300 dark:hover:border-accent-800 transition-all cursor-pointer"
                    >
                        <Edit3 size={14} />
                        Edit
                    </Link>
                )}
            </div>

            {/* Bottom Bar */}
            <div className="mt-auto px-5 pb-5 pt-3 border-t border-gray-100 dark:border-slate-900 flex items-center justify-between">
                <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors cursor-pointer"
                >
                    <Copy size={14} />
                    Copy Link
                </button>
                <button
                    onClick={() => setDeleteDialogOpen(true)}
                    className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                    <Trash2 size={14} />
                    Delete
                </button>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={(open) => { setDeleteDialogOpen(open); }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
                                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                            <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">Delete Survey</DialogTitle>
                        </div>
                        <DialogDescription className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                            This action is <span className="font-semibold text-red-600 dark:text-red-400">permanent and cannot be undone</span>.
                            All responses and data for <span className="font-semibold text-gray-900 dark:text-slate-100">"{survey.title}"</span> will be deleted immediately.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-3 justify-end">
                        <button
                            onClick={() => setDeleteDialogOpen(false)}
                            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                                isDefaultTheme
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-red-600 hover:bg-red-700 text-white'
                            }`}
                        >
                            <Trash2 size={16} />
                            Delete Survey
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SurveyCard;