import styles from './Login.module.css'
// import styles from './Login.css';
import { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { LoggedInUserContext, AllUsersContext } from "../App"

const Login = () => {

    const history = useHistory()

    const { currentUser, setCurrentUser } = useContext(LoggedInUserContext)
    const { setAllUsers } = useContext(AllUsersContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const fetchUserBySessionData = (sessionData) => {
        fetch(`https://peaksync-back-end.onrender.com/users/${sessionData}`)
        .then((response) => response.json())
        .then((userData) => {
            setCurrentUser(userData)
            // fetchAllUsers(currentUser)
        })
    }

    useEffect(() => {
        // fetch('https://peaksync-back-end.onrender.com/check-session')
        // .then((response) => response.json())
        // .then((sessionData) => fetchUserBySessionData(sessionData))
        const userId = localStorage.getItem("user_id")
        if (userId) {
            fetch(`https://peaksync-back-end.onrender.com/users/${userId}`)
            .then((response) => response.json())
            .then((loggedInUserData) => setCurrentUser(loggedInUserData))
        }
    }, [])
    
    const handleUserLogin = (event) => {
        event.preventDefault()
        fetch("https://peaksync-back-end.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
        })
        .then((response) => response.json())
        .then((userData) => {
            setCurrentUser(userData)
            localStorage.setItem("user_id", userData.id)
        })
    }

    const handleLogout = () => {
        fetch('https://peaksync-back-end.onrender.com/logout', {
            method: 'DELETE'
        })
        localStorage.removeItem("user_id")
        setCurrentUser({})
        setAllUsers([])
        history.push({pathname:"/"})
    }

    return (
        <div className={styles.mainDiv}>
            {Object.keys(currentUser).length > 0 ?
            <div className='loggedInDiv'>
                <h1>Hi {currentUser.first_name}, thanks for logging in!</h1>
                <h3 className='loggedInH3'>To view or edit your profile information, <Link to="/profile">click here</Link>.</h3>
                <Button className='logoutButton' onClick={() => handleLogout()}>Logout</Button>
            </div>
            :
// <div class="w-users-userformpagewrap full-page-wrapper"><a href="/" class="form-page-logo-link w-inline-block"><img src="https://assets.website-files.com/62aee78456e4207786ac4d18/62b0f8678a35c23b4437f273_Memberbase%20White%20Logo.svg" loading="lazy" alt="Memberbase Logo" class="form-page-logo"></img></a><div class="w-users-userloginformwrapper admin-form-card">
//     <form data-wf-user-form-type="login" data-wf-user-form-redirect="/resources" method="post">
//         <div class="w-users-userformheader form-card-header">
//         <h2 class="heading h3">Log in</h2>
//         <p class="paragraph small">Fill in your log in details below.</p>
//         </div>
//         <input type="email" maxlength="256" placeholder="Your email" name="Email" id="wf-log-in-email" class="text-field w-input" required="" data-wf-user-form-input-type="email"></input>
//         <input type="password" maxlength="256" placeholder="Your password" name="Password" id="wf-log-in-password" class="text-field w-input" required="" data-wf-user-form-input-type="password"></input>
//         <input type="submit" value="Log In" data-wait="Please wait..." class="w-users-userformbutton button w-button"></input>
//                 <div class="w-users-userformfooter form-card-footer"><span>Don't have an account? </span><a href="/sign-up">Sign Up</a></div>
//     </form>
    // <div style={{display: 'none'}} data-wf-user-form-error="true" class="w-users-userformerrorstate form-error w-form-fail"><div class="user-form-error-msg" wf-login-form-general-error-error="We're having trouble logging you in. Please try again, or contact us if you continue to have problems." wf-login-form-invalid-email_or_password-error="Invalid email or password. Please try again.">We're having trouble logging you in. Please try again, or contact us if you continue to have problems.</div></div></div><a href="/reset-password" class="below-card-link">Forgot your password?</a></div>            // 
            <>
                <h1>Login Here:</h1>
                <div className={styles.loginDiv}>
                    <br></br>
                    <Form className={styles.loginForm} onSubmit={handleUserLogin}>
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            placeholder="address@email.com"
                            onChange={(event) => setEmail(event.target.value)}>
                        </Form.Control>
                        <br></br><br></br>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}>
                        </Form.Control>
                        <br></br><br></br>
                        <Button type="submit" style={{marginBottom:'1rem'}}>Login!</Button>
                    </Form>
                </div>
                <div>
                    <h3>Don't have an account yet?  Sign up for one here!</h3>
                    <br></br>
                    <Button onClick={() => history.push({pathname: "/signup"})}>Create Account</Button>
                    <br></br><br></br>
                </div>
            </>
            }
        </div>
    )
}

export default Login