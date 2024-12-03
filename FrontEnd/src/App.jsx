import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoute from './routes/admin_route';
import StudentRoute from './routes/student_route'; // Make sure this is defined correctly
import AuthRoute from './routes/auth_route'; // Make sure this is defined correctly
import LandingPage from './Landing-Page/landing';
import ErrorPage from './errorpage';

import './App.css';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/*" element={<AuthRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/student/*" element={<StudentRoute />} />

      </Routes>
    </Router>
  );
}

export default App;