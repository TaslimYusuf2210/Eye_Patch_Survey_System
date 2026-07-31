import type { SurveyQuestion } from '@/types';

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

interface QuestionInputProps {
  question: SurveyQuestion;
  value: any;
  onChange: (v: any) => void;
}

export default function QuestionInput({ question, value, onChange }: QuestionInputProps) {
  switch (question.type) {
    case 'text':
      return <TextQuestion value={value || ''} onChange={onChange} />;
    case 'likert_scale':
      return <LikertQuestion options={question.options || []} value={value || ''} onChange={onChange} />;
    case 'yes_no':
    case 'true_false':
      return <YesNoQuestion value={value || null} onChange={onChange} />;
    case 'multiple_choice':
      return <MultipleChoiceQuestion options={question.options || []} value={value || []} onChange={onChange} />;
    case 'single_choice':
      return <SingleChoiceQuestion options={question.options || []} value={value || ''} onChange={onChange} />;
    default:
      return null;
  }
}
