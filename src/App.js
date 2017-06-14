import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios';
import './App.css';
import Movielist from './components/movielist';
import Moviedetail from './components/moviedetail'
import Main from './components/main'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moviels: [],
      search: "",
      moviedetail: []
    };
  }
  
  gettopratedmovies(){
     axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&page=1')
      .then(res => {
        this.setState({ moviels: res.data.results });
      });      
  }
  getpopularmovies(){
    axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&page=1')
      .then(res => {
        this.setState({ moviels: res.data.results });
      });    
  }
  getsearch() {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&query="` + this.state.search)
      .then(res => {
        this.setState({ moviels: res.data.results });
      });
  }
  getmoviedetail(id){
    axios.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US")
    .then(res => {
      this.setState({ moviedetail: res.data.results });
    });  
  }

  searchvalue(e){
    this.setState(
      {search: e.target.value}
    )
    this.getsearch()
  }

  
  render() {
    return (
      <Router>
        <div className="App">
        <div className="navbar">
            <Link to="/">Home</Link>
            <a onClick={this.getpopularmovies.bind(this)}>Popular Movies</a>
            <a onClick={this.gettopratedmovies.bind(this)}>{this.state.movieid}</a>
            <input className="navbarsearch" onChange={this.searchvalue.bind(this)}/>
        </div>
            <Route exact path={"/moviedetail"} component={() => <Moviedetail moviedetailprop={this.state.moviedetail}/>}/>
            <Route exact path={"/"} component={() => <Movielist movielsprop={this.state.moviels} setid={this.getmoviedetail.bind(this)}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
