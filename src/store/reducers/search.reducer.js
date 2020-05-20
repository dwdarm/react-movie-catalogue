export default (state = { 
  keyword: '', 
  movies: [], 
  page: 1, 
  pages: 1, 
  isFetching: false,
  hasMore: true }, { type, payload }) => {

  switch(type) {
    case 'REQUEST_SEARCH':
      return {
        ...state,
        isFetching: true,
        keyword: payload.keyword,
        page: payload.page
      }
    case 'RECEIVE_SEARCH':
      return {
        keyword: payload.keyword,
        movies: payload.movies,
        page: payload.page,
        pages: payload.pages,
        isFetching: false,
        hasMore: payload.movies.length > 0
      }
    default: 
      return state;
  }
}
