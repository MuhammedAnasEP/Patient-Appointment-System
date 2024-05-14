import './App.css';
import AddPatientForm from './components/AddPatientForm';
import Navbar from './components/Navbar';
import PatientDetails from './components/PatientDetails';
import PatientList from './components/PatientList';

function App() {
  return (
    <>
      <Navbar />
      {/* <AddPatientForm></AddPatientForm> */}
      {/* <PatientDetails /> */}
      <PatientList />
    </>
  );
}

export default App;
