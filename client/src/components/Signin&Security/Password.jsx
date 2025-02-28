import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { updateUserAtom } from '../../atoms/testAtom';
import { useAtom } from 'jotai';

const Password = () => {
  const { user } = useContext(UserContext);
  const [, updateUser] = useAtom(updateUserAtom);
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordUpdate = async () => {
    try {
      await updateUser({
        userId: user._id,
        newDetails: { password: newPassword },
      });
      setNewPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div>
      <h3>Update Password</h3>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password"
      />
      <button onClick={handlePasswordUpdate}>Update Password</button>
    </div>
  );
};

export default Password;
