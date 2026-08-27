import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from "../routes/Footer"

export default function Users() {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('profile');
  };

  const goToSearch = () => {
    navigate('../search');
  };

  return (
    <div>
      <h2>👥 Users Section</h2>
      <ul>
        <li><Link to="1">User 1 Detail</Link></li>
        <li><Link to="profile">Go to Profile (nested)</Link></li>
        <li><Link to="settings">Go to Settings (nested)</Link></li>
      </ul>
      <button onClick={goToProfile}>프로필로 이동</button>
      <button onClick={goToSearch}>Search로 이동</button>

      <hr />

      <Outlet />

      {/* <Footer /> */}
      
    </div>
  );
}
