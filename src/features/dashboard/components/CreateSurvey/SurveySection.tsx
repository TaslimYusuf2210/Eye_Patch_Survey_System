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
    <div className="border border-gray-200 dark:border-slate-800 rounded-lg p-5 bg-gray-50 dark:bg-slate-900">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">
          Section {sectionIndex + 1}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-md transition-colors"
            title={isCollapsed ? "Expand section" : "Collapse section"}
          >
            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            {isCollapsed ? "Expand" : "Collapse"}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-rose-950 rounded-md transition-colors"
            title="Remove section"
            onClick={() => removeSection(sectionIndex)}
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      {/* Collapsed indicator */}
      {isCollapsed && sectionTitle && (
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 truncate">
          {sectionTitle}
        </p>
      )}

      {!isCollapsed && (
        <>
          {/* Section Title */}
          <div className="mt-3 mb-5">
            <input
              type="text"
              {...register(`sections.${sectionIndex}.title` as const)}
              placeholder="e.g. Personal Information"
              className="w-full px-4 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors?.sections?.[sectionIndex]?.title && (
              <p className="text-sm text-red-600 mt-1">
                {errors.sections[sectionIndex]!.title!.message as string}
              </p>
            )}
          </div>

          {/* Questions List */}
          <div className="space-y-4 mb-4">
            {questions.map((question, questionIndex) =>  (
              <Question key={question.id} sectionIndex={sectionIndex} questionIndex={questionIndex} removeQuestion={removeQuestion} />
            ))}
          </div>

          {/* Add Question Button */}
          <button
            type="button"
            className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center gap-2 font-medium text-sm"
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