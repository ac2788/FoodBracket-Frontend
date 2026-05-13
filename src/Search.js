import React, { useState } from 'react';
import axios from 'axios';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const token = localStorage.getItem('token');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            if (res.data.meals) {
                setResults(res.data.meals);
                setError('');
            } else {
                setResults([]);
                setError('No foods found!');
            }
        } catch (err) {
            setError('Search failed. Try again.');
        }
    };

    const handleWatchlist = async (meal) => {
        try {
            await axios.post('/api/watchlist/add', {
                name: meal.strMeal,
                thumbnail: meal.strMealThumb,
                category: meal.strCategory
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess(`${meal.strMeal} added to watchlist!`);
        } catch (err) {
            setError('Already in watchlist or not logged in');
        }
    };

    return (
        <div className="search-container">
            <h2>🍔 Food Search</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a food..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div className="search-results">
                {results.map(meal => (
                    <div key={meal.idMeal} className="meal-card">
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                        <h3>{meal.strMeal}</h3>
                        <p>{meal.strCategory} | {meal.strArea}</p>
                        {token && (
                            <button onClick={() => handleWatchlist(meal)}>
                                ❤️ Save
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
