import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useSettings } from '@/contexts/SettingsContext';

export function useNotifications() {
  const { notifications, soundEnabled, playSound } = useSettings();

  const showNotification = (title: string, message: string, playNotificationSound = true) => {
    if (!notifications) return;

    if (playNotificationSound && soundEnabled) {
      playSound();
    }

    // In a real app, you would use expo-notifications here
    // For now, we'll use Alert as a fallback
    Alert.alert(title, message);
  };

  const scheduleReminder = (title: string, message: string, time: Date) => {
    if (!notifications) return;

    // In a real app, you would schedule actual notifications here
    console.log(`Scheduling notification: ${title} at ${time}`);
    
    // Example with expo-notifications:
    // import * as Notifications from 'expo-notifications';
    // 
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title,
    //     body: message,
    //     sound: soundEnabled,
    //   },
    //   trigger: {
    //     date: time,
    //   },
    // });
  };

  const cancelAllNotifications = () => {
    // In a real app, you would cancel all scheduled notifications
    console.log('Cancelling all notifications');
    
    // Example with expo-notifications:
    // import * as Notifications from 'expo-notifications';
    // Notifications.cancelAllScheduledNotificationsAsync();
  };

  return {
    showNotification,
    scheduleReminder,
    cancelAllNotifications,
    notificationsEnabled: notifications,
    soundEnabled
  };
}