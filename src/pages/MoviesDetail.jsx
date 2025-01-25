import { useState } from "react";
import useFetch from "../useFetch";
import Navbar from "../components/Navbar";
import { useParams } from "react-router";

export default function MoviesDetail() {
  const [edit, setEdit] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
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
      const response = await fetch(
        `https://playground-02-backend.vercel.app/movies/${movieID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      );
      
      if (response.ok) {
        setToastMessage("Movie details updated successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        setEdit(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      setToastMessage("Failed to update movie details");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const movie = data?.find((movie) => movie._id === movieID);
  
  return (
    <>
      <Navbar />
      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Notification</strong>
              <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
            </div>
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      )}
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
                <div className="mb-3">
                  <label htmlFor="titleInput" className="form-label">
                    Movie Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titleInput"
                    value={editedData.title}
                    onChange={(e) =>
                      setEditedData({ ...editedData, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="releaseDate" className="form-label">
                    Release Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="releaseDate"
                    value={editedData.releaseDate}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        releaseDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="genreSelect" className="form-label">
                    Movie Genre:
                  </label>
                  <select
                    className="form-select form-select-lg mb-3"
                    id="genreSelect"
                    value={editedData.genre}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        genre: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Genre</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="directorSelect" className="form-label">
                    Movie Director:
                  </label>
                  <select
                    className="form-select form-select-lg mb-3"
                    id="directorSelect"
                    value={editedData.directors}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        directors: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Director</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                  </select>
                </div>
                <button
                  onClick={handleEdit}
                  type="submit"
                  className="btn btn-primary"
                >
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