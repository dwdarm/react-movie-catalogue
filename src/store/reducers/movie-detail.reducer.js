const movieDetail = (state = {}, { type, payload }) => {
  switch(type) {
    case 'ADD_MOVIE_DETAIL':
      return {
        ...state,
        [payload.id]: {
          ...payload.movie,
          cast: [],
          crew: []
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