import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/config';

export const createOrGetChat = async (currentUid: string, otherUid: string) => {
  const chatsRef = collection(db, 'chats');
  const q = query(chatsRef, where('participants', 'array-contains', currentUid));
  const snapshot = await getDocs(q);
  const existing = snapshot.docs.find((doc) => doc.data().participants.includes(otherUid));
  if (existing) return existing.id;
  const newChat = await addDoc(chatsRef, {
    participants: [currentUid, otherUid],
    createdAt: serverTimestamp(),
    lastMessage: null,
    type: 'private',
  });
  return newChat.id;
};

export const sendTypingStatus = async (chatId: string, uid: string, isTyping: boolean) => {
  const typingRef = doc(db, 'typingStatus', chatId);
  if (isTyping) {
    await updateDoc(typingRef, { [uid]: true }, { merge: true });
  } else {
    // using FieldValue for arrayUnion and remove is tricky; simplified
    const current = (await getDocs(query(collection(db, 'typingStatus')))).docs[0]?.data() || {};
    delete current[uid];
    await updateDoc(typingRef, current);
  }
};