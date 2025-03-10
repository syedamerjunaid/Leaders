import React, { useEffect, useState } from "react";
import API_ENDPOINTS from "../config";  // ✅ Import API URLs

function Programs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(API_ENDPOINTS.programs)  // ✅ Fetch data from the backend
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching programs:", error));
  }, []);

  return (
    <div>
      <h1>Programs Service</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default Programs;
