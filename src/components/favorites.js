import React from 'react';
import firebase from 'firebase';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/delete';




export default class Favorites extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            favlist: [],
            nomovie: "WatchList"
        };
    }



    componentWillMount = () => {
      
        const user = firebase.auth().currentUser;
        if (user != null) {
            firebase.database().ref('/users/'+ user.uid).on('value', snap =>{
                
                if (snap.val()){
                    const favz = Object.keys(snap.val())
                this.setState({favlist: favz} )
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
        const favz = this.state.favlist.map( (name, index) => {
            return <div key={name}><List><ListItem
                                        leftCheckbox={<ActionInfo onClick={() => {this.removefromwatchlist(name)}} />}
                                        primaryText={name}
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
