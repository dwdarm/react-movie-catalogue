import React from 'react';
import { Helmet } from "react-helmet";
import { useHistory, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import Movies from '../components/MoviesSection';

const Index = ({ title, section }) => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page')) || 1;

  return (
    <Layout>
      <div className="section">
        <Helmet>
          <title>{title || 'Movies'} - Movie Catalogue</title>
        </Helmet>
        <div className="container">
          <h1 className="title is-size-5-mobile">{title || 'Movies'}</h1>
          <Movies section={section} page={page} history={history} location={location} />
        </div>
      </div>
    </Layout>
  );
}

export default Index;
