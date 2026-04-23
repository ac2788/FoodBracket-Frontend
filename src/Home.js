import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

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