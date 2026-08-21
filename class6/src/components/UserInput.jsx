// import React from 'react';
import React, { useState } from 'react';


const UserInput = ({ username, setUsername, age, setAge }) => {

  const uname = username;
  const ufunc = setUsername;
  const uage = age;
  const sfunc = setAge;

  const [usernames, setUsernames] = useState('홍길동');
  const [ages, setAges] = useState(20);

  return (
    <section>
      <h2>🙋 사용자 정보 입력</h2>
      <input
        type="text"
        value={usernames}
        onChange={(e) => setUsernames(e.target.value)}
        placeholder="이름 입력"
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <input
        type="number"
        value={ages}
        onChange={(e) => setAges(Number(e.target.value))}
        placeholder="나이 입력"
        style={{ padding: '8px' }}
      />
    </section>
  );

  // return (
  //   <section>
  //     <h2>🙋 사용자 정보 입력</h2>
  //     <input
  //       type="text"
  //       value={username}
  //       onChange={(e) => setUsername(e.target.value)}
  //       placeholder="이름 입력"
  //       style={{ padding: '8px', marginRight: '10px' }}
  //     />
  //     <input
  //       type="number"
  //       value={age}
  //       onChange={(e) => setAge(Number(e.target.value))}
  //       placeholder="나이 입력"
  //       style={{ padding: '8px' }}
  //     />
  //   </section>
  // );
};

export default UserInput;
