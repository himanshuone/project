'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import { useStudyTimer } from '@/contexts/StudyTimerContext';
import { formatTime } from '@/utils/time';

const StudyTimer: React.FC = () => {
  const {
    isRunning,
    elapsedTime,
    startTimer,
    pauseTimer,
    resetTimer,
    todayTime,
    totalTime,
    sessionsToday,
  } = useStudyTimer();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (isRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      } else if (event.code === 'KeyR' && !isRunning) {
        event.preventDefault();
        resetTimer();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, startTimer, pauseTimer, resetTimer]);

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <motion.div
          key={elapsedTime}
          initial={{ scale: 1 }}
          animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
          transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
          className="text-6xl md:text-8xl font-mono font-bold text-gray-800 dark:text-white mb-4"
        >
          {formatTime(elapsedTime)}
        </motion.div>
        
        <div className="flex justify-center gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRunning ? pauseTimer : startTimer}
            className={`px-8 py-4 rounded-full font-semibold text-white transition-colors duration-200 flex items-center gap-3 ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isRunning ? <FaPause /> : <FaPlay />}
            {isRunning ? 'Pause' : 'Start'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetTimer}
            disabled={isRunning}
            className="px-8 py-4 rounded-full font-semibold text-white bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-3"
          >
            <FaStop />
            Reset
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatTime(todayTime)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Today&apos;s Study Time
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {sessionsToday}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Sessions Today
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatTime(totalTime)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Total Study Time
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Use <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Space</kbd> to start/pause, 
          <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs ml-2">R</kbd> to reset
        </p>
      </div>
    </div>
  );
};

export default StudyTimer;