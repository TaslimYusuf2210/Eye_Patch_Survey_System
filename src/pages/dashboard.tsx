import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Analytic from './dashboard/Analytic';
import SurveyList from './dashboard/SurveyList';
import SurveyDetail from './dashboard/SurveyDetail';
import GlobalResponses from './dashboard/GlobalResponses';
import SurveyResponses from './dashboard/SurveyResponses';
import ParticipantList from './dashboard/ParticipantList';
import ParticipantDetail from './dashboard/ParticipantDetail';
import SettingsView from './dashboard/SettingsView';

const Dashboard = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<Analytic />} />
                <Route path="survey" element={<SurveyList />} />
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
