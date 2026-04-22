import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import Analytic from './Analytic';
import SurveyList from './SurveyList';
import SurveyDetail from './SurveyDetail';
import GlobalResponses from './GlobalResponses';
import SurveyResponses from './SurveyResponses';
import ParticipantList from './ParticipantList';
import ParticipantDetail from './ParticipantDetail';
import SettingsView from './SettingsView';
import CreateSurvey from './CreateSurvey';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<Analytic />} />
                <Route path="surveys" element={<SurveyList />} />
                <Route path="create-survey" element={<CreateSurvey />} />
                <Route path="survey/:id" element={<SurveyDetail />} />
                <Route path="survey/:id/responses" element={<SurveyResponses />} />
                <Route path="responses" element={<GlobalResponses />} />
                <Route path="participant" element={<ParticipantList />} />
                <Route path="participant/:id" element={<ParticipantDetail />} />
                <Route path="settings" element={<SettingsView />} />
            </Routes>
        </DashboardLayout>
    );
};

export default Dashboard;
