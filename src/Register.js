import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND = '';
function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BACKEND}/api/register`, { username, email, password });
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Try a different username or email.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username}
                    onChange={e => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" value={email}
                    onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password}
                    onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
}

export default Register;
