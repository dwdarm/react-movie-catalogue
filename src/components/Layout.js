import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default ({children}) => (
  <div className="main">
    <NavBar/>
    <div className="main-content">
      {children}
    </div>
    <Footer/>
  </div>
);
