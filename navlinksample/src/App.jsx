import {
  Routes,
  Route
} from "react-router-dom";

import Layout from "./components/Layout";
import ProductLayout from "./components/ProductLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="products" element={<ProductLayout />} >
          <Route index element={<ProductList />} />

          <Route path=":productId" element={<ProductDetail />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;