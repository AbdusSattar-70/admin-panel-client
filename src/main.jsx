import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// internal import
import router from "./routes/router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <main className="min-h-screen bg-lime-100">
    <RouterProvider router={router} />
  </main>
);
