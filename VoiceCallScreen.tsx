import { useParams, useNavigate } from 'react-router-dom';
import { RiPhoneLine, RiPhoneFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

export default function VoiceCallScreen() {
  const { uid } = useParams();
  const navigate = useNavigate();

  return (
    <div className="h-screen max-w-mobile mx-auto bg-gradient-to-b from-gray-800 to-black flex flex-col items-center justify-center text-white">
      <div className="w-24 h-24 rounded-full bg-gray-600 mb-6 flex items-center justify-center">
        <RiPhoneLine className="text-4xl" />
      </div>
      <h2 className="text-2xl font-bold mb-1">Calling...</h2>
      <p className="text-gray-400">{uid}</p>
      <div className="mt-10 flex space-x-10">
        <motion.button whileTap={{ scale: 0.9 }} className="p-4 bg-gray-700 rounded-full">
          <RiPhoneFill className="text-2xl" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-red-500 rounded-full"
          onClick={() => navigate(-1)}
        >
          <RiPhoneFill className="text-2xl" />
        </motion.button>
      </div>
    </div>
  );
}