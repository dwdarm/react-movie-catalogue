import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getPopularMovies } from '../store/actions/movies.action';
import movies from '../components/Movies';

export default () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page')) || 1;
  const Movies = movies('popular');

  return (
    <div className="section">
      <div className="container">

        <h1 className="title is-4">Popular Movies</h1>

        <Movies 
          page={page} 
          history={history} 
          location={location}
          onLoadMovies={getPopularMovies} 
        />

      </div>
    </div>
  );
}