import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND = '';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState(1); // 1 = login, 2 = enter code
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND}/api/login`, { username, password });
            localStorage.setItem('token', res.data.token);
            // Send MFA code
            await axios.post(`${BACKEND}/api/mfa/send-code`, { email });
            setStep(2);
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BACKEND}/api/mfa/verify-code`, { email, code });
            navigate('/');
        } catch (err) {
            setError('Invalid or expired code');
        }
    };

    if (step === 2) {
        return (
            <div className="login-container">
                <h2>Check your email</h2>
                <p>We sent a 6-digit code to {email}</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleVerify}>
                    <input type="text" placeholder="Enter 6-digit code" value={code}
                        onChange={e => setCode(e.target.value)} required />
                    <button type="submit">Verify</button>
                </form>
            </div>
        );
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username}
                    onChange={e => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" value={email}
                    onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password}
                    onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
}

export default Login;