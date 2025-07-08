import './App.css';

function ChatMsg({ chatHistory }) {
  return (
    <div className="chat-history">
      {chatHistory.map((chatItem, index) => (
        <div
          key={index}
          className={`chat-message ${chatItem.role === 'user' ? 'user-message' : 'bot-message'}`}
        >
          <div className="message-avatar">
            {chatItem.role === 'user' ? '👤' : '🤖'}
          </div>
          <div className="message-content">
            <div className="message-bubble">
              <p>{chatItem.parts[0]?.text}</p>
            </div>
            <div className="message-time">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMsg;