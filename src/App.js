import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Search from './Search';
import Bracket from './Bracket';
import Watchlist from './Watchlist';
import Stats from './Stats';
import Chatbot from './Chatbot';
import React from 'react';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <header className="App-header">
                <h1>FoodBracket</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/search">Search</Link>
                    <Link to="/bracket">Bracket</Link>
                    <Link to="/watchlist">Watchlist</Link>
                    <Link to="/stats">Stats</Link>
                </nav>
            </header>
            <Chatbot />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
                <Route path="/bracket" element={<Bracket />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/stats" element={<Stats />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
