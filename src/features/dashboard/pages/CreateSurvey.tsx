import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, Outlet } from 'react-router-dom';
import type { CreateSurveyFormData } from '@/types/dashboard/common';
import { CreateSurveyProvider } from '@/contexts/CreateSurveyContext';
import { useEffect } from 'react';

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

const sectionsAndQuestionsSchema = yup.object<Pick<CreateSurveyFormData, "sections">>().shape({
  sections: yup
    .array()
    .of(
      yup.object().shape({
        title: yup
          .string()
          .required("Section title is required"),

        questions: yup
          .array()
          .of(
            yup.object().shape({
              text: yup
                .string()
                .required("Question text is required"),

              type: yup
                .string()
                .oneOf([
                  "text",
                  "multiple_choice",
                  "single_choice",
                  "likert_scale",
                  "yes_no",
                ])
                .required("Question type is required"),

              options: yup.array().when("type", {
                is: (type: string) =>
                  type === "multiple_choice" ||
                  type === "single_choice",

                then: (schema) =>
                  schema
                    .of(
                      yup.object().shape({
                        value: yup
                          .string()
                          .required("Option text is required"),
                      })
                    )
                    .min(
                      2,
                      "At least 2 options are required"
                    ),

                otherwise: (schema) =>
                  schema.default([]),
              }),
            })
          )
          .min(
            1,
            "At least one question is required"
          ),
      })
    )
    .min(1, "At least one section is required"),
});



const noSchema = yup.object().shape({});


export default function CreateSurvey() {
  const location = useLocation();
  // const { currentRoute } = useCreateSurveyContext();
  // // console.log('Current Route in CreateSurvey:', currentRoute);
  // // console.log('Location Pathname in CreateSurvey:', location.pathname);
  
  function getSchemaForRoute(pathname: string) {
    if (pathname.includes('/goal')) return surveyGoalSchema;
    if (pathname.includes('/settings')) return surveySettingsSchema;
    if (pathname.includes('/sections')) return sectionsAndQuestionsSchema;
    if (pathname.includes('/review')) return noSchema;
    return surveyInformationSchema; // Default to information step
  }

  const savedFormData = sessionStorage.getItem("createSurveyForm");

  const methods = useForm<CreateSurveyFormData>({
    defaultValues: savedFormData
      ? JSON.parse(savedFormData)
      : {
      title: '',
      description: '',
      category: '',
      audience: '',
      goal: '',
      usage: '',
      startDate: '',
      endDate: '',
      responseLimit: undefined,
    },
    resolver: yupResolver<CreateSurveyFormData, any, any>(getSchemaForRoute(location.pathname) as any),
    shouldUnregister: false,
  });

  useEffect(() => {
  const subscription = methods.watch((value) => {
    sessionStorage.setItem(
      "createSurveyForm",
      JSON.stringify(value)
    );
  });

  return () => subscription.unsubscribe();
}, [methods]);

  useEffect(() => {
    const schema = getSchemaForRoute(location.pathname);
    console.log('schema name', schema === sectionsAndQuestionsSchema)
    console.log('Current schema', schema.describe())
  }, [location.pathname]);

  return (
    <CreateSurveyProvider>
      <div className="min-h-screen dark:bg-slate-950 py-8 ">
        <div className="mx-auto px-6">
          {/* Header */}
          <div className="mb-8 bg-transparent">
            <div>
              <h1 className="text-3xl font-bold text-white">Create Survey</h1>
              <p className="text-gray-200 mt-2">Build a comprehensive survey to gather feedback and insights</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-slate-400">Position for interactive stepper</p>
            </div>
          </div>
          <FormProvider {...methods}>  
            <Outlet/>
          </FormProvider>
        </div>
      </div>
    </CreateSurveyProvider>
  );
};
