import { useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase/config';
import { useAppStore } from '../store/useAppStore';

export function useNotifications() {
  const { user } = useAppStore();

  useEffect(() => {
    if (!user || !messaging) return;
    getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY })
      .then((token) => {
        // save token to user doc
      })
      .catch((err) => console.log('No token', err));
    const unsub = onMessage(messaging, (payload) => {
      // show notification
      if (Notification.permission === 'granted') {
        new Notification(payload.notification?.title || 'MurgaRam', {
          body: payload.notification?.body,
        });
      }
    });
    return () => unsub();
  }, [user]);
}