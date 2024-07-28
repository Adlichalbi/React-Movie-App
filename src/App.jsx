/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

function App() {
  const API_URL = import.meta.env.VITE_KEY_Movie;

  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);

  function handleChangeInput(e) {
    setTitle(e.target.value);
  }
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      searchMovies(title);
    } else return; // prevent form from submitting on enter key press.
  }
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);
  return (
    <div className="app">
      <h1>Movie Finder</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={title}
          onChange={(e) => handleChangeInput(e)}
          onKeyDown={handleKeyPress}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(title)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} /> // Render movie cards here.
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
