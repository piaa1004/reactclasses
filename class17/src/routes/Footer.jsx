import { useResolvedPath } from 'react-router-dom';

export default function Footer() {
  const currentPath = useResolvedPath('.');

  return (
    <footer>
      <p>현재 경로: {currentPath.pathname}</p>      
    </footer>
  );
}