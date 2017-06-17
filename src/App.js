import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Movielist from './components/movielist';
import Moviedetail from './components/moviedetail';
import Main from './components/main';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moviels: [],
      search: "",
      moviedetail: [],
      open: false,
      popopen: false,
      genres: []
    };
  }

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  handleOpen = () => {
    this.setState({popopen: true});
  }

  handleClose = () => {
    this.setState({
      popopen: false,
      moviedetail: []
    });
  }

  gettopratedmovies = () =>{
     axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&page=1')
      .then(res => {
        this.setState({ moviels: res.data.results });
      });      
  }
  getupcomingmovies = () =>{
     axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&page=1')
      .then(res => {
        this.setState({ moviels: res.data.results });
      });      
  }
  getpopularmovies = () => {
    axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&page=1')
      .then(res => {
        this.setState({ moviels: res.data.results });
      });    
  }
  getsearch = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&query="` + this.state.search)
      .then(res => {
        this.setState({ moviels: res.data.results });
      });
  }
  getmoviedetail = (id) => {
    axios.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US")
    .then(res => {
      this.setState({ moviedetail: res.data, genres: res.data.genres });
    });
    this.setState({popopen: true});  
  }

  searchvalue = (e) => {
    this.setState(
      {search: e.target.value}
    )
    this.getsearch()
  }

  
  render() {
    const actions = [
      <RaisedButton
        label="Watch Later"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <Router>
        <div className="App">
          <div className="navbar">
              <Link to="/"><RaisedButton label="Home" primary={true} /></Link>
              <div>
                <RaisedButton
                  onTouchTap={this.handleTouchTap}
                  label="Movies"
                />
                <Popover
                  open={this.state.open}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}
                >
                  <Menu>
                    <MenuItem onClick={this.getpopularmovies} primaryText="Popular" />
                    <MenuItem onClick={this.gettopratedmovies} primaryText="Top Rated" />
                    <MenuItem onClick={this.getupcomingmovies} primaryText="In Theatre" />
                  </Menu>
                </Popover>
              </div>
              
                <input className="navbarsearch" onChange={this.searchvalue} placeholder="Search Movies and TV Shows"/>
              
              <div>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  
                >
                  <MenuItem primaryText="Watch List" />
                  <MenuItem primaryText="Settings" />
                  <MenuItem primaryText="Logout" />
                </IconMenu>
              </div>
          </div>
            <Dialog
                title={this.state.moviedetail.title}
                actions={actions}
                modal={false}
                open={this.state.popopen}
                onRequestClose={this.handleClose}
              >
              <div className="chipcontainer">
                {this.state.genres.map(chip => 
                    <div key={chip.id}>
                        <div className="chip">
                            <span >{chip.name}</span>
                        </div>
                    </div>
                )}
              </div>
               <Moviedetail moviedetailprop={this.state.moviedetail}/>
              </Dialog>
            <Route exact path={"/"} component={() => <Movielist movielsprop={this.state.moviels} setid={this.getmoviedetail}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;


