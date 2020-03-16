import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getUpcomingMovies } from '../store/actions/movies.action';
import movies from '../components/Movies';

export default () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page')) || 1;
  const Movies = movies('upcoming');

  return (
    <div className="section">
      <div className="container">

        <h1 className="title is-4">Upcoming Movies</h1>

        <Movies 
          page={page} 
          history={history} 
          location={location}
          onLoadMovies={getUpcomingMovies} 
        />

      </div>
    </div>
  );
}