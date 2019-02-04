import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import HomepageContainer from './home/homepage_container';
import Modal from './modal/modal';
import UserPageContainer from './user/user_page_container';
import HeaderBar from './header/header';
import WebPlayer from './player';
import { ProtectedRoute, AuthRoute } from '../util/route_util';

const App = () => (
  <div className="App">
    <Modal />
    <HeaderBar />
    <Switch>
      <AuthRoute exact path='/' component={HomepageContainer}/>
      <Route exact path='/users/:userId' component={UserPageContainer} />
      <Redirect to='/' />
    </Switch>
    <WebPlayer />
  </div>
);

export default App;
