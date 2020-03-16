import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getGenres } from '../store/actions/genres.action';

const NavBar = ({genres, path, onSearch}) => (
  <nav className="navbar is-dark is-fixed-top">
    <div className="container">

      <div className="navbar-brand">

        <Link 
          className={`navbar-item ${path === '/' ? 'is-active' : ''}`} 
          to="/">
          <b>Movies</b>
        </Link>

        <a 
          role="button" 
          id="navbar-trigger"
          className="navbar-burger burger" 
          onClick={e => {
            document.getElementById('navbar-trigger').classList.toggle('is-active');
            document.getElementById('navbar-menu-target').classList.toggle('is-active');
          }}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

      </div>

      <div id="navbar-menu-target" className="navbar-menu">
        <div className="navbar-start">

          <Link 
            className={`navbar-item ${path === '/popular' ? 'is-active' : ''}`}
            to="/popular">
            Popular
          </Link>

          <Link 
            className={`navbar-item ${path === '/upcoming' ? 'is-active' : ''}`}
            to="/upcoming">
            Upcoming
          </Link>

          <Link 
            className={`navbar-item ${path === '/toprated' ? 'is-active' : ''}`}
            to="/toprated">
            Top Rated
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Genres</a>
            <div className="navbar-dropdown">
              {genres.map(e => (
                <Link key={e.id} to={`/genre/${e.name}/${e.id}`} className="navbar-item">{e.name}</Link>
              ))}
            </div>
          </div>

          <div className="navbar-item">
            <input 
              className="input" 
              type="text" 
              placeholder="Search for movies"
              onChange={onSearch}
            />
          </div>

        </div>
      </div>

    </div>
  </nav>
);

const NavBarContainer = ({genres, dispatch}) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(getGenres());
    }
  });

  return (
    <NavBar 
      genres={genres} 
      path={location.pathname}
      onSearch={e => {
        if (e.target.value.length > 1) {
          history.replace(`/search/${e.target.value}`);
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