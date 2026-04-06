import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage'
import Login from './pages/login';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className='px-4 md:px-8 lg:px-12'>
            <LandingPage></LandingPage>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
