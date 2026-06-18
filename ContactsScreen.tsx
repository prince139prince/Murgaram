import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { RiSearchLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function ContactsScreen() {
  const { user } = useAppStore();
  const [contacts, setContacts] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      const friendsRef = collection(db, 'friends');
      const q = query(friendsRef, where('userId', '==', user?.uid));
      const snap = await getDocs(q);
      const ids = snap.docs.map((d) => d.data().friendId);
      // get user profiles
      const users = [];
      for (const id of ids) {
        const userSnap = await getDocs(query(collection(db, 'users'), where('uid', '==', id)));
        userSnap.forEach((u) => users.push(u.data()));
      }
      setContacts(users);
    };
    if (user) fetchContacts();
  }, [user]);

  const filtered = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.murgaRamId?.includes(search)
  );

  return (
    <div className="min-h-screen max-w-mobile mx-auto bg-secondary dark:bg-dark p-5 pt-10">
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      <div className="relative mb-4">
        <RiSearchLine className="absolute left-4 top-3.5 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by MurgaRam ID"
          className="w-full pl-10 pr-4 py-3 rounded-4xl bg-white dark:bg-dark-light outline-none"
        />
      </div>
      <div className="space-y-3">
        {filtered.map((contact) => (
          <Link key={contact.uid} to={`/profile/${contact.uid}`}>
            <div className="flex items-center space-x-3 p-3 rounded-4xl bg-white dark:bg-dark-light">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                {contact.avatar ? <img src={contact.avatar} className="rounded-full" /> : contact.name?.[0]}
              </div>
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.murgaRamId}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}