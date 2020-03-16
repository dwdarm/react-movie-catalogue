import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { searchMovies } from '../store/actions/search.action';
import movies from '../components/Movies';

export default () => {
  const history = useHistory();
  const location = useLocation();
  const { keyword } = useParams();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page')) || 1;
  const Movies = movies('nowPlaying');

  return (
    <div className="section">
      <div className="container">

        <h1 className="title is-4">{`Search result for "${keyword}"`}</h1>

        <Movies 
          page={page} 
          history={history} 
          location={location}
          keyword={keyword}
          onLoadMovies={searchMovies} 
        />

      </div>
    </div>
  );
}