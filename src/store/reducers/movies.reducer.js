const movies = (state = { 
  movies: [], page: 1, pages: 1, isFetching: false, hasMore: true }, { type, payload }) => {

  switch(type) {
    case 'REQUEST_MOVIES':
      return {
        ...state,
        isFetching: true,
        page: payload.page
      }
    case 'RECEIVE_MOVIES':
      return {
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

const moviesBySection = (state = {}, action) => {
  switch(action.type) {
    case 'REQUEST_MOVIES':
    case 'RECEIVE_MOVIES':
      return {
        ...state,
        [action.payload.section]: movies(state[action.payload.section], action)
      }
    default: 
      return state;
  }
}

export default moviesBySection;
