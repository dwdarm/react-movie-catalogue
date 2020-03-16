import React from 'react';
import { Link } from 'react-router-dom';
import MoviePreview from './MoviePreview';

const MovieList = ({data}) => { 
  return (
    <div className="columns is-multiline is-mobile">
      {
        data.map(e => (
          <div key={e.id} className="column is-6-mobile is-3-tablet is-3-desktop">
            <Link to={`/movie/${e.id}`}>
              <MoviePreview {...e} />
            </Link>
          </div>
        ))
      }
    </div>  
  )
};

export default MovieList;