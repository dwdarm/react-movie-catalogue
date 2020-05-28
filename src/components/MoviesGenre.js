import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import Pagination from './Pagination';
import { fetchMoviesByGenre } from '../store/actions/movies.action';

const Movies = props => {
  const { movies, genre, genreId,page, pages, history, location, isFetching, dispatch } = props;

  useEffect(() => { dispatch(fetchMoviesByGenre ({ genre, genreId, page })); });

  //if (isFetching) {
  //  return <p className="has-text-centered">Loading...</p>
  //}

  return (
    <>
      <MovieList data={movies}/>
      <Pagination 
        page={page} 
        pages={pages} 
        onClick={i => history.push(`${location.pathname}?page=${i}`)}
      />
    </>
  );
}

const mapStateToProps = ({ movies }, { page, genre }) => {
  const data = movies[genre] || { movies: [], page: 1, pages: 1, isFetching: false }
  
  if (data.page !== page) {
    return { movies: [], pages: 1, isFetching: data.isFetching }
  }

  return { movies: data.movies, pages: data.pages, isFetching: data.isFetching }
}

export default connect(mapStateToProps)(Movies);
