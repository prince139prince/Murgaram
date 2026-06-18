import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { RiAddFill } from 'react-icons/ri';

export default function GroupScreen() {
  const { groupId } = useParams();
  const { user } = useAppStore();
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [murgaRamInput, setMurgaRamInput] = useState('');

  const createGroup = async () => {
    if (!user || !groupName.trim() || members.length === 0) return;
    await addDoc(collection(db, 'groups'), {
      name: groupName,
      createdBy: user.uid,
      members: [user.uid, ...members],
      createdAt: serverTimestamp(),
      avatar: '',
    });
    setGroupName('');
    setMembers([]);
  };

  const addMember = () => {
    if (murgaRamInput.trim() && !members.includes(murgaRamInput)) {
      setMembers([...members, murgaRamInput.trim()]);
      setMurgaRamInput('');
    }
  };

  if (groupId) {
    // group chat interface similar to ChatScreen
    return <div className="p-10">Group chat UI (reuse ChatScreen with groupId)</div>;
  }

  return (
    <div className="min-h-screen max-w-mobile mx-auto bg-secondary dark:bg-dark p-5 pt-10">
      <h2 className="text-2xl font-bold mb-4">Create Group</h2>
      <input
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group name"
        className="w-full p-4 rounded-4xl bg-white dark:bg-dark-light outline-none mb-3"
      />
      <div className="flex space-x-2 mb-3">
        <input
          value={murgaRamInput}
          onChange={(e) => setMurgaRamInput(e.target.value)}
          placeholder="Add member MurgaRam ID"
          className="flex-1 p-3 rounded-4xl bg-white dark:bg-dark-light outline-none"
        />
        <button onClick={addMember} className="p-3 bg-accent rounded-full text-white">
          <RiAddFill />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {members.map((m) => (
          <span key={m} className="px-3 py-1 bg-white dark:bg-dark-light rounded-full text-sm">
            {m}
          </span>
        ))}
      </div>
      <button onClick={createGroup} className="w-full py-4 bg-accent text-white rounded-4xl font-semibold">
        Create Group
      </button>
    </div>
  );
}