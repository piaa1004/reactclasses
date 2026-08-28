import {
  Link,
  useNavigate
} from "react-router-dom";

function Home() {
  const navigate = useNavigate(); // 코딩으로 location 변경하기 위해 사용되는 hook

  const goProducts = () => {
    navigate("/products");
  };

  const goProduct1 = () => {
    navigate("/products/1");
  };

  return (
    <div>
      <h1>Home</h1>

      <p>
        React Router 강의 샘플입니다.
      </p>

      <p>
        <Link to="/about">
          About
        </Link>
      </p>

      <button onClick={goProducts}>
        상품 목록
      </button>

      <button onClick={goProduct1}>
        1번 상품
      </button>
    </div>
  );
}

export default Home;