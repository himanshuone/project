'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useBackgroundManager } from '@/hooks/useBackgroundManager';

const BackgroundManager: React.FC = () => {
  const { config, currentBackground } = useBackgroundManager();

  return (
    <div className="fixed inset-0 -z-10">
      {config.mode === 'image' ? (
        <motion.div
          key={currentBackground}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${currentBackground})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
        </motion.div>
      ) : (
        <motion.div
          key={currentBackground}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <iframe
            src={currentBackground}
            title="Background Video"
            className="w-full h-full object-cover"
            style={{
              minWidth: '100%',
              minHeight: '100%',
              transform: 'scale(1.1)',
            }}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        </motion.div>
      )}
    </div>
  );
};

export default BackgroundManager;