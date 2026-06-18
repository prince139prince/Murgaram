import { Link, useLocation } from 'react-router-dom';
import { RiChatSmile2Line, RiUser3Line, RiAddFill, RiNotification3Line } from 'react-icons/ri';

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-mobile mx-auto bg-white dark:bg-dark-light neo-card flex justify-around items-center py-2 px-5 rounded-t-4xl shadow-lg z-40">
      <Link to="/" className={`flex flex-col items-center ${location.pathname === '/' ? 'text-accent' : 'text-gray-400'}`}>
        <RiChatSmile2Line className="text-2xl" />
        <span className="text-xs">Chats</span>
      </Link>
      <Link to="/contacts" className={`flex flex-col items-center ${location.pathname === '/contacts' ? 'text-accent' : 'text-gray-400'}`}>
        <RiUser3Line className="text-2xl" />
        <span className="text-xs">Contacts</span>
      </Link>
      <Link to="/group" className="w-14 h-14 -mt-6 bg-accent rounded-full flex items-center justify-center text-white shadow-xl">
        <RiAddFill className="text-3xl" />
      </Link>
      <Link to="/notifications" className={`flex flex-col items-center ${location.pathname === '/notifications' ? 'text-accent' : 'text-gray-400'}`}>
        <RiNotification3Line className="text-2xl" />
        <span className="text-xs">Alerts</span>
      </Link>
    </nav>
  );
}