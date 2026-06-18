import { useParams, useNavigate } from 'react-router-dom';
import { RiCameraLine, RiCameraOffLine, RiPhoneFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

export default function VideoCallScreen() {
  const { uid } = useParams();
  const navigate = useNavigate();

  return (
    <div className="h-screen max-w-mobile mx-auto bg-black relative flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
          <RiCameraLine className="text-4xl text-white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center space-x-8 bg-gradient-to-t from-black/80 pb-10">
        <motion.button whileTap={{ scale: 0.9 }} className="p-4 bg-gray-700 rounded-full">
          <RiCameraOffLine className="text-2xl text-white" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-red-500 rounded-full"
          onClick={() => navigate(-1)}
        >
          <RiPhoneFill className="text-2xl text-white" />
        </motion.button>
      </div>
    </div>
  );
}