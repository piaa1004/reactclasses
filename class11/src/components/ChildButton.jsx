import React from 'react';

// 자체 state가 없어도 ChildButton의 부모가 리렌더링될 때 호출될 수 있지만,
// 다음 함수형 컴포넌트는 메모이제이션이 되었기 때문에, 건너뛸 수 있게 되어, 렌더링 비용을 줄일 수 있음 
// React는 이전 props와 새로운 props를 비교합니다.
// : 순수함수니까 항상 동일한 props는 동일한 UI를 만듦.
const ChildButton = React.memo(({ onClick, label })  => {
  console.log(`🔄 ChildButton 렌더링: ${label}`);
  return (
    <button onClick={onClick} style={{ padding: '10px', marginTop: '10px' }}>
      {label}
    </button>
  );
});

export default ChildButton;
