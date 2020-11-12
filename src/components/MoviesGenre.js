import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieListByGenre, selectMovieList } from '../features/movie-list.slice';
import MovieList from './MovieList';
import Pagination from './Pagination';

const MovieListGenre = props => {
  const { items, page, pages } = useSelector(selectMovieList(props.genre));
  const dispatch = useDispatch();
  
  useEffect(() => { 
    dispatch(fetchMovieListByGenre({
      genre: props.genre, 
      genreId: props.genreId, 
      page: props.page
    })); 
  });

  return (
    <>
      <MovieList data={items} id={props.genre} />
      <Pagination 
        page={page} 
        pages={pages} 
        onClick={i => props.history.push(`${props.location.pathname}?page=${i}`)}
      />
    </>
  );
}

export default MovieListGenre;
