import { useSearchParams, useLocation, useResolvedPath } from 'react-router-dom';
import Footer from '../routes/Footer';

export default function Search() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const resolved = useResolvedPath(location.pathname);

  return (
    <div>
      <h2>🔍 Search Page</h2>
      <p>query param: {searchParams.get('query')}</p>
      <p>query param: {searchParams.get('hello')}</p>
      <p>Current Path: {location.pathname}</p>
      <p>Resolved Path: {resolved.pathname}</p>

      <Footer />
    </div>
  );
}
