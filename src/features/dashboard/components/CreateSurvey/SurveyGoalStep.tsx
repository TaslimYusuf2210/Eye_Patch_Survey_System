import { useFormContext } from 'react-hook-form';
import type { Action } from '@/types';
import type { Dispatch } from 'react';

export function SurveyGoalStep({ dispatch }: { dispatch: Dispatch<Action> }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  function onSubmit() {
    dispatch({ type: 'NEXT' });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">2</span>
        Survey Goal
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Survey Goal */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            What is the primary goal of this survey? <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="e.g., To understand customer satisfaction levels..."
            rows={4}
            {...register('goal')}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none ${
              errors.goal
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-blue-500'
            }`}
          />
          {errors.goal && (
            <p className="text-sm text-red-600 mt-1">{String(errors.goal.message)}</p>
          )}
        </div>

        {/* How will you use the results? */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            How will you use the results? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="improve-service"
                value="improve-service"
                {...register('usage')}
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label htmlFor="improve-service" className="text-sm text-gray-700 cursor-pointer">
                Improve service/product
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="research"
                value="research"
                {...register('usage')}
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label htmlFor="research" className="text-sm text-gray-700 cursor-pointer">
                Research purposes
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="decision-making"
                value="decision-making"
                {...register('usage')}
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label htmlFor="decision-making" className="text-sm text-gray-700 cursor-pointer">
                Business decision making
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="general-feedback"
                value="general-feedback"
                {...register('usage')}
                className="w-4 h-4 cursor-pointer accent-blue-600"
              />
              <label htmlFor="general-feedback" className="text-sm text-gray-700 cursor-pointer">
                General feedback
              </label>
            </div>
          </div>
          {errors.usage && (
            <p className="text-sm text-red-600 mt-2">{String(errors.usage.message)}</p>
          )}
        </div>

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
