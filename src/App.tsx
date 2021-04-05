import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from './components/TopBar/TopBar';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <TopBar />
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
          <Footer />
        </header>
      </div>
    </Router>
  );
}

export default App;
