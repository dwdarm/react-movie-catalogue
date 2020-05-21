import React from 'react';
import { Helmet } from "react-helmet";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import MoviesSearch from '../components/MoviesSearch';

export default () => {
  const history = useHistory();
  const location = useLocation();
  const { keyword } = useParams();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page')) || 1;

  return (
    <Layout>
      <div className="section">
        <Helmet>
          <title>Search for {keyword}</title>
        </Helmet>
        <div className="container">
          <h1 className="title is-4">{`Search result for "${keyword}"`}</h1>
          <MoviesSearch page={page} history={history} location={location} keyword={keyword} />
        </div>
      </div>
    </Layout>
  );
}
