import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './navbar/Navbar';
import Routes from './routs/Routes'

const App = () => (
  <>
    <Navbar />
    <Routes />
  </>
);

export default App;