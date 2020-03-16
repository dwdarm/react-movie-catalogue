const genres = (state = [], { type, payload }) => {
  switch(type) {
    case 'ADD_GENRES':
      return payload.genres;
    default: 
      return state;
  }
}

export default genres;