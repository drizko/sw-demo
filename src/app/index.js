import React from 'react';
import SearchGifs from '../gif-search';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './style.css';

const App = () => (
  <Router>
    <Route component={SearchGifs}></Route>
  </Router>
)

export default App
