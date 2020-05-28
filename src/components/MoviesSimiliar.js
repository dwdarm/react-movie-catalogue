import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import Pagination from './Pagination';
import { fetchSimiliarMovies } from '../store/actions/movies.action';

const Movies = props => {
  const { id, movies, hasMore, history, location, isFetching, dispatch } = props;

  useEffect(() => { dispatch(fetchSimiliarMovies(id)); });
  
  if (movies.length === 0 && !hasMore) {
    return null;
  }

  return <MovieList data={movies}/>
}

const mapStateToProps = ({ movieDetail }, { id }) => {
  return { 
    movies: movieDetail[id].similiar.movies, 
    hasMore: movieDetail[id].similiar.hasMore 
  }
}

export default connect(mapStateToProps)(Movies);
