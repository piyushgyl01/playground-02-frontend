import useFetch from "../useFetch";
import Navbar from "../components/Navbar";
import { useParams } from "react-router";
import { useState } from "react";

export default function MoviesDetail() {
  const [edit, setEdit] = useState(false);
  const [editedData, setEditedData] = useState({
    title: "",
    genre: "",
    releaseDate: "",
    directors: "",
  });
  const { movieID } = useParams();

  const { data, loading, error } = useFetch(
    "https://playground-02-backend.vercel.app/movies"
  );

  const handleEdit = async () => {
    try {
      fetch(`https://playground-02-backend.vercel.app/movies/${movieID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("UNABLE TO EDIT THE DATA");
    }
  };

  const movie = data?.find((movie) => movie._id === movieID);
  return (
    <>
      <Navbar />
      <main className="container my-5">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center">Error...</p>}
        {movie && (
          <>
            <h1 className="text-center display-3">Details of {movie?.title}</h1>
            <div className="card my-2">
              <div className="card-body">
                <button
                  onClick={() => setEdit(!edit)}
                  className="float-end btn btn-primary"
                >
                  Edit Details
                </button>

                <h5 className="card-title">{movie?.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  By {movie?.directors}
                </h6>
                <p className="card-text">
                  <strong>Genre: </strong>
                  {movie?.genre || "No Genre Found"}
                </p>
                <p className="card-text">
                  <strong>Release Date: </strong>
                  {movie.releaseDate}
                </p>
              </div>
            </div>
            {edit && (
              <>
                <h1 className="text-center mt-5">
                  Edit Details of {movie?.title}
                </h1>
                <div class="mb-3">
                  <label for="titleInput" class="form-label">
                    Movie Title:
                  </label>
                  <input type="text" class="form-control" id="titleInput" />
                </div>
                <div class="mb-3">
                  <label for="releaseDate" class="form-label">
                    Movie Director:
                  </label>
                  <input type="date" class="form-control" id="releaseDate" />
                </div>
                <div class="mb-3">
                  <label for="genreSelect" class="form-label">
                    Movie Genre:
                  </label>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label="Medium select example"
                    id="genreSelect"
                  >
                    <option value="">Select Genre</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="directorSelect" class="form-label">
                    Movie Director:
                  </label>
                  <select
                    class="form-select form-select-lg mb-3"
                    aria-label="Medium select example"
                    id="directorSelect"
                  >
                    <option value="">Select Director</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">
                  Save Changes
                </button>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
