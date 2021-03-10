import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopBar from './components/TopBar/TopBar';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <TopBar />
        </header>
      </div>
    </Router>
  );
}

export default App;
