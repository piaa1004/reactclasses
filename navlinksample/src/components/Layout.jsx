import {
  NavLink,
  Outlet
} from "react-router-dom";
import LocationInfo from "./LocationInfo";
import ProductMatchInfo from "./ProductMatchInfo";

function Layout() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline"
  };

  return (
    <div>
      <header>
        <h1>Router Shop</h1>

        <nav>
          <NavLink
            to="/"  
            end
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Home
          </NavLink>

          {" | "}

          <NavLink
            to="/about"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            About
          </NavLink>

          {" | "}

          <NavLink
            to="/products"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Products
          </NavLink>

          {" | "}

          <NavLink
            to="/dashboard"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Dashboard
          </NavLink>

          {" | "}

          <NavLink
            to="/search"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Search
          </NavLink>
        </nav>
      </header>

      <hr />

      <main>
        <Outlet />
      </main>

      <LocationInfo />
      <ProductMatchInfo />
    </div>
  );
}

export default Layout;