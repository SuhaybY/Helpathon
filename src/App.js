import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { HomePage, CreateHackathon, HackathonView } from './components';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hackathon">Hackathon</Link>
          </li>
        </ul>

        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

const routes = [
  {
      path: "/hackathon/:hackID",
      component: HackathonView
  },
  {
      path: "/hackathon",
      component: CreateHackathon
  },
  {
      path: "/",
      component: HomePage
  }
];

function RouteWithSubRoutes(route) {
  return (
      <Route
      path={route.path}
      render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
      )}
      />
  );
}