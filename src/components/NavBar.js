import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getGenres } from '../store/actions/genres.action';

const NavBar = ({genres, path, active, onBurgerClick, onSearchInputChange, onSearchButtonClick}) => (
  <nav className="navbar is-link">
    <div className="container">

      <div className="navbar-brand">

        <Link 
          className={`navbar-item ${path === '/' ? 'is-active' : ''}`} 
          to="/">
          <span className="icon"><i className="fa fa-film"></i></span>
          <span>Movie</span>
        </Link>

        <a 
          role="button" 
          className={`navbar-burger burger ${active ? 'is-active' : ''}`}
          onClick={onBurgerClick}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      </div>

      <div className={`navbar-menu ${active ? 'is-active' : ''}`}>

        <div className="navbar-start">
          <div className="navbar-item">
            <div className="field has-addons">
              <div className="control">
                <input 
                  className="input search-input" 
                  type="text" 
                  placeholder="Search for movies"
                  onChange={onSearchInputChange}/>
                </div>
              <div className="control">
                <button 
                  className="button search-button"
                  onClick={onSearchButtonClick}>
                  <span className="icon"><i className="fa fa-search"></i></span>
                </button>
              </div>
            </div>
          </div>
          
        </div>

        <div className="navbar-end">

          <Link 
            className={`navbar-item ${path === '/popular' ? 'is-active' : ''}`}
            to="/popular">
            <span className="icon"><i className="fa fa-heart"></i></span>
            <span>Popular</span>
          </Link>

          <Link 
            className={`navbar-item ${path === '/upcoming' ? 'is-active' : ''}`}
            to="/upcoming">
            <span className="icon"><i className="fa fa-calendar"></i></span>
            <span>Upcoming</span>
          </Link>

          <Link 
            className={`navbar-item ${path === '/toprated' ? 'is-active' : ''}`}
            to="/toprated">
            <span className="icon"><i className="fa fa-star"></i></span>
            <span>Top rated</span>
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              <span className="icon"><i className="fa fa-dot-circle-o"></i></span>
              <span>Genre</span>
            </a>
            <div className="navbar-dropdown is-right">
              {genres.map(e => (
                <Link key={e.id} to={`/genre/${e.name}/${e.id}`} className="navbar-item">
                  <span className="icon"><i className="fa fa-dot-circle-o"></i></span>
                  <span>{e.name}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  </nav>
);

const NavBarContainer = ({genres, dispatch}) => {
  const history = useHistory();
  const location = useLocation();
  const [lastPath, setLastPath] = useState(location.pathname);
  const [active, setActive] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(getGenres());
    }
  });
  
  useEffect(() => {
    if (location.pathname !== lastPath) {
      setLastPath(location.pathname);
      setActive(false)
    }
  });

  return (
    <NavBar 
      genres={genres} 
      path={location.pathname}
      active={active}
      onBurgerClick={() => setActive(!active)}
      onSearchInputChange={e => setSearch(e.target.value)}
      onSearchButtonClick={() => {
        if (search.length > 0) {
          history.replace(`/search/${search}`);
        }
      }}
    />)
}

const mapStateToProps = state => {
  return {
    genres: state.genres
  }
}

export default connect(mapStateToProps)(NavBarContainer);
