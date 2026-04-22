import { Plus } from 'lucide-react';
import { SurveySection } from '../components/SurveySection';

const CreateSurvey = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Survey</h1>
          <p className="text-gray-600 mt-2">Build a comprehensive survey to gather feedback and insights</p>
        </div>

        <form className="space-y-6">
          {/* ============ SECTION 1: SURVEY INFORMATION ============ */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">1</span>
              Survey Information
            </h2>

            <div className="space-y-5">
              {/* Survey Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Survey Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Customer Satisfaction Survey"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Provide additional context about your survey..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Category & Audience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
                  >
                    <option value="">Select a category</option>
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                    <option value="feedback">Product Feedback</option>
                  </select>
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Target Audience <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="audience"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
                  >
                    <option value="">Select an audience</option>
                    <option value="general">General public</option>
                    <option value="students">Students</option>
                    <option value="customers">Customers</option>
                    <option value="employees">Employees</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ============ SECTION 2: SURVEY GOAL ============ */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">2</span>
              Survey Goal
            </h2>

            <div className="space-y-5">
              {/* Primary Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Primary Goal <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {['collect_feedback', 'research', 'measure_satisfaction', 'data_collection'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="goal"
                        value={option}
                        className="w-4 h-4 text-blue-600 border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">
                        {option === 'collect_feedback' && 'Collect feedback'}
                        {option === 'research' && 'Research'}
                        {option === 'measure_satisfaction' && 'Measure satisfaction'}
                        {option === 'data_collection' && 'Data collection'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Usage of Results */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Usage of Results <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {['internal', 'public_report', 'academic'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="usage"
                        value={option}
                        className="w-4 h-4 text-blue-600 border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">
                        {option === 'internal' && 'Internal use'}
                        {option === 'public_report' && 'Public report'}
                        {option === 'academic' && 'Academic'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ============ SECTION 3: SECTIONS & QUESTIONS ============ */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">3</span>
                Sections & Questions
              </h2>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                <Plus size={18} />
                Add Section
              </button>
            </div>

            {/* Sample Section 1 */}
            <div className="space-y-6">
              <SurveySection sectionIndex={0} />
              <SurveySection sectionIndex={1} />
            </div>
          </div>

          {/* ============ SECTION 4: SETTINGS ============ */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">4</span>
              Settings
            </h2>

            <div className="space-y-5">
              {/* Visibility */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Visibility
                </label>
                <select
                  name="settings.visibility"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="link_only">Link only</option>
                </select>
              </div>

              {/* Anonymous & Response Limit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="settings.anonymous"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-900">Allow anonymous responses</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Response Limit
                  </label>
                  <input
                    type="number"
                    name="settings.limit"
                    placeholder="Unlimited"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Start & End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="settings.startDate"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="settings.endDate"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Multiple Submissions & Require Login */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="settings.multipleSubmissions"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-900">Allow multiple submissions</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="settings.requireLogin"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-900">Require login to submit</span>
                </label>
              </div>
            </div>
          </div>

          {/* ============ SECTION 5: REVIEW SUMMARY ============ */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">5</span>
              Review Summary
            </h2>

            <div className="space-y-4">
              {/* Survey Info Preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-2">Survey Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium text-gray-900">Title:</span> [Survey title will appear here]</p>
                  <p><span className="font-medium text-gray-900">Category:</span> [Selected category]</p>
                  <p><span className="font-medium text-gray-900">Audience:</span> [Selected audience]</p>
                </div>
              </div>

              {/* Sections & Questions Preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-3">Survey Structure</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Section 1: [Section Title]</p>
                    <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                      <li>• Question 1: [Question text]</li>
                      <li>• Question 2: [Question text]</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Settings Preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-2">Survey Settings</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium text-gray-900">Visibility:</span> [Selected visibility]</p>
                  <p><span className="font-medium text-gray-900">Anonymous:</span> [Yes/No]</p>
                  <p><span className="font-medium text-gray-900">Response Limit:</span> [Limit or Unlimited]</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between gap-4 pt-6">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Survey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;