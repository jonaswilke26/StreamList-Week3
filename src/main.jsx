import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Only register the service worker in the production build.
// This prevents it from caching development files while using npm run dev.
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "StreamList service worker registered:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error(
          "Service worker registration failed:",
          error
        );
      });
  });
}