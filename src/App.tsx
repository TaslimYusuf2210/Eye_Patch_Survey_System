import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageLayout from './features/landingPage/layout/LandingPageLayout';
import LandingPage from './features/landingPage/pages/landingPage'
import Login from './features/auth/pages/login';
import SignUp from './features/auth/pages/signup';
import Dashboard from './features/dashboard/pages/dashboard';

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
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
