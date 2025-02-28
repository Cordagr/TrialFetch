import React from 'react';
import Email from './Email';
import Password from './Password';
import Title from './Title';
import UserName from './UserName';

const Security = () => {
  return (
    <div>
      <Title />
      <UserName />
      <Email />
      <Password />
    </div>
  );
};

export default Security;
