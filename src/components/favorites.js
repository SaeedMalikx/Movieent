import React from 'react';
import firebase from 'firebase';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/delete';




export default class Favorites extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            favlist: []
        };
    }

    componentWillMount = () => {
      
        const user = firebase.auth().currentUser;
        if (user != null) {
            firebase.database().ref('/users/'+ user.uid).on('value', snap =>{
                const favz = Object.keys(snap.val())
                this.setState({favlist: favz})
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
            {favz}

            </div>
        
        
    );
    }
}
