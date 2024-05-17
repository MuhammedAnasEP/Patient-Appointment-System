import React, {useState} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";


export default function AddPatientForm() {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [diseas, setDiseas] = useState()
  const [phone, setPhone] = useState()
  const [loading, setLoading] = useState()
  const navigate = useNavigate()

  async function onSubmitForm(event) {
    event.preventDefault()

    setLoading(true)

    try {
        const response = await useAxiosPrivate.post('patient/add-patient', JSON.stringify({
            name,
            email,
            diseas,
            phone
        }))
        setDiseas()
        setName()
        setEmail()
        setPhone()
        setLoading(false)

        navigate('/home')

    } catch (error) {
        setLoading(false)

        }
        
    }


  return (
    <>
      <section
        id="contact"
        class="relative w-full min-h-screen text-blue-500"
      >
        <h1 class="text-4xl p-4 font-bold tracking-wide">Add Patient</h1>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-800 h-32 w-full"></div>

        <div class="relative p-5 lg:px-20 flex flex-col md:flex-row items-center justify-center">
          <form onSubmit={onSubmitForm} class="w-full md:w-1/2 border border-blue-500 p-6 bg-gray-900">
            <h2 class="text-2xl pb-3 font-semibold">
              Enter details of new patient
            </h2>
            <div>
              <div class="flex flex-col mb-3">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-blue-500 focus:outline-none focus:bg-gray-800 focus:text-blue-500"
                  autocomplete="off"
                  onChange={(e)=>{setName(e.target.value);}}
                  required
                />
              </div>
              <div class="flex flex-col mb-3">
                <label for="email">Email</label>
                <input
                  type="text"
                  id="email"
                  class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-blue-500 focus:outline-none focus:bg-gray-800 focus:text-blue-500"
                  autocomplete="off"
                  onChange={(e)=>{setEmail(e.target.value);}}
                  required
                />
              </div>
              <div class="flex flex-col mb-3">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-blue-500 focus:outline-none focus:bg-gray-800 focus:text-blue-500"
                  autocomplete="off"
                  onChange={(e)=>{setPhone(e.target.value);}}
                  required
                />
              </div>
              <div class="flex flex-col mb-3">
                <label for="diseas">Diseas</label>
                <input
                  type="text"
                  id="diseas"
                  class="px-3 py-2 bg-gray-800 border border-gray-900 focus:border-blue-500 focus:outline-none focus:bg-gray-800 focus:text-blue-500"
                  autocomplete="off"
                  onChange={(e)=>{setDiseas(e.target.value);}}
                  required
                />
              </div>
            </div>
            <div class="w-full pt-3">
              <button
                type="submit"
                class="w-full bg-gray-900 border border-blue-500 px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-blue-500 hover:text-white text-xl cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
