'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaBook, FaClock, FaBullseye } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

const LoginScreen: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  const features = [
    {
      icon: <FaClock className="text-3xl" />,
      title: 'Track Study Time',
      description: 'Monitor your study sessions with a persistent timer',
    },
    {
      icon: <FaBullseye className="text-3xl" />,
      title: 'Set Goals',
      description: 'Create daily or weekly study targets and track progress',
    },
    {
      icon: <FaBook className="text-3xl" />,
      title: 'Stay Motivated',
      description: 'Get inspired with daily motivational quotes',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl font-bold text-gray-800 dark:text-white mb-4"
          >
            Study Timer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Focus, track, and achieve your learning goals
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center"
            >
              <div className="text-blue-500 dark:text-blue-400 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center max-w-md mx-auto"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
            Get Started
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sign in with Google to start tracking your study sessions
          </p>
          
          <button
            onClick={signInWithGoogle}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-6 py-3 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
          >
            <FaGoogle className="text-red-500" />
            Sign in with Google
          </button>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <strong>Note:</strong> Make sure to configure your Firebase credentials 
              in the environment variables for Google Sign-In to work properly.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;