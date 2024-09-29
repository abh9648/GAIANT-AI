// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample responses (this would ideally be powered by an NLP model)
const responses = {
    "how are you": "I'm here to listen. How are you feeling today?",
    "help": "I'm here for you. Can you tell me more about what's on your mind?",
    "goodbye": "It was nice chatting with you. Goodbye for now.",
};

app.post('/api/message', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    const response = responses[userMessage] || "I'm sorry, I didn't understand that.";
    res.json({ response });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
