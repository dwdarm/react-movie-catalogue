import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Layout from './components/Layout';
import Index from './pages/Index';
import Genres from './pages/Genres';
import Search from './pages/Search';
import Movie from './pages/Movie';

const store = configureStore();

function App() {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/movie/:id"><Layout><Movie/></Layout></Route>
          <Route path="/search/:keyword"><Layout><Search/></Layout></Route>
          <Route path="/genre/:genre/:genreId"><Layout><Genres/></Layout></Route>
          <Route path="/toprated"><Layout><Index title="Top Rated Movies" section="topRated"/></Layout></Route>
          <Route path="/upcoming"><Layout><Index title="Upcoming Movies" section="upcoming"/></Layout></Route>
          <Route path="/popular"><Layout><Index title="Popular Movies" section="popular"/></Layout></Route>
          <Route path="/"><Layout><Index title="In Theatres" section="nowPlaying"/></Layout></Route>
        </Switch>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
