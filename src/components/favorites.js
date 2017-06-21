import React from 'react';
import firebase from 'firebase';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/delete';




export default class Favorites extends React.Component {
      constructor(props) {
    super(props);

    this.state = {
        favlist: [],
        nomovie: "Watch List"
    };
  }
  
    componentWillMount = () => {
      
        const user = firebase.auth().currentUser;
        if (user != null) {
            firebase.database().ref('users').child(user.uid).on('value', snap =>{
              console.log(snap.val())
                
                if (snap.val()) {
                    let items = snap.val();
                    let movietransfer = [];
                    for (let item in items) {
                      movietransfer.push({
                        id: item,
                        title: items[item].title,
                        user: items[item].urlid
                      })
                      this.setState({favlist: movietransfer})
                    }
                } else {
                    this.setState({favlist: [], nomovie: "Add Some Movies :("})
                }
            });
        }
    }


    removefromwatchlist = (xname) => {
        const user = firebase.auth().currentUser;
        if (user != null) {
            firebase.database().ref('users').child(user.uid).child(xname).remove();
        }
    }

   
    render() {
        const favz = this.state.favlist.map( (name) => {
            return <div key={name.id}><List><ListItem
                                        leftCheckbox={<ActionInfo onClick={() => {this.removefromwatchlist(name.id)}} />}
                                        primaryText={name.title}
                                        />
                                    </List>
                    </div>
        })
        
    return (
            <div>
            <p>{this.state.nomovie}</p>
            {favz}

            </div>
        
        
    );
    }
}
