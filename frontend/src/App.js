import './App.css';
import { Routes, Navigate, Route } from 'react-router-dom'
import AuthMiddleware from './middleware/Auth';
import PersistLogin from './components/PersistLogin';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home';
import PatientDetailsPage from './pages/PatientDetailsPage'
import AddPatient from './pages/AddPatient'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PersistLogin />}>
          
          <Route path='/' element={<AuthMiddleware />}>
            <Route index element={<Home />}></Route>
          </Route>
          <Route path='details/:userId' element={<AuthMiddleware />}>
            <Route index element={<PatientDetailsPage />}></Route>
          </Route>
          <Route path='add-patient' element={<AuthMiddleware />}>
            <Route index element={<AddPatient />}></Route>
          </Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='signup' element={<Signup />}></Route>
          
        </Route>
        <Route path='*' element={<Navigate to='/' />}></Route>
      </Routes>
    </>
  );
}

export default App;
