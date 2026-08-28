import {
  Link,
  useNavigate
} from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>

      <h2>
        페이지를 찾을 수 없습니다.
      </h2>

      <p>
        주소를 다시 확인해주세요.
      </p>

      <p>
        <Link to="/">
          홈으로
        </Link>
      </p>

      <button
        onClick={() => navigate(-1)}
      >
        이전 페이지
      </button>
    </div>
  );
}

export default NotFound;