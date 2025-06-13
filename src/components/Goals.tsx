'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { useStudyTimer } from '@/contexts/StudyTimerContext';
import { minutesToHours } from '@/utils/time';

const Goals: React.FC = () => {
  const { currentGoal, setGoal, goalProgress } = useStudyTimer();
  const [isEditing, setIsEditing] = useState(false);
  const [goalType, setGoalType] = useState<'daily' | 'weekly'>('daily');
  const [goalTarget, setGoalTarget] = useState(30); // in minutes

  const handleSetGoal = () => {
    setGoal(goalType, goalTarget);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (currentGoal) {
      setGoalType(currentGoal.type);
      setGoalTarget(currentGoal.target);
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaBullseye className="text-2xl text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Study Goal
          </h2>
        </div>
        
        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsEditing(true);
              if (currentGoal) {
                setGoalType(currentGoal.type);
                setGoalTarget(currentGoal.target);
              }
            }}
            className="p-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
          >
            <FaEdit />
          </motion.button>
        )}
      </div>

      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Goal Type
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setGoalType('daily')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  goalType === 'daily'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setGoalType('weekly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  goalType === 'weekly'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target ({goalType} goal in minutes)
            </label>
            <input
              type="number"
              value={goalTarget}
              onChange={(e) => setGoalTarget(Number(e.target.value))}
              min="1"
              max={goalType === 'daily' ? 1440 : 10080}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {minutesToHours(goalTarget)}
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSetGoal}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <FaCheck />
              Save Goal
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <FaTimes />
              Cancel
            </motion.button>
          </div>
        </motion.div>
      ) : currentGoal ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                {currentGoal.type.charAt(0).toUpperCase() + currentGoal.type.slice(1)} Goal
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {minutesToHours(currentGoal.current)} / {minutesToHours(currentGoal.target)}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${
                goalProgress >= 100 ? 'text-green-500' : 'text-blue-500'
              }`}>
                {Math.round(goalProgress)}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Complete
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(goalProgress, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-3 rounded-full ${getProgressColor(goalProgress)}`}
            />
          </div>

          {goalProgress >= 100 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center"
            >
              <h4 className="text-green-800 dark:text-green-200 font-semibold mb-1">
                🎉 Goal Achieved!
              </h4>
              <p className="text-green-600 dark:text-green-300 text-sm">
                Congratulations on reaching your {currentGoal.type} study goal!
              </p>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <FaBullseye className="text-4xl mx-auto mb-2" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            No study goal set yet
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Set Your First Goal
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Goals;