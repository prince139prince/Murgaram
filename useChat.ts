import { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
  where,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAppStore } from '../store/useAppStore';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text?: string;
  image?: string;
  voice?: string;
  document?: string;
  createdAt: any;
  status: 'sent' | 'delivered' | 'seen';
  replyTo?: string;
  type?: 'text' | 'image' | 'voice' | 'document';
}

export function useChat(chatId: string) {
  const { user } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!chatId || !user) return;
    const colRef = collection(db, 'chats', chatId, 'messages');
    const q = query(colRef, orderBy('createdAt', 'asc'), limit(50));
    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(msgs);
    });
    return () => unsub();
  }, [chatId, user]);

  const sendMessage = async (data: { text?: string; image?: string; voice?: string; document?: string }) => {
    if (!user || !chatId) return;
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      ...data,
      senderId: user.uid,
      chatId,
      createdAt: serverTimestamp(),
      status: 'sent',
      type: data.image ? 'image' : data.voice ? 'voice' : data.document ? 'document' : 'text',
    });
  };

  return { messages, sendMessage, typingUsers };
}