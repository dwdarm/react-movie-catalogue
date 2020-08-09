import React, { useEffect, useState } from 'react';
import searchApi from '../api/search-movie';
import MovieList from './MovieList';
import Pagination from './Pagination';

const Movies = ({ keyword, page, history, location }) => {
  const [ items, setItems ] = useState([]);
  const [ pages, setPages ] = useState(1);
  const [ currentKeyword, setCurrentKeyword ] = useState(keyword);
  const [ currentPage, setCurrentPage ] = useState(page);
  
  useEffect(() => { 
    let clearItems = false;
    
    if (currentKeyword !== keyword) {
      setCurrentKeyword(keyword);
      clearItems = true;
    }
    
    if (currentPage !== page) {
      setCurrentPage(page);
      clearItems = true;
    }
    
    if (clearItems) {
      setItems([]);
    }
    
  }, [currentKeyword, keyword, currentPage, page]);
  
  useEffect(() => {
    if (items.length === 0) {
      fetchMovies();
    }
  });
  
  const fetchMovies = async () => {
    const res = await searchApi({ query: keyword, page: currentPage });
    const json = await res.json();
    setItems(json.results);
    setPages(json.total_pages);
  } 

  return (
    <>
      <MovieList data={items}/>
      <Pagination 
        page={currentPage} 
        pages={pages} 
        onClick={i => history.push(`${location.pathname}?page=${i}`)}
      />
    </>
  );
}

export default Movies;
