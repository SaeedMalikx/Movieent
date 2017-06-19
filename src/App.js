import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase'
import './App.css';
import Movielist from './components/movielist';
import Moviedetail from './components/moviedetail';
import Firebaselogin from './components/firebaselogin'
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
      loginopen: false,
      genres: [],
      page: 1,
      moviefilter: "",
      apikey: "14d069109bafe2681aa95ad4b60d2a91",
      email: "saeedmalik360@gmail.com",
      password: "helloworld",
      uinfo: []
    };
  }

  openlogin = () => {
    this.setState({loginopen: true})
  }

  signout = () => {
    firebase.auth().signOut()
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
      open: false,
      loginopen: false
    })
  }

  handleOpen = () => {
    this.setState({
      popopen: true,
      loginopen: false
    })
  }

  handleClose = () => {
    this.setState({
      popopen: false,
      moviedetail: []
    });
  }

  movielsfiltertop = () => {
    this.setState({moviels: [], moviefilter: "toprated", page: 1}, () => {this.gettopratedmovies()});
  }
  movielsfilterup = () => {
    this.setState({moviels: [], moviefilter: "upcoming", page: 1}, () => {this.getupcomingmovies()});
  }
  movielsfilterpop = () => {
    this.setState({moviels: [], moviefilter: "popular", page: 1}, () => {this.getpopularmovies()});
  }
  gettopratedmovies = () =>{
    if (this.state.page === 1){
     axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=' + this.state.apikey + '&language=en-US&page=' + this.state.page)
      .then(res => {
        this.setState({ moviels: res.data.results });
      })} else {
      axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=' + this.state.apikey + '&language=en-US&page=' + this.state.page)
      .then(res => {
        this.setState({ moviels: this.state.moviels.concat(res.data.results) });
      })  
      }      
  }
  getupcomingmovies = () =>{
    if (this.state.page === 1){
     axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=' + this.state.apikey + '&language=en-US&page=' + this.state.page)
      .then(res => {
        this.setState({ moviels: res.data.results });
      })} else {
      axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=' + this.state.apikey + '&language=en-US&page=' + this.state.page)
      .then(res => {
        this.setState({ moviels: this.state.moviels.concat(res.data.results) });
      })  
      }      
  }
  getpopularmovies = () => {
    if (this.state.page === 1){
     axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + this.state.apikey + '&language=en-US&page=' + this.state.page)
      .then(res => {
        this.setState({ moviels: res.data.results });
      })} else {
      axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + this.state.apikey + '&language=en-US&page=' + this.state.page)
      .then(res => {
        this.setState({ moviels: this.state.moviels.concat(res.data.results) });
      })  
      }    
  }
  getsearch = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&query="` + this.state.search)
      .then(res => {
        this.setState({ moviels: res.data.results });
      });
  }
  getmoviedetail = (id) => {
    axios.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + this.state.apikey + "&language=en-US")
    .then(res => {
      this.setState({ moviedetail: res.data, genres: res.data.genres });
    });
    this.setState({popopen: true});  
  }

  searchvalue = (e) => {
    this.setState(
      {moviels: [], search: e.target.value}, () => {this.getsearch()}
    )
  }

  setpagenumber = () => {
    this.setState({page: this.state.page + 1}, () =>{
    switch (this.state.moviefilter) {
        case "popular":
          this.getpopularmovies()
          break
        case "toprated":
          this.gettopratedmovies()
          break
        case "upcoming":
          this.getupcomingmovies()
          break
        default:
          console.log("must have category selected")
    }})
  }

  
  render() {
    const actions = [
      <RaisedButton
        label="Watch Later"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    
    return (
      <Router>
        <div className="App">
          <div className="navbar">
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
                    <MenuItem onClick={this.movielsfilterpop} primaryText="Popular" />
                    <MenuItem onClick={this.movielsfiltertop} primaryText="Top Rated" />
                    <MenuItem onClick={this.movielsfilterup} primaryText="In Theatre" />
                  </Menu>
                </Popover>
              </div>
              
                <input className="navbarsearch" onChange={this.searchvalue} placeholder={this.state.uinfo.uid}/>
                <RaisedButton label="home" primary={true} onClick={this.openlogin} />
              
              <div>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  
                >
                  <MenuItem primaryText="Watch List" />
                  <MenuItem primaryText="Settings" />
                  <MenuItem onClick={this.signout} primaryText="Logout" />
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
            <Dialog
                modal={false}
                open={this.state.loginopen}
                onRequestClose={this.handleRequestClose}
              >
                <Firebaselogin closeloginform={this.handleRequestClose}/>
              </Dialog>

            <Route exact path={"/"} component={() => <Movielist 
                                                      movielsprop={this.state.moviels} 
                                                      setid={this.getmoviedetail} 
                                                      setpage={this.setpagenumber}
                                                      />}/>
        </div>
      </Router>
    );
  }
}

export default App;


