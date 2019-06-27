import * as React from 'react';
import Loadable from 'react-loadable';
import { HashRouter, Redirect, Route } from 'react-router-dom';
// import Home from './views/Home/Index';
// import Topic from './views/Topic/Index';
// import Profile from './views/Profile/Index';
import './App.css';
import Header from './components/Header/Index';

const LoadableHome = Loadable({
  loader: () => import('./views/Home/Index'),
  loading: () => null
})
const LoadableTopic = Loadable({
  loader: () => import('./views/Topic/Index'),
  loading: () => null
})
const LoadableProfile = Loadable({
  loader: () => import('./views/Profile/Index'),
  loading: () => null
})

class App extends React.PureComponent {
  public render() {
    return (
      <div>
        <Header />
        <HashRouter>
          <div className="box">
            <Route exact={true} path="/" component={LoadableHome} />
            <Route path="/topic/:id" component={LoadableTopic} />
            <Route path="/user/:id" component={LoadableProfile} />
            <Route exact={true} path="/topic" render={() => <Redirect to="/" />} />
            <Route exact={true} path="/user" render={() => <Redirect to="/" />} />
          </div>
        </HashRouter>
      </div>
    )
  };
}

export default App;
