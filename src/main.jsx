import SearchProvider from "./context/SearchContext";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const basename =
  import.meta.env.MODE === "production" ? "/movie-explorer" : "/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <SearchProvider>
      <AuthProvider>
        <App />
        </AuthProvider>
      </SearchProvider>
    </BrowserRouter>
  </StrictMode>,
);
