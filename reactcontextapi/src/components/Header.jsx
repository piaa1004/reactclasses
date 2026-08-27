import UserMenu from './UserMenu';

function Header() {
  console.log('Header render');

  return (
    <header className="header">
      <h1>Context API Demo</h1>

      <UserMenu />
    </header>
  );
}

export default Header;