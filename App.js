import React from 'react';
import logo from './logo.svg';
import './App.css';
import "./css/application.css";

import {BrowserRouter as Router,Route} from 'react-router-dom';
import MockAPI from './components/Mock';
import Signup from './components/Signup';
import ViewForm from './components/View';
import Welcome from './components/Welcome';
import Edit from './components/Edit';

function App() {
  return (
    <div>
        {/* <MockAPI /> */}
        
        <Router>
          <Route path="/" component={Welcome}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/view" component={ViewForm}></Route>
          <Route path="/edit" component={Edit}></Route>
        </Router>
      
    </div>
  );
}

export default App;
