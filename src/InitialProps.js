import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchGenres, selectGenres } from './features/genres.slice';

const Loading = () => (
  <div 
    className="columns is-mobile is-centered is-vcentered" 
    style={{ height: '100vh' }}>
    
    <div className="column is-narrow">
      <Loader type="Audio" color="#363636" height={80} width={80} />
    </div>
    
  </div>
);

const InitialProps = ({ children }) => {
  const { isFetching } = useSelector(selectGenres);
  const dispatch = useDispatch();
  const [ isFullfiled, setIsFullfiled ] = useState(false);
  
  useEffect(() => {
   dispatch(fetchGenres()).then(() => setIsFullfiled(true))
  });
  
  if (!isFullfiled || isFetching) {
    return <Loading/>
  }
  
  return <>{ children }</>
}

export default InitialProps;
