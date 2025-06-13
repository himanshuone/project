'use client';

import { useState, useEffect, useCallback } from 'react';

type BackgroundMode = 'image' | 'video';

interface BackgroundConfig {
  mode: BackgroundMode;
  autoChange: boolean;
  changeInterval: number; // in milliseconds
}

const backgroundImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
];

const backgroundVideos = [
  'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1',
  'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1',
  'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1',
];

export const useBackgroundManager = () => {
  const [config, setConfig] = useState<BackgroundConfig>({
    mode: 'image',
    autoChange: true,
    changeInterval: 300000, // 5 minutes
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Load config from localStorage
    const savedConfig = localStorage.getItem('backgroundConfig');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  useEffect(() => {
    // Save config to localStorage
    localStorage.setItem('backgroundConfig', JSON.stringify(config));
  }, [config]);

  const nextBackground = useCallback(() => {
    const maxIndex = config.mode === 'image' ? backgroundImages.length : backgroundVideos.length;
    setCurrentIndex((prev) => (prev + 1) % maxIndex);
  }, [config.mode]);

  useEffect(() => {
    if (!config.autoChange) return;

    const interval = setInterval(() => {
      nextBackground();
    }, config.changeInterval);

    return () => clearInterval(interval);
  }, [config.autoChange, config.changeInterval, nextBackground]);

  const getCurrentBackground = () => {
    if (config.mode === 'image') {
      return backgroundImages[currentIndex % backgroundImages.length];
    } else {
      return backgroundVideos[currentIndex % backgroundVideos.length];
    }
  };

  const prevBackground = () => {
    const maxIndex = config.mode === 'image' ? backgroundImages.length : backgroundVideos.length;
    setCurrentIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
  };

  const toggleMode = () => {
    setConfig((prev) => ({
      ...prev,
      mode: prev.mode === 'image' ? 'video' : 'image',
    }));
    setCurrentIndex(0);
  };

  const setAutoChange = (enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      autoChange: enabled,
    }));
  };

  const setChangeInterval = (interval: number) => {
    setConfig((prev) => ({
      ...prev,
      changeInterval: interval,
    }));
  };

  return {
    config,
    currentBackground: getCurrentBackground(),
    nextBackground,
    prevBackground,
    toggleMode,
    setAutoChange,
    setChangeInterval,
  };
};