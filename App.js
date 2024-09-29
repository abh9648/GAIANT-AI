// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const sendMessage = async () => {
        if (message.trim()) {
            const userMessage = { message };
            setChat([...chat, { sender: 'user', text: message }]);
            setMessage('');

            try {
                const response = await axios.post('http://localhost:5000/api/message', userMessage);
                setChat([...chat, { sender: 'user', text: message }, { sender: 'bot', text: response.data.response }]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div className="App">
            <h1>Mental Health Chatbot</h1>
            <div className="chat-window">
                {chat.map((msg, index) => (
                    <div key={index} className={msg.sender}>
                        <strong>{msg.sender === 'user' ? 'You' : 'Bot'}: </strong>{msg.text}
                    </div>
                ))}
            </div>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null} 
                placeholder="Type a message..." 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
