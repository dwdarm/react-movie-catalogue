import buildUrl from 'build-url';
import { BASE_URL, API_KEY } from './config';

const movie = {

  credits(id, params = {}) {
    return fetch(buildUrl(BASE_URL, {
      path: `movie/${id}/credits`,
      queryParams: { ...params, api_key: API_KEY }
    }));
  },

  detail(id, params = {}) {
    return fetch(buildUrl(BASE_URL, {
      path: `movie/${id}`,
      queryParams: { ...params, api_key: API_KEY }
    }));
  },
  
  similiar(id, params = {}) {
    return fetch(buildUrl(BASE_URL, {
      path: `movie/${id}/similar`,
      queryParams: { ...params, api_key: API_KEY }
    }));
  },

  nowPlaying(params = {}) {
    return fetch(buildUrl(BASE_URL, {
      path: 'movie/now_playing',
      queryParams: { ...params, api_key: API_KEY }
    }));
  },

  popular(params = {}) {
    return fetch(buildUrl(BASE_URL, {
      path: 'movie/popular',
      queryParams: { ...params, api_key: API_KEY }
    }));
  },

  topRated(params = {}) {
    return fetch(buildUrl(BASE_URL, {
      path: 'movie/top_rated',
      queryParams: { ...params, api_key: API_KEY }
    }));
  },

  upcoming(params = {}) {
    return fetch(buildUrl(BASE_URL, {
      path: 'movie/upcoming',
      queryParams: { ...params, api_key: API_KEY }
    }));
  },

}

export default movie;
