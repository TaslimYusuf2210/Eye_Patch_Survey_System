import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useReducer } from 'react';
import { SurveyInformationStep } from '../components/CreateSurvey/SurveyInformationStep';
import { SurveyGoalStep } from '../components/CreateSurvey/SurveyGoalStep';
import { SectionsAndQuestionsStep } from '../components/CreateSurvey/SectionsAndQuestionsStep';
import { SettingsStep } from '../components/CreateSurvey/SettingsStep';
import { ReviewSummaryStep } from '../components/CreateSurvey/ReviewSummaryStep';
import type { StateController, Action, CreateSurveyFormData } from '@/types/dashboard/common';

const surveyInformationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Survey title is required'),
  description: yup
    .string()
    .max(200, 'Description cannot exceed 200 characters')
    .required('Description is required'),
  category: yup
    .string()
    .required('Category is required'),
  audience: yup
    .string()
    .required('Target audience is required'),
});

const surveyGoalSchema = yup.object().shape({
  goal: yup
    .string()
    .required('Primary goal is required'),
  usage: yup
    .string()
    .required('Usage of results is required'),
});

const surveySettingsSchema = yup.object().shape({
  startDate: yup.string().optional(),
  endDate: yup.string().optional(),
  responseLimit: yup.number().positive('Response limit must be positive').optional(),
});

// const sectionsAndQuestionsSchema = yup.object().shape({
//   sections: yup.array().of(
//     yup.object().shape({
//       title: yup.string().required('Section title is required'),
//       questions: yup.array().of(
//         // yup.object().shape({
//         //   text: yup.string().required('Question text is required'),
//         //   type: yup.string().oneOf(['text', 'multiple-choice', 'rating']).required('Question type is required'),
//         //   options: yup.array().when('type', {
//         //     // is: 'multiple-choice',
//         //     then: yup.array().of(yup.string().required('Option text is required')).min(2, 'At least 2 options are required'),
//         //     otherwise: yup.array().notRequired(),
//         //   }),
//         // })
//       ).min(1, 'At least one question is required'),
//     })
//   ).min(1, 'At least one section is required'),
// });

const noSchema = yup.object().shape({});

function getSchemaForStep(step: number) {
  switch (step) {
    case 0:
      return surveyInformationSchema;
    case 1:
      return surveyGoalSchema;
    case 2:
      return surveySettingsSchema;
    // case 3:
    //   return sectionsAndQuestionsSchema;
    default:
      return noSchema;
  }
}

const initialState: StateController = { step: 0 };

function reducer(state: StateController, action: Action) {
  switch (action.type) {
    case "NEXT":
      return { step: state.step + 1 };
    case "PREV":
      return { step: state.step - 1 };
    case "GOTO":
      return { step: action.payload };
    default:
      return state;
  }
}

export default function CreateSurvey() {
      const [state, dispatch] = useReducer(reducer, initialState);

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
    resolver: yupResolver<CreateSurveyFormData, any, any>(getSchemaForStep(state.step) as any),
    shouldUnregister: false,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Survey</h1>
            <p className="text-gray-600 mt-2">Build a comprehensive survey to gather feedback and insights</p>  
          </div>
          <div>
            <p>Position for interactive stepper</p>
          </div>
        </div>

        <FormProvider {...methods}>
          {state.step === 0 && <SurveyInformationStep dispatch={dispatch} />}
          {state.step === 1 && <SurveyGoalStep dispatch={dispatch} />}
          {state.step === 2 && <SectionsAndQuestionsStep dispatch={dispatch}/>}
          {state.step === 3 && <SettingsStep dispatch={dispatch}/>}
          {state.step === 4 && <ReviewSummaryStep dispatch={dispatch}/>}

          <div>
            <button></button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};
