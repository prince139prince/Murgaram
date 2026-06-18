import { motion } from 'framer-motion';
import { Message } from '../../hooks/useChat';

export default function ChatBubble({ message, isOwn }: { message: Message; isOwn: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div
        className={`max-w-[75%] p-3 rounded-4xl shadow-md ${
          isOwn
            ? 'bg-accent text-white rounded-br-2xl'
            : 'bg-white dark:bg-dark-light rounded-bl-2xl'
        }`}
      >
        {message.image && <img src={message.image} className="rounded-xl mb-1" />}
        {message.voice && (
          <audio controls src={message.voice} className="w-full" />
        )}
        <p>{message.text}</p>
        <span className="text-[10px] opacity-70 block text-right mt-1">
          {message.createdAt?.toDate?.()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          {isOwn && (
            <span className="ml-1">{message.status === 'seen' ? '👁' : '✓'}</span>
          )}
        </span>
      </div>
    </motion.div>
  );
}