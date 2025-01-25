import { useState } from "react";
import Navbar from "../components/Navbar";
import useFetch from "../useFetch";

import { Link } from "react-router";

export default function Movies() {
  const [filters, setFilters] = useState({
    directors: "",
    genre: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { data, loading, error, refetch } = useFetch(
    "https://playground-02-backend.vercel.app/movies"
  );

  const renderData =
    filters.directors === "" && filters.genre === ""
      ? data
      : data?.filter(
          (movie) =>
            (filters.genre === "" || movie.genre === filters.genre) &&
            (filters.directors === "" || movie.directors === filters.directors)
        );

  const handleDelete = async (movieID) => {
    try {
      const response = await fetch(
        `https://playground-02-backend.vercel.app/movies/${movieID}`,
        {
          method: "DELETE",
        }
      );
      console.log("MOVIE DELETED SUCCESSFULLY");

      if (response.ok) {
        setToastMessage("Movie deleted successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        refetch();
      } else {
        setToastMessage("Failed to delete the movie");
        setShowToast(true);
        throw new Error();
      }
    } catch (error) {
      console.log("Failed to delete the movie");
    }
  };

  return (
    <>
      <Navbar />
      {showToast && (
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        >
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Notification</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      )}
      <main className="container my-5">
        <h1 className="text-center display-3">Movies</h1>
        <div className="row">
          <div className="col-md-6">
            <label for="genreSelect" class="form-label">
              Filter By Genres:
            </label>
            <select
              class="form-select"
              id="genreSelect"
              aria-label="Default select example"
              value={filters.genre}
              onChange={(e) =>
                setFilters({ ...filters, genre: e.target.value })
              }
            >
              <option value={""}>All Genres</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
            </select>
          </div>
          <div className="col-md-6">
            <label for="directorSelect" class="form-label">
              Filter By Directors:
            </label>
            <select
              class="form-select"
              id="directorSelect"
              aria-label="Default select example"
              value={filters.directors}
              onChange={(e) =>
                setFilters({ ...filters, directors: e.target.value })
              }
            >
              <option value={""}>All Directors</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
            </select>
          </div>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center">Error...</p>}
        {renderData && (
          <ul>
            {renderData?.map((movie) => (
              <li key={movie._id} className="card my-5">
                <div className="card-header">{movie.title}</div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Genre: </strong>
                    {movie.genre || "No Genre Found"}
                  </p>
                  <p className="card-text">
                    <strong>Release Date: </strong>
                    {new Date(
                      movie.releaseDate.split("T")[0]
                    ).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Director: </strong>
                    {movie.director || movie.directors}
                  </p>
                  <Link
                    to={`/movie/movies-details/${movie._id}`}
                    className="btn btn-primary"
                  >
                    Movie Details
                  </Link>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className=" ms-3 btn btn-danger"
                  >
                    Delete Movie
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
