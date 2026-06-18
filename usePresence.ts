import { useEffect } from 'react';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAppStore } from '../store/useAppStore';

export function usePresence() {
  const { user } = useAppStore();

  useEffect(() => {
    if (!user) return;
    const presenceRef = doc(db, 'presence', user.uid);
    setDoc(presenceRef, { online: true, lastSeen: serverTimestamp() });
    const unsub = onSnapshot(presenceRef, (snap) => {
      // can read online status of others
    });
    window.addEventListener('beforeunload', () => {
      setDoc(presenceRef, { online: false, lastSeen: serverTimestamp() });
    });
    return () => {
      setDoc(presenceRef, { online: false, lastSeen: serverTimestamp() });
      unsub();
    };
  }, [user]);
}