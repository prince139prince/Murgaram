import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function NotificationsScreen() {
  const { user } = useAppStore();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'notifications'),
      where('to', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snap) => {
      setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [user]);

  return (
    <div className="min-h-screen max-w-mobile mx-auto bg-secondary dark:bg-dark p-5 pt-10">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {notifications.map((n) => (
        <div key={n.id} className="p-4 rounded-4xl bg-white dark:bg-dark-light mb-2">
          <p className="font-medium">{n.title}</p>
          <p className="text-sm text-gray-500">{n.body}</p>
        </div>
      ))}
    </div>
  );
}