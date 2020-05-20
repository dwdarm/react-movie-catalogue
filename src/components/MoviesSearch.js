import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MovieList from './MovieList';
import Pagination from './Pagination';
import { fetchSearch } from '../store/actions/search.action';

const Movies = props => {
  const { movies, keyword, page, pages, history, location, isFetching, dispatch } = props;

  useEffect(() => { dispatch(fetchSearch(keyword, { page })); });

  if (isFetching) {
    return <p className="has-text-centered">Loading...</p>
  }

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

const mapStateToProps = ({ search }, { page, keyword }) => {
  if (search.page !== page || search.keyword !== keyword) {
    return { movies: [], pages: 1, isFetching: search.isFetching }
  }

  return { movies: search.movies, pages: search.pages, isFetching: search.isFetching }
}

export default connect(mapStateToProps)(Movies);
