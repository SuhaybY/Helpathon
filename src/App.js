import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import {
  HomePage,
  CreateApplication,
  HackathonView,
  InsertUser,
  AllHackathons,
  ViewApplicantHackathon,
} from "./components";

export default function App() {
  return (
    <Router>
      {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hackathon/all">Hackathon</Link>
          </li>
        </ul> */}

      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

const routes = [
  { path: "/applicant/:hackID/apply", component: InsertUser, exact: false },
  {
    path: "/applicant/:hackID",
    component: ViewApplicantHackathon,
  },
  {
    path: "/hackathon/:hackID/create-app",
    component: CreateApplication,
  },
  {
    path: "/hackathon/:hackID",
    component: HackathonView,
  },
  {
    path: "/hackathons",
    component: AllHackathons,
  },
  {
    path: "/",
    component: HomePage,
  },
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
