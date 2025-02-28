import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { updateUserAtom } from '../../atoms/testAtom';
import { useAtom } from 'jotai';

const Email = () => {
  const { user } = useContext(UserContext);
  const [, updateUser] = useAtom(updateUserAtom);
  const [newEmail, setNewEmail] = useState('');

  const handleEmailUpdate = async () => {
    try {
      await updateUser({
        userId: user._id,
        newDetails: { email: newEmail },
      });
      setNewEmail('');
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  return (
    <div>
      <h3>Update Email</h3>
      <input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder="New email"
      />
      <button onClick={handleEmailUpdate}>Update Email</button>
    </div>
  );
};

export default Email;
