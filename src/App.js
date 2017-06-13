import React, { Component } from 'react';
import './App.css';
import Movielist from './components/movielist';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moviels: []
    };
  }
  render() {
    return (
      <div className="App">
       <div className="navbar">
          <a href="#home">Home</a>
          <a href="#news">Popular Movies</a>
          <a href="#contact">Top Rated Movies</a>
          <input className="navbarsearch"/>
       </div>
       <Movielist/> 
      </div>
    );
  }
}

export default App;
