import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Layout from './components/Layout';
import Index from './pages/Index';
import Popular from './pages/Popular';
import Upcoming from './pages/Upcoming';
import Toprated from './pages/Toprated';
import Genres from './pages/Genres';
import Search from './pages/Search';
import Movie from './pages/Movie';

const store = configureStore();

function App() {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/movie/:id"><Movie/></Route>
            <Route path="/search/:keyword"><Search/></Route>
            <Route path="/genre/:genre/:genreId"><Genres/></Route>
            <Route path="/toprated"><Toprated/></Route>
            <Route path="/upcoming"><Upcoming/></Route>
            <Route path="/popular"><Popular/></Route>
            <Route path="/:page"><Index/></Route>
            <Route path="/"><Index/></Route>
          </Switch>
        </Layout>
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
