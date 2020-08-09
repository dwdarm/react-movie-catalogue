import { configureStore } from '@reduxjs/toolkit';
import genresReducer from '../features/genres.slice';
import movieListReducer from '../features/movie-list.slice';
import movieDetailReducer from '../features/movie-detail.slice';

export default configureStore({
  reducer: {
    genres: genresReducer,
    movieList: movieListReducer,
    movieDetail: movieDetailReducer,
  }
});
