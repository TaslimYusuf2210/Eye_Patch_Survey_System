import { useState, useEffect } from 'react';
import {
  MultipleChoicePreview,
  SingleChoicePreview,
  TextPreview,
  LikertScalePreview,
  YesNoPreview,
} from './QuestionPreviews';
import { OptionsEditor } from './OptionsEditor';
import { useFormContext } from 'react-hook-form';
import type { QuestionProps } from '@/types/dashboard/createSurvey';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { CreateSurveyFormData } from '@/types/dashboard/common';

export function Question({ sectionIndex, questionIndex, removeQuestion }: QuestionProps) {
  const { register, watch, formState: { errors } } = useFormContext<CreateSurveyFormData>();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // const [questionType, setQuestionType] = useState<string>('text');

  const currentQuestionType = watch(`sections.${sectionIndex}.questions.${questionIndex}.type` as const);
  const questionText = watch(`sections.${sectionIndex}.questions.${questionIndex}.text` as const);


  useEffect(() => {
    console.log('Question type changed to:', currentQuestionType);
    // setQuestionType(currentQuestionType);
  }, [currentQuestionType]);

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-500"
            title={isCollapsed ? "Expand question" : "Collapse question"}
          >
            {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
          <span className="text-sm font-semibold text-gray-700">
            Question {questionIndex + 1}: {isCollapsed && questionText ? questionText : ''}
          </span>
        </div>
        <button
          type="button"
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Remove question"
          onClick={() => removeQuestion(questionIndex)}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {!isCollapsed && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
            {/* Question Text */}
            <div className="md:col-span-7">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Question Text
              </label>
              <input
                type="text"
                {...register(`sections.${sectionIndex}.questions.${questionIndex}.text` as const)}
                placeholder="Enter your question..."
                className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Question Type */}
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                {...register(`sections.${sectionIndex}.questions.${questionIndex}.type` as const)}
                className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              >
                <option value="text">Text</option>
                <option value="likert_scale">Likert Scale</option>
                <option value="yes_no">Yes/No</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="single_choice">Single Choice</option>
              </select>
            </div>

            {/* Required Checkbox */}
            <div className="md:col-span-2 flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register(`sections.${sectionIndex}.questions.${questionIndex}.required` as const)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                />
                <span className="text-xs font-medium text-gray-700">Required</span>
              </label>
            </div>
          </div>

          {/* Preview Section - Shows how question will appear to respondents */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <label className="block text-xs font-medium text-gray-700 mb-3">
              Preview (How respondents will see this)
            </label>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
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
            </div>
          </div>

          {/* Options Editor - Only show for multiple and single choice */}
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
