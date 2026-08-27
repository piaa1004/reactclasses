import { useMatch } from 'react-router-dom';
import Footer from "../routes/Footer"

export default function UserProfile() {
  const isProfile = useMatch('/users/profile');

  return (
    <div>
      <h3>👤 User Profile</h3>
      <p>Matched: {isProfile ? 'Yes' : 'No'}</p>
      <Footer />
    </div>
  );
}
