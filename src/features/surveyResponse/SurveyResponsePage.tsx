import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSurveyById } from '@/hooks/useQuery';
import { useSubmitSurveyResponse } from '@/hooks/useMutation';
import type { SubmitResponsePayload } from '@/services/surveyResponse';
import { MutationOverlay } from '@/components/ui/mutation-overlay';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { SurveyData } from '@/types';
import SurveySection from './components/SurveySection';
import RespondentInfo from './components/RespondentInfo';
import SuccessScreen from './components/SuccessScreen';
import AppearanceToggle from './components/AppearanceToggle';

const normalizeSurvey = (raw: any): SurveyData => ({
  id: raw.id,
  title: raw.title,
  description: raw.description,
  sections: (raw.sections || []).map((s: any) => ({
    title: s.title,
    questions: (s.questions || []).map((q: any) => ({
      id: q.id,
      text: q.text,
      type: q.type,
      required: q.required,
      options: (q.options || []).map((o: any) => ({ id: o.id, value: o.value })),
    })),
  })),
});

const validateRequiredAnswers = (survey: SurveyData, answers: Record<number, any>): boolean => {
  const flatQuestions = survey.sections.flatMap((s) => s.questions);
  return flatQuestions.every((q, idx) => {
    if (!q.required) return true;
    const ans = answers[idx];
    if (q.type === 'text') return !!ans && !!ans.trim();
    if (q.type === 'multiple_choice') return !!ans && ans.length > 0;
    return !!ans;
  });
};

const SurveyResponsePage = () => {
  const { surveyId } = useParams();

  const [respondentName, setRespondentName] = useState('');
  const [respondentEmail, setRespondentEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data: raw, isLoading, error } = useSurveyById(surveyId);
  const submitMutation = useSubmitSurveyResponse();

  const survey: SurveyData | null = raw ? normalizeSurvey(raw) : null;

  const toggleSection = (idx: number) => {
    setExpandedSections((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const setAnswer = (qIdx: number, val: any) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: val }));
  };

  const handleSubmit = () => {
    if (!respondentName.trim() || !respondentEmail.trim()) {
      toast.error('Please provide your name and email.');
      return;
    }

    if (!survey) return;

    if (!validateRequiredAnswers(survey, answers)) {
      toast.error('Please answer all required questions.');
      return;
    }

    // All required fields filled — ask for confirmation before submitting
    setConfirmOpen(true);
  };

  const confirmSubmit = () => {
    if (!survey) return;

    const flatQuestions = survey.sections.flatMap((s) => s.questions);
    const answersPayload = flatQuestions
      .map((q, idx) => {
        const ans = answers[idx];
        if (ans === undefined || ans === null || (Array.isArray(ans) && ans.length === 0) || (typeof ans === 'string' && !ans.trim())) {
          return null;
        }
        const base = { question_id: q.id || String(idx) };
        switch (q.type) {
          case 'text':
          case 'single_choice':
            return { ...base, answer_text: ans };
          case 'multiple_choice':
            return {
              ...base,
              answer_option_ids: (ans as string[]).map(
                (v) => q.options.find((o) => o.value === v)?.id || v
              ),
            };
          case 'likert_scale':
            return { ...base, likert_value: Number(ans) || (q.options.findIndex((o) => o.value === ans) + 1) || undefined };
          case 'yes_no':
          case 'true_false':
            return { ...base, yes_no_value: ans === 'Yes' || ans === 'True' };
          default:
            return { ...base, answer_text: ans };
        }
      })
      .filter((a): a is Exclude<typeof a, null> => a !== null);

    const payload = {
      respondent_email: respondentEmail,
      answers: answersPayload,
    } satisfies SubmitResponsePayload;

    console.log('Submitting response payload:', payload);
    submitMutation.mutate({ surveyId: survey.id, payload }, {
      onSuccess: () => {
        setSubmitted(true);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-gray-500 dark:text-slate-400">
          <Loader2 size="32" className="animate-spin" />
          <p className="text-sm">Loading survey...</p>
        </div>
      </div>
    );
  }

  if (!survey) {
    const status = (error as any)?.response?.status;
    const message = status === 401
      ? 'This survey requires authentication. Please log in and try again.'
      : status === 404
        ? 'This survey may have been removed or the link is invalid.'
        : 'We could not load this survey. Please try again later.';

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Survey not found</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">{message}</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 py-8 px-4">
      <AppearanceToggle />
      <div className="max-w-2xl mx-auto">
        {/* Survey Header */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{survey.title}</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">{survey.description}</p>
        </div>

        {/* Respondent Info */}
        <RespondentInfo
          name={respondentName}
          email={respondentEmail}
          onNameChange={setRespondentName}
          onEmailChange={setRespondentEmail}
        />

        {/* Sections & Questions */}
        {survey.sections.map((section, sIdx) => {
          const globalStartIdx = survey.sections.slice(0, sIdx).reduce((acc, s) => acc + s.questions.length, 0);
          return (
            <SurveySection
              key={sIdx}
              section={section}
              globalStartIdx={globalStartIdx}
              answers={answers}
              isExpanded={expandedSections[sIdx] ?? true}
              onToggle={() => toggleSection(sIdx)}
              onAnswer={setAnswer}
            />
          );
        })}

        {/* Submit */}
        <div className="text-center pb-8">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-accent-600 text-white font-semibold text-sm hover:bg-accent-700 active:bg-accent-800 transition-all shadow-lg shadow-accent-600/20 cursor-pointer"
          >
            <Send size={16} />
            Submit Response
          </button>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-3">Your responses are anonymous and will be kept confidential.</p>
        </div>
      </div>
      {/* Submit Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-green-100 dark:bg-emerald-950/50">
                <Send className="w-5 h-5 text-green-600 dark:text-emerald-400" />
              </div>
              <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">Submit Response</DialogTitle>
            </div>
            <DialogDescription className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
              Are you sure you want to submit your response? Once submitted, you will not be able to change your answers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={() => setConfirmOpen(false)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-800 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setConfirmOpen(false);
                confirmSubmit();
              }}
              className="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
            >
              <Send size={16} />
              Submit
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <MutationOverlay isPending={submitMutation.isPending} message="Submitting response..." />
    </div>
  );
};

export default SurveyResponsePage;
