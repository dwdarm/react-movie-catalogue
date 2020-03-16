import genresApi from '../../api/genres';

export const getGenres = (params = {}) => {
  return (dispatch) => {
    genresApi(params)
    .then(res => {
      if (res.status === 200) { return res.json(); }
      Promise.reject();
    })
    .then(json => {
      dispatch({
        type: 'ADD_GENRES',
        payload: { genres: json.genres }
      });
    })
    .catch(err => console.log(err));
  }
}