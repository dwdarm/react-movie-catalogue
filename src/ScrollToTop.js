import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ScrollToTop = ({children}) => {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === 'PUSH') {
        window.scrollTo(0, 0);
      }
    });
    return () => {
      unlisten();
    }
  });
  
  return <>{children}</>
}

export default ScrollToTop;
