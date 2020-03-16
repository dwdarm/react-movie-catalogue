import React from 'react';
import './MoviePreview.css';

export default props => (
  <div className="image is-2by3 movie-preview-container">

    <div className="movie-preview-rating">
      <p><b>Rating: {props.vote_average}</b></p>
    </div>

    <div className="movie-preview-title">
      <p><b>{`${props.title} (${props.release_date})`}</b></p>
    </div>

    <div 
      className="movie-preview-cover"
      style={{backgroundImage: `url(https://image.tmdb.org/t/p/w300/${props.poster_path})`}}>
    </div>

    <div className="movie-preview-overlay"></div>


  </div>
);