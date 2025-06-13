'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  FaSignOutAlt,
  FaCog,
  FaMoon,
  FaSun,
  FaImage,
  FaVideo,
  FaTimes,
} from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAnimeAvatar } from '@/hooks/useAnimeAvatar';
import { useBackgroundManager } from '@/hooks/useBackgroundManager';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { avatarUrl } = useAnimeAvatar(user?.uid);
  const { config, toggleMode, setAutoChange } = useBackgroundManager();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <header className="relative z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Study Timer
              </h1>
            </div>

            {/* User info and controls */}
            <div className="flex items-center gap-4">
              {/* Theme toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </motion.button>

              {/* Settings */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                title="Settings"
              >
                <FaCog />
              </motion.button>

              {/* User info */}
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <Image
                    src={avatarUrl}
                    alt="User Avatar"
                    fill
                    className="rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
                  />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {user?.displayName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Logout */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="p-2 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                title="Sign out"
              >
                <FaSignOutAlt />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 m-4 w-full max-w-md shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-6">
                {/* Background Mode */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                    Background Mode
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => config.mode !== 'image' && toggleMode()}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        config.mode === 'image'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      <FaImage />
                      Images
                    </button>
                    <button
                      onClick={() => config.mode !== 'video' && toggleMode()}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        config.mode === 'video'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      <FaVideo />
                      Videos
                    </button>
                  </div>
                </div>

                {/* Auto Change */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                      Auto Change Background
                    </h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.autoChange}
                        onChange={(e) => setAutoChange(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Change background every 5 minutes
                  </p>
                </div>

                {/* Theme */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                      Theme
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleTheme}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      {theme === 'light' ? <FaMoon /> : <FaSun />}
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;