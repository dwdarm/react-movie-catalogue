const search = (state = {
  keyword: '',
  movies: [],
  page: 1,
  pages: 1
}, { type, payload }) => {
  switch(type) {
    case 'ADD_SEARCH':
      return {
        keyword: payload.keyword,
        movies: payload.movies,
        page: payload.page,
        pages: payload.pages
      }
    default: 
      return state;
  }
}

export default search;