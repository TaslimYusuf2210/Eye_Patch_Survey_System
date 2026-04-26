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

export function Question({ sectionIndex, questionIndex, questionType = 'multiple_choice' }: QuestionProps) {
  const { register } = useFormContext();

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      {/* Question Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4">
        {/* Question Text */}
        <div className="md:col-span-7">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Question Text
          </label>
          <input
            type="text"
            {...register(`sections[${sectionIndex}].questions[${questionIndex}].text`)}
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
            {...register(`sections[${sectionIndex}].questions[${questionIndex}].type`)}
            className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="multiple_choice">Multiple Choice</option>
            <option value="single_choice">Single Choice</option>
            <option value="text">Text</option>
            <option value="likert_scale">Likert Scale</option>
            <option value="yes_no">Yes/No</option>
          </select>
        </div>

        {/* Required Checkbox */}
        <div className="md:col-span-2 flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register(`sections[${sectionIndex}].questions[${questionIndex}].required`)}
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
          {questionType === 'multiple_choice' && (
            <MultipleChoicePreview />
          )}
          {questionType === 'single_choice' && (
            <SingleChoicePreview />
          )}
          {questionType === 'text' && (
            <TextPreview />
          )}
          {questionType === 'likert_scale' && (
            <LikertScalePreview />
          )}
          {questionType === 'yes_no' && (
            <YesNoPreview />
          )}
        </div>
      </div>

      {/* Options Editor - Only show for multiple and single choice */}
      {(questionType === 'multiple_choice' || questionType === 'single_choice') && (
        <OptionsEditor sectionIndex={sectionIndex} questionIndex={questionIndex} questionType={questionType} />
      )}
    </div>
  );
};
