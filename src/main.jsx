import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 2000,

        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid #334155",
        },

        success: {
          duration: 2000,
        },

        error: {
          duration: 2000,
        },
      }}
    />
  </React.StrictMode>
);