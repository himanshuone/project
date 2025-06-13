'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';

// interface StudySession {
//   date: string;
//   totalTime: number;
//   sessions: number;
// }

interface Goal {
  type: 'daily' | 'weekly';
  target: number; // in minutes
  current: number; // in minutes
  period: string; // date string for daily, week string for weekly
}

interface StudyTimerContextType {
  // Timer state
  isRunning: boolean;
  elapsedTime: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  
  // Session data
  todayTime: number;
  totalTime: number;
  sessionsToday: number;
  streak: number;
  
  // Goals
  currentGoal: Goal | null;
  setGoal: (type: 'daily' | 'weekly', target: number) => void;
  goalProgress: number;
  
  // Loading state
  loading: boolean;
}

const StudyTimerContext = createContext<StudyTimerContextType>(
  {} as StudyTimerContextType
);

export const useStudyTimer = () => {
  const context = useContext(StudyTimerContext);
  if (!context) {
    throw new Error('useStudyTimer must be used within a StudyTimerProvider');
  }
  return context;
};

export const StudyTimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [todayTime, setTodayTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [sessionsToday, setSessionsToday] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0];
    if (!user) return;

    try {
      setLoading(true);

      // Load today's session
      const todayDoc = await getDoc(
        doc(db, 'users', user.uid, 'sessions', today)
      );
      if (todayDoc.exists()) {
        const data = todayDoc.data();
        setTodayTime(data.totalTime || 0);
        setSessionsToday(data.sessions || 0);
      }

      // Load user stats
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setTotalTime(data.totalTime || 0);
        setStreak(data.streak || 0);
        
        // Load current goal
        if (data.currentGoal) {
          setCurrentGoal(data.currentGoal);
        }
      }

      // Load active timer state
      const timerDoc = await getDoc(
        doc(db, 'users', user.uid, 'timer', 'active')
      );
      if (timerDoc.exists()) {
        const data = timerDoc.data();
        if (data.isRunning && data.startTime) {
          const elapsed = (Date.now() - data.startTime.toMillis()) / 1000;
          setElapsedTime(elapsed);
          setStartTime(data.startTime.toMillis());
          setIsRunning(true);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const saveTimerState = useCallback(async () => {
    if (!user || !isRunning) return;

    try {
      await setDoc(doc(db, 'users', user.uid, 'timer', 'active'), {
        isRunning,
        startTime: startTime ? new Date(startTime) : null,
        elapsedTime,
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error saving timer state:', error);
    }
  }, [user, isRunning, startTime, elapsedTime]);

  // Load user data from Firestore
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user, loadUserData]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        setElapsedTime((now - startTime) / 1000);
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTime]);

  // Auto-save timer state
  useEffect(() => {
    if (user && isRunning) {
      const interval = setInterval(() => {
        saveTimerState();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [user, isRunning, saveTimerState]);

  const startTimer = async () => {
    const now = Date.now();
    setStartTime(now);
    setIsRunning(true);

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'timer', 'active'), {
          isRunning: true,
          startTime: new Date(now),
          elapsedTime: 0,
          lastUpdated: serverTimestamp(),
        });
      } catch (error) {
        console.error('Error starting timer:', error);
      }
    }
  };

  const pauseTimer = async () => {
    const today = new Date().toISOString().split('T')[0];
    setIsRunning(false);

    if (user && elapsedTime > 0) {
      try {
        // Save session data
        const timeToAdd = Math.floor(elapsedTime);
        
        // Update today's session
        await setDoc(
          doc(db, 'users', user.uid, 'sessions', today),
          {
            totalTime: increment(timeToAdd),
            sessions: increment(1),
            date: today,
            lastUpdated: serverTimestamp(),
          },
          { merge: true }
        );

        // Update user stats
        await setDoc(
          doc(db, 'users', user.uid),
          {
            totalTime: increment(timeToAdd),
            lastStudyDate: today,
            lastUpdated: serverTimestamp(),
          },
          { merge: true }
        );

        // Update goal progress
        if (currentGoal) {
          const updatedGoal = {
            ...currentGoal,
            current: currentGoal.current + Math.floor(timeToAdd / 60),
          };
          setCurrentGoal(updatedGoal);
          
          await updateDoc(doc(db, 'users', user.uid), {
            currentGoal: updatedGoal,
          });
        }

        // Clear active timer
        await setDoc(doc(db, 'users', user.uid, 'timer', 'active'), {
          isRunning: false,
          startTime: null,
          elapsedTime: 0,
          lastUpdated: serverTimestamp(),
        });

        // Update local state
        setTodayTime((prev) => prev + timeToAdd);
        setTotalTime((prev) => prev + timeToAdd);
        setSessionsToday((prev) => prev + 1);
      } catch (error) {
        console.error('Error pausing timer:', error);
      }
    }
  };

  const resetTimer = async () => {
    setIsRunning(false);
    setElapsedTime(0);
    setStartTime(null);

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid, 'timer', 'active'), {
          isRunning: false,
          startTime: null,
          elapsedTime: 0,
          lastUpdated: serverTimestamp(),
        });
      } catch (error) {
        console.error('Error resetting timer:', error);
      }
    }
  };

  const setGoal = async (type: 'daily' | 'weekly', target: number) => {
    const today = new Date().toISOString().split('T')[0];
    const period = type === 'daily' ? today : getWeekString(new Date());
    const newGoal: Goal = {
      type,
      target,
      current: 0,
      period,
    };

    setCurrentGoal(newGoal);

    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          currentGoal: newGoal,
        });
      } catch (error) {
        console.error('Error setting goal:', error);
      }
    }
  };

  const getWeekString = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek.toISOString().split('T')[0];
  };

  const goalProgress = currentGoal
    ? Math.min((currentGoal.current / currentGoal.target) * 100, 100)
    : 0;

  const value = {
    isRunning,
    elapsedTime,
    startTimer,
    pauseTimer,
    resetTimer,
    todayTime,
    totalTime,
    sessionsToday,
    streak,
    currentGoal,
    setGoal,
    goalProgress,
    loading,
  };

  return (
    <StudyTimerContext.Provider value={value}>
      {children}
    </StudyTimerContext.Provider>
  );
};