import { useEffect, useState } from "react";

function Movies() {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("movieSearchTerm") || "";
  });

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movieResults");

    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "movieSearchTerm",
      searchTerm
    );
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem(
      "movieResults",
      JSON.stringify(movies)
    );
  }, [movies]);

  const searchMovies = async (event) => {
    event.preventDefault();

    if (searchTerm.trim() === "") {
      setError("Please enter a movie title.");
      return;
    }

    try {
      setError("");

      const apiKey =
        import.meta.env.VITE_TMDB_API_KEY;

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (!response.ok) {
        throw new Error("Movie search failed.");
      }

      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      console.error(error);

      setError(
        "There was a problem searching for movies."
      );
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setMovies([]);
    setError("");

    localStorage.removeItem("movieSearchTerm");
    localStorage.removeItem("movieResults");
  };

  return (
    <section className="page">
      <div className="page-card">
        <h1>Movie Search</h1>

        <p>
          Search for a movie to view information
          provided by TMDB.
        </p>

        <form
          className="stream-form"
          onSubmit={searchMovies}
        >
          <input
            type="text"
            placeholder="Enter a movie title..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          <button type="submit">
            Search
          </button>

          {movies.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
            >
              Clear
            </button>
          )}
        </form>

        {error && <p>{error}</p>}

        {movies.length === 0 && !error && (
          <p>
            Search for a movie to see results.
          </p>
        )}

        <div className="movie-results">
          {movies.map((movie) => (
            <div
              className="movie-card"
              key={movie.id}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <p>No poster available.</p>
              )}

              <h2>{movie.title}</h2>

              <p>
                <strong>Release Date:</strong>{" "}
                {movie.release_date ||
                  "Unknown"}
              </p>

              <p>
                <strong>Rating:</strong>{" "}
                {movie.vote_average
                  ? movie.vote_average.toFixed(1)
                  : "Not Rated"}
              </p>

              <p>
                {movie.overview ||
                  "No description available."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Movies;