import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '../firebase/config';
import generateMurgaRamId from '../utils/generateMurgaRamId';

export const createUserProfile = async (user: User, extra: { name: string; username: string }) => {
  const murgaRamId = await generateMurgaRamId();
  const userDoc = doc(db, 'users', user.uid);
  await setDoc(userDoc, {
    uid: user.uid,
    murgaRamId,
    name: extra.name,
    username: extra.username.toLowerCase(),
    email: user.email,
    avatar: '',
    coverImage: '',
    bio: '',
    followers: 0,
    following: 0,
    posts: 0,
    online: true,
    lastSeen: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
};

export const getUserProfile = async (uid: string) => {
  const snap = await getDoc(doc(db, 'users', uid));
  if (snap.exists()) return snap.data();
  return null;
};

export const updateUserProfile = async (uid: string, data: Record<string, any>) => {
  await setDoc(doc(db, 'users', uid), data, { merge: true });
};