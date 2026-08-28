import { useLocation } from "react-router-dom";

function LocationInfo() {
  const location = useLocation();

  return (
    <div>
      <h3>Current Location</h3>

      <p>
        pathname:
        {location.pathname}
      </p>

      <p>
        search:
        {location.search}
      </p>

      <p>
        hash:
        {location.hash}
      </p>
    </div>
  );
}

export default LocationInfo;