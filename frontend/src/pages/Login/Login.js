import './Login.css'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { axiosInstance } from '../../axios'
import useAuth from '../../hooks/useAuth'


function Login() {

    const { setAccessToken, setCSRFToken } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const fromLocation = location?.state?.from?.pathname || '/'
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const { accessToken } = useAuth()

    function onUsernameChange(event) {
        setUsername(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    async function onSubmitForm(event) {
        event.preventDefault()

        setLoading(true)

        try {
            const response = await axiosInstance.post('auth/login', JSON.stringify({
                username,
                password
            }))

            console.log(response)

            setAccessToken(response?.data?.access_token)
            setCSRFToken(response.headers["x-csrftoken"])
            setUsername()
            setPassword()
            setLoading(false)

            navigate(fromLocation, { replace: true })
        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }
    useEffect(()=>{
        if(accessToken){
            navigate('/')
        }
    },[])

  return (
    <div className='outer'>
        <div className="container" id="container">
        <div className="form-container sign-in">
            <form onSubmit={onSubmitForm}>
                <h1>Sign In</h1>
                <span>use your username password</span>
                <input type="username" placeholder="Username" onChange={onUsernameChange}/>
                <input type="password" placeholder="Password" onChange={onPasswordChange}/>
                <button disabled={loading}>Sign In</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-right">
                    <h1>Welcome, Friend!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <Link to={'/signup'}>
                        <button id="register">Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login