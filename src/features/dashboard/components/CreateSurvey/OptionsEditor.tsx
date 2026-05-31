import { Plus, Trash2 } from 'lucide-react';
import type { OptionsEditorProps } from '@/types/dashboard/createSurvey';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { CreateSurveyFormData } from '@/types/dashboard/common';

export function OptionsEditor({ sectionIndex, questionIndex, questionType }: OptionsEditorProps) {
  const inputType = questionType === 'single_choice' ? 'radio' : 'checkbox';
  const { control, register, formState: { errors } } = useFormContext<CreateSurveyFormData>();
  const { fields: options, append: addOption, remove: removeOption } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions.${questionIndex}.options` as const
  });

  return (
    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
      <label className="block text-xs font-medium text-gray-700 dark:text-slate-200 mb-3">
        {questionType === 'single_choice' ? 'Response Options' : 'Options'}
      </label>
      <div className="space-y-2">
        {options.map((_, oIndex) => (
          <div key={oIndex}>
            <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1 px-3 py-1.5 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900">
              <input
                type={inputType}
                disabled
                className={`w-4 h-4 text-blue-600 ${inputType === 'radio' ? 'border-gray-300 dark:border-slate-700' : 'rounded border-gray-300 dark:border-slate-700'} cursor-not-allowed`}
              />
              <input
                type="text"
                {...register(`sections.${sectionIndex}.questions.${questionIndex}.options.${oIndex}.value` as const)}
                placeholder={`Option ${oIndex + 1}`}
                className="flex-1 bg-transparent text-sm text-gray-200 dark:text-slate-100 placeholder-gray-200 dark:placeholder-slate-500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Remove option"
              onClick={() => removeOption(oIndex)}
            >
              <Trash2 size={16} />
            </button>
            </div>
            {errors?.sections?.[sectionIndex]?.questions?.[questionIndex]?.options?.[oIndex]?.value && (
              <p className="text-sm text-red-600 mt-1 pl-8">
                {errors.sections[sectionIndex]!.questions[questionIndex]!.options![oIndex]!.value!.message as string}
              </p>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="text-sm text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium flex items-center gap-1 mt-3"
        onClick={() => addOption({ value: '' })}
      >
        <Plus size={14} />
        Add Option
      </button>
      
      {/* Options Array Error (e.g. "At least 2 options are required") */}
      {(errors?.sections?.[sectionIndex]?.questions?.[questionIndex]?.options as any)?.message && (
        <p className="text-sm text-red-600 mt-2">
          {(errors?.sections?.[sectionIndex]?.questions?.[questionIndex]?.options as any)?.message as string}
        </p>
      )}
    </div>
  );
};
