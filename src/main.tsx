import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { MotionProvider } from "./components/motion/MotionProvider";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={basename === "/" ? undefined : basename}>
      <MotionProvider>
        <App />
      </MotionProvider>
    </BrowserRouter>
  </StrictMode>,
);
