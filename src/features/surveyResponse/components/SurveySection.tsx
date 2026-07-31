import { ChevronUp, ChevronDown } from 'lucide-react';
import type { SurveySectionData } from '@/types';
import QuestionInput from './QuestionInput';

interface SurveySectionProps {
  section: SurveySectionData;
  globalStartIdx: number;
  answers: Record<number, any>;
  isExpanded: boolean;
  onToggle: () => void;
  onAnswer: (globalIdx: number, val: any) => void;
}

export default function SurveySection({
  section,
  globalStartIdx,
  answers,
  isExpanded,
  onToggle,
  onAnswer,
}: SurveySectionProps) {
  return (
    <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 mb-6">
      {/* Section Header */}
      <button
        type="button"
        onClick={onToggle}
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

                <QuestionInput
                  question={q}
                  value={ans}
                  onChange={(v) => onAnswer(globalIdx, v)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
