import Navbar from "../components/Navbar";
import { useState } from "react";

export default function AddMovie() {
  const [savedData, setSavedData] = useState({
    title: "",
    genre: "",
    releaseDate: "",
    directors: "",
  });

  const handleCreate = async () => {
    try {
      fetch("https://playground-02-backend.vercel.app/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedData),
      });
      console.log("POSTED SUCCESSFULLY");
      setSavedData({
        title: "",
        genre: "",
        releaseDate: "",
        directors: "",
      });
    } catch (error) {
      console.log("Not able to create a new movie");
    }
  };
  return (
    <>
      <Navbar />
      <main className="container my-5">
        <h1>Add Movie</h1>
        <h1 className="text-center mt-3"></h1>
        <div class="mb-3">
          <label for="titleInput" class="form-label">
            Movie Title:
          </label>
          <input
            type="text"
            class="form-control"
            id="titleInput"
            value={savedData.title}
            onChange={(e) =>
              setSavedData({ ...savedData, title: e.target.value })
            }
          />
        </div>
        <div class="mb-3">
          <label for="releaseDate" class="form-label">
            Release Date:
          </label>
          <input
            type="date"
            class="form-control"
            id="releaseDate"
            value={savedData.releaseDate}
            onChange={(e) =>
              setSavedData({
                ...savedData,
                releaseDate: e.target.value,
              })
            }
          />
        </div>
        <div class="mb-3">
          <label for="genreSelect" class="form-label">
            Movie Genre:
          </label>
          <select
            class="form-select form-select-lg mb-3"
            aria-label="Medium select example"
            id="genreSelect"
            value={savedData.genre}
            onChange={(e) =>
              setSavedData({
                ...savedData,
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
        <div class="mb-3">
          <label for="directorSelect" class="form-label">
            Movie Director:
          </label>
          <select
            class="form-select form-select-lg mb-3"
            aria-label="Medium select example"
            id="directorSelect"
            value={savedData.directors}
            onChange={(e) =>
              setSavedData({
                ...savedData,
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
          onClick={() => handleCreate()}
          type="submit"
          class="btn btn-primary"
        >
          Save Changes
        </button>
      </main>
    </>
  );
}
