import Login from './Login';
import Register from './Register';
import React from 'react';
import './App.css';

function APP() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>FoodBracket - The Ultimate Food Tournament App</h1>
                <nav>
                    <button>Trending Brackets</button>
                    <button>My Brackets</button>
                </nav>
            </header>
            
            <main>
                <h3>Featured Matchups</h3>
                <div className="bracket-card">
                    <p>Pizza vs. Tacos</p>
                    <button>Vote Now</button>
                </div>

                {/* Adding these so your imports are actually used */}
                <div className="auth-section">
                    <Login />
                    <Register />
                </div>
            </main>
        </div>
    );
}

export default APP;