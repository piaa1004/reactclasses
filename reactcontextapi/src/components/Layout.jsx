import Header from './Header';
import Content from './Content';

function Layout() {
  console.log('Layout render');

  return (
    <div className="layout">
      <Header />

      <Content />
    </div>
  );
}

export default Layout;