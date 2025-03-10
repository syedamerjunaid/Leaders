import React, { useEffect, useState } from "react";
import API_ENDPOINTS from "../config";  // ✅ Import API URLs

function Community() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(API_ENDPOINTS.community)  // ✅ Fetch data from the backend
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching community:", error));
  }, []);

  return (
    <div>
      <h1>Community Service</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default Community;
