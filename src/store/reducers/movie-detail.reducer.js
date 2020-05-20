const movieDetail = (state = {}, { type, payload }) => {
  switch(type) {
    
    case 'ADD_MOVIE_DETAIL':
      return {
        ...state,
        [payload.id]: {
          ...payload.movie,
          cast: [],
          crew: [],
          similiar: {
            movies: [], 
            page: 1, 
            pages: 1, 
            isFetching: false, 
            hasMore: true
          }
        }
      }
      
    case 'REQUEST_SIMILIAR_MOVIES':
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          similiar: {
            ...state[payload.id].similiar,
            isFetching: false,
          }
        }
      }
      
    case 'RECEIVE_SIMILIAR_MOVIES':
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          similiar: {
            movies: payload.movies,
            page: payload.page,
            pages: payload.pages,
            isFetching: false,
            hasMore: payload.movies.length > 0
          }
        }
      }
      
    case 'ADD_MOVIE_CREDITS':
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          cast: payload.cast,
          crew: payload.crew
        }
      }
      
    default: 
      return state;
  }
}

export default movieDetail;
