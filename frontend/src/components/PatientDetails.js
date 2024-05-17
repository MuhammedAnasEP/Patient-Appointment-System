import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function PatientDetails({props}) {
    const axiosPrivateInstance = useAxiosPrivate()
    const [data, setData] = useState()
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function getPatient(id) {
        try {
            const { data } = await axiosPrivateInstance.get(`patient/details/${id}`)
            setData(data)
            
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {

        getPatient(props.id)
    }, [])

    async function onSubmitForm(event) {
        event.preventDefault()
    
        setLoading(true)
    
        try {
            const response = await useAxiosPrivate.post(`patient/book-appoinntment/${props.id}`, JSON.stringify({
                
                date,
                time
                
            }))
            setDate()
            setTime()
            setLoading(false)
    
            navigate('/home')
    
        } catch (error) {
            setLoading(false)
    
            }
            
        }
    

  return (
    <div>
        <section id="contact" class="relative w-full min-h-screen bg-black text-red-500">
        <h1 class="text-4xl p-4 font-bold tracking-wide">
            Details
        </h1>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-800 h-32 w-full"></div>


        <div class="relative p-5 lg:px-20 flex flex-col md:flex-row items-center justify-center">

        
            <div class="w-full md:w-1/2 p-5 md:px-0 mx-5">
            <div class="bg-gray-900 border border-red-500 w-full lg:w-1/2 h-full p-5 pt-8">
                <h3 class="text-2xl font-semibold mb-5">
                Patient Details
                </h3>
                <div class="flex flex-col gap-3">
                <a href="#" class="flex items-center hover:text-white hover:bg-red-500 p-2">
                    {data.name}
                </a>
                <a href="#" class="flex items-center hover:text-white hover:bg-red-500 p-2">
                    {data.email}
                </a>
                <a href="#" class="flex items-center hover:text-white hover:bg-red-500 p-2">
                    {data.phone}
                </a>
                <a href="#" class="flex items-center hover:text-white hover:bg-red-500 p-2">
                    {data.address}
                </a>
                </div>
            </div>
            </div>

            
            <form onSubmit={onSubmitForm} class="w-full md:w-1/2 border border-red-500 p-6 bg-gray-900">
            <h2 class="text-2xl pb-3 font-semibold">
                Book Appointment
            </h2>
            <div>
                <div class="flex flex-col mb-3">
                <label for="date">date</label>
                <input 
                    type="date" id="date" 
                    class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-red-500"
                    autocomplete="off"
                    onChange={(e)=>{setDate(e.target.value);}}
                />
                </div>
                <div class="flex flex-col mb-3">
                <label for="time">Time</label>
                <input 
                    type="time" id="time" 
                    class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-red-500 focus:outline-none focus:bg-gray-800 focus:text-red-500"
                    autocomplete="off"
                    onChange={(e)=>{setTime(e.target.value);}}
                />
                </div>
                
            </div>
            <div class="w-full pt-3">
                <button type="submit" class="w-full bg-gray-900 border border-red-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-red-500 hover:text-white text-xl cursor-pointer">
                Send
                </button>
            </div>
            </form>
        </div>
        </section>
    </div>
  )
}

export default PatientDetails