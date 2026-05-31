/**
 * Question Type Preview Components
 * Shows how questions will appear to respondents
 */

/**
 * Multiple Choice Preview - Shows checkboxes
 */
export function MultipleChoicePreview() {
  return (
    <div className="space-y-2">
      {['Option 1', 'Option 2', 'Option 3'].map((option, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            disabled
            className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-slate-700 cursor-not-allowed"
          />
          <span className="text-sm text-gray-700 dark:text-slate-200">{option}</span>
        </label>
      ))}
    </div>
  );
};

/**
 * Single Choice Preview - Shows radio buttons
 */
export function SingleChoicePreview() {
  return (
    <div className="space-y-2">
      {['Option 1', 'Option 2', 'Option 3'].map((option, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            disabled
            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-slate-700 cursor-not-allowed"
          />
          <span className="text-sm text-gray-700 dark:text-slate-200">{option}</span>
        </label>
      ))}
    </div>
  );
};

/**
 * Text Preview - Shows a text input field
 */
export function TextPreview() {
  return (
    <div>
      <input
        type="text"
        disabled
        placeholder="Respondent will type their answer here..."
        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-800 rounded text-sm bg-gray-100 dark:bg-slate-900 text-gray-500 dark:text-slate-400 cursor-not-allowed"
      />
    </div>
  );
};

/**
 * Likert Scale Preview - Shows 5 radio buttons for single selection
 */
export function LikertScalePreview() {
  const options = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
  return (
    <div className="space-y-2">
      {options.map((option, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            disabled
            name="likert_preview"
            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-slate-700 cursor-not-allowed"
          />
          <span className="text-sm text-gray-700 dark:text-slate-200">{option}</span>
        </label>
      ))}
    </div>
  );
};

/**
 * Yes/No Preview - Shows Yes and No radio buttons for single selection
 */
export function YesNoPreview() {
  return (
    <div className="space-y-2">
      {['Yes', 'No'].map((option, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            disabled
            name="yesno_preview"
            className="w-4 h-4 text-blue-600 border-gray-300 dark:border-slate-700 cursor-not-allowed"
          />
          <span className="text-sm text-gray-700 dark:text-slate-200">{option}</span>
        </label>
      ))}
    </div>
  );
};
