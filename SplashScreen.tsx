import { motion } from 'framer-motion';
import { RiChatSmile2Line } from 'react-icons/ri';

export default function SplashScreen() {
  return (
    <div className="h-screen w-full max-w-mobile mx-auto flex items-center justify-center bg-primary dark:bg-dark">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-full bg-accent dark:bg-white flex items-center justify-center mb-4">
          <RiChatSmile2Line className="text-5xl text-white dark:text-accent" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-accent dark:text-white"
        >
          MurgaRam Chat
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-500 mt-2"
        >
          Connect Faster. Chat Smarter.
        </motion.p>
      </motion.div>
    </div>
  );
}