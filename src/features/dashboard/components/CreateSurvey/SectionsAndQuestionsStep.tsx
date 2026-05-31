import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { SurveySection } from './SurveySection';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function SectionsAndQuestionsStep() {
  const { control, handleSubmit, watch } = useFormContext();
  const { fields: sections, append: addSection, remove: removeSection } = useFieldArray({
    control,
    name: 'sections',
  });
    const navigate = useNavigate()

  const watchSections = watch('sections');

  function onSubmit(data: any) {
    console.log('Form Data at Sections & Questions Step:', data);
    navigate('/dashboard/create-survey/survey-settings');
  }

  function onError(errors: any) {
    console.log('Validation Errors:', errors);
  }

  useEffect(() => {
    console.log('Current sections and questions:', watchSections);
  }, [watchSections]);

  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-6 flex items-center gap-2">
        <span className="bg-accent-100 text-accent-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">3</span>
        Sections & Questions
      </h2>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
        {sections.map((section, sectionIndex) => (
          <SurveySection key={section.id} sectionIndex={sectionIndex} removeSection={removeSection} />
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
                  required: true,
                  options: [],
                },
              ],
            })
          }
          className="w-full py-3 px-4 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg hover:border-accent-500 hover:bg-accent-100 dark:hover:bg-accent-950 transition-all flex items-center justify-center gap-2 text-accent-600 dark:text-accent-300 font-medium"
        >
          <Plus size={20} />
          Add Section
        </button>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-medium"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
