import {
  NavLink,
  Outlet
} from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>

      <nav>
        <NavLink
          to="/dashboard"
          end
        >
          Home
        </NavLink>

        {" | "}

        <NavLink to="profile">
          Profile
        </NavLink>

        {" | "}

        <NavLink to="settings">
          Settings
        </NavLink>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export default DashboardLayout;