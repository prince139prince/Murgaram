import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import SplashScreen from '../pages/SplashScreen';

const LoginScreen = lazy(() => import('../pages/LoginScreen'));
const SignupScreen = lazy(() => import('../pages/SignupScreen'));
const OnboardingScreen = lazy(() => import('../pages/OnboardingScreen'));
const HomeScreen = lazy(() => import('../pages/HomeScreen'));
const ChatScreen = lazy(() => import('../pages/ChatScreen'));
const ProfileScreen = lazy(() => import('../pages/ProfileScreen'));
const ContactsScreen = lazy(() => import('../pages/ContactsScreen'));
const GroupScreen = lazy(() => import('../pages/GroupScreen'));
const VoiceCallScreen = lazy(() => import('../pages/VoiceCallScreen'));
const VideoCallScreen = lazy(() => import('../pages/VideoCallScreen'));
const NotificationsScreen = lazy(() => import('../pages/NotificationsScreen'));
const SettingsScreen = lazy(() => import('../pages/SettingsScreen'));

export default function AppRoutes() {
  const { user } = useAppStore();

  return (
    <Suspense fallback={<SplashScreen />}>
      <Routes>
        <Route path="/" element={user ? <HomeScreen /> : <Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/chat/:chatId" element={<ChatScreen />} />
        <Route path="/profile/:uid?" element={<ProfileScreen />} />
        <Route path="/contacts" element={<ContactsScreen />} />
        <Route path="/group/:groupId?" element={<GroupScreen />} />
        <Route path="/call/voice/:uid" element={<VoiceCallScreen />} />
        <Route path="/call/video/:uid" element={<VideoCallScreen />} />
        <Route path="/notifications" element={<NotificationsScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}