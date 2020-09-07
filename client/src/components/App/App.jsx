import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./app.css";
import Registration from './../auth/Registration';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="wrap">
        <Switch>
          <Route to='/registration' component={Registration} />
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
