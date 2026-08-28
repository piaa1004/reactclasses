import {
  useMatch
} from "react-router-dom";

function ProductMatchInfo() {
  const match = useMatch(
    "/products/:productId"
  );

  if (!match) {
    return (
      <p>
        현재 Product Detail Route가 아닙니다.
      </p>
    );
  }

  return (
    <div>
      <h3>useMatch 결과</h3>

      <p>
        Product Detail Route와 매칭되었습니다.
      </p>

      <p>
        productId:
        {match.params.productId}
      </p>
    </div>
  );
}

export default ProductMatchInfo;