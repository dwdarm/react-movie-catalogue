import React, { useEffect, useState } from 'react';
import searchApi from '../api/search-movie';
import MovieList from './MovieList';
import Pagination from './Pagination';

const Movies = ({ keyword, page, history, location }) => {
  const [ items, setItems ] = useState([]);
  const [ pages, setPages ] = useState(1);
  const [ empty, setEmpty ] = useState(false);
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
      setEmpty(false);
      setItems([]);
    }
    
  }, [currentKeyword, keyword, currentPage, page]);
  
  useEffect(() => {
    if (items.length === 0 && !empty) {
      fetchMovies();
    }
  });
  
  const fetchMovies = async () => {
    const res = await searchApi({ query: keyword, page: currentPage });
    if (res.status === 200) {
      const json = await res.json();
      setEmpty(json.results.length === 0);
      setItems(json.results);
      setPages(json.total_pages);
    }
  } 
  
  if (empty) {
    return (
      <p className="mt-6">
        No result found...
      </p>
    );
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
