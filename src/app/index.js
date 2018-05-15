import React from 'react';
import SearchImgs from '../search-imgs';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './style.css';

const App = () => (
  <Router>
    <Route component={SearchImgs}></Route>
  </Router>
)

export default App
