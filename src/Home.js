import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Confetti effect on load
        const colors = ['#ff6b35', '#ff9f1c', '#ffbf69', '#cbf3f0', '#2ec4b6'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '999';
            confetti.style.transition = `top ${Math.random() * 3 + 2}s ease, opacity 3s ease`;
            document.body.appendChild(confetti);
            setTimeout(() => {
                confetti.style.top = '100vh';
                confetti.style.opacity = '0';
            }, 100);
            setTimeout(() => confetti.remove(), 5000);
        }
    }, []);

    const playSound = () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.setValueAtTime(523, ctx.currentTime);
        oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.5);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (token) {
        return (
            <div className="home-container">
                <h2>Welcome back! 🍔</h2>
                <p>You are logged in. The bracket is coming soon!</p>
                <div className="home-buttons">
                    <button onClick={() => { playSound(); navigate('/search'); }}>Search Foods 🔍</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <h2>Welcome to FoodBracket 🍔</h2>
            <p>The ultimate food showdown. Vote for your favorite foods and see what comes out on top!</p>
            <div className="home-buttons">
                <button onClick={() => { playSound(); navigate('/register'); }}>Get Started</button>
                <button onClick={() => { playSound(); navigate('/login'); }}>Log In</button>
            </div>
        </div>
    );
}

export default Home;
