import React from 'react';
import { Link } from 'react-router-dom';
import MoviePreview from './MoviePreview';
import range from '../utils/range';

const MovieList = ({data}) => { 
  const movies = !data || data.length === 0 ? range(0, 20) : data;
  
  return (
    <div className="columns is-multiline is-mobile">
      {
        movies.map(e => (
          <div key={typeof e === 'number' ? e : e.id} className="column is-6-mobile is-3-tablet is-3-desktop">
            {typeof e === 'number' ? 
              <MoviePreview/> : 
              <Link to={`/movie/${e.id}`}>
                <MoviePreview movie={e} />
              </Link>
            }
          </div>
        ))
      }
    </div>  
  )
};

const isPropsEqual = (prevProps, nextProps) => {
  if (prevProps.data.length !== nextProps.data.length) {
    return false;
  }
  
  if (prevProps.id !== nextProps.id) {
    return false;
  }
  
  return true
}

const MemoizedMovieList = React.memo(MovieList, isPropsEqual);

export default MemoizedMovieList;
