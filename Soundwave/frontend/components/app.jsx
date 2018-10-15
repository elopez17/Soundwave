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

const App = () => (
  <div>
    <Modal />
    <HeaderBar />
      <Switch>
        <Route exact path='/' component={HomepageContainer}/>
        <Route exact path='/users/:userId' component={UserPageContainer} />
        <Redirect to='/' />
      </Switch>
  </div>
);

export default App;
