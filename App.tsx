import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes';
import { useAppStore } from './store/useAppStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { getUserProfile } from './services/authService';
import SplashScreen from './pages/SplashScreen';

const queryClient = new QueryClient();

function AuthStateListener() {
  const { setUser, setLoading, loading } = useAppStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUser({ ...firebaseUser, ...profile });
        } catch (err) {
          console.error('Failed to load profile', err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [setUser, setLoading]);

  if (loading) return <SplashScreen />;
  return <AppRoutes />;
}

export default function App() {
  const { theme } = useAppStore();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthStateListener />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}