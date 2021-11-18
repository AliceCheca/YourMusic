import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

<meta http-equiv="Content-Security-Policy" 
content="upgrade-insecure-requests"></meta>

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

