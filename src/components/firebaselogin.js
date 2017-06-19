import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from 'firebase'
import TextField from 'material-ui/TextField';
import './firebaselogin.css'



export default class firebaselogin extends React.Component {
  constructor(props) {
     super(props);
 
     this.state = {
       email: "",
       password: "",
       uinfo: []
     };
   }
  closelogin = () => {
      this.props.closeloginform()
  }
  setuser = (user) => {
      this.setState({email: user.target.value})
  }

  setpass = (pass) => {
      this.setState({password: pass.target.value})
  }
  createuser = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);})
      .then(user =>{
      this.setState({uinfo: user})
    });
    this.closelogin()
  }

  signinuser = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            })
      .then(user =>{
      this.setState({uinfo: user})
    });
    this.closelogin()
  }
  


  render() {

        return (
            <div className="logincenter">
                <TextField
                    hintText="Email"
                    style={{width: '100%'}}
                    onChange={this.setuser}
                /><br />
                <TextField
                    hintText="Password"
                    style={{width: '100%'}}
                    onChange={this.setpass}
                /><br />
                <RaisedButton 
                    label="Signin" 
                    primary={true} 
                    onClick={this.signinuser} 
                    style={{width: '100%'}}
                />
                <h2>or Enter Email/Password Above and  Instantly Sign Up </h2>
                <RaisedButton 
                    label="Signup" 
                    secondary={true} 
                    onClick={this.createuser} 
                    style={{width: '100%'}}
                /><br/>
            </div>            
        )
    }
}