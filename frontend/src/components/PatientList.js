import React, {useState, useEffect} from 'react'
import { Transition } from "@headlessui/react";
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { Link, useParams, useNavigate } from 'react-router-dom';
import useLogout from "../hooks/useLogout"


function PatientList() {
  const [isOpen, setIsOpen] = useState(false);
  const [datas, setDatas] = useState()
  const axiosPrivateInstance = useAxiosPrivate()
  const params = useParams()
  const [search, setSearch] = useState()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const logout = useLogout()

  async function getData() {
      try {
          const { data } = await axiosPrivateInstance.get('patient/list')
          setDatas(data)
          
      } catch (error) {
          console.log(error.response)
      }
  }

  async function Search(event) {
    

    try {
      const { data } = await axiosPrivateInstance.get(`patient/list?search=${search}`)
      setDatas(data)
      
  } catch (error) {
      console.log(error.response)
  }
        
    }

    async function Next(event) {
      event.preventDefault()
      setPage(page+1)
  
      try {
        const { data } = await axiosPrivateInstance.get(`patient/list?page=${page}`)
        setDatas(data)
        
    } catch (error) {
        console.log(error.response)
    }
          
      }
  
      async function Previous(event) {
        event.preventDefault()
        setPage(page-1)
    
        try {
          const { data } = await axiosPrivateInstance.get(`patient/list?page=${page}`)
          setDatas(data)
          
      } catch (error) {
          console.log(error.response)
      }
            
        }

        async function onLogout() {
          setLoading(true)
  
          await logout()
          navigate('/')
      }


  useEffect(() => {

    getData()
}, [])

  return (
    <div>
      <nav className="bg-gray-800 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a
                      
                      className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                      
                    >
                      <Link to={'/home'}>Home</Link>
                    </a>
  
                    <a
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <Link to={'/add-patient'}>Add Patient</Link>
                    </a>  
                    <a
                      onClick={onLogout}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout  
                    </a>
                  </div>
                </div>
                <div class="flex items-center border border-gray-700 rounded-xl mx-5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pt-0.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input class="ml-2 outline-none bg-transparent text-white" type="text" name="search" id="search" placeholder="Search..." onChange={(e)=>{setSearch(e.target.value)}} onKeyDown={(e) => { 
                        if (e.key === "Enter") { 
                            Search() 
                        } 
                    }} />
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
  
          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="md:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                      href="#"
                      className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <Link to={'/home'}>Home</Link>
                    </a>
  
                    <a
                      href="#"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      <Link to={'/add-patient'}>Add Patient</Link>
                    </a>  
  
                  <a
                    
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    onClick={onLogout}
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
          </Transition>
        </nav>
        <div class="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
  <div class="flex items-center justify-between pb-6">
    <div>
      <h2 class="font-semibold text-gray-700">Patients</h2>
      <span class="text-xs text-gray-500">View accounts of registered users</span>
    </div>
  </div>
  <div class="overflow-y-hidden rounded-lg border">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
            <th class="px-5 py-3">ID</th>
            <th class="px-5 py-3">Full Name</th>
            <th class="px-5 py-3">Email</th>
          </tr>
        </thead>
        <tbody class="text-gray-500">
          {
            datas?.map((data,index)=>{

          <Link to={`details/${data.id}`}>
            <tr key={index}>
              <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p class="whitespace-no-wrap">{data.id}</p>
              </td>
              <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <div class="flex items-center">
                  <div class="ml-3">
                    <p class="whitespace-no-wrap">{data.name}</p>
                  </div>
                </div>
              </td>
              <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                <p class="whitespace-no-wrap">{data.email}</p>
              </td>
            </tr>
          </Link>
            })
          }
          
        </tbody>
      </table>
    </div>
    <div class="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
      <div class="mt-2 inline-flex sm:mt-0">
        <button class="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100" onClick={Previous}>Prev</button>
        <button class="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default PatientList