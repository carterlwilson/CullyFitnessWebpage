import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Client from './Models/Client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  withRouter
} from "react-router-dom";
import Workout from './Components/Workout/Workout'
import { useState, useEffect } from 'react';
import Exercise from './Models/Exercise';
import Select from 'react-select'
import { Button } from '@mui/material';
import NameSelect from './Components/NameSelect/NameSelect';

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route
            path='/workout'
            render={(props) => (
              <Workout {...props}/>
            )}
          />
          <Route path="/">
            <NameSelect />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
