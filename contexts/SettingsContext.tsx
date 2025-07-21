import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import SplashScreen from '@/components/SplashScreen';

interface UserProfile {
  name: string;
  nameEn: string;
  email: string;
  phone: string;
  address: string;
}

interface SettingsContextType {
  // Settings
  notifications: boolean;
  darkMode: boolean;
  largeText: boolean;
  soundEnabled: boolean;
  
  // User Profile
  userProfile: UserProfile;
  
  // Actions
  setNotifications: (value: boolean) => void;
  setDarkMode: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
  setSoundEnabled: (value: boolean) => void;
  setUserProfile: (profile: UserProfile) => void;
  
  // Utility
  getTextSize: (baseSize: number) => number;
  getColors: () => any;
  playSound: () => void;
}

const defaultProfile: UserProfile = {
  name: 'राम कुमार शर्मा',
  nameEn: 'Ram Kumar Sharma',
  email: 'ram.sharma@example.com',
  phone: '+91 98765 43210',
  address: 'नई दिल्ली, भारत'
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotificationsState] = useState(true);
  const [darkMode, setDarkModeState] = useState(false);
  const [largeText, setLargeTextState] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [userProfile, setUserProfileState] = useState<UserProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings on app start
  useEffect(() => {
    loadSettings();
  }, []);

  // Apply system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!darkMode) {
        // Only auto-switch if user hasn't manually set dark mode
        // This is just for demonstration - you can remove this if not needed
      }
    });

    return () => subscription?.remove();
  }, [darkMode]);

  const loadSettings = async () => {
    try {
      // Simulate loading time for splash screen
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const [savedSettings, savedProfile] = await Promise.all([
        AsyncStorage.getItem('userSettings'),
        AsyncStorage.getItem('userProfile')
      ]);
      
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setNotificationsState(settings.notifications ?? true);
        setDarkModeState(settings.darkMode ?? false);
        setLargeTextState(settings.largeText ?? false);
        setSoundEnabledState(settings.soundEnabled ?? true);
      }
      
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setUserProfileState(profile);
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: any) => {
    try {
      await AsyncStorage.setItem('userSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.log('Error saving settings:', error);
    }
  };

  const saveProfile = async (profile: UserProfile) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };

  const setNotifications = async (value: boolean) => {
    setNotificationsState(value);
    const newSettings = { notifications: value, darkMode, largeText, soundEnabled };
    await saveSettings(newSettings);
  };

  const setDarkMode = async (value: boolean) => {
    setDarkModeState(value);
    const newSettings = { notifications, darkMode: value, largeText, soundEnabled };
    await saveSettings(newSettings);
  };

  const setLargeText = async (value: boolean) => {
    setLargeTextState(value);
    const newSettings = { notifications, darkMode, largeText: value, soundEnabled };
    await saveSettings(newSettings);
  };

  const setSoundEnabled = async (value: boolean) => {
    setSoundEnabledState(value);
    const newSettings = { notifications, darkMode, largeText, soundEnabled: value };
    await saveSettings(newSettings);
  };

  const setUserProfile = async (profile: UserProfile) => {
    setUserProfileState(profile);
    await saveProfile(profile);
  };

  const getTextSize = (baseSize: number): number => {
    return largeText ? baseSize * 1.2 : baseSize;
  };

  const getColors = () => {
    if (darkMode) {
      return {
        background: '#1F2937',
        surface: '#374151',
        card: '#4B5563',
        text: '#F9FAFB',
        textSecondary: '#D1D5DB',
        textTertiary: '#9CA3AF',
        border: '#6B7280',
        primary: '#FF6B35',
        primaryLight: '#FF8A50',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
      };
    } else {
      return {
        background: '#FAFAFA',
        surface: '#FFFFFF',
        card: '#FFFFFF',
        text: '#1F2937',
        textSecondary: '#6B7280',
        textTertiary: '#9CA3AF',
        border: '#E5E7EB',
        primary: '#FF6B35',
        primaryLight: '#FF8A50',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6'
      };
    }
  };

  const playSound = () => {
    if (soundEnabled) {
      // In a real app, you would play actual sounds here
      // For now, we'll just log or use haptic feedback
      console.log('Playing sound...');
      
      // You could use expo-av for actual sound playback:
      // import { Audio } from 'expo-av';
      // Audio.Sound.createAsync(require('../assets/sounds/click.mp3')).then(({ sound }) => {
      //   sound.playAsync();
      // });
    }
  };

  const value: SettingsContextType = {
    notifications,
    darkMode,
    largeText,
    soundEnabled,
    userProfile,
    setNotifications,
    setDarkMode,
    setLargeText,
    setSoundEnabled,
    setUserProfile,
    getTextSize,
    getColors,
    playSound
  };

  // Show splash screen while loading
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};