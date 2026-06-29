import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function SettingsStep() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const navigate = useNavigate();
  const [unlimited, setUnlimited] = useState(!watch('responseLimit'));
  const startDate = watch('startDate');
  const today = new Date().toISOString().split('T')[0];

  function onSubmit() {
    navigate('/dashboard/create-survey/survey-review');
  }

  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-6 flex items-center gap-2">
        <span className="bg-accent-100 text-accent-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">4</span>
        Settings
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Response Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-slate-200 mb-2">
            Response Limit <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="number"
                placeholder="e.g., 100"
                min="0"
                disabled={unlimited}
                {...register('responseLimit', { valueAsNumber: true })}
                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:text-white dark:border-slate-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  unlimited
                    ? 'bg-gray-100 dark:bg-slate-900 text-gray-400 dark:text-slate-500 cursor-not-allowed'
                    : errors.responseLimit
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-200 dark:border-slate-800 focus:ring-blue-500'
                }`}
              />
            </div>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <button
                type="button"
                role="switch"
                aria-checked={unlimited}
                onClick={() => {
                  const checked = !unlimited;
                  console.log('No limit toggle:', checked, '| responseLimit set to:', checked ? -1 : undefined);
                  setUnlimited(checked);
                  if (checked) {
                    setValue('responseLimit', -1);
                  } else {
                    setValue('responseLimit', undefined);
                  }
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
                  unlimited
                    ? 'bg-accent-600'
                    : 'bg-gray-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    unlimited ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">No limit</span>
            </label>
          </div>
          {errors.responseLimit && (
            <p className="text-sm text-red-600 mt-1">{String(errors.responseLimit.message)}</p>
          )}
        </div>

        {/* Start & End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-slate-200 mb-2">
              Start Date <span className="text-gray-400 dark:text-slate-500 font-normal">(optional)</span>
            </label>
            <input
              type="date"
              min={today}
              {...register('startDate')}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:text-white dark:border-slate-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                errors.startDate
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 dark:border-slate-800 focus:ring-blue-500'
              }`}
            />
            {errors.startDate && (
              <p className="text-sm text-red-600 mt-1">{String(errors.startDate.message)}</p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-slate-200 mb-2">
              End Date <span className="text-gray-400 dark:text-slate-500 font-normal">(optional)</span>
            </label>
            <input
              type="date"
              min={startDate || today}
              {...register('endDate')}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:text-white dark:border-slate-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                errors.endDate
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 dark:border-slate-800 focus:ring-blue-500'
              }`}
            />
            {errors.endDate && (
              <p className="text-sm text-red-600 mt-1">{String(errors.endDate.message)}</p>
            )}
          </div>
        </div>


      </form>
    </div>
  );
};
