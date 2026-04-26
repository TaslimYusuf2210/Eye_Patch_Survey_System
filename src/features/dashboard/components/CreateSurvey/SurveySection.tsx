import { Plus, Trash2 } from 'lucide-react';
import { Question } from './Question';
import { useFormContext } from 'react-hook-form';
import type { SurveySectionProps } from '@/types/dashboard/createSurvey';

export function SurveySection({ sectionIndex }: SurveySectionProps) {
  const { register } = useFormContext();

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Section Title
          </label>
          <input
            type="text"
            {...register(`sections[${sectionIndex}].title`)}
            placeholder="e.g., Personal Information"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="button"
          className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Remove section"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-4 mb-4">
        <Question sectionIndex={sectionIndex} questionIndex={0} />
        <Question sectionIndex={sectionIndex} questionIndex={1} />
      </div>

      {/* Add Question Button */}
      <button
        type="button"
        className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
      >
        <Plus size={16} />
        Add Question
      </button>
    </div>
  );
};
