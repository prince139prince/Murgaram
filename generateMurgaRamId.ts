import { getDocs, collection, query, limit, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export default async function generateMurgaRamId(): Promise<string> {
  let id = '';
  let exists = true;
  while (exists) {
    const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
    id = `MR-${digits}`;
    const q = query(collection(db, 'users'), where('murgaRamId', '==', id), limit(1));
    const snap = await getDocs(q);
    exists = !snap.empty;
  }
  return id;
}