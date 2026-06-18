import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAppStore } from '../store/useAppStore';
import { RiUser3Line, RiSettings4Line } from 'react-icons/ri';
import QRCode from 'qrcode.react';

export default function ProfileScreen() {
  const { uid } = useParams<{ uid?: string }>();
  const { user } = useAppStore();
  const [profile, setProfile] = useState<any>(null);
  const targetUid = uid || user?.uid;

  useEffect(() => {
    if (!targetUid) return;
    getDoc(doc(db, 'users', targetUid)).then((snap) => {
      if (snap.exists()) setProfile(snap.data());
    });
  }, [targetUid]);

  if (!profile) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen max-w-mobile mx-auto bg-secondary dark:bg-dark">
      <div className="relative h-48 bg-accent rounded-b-5xl overflow-hidden">
        {profile.coverImage && <img src={profile.coverImage} className="w-full h-full object-cover" />}
        <div className="absolute -bottom-12 left-5 w-24 h-24 rounded-full border-4 border-white bg-gray-300 overflow-hidden">
          {profile.avatar ? (
            <img src={profile.avatar} className="w-full h-full object-cover" />
          ) : (
            <RiUser3Line className="w-full h-full text-gray-500 p-4" />
          )}
        </div>
      </div>
      <div className="pt-16 px-5">
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        <p className="text-gray-500">@{profile.username}</p>
        <p className="text-sm mt-1 bg-white dark:bg-dark-light inline-block px-3 py-1 rounded-full">
          {profile.murgaRamId}
        </p>
        <div className="flex space-x-5 my-4">
          <span><strong>{profile.followers}</strong> Followers</span>
          <span><strong>{profile.following}</strong> Following</span>
        </div>
        <p className="text-sm">{profile.bio}</p>
        {profile.uid === user?.uid && (
          <div className="mt-4">
            <QRCode value={`https://murgaram.chat/profile/${user.uid}`} size={120} />
          </div>
        )}
      </div>
    </div>
  );
}