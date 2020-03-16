import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getMoviesByGenre } from '../store/actions/movies.action';
import movies from '../components/Movies';

export default () => {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const { genre, genreId } = params;
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page')) || 1;
  const Movies = movies(genre);

  return (
    <div className="section">
      <div className="container">

        <h1 className="title is-4">{`${genre} Movies`}</h1>

        <Movies 
          page={page} 
          genre={genre}
          genreId={genreId}
          history={history} 
          location={location}
          onLoadMovies={getMoviesByGenre} 
        />

      </div>
    </div>
  );
}