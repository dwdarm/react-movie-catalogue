import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
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
          <Route path="/movie/:id" ><Movie/></Route>
          <Route path="/search/:keyword"><Search/></Route>
          <Route path="/genre/:genre/:genreId"><Genres/></Route>
          <Route path="/toprated"><Index title="Top Rated Movies" section="topRated"/></Route>
          <Route path="/upcoming"><Index title="Upcoming Movies" section="upcoming"/></Route>
          <Route path="/popular"><Index title="Popular Movies" section="popular"/></Route>
          <Route path="/"><Index title="In Theatres" section="nowPlaying"/></Route>
        </Switch>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
