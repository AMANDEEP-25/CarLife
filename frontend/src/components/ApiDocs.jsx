// src/components/ApiDocs.jsx
import React, { useEffect } from "react";

function ApiDocs() {
  useEffect(() => {
    // Redirect to the Swagger UI
    window.location.href = "/api/docs";
  }, []);

  return <div>Redirecting to API documentation...</div>;
}

export default ApiDocs;
