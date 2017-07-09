import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase'
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Movielist from './components/movielist';
import Genresmovielist from './components/genresmovielist'
import Moviedetail from './components/moviedetail';
import Firebaselogin from './components/firebaselogin'
import Favorites from './components/favorites'
import Snacks from './components/snacks'
import Intro from './components/intro'
import People from './components/people'
import Moviemenu from './components/menu'
import About from './components/about'

import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import Search from 'material-ui/svg-icons/action/search';
import Drawer from 'material-ui/Drawer';
import Star from 'material-ui/svg-icons/toggle/star';
import {grey50} from 'material-ui/styles/colors';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moviels: [],
      movielsgenre: [],
      search: "",
      moviedetail: [],
      currentcat: "Movieent",
      open: false,
      popopen: false,
      loginopen: false,
      favopen: false,
      searchopen: false,
      genres: [],
      page: 1,
      genrepage: 1,
      genreid: "",
      apikey: "14d069109bafe2681aa95ad4b60d2a91",
      snackopen: false,
      nofavopen: false,
      favlist: [],
      isloggedin: null,
      nomovie: "",
      moviecast: [],
      castmovie: [],
      castmovieinfo: [],
      popcast: []
    };
  }
 
  componentDidMount = () => {
    this.getpopularcast()

    firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
          this.setState({isloggedin: true})
            firebase.database().ref('users').child(user.uid).on('value', snap =>{
                
                if (snap.val()) {
                    let items = snap.val();
                    let movietransfer = [];
                    for (let item in items) {
                      movietransfer.push({
                        id: item,
                        title: items[item].title,
                        user: items[item].urlid
                      })
                      this.setState({favlist: movietransfer, nomovie: ""})
                    }
                } else {
                    this.setState({favlist: [], nomovie: "Add Some Movies :("})
                }
            });
        } else {
          this.setState({isloggedin: false})
        }
    })
  }

  openlogin = () => {
    this.setState({loginopen: true})
  }

  openfav = () => {
    const user = firebase.auth().currentUser;
    firebase.database().ref('users').once('value', snap => {
      if (snap.hasChild(user.uid)){
        this.setState({favopen: true})
      } else {
        this.setState({nofavopen: true})
      }
    })
    
  }

  signout = () => {
    firebase.auth().signOut();

 
  }

  watchlater = () => {
    const user = firebase.auth().currentUser;
    const value =  this.state.moviedetail
    if (user != null) {
    firebase.database().ref('/users/'+ user.uid).push({
      'title': value.title,
      'urlid': value.id
    });
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
      snackopen: false,
      nofavopen: false
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
      open: false,
      popopen: false,
      moviedetail: [],
      snackopen: false,
      nofavopen: false,
      
    });
  }

  movielsgenrefilter = (gid,  name) => {
    this.setState({movielsgenre: [], genreid: gid, currentcat: name}, () => {this.getmoviesbygenres()})
  }
  movielsfiltertop = () => {
    this.setState({moviels: [], open: false, currentcat: "Top Rated", page: 1, movieurl: "movie/top_rated?"}, () => {this.getmovie()});
  }
  movielsfilterup = () => {
    this.setState({moviels: [], open: false, currentcat: "Now Playing", page: 1, movieurl: "movie/now_playing?"}, () => {this.getmovie()});
  }
  movielsfilterpop = () => {
    this.setState({moviels: [], open: false, currentcat: "Popular", page: 1, movieurl: "movie/popular?"}, () => {this.getmovie()});
  }
  movielsfilternow = () => {
    this.setState({moviels: [], open: false, currentcat: "Upcoming", page: 1, movieurl: "movie/upcoming?"}, () => {this.getmovie()});
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

  getmoviesbygenres = () => {
    if (this.state.genrepage === 1){
     axios.get('https://api.themoviedb.org/3/genre/' + this.state.genreid + '/movies?api_key=' + this.state.apikey + '&language=en-US&page=' + this.state.genrepage)
      .then(res => {
        this.setState({ movielsgenre: res.data.results });
      })} else {
      axios.get('https://api.themoviedb.org/3/genre/' + this.state.genreid+ '/movies?api_key=' + this.state.apikey + '&language=en-US&page=' + this.state.genrepage)
      .then(res => {
        this.setState({ movielsgenre: this.state.movielsgenre.concat(res.data.results) });
      })  
      }
  }

  getsearch = () => {
    if (this.state.search.length > 1){
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=" + this.state.apikey + "&language=en-US&query=" + this.state.search)
      .then(res => {
        this.setState({ moviels: res.data.results });
      })}
  }

  getmoviedetail = (id) => {
    axios.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + this.state.apikey + "&language=en-US")
    .then(res => {
      this.setState({ moviedetail: res.data, genres: res.data.genres });
    });
    axios.get("https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + this.state.apikey + "&language=en-US")
    .then(res => {
      const rescastarray = res.data.cast
      const castarray = rescastarray.slice(0,5)
      this.setState({ moviecast: castarray });
    });
    this.setState({popopen: true});  
  }

  getcastmovie = (id) => {
    axios.get("https://api.themoviedb.org/3/person/" + id + "/movie_credits?api_key=" + this.state.apikey + "&language=en-US")
    .then(res => {
      this.setState({ castmovie: res.data.cast});
    });
    axios.get("https://api.themoviedb.org/3/person/" + id + "?api_key=" + this.state.apikey + "&language=en-US")
    .then(res => {
      this.setState({ currentcat: res.data.name});
    });
    this.setState({popopen: false});
  }

  getpopularcast = () => {
    axios.get("https://api.themoviedb.org/3/person/popular?api_key=" + this.state.apikey + "&language=en-US&page=1")
    .then(res => {
      this.setState({ popcast: res.data.results});
    });
  }

  getfavmoviedetail = (id) => {
    this.getmoviedetail(id)
    this.setState({popopen: true, favopen: false});  
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

  setgenrepagenumber = () => {
    this.setState({genrepage: this.state.genrepage + 1}, () =>{
    this.getmoviesbygenres()})
  }

  render() {
    const actions = [
      <RaisedButton
        label="Add to Fav"
        primary={true}
        onTouchTap={this.watchlater}
        icon={<Star/>}
        style={style.button}
      />,
      <RaisedButton
        secondary={true}
        onTouchTap={this.openfav}
        icon={<Star/>}
      />
    ];
    
    let button = null
      if (this.state.isloggedin) {
        button =   <IconMenu
                    iconButtonElement={
                      <IconButton><MoreVertIcon color={grey50} /></IconButton>
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
        <BrowserRouter>
        <div className="App">
          <div className="navbar">
              <div className="navbarcontent">
                <span onTouchTap={this.handleTouchTap} className="title">MOVIEENT </span>
                <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
                  <Moviemenu
                      proppop={this.movielsfilterpop}
                      proptop={this.movielsfiltertop}
                      propup={this.movielsfilterup}
                      propnow={this.movielsfilternow}
                      getmoviesbygenresprop={this.movielsgenrefilter}
                   />
                </Drawer>
                <span className="filler"/>
                <Popover
                  open={this.state.searchopen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}
                >
                  <Link to="/movies"><input className="navbarsearch" onChange={this.searchvalue} placeholder="Search Movies" /></Link>
                </Popover>

                <IconButton tooltip="Search" touch={true} tooltipPosition="bottom-center" onClick={this.opensearch}>
                  <Search color={grey50}/>
                </IconButton>  
                {button}
              </div>
          </div>

            <Dialog title={this.state.moviedetail.title} 
              autoScrollBodyContent={true} 
              actions={actions} modal={false} 
              open={this.state.popopen} 
              onRequestClose={this.handleClose} 
              titleClassName="detailtitle"
              contentClassName="dialogwidth"
            >
                <div className="chipcontainer">
                  {this.state.genres.map(chip => 
                      <div key={chip.id}>
                          <div className="detailchip">
                              <span >{chip.name}</span>
                          </div>
                      </div>
                  )}
                </div>
               <Moviedetail moviedetailprop={this.state.moviedetail} moviecastprop={this.state.moviecast} getcastmovieprop={this.getcastmovie}/>
            </Dialog>
 
            <Dialog modal={false} open={this.state.loginopen} onRequestClose={this.handleRequestClose} contentClassName="dialogwidth">
                <Firebaselogin closeloginform={this.handleRequestClose}/>
            </Dialog>

            <Dialog modal={false} open={this.state.favopen} onRequestClose={this.handleRequestClose} fullwidth={true} autoScrollBodyContent={true} contentClassName="dialogwidth">
                <Favorites favlistprop={this.state.favlist} nomovieprop={this.state.nomovie} getfavmoviedetailprop={this.getfavmoviedetail}/>
            </Dialog>

            <Snacks snackopenprop={this.state.snackopen} nofavopenprop={this.state.nofavopen}/>

            <Route exact path={"/people"} component={() => <People castname={this.state.currentcat} castmovieprop={this.state.castmovie} setidprop={this.getmoviedetail}/>}/>

            <Route exact path={"/movies"} component={() => <Movielist movielsname={this.state.currentcat} movielsprop={this.state.moviels} setid={this.getmoviedetail} setpage={this.setpagenumber} />}/>

            <Route exact path={"/genres"} component={() => <Genresmovielist movielsname={this.state.currentcat} movielsgenreprop={this.state.movielsgenre} setid={this.getmoviedetail} setpage={this.setgenrepagenumber} />}/>

            <Route exact path={"/about"} component={() => <About/>}/>

            <Route exact path={"/"} component={() => <Intro 
                                                      proppop={this.movielsfilterpop}
                                                      proptop={this.movielsfiltertop}
                                                      propup={this.movielsfilterup}
                                                      propnow={this.movielsfilternow}
                                                      popcastprop={this.state.popcast}
                                                      getcastmovieprop={this.getcastmovie}
                                                      getmoviesbygenresprop={this.movielsgenrefilter}
                                              />}/>
            
      </div>
      </BrowserRouter>
    );
  }
}

const style = {
  button: {
    margin: 12,
  }
};
export default App;


