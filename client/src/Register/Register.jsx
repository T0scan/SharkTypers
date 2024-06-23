import "../index.css";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

function Register() {

    const navigate = useNavigate()
    const formMessage = useRef(null)

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/user/register', formData);
            console.log(response.status); // Handle success response
            if (response.status === 200) {
                navigate('/login')
            }
        } catch (error) {
            console.error(error.response.data); // Handle error response
        }
    };

    return (
        <>
            <div id="login-area">
                <h1>Register</h1>
                <div ref={formMessage} className="form-message"></div>
                <div className="login-area-links"> <Link to={`/login`}><h2 style={{ paddingRight: '15px' }}>Login</h2></Link> <h2>Register</h2> </div>
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
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Register Account</button>
                </form>
            </div>
        </>
    )
}

export default Register