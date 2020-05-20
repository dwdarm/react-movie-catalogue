import React from 'react';
import RatingStars from './RatingStars';

export default props => (
  <article 
    className="card movie-preview is-shadowless"
    style={{borderRadius: '5px'}}>
    
    <div className="card-image">
      <figure 
        className="image is-2by3 has-background-grey-lighter"
        style={{borderRadius: '5px'}}>
        <img 
          className="has-ratio" 
          style={{width: '100%', borderRadius: '5px'}}
          src={`https://image.tmdb.org/t/p/w300/${props.poster_path}`}
          alt={props.title}/>
      </figure>
    </div>
    
    <div className="card-content has-text-centered">
      <p>{props.title}</p>
      <div className="level" style={{marginTop: '1rem'}}>
        <div className="level-item">
          <RatingStars rating={Math.round(props.vote_average/2)}/>
        </div>
      </div>
    </div>
      
  </article>
);
