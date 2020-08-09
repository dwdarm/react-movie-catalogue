import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import Pagination from './Pagination';

const Movies = props => {
  const {
    movies, 
    page, 
    pages, 
    genre, 
    genreId, 
    keyword,
    history, 
    location, 
    dispatch, 
    onLoadMovies
  } = props;

  useEffect(() => {
    if (movies.length === 0) {
      if (genreId) {
        dispatch(onLoadMovies({genre, genreId, page}));
      } else if (keyword) {
        dispatch(onLoadMovies({keyword, page}));
      } else {
        dispatch(onLoadMovies({page}));
      }
    }
  });

  if (movies.length === 0) {
    return (
      <p className="has-text-centered">Loading...</p>
    );
  }

  return (
    <>
      <MovieList data={movies}/>

      <Pagination 
        page={page} 
        pages={pages} 
        onClick={i => {
          history.replace(`${location.pathname}?page=${i}`)
        }} 
    />
    </>
  );
}

const isEqual = (prevProps, nextProps) => {
  if (prevProps.movies.length !== nextProps.movies.length) {
    return false;
  }

  return true;
}

const MemoizedMovies = React.memo(Movies, isEqual);

export default section => {

  const mapStateToProps = (state, ownProps) => {
    const { movies, search } = state;
    const { keyword, page } = ownProps;
    const data = (keyword ? search : movies[section]) || { 
      keyword: '', movies: [], page: 1, pages: 1 
    }
  
    if (data.page !== page || data.keyword !== keyword) {
      return {
        movies: [],
        pages: 1
      }
    }
  
    return {
      movies: data.movies,
      pages: data.pages
    }
  }
  
  return connect(mapStateToProps)(MemoizedMovies);
}
