import { combineReducers } from 'redux';
import moviesReducer from './movies.reducer';
import genresReducer from './genres.reducers';
import searchReducer from './search.reducer';
import movieDetailReducer from './movie-detail.reducer';
import errorReducer from './error.reducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  genres: genresReducer,
  search: searchReducer,
  movieDetail: movieDetailReducer,
  error: errorReducer
});

export default rootReducer;