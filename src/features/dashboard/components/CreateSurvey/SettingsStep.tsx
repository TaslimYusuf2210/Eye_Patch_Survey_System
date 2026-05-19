import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function SettingsStep() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const navigate = useNavigate();

  function onSubmit() {
    navigate('/dashboard/create-survey/survey-review');
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">4</span>
        Settings
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Response Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Response Limit (Maximum responses to collect)
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="e.g., 100"
              min="0"
              {...register('responseLimit')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                errors.responseLimit
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-blue-500'
              }`}
            />
          </div>
          {errors.responseLimit && (
            <p className="text-sm text-red-600 mt-1">{String(errors.responseLimit.message)}</p>
          )}
        </div>

        {/* Start & End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Start Date
            </label>
            <input
              type="date"
              {...register('startDate')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                errors.startDate
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-blue-500'
              }`}
            />
            {errors.startDate && (
              <p className="text-sm text-red-600 mt-1">{String(errors.startDate.message)}</p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              End Date
            </label>
            <input
              type="date"
              {...register('endDate')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                errors.endDate
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-blue-500'
              }`}
            />
            {errors.endDate && (
              <p className="text-sm text-red-600 mt-1">{String(errors.endDate.message)}</p>
            )}
          </div>
        </div>

        {/* Additional Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Survey Status */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Survey Status
            </label>
            <select
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            >
              <option>Draft</option>
            </select>
          </div>

          {/* Response Collection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Response Collection
            </label>
            <select
              disabled
              className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            >
              <option>Active</option>
            </select>
          </div>
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
