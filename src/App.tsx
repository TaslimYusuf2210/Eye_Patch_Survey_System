import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageLayout from './features/landingPage/layout/LandingPageLayout';
import LandingPage from './features/landingPage/pages/landingPage'
import Login from './features/auth/pages/login';
import SignUp from './features/auth/pages/signup';
import Dashboard from './features/dashboard/pages/dashboard';
import CreateSurvey from './features/dashboard/pages/CreateSurvey';
import DashboardLayout from './features/dashboard/layout/DashboardLayout';
import SurveyList from './features/dashboard/pages/SurveyList';
import SurveyView from './features/dashboard/pages/SurveyView';
import SettingsView from './features/dashboard/pages/SettingsView';
import { SurveyInformationStep } from './features/dashboard/components/CreateSurvey/SurveyInformationStep';
import { SectionsAndQuestionsStep } from './features/dashboard/components/CreateSurvey/SectionsAndQuestionsStep';
import { SurveyGoalStep } from './features/dashboard/components/CreateSurvey/SurveyGoalStep';
import { SettingsStep } from './features/dashboard/components/CreateSurvey/SettingsStep';
import { ReviewSummaryStep } from './features/dashboard/components/CreateSurvey/ReviewSummaryStep';
import { CreateSurveyProvider } from './contexts/CreateSurveyContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useProfile } from '@/hooks/useQuery/useProfile';
import { Toaster } from './components/ui/sonner';
import GlobalResponses from './features/dashboard/pages/GlobalResponses';
import Responses from './features/dashboard/pages/Responses';
import ResponseDetail from './features/dashboard/pages/ResponseDetail';
import ResponseAnswers from './features/dashboard/pages/ResponseAnswers';
import SurveyResponsePage from './features/surveyResponse/SurveyResponsePage';


function DashboardRoute() {
  // Wait for the current user before mounting the theme so the theme is scoped
  // to the account — a brand-new account starts on the default theme instead of
  // inheriting another account's saved mode from browser-wide localStorage.
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider userId={profile?.id}>
      <DashboardLayout />
    </ThemeProvider>
  );
}

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <LandingPageLayout>
            <LandingPage></LandingPage>
          </LandingPageLayout>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/survey/:surveyId/answer" element={
          <ThemeProvider>
            <SurveyResponsePage />
          </ThemeProvider>
        } />
        <Route path="/dashboard/" element={<DashboardRoute />} >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/create-survey" element={
          <CreateSurveyProvider>
            <CreateSurvey />
          </CreateSurveyProvider>
          }>
            <Route index element={<SurveyInformationStep/>}></Route>
            {/* <Route path='/dashboard/create-survey/survey-information' element={<SurveyInformationStep/>}></Route> */}
            <Route path='/dashboard/create-survey/survey-goal' element={<SurveyGoalStep/>}></Route>
            <Route path='/dashboard/create-survey/sections-and-questions' element={<SectionsAndQuestionsStep/>}></Route>
            <Route path='/dashboard/create-survey/survey-settings' element={<SettingsStep/>}></Route>
            <Route path='/dashboard/create-survey/survey-review' element={<ReviewSummaryStep/>}></Route>
          </Route>
          <Route path="/dashboard/surveys" element={<SurveyList />} />
          <Route path="/dashboard/surveys/:id/view" element={<SurveyView />} />
          <Route path="/dashboard/responses" element={<Responses />}>
            <Route index element={<GlobalResponses/>}></Route>
            <Route path="/dashboard/responses/:id" element={<ResponseDetail />}></Route>
            <Route path="/dashboard/responses/:surveyId/:responseId" element={<ResponseAnswers />}></Route>
          </Route>
          <Route path="/dashboard/settings" element={<SettingsView />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </Router>
  )
}

export default App
