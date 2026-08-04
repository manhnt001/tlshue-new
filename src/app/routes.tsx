import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/admin",
    Component: () => {
      if (typeof window !== "undefined") {
        window.location.href = "/admin/index.html";
      }
      return null;
    },
  },
]);
