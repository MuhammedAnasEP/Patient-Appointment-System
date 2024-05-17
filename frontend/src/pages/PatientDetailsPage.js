import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import PatientDetails from '../components/PatientDetails'
import Navbar from '../components/Navbar'

function PatientDetailsPage() {
  const params = useParams()
  const [id, setID] = useState(params.userId)

  return (
    <div>
        <Navbar />      
        <PatientDetails props={{id:id}}/>
    </div>
  )
}

export default PatientDetailsPage