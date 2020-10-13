import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';

ReactDOM.render(
  <Router>
    <Route path="/products/:id(\d+)" component={App} />
  </Router>,
  document.getElementById('reviews-service'),
);
