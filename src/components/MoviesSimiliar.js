import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSimiliarMovies, selectMovieDetail } from '../features/movie-detail.slice';
import MovieList from './MovieList';

const Movies = ({ id, history, location }) => {
  const movie = useSelector(selectMovieDetail(id));
  const { items, hasMore } = movie.similiar;
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(fetchSimiliarMovies(id)); 
  });
  
  if (items.length === 0 && !hasMore) {
    return null;
  }

  return <MovieList id={id} data={items}/>
}

export default Movies;
