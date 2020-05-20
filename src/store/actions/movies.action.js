import movieApi from '../../api/movie';
import discoverApi from '../../api/discover-movie';

// SET ERROR
const setError = (isError = true, message = '') => {
  return {
    type: 'SET_ERROR',
    payload: {
      isError: isError,
      message: message
    }
  }
}

// CLEAR ERROR
const clearError = () => {
  return { type: 'CLEAR_ERROR' }
}

// REQUEST MOVIES
const requestMovies = (section, page = 1) => ({
  type: 'REQUEST_MOVIES',
  payload: { section, page }
});

// RECEIVE MOVIES
const receiveMovies = (section, data) => ({
  type: 'RECEIVE_MOVIES',
  payload: {
    section: section, 
    movies: data.movies, 
    page: data.page, 
    pages: data.pages 
  }
});

// REQUEST SIMILIAR MOVIES
const requestSimiliarMovies = (id) => ({
  type: 'REQUEST_SIMILIAR_MOVIES',
  payload: { id }
});

// RECEIVE SIMILOAR MOVIES
const receiveSimiliarMovies = (id, data) => ({
  type: 'RECEIVE_SIMILIAR_MOVIES',
  payload: {
    id,
    movies: data.movies, 
    page: data.page, 
    pages: data.pages 
  }
});

const addMovieDetail = (id, data) => ({
  type: 'ADD_MOVIE_DETAIL',
  payload: { id, movie: data }
});


const shouldFetchMovies = (state, section, page) => {
  const movies = state.movies[section] 

  if (!movies) {
    return true;
  } 

  if (movies.movies.length === 0 && 
      movies.isFetching === false &&
      movies.hasMore === true) {
    return true;
  }

  if (movies.page !== page) {
    return true;
  }

  return false;
}

const shouldFetchMovieDetail = (state, id) => {
  if (!state.movieDetail[id]) {
    return true;
  } 

  return false;
}

const shouldFetchSimiliarMovies = (state, id) => {
  if (state.movieDetail[id]) {
    
    if (state.movieDetail[id].similiar.movies.length === 0 && 
        state.movieDetail[id].similiar.isFetching === false &&
        state.movieDetail[id].similiar.hasMore === true) {
      return true;
    }
    
  } 

  return false;
}

export const fetchMovies = (section, params = {}) => (dispatch, getState) => {
  if (shouldFetchMovies(getState(), section, params.page || 1) === false) {
    return Promise.resolve();
  }

  dispatch(requestMovies(section, params.page));

  return movieApi[section](params)
    .then(res => {
      if (res.status !== 200) { return Promise.reject(); }
      return res.json();
    })
    .then(json => {
      return dispatch(receiveMovies(section, {
        movies: json.results, 
        page: json.page, 
        pages: json.total_pages 
      }));
    });
}

export const fetchMoviesByGenre = ({genreId, genre, page}) => (dispatch, getState) => {
  if (shouldFetchMovies(getState(), genre, page || 1) === false) {
    return Promise.resolve();
  }

  dispatch(requestMovies(genre, page));

  return discoverApi({ with_genres: genreId, page })
    .then(res => {
      if (res.status !== 200) { return Promise.reject(); }
      return res.json();
    })
    .then(json => {
      return dispatch(receiveMovies(genre, {
        movies: json.results, 
        page: json.page, 
        pages: json.total_pages  
      }));
    });
}

export const getMovieDetail = (id, params = {}) => (dispatch, getState) => {
  if (shouldFetchMovieDetail(getState(), id) === false) {
    return Promise.resolve();
  }
  
  dispatch(clearError());
  
  return movieApi.detail(id, params)
    .then(res => res.json())
    .then(json => {
      if (typeof json.status_code === 'number' && json.status_code !== 1) {
        dispatch(setError(true, json.status_message));
        return Promise.resolve();
      }

      return dispatch(addMovieDetail(id, json));

    })
    .catch(err => console.log(err));
}

export const fetchSimiliarMovies = (id, params = {}) => (dispatch, getState) => {
  if (shouldFetchSimiliarMovies(getState(), id) === false) {
    return Promise.resolve();
  }

  dispatch(requestSimiliarMovies(id));

  return movieApi.similiar(id)
    .then(res => {
      if (res.status !== 200) { return Promise.reject(); }
      return res.json();
    })
    .then(json => {
      return dispatch(receiveSimiliarMovies(id, {
        movies: json.results, 
        page: json.page, 
        pages: json.total_pages 
      }));
    });
}
