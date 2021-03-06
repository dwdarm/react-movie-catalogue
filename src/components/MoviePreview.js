import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import RatingStars from './RatingStars';

const MoviePreview = ({ movie }) => (
  <article 
    className="card movie-preview is-shadowless"
    style={{borderRadius: '5px'}}>
    
    <div className="card-image">
      { movie 
        ? <figure 
            className="image is-2by3 has-background-grey-lighter"
            style={{borderRadius: '5px'}}>
            <LazyLoadImage
              alt=""
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              className="has-ratio" 
              style={{width: '100%', borderRadius: '5px'}}
            />
          </figure> 
        : <Skeleton style={{paddingTop:'150%'}} />
      }
    </div>
    
    <div className="card-content has-text-centered">
    
      { movie ? <p>{movie.title}</p> : <Skeleton/> }
      
      { movie ? 
        <div className="level" style={{marginTop: '1rem'}}>
          <div className="level-item">
            <RatingStars rating={Math.round(movie.vote_average/2)}/>
          </div>
        </div> : 
        <Skeleton/> 
      }
      
    </div>
      
  </article>
);

export default MoviePreview;
