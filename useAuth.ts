import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { useAppStore } from '../store/useAppStore';
import { createUserProfile } from '../services/authService';

export function useAuth() {
  const { user, setUser } = useAppStore();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    // user profile loaded via onAuthStateChanged in App
    setLoading(false);
    return cred.user;
  };

  const signup = async (email: string, password: string, name: string, username: string) => {
    setLoading(true);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(cred.user, { name, username });
    setLoading(false);
  };

  const googleLogin = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    const isNew = result._tokenResponse?.isNewUser;
    if (isNew) {
      const username = `user${Math.floor(Math.random() * 100000)}`;
      await createUserProfile(result.user, { name: result.user.displayName || 'No Name', username });
    }
    setLoading(false);
  };

  const logout = () => signOut(auth);
  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  return { user, login, signup, googleLogin, logout, resetPassword, loading };
}