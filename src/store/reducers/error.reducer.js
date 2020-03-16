const error = (state = { isError: false, message: '' }, { type, payload }) => {
  switch(type) {
    case 'SET_ERROR':
      return {
        isError: payload.isError,
        message: payload.message || ''
      }
    case 'CLEAR_ERROR':
      return { isError: false, message: '' }
    default:
      return state;
  }
}

export default error;