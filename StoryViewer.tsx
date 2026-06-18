import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { viewStory } from '../../services/storyService';
import { useAppStore } from '../../store/useAppStore';

export default function StoryViewer({ stories, initialIndex, onClose }: any) {
  const { user } = useAppStore();
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    if (stories[current]) {
      viewStory(stories[current].id, user?.uid || '');
    }
  }, [current, stories, user]);

  const goNext = () => {
    if (current < stories.length - 1) setCurrent(current + 1);
    else onClose();
  };

  const story = stories[current];
  if (!story) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={goNext}
    >
      {story.type === 'video' ? (
        <video src={story.mediaUrl} className="max-h-full" autoPlay />
      ) : (
        <img src={story.mediaUrl} className="max-h-full object-contain" />
      )}
      <div className="absolute top-0 left-0 right-0 flex space-x-1 p-2">
        {stories.map((_: any, i: number) => (
          <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: i <= current ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>
      <button className="absolute top-5 right-5 text-white text-lg" onClick={onClose}>✕</button>
    </motion.div>
  );
}