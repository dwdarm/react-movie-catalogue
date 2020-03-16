import React from 'react';
import './Layout.css';
import NavBar from '../NavBar';
import Footer from '../Footer';

export default ({children}) => (
  <div className="wrapper">
    <NavBar/>
    <div className="main">
      {children}
    </div>
    <Footer/>
  </div>
);