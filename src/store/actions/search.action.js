import searchApi from '../../api/search-movie';

const requestSearch = (keyword = '', page = 1) => ({
  type: 'REQUEST_SEARCH',
  payload: { keyword, page }
});

const receiveSearch = (data) => ({
  type: 'RECEIVE_SEARCH',
  payload: {
    keyword: data.keyword, 
    movies: data.movies, 
    page: data.page, 
    pages: data.pages 
  }
});

const invalidateSearch = (keyword = '') => ({
  type: 'INVALIDATE_SEARCH',
  payload: { keyword }
});

const shouldFetchSearch = (state, keyword, page) => {
  const { search } = state; 
  
  if (search.movies.length === 0 && 
      search.isFetching === false &&
      search.hasMore === true) {
    return true;
  }

  if (search.keyword !== keyword) {
    return true;
  }

  if (search.page !== page) {
    return true;
  }

  return false;
}

export const fetchSearch = (keyword, params = {}) => (dispatch, getState) => {
  if (shouldFetchSearch(getState(), keyword, params.page || 1) === false) {
    return Promise.resolve();
  }

  dispatch(invalidateSearch(keyword));
  dispatch(requestSearch(keyword, params.page));

  return searchApi({ query: keyword, ...params })
    .then(res => {
      if (res.status !== 200) { return Promise.reject(); }
      return res.json();
    })
    .then(json => {
      return dispatch(receiveSearch({
        keyword: keyword,
        movies: json.results, 
        page: json.page, 
        pages: json.total_pages
      }));
    })
}
