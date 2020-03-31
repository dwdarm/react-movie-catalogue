import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { getMovie } from '../store/actions/movies.action'

const Movie = props => {
  const [ loading, setLoading ] = useState(false);
  const { id } = useParams();
  const movie = props.movies[id];
  const { error } = props;

  useEffect(() => {
    if (!movie && !loading) {
      setLoading(true);
      props.dispatch(getMovie(id));
    }
  });

  if (error.isError && !movie) {
    return (
      <div className="section">
        <Helmet>
          <title>Error</title>
        </Helmet>
        <div className="container">
          <p className="has-text-centered">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!movie) { 
    return (
      <div className="section">
        <Helmet>
          <title>Loading...</title>
        </Helmet>
        <div className="container">
          <p className="has-text-centered">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <Helmet>
        <title>{movie.title}</title>
      </Helmet>
      <div className="container">
        <div className="columns">

          <div className="column is-4">
            <figure className="image">
              <img src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`} />
            </figure>
          </div>

          <div className="column">
            <h1 className="title">{movie.title}</h1>
            <p className="subtitle">{movie.overview}</p><br/>
            <h3 className="title is-5">Details</h3>
            <table className="table is-narrow">
              <tbody>

                <tr>
                  <th>Rating</th>
                  <td>{movie.vote_average}</td>
                </tr>

                <tr>
                  <th>Tagline</th>
                  <td>{movie.tagline}</td>
                </tr>

                <tr>
                  <th>Release Date</th>
                  <td>{movie.release_date}</td>
                </tr>

                <tr>
                  <th>Runtime</th>
                  <td>{movie.runtime + ' min'}</td>
                </tr>

                <tr>
                  <th>Language</th>
                  <td>{movie.spoken_languages.map(e => e.name).join(' | ')}</td>
                </tr>

                <tr>
                  <th>Genres</th>
                  <td>{movie.genres.map(e => e.name).join(' | ')}</td>
                </tr>

                <tr>
                  <th>Country</th>
                  <td>{movie.production_countries.map(e => e.name).join(' | ')}</td>
                </tr>

                <tr>
                  <th>Cast</th>
                  <td>{movie.cast.map(e => e.name).join(' | ')}</td>
                </tr>

                <tr>
                  <th>Production Companies</th>
                  <td>{movie.production_companies.map(e => e.name).join(' | ')}</td>
                </tr>

                <tr>
                  <th>Crew</th>
                  <td>{movie.crew.map(e => e.name).join(' | ')}</td>
                </tr>
                  
              </tbody>
            </table>
           
          </div>

        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    movies: state.movieDetail,
    error: state.error
  }
}

export default connect(mapStateToProps)(Movie);