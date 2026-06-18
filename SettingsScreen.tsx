import { useAppStore } from '../store/useAppStore';
import { useAuth } from '../hooks/useAuth';
import { RiMoonLine, RiSunLine, RiLogoutBoxLine } from 'react-icons/ri';

export default function SettingsScreen() {
  const { user, theme, toggleTheme } = useAppStore();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen max-w-mobile mx-auto bg-secondary dark:bg-dark p-5 pt-10">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-4">
        <div className="p-4 rounded-4xl bg-white dark:bg-dark-light">
          <p className="font-medium">{user?.displayName || 'User'}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <button
          onClick={toggleTheme}
          className="w-full p-4 rounded-4xl bg-white dark:bg-dark-light flex justify-between items-center"
        >
          <span>Dark Mode</span>
          {theme === 'dark' ? <RiSunLine /> : <RiMoonLine />}
        </button>
        <button
          onClick={() => logout()}
          className="w-full p-4 rounded-4xl bg-red-500 text-white flex justify-between items-center"
        >
          <span>Logout</span>
          <RiLogoutBoxLine />
        </button>
      </div>
    </div>
  );
}