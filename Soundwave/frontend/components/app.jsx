import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

const App = () => (
  <div>
    <h1>this is from the app</h1>
  </div>
);

// <Switch>
//   <Route exact path='/' component={HomepageContainer}/>
// </Switch>
export default App;
