/**
 * Question Type Preview Components
 * Shows how questions will appear to respondents
 */

/**
 * Multiple Choice Preview - Shows checkboxes
 */
export const MultipleChoicePreview = () => {
  return (
    <div className="space-y-2">
      {['Option 1', 'Option 2', 'Option 3'].map((option, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            disabled
            className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-not-allowed"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
};

/**
 * Single Choice Preview - Shows radio buttons
 */
export const SingleChoicePreview = () => {
  return (
    <div className="space-y-2">
      {['Option 1', 'Option 2', 'Option 3'].map((option, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            disabled
            className="w-4 h-4 text-blue-600 border-gray-300 cursor-not-allowed"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
};

/**
 * Text Preview - Shows a text input field
 */
export const TextPreview = () => {
  return (
    <div>
      <input
        type="text"
        disabled
        placeholder="Respondent will type their answer here..."
        className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
      />
    </div>
  );
};

/**
 * Likert Scale Preview - Shows 5 radio buttons for single selection
 */
export const LikertScalePreview = () => {
  const options = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
  return (
    <div className="space-y-2">
      {options.map((option, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            disabled
            name="likert_preview"
            className="w-4 h-4 text-blue-600 border-gray-300 cursor-not-allowed"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
};

/**
 * Yes/No Preview - Shows Yes and No radio buttons for single selection
 */
export const YesNoPreview = () => {
  return (
    <div className="space-y-2">
      {['Yes', 'No'].map((option, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            disabled
            name="yesno_preview"
            className="w-4 h-4 text-blue-600 border-gray-300 cursor-not-allowed"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
};
