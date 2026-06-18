import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import { useAppStore } from '../store/useAppStore';
import { RiSendPlaneFill, RiArrowLeftSLine, RiImageLine, RiMicLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

export default function ChatScreen() {
  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useAppStore();
  const { messages, sendMessage } = useChat(chatId!);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage({ text: text.trim() });
    setText('');
  };

  if (!chatId) return null;

  return (
    <div className="h-screen max-w-mobile mx-auto flex flex-col bg-secondary dark:bg-dark">
      {/* Header */}
      <div className="flex items-center p-4 pt-10 bg-white dark:bg-dark-light rounded-b-4xl shadow-sm space-x-3">
        <button onClick={() => navigate(-1)}>
          <RiArrowLeftSLine className="text-2xl" />
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
          {chatId.slice(0, 1)}
        </div>
        <div className="flex-1">
          <h2 className="font-semibold">Friend</h2>
          <span className="text-xs text-green-500">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-4xl ${
                msg.senderId === user?.uid
                  ? 'bg-accent text-white rounded-br-2xl'
                  : 'bg-white dark:bg-dark-light rounded-bl-2xl'
              }`}
            >
              {msg.image ? <img src={msg.image} className="rounded-xl mb-1" /> : null}
              <p>{msg.text}</p>
              <span className="text-[10px] opacity-70 text-right block mt-1">
                {msg.createdAt?.toDate?.()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.senderId === user?.uid && (
                  <span className="ml-1">{msg.status === 'seen' ? '👁' : '✓'}</span>
                )}
              </span>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white dark:bg-dark-light rounded-t-4xl shadow-lg flex items-center space-x-2">
        <button className="p-2"><RiImageLine className="text-2xl text-gray-500" /></button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message..."
          className="flex-1 p-3 rounded-4xl bg-secondary dark:bg-dark outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="p-2 bg-accent rounded-full text-white">
          <RiSendPlaneFill className="text-xl" />
        </button>
        <button className="p-2"><RiMicLine className="text-2xl text-gray-500" /></button>
      </div>
    </div>
  );
}