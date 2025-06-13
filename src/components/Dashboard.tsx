'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import StudyTimer from './StudyTimer';
import Goals from './Goals';
import MotivationQuotes from './MotivationQuotes';
import BackgroundManager from './BackgroundManager';
import { useStudyTimer } from '@/contexts/StudyTimerContext';

const Dashboard: React.FC = () => {
  const { loading } = useStudyTimer();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading your study data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundManager />
      
      <div className="relative z-10">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Timer Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <StudyTimer />
            </motion.div>

            {/* Goals Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Goals />
            </motion.div>

            {/* Motivation Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <MotivationQuotes />
            </motion.div>
          </motion.div>

          {/* Keyboard Shortcuts Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Keyboard Shortcuts
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span>
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Space</kbd> Start/Pause
              </span>
              <span>
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">R</kbd> Reset Timer
              </span>
              <span>
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Q</kbd> New Quote
              </span>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;