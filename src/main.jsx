import SearchProvider from "./context/SearchContext";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const basename =
  import.meta.env.MODE === "production" ? "/movie-explorer" : "/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <SearchProvider>
        <App />
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>,
);
