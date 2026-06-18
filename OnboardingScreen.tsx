import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RiChatSmile2Line, RiShieldCheckLine, RiGroupLine } from 'react-icons/ri';

const slides = [
  {
    icon: <RiChatSmile2Line className="text-6xl text-accent" />,
    title: 'Realtime Messaging',
    desc: 'Lightning fast chats with typing indicators and read receipts.',
  },
  {
    icon: <RiGroupLine className="text-6xl text-accent" />,
    title: 'Stories & Communities',
    desc: 'Share moments, join groups, and connect with friends.',
  },
  {
    icon: <RiShieldCheckLine className="text-6xl text-accent" />,
    title: 'Secure Connections',
    desc: 'End-to-end security with your unique MurgaRam ID.',
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (step < slides.length - 1) setStep(step + 1);
    else navigate('/login');
  };

  return (
    <div className="h-screen w-full max-w-mobile mx-auto bg-primary dark:bg-dark flex flex-col justify-center items-center p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex flex-col items-center text-center space-y-8"
        >
          <div className="w-32 h-32 rounded-full bg-secondary dark:bg-dark-light flex items-center justify-center neo-card">
            {slides[step].icon}
          </div>
          <h2 className="text-2xl font-bold text-accent dark:text-white">{slides[step].title}</h2>
          <p className="text-gray-500 max-w-xs">{slides[step].desc}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex space-x-2 my-6">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${i === step ? 'bg-accent' : 'bg-gray-300 dark:bg-gray-600'}`}
          />
        ))}
      </div>
      <button
        onClick={next}
        className="w-full py-4 bg-accent text-white rounded-4xl font-semibold text-lg shadow-lg active:scale-95 transition-transform"
      >
        {step === slides.length - 1 ? 'Get Started' : 'Next'}
      </button>
      <button onClick={() => navigate('/login')} className="mt-4 text-gray-500 underline">
        Skip
      </button>
    </div>
  );
}