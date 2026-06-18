import { collection, addDoc, serverTimestamp, query, where, orderBy, limit, onSnapshot, updateDoc, doc, arrayUnion, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAppStore } from '../store/useAppStore';

export const uploadStory = async (uid: string, mediaUrl: string, type: 'image' | 'video') => {
  const storiesRef = collection(db, 'stories');
  await addDoc(storiesRef, {
    uid,
    mediaUrl,
    type,
    createdAt: serverTimestamp(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    views: 0,
    viewers: [],
  });
};

export const getActiveStories = (callback: (stories: any[]) => void) => {
  const storiesRef = collection(db, 'stories');
  const now = new Date();
  // Firebase doesn't support server-side filtering on nested fields easily; use client filter
  return onSnapshot(query(storiesRef, orderBy('createdAt', 'desc')), (snapshot) => {
    const active = snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((s: any) => new Date(s.expiresAt.seconds * 1000) > now);
    callback(active);
  });
};

export const viewStory = async (storyId: string, viewerUid: string) => {
  const storyRef = doc(db, 'stories', storyId);
  const snap = await getDoc(storyRef);
  if (!snap.exists()) return;
  const viewers: string[] = snap.data().viewers || [];
  if (!viewers.includes(viewerUid)) {
    await updateDoc(storyRef, {
      views: (snap.data().views || 0) + 1,
      viewers: arrayUnion(viewerUid),
    });
  }
};