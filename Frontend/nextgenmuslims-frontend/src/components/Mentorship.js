import React, { useEffect, useState } from "react";
import API_ENDPOINTS from "../config";  // ✅ Import API URLs

function Mentorship() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(API_ENDPOINTS.mentorship)  // ✅ Fetch data from the backend
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching mentorship:", error));
  }, []);

  return (
    <div>
      <h1>Mentorship Service</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default Mentorship;
