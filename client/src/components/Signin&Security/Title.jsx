import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { updateUserAtom } from '../../atoms/testAtom';
import { useAtom } from 'jotai';

const Title = () => {
  const { user } = useContext(UserContext);
  const [, updateUser] = useAtom(updateUserAtom);
  const [newTitle, setNewTitle] = useState('');

  const handleTitleUpdate = async () => {
    try {
      await updateUser({
        userId: user._id,
        newDetails: { title: newTitle },
      });
      setNewTitle('');
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  return (
    <div>
      <h3>Update Title</h3>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New title"
      />
      <button onClick={handleTitleUpdate}>Update Title</button>
    </div>
  );
};

export default Title;
