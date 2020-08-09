import { createSlice } from '@reduxjs/toolkit';
import movieApi from '../api/movie';
import discoverApi from '../api/discover-movie';

const movieListSlice = createSlice({
  name: 'movieListSection',
  initialState: {
    items: [],
    page: 1, 
    pages: 1, 
    isFetching: false,
    hasMore: true
  },
  reducers: {
    receive: (state, action) => ({
      items: action.payload.movies,
      page: action.payload.page,
      pages: action.payload.pages,
      isFetching: false,
      hasMore: action.payload.movies.length > 0
    }),
    request: (state, action) => ({
      ...state,
      isFetching: true,
      page: action.payload.page
    }),
    invalidate: state => ({
      items: [],
      page: 1, 
      pages: 1, 
      isFetching: false,
      hasMore: true
    })
  }
});

export const movieListSectionSlice = createSlice({
  name: 'movieListSection',
  initialState: {},
  reducers: {
    receive: (state, action) => ({
      ...state,
      [action.payload.section]: movieListSlice.reducer(
        state[action.payload.section], action
      )
    }),
    request: (state, action) => ({
      ...state,
      [action.payload.section]: movieListSlice.reducer(
        state[action.payload.section], action
      )
    }),
    invalidate: (state, action) => ({
      ...state,
      [action.payload.section]: movieListSlice.reducer(
        state[action.payload.section], action
      )
    })
  }
});

function shouldFetchMovieList(state, section, page) {
  const movieList = state.movieList[section] 
  if (!movieList) { return true; } 

  if (movieList.items.length === 0 && !movieList.isFetching && movieList.hasMore) {
    return true;
  }

  if (movieList.page !== page) { return true; }

  return false;
}

export const fetchMovieListBySection = (section, params = {}) => async (dispatch, getState) => {
  if (!shouldFetchMovieList(getState(), section, params.page || 1)) {
    return Promise.resolve();
  }
  
  const { receive, request, invalidate } = movieListSectionSlice.actions;
  
  dispatch(invalidate({ section }));
  dispatch(request({ section, page: params.page || 1 }));
  
  const res = await movieApi[section](params);
  if (res.status === 200) {
    const json = await res.json();
    dispatch(receive({
      section,
      movies: json.results, 
      page: json.page, 
      pages: json.total_pages  
    }));
  }
  
  return Promise.resolve();
}

export const fetchMovieListByGenre = ({genreId, genre, page}) => async (dispatch, getState) => {
  if (!shouldFetchMovieList(getState(), genre, page || 1)) {
    return Promise.resolve();
  }
  
  const { receive, request, invalidate } = movieListSectionSlice.actions;
  
  dispatch(invalidate({ section: genre }));
  dispatch(request({ section: genre, page: page || 1 }));
  
  const res = await discoverApi({ with_genres: genreId, page });
  if (res.status === 200) {
    const json = await res.json();
    dispatch(receive({
      section: genre,
      movies: json.results, 
      page: json.page, 
      pages: json.total_pages  
    }));
  }
  
  return Promise.resolve();
}

export const selectMovieList = section => state => state.movieList[section] || {
  items: [],
  page: 1, 
  pages: 1, 
  isFetching: false,
  hasMore: true
}

export default movieListSectionSlice.reducer;
