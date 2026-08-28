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
import Search from "./pages/Search";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";



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

        {/* Query String */}
        <Route path="search" element={<Search />} />

        {/* Dashboard Nested Route */}
        <Route path="dashboard" element={<DashboardLayout />} >
          <Route index element={<DashboardHome />} />

          <Route path="profile" element={<Profile />} />

          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
}

export default App;