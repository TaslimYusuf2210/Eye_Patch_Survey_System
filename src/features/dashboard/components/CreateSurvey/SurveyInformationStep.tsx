import { useFormContext } from 'react-hook-form';
import { useCreateSurveyContext } from '@/contexts/CreateSurveyContext';
import { useNavigate } from 'react-router-dom';

export function SurveyInformationStep() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const {setCurrentRoute} = useCreateSurveyContext();
  const navigate = useNavigate();

  function onNext(data: any) {
    console.log("Survey Information Data:", data);
    console.log("Shit is working")
    setCurrentRoute("surveygoal");
    navigate('/dashboard/create-survey/survey-goal');
  }

  function onError(errors: any) {
    console.log("Errors:", errors);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="bg-accent-100 text-accent-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">1</span>
        Survey Information
      </h2>

      <form onSubmit={handleSubmit(onNext, onError)} className="space-y-5">
        {/* Survey Title */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Survey Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Customer Satisfaction Survey"
            {...register('title')}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
              errors.title
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-accent-500'
            }`}
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{String(errors.title?.message)}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Description
          </label>
          <textarea
            placeholder="Provide additional context about your survey..."
            rows={4}
            {...register('description')}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none ${
              errors.description
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 focus:ring-accent-500'
            }`}
          />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">{String(errors.description?.message)}</p>
          )}
        </div>

        {/* Category & Audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register('category')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white cursor-pointer ${
                errors.category
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-accent-500'
              }`}
            >
              <option value="">Select a category</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="feedback">Product Feedback</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{String(errors.category?.message)}</p>
            )}
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Target Audience <span className="text-red-500">*</span>
            </label>
            <select
              {...register('audience')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white cursor-pointer ${
                errors.audience
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-accent-500'
              }`}
            >
              <option value="">Select an audience</option>
              <option value="general">General public</option>
              <option value="students">Students</option>
              <option value="customers">Customers</option>
              <option value="employees">Employees</option>
            </select>
            {errors.audience && (
              <p className="text-sm text-red-600 mt-1">{String(errors.audience?.message)}</p>
            )}
          </div>
        </div>

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
