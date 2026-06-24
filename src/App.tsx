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
import SurveyResponses from './features/dashboard/pages/SurveyResponses';
import GlobalParticipants from './features/dashboard/pages/GlobalParticipants';
import SettingsView from './features/dashboard/pages/SettingsView';
import { SurveyInformationStep } from './features/dashboard/components/CreateSurvey/SurveyInformationStep';
import { SectionsAndQuestionsStep } from './features/dashboard/components/CreateSurvey/SectionsAndQuestionsStep';
import { SurveyGoalStep } from './features/dashboard/components/CreateSurvey/SurveyGoalStep';
import { SettingsStep } from './features/dashboard/components/CreateSurvey/SettingsStep';
import { ReviewSummaryStep } from './features/dashboard/components/CreateSurvey/ReviewSummaryStep';
import { CreateSurveyProvider } from './contexts/CreateSurveyContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import GlobalResponses from './features/dashboard/pages/GlobalResponses';


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
        <Route path="/dashboard/" element={
          <AuthProvider>
          <ThemeProvider>
            <DashboardLayout />
          </ThemeProvider>
          </AuthProvider>
        } >
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
          <Route path="/dashboard/responses" element={<GlobalResponses />} />
          <Route path="/dashboard/participant" element={<GlobalParticipants />} />
          <Route path="/dashboard/settings" element={<SettingsView />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </Router>
  )
}

export default App
