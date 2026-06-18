import { motion } from 'framer-motion';
import { RiAddFill } from 'react-icons/ri';

export default function FloatingAction({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-24 right-4 w-14 h-14 bg-accent rounded-full flex items-center justify-center text-white shadow-xl z-50"
    >
      <RiAddFill className="text-3xl" />
    </motion.button>
  );
}