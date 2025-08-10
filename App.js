import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = '11248e53'; 

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (searchTerm) => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(query);
  };

  useEffect(() => {
    if (movies.length > 0) {
      console.log('Movies updated:', movies);
    }
  }, [movies]);

  return (
    <div className="app-container">
      <h1>🎬 Movie Search App</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>📅 {movie.Year}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No results found.</p>
      )}
    </div>
  );
}

export default App;
