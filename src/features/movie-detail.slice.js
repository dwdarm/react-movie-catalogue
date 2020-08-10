import { createSlice } from '@reduxjs/toolkit';
import movieApi from '../api/movie';

const defaultItemState = {
  similiar: {
    items: [], 
    page: 1, 
    pages: 1, 
    isFetching: false, 
    hasMore: true
  },
  credits: {
    cast: [],
    crew: [],
    isFetching: false, 
    isFetched: false
  }
} 

export const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState: {},
  reducers: {
    receive: (state, action) => ({
      ...state,
      [action.payload.id]: {
        ...action.payload.movie,
        ...defaultItemState
      }
    }),
    receiveSimiliar: (state, action) => {
      const item = state[action.payload.id]
      if (!item) { return; }
      
      return {
        ...state,
        [action.payload.id]: {
          ...item,
          similiar: {
            items: action.payload.movies,
            page: action.payload.page,
            pages: action.payload.pages,
            isFetching: false,
            hasMore: action.payload.movies.length > 0
          }
        }
      }
    },
    requestSimiliar: (state, action) => {
      const item = state[action.payload.id]
      if (!item) { return; }
      
      return {
        ...state,
        [action.payload.id]: {
          ...item,
          similiar: {
            ...item.similiar,
            isFetching: true,
          }
        }
      }
    },
    requestCredits: (state, action) => {
      const item = state[action.payload.id]
      if (!item) { return; }
      
      return {
        ...state,
        [action.payload.id]: {
          ...item,
          credits: {
            ...item.credits,
            isFetching: true,
          }
        }
      }
    },
    receiveCredits: (state, action) => {
      const item = state[action.payload.id]
      if (!item) { return; }
      
      return {
        ...state,
        [action.payload.id]: {
          ...item,
          credits: {
            cast: action.payload.cast,
            crew: action.payload.crew,
            isFetching: false,
            isFetched: true,
          }
        }
      }
    },
  }
});

function shouldFetchMovieDetail(state, id) {
  if (!state.movieDetail[id]) {
    return true;
  }
  
  return false
}

function shouldFetchMovieDetailSimiliar(state, id) {
  if (!state.movieDetail[id]) {
    return false;
  }
  
  const item = state.movieDetail[id].similiar;
  if (item.items.length === 0 && !item.isFetching && item.hasMore) {
    return true;
  }
  
  return false
}

function shouldFetchMovieDetailCredits(state, id) {
  if (!state.movieDetail[id]) {
    return false;
  }
  
  const credits = state.movieDetail[id].credits;
  if (credits.crew.length === 0 || credits.cast.length === 0) {
    if (!credits.isFetching && !credits.isFetched) {
      return true;
    }
  }
  
  return false
}

export const fetchMovieDetail = (id, params = {}) => async (dispatch, getState) => {
  if (!shouldFetchMovieDetail(getState(), id)) {
    return Promise.resolve();
  }
  
  const { receive } = movieDetailSlice.actions;
  
  const res = await movieApi.detail(id, params);
  if (res.status === 200) {
    const json = await res.json();
    dispatch(receive({ id, movie: json }));
    return Promise.resolve();
  }
  
  return Promise.reject();
}

export const fetchSimiliarMovies = (id, params = {}) => async (dispatch, getState) => {
  if (!shouldFetchMovieDetailSimiliar(getState(), id)) {
    return Promise.resolve();
  }
  
  const { receiveSimiliar, requestSimiliar } = movieDetailSlice.actions;
  
  dispatch(requestSimiliar({ id }));
  
  const res = await movieApi.similiar(id);
  if (res.status === 200) {
    const json = await res.json();
    dispatch(receiveSimiliar({ 
      id, 
      movies: json.results, 
      page: json.page, 
      pages: json.total_pages 
    }));
    return Promise.resolve();
  }
  
  return Promise.reject();
}

export const fetchMovieDetailCredits = (id, params = {}) => async (dispatch, getState) => {
  if (!shouldFetchMovieDetailCredits(getState(), id)) {
    return Promise.resolve();
  }
  
  const { receiveCredits, requestCredits } = movieDetailSlice.actions;
  
  dispatch(requestCredits({ id }));
  
  const res = await movieApi.credits(id);
  if (res.status === 200) {
    const json = await res.json();
    dispatch(receiveCredits({ 
      id, 
      cast: json.cast,
      crew: json.crew
    }));
    return Promise.resolve();
  }
  
  return Promise.reject();
}

export const selectMovieDetail = id => state => state.movieDetail[id]

export default movieDetailSlice.reducer;
