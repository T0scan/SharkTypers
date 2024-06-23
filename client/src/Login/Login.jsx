import "../index.css";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext, useRef, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";

function Login() {
    const userData = useContext(UserContext)
    const navigate = useNavigate()

    const formMessage = useRef(null)
    const usernameField = useRef(null)
    const passwordField = useRef(null)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = usernameField.current.value
        const password = passwordField.current.value

        try {
            console.log('Before POST request');
            formMessage.current.innerHTML = 'Sending login request...';

            const response = await axios.post('/api/user/login', { username: username, password: password }, {
                timeout: 10000 // 10 seconds timeout
            });

            console.log('After POST request');

            if (response.status === 200) {
                const token = response.data.token;
                userData.hasCookie(true);
                userData.setUsername(username)
                userData.username = userData.setUsername
                document.cookie = "token="+`${token}`+'; Samesite=Lax; Secure';
                navigate('/');
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else if (error.code === 'ECONNABORTED') {
                console.log('Request timeout:', error.message);
                formMessage.current.innerHTML = 'Request timeout. Please try again.';
            } else {
                console.error('Error:', error.response.data); // Handle other error responses
                formMessage.current.innerHTML = 'Login failed. Please try again.';
            }
        }
    };

    return (
        <>
            <div id="login-area">
                <h1>Login</h1>
                <div ref={formMessage} className="form-message"></div>
                <div className="login-area-links"> <h2 style={{ paddingRight: '15px' }}>Login</h2> <Link to={`/register`}><h2>Register</h2></Link> </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            ref={usernameField}
                            type="text"
                            name="username"
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            ref={passwordField}
                            type="password"
                            name="password"
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login