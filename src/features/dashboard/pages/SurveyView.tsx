import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit3, Play, Pause, XCircle, Copy, MessageSquare, Users as UsersIcon, Trash2, AlertTriangle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { getSurveyById, updateSurveyStatus, deleteSurvey } from '@/services/dashboard/surveys';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
    active: 'bg-green-50 dark:bg-emerald-950/30 text-green-600 dark:text-emerald-400 border-green-100 dark:border-emerald-900/30',
    draft: 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-700',
    inactive: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30',
    closed: 'bg-red-50 dark:bg-rose-950/30 text-red-500 dark:text-rose-400 border-red-100 dark:border-rose-900/30',
};

interface Question {
    text: string;
    type: string;
    required: boolean;
    options?: { value: string }[];
}

interface Section {
    title: string;
    questions: Question[];
}

interface SurveyData {
    id: string;
    title: string;
    description: string;
    status: string;
    category: string;
    targetAudience: string;
    goal: string;
    usage: string;
    startDate?: string;
    endDate?: string | null;
    responseLimit?: number | null;
    sections: Section[];
    createdAt?: string;
}

const typeLabels: Record<string, string> = {
    text: 'Text',
    multiple_choice: 'Multiple Choice',
    single_choice: 'Single Choice',
    likert_scale: 'Likert Scale',
    yes_no: 'Yes/No',
    true_false: 'True/False',
};

function formatDate(dateStr?: string) {
    if (!dateStr) return 'Not set';
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    });
}

function SurveyView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { textTitle } = useTheme();
    const [survey, setSurvey] = useState<SurveyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleCopyLink = () => {
        if (!id) return;
        navigator.clipboard.writeText(`${window.location.origin}/survey/${id}`);
        toast.success('Survey link copied to clipboard!');
    };

    const handleDelete = async () => {
        if (!id) return;
        try {
            await deleteSurvey(id);
            toast.success('Survey deleted successfully.');
            navigate('/dashboard/surveys');
        } catch {
            toast.error('Failed to delete survey.');
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        if (!id) return;
        try {
            await updateSurveyStatus(id, newStatus);
            setSurvey((prev) => prev ? { ...prev, status: newStatus } : prev);
            toast.success(`Survey status changed to ${newStatus}.`);
        } catch {
            toast.error('Failed to update survey status.');
        }
    };

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const res = await getSurveyById(id);
                const raw = res.data || res;
                console.log('Survey data from API:', raw);
                setSurvey(raw);
            } catch {
                console.error('Failed to load survey');
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-pulse text-gray-500 dark:text-slate-400">Loading survey...</div>
            </div>
        );
    }

    if (!survey) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 dark:text-slate-400">Survey not found.</p>
                <Link to="/dashboard/surveys" className="text-blue-600 hover:underline mt-2 inline-block">Back to Surveys</Link>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-6">
                <Link to="/dashboard/surveys" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                    <ChevronLeft size={16} />
                    Back to Surveys
                </Link>
            </div>

            {/* Title & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className={`text-2xl font-bold ${textTitle}`}>{survey.title}</h1>
                    {survey.description && (
                        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{survey.description}</p>
                    )}
                </div>
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[survey.status?.toLowerCase()] || ''}`}>
                        {survey.status}
                    </span>

                    {/* Status action buttons (not for drafts) */}
                    {survey.status?.toLowerCase() !== 'draft' && (
                        <>
                            {survey.status?.toLowerCase() !== 'active' && (
                                <button
                                    onClick={() => handleStatusChange('active')}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors cursor-pointer"
                                >
                                    <Play size={12} />
                                    Activate
                                </button>
                            )}
                            {survey.status?.toLowerCase() !== 'inactive' && survey.status?.toLowerCase() !== 'draft' && (
                                <button
                                    onClick={() => handleStatusChange('inactive')}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-medium hover:bg-amber-600 transition-colors cursor-pointer"
                                >
                                    <Pause size={12} />
                                    Deactivate
                                </button>
                            )}
                            {survey.status?.toLowerCase() !== 'closed' && (
                                <button
                                    onClick={() => handleStatusChange('closed')}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors cursor-pointer"
                                >
                                    <XCircle size={12} />
                                    Close
                                </button>
                            )}
                        </>
                    )}

                    {survey.status?.toLowerCase() === 'draft' && (
                        <Link
                            to={`/dashboard/create-survey?draftId=${survey.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-600 text-white text-xs font-medium hover:bg-accent-700 transition-colors"
                        >
                            <Edit3 size={14} />
                            Continue Editing
                        </Link>
                    )}
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Category</p>
                    <p className="font-medium text-gray-900 dark:text-slate-100 text-sm capitalize">{survey.category || 'Not set'}</p>
                </div>
                <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Target Audience</p>
                    <p className="font-medium text-gray-900 dark:text-slate-100 text-sm capitalize">{survey.targetAudience || 'Not set'}</p>
                </div>
                <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Start Date</p>
                    <p className="font-medium text-gray-900 dark:text-slate-100 text-sm">{formatDate(survey.startDate)}</p>
                </div>
                <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">End Date</p>
                    <p className="font-medium text-gray-900 dark:text-slate-100 text-sm">{formatDate(survey.endDate)}</p>
                </div>
            </div>

            {/* Goal & Usage */}
            {(survey.goal || survey.usage) && (
                <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm mb-8">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Goal & Usage</h2>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                        {survey.goal && <p><span className="font-medium">Goal:</span> {survey.goal}</p>}
                        {survey.usage && <p><span className="font-medium">Usage:</span> {survey.usage}</p>}
                    </div>
                </div>
            )}

            {/* Sections & Questions */}
            <div className="space-y-6">
                <h2 className="font-semibold text-gray-900 dark:text-white text-lg">Sections & Questions</h2>
                {survey.sections?.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-slate-400">No sections added yet.</p>
                )}
                {survey.sections?.map((section, sIdx) => (
                    <div key={sIdx} className="bg-white dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                                Section {sIdx + 1}: {section.title || 'Untitled'}
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-slate-800">
                            {section.questions?.length === 0 && (
                                <p className="px-5 py-4 text-sm text-gray-400 dark:text-slate-500">No questions in this section.</p>
                            )}
                            {section.questions?.map((q, qIdx) => (
                                <div key={qIdx} className="px-5 py-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                <span className="text-gray-400 dark:text-slate-500 mr-2">Q{qIdx + 1}.</span>
                                                {q.text}
                                                {q.required && <span className="text-red-500 ml-1">*</span>}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                                {typeLabels[q.type] || q.type}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Options preview */}
                                    {(q.type === 'multiple_choice' || q.type === 'single_choice') && q.options && q.options.length > 0 && (
                                        <div className="mt-3 ml-6 space-y-1.5">
                                            {q.options.map((opt, oIdx) => (
                                                <div key={oIdx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                                                    <span className={`w-4 h-4 rounded-full border-2 border-gray-300 dark:border-slate-600 flex items-center justify-center shrink-0 ${
                                                        q.type === 'multiple_choice' ? 'rounded-sm' : ''
                                                    }`} />
                                                    {opt.value}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Likert options preview */}
                                    {q.type === 'likert_scale' && q.options && q.options.length > 0 && (
                                        <div className="mt-3 ml-6 flex flex-wrap gap-2">
                                            {q.options.map((opt, oIdx) => (
                                                <span key={oIdx} className="px-2.5 py-1 bg-gray-50 dark:bg-slate-900 text-xs text-gray-600 dark:text-slate-400 rounded-md border border-gray-100 dark:border-slate-800">
                                                    {opt.value}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Yes/No & True/False options preview */}
                                    {(q.type === 'yes_no' || q.type === 'true_false') && q.options && q.options.length > 0 && (
                                        <div className="mt-3 ml-6 flex gap-3">
                                            {q.options.map((opt, oIdx) => (
                                                <span key={oIdx} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                                    opt.value === 'Yes' || opt.value === 'True'
                                                        ? 'bg-green-50 dark:bg-emerald-950/30 text-green-700 dark:text-emerald-300'
                                                        : 'bg-red-50 dark:bg-rose-950/30 text-red-700 dark:text-rose-300'
                                                }`}>
                                                    {opt.value}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
                <Link
                    to={`/dashboard/responses`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                    <MessageSquare size={16} />
                    View Responses
                </Link>
                <Link
                    to={`/dashboard/participant`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                    <UsersIcon size={16} />
                    View Participants
                </Link>
                <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                    <Copy size={16} />
                    Copy Link
                </button>
                <button
                    onClick={() => setDeleteOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 dark:border-red-900/30 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
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
                            All responses and data for <span className="font-semibold text-gray-900 dark:text-slate-100">"{survey?.title}"</span> will be deleted immediately.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-3 justify-end">
                        <button
                            onClick={() => setDeleteOpen(false)}
                            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            Delete Survey
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SurveyView;
