import React from 'react';
import { ReactComponent as Logo } from '../images//themoviedb-logo.svg';

const Footer = () => (
  <footer className="footer" style={{padding: '1.5rem'}}>
    <div className="container">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <p className="subtitle is-7">Made with <span className="has-text-danger">♥</span> in Tangerang, Indonesia</p>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <Logo style={{width: '150px'}}/>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
