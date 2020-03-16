import buildUrl from 'build-url';
import { BASE_URL, API_KEY } from './config';

const genres = params => {
  return fetch(buildUrl(BASE_URL , {
    path: 'genre/movie/list',
    queryParams: { ...params, api_key: API_KEY }
  }));
}

export default genres;