import movieApi from '../../api/movie';
import discoverApi from '../../api/discover-movie';

const setError = (isError = true, message = '') => {
  return {
    type: 'SET_ERROR',
    payload: {
      isError: isError,
      message: message
    }
  }
}

const clearError = () => {
  return { type: 'CLEAR_ERROR' }
}

export const getNowPlayingMovies = params => {
  return (dispatch) => {
    movieApi.nowPlaying(params)
    .then(res => {
      if (res.status === 200) { return res.json(); }
      Promise.reject();
    })
    .then(json => {
      dispatch({
        type: 'ADD_MOVIES',
        payload: { 
          section: 'nowPlaying', 
          movies: json.results, 
          page: json.page, 
          pages: json.total_pages 
        }
      });
    })
    .catch(err => console.log(err));
  }
}

export const getPopularMovies = params => {
  return (dispatch) => {
    movieApi.popular(params)
    .then(res => {
      if (res.status === 200) { return res.json(); }
      Promise.reject();
    })
    .then(json => {
      dispatch({
        type: 'ADD_MOVIES',
        payload: { 
          section: 'popular', 
          movies: json.results, 
          page: json.page, 
          pages: json.total_pages 
        }
      });
    })
    .catch(err => console.log(err));
  }
}

export const getUpcomingMovies = params => {
  return (dispatch) => {
    movieApi.upcoming(params)
    .then(res => {
      if (res.status === 200) { return res.json(); }
      Promise.reject();
    })
    .then(json => {
      dispatch({
        type: 'ADD_MOVIES',
        payload: { 
          section: 'upcoming', 
          movies: json.results, 
          page: json.page, 
          pages: json.total_pages 
        }
      });
    })
    .catch(err => console.log(err));
  }
}

export const getTopRatedMovies = params => {
  return (dispatch) => {
    movieApi.topRated(params)
    .then(res => {
      if (res.status === 200) { return res.json(); }
      Promise.reject();
    })
    .then(json => {
      dispatch({
        type: 'ADD_MOVIES',
        payload: { 
          section: 'topRated', 
          movies: json.results, 
          page: json.page, 
          pages: json.total_pages 
        }
      });
    })
    .catch(err => console.log(err));
  }
}

export const getMoviesByGenre = ({genreId, genre, page}) => {
  return (dispatch) => {
    discoverApi({
      with_genres: genreId,
      page: page
    })
    .then(res => {
      if (res.status === 200) { return res.json(); }
      Promise.reject();
    })
    .then(json => {
      dispatch({
        type: 'ADD_MOVIES',
        payload: { 
          section: genre, 
          movies: json.results, 
          page: json.page, 
          pages: json.total_pages 
        }
      });
    })
    .catch(err => console.log(err));
  }
}

export const getMovie = (id, params = {}) => {
  return (dispatch) => {
    dispatch(clearError());
    movieApi.detail(id, params)
    .then(res => res.json())
    .then(json => {
      if (typeof json.status_code === 'number' && json.status_code !== 1) {
        return dispatch(setError(true, json.status_message));
      }

      dispatch({
        type: 'ADD_MOVIE_DETAIL',
        payload: { id, movie: json }
      });

      movieApi.credits(id)
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: 'ADD_MOVIE_CREDITS',
          payload: { id, cast: json.cast, crew: json.crew }
        });
      })

    })
    .catch(err => console.log(err));
  }
}