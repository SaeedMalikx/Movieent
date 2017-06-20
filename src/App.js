import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase'
import './App.css';
import Movielist from './components/movielist';
import Moviedetail from './components/moviedetail';
import Firebaselogin from './components/firebaselogin'
import Favorites from './components/favorites'
import Main from './components/main';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionHome from 'material-ui/svg-icons/action/home';
import Search from 'material-ui/svg-icons/action/search';
import Snackbar from 'material-ui/Snackbar';



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
      favopen: false,
      searchopen: false,
      genres: [],
      page: 1,
      apikey: "14d069109bafe2681aa95ad4b60d2a91",
      snackopen: false
    };
  }



  openlogin = () => {
    this.setState({loginopen: true})
  }
  openfav = () => {
    this.setState({favopen: true})
  }

  signout = () => {
    firebase.auth().signOut();
 
  }


  watchlater = () => {
      
    const user = firebase.auth().currentUser;
    const value =  this.state.moviedetail.id
    if (user != null) {
    firebase.database().ref('/users/'+ user.uid + '/' + this.state.moviedetail.title).set({value});
    this.setState({snackopen: true})
    }
  }

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  opensearch = (event) => {
    event.preventDefault();

    this.setState({
      searchopen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
      loginopen: false,
      favopen: false,
      searchopen: false,
      snackopen: false
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
      moviedetail: [],
      snackopen: false
    });
  }

  movielsfiltertop = () => {
    this.setState({moviels: [], page: 1, movieurl: "movie/top_rated?"}, () => {this.getmovie()});
  }
  movielsfilterup = () => {
    this.setState({moviels: [], page: 1, movieurl: "movie/now_playing?"}, () => {this.getmovie()});
  }
  movielsfilterpop = () => {
    this.setState({moviels: [], page: 1, movieurl: "discover/movie?sort_by=popularity.desc&"}, () => {this.getmovie()});
  }

  getmovie = () => {
    if (this.state.page === 1){
     axios.get('https://api.themoviedb.org/3/' + this.state.movieurl + 'api_key=' + this.state.apikey + '&language=en-US&page=' + this.state.page)
      .then(res => {
        this.setState({ moviels: res.data.results });
      })} else {
      axios.get('https://api.themoviedb.org/3/' + this.state.movieurl + 'api_key=' + this.state.apikey + '&language=en-US&page=' + this.state.page)
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
    e.preventDefault();
    this.setState(
      {moviels: [], search: e.target.value}, () => {this.getsearch()}
    )
  }

  setpagenumber = () => {
    this.setState({page: this.state.page + 1}, () =>{
    this.getmovie()})
  }

  
  render() {
    const actions = [
      <RaisedButton
        label="Watch Later"
        primary={true}
        onTouchTap={this.watchlater}
      />,
      <RaisedButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    const user = firebase.auth().currentUser;
    let button = null
    if (user != null) {
      button =   <IconMenu
                  iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem primaryText="Favorites" onClick={this.openfav}/>
                  <MenuItem primaryText="Sign out" onClick={this.signout}/>
                </IconMenu>
    } else  {
      button = <RaisedButton label="Login" secondary={true} onClick={this.openlogin} />
    }
    
    return (
      <Router>
        <div className="App">
          <div className="navbar">
              
                <IconButton>
                  <ActionHome />
                </IconButton>
                <RaisedButton onTouchTap={this.handleTouchTap} primary={true} label="Movies"/>
                
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
                <Popover
                  open={this.state.searchopen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}
                >
                  <input className="navbarsearch" onChange={this.searchvalue} placeholder="Search Movies" />
                </Popover>
                <span className="filler"/>
                <IconButton tooltip="Search" touch={true} tooltipPosition="bottom-center" onClick={this.opensearch}>
                  <Search />
                </IconButton>                
                <IconButton tooltip="Favorites" touch={true} tooltipPosition="bottom-center" onClick={this.openfav}>
                  <ActionGrade />
                </IconButton>
                {button}
          </div>

            <Dialog title={this.state.moviedetail.title} 
              autoScrollBodyContent={true} 
              actions={actions} modal={false} 
              open={this.state.popopen} 
              onRequestClose={this.handleClose} 
              titleClassName="detailtitle"
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
 
            <Dialog modal={false} open={this.state.loginopen} onRequestClose={this.handleRequestClose} autoDetectWindowHeight={true}>
                <Firebaselogin closeloginform={this.handleRequestClose}/>
            </Dialog>

            <Dialog modal={false} open={this.state.favopen} onRequestClose={this.handleRequestClose}>
                <Favorites/>
            </Dialog>

            <Snackbar
              open={this.state.snackopen}
              message="Added to Favorites"
              autoHideDuration={500}
            />

            <Route exact path={"/"} component={() => <Movielist movielsprop={this.state.moviels} setid={this.getmoviedetail} setpage={this.setpagenumber} />}/>
        </div>
      </Router>
    );
  }
}

export default App;


