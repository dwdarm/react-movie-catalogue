import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import Pagination from './Pagination';
import { fetchSimiliarMovies } from '../store/actions/movies.action';

const Movies = props => {
  const { id, movies, history, location, isFetching, dispatch } = props;

  useEffect(() => { dispatch(fetchSimiliarMovies(id)); });

  if (isFetching) {
    return <p className="has-text-centered">Loading...</p>
  }

  return <MovieList data={movies}/>
}

const mapStateToProps = ({ movieDetail }, { id }) => {
  return { 
    movies: movieDetail[id].similiar.movies, 
    isFetching: movieDetail[id].similiar.isFetching 
  }
}

export default connect(mapStateToProps)(Movies);
