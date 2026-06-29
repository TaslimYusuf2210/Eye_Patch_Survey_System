import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import type { CreateSurveyFormData } from '@/types/dashboard/common';
import { CreateSurveyProvider } from '@/contexts/CreateSurveyContext';
import { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { SurveyStepper } from '../components/CreateSurvey/SurveyStepper';
import { Save, Clock, ArrowRight, Send, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { saveSurveyProgress, updateSurveyProgress } from '@/services/dashboard/surveys';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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
  startDate: yup
    .string()
    .optional()
    .test('is-today-or-later', 'Start date cannot be earlier than today', (value) => {
      if (!value) return true;
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      return value >= today;
    }),
  endDate: yup
    .string()
    .optional()
    .test('is-after-start', 'End date must be at least one day after the start date', function (value) {
      if (!value) return true;
      const startDate = this.parent.startDate;
      if (!startDate) return true;
      return value > startDate;
    }),
  responseLimit: yup
    .number()
    .nullable()
    .test('min-10-or-unlimited', 'Response limit must be at least 10', (value) => {
      if (value === -1 || value === null) return true; // Unlimited
      if (value === undefined || Number.isNaN(value)) return false;
      return value >= 10;
    }),
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
                  "true_false",
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
  const { textTitle, textSubtitle } = useTheme();
  // const { currentRoute } = useCreateSurveyContext();
  // // console.log('Current Route in CreateSurvey:', currentRoute);
  // // console.log('Location Pathname in CreateSurvey:', location.pathname);
  
  function getSchemaForRoute(pathname: string) {
    if (pathname.includes('/survey-goal')) return surveyGoalSchema;
    if (pathname.includes('/survey-settings')) return surveySettingsSchema;
    if (pathname.includes('/sections-and-questions')) return sectionsAndQuestionsSchema;
    if (pathname.includes('/survey-review')) return noSchema;
    return surveyInformationSchema; // Default to information step
  }

  const savedFormData = sessionStorage.getItem("createSurveyForm") || localStorage.getItem("createSurveyDraft");

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

  const [lastSaved, setLastSaved] = useState<string | null>(() => {
    const saved = localStorage.getItem("createSurveyDraftTimestamp");
    return saved || null;
  });
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleSaveDraft = useCallback(async () => {
    const data = methods.getValues();
    const now = new Date();

    // Always save locally as backup
    localStorage.setItem("createSurveyDraft", JSON.stringify(data));
    localStorage.setItem("createSurveyDraftTimestamp", now.toISOString());
    setLastSaved(now.toISOString());

    // Save to API
    try {
      const draftId = localStorage.getItem("activeDraftId");
      if (draftId) {
        await updateSurveyProgress(draftId, data);
      } else {
        const response = await saveSurveyProgress(data);
        if (response?.id) {
          localStorage.setItem("activeDraftId", response.id);
        }
      }
      toast.success("Progress saved!");
    } catch {
      toast.error("Saved locally, but failed to sync to server.");
    }
  }, [methods]);

  const navigate = useNavigate();

  const handleNext = useCallback(async () => {
    const pathname = location.pathname;
    let nextPath: string;

    if (pathname.includes('/survey-goal')) nextPath = '/dashboard/create-survey/sections-and-questions';
    else if (pathname.includes('/sections-and-questions')) nextPath = '/dashboard/create-survey/survey-settings';
    else if (pathname.includes('/survey-settings')) nextPath = '/dashboard/create-survey/survey-review';
    else if (pathname.includes('/survey-review')) nextPath = '';
    else nextPath = '/dashboard/create-survey/survey-goal';

    if (pathname.includes('/survey-review')) {
      const data = methods.getValues();
      console.log('Final Survey Data:', data);
      toast.success('Survey created successfully!');
      return;
    }

    // Validate against the current step's schema manually
    const schema = getSchemaForRoute(pathname);
    const data = methods.getValues();

    // Extra check for response limit on settings step
    if (pathname.includes('/survey-settings')) {
      const limit = data.responseLimit;
      console.log('responseLimit value:', limit, typeof limit);
      if (limit === -1) {
        // -1 means No limit is ON - skip, it's valid
        console.log('→ No limit is ON (-1), skipping responseLimit validation');
      } else if (limit === undefined || Number.isNaN(limit)) {
        console.log('→ Setting error: responseLimit is empty');
        methods.setError('responseLimit', {
          type: 'manual',
          message: 'Response limit is required when No limit is disabled',
        });
        const errorsAfter = methods.formState.errors;
        console.log('→ Errors after setError:', errorsAfter.responseLimit);
        return;
      } else if (limit < 10) {
        console.log('→ Setting error: responseLimit is', limit);
        methods.setError('responseLimit', {
          type: 'manual',
          message: 'Response limit must be at least 10',
        });
        return;
      }
    }

    try {
      await schema.validate(data, { abortEarly: false });
      methods.clearErrors();
      navigate(nextPath);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        methods.clearErrors();
        err.inner.forEach((e) => {
          if (e.path) {
            methods.setError(e.path as any, { message: e.message, type: 'manual' });
          }
        });
        console.log('Validation errors:', err.inner);
      }
    }
  }, [location.pathname, methods, navigate]);

  return (
    <CreateSurveyProvider>
      <div className="min-h-screen py-8 flex flex-col">
        <div className="">
          {/* Header */}
          <div className="mb-8 bg-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold ${textTitle}`}>Create Survey</h1>
              <p className={`${textSubtitle} mt-2`}>Build a comprehensive survey to gather feedback and insights</p>
            </div>
            <div className="shrink-0">
              <SurveyStepper />
            </div>
          </div>
          <FormProvider {...methods}>  
            <Outlet/>
          </FormProvider>
        </div>

        {/* Bottom bar */}
        <div className="mt-auto pt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowSaveDialog(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Progress
            </button>
            {lastSaved && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500">
                <Clock className="w-3 h-3" />
                {new Date(lastSaved).toLocaleString()}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-accent-600 text-white text-sm font-medium hover:bg-accent-700 transition-colors cursor-pointer shadow-sm"
          >
            {location.pathname.includes('/survey-review') ? (
              <>
                <Send className="w-4 h-4" />
                Create Survey
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Save Progress Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent-600" />
              Save Progress
            </DialogTitle>
            <DialogDescription className="pt-2">
              Your survey will be saved as a <strong>draft</strong>. You can come back later to continue editing.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 text-sm text-gray-600 dark:text-slate-400">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-accent-600">1</span>
              </div>
              <p>All your progress will be saved — you won't lose any data.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-accent-600">2</span>
              </div>
              <p>You can find and continue editing this draft from the <strong>Surveys</strong> page.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-accent-600">3</span>
              </div>
              <p>Only publish when you're ready to start collecting responses.</p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <button
              type="button"
              onClick={() => setShowSaveDialog(false)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setShowSaveDialog(false);
                handleSaveDraft();
              }}
              className="px-5 py-2 rounded-lg bg-accent-600 text-white text-sm font-medium hover:bg-accent-700 transition-colors cursor-pointer"
            >
              Save Progress
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CreateSurveyProvider>
  );
};
