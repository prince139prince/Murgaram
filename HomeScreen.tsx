import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { getActiveStories } from '../services/storyService';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { RiAddFill, RiChatSmile2Line, RiSettings4Line, RiUser3Line } from 'react-icons/ri';

export default function HomeScreen() {
  const { user } = useAppStore();
  const [stories, setStories] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const unsubStories = getActiveStories(setStories);
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', user.uid), orderBy('createdAt', 'desc'));
    const unsubChats = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setChats(list);
    });
    return () => {
      unsubStories();
      unsubChats();
    };
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen max-w-mobile mx-auto bg-secondary dark:bg-dark relative pb-16">
      {/* Header */}
      <div className="p-5 pt-10 bg-white dark:bg-dark-light rounded-b-5xl shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-accent dark:text-white">MurgaRam Chat</h1>
          <Link to="/settings">
            <RiSettings4Line className="text-2xl text-accent dark:text-white" />
          </Link>
        </div>
      </div>

      {/* Stories */}
      <div className="px-5 py-3 overflow-x-auto no-scrollbar flex space-x-4">
        <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center min-w-[70px]">
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center story-ring">
            <RiAddFill className="text-2xl text-white" />
          </div>
          <span className="text-xs mt-1">Your Story</span>
        </motion.div>
        {stories.map((story) => (
          <motion.div
            key={story.id}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center min-w-[70px]"
            onClick={() => navigate(`/chat/${story.uid}`)}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5">
              <img
                src={story.mediaUrl}
                alt="story"
                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-dark"
              />
            </div>
            <span className="text-xs mt-1 truncate w-16 text-center">{story.uid.slice(0, 6)}</span>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="px-5 mb-3">
        <div className="w-full p-4 rounded-4xl neo-card bg-white dark:bg-dark-light">
          <input
            placeholder="Search by MurgaRam ID or username..."
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Recent Chats */}
      <div className="px-5 space-y-2 mb-20">
        {chats.map((chat) => {
          const otherUid = chat.participants.find((p: string) => p !== user.uid);
          return (
            <Link key={chat.id} to={`/chat/${chat.id}`}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-3 p-4 rounded-4xl bg-white dark:bg-dark-light shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                  {otherUid?.slice(0, 1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <span className="font-medium truncate">{otherUid}</span>
                    <span className="text-xs text-gray-400">12:45</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage?.text || 'No messages yet'}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-accent text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Floating Action Button & Bottom Nav */}
      <div className="fixed bottom-6 left-0 right-0 max-w-mobile mx-auto px-5 flex justify-between">
        <nav className="bg-white dark:bg-dark-light neo-card rounded-full flex justify-around w-full py-2 shadow-lg">
          <Link to="/" className="flex flex-col items-center text-accent">
            <RiChatSmile2Line className="text-2xl" />
            <span className="text-xs">Chats</span>
          </Link>
          <Link to="/contacts" className="flex flex-col items-center text-gray-500">
            <RiUser3Line className="text-2xl" />
            <span className="text-xs">Contacts</span>
          </Link>
          <button
            onClick={() => navigate('/group')}
            className="w-14 h-14 -mt-6 bg-accent rounded-full flex items-center justify-center text-white shadow-xl"
          >
            <RiAddFill className="text-3xl" />
          </button>
        </nav>
      </div>
    </div>
  );
}