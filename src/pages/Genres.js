import React from 'react';
import { Helmet } from "react-helmet";
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import MoviesGenre from '../components/MoviesGenre';

export default () => {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const { genre, genreId } = params;
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page')) || 1;

  return (
    <Layout>
      <div className="section">
        <Helmet>
          <title>{genre} Movies</title>
        </Helmet>
        <div className="container">
          <h1 className="title is-4">{`${genre} Movies`}</h1>
          <MoviesGenre 
            page={page} 
            genre={genre}
            genreId={genreId}
            history={history} 
            location={location} 
          />
        </div>
      </div>
    </Layout>
  );
}
