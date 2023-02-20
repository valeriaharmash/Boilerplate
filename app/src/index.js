import './index.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

// root.render(
//   <Router>
//     {/* <Provider store={store}> */}
//     <h1>Hello world</h1>
//     {/* </Provider> */}
//   </Router>
// );
