import { useUser } from '../contexts/UserContext';

function UserMenu() {
  console.log('UserMenu render');

  const {
    user,
    login,
    logout,
  } = useUser();

  if (!user) {
    return (
      <div className="user-menu">
        <span>로그아웃 상태</span>

        <button onClick={login}>
          로그인
        </button>
      </div>
    );
  }

  return (
    <div className="user-menu">
      <span>
        {user.name}님
      </span>

      <span>
        ({user.role})
      </span>

      <button onClick={logout}>
        로그아웃
      </button>
    </div>
  );
}

export default UserMenu;