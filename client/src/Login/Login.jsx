import "../index.css";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Login() {
    const navigate = useNavigate()

    const formMessage = useRef(null)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    })

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Before POST request');
            formMessage.current.innerHTML = 'Sending login request...';

            const response = await axios.post('/api/user/login', formData, {
                timeout: 10000 // 10 seconds timeout
            });

            console.log('After POST request');

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
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
            <Header />
            <div id="login-area">
                <h1>Login</h1>
                <div ref={formMessage} className="form-message"></div>
                <div className="login-area-links"> <h2 style={{ paddingRight: '15px' }}>Login</h2> <Link to={`/register`}><h2>Register</h2></Link> </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
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