import {
  Link,
  useParams
} from "react-router-dom";

import { products } from "../data/products";

function ProductDetail() {
  const { productId } = useParams();

  const product = products.find(
    product =>
      product.id === Number(productId)
  );

  if (!product) {
    return (
      <div>
        <h2>상품을 찾을 수 없습니다.</h2>

        <Link to="/products">
          상품 목록으로
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Product Detail</h2>

      <p>ID: {product.id}</p>
      <p>상품명: {product.name}</p>
      <p>
        가격: {product.price.toLocaleString()}원
      </p>

      <Link to="/products">
        목록으로
      </Link>
    </div>
  );
}

export default ProductDetail;