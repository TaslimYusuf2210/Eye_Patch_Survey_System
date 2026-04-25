import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { SurveyInformationStep } from '../components/CreateSurvey/SurveyInformationStep';
import { SurveyGoalStep } from '../components/CreateSurvey/SurveyGoalStep';
import { SectionsAndQuestionsStep } from '../components/CreateSurvey/SectionsAndQuestionsStep';
import { SettingsStep } from '../components/CreateSurvey/SettingsStep';
import { ReviewSummaryStep } from '../components/CreateSurvey/ReviewSummaryStep';

const surveySchema = yup.object().shape({
  title: yup
    .string()
    .required('Survey title is required'),
  description: yup
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .required('Description is required'),
  category: yup
    .string()
    .required('Category is required'),
  audience: yup
    .string()
    .required('Target audience is required'),
  goal: yup
    .string()
    .required('Primary goal is required'),
  usage: yup
    .string()
    .required('Usage of results is required'),
  startDate: yup.string().optional(),
  endDate: yup.string().optional(),
  responseLimit: yup.number().positive('Response limit must be positive').optional(),
});

interface CreateSurveyFormData {
  title: string;
  description: string;
  category: string;
  audience: string;
  goal: string;
  usage: string;
  startDate?: string | undefined;
  endDate?: string | undefined;
  responseLimit?: number | undefined;
}

export default function CreateSurvey() {
  const methods = useForm<CreateSurveyFormData>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      audience: '',
      goal: '',
      usage: '',
      startDate: undefined,
      endDate: undefined,
      responseLimit: undefined,
    },
    resolver: yupResolver<CreateSurveyFormData, any, any>(surveySchema),
    shouldUnregister: false,
  });

  const { watch, handleSubmit } = methods;
  const formData = watch();

  const onSubmit = (data: CreateSurveyFormData) => {
    console.log('Form Data:', data);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Survey</h1>
          <p className="text-gray-600 mt-2">Build a comprehensive survey to gather feedback and insights</p>
        </div>

        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <SurveyInformationStep />

            <SurveyGoalStep />

            <SectionsAndQuestionsStep />

            <SettingsStep />

            <ReviewSummaryStep formData={formData} />

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
        </FormProvider>
      </div>
    </div>
  );
};
