import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!isSupported) {
      toast.error('Push-Benachrichtigungen werden von diesem Browser nicht unterstützt');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        await subscribeToPush();
        toast.success('Push-Benachrichtigungen aktiviert!');
        return true;
      } else {
        toast.error('Push-Benachrichtigungen wurden abgelehnt');
        return false;
      }
    } catch (error) {
      logger.error('Error requesting notification permission:', error);
      toast.error('Fehler beim Aktivieren der Benachrichtigungen');
      return false;
    }
  };

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Check if already subscribed
      let sub = await registration.pushManager.getSubscription();
      
      if (!sub) {
        // For now, just enable notifications without server push
        // In production, you would need VAPID keys and server setup
        logger.log('Push subscription would be created here with VAPID keys');
      }

      setSubscription(sub);
      return sub;
    } catch (error) {
      logger.error('Error subscribing to push:', error);
      throw error;
    }
  };

  const unsubscribeFromPush = async () => {
    try {
      if (subscription) {
        await subscription.unsubscribe();
        setSubscription(null);
        toast.success('Push-Benachrichtigungen deaktiviert');
      }
    } catch (error) {
      logger.error('Error unsubscribing from push:', error);
      toast.error('Fehler beim Deaktivieren der Benachrichtigungen');
    }
  };

  const sendTestNotification = () => {
    if (permission === 'granted') {
      new Notification('Test-Benachrichtigung', {
        body: 'Push-Benachrichtigungen funktionieren! 🎉',
        icon: '/logo.png',
        badge: '/logo.png',
        tag: 'test-notification',
        requireInteraction: false
      });
    }
  };

  const scheduleStudyReminder = async (time: string, message: string) => {
    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return;
    }

    // This would typically be handled by a backend service
    // For now, we'll use a local scheduled notification
    const targetTime = new Date(time).getTime();
    const now = Date.now();
    const delay = targetTime - now;

    if (delay > 0 && delay < 86400000) { // Max 24 hours
      const timerId = setTimeout(() => {
        new Notification('Lern-Erinnerung', {
          body: message,
          icon: '/logo.png',
          badge: '/logo.png',
          tag: 'study-reminder',
          requireInteraction: true
        });
      }, delay);

      toast.success('Erinnerung eingerichtet');
      
      // Return cleanup function
      return () => clearTimeout(timerId);
    } else if (delay >= 86400000) {
      toast.error('Erinnerungen können maximal 24 Stunden im Voraus eingestellt werden');
    }
  };

  return {
    permission,
    isSupported,
    subscription,
    requestPermission,
    unsubscribeFromPush,
    sendTestNotification,
    scheduleStudyReminder
  };
};