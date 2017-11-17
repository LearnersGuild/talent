import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter} from 'react-router-dom';

import App from './components/app'
import reducers from './reducers'

ReactDOM.hydrate(
  <Provider store={createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
