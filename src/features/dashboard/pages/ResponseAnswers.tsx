import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Clock, Mail, Calendar } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { getResponseById } from '@/services/dashboard/responses';
import { toast } from "sonner"

interface Answer {
    question_id: string;
    question_text: string;
    required: boolean;
    section_title?: string;
    answer_text?: string;
    likert_value?: number;
    yes_no_value?: boolean;
    selected_options?: string[];
    options?: string[];
}

interface ResponseData {
    id: string;
    respondent_email: string;
    completed_at: string;
    time_taken_sec: number;
    answers: Answer[];
}

interface RawResponse {
    id: string;
    respondent_email: string;
    completed_at: string;
    time_taken_sec: number;
    answers: Answer[];
}

function formatTime(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function renderAnswer(answer: Answer) {
    // Likert scale — show all options, highlight selected
    if (answer.likert_value !== null && answer.likert_value !== undefined) {
        const labels = answer.options && answer.options.length > 0
            ? answer.options
            : ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
        return (
            <div className="flex flex-wrap gap-2">
                {labels.map((label, i) => {
                    const idx = i + 1;
                    const isSelected = idx === answer.likert_value;
                    return (
                        <span
                            key={i}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                isSelected
                                    ? 'bg-amber-400 text-white shadow-sm'
                                    : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 line-through decoration-1'
                            }`}
                        >
                            {isSelected ? label : label}
                        </span>
                    );
                })}
            </div>
        );
    }

    // Yes/No
    if (answer.yes_no_value !== null && answer.yes_no_value !== undefined) {
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${answer.yes_no_value
                    ? 'bg-green-100 dark:bg-emerald-950/50 text-green-700 dark:text-emerald-300'
                    : 'bg-red-100 dark:bg-rose-950/50 text-red-700 dark:text-rose-300'
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${answer.yes_no_value ? 'bg-green-500' : 'bg-red-500'}`} />
                {answer.yes_no_value ? 'Yes' : 'No'}
            </span>
        );
    }

    // Multi-select / Single choice — show all options, highlight selected
    if ((answer.options && answer.options.length > 0) || (answer.selected_options && answer.selected_options.length > 0)) {
        const allOptions = answer.options && answer.options.length > 0 ? answer.options : (answer.selected_options || []);
        const selected = answer.selected_options || [];
        return (
            <div className="flex flex-wrap gap-2">
                {allOptions.map((opt, i) => {
                    const isSelected = selected.includes(opt);
                    return (
                        <span
                            key={i}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                isSelected
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 line-through decoration-1'
                            }`}
                        >
                            {isSelected && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            )}
                            {opt}
                        </span>
                    );
                })}
            </div>
        );
    }

    // Plain text
    if (answer.answer_text) {
        return (
            <p className="text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-900 rounded-lg p-3">
                {answer.answer_text}
            </p>
        );
    }

    return <span className="text-gray-400 dark:text-slate-500 italic">No answer</span>;
}

const ResponseAnswers = () => {
    const { surveyId, responseId } = useParams();
    const location = useLocation();
    const { textTitle } = useTheme();
    const [responseData, setResponseData] = useState<ResponseData | null>(
        (location.state as { response?: ResponseData })?.response ?? null
    );
    const [loading, setLoading] = useState(!responseData);

    useEffect(() => {
        // If we already have data from route state, skip fetching
        if (responseData) return;

        async function fetchResponse() {
            setLoading(true);
            try {
                const res = await getResponseById({ id: surveyId!, page: 1, limit: 100 });
                const found = res.data.find((item: RawResponse) => item.id === responseId);
                if (found) {
                    setResponseData({
                        id: found.id,
                        respondent_email: found.respondent_email,
                        completed_at: found.completed_at,
                        time_taken_sec: found.time_taken_sec,
                        answers: found.answers,
                    });
                }
            } catch (error: any) {
                console.error(error);
                toast.error(error?.userMessage || 'Failed to load response.');
            } finally {
                setLoading(false);
            }
        }

        fetchResponse();
    }, [surveyId, responseId, responseData]);

    if (loading) {
        return (
            <div className="text-center py-16 text-gray-500 dark:text-slate-400">
                Loading response...
            </div>
        );
    }

    if (!responseData) {
        return (
            <div className="text-center py-16 text-gray-500 dark:text-slate-400">
                Response not found.
                <br />
                <Link to={`/dashboard/responses/${surveyId}`} className="text-blue-600 hover:underline mt-2 inline-block">
                    Go back
                </Link>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 mb-8">
                <Link to={`/dashboard/responses/${surveyId}`} className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
                    <ChevronLeft size={16} />
                    Back to Responses
                </Link>
            </div>

            {/* Respondent Info */}
            <div className="mb-8">
                <h1 className={`text-2xl font-bold ${textTitle}`}>Response Details</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Mail size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">Email</p>
                        <p className="font-medium text-gray-900 dark:text-slate-100 text-sm">{responseData.respondent_email}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-emerald-950 flex items-center justify-center text-green-600 dark:text-emerald-400">
                        <Calendar size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">Completed</p>
                        <p className="font-medium text-gray-900 dark:text-slate-100 text-sm">{formatDate(responseData.completed_at)}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <Clock size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">Time Taken</p>
                        <p className="font-medium text-gray-900 dark:text-slate-100 text-sm">{formatTime(responseData.time_taken_sec)}</p>
                    </div>
                </div>
            </div>

            {/* Answers — grouped by section */}
            <div className="space-y-6">
                {(() => {
                    const groups: Record<string, Answer[]> = {};
                    responseData.answers.forEach((a) => {
                        const key = a.section_title || 'Other';
                        if (!groups[key]) groups[key] = [];
                        groups[key].push(a);
                    });
                    let globalIdx = 0;
                    return Object.entries(groups).map(([section, answers]) => (
                        <div key={section}>
                            <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="w-1 h-4 rounded-full bg-accent-600" />
                                {section}
                            </h3>
                            <div className="space-y-3">
                                {answers.map((answer) => {
                                    const qNum = ++globalIdx;
                                    return (
                                        <div
                                            key={answer.question_id}
                                            className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm"
                                        >
                                            <div className="flex items-start justify-between gap-2 mb-3">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    <span className="text-gray-400 dark:text-slate-500 mr-2">Q{qNum}.</span>
                                                    {answer.question_text}
                                                </p>
                            <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                answer.required
                                    ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400'
                                    : 'bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-slate-500'
                            }`}>
                                {answer.required ? 'Required' : 'Optional'}
                            </span>
                        </div>
                        {renderAnswer(answer)}
                    </div>
                                    );
                                })}
                            </div>
                        </div>
                    ));
                })()}
            </div>
        </>
    );
};

export default ResponseAnswers;
