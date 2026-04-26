import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { SurveySection } from './SurveySection';
import type { Action } from '@/types';
import type { Dispatch } from 'react';

export function SectionsAndQuestionsStep({ dispatch }: { dispatch: Dispatch<Action> }) {
  const { control, handleSubmit } = useFormContext();
  const { fields: sections, append: addSection } = useFieldArray({
    control,
    name: 'sections',
  });

  function onSubmit() {
    dispatch({ type: 'NEXT' });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">3</span>
        Sections & Questions
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {sections.map((section, sectionIndex) => (
          <SurveySection key={section.id} sectionIndex={sectionIndex} />
        ))}

        <button
          type="button"
          onClick={() =>
            addSection({
              title: '',
              questions: [
                {
                  text: '',
                  type: 'multiple_choice',
                  options: ['Option 1', 'Option 2'],
                },
              ],
            })
          }
          className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-blue-600 font-medium"
        >
          <Plus size={20} />
          Add Section
        </button>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
