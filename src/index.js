import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as firebase from 'firebase';





var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const config = {
    apiKey: "AIzaSyAv8oajkg64GOIhClFQpynYSn1tWPQ8bbY",
    authDomain: "moviedb-f9ed5.firebaseapp.com",
    databaseURL: "https://moviedb-f9ed5.firebaseio.com",
    projectId: "moviedb-f9ed5",
    storageBucket: "",
    messagingSenderId: "179911698739"
  };
firebase.initializeApp(config);

const Root= () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
