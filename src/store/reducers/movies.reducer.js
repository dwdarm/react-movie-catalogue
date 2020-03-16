const movies = (state = {}, { type, payload }) => {
  switch(type) {
    case 'ADD_MOVIES':
      return {
        ...state,
        [payload.section]: {
          movies: payload.movies,
          page: payload.page,
          pages: payload.pages
        }
      }
    default: 
      return state;
  }
}

export default movies;