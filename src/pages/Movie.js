import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMovieDetail } from '../store/actions/movies.action';
import Layout from '../components/Layout';
import RatingStars from '../components/RatingStars';
import MoviesSimiliar from '../components/MoviesSimiliar';

const Movie = props => {
  const [ loading, setLoading ] = useState(false);
  const { id } = useParams();
  const movie = props.movies[id];
  const { error } = props;

  useEffect(() => {
    if (!movie && !loading) {
      setLoading(true);
      props.dispatch(getMovieDetail(id)).then(data => {
       if (data) { setLoading(false); }
      });
    }
  });

  if (error.isError && !movie) {
    return (
      <Layout>
      <div className="section">
        <Helmet>
          <title>Error</title>
        </Helmet>
        <div className="container">
          <p className="has-text-centered">{error.message}</p>
        </div>
      </div>
      </Layout>
    );
  }

  if (!movie) { 
    return (
      <Layout>
      <div className="section">
        <Helmet>
          <title>Loading...</title>
        </Helmet>
        <div className="container">
          <p className="has-text-centered">Loading...</p>
        </div>
      </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <section className="hero">
      <Helmet>
        <title>{movie.title}</title>
      </Helmet>
      <div className="hero-body">
        <div className="container">
          <div className="columns">
          
            <div className="column is-narrow">
              <figure 
                className="image"
                style={{borderRadius:'5px'}}>
                <img 
                  style={{width:'300px', borderRadius:'5px', margin:'0 auto'}}
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.title}/>
              </figure>
            </div>
            
            <div className="column">
            
              <h1 className="title">{movie.title}</h1>
              <h2 className="subtitle">{movie.tagline}</h2>
              
              <div className="columns">
                <div className="column">
                  <div className="columns is-mobile">
                    <div className="column is-narrow">
                      <RatingStars rating={Math.round(movie.vote_average/2)}/>
                    </div>
                    <div className="column is-narrow">
                      <p className="has-text-weight-semibold">{movie.vote_average}/10</p>
                    </div>
                  </div>
                </div>
                <div className="column is-narrow">
                  <p className="has-text-grey">{`${movie.runtime} min | ${movie.spoken_languages.map(e => e.name).join(' ')} | ${movie.release_date}`}</p>
                </div>
              </div>
              
              <p className="title is-5 is-spaced" style={{marginTop:'3rem'}}>Synopsis</p>
              <p className="subtitle is-6">{movie.overview}</p>
              
              <p className="title is-5 is-spaced" style={{marginTop:'3rem'}}>Genres</p>
              <div className="tags genres-tags">
                {movie.genres.map(e => (
                  <Link 
                    key={e.id}
                    className="tag is-dark" 
                    to={`/${'genre/' + e.name + '/' + e.id}`}>
                    {e.name}
                  </Link>
                ))}
              </div>
              
            </div>
            
          </div>
        
        </div>
      </div>
    </section>
    
    <div className="section">
      <div className="container">
        <h2 className="title is-4 is-size-5-mobile">Similiar Movies</h2>
        <MoviesSimiliar id={id}/>
      </div>
    </div>
    
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    movies: state.movieDetail,
    error: state.error
  }
}

export default connect(mapStateToProps)(Movie);
