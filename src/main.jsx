import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import AddMovie from "./pages/AddMovie.jsx";
import Movies from "./pages/Movies.jsx";
import MoviesDetail from "./pages/MoviesDetail.jsx";
import Report from "./pages/Report.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add-movie",
    element: <AddMovie />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/movie/movies-details/:movieID",
    element: <MoviesDetail />,
  },
  {
    path: "/reports",
    element: <Report />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
