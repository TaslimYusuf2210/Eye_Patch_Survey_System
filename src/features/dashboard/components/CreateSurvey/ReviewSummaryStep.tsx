import { useFormContext } from 'react-hook-form';
import type { Action } from '@/types';
import type { Dispatch } from 'react';

export function ReviewSummaryStep({ dispatch }: { dispatch: Dispatch<Action> }) {
  const { getValues, handleSubmit } = useFormContext();

  const formData = getValues()

  function onSubmit() {
    dispatch({ type: 'NEXT' });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">5</span>
        Review & Publish
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Survey Overview */}
        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Survey Overview</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Title:</span> {formData.title || 'Not provided'}
            </p>
            <p>
              <span className="font-medium">Category:</span> {formData.category || 'Not provided'}
            </p>
            <p>
              <span className="font-medium">Audience:</span> {formData.audience || 'Not provided'}
            </p>
          </div>
        </div>

        {/* Goals & Usage */}
        <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Goals & Usage</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Goal:</span> {formData.goal || 'Not provided'}
            </p>
            <p>
              <span className="font-medium">Usage:</span> {formData.usage || 'Not provided'}
            </p>
          </div>
        </div>

        {/* Configuration */}
        <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Configuration</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium">Number of Sections:</span>{' '}
              {formData.sections?.length || 0}
            </p>
            <p>
              <span className="font-medium">Total Questions:</span>{' '}
              {formData.sections?.reduce(
                (acc: number, section: any) => acc + (section.questions?.length || 0),
                0
              ) || 0}
            </p>
            <p>
              <span className="font-medium">Response Limit:</span> {formData.responseLimit || 'Unlimited'}
            </p>
          </div>
        </div>

        {/* Dates */}
        {(formData.startDate || formData.endDate) && (
          <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Timing</h3>
            <div className="space-y-2 text-sm text-gray-700">
              {formData.startDate && (
                <p>
                  <span className="font-medium">Start Date:</span>{' '}
                  {new Date(formData.startDate).toLocaleDateString()}
                </p>
              )}
              {formData.endDate && (
                <p>
                  <span className="font-medium">End Date:</span>{' '}
                  {new Date(formData.endDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Survey
          </button>
        </div>
      </form>
    </div>
  );
};
