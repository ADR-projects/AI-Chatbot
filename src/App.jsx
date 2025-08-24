import { useState } from 'react';
import ChatMsg from './chatmsg.jsx';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [showAbout, setShowAbout] = useState(false);
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSurpriseMe = () => {
    const surpriseMessages = [
      "Tell me a fun fact about space!",
      "What's the most interesting thing you know?",
      "Can you write me a short poem?",
      "What would you do if you were human for a day?",
      "Tell me about your favorite color and why",
      "What's the weirdest question someone has asked you?",
      "If you could travel anywhere, where would you go?",
      "What's your take on the meaning of life?",
    ];
    const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
    setMessage(randomMessage);
  };

  const getResponse = async () => {
    if (!message) {
      setError('Error! Please Ask a Question!');
      return;
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch('http://localhost:5000/gemini', options);
      const data = await response.text();
      console.log(data);

      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: 'user',
          parts: [{ text: message }],
        },
        {
          role: 'model',
          parts: [{ text: data }],
        },
      ]);
      setMessage('');
      setError('');
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="app">
      {/* About Button */}
      <button className="about-btn" onClick={() => setShowAbout(true)}>
        About
      </button>

      {/* Main Content */}
      <div className="main-content">
        <div className="chat-container">
          {/* GIF */}
          <div className="gif-container">
            <img
              src="public/mytea.gif"
              alt="coffee smoke"
              className="chat-gif"
            />
          </div>

          <h1 className="greeting">Hi</h1>
          <p className="question">What should we talk about?</p>

           {/* Chat History */}
          {chatHistory.length > 0 && <ChatMsg chatHistory={chatHistory} />}

          <div className="message-form">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind..."
              className="message-input"
            />
            {!error && (
              <button onClick={getResponse} type="submit" className="send-btn">
                Send
              </button>
            )}
            {error && <p>{error}</p>}

          </div>

          {/* Surprise Me button!! */}
          <button
            type="button"
            className="surprise-btn"
            onClick={handleSurpriseMe}
            disabled={!chatHistory}
          >
            Surprise Me!
          </button>
        </div>
      </div>

      {/* About Overlay */}
      {showAbout && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="window-title-bar">
              <div className="window-title">About This Chatbot</div>
              <div className="window-controls">
                <div className="window-control-btn close-control" onClick={() => setShowAbout(false)}>
                  ×
                </div>
              </div>
            </div>

            <div className="overlay-body">
              <p>-This ChatBot uses the Gemini 2.5 Flash model.</p>
              <p>
                -Developed by ADR<br />
                (Beluga Student Team)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
