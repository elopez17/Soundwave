import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom';
import HomepageContainer from './home/homepage_container';
import Modal from './modal/modal';
import UserPageContainer from './user/user_page_container';
import SearchContainer from "./search.jsx";
import CollectionContainer from "./collection";
import SongUploadContainer from './song/upload_container';
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
      <Route exact path='/collection' component={CollectionContainer} />
      <Route exact path='/search' component={SearchContainer} />
      <ProtectedRoute exact path='/users/:userId/upload' component={SongUploadContainer} />
      <ProtectedRoute exact path='/users/:userId/collection' component={CollectionContainer} />
      <Redirect to='/' />
    </Switch>
    <WebPlayer />
  </div>
);

export default App;
