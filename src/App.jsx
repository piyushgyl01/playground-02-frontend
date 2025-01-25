import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Link } from "react-router";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <section className="my-5">
          <img
            src="https://placehold.co/2000x600?text=Movie+Banners"
            className="img-fluid img-thumbnail"
            alt="hero-img"
          />
        </section>
        <section className="my-5 text-center">
          <h1>Movies</h1>
          <p>Discover, explore, and enjoy a world of movies.</p>
          <Link className="btn btn-primary" to={"/movies"}>
            Explore Movies
          </Link>
        </section>
        <section className="my-5 text-center">
          <h1>Add Movies</h1>
          <p>Add your favorite movie anytime-anywhere.</p>
          <Link className="btn btn-primary" to={"/add-movie"}>Add Movie</Link>
        </section>
        <section className="my-5 text-center">
          <h1>Movie Report</h1>
          <p>Explore our latest movie report to gain insights into our bollywood's performance and growth.</p>
          <Link className="btn btn-primary" to={"/reports"}>
            Movie Report
          </Link>
        </section>
      </main>
    </>
  );
}

export default App;
