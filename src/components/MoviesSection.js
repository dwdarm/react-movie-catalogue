import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieListBySection, selectMovieList } from '../features/movie-list.slice';
import MovieList from './MovieList';
import Pagination from './Pagination';

const MovieListSection = props => {
  const { items, page, pages } = useSelector(selectMovieList(props.section));
  const dispatch = useDispatch();
  
  useEffect(() => { 
    dispatch(fetchMovieListBySection(props.section, { page: props.page })); 
  });

  return (
    <>
      <MovieList data={items}/>
      <Pagination 
        page={page} 
        pages={pages} 
        onClick={i => props.history.push(`${props.location.pathname}?page=${i}`)}
      />
    </>
  );
}

export default MovieListSection;
