import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetailCredits, selectMovieDetail } from '../features/movie-detail.slice';

const PROFILE_PLACEHOLDER_URL = '/profile-placeholder.png';

const CastList = ({ data }) => {
  const [ showMore, setShowMore ] = useState(false);
  
  let cast = []
  if (showMore) {
    cast = data;
  } else {
    cast = data.slice(0, 8);
  }
  
  return (
  <>
    <div className="columns is-multiline is-mobile">
      {
        cast.map(e => (
          <div key={e.cast_id} className="column is-6-mobile is-3-tablet is-3-desktop">
            <figure className="image" style={{marginBottom:'1rem'}}>
              <img 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  margin:'0 auto'
                }}
                src={e.profile_path 
                  ?`https://image.tmdb.org/t/p/w45${e.profile_path}`
                  : PROFILE_PLACEHOLDER_URL
                }
                alt="" />
            </figure>
            <p className="title is-6 has-text-centered">{e.name}</p>
            <p className="subtitle is-6 has-text-centered">{e.character}</p>
          </div> 
        ))
      }
    </div>  
    
    <div className="field is-grouped is-grouped-centered">
      <div className="control">
        <button 
          className="button"
          onClick={() => setShowMore(true)}>
          Show more
        </button>
      </div>
    </div>
    
  </>
  );
}

const CrewList = ({ data }) => {
  const [ showMore, setShowMore ] = useState(false);
  
  let crew = []
  if (showMore) {
    crew = data;
  } else {
    crew = data.slice(0, 8);
  }
  
  return (
  <>
    <div className="columns is-multiline is-mobile">
      {
        crew.map(e => (
          <div key={e.credit_id} className="column is-6-mobile is-3-tablet is-3-desktop">
            <figure className="image" style={{marginBottom:'1rem'}}>
              <img 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  margin:'0 auto'
                }}
                src={e.profile_path 
                  ?`https://image.tmdb.org/t/p/w45${e.profile_path}`
                  : PROFILE_PLACEHOLDER_URL
                }
                alt="" />
            </figure>
            <p className="title is-6 has-text-centered">{e.name}</p>
            <p className="subtitle is-6 has-text-centered">{e.job}</p>
          </div> 
        ))
      }
    </div>  
    
    <div className="field is-grouped is-grouped-centered">
      <div className="control">
        <button 
          className="button"
          onClick={() => setShowMore(true)}>
          Show more
        </button>
      </div>
    </div>
    
  </>
  );
}

export default ({ id }) => {
  const [ tab, setTab ] = useState('cast');
  const movie = useSelector(selectMovieDetail(id));
  const { cast, crew } = movie.credits;
  const dispatch = useDispatch();
  
  useEffect(() => { 
    dispatch(fetchMovieDetailCredits(id)); 
  });
  
  return (
    <div>
    
      <div className="tabs is-boxed">
        <ul>
          <li className={ tab === 'cast' ? 'is-active' : '' }>
            { /* eslint-disable-next-line */ }
            <a onClick={() => setTab('cast')}>Cast</a>
          </li>
          <li className={ tab === 'crew' ? 'is-active' : '' }>
            { /* eslint-disable-next-line */ }
            <a onClick={() => setTab('crew')}>Crew</a>
          </li>
        </ul>
      </div>
      
      { tab === 'cast'
        ? <CastList data={cast} />
        : <CrewList data={crew} />
      }
      
   </div>
  );
}
