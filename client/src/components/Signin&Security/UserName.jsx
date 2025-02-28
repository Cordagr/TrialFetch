import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { updateUserAtom } from '../../atoms/testAtom';
import { useAtom } from 'jotai';

const UserName = () => {
  const { user } = useContext(UserContext);
  const [, updateUser] = useAtom(updateUserAtom);
  const [newUsername, setNewUsername] = useState('');

  const handleUsernameUpdate = async () => {
    try {
      await updateUser({
        userId: user._id,
        newDetails: { username: newUsername },
      });
      setNewUsername('');
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  return (
    <div>
      <h3>Update Username</h3>
      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="New username"
      />
      <button onClick={handleUsernameUpdate}>Update Username</button>
    </div>
  );
};

export default UserName;
