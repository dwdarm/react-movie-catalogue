import React from 'react';
import { Helmet } from "react-helmet";
import { useHistory, useLocation } from 'react-router-dom';
import { getNowPlayingMovies } from '../store/actions/movies.action';
import movies from '../components/Movies';

export default () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page')) || 1;
  const Movies = movies('nowPlaying');

  return (
    <div className="section">
      <Helmet>
        <title>Movies Catalogue</title>
      </Helmet>
      <div className="container">

        <h1 className="title is-4">In Theatres</h1>

        <Movies 
          page={page} 
          history={history} 
          location={location}
          onLoadMovies={getNowPlayingMovies} 
        />

      </div>
    </div>
  );
}