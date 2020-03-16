import buildUrl from 'build-url';
import { BASE_URL, API_KEY } from './config';

const searchMovie = params => {
  return fetch(buildUrl(BASE_URL , {
    path: 'search/movie',
    queryParams: { ...params, api_key: API_KEY }
  }));
}

export default searchMovie;