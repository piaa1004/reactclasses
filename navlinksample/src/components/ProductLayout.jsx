import { Outlet } from "react-router-dom";

function ProductLayout() {
  return (
    <section>
      <h1>상품 관리</h1>

      <p>
        상품 목록과 상품 상세 화면을
        Nested Route로 구성합니다.
      </p>

      <hr />

      <Outlet />
    </section>
  );
}

export default ProductLayout;