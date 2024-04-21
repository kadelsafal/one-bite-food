import React, { startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const main = () => {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

export default main;

main();
/*
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <About/>
  </React.StrictMode>
);

export default main;
*/
import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './Components/home/HomePage.js'; // Assuming this is your main component


import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Homepage/>
  </React.StrictMode>
);
