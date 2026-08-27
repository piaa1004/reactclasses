import { Link } from "react-router-dom";
import { products } from "../data/products";

function ProductList() {
  return (
    <div>
      <h2>Product List</h2>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`${product.id}`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;