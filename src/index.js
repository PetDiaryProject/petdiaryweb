import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Board from "./view/board.js";
import Diary from "./view/diary.js";
import Login from "./view/login.js";
import Register from "./view/register.js";
import Nav from "./view/navbar.js";
import Image from "./view/listImage.js";
import ListBoard from "./view/listBoard.js";

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route exact path='/' ><Nav/><App/></Route>
          <Route path='/login' ><Login></Login></Route>
          <Route path='/register'  ><Register></Register></Route>
          <Route path='/diary' ><Nav/><Diary/></Route>
          <Route path='/board'  ><Nav/><Board/></Route>
          <Route path='/picture' ><Nav/><Image/></Route>
          <Route path='/myboard' ><Nav/><ListBoard/></Route>
        </Switch>
    </Router>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
