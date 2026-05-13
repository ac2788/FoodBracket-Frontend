import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        try {
            const res = await axios.get('/api/watchlist', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWatchlist(res.data);
        } catch (err) {
            setError('Please log in to view your watchlist');
        }
    };

    const handleRemove = async (name) => {
        try {
            await axios.post('/api/watchlist/remove', { name }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWatchlist(watchlist.filter(f => f.name !== name));
        } catch (err) {
            setError('Failed to remove');
        }
    };

    return (
        <div className="search-container">
            <h2>❤️ My Watchlist</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {watchlist.length === 0 && <p>No foods saved yet! Search and save some foods.</p>}
            <div className="search-results">
                {watchlist.map((food, index) => (
                    <div key={index} className="meal-card">
                        <img src={food.thumbnail} alt={food.name} />
                        <h3>{food.name}</h3>
                        <p>{food.category}</p>
                        <button onClick={() => handleRemove(food.name)}
                            style={{ backgroundColor: '#e55a28' }}>
                            ❌ Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Watchlist;
