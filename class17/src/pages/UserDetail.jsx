import { useParams } from 'react-router-dom';
import Footer from "../routes/Footer"

export default function UserDetail() {
  const { id } = useParams();
  return (
    <div>
      <h2>👤 User Detail for ID: {id}</h2>
      <Footer />
    </div>
  );
}
