import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/app';
import Home from './components/home';

ReactDOM.render(
  <BrowserRouter>
    <div>
        <Route exact path="/" component={App} />
        <Route path="/home" component={Home} />
    </div>
  </BrowserRouter>
  , document.querySelector('.container'));
