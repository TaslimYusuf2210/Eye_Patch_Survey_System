import { useFormContext } from 'react-hook-form';
import { useCreateSurveyContext } from '@/contexts/CreateSurveyContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

export function SurveyGoalStep() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const { colors } = useTheme();
  const { setCurrentRoute } = useCreateSurveyContext();
  const navigate = useNavigate();

  function onSubmit() {
    setCurrentRoute("sectionsandquestions")
    navigate('/dashboard/create-survey/sections-and-questions');
  }

  return (
    <div className="bg-white dark:bg-slate-950 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-6 flex items-center gap-2">
        <span className="bg-accent-100 text-accent-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">2</span>
        Survey Goal
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Survey Goal */}
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-slate-200 mb-2">
            What is the primary goal of this survey? <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="e.g., To understand customer satisfaction levels..."
            rows={4}
            {...register('goal')}
            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none ${
              errors.goal
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 dark:border-slate-800 focus:ring-blue-500'
            }`}
          />
          {errors.goal && (
            <p className="text-sm text-red-600 mt-1">{String(errors.goal.message)}</p>
          )}
        </div>

        {/* How will you use the results? */}
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-slate-200 mb-3">
            How will you use the results? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="improve-service"
                value="improve-service"
                {...register('usage')}
                className="w-4 h-4 cursor-pointer"
                style={{ accentColor: colors[600] }}
              />
              <label htmlFor="improve-service" className="text-sm text-gray-700 dark:text-slate-200 cursor-pointer">
                Improve service/product
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="research"
                value="research"
                {...register('usage')}
                className="w-4 h-4 cursor-pointer"
                style={{ accentColor: colors[600] }}
              />
              <label htmlFor="research" className="text-sm text-gray-700 dark:text-slate-200 cursor-pointer">
                Research purposes
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="decision-making"
                value="decision-making"
                {...register('usage')}
                className="w-4 h-4 cursor-pointer"
                style={{ accentColor: colors[600] }}
              />
              <label htmlFor="decision-making" className="text-sm text-gray-700 dark:text-slate-200 cursor-pointer">
                Business decision making
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="general-feedback"
                value="general-feedback"
                {...register('usage')}
                className="w-4 h-4 cursor-pointer"
                style={{ accentColor: colors[600] }}
              />
              <label htmlFor="general-feedback" className="text-sm text-gray-700 dark:text-slate-200 cursor-pointer">
                General feedback
              </label>
            </div>
          </div>
          {errors.usage && (
            <p className="text-sm text-red-600 mt-2">{String(errors.usage.message)}</p>
          )}
        </div>


      </form>
    </div>
  );
};
