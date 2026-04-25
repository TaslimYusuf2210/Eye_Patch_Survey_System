import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { SurveySection } from './SurveySection';

export function SectionsAndQuestionsStep() {
  const { control } = useFormContext();
  const { fields: sections, append: addSection } = useFieldArray({
    control,
    name: 'sections',
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">3</span>
        Sections & Questions
      </h2>

      <div className="space-y-5">
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
      </div>
    </div>
  );
};
