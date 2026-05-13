import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stats() {
    const [stats, setStats] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get('/api/stats');
            setStats(res.data);
        } catch (err) {
            setError('Failed to load stats');
        }
    };

    return (
        <div className="search-container">
            <h2>📊 Win/Loss Records</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {stats.length === 0 && <p>No stats yet! Vote in brackets to see records.</p>}
            <table style={{ margin: '20px auto', borderCollapse: 'collapse', width: '60%' }}>
                <thead>
                    <tr style={{ backgroundColor: '#ff6b35', color: 'white' }}>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>🍔 Food</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>✅ Wins</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>❌ Losses</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>📈 Win Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((s, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{s.foodName}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc', color: 'green' }}>{s.wins}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc', color: 'red' }}>{s.losses}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                                {s.wins + s.losses > 0 
                                    ? Math.round((s.wins / (s.wins + s.losses)) * 100) + '%'
                                    : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Stats;
