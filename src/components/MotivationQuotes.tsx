'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaSyncAlt } from 'react-icons/fa';
import { useQuotes } from '@/hooks/useQuotes';

const MotivationQuotes: React.FC = () => {
  const { quote, loading, fetchRandomQuote } = useQuotes();

  // Keyboard shortcut for new quote
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'KeyQ' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        fetchRandomQuote();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [fetchRandomQuote]);

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaQuoteLeft className="text-2xl text-purple-500" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Daily Motivation
          </h2>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchRandomQuote}
          disabled={loading}
          className="p-2 rounded-full text-gray-500 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSyncAlt className={loading ? 'animate-spin' : ''} />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={quote.text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-200 font-medium leading-relaxed mb-4 italic">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          
          <cite className="text-gray-500 dark:text-gray-400 font-medium">
            — {quote.author}
          </cite>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchRandomQuote}
          disabled={loading}
          className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
        >
          <FaSyncAlt className={loading ? 'animate-spin' : ''} />
          {loading ? 'Loading...' : 'New Quote'}
        </motion.button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Q</kbd> for a new quote
        </p>
      </div>
    </div>
  );
};

export default MotivationQuotes;