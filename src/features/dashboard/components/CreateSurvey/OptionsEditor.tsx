import { Plus, Trash2 } from 'lucide-react';

/**
 * Options Editor - Allows adding/removing options for single/multiple choice
 */
interface OptionsEditorProps {
  sectionIndex: number;
  questionIndex: number;
  questionType: string;
}

export function OptionsEditor({ sectionIndex, questionIndex, questionType }: OptionsEditorProps) {
  const inputType = questionType === 'single_choice' ? 'radio' : 'checkbox';

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <label className="block text-xs font-medium text-gray-700 mb-3">
        {questionType === 'single_choice' ? 'Response Options' : 'Options'}
      </label>
      <div className="space-y-2">
        {[0, 1, 2].map((oIndex) => (
          <div key={oIndex} className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1 px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50">
              <input
                type={inputType}
                disabled
                className={`w-4 h-4 text-blue-600 ${inputType === 'radio' ? 'border-gray-300' : 'rounded border-gray-300'} cursor-not-allowed`}
              />
              <input
                type="text"
                name={`sections[${sectionIndex}].questions[${questionIndex}].options[${oIndex}].value`}
                placeholder={`Option ${oIndex + 1}`}
                className="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-400"
              />
            </div>
            <button
              type="button"
              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Remove option"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 mt-3"
      >
        <Plus size={14} />
        Add Option
      </button>
    </div>
  );
};
