import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I am FoodBot 🍔 Ask me anything about food!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/api/chat', {
                messages: newMessages.filter(m => m.role === 'user' || m.role === 'assistant')
            });
            const reply = response.data.content[0].text;
            setMessages([...newMessages, { role: 'assistant', content: reply }]);
        } catch (err) {
            setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I am having trouble connecting!' }]);
        }
        setLoading(false);
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            {open && (
                <div style={{
                    width: '300px', height: '400px', backgroundColor: 'white',
                    border: '2px solid #ff6b35', borderRadius: '12px',
                    display: 'flex', flexDirection: 'column', marginBottom: '10px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                    <div style={{
                        backgroundColor: '#ff6b35', color: 'white',
                        padding: '10px', borderRadius: '10px 10px 0 0',
                        fontWeight: 'bold'
                    }}>
                        🍔 FoodBot
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                        {messages.map((msg, i) => (
                            <div key={i} style={{
                                textAlign: msg.role === 'user' ? 'right' : 'left',
                                margin: '5px 0'
                            }}>
                                <span style={{
                                    backgroundColor: msg.role === 'user' ? '#ff6b35' : '#f0f0f0',
                                    color: msg.role === 'user' ? 'white' : 'black',
                                    padding: '8px 12px', borderRadius: '12px',
                                    display: 'inline-block', maxWidth: '80%',
                                    fontSize: '14px'
                                }}>
                                    {msg.content}
                                </span>
                            </div>
                        ))}
                        {loading && <p style={{ color: '#999', fontSize: '14px' }}>FoodBot is typing...</p>}
                    </div>
                    <div style={{ display: 'flex', padding: '10px', gap: '5px' }}>
                        <input
                            style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && sendMessage()}
                            placeholder="Ask about food..."
                        />
                        <button
                            onClick={sendMessage}
                            style={{
                                padding: '8px 12px', backgroundColor: '#ff6b35',
                                color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'
                            }}>
                            Send
                        </button>
                    </div>
                </div>
            )}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    backgroundColor: '#ff6b35', color: 'white', border: 'none',
                    fontSize: '28px', cursor: 'pointer', float: 'right',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                🍔
            </button>
        </div>
    );
}

export default Chatbot;
