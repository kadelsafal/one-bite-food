import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './Components/home/HomePage.js'; // Assuming this is your main component
import About from './Components/about/About.js';


import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Homepage/>
  </React.StrictMode>
);
