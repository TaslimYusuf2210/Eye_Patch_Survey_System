import { useState, useEffect } from 'react';
import {
  MultipleChoicePreview,
  SingleChoicePreview,
  TextPreview,
  LikertScalePreview,
  YesNoPreview,
  TrueFalsePreview,
} from './QuestionPreviews';
import { OptionsEditor } from './OptionsEditor';
import { useFormContext } from 'react-hook-form';
import type { QuestionProps } from '@/types/dashboard/createSurvey';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { CreateSurveyFormData } from '@/types/dashboard/common';

// Auto-generated options for predefined question types
const AUTO_OPTIONS: Record<string, { value: string }[]> = {
  likert_scale: [
    { value: 'Strongly Disagree' },
    { value: 'Disagree' },
    { value: 'Neutral' },
    { value: 'Agree' },
    { value: 'Strongly Agree' },
  ],
  yes_no: [
    { value: 'Yes' },
    { value: 'No' },
  ],
  true_false: [
    { value: 'True' },
    { value: 'False' },
  ],
};

export function Question({ sectionIndex, questionIndex, removeQuestion }: QuestionProps) {
  const { register, watch, setValue, formState: { errors } } = useFormContext<CreateSurveyFormData>();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentQuestionType = watch(`sections.${sectionIndex}.questions.${questionIndex}.type` as const);
  const questionText = watch(`sections.${sectionIndex}.questions.${questionIndex}.text` as const);
  const isRequired = watch(`sections.${sectionIndex}.questions.${questionIndex}.required` as const);

  // Auto-populate options and log when type changes to a predefined type
  useEffect(() => {
    if (currentQuestionType && AUTO_OPTIONS[currentQuestionType]) {
      const options = AUTO_OPTIONS[currentQuestionType];
      setValue(
        `sections.${sectionIndex}.questions.${questionIndex}.options` as const,
        options
      );
      console.log(
        `Question ${questionIndex + 1} (${currentQuestionType}) auto-options:`,
        options.map(o => o.value)
      );
    }
  }, [currentQuestionType, sectionIndex, questionIndex, setValue]);

  return (
    <div className="bg-white dark:bg-slate-950 rounded-lg p-4 border border-gray-200 dark:border-slate-800">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">
          Question {questionIndex + 1}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            title={isCollapsed ? "Expand question" : "Collapse question"}
          >
            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            {isCollapsed ? "Expand" : "Collapse"}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Remove question"
            onClick={() => removeQuestion(questionIndex)}
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      {/* Collapsed indicator */}
      {isCollapsed && questionText && (
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 truncate">
          {questionText}
        </p>
      )}

      {!isCollapsed && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
            {/* Question Text */}
            <div className="md:col-span-7">
              <label className="block text-xs font-medium text-gray-700 dark:text-slate-200 mb-1">
                Question Text
              </label>
              <input
                type="text"
                {...register(`sections.${sectionIndex}.questions.${questionIndex}.text` as const)}
                placeholder="Enter your question..."
                className="w-full px-3 py-1.5 border border-gray-200 dark:border-slate-800 rounded text-sm bg-white dark:bg-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Question Type */}
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-gray-700 dark:text-slate-200 mb-1">
                Type
              </label>
              <select
                {...register(`sections.${sectionIndex}.questions.${questionIndex}.type` as const)}
                className="w-full px-3 py-1.5 border border-gray-200 dark:border-slate-800 rounded text-sm bg-white dark:bg-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option value="text">Text</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="single_choice">Single Choice</option>
                <option value="likert_scale">Likert Scale</option>
                <option value="yes_no">Yes/No</option>
                <option value="true_false">True/False</option>
              </select>
            </div>

            {/* Required Toggle */}
            <div className="md:col-span-2 flex items-end">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register(`sections.${sectionIndex}.questions.${questionIndex}.required` as const)}
                  className="sr-only"
                />
                <button
                  type="button"
                  role="switch"
                  onClick={() => {
                    setValue(`sections.${sectionIndex}.questions.${questionIndex}.required` as const, !isRequired);
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ${
                    isRequired
                      ? 'bg-accent-600'
                      : 'bg-gray-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      isRequired ? 'translate-x-[18px]' : 'translate-x-[3px]'
                    }`}
                  />
                </button>
                <span className="text-xs font-medium text-gray-700 dark:text-slate-200">Required</span>
              </label>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
            <label className="block text-xs font-medium text-gray-700 dark:text-slate-200 mb-3">
              Preview (How respondents will see this)
            </label>
            <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4 border border-gray-100 dark:border-slate-800">
              {currentQuestionType === 'multiple_choice' && (
                <MultipleChoicePreview />
              )}
              {currentQuestionType === 'single_choice' && (
                <SingleChoicePreview />
              )}
              {currentQuestionType === 'text' && (
                <TextPreview />
              )}
              {currentQuestionType === 'likert_scale' && (
                <LikertScalePreview />
              )}
              {currentQuestionType === 'yes_no' && (
                <YesNoPreview />
              )}
              {currentQuestionType === 'true_false' && (
                <TrueFalsePreview />
              )}
            </div>
          </div>

          {/* Options Editor - only for types that need manual options */}
          {(currentQuestionType === 'multiple_choice' || currentQuestionType === 'single_choice') && (
            <OptionsEditor sectionIndex={sectionIndex} questionIndex={questionIndex} questionType={currentQuestionType} />
          )}

          {errors?.sections?.[sectionIndex]?.questions?.[questionIndex]?.text && (
            <p className="text-sm text-red-600 mt-2">
              {errors?.sections?.[sectionIndex]?.questions?.[questionIndex]?.text?.message as string}
            </p>
          )}
        </>
      )}
    </div>
  );
};
