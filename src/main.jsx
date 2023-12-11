import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// internal import
import { AuthProvider } from "./context/AuthProvider";
import router from "./routes/router";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <main className="min-h-screen bg-slate-200">
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </main>
);
