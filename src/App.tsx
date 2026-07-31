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
import GlobalParticipants from './features/dashboard/pages/GlobalParticipants';
import SettingsView from './features/dashboard/pages/SettingsView';
import { SurveyInformationStep } from './features/dashboard/components/CreateSurvey/SurveyInformationStep';
import { SectionsAndQuestionsStep } from './features/dashboard/components/CreateSurvey/SectionsAndQuestionsStep';
import { SurveyGoalStep } from './features/dashboard/components/CreateSurvey/SurveyGoalStep';
import { SettingsStep } from './features/dashboard/components/CreateSurvey/SettingsStep';
import { ReviewSummaryStep } from './features/dashboard/components/CreateSurvey/ReviewSummaryStep';
import { CreateSurveyProvider } from './contexts/CreateSurveyContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from './components/ui/sonner';
import Participants from './features/dashboard/pages/Participants';
import GlobalResponses from './features/dashboard/pages/GlobalResponses';
import Responses from './features/dashboard/pages/Responses';
import ResponseDetail from './features/dashboard/pages/ResponseDetail';
import ResponseAnswers from './features/dashboard/pages/ResponseAnswers';
import ParticipantDetail from './features/dashboard/pages/ParticipantDetail';
import SurveyResponsePage from './features/surveyResponse/SurveyResponsePage';


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
        <Route path="/dashboard/" element={
          <ThemeProvider>
            <DashboardLayout />
          </ThemeProvider>
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
          <Route path="/dashboard/surveys/:id/view" element={<SurveyView />} />
          <Route path="/dashboard/responses" element={<Responses />}>
            <Route index element={<GlobalResponses/>}></Route>
            <Route path="/dashboard/responses/:id" element={<ResponseDetail />}></Route>
            <Route path="/dashboard/responses/:surveyId/:responseId" element={<ResponseAnswers />}></Route>
          </Route>
          <Route path="/dashboard/participant" element={<Participants />}>
            <Route index element={<GlobalParticipants/>}></Route>
            <Route path="/dashboard/participant/:id" element={<ParticipantDetail />}></Route>
          </Route>
          <Route path="/dashboard/settings" element={<SettingsView />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </Router>
  )
}

export default App
