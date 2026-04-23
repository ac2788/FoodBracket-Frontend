import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (token) {
        return (
            <div className="home-container">
                <h2>Welcome back! 🍔</h2>
                <p>You are logged in. The bracket is coming soon!</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div className="home-container">
            <h2>Welcome to FoodBracket 🍔</h2>
            <p>The ultimate food showdown. Vote for your favorite foods and see what comes out on top!</p>
            <div className="home-buttons">
                <button onClick={() => navigate('/register')}>Get Started</button>
                <button onClick={() => navigate('/login')}>Log In</button>
            </div>
        </div>
    );
}

export default Home;
