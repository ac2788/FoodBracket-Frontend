import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bracket() {
    const [brackets, setBrackets] = useState([]);
    const [name, setName] = useState('');
    const [foods, setFoods] = useState('');
    const [selectedBracket, setSelectedBracket] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchBrackets();
    }, []);

    const fetchBrackets = async () => {
        try {
            const res = await axios.get('/api/brackets');
            setBrackets(res.data);
        } catch (err) {
            setError('Failed to load brackets');
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const foodList = foods.split(',').map(f => f.trim()).filter(f => f);
            if (foodList.length < 2) return setError('Enter at least 2 foods separated by commas');
            await axios.post('/api/brackets/create', {
                name,
                foods: foodList,
                createdBy: 'user'
            });
            setSuccess('Bracket created!');
            setName('');
            setFoods('');
            fetchBrackets();
        } catch (err) {
            setError('Failed to create bracket');
        }
    };

    const handleVote = async (bracketId, matchupIndex, vote) => {
    try {
        const token = localStorage.getItem('token');
        const userId = token ? JSON.parse(atob(token.split('.')[1])).id : 'anonymous';
        const res = await axios.post(`/api/brackets/${bracketId}/vote`, { matchupIndex, vote, userId });
        setSelectedBracket(res.data);
        fetchBrackets();
    } catch (err) {
        setError('You already voted on this matchup!');
    }
    };

    return (
        <div className="bracket-container">
            <h2>🏆 Food Brackets</h2>

            {token && (
                <div className="create-bracket">
                    <h3>Create New Bracket</h3>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <form onSubmit={handleCreate}>
                        <input type="text" placeholder="Bracket name" value={name}
                            onChange={e => setName(e.target.value)} required />
                        <input type="text" placeholder="Foods (comma separated): Pizza, Burger, Sushi"
                            value={foods} onChange={e => setFoods(e.target.value)} required />
                        <button type="submit">Create Bracket</button>
                    </form>
                </div>
            )}

            <div className="brackets-list">
                <h3>Active Brackets</h3>
                {brackets.map(bracket => (
                    <div key={bracket._id} className="bracket-card"
                        onClick={() => setSelectedBracket(bracket)}>
                        <h4>{bracket.name}</h4>
                        <p>{bracket.foods.length} foods | {bracket.matchups.length} matchups</p>
                        <p>Status: {bracket.status}</p>
                    </div>
                ))}
            </div>

            {selectedBracket && (
                <div className="bracket-matchups">
                    <h3>{selectedBracket.name} - Matchups</h3>
                    {selectedBracket.matchups.map((matchup, index) => (
                        <div key={index} className="matchup-card">
                            {matchup.winner ? (
                                <p>🏆 Winner: <strong>{matchup.winner}</strong></p>
                            ) : (
                                <div className="vote-buttons">
                                    <button onClick={() => handleVote(selectedBracket._id, index, 1)}>
                                        {matchup.food1} ({matchup.votes1})
                                    </button>
                                    <span>VS</span>
                                    <button onClick={() => handleVote(selectedBracket._id, index, 2)}>
                                        {matchup.food2} ({matchup.votes2})
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Bracket;
