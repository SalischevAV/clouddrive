import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../navbar/Navbar";
import "./app.css";
import Registration from "./../auth/Registration";
import Authorization from "./../auth/Authorization";
import Disk from '../disk/Disk'
import Alert from "./../common/Alert";
import { auth } from '../../redux/actions/userActions';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    dispatch(auth())
  }, []);

  return (
    <Router>
      <div className="app">
        <Alert />
        <Navbar />
        <div className="wrap">
          {!isAuth ? 
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/" component={Authorization} />
              <Redirect to='/' />
            </Switch>
            :
            <Switch>
              <Route exact path="/" component={Disk} />
              <Redirect to='/' />
            </Switch>
          }
        </div>
      </div>
    </Router>
  );
}

export default App;
