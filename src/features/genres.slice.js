import { createSlice } from '@reduxjs/toolkit';
import genresApi from '../api/genres';

export const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    genres: [],
    isFetching: false
  },
  reducers: {
    setGenres: (state, action) => ({
      ...state,
      genres: action.payload
    }),
    setIsFetching: (state, action) => ({
      ...state,
      isFetching: action.payload
    }),
  }
});

function shouldFetchGenres(state) {
  const { genres } = state;
  if (genres.genres.length === 0 && !genres.isFetching) {
    return true;
  }
  
  return false;
}

export const fetchGenres = (params = {}) => async (dispatch, getState) => {
  if (!shouldFetchGenres(getState())) {
    return Promise.resolve();
  }
  
  const { setGenres, setIsFetching } = genresSlice.actions;
  
  dispatch(setIsFetching(true));
  
  const res = await genresApi(params);
  if (res.status === 200) {
    const json = await res.json(); 
    dispatch(setGenres(json.genres));
  }
  
  dispatch(setIsFetching(false));
  
  return Promise.resolve();
}

export const selectGenres = state => state.genres;

export default genresSlice.reducer;
