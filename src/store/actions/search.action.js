import searchApi from '../../api/search-movie';

export const searchMovies = ({keyword, page}) => {
  return (dispatch) => {
    searchApi({query: keyword, page})
    .then(res => {
      if (res.status === 200) { return res.json(); }
      Promise.reject();
    })
    .then(json => {
      dispatch({
        type: 'ADD_SEARCH',
        payload: { 
          keyword: keyword,
          movies: json.results, 
          page: json.page, 
          pages: json.total_pages 
        }
      });
    })
    .catch(err => console.log(err));
  }
} 