import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Question } from './Question';
import { useFormContext, useFieldArray } from 'react-hook-form';
import type { SurveySectionProps } from '@/types/dashboard/createSurvey';
import { useState } from 'react';
import type { CreateSurveyFormData } from '@/types/dashboard/common';

export function SurveySection({ sectionIndex, removeSection }: SurveySectionProps) {
  const { register, control, watch, formState: { errors } } = useFormContext<CreateSurveyFormData>();
  const { fields: questions, append: addQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions` as const
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const sectionTitle = watch(`sections.${sectionIndex}.title` as const);

  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex-1 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-500"
            title={isCollapsed ? "Expand section" : "Collapse section"}
          >
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Section {sectionIndex + 1}: {isCollapsed && sectionTitle ? sectionTitle : 'Title'}
            </label>
            {!isCollapsed && (
              <>
                <input
                  type="text"
                  {...register(`sections.${sectionIndex}.title` as const)}
                  placeholder="e.g. Personal Information"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors?.sections?.[sectionIndex]?.title && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.sections[sectionIndex]!.title!.message as string}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        <button
          type="button"
          className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Remove section"
          onClick={() => removeSection(sectionIndex)}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* Questions List */}
          <div className="space-y-4 mb-4">
            {questions.map((question, questionIndex) =>  (
              <Question key={question.id} sectionIndex={sectionIndex} questionIndex={questionIndex} removeQuestion={removeQuestion} />
            ))}
          </div>

          {/* Add Question Button */}
          <button
            type="button"
            className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
            onClick={() =>
              addQuestion({
                text: '',
                type: 'text',
                required: true,
                options: [],
              })
            }
          >
            <Plus size={16} />
            Add Question
          </button>
        </>
      )}
    </div>
  );
};
