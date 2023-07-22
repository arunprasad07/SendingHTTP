import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchMoviesHandler = useCallback( async() => {
    setIsLoading(true);
    const res = await fetch('https://swapi.dev/api/films');
    const data = await res.json();
    const transformedData = data.results.map(movie => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      }});
      setMovies(transformedData);
      setIsLoading(false);
    }, []);

    useEffect(() => {
      fetchMoviesHandler();
    }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>
      {!isLoading && <MoviesList movies={movies} />}
      {isLoading && <p>Loading please wait...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
