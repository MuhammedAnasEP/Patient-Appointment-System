import './Signup.css'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../axios'

function Signup() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [username, setUsername] = useState()
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [passwordConfirmation, setPasswordConfirmation] = useState()

    function onEmailChange(event) {
        setEmail(event.target.value)
    }

    function onFirstnameChange(event) {
        setFirstname(event.target.value)
    }

    function onLastnameChange(event) {
        setLastname(event.target.value)
    }

    function onUsernameChange(event) {
        setUsername(event.target.value)
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    function onPasswordConfirmationChange(event) {
        setPasswordConfirmation(event.target.value)
    }

    async function onSubmitForm(event) {
        event.preventDefault()

        setLoading(true)

        try {
            const response = await axiosInstance.post('auth/register', JSON.stringify({
                first_name: firstname,
                last_name: lastname,
                username,
                email,
                password,
                password2: passwordConfirmation
            }))
            console.log("hi")
            setEmail()
            setPassword()
            setUsername()
            setPasswordConfirmation()
            setLoading(false)

            navigate('/auth/login')
    
        } catch (error) {
            setLoading(false)
            // TODO: handle errors
        }
    }


  return (
    <div className="container" id="container">
        <div className="form-container sign-up">
            <form onSubmit={onSubmitForm}>
                <h1>Create Account</h1>
                <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registeration</span>
                <input type="text" placeholder="FirstName" onChange={onFirstnameChange} />
                <input type="text" placeholder="LastName" onChange={onLastnameChange} />
                <input type="text" placeholder="Username" onChange={onUsernameChange} />
                <input type="email" placeholder="Email" onChange={onEmailChange} />
                <input type="password" placeholder="Password" onChange={onPasswordChange} />
                <input type="password" placeholder="Conirm Password" onChange={onPasswordConfirmationChange} />
                <button>Sign Up</button>
            </form>
        </div>

        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-right">
                    <h1>Welcome Back !</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <Link to={'/login'}>
                        <button id="login">Sign In</button>
                    </Link>
                </div>                
            </div>
        </div>
    </div>  
    )
}

export default Signup