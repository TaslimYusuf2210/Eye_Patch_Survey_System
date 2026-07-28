import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Send, ChevronDown, ChevronUp, User, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSurveyById } from '@/hooks/useQuery';
import { useSubmitSurveyResponse } from '@/hooks/useMutation';

/* ── Mock survey data (used when ?mock=true) ── */
const MOCK_SURVEY = {
  id: 'mock-survey-001',
  title: 'Customer Satisfaction Survey',
  description: 'Help us improve our product by sharing your experience. Your feedback is valuable to us!',
  sections: [
    {
      title: 'General Experience',
      questions: [
        { text: 'How would you rate your overall experience with our product?', type: 'likert_scale', required: true, options: [{ value: 'Very Poor' }, { value: 'Poor' }, { value: 'Average' }, { value: 'Good' }, { value: 'Excellent' }] },
        { text: 'What do you like most about our product?', type: 'text', required: true, options: [] },
      ],
    },
    {
      title: 'Feature Usage',
      questions: [
        { text: 'Which features do you use regularly?', type: 'multiple_choice', required: true, options: [{ value: 'Dashboard' }, { value: 'Survey Builder' }, { value: 'Analytics' }, { value: 'Reports' }, { value: 'API' }] },
        { text: 'Would you recommend our product to others?', type: 'yes_no', required: true, options: [] },
        { text: 'How intuitive is the user interface?', type: 'likert_scale', required: false, options: [{ value: 'Not intuitive' }, { value: 'Somewhat intuitive' }, { value: 'Neutral' }, { value: 'Intuitive' }, { value: 'Very intuitive' }] },
      ],
    },
    {
      title: 'Future Improvements',
      questions: [
        { text: 'What features would you like us to add? (Select all that apply)', type: 'multiple_choice', required: false, options: [{ value: 'Mobile App' }, { value: 'Dark Mode' }, { value: 'Team Collaboration' }, { value: 'Custom Branding' }, { value: 'Export Tools' }] },
        { text: 'Any additional comments or suggestions?', type: 'text', required: false, options: [] },
      ],
    },
  ],
};

interface SurveyData {
  id: string;
  title: string;
  description: string;
  sections: {
    title: string;
    questions: {
      text: string;
      type: string;
      required: boolean;
      options: { value: string }[];
    }[];
  }[];
}

/* ── Question type renderers ── */

function TextQuestion({ value, onChange, disabled }: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      rows={3}
      placeholder="Type your answer here..."
      className="w-full px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all resize-none text-sm"
    />
  );
}

function LikertQuestion({ options, value, onChange }: { options: { value: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
            value === opt.value
              ? 'bg-amber-400 text-white border-amber-400 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600'
          }`}
        >
          {opt.value}
        </button>
      ))}
    </div>
  );
}

function YesNoQuestion({ value, onChange }: { value: string | null; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-3">
      {['Yes', 'No'].map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
            value === opt
              ? opt === 'Yes'
                ? 'bg-green-500 text-white border-green-500 shadow-sm'
                : 'bg-red-500 text-white border-red-500 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-gray-400'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function MultipleChoiceQuestion({ options, value, onChange }: { options: { value: string }[]; value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt, i) => {
        const selected = value.includes(opt.value);
        return (
          <button
            key={i}
            type="button"
            onClick={() => toggle(opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              selected
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-blue-400'
            }`}
          >
            {selected ? `✓ ${opt.value}` : opt.value}
          </button>
        );
      })}
    </div>
  );
}

function SingleChoiceQuestion({ options, value, onChange }: { options: { value: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt, i) => (
        <label
          key={i}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
            value === opt.value
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300'
              : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
          }`}
        >
          <input
            type="radio"
            name="single-choice"
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium">{opt.value}</span>
        </label>
      ))}
    </div>
  );
}

/* ── Main Page ── */

const SurveyResponsePage = () => {
  const { surveyId } = useParams();
  const isMock = new URLSearchParams(window.location.search).get('mock') === 'true';

  const [respondentName, setRespondentName] = useState('');
  const [respondentEmail, setRespondentEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  const { data: raw, isLoading, isError } = useSurveyById(isMock ? undefined : surveyId);
  const submitMutation = useSubmitSurveyResponse();

  const survey: SurveyData | null = isMock ? MOCK_SURVEY as SurveyData : (raw ? {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    sections: (raw.sections || []).map((s: any) => ({
      title: s.title,
      questions: (s.questions || []).map((q: any) => ({
        text: q.text,
        type: q.type,
        required: q.required,
        options: (q.options || []).map((o: any) => ({ value: o.value })),
      })),
    })),
  } : null);

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

    // Check required questions
    let allAnswered = true;
    survey.sections.forEach((section) => {
      section.questions.forEach((q) => {
        const globalIdx = survey.sections.flatMap(s => s.questions).indexOf(q);
        const ans = answers[globalIdx];
        if (q.required) {
          if (q.type === 'text' && (!ans || !ans.trim())) allAnswered = false;
          else if (q.type === 'multiple_choice' && (!ans || ans.length === 0)) allAnswered = false;
          else if ((q.type === 'yes_no' || q.type === 'single_choice' || q.type === 'likert_scale') && !ans) allAnswered = false;
        }
      });
    });

    if (!allAnswered) {
      toast.error('Please answer all required questions.');
      return;
    }

    console.log('Submission:', { name: respondentName, email: respondentEmail, answers });
    toast.success('Your response has been submitted. Thank you!');
    setSubmitted(true);
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Survey not found</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">This survey may have been removed or the link is invalid.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-emerald-950/50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Response Submitted!</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">Thank you for your feedback. It means a lot to us.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Survey Header */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{survey.title}</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">{survey.description}</p>
        </div>

        {/* Respondent Info */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 mb-6">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <User size={18} className="text-accent-600" />
            Your Information
            <span className="text-xs text-red-500 font-normal ml-1">*Required</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                <User size={14} className="inline mr-1" />
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={respondentName}
                onChange={(e) => setRespondentName(e.target.value)}
                placeholder="John Doe"
                autoComplete="name"
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                <Mail size={14} className="inline mr-1" />
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={respondentEmail}
                onChange={(e) => setRespondentEmail(e.target.value)}
                placeholder="john@example.com"
                autoComplete="email"
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Sections & Questions */}
        {survey.sections.map((section, sIdx) => {
          const globalStartIdx = survey.sections.slice(0, sIdx).reduce((acc, s) => acc + s.questions.length, 0);
          const isExpanded = expandedSections[sIdx] ?? true;

          return (
            <div key={sIdx} className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 mb-6">
              {/* Section Header */}
              <button
                type="button"
                onClick={() => toggleSection(sIdx)}
                className="w-full flex items-center justify-between text-left mb-4 group"
              >
                <h2 className="text-base font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-accent-600" />
                  {section.title}
                </h2>
                {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>

              {isExpanded && (
                <div className="space-y-6">
                  {section.questions.map((q, qIdx) => {
                    const globalIdx = globalStartIdx + qIdx;
                    const ans = answers[globalIdx];

                    return (
                      <div key={qIdx}>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {q.text}
                          </p>
                          <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            q.required
                              ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400'
                              : 'bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-slate-500'
                          }`}>
                            {q.required ? 'Required' : 'Optional'}
                          </span>
                        </div>

                        {q.type === 'text' && (
                          <TextQuestion value={ans || ''} onChange={(v) => setAnswer(globalIdx, v)} />
                        )}
                        {q.type === 'likert_scale' && (
                          <LikertQuestion options={q.options || []} value={ans || ''} onChange={(v) => setAnswer(globalIdx, v)} />
                        )}
                        {q.type === 'yes_no' && (
                          <YesNoQuestion value={ans || null} onChange={(v) => setAnswer(globalIdx, v)} />
                        )}
                        {q.type === 'true_false' && (
                          <YesNoQuestion value={ans || null} onChange={(v) => setAnswer(globalIdx, v)} />
                        )}
                        {q.type === 'multiple_choice' && (
                          <MultipleChoiceQuestion options={q.options || []} value={ans || []} onChange={(v) => setAnswer(globalIdx, v)} />
                        )}
                        {q.type === 'single_choice' && (
                          <SingleChoiceQuestion options={q.options || []} value={ans || ''} onChange={(v) => setAnswer(globalIdx, v)} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Submit */}
        <div className="text-center pb-8">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-accent-600 text-white font-semibold text-sm hover:bg-accent-700 active:bg-accent-800 transition-all shadow-lg shadow-accent-600/20"
          >
            <Send size={16} />
            Submit Response
          </button>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-3">Your responses are anonymous and will be kept confidential.</p>
        </div>
      </div>
    </div>
  );
};

export default SurveyResponsePage;
