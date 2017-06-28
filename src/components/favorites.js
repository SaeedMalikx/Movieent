import React from 'react';
import firebase from 'firebase';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/delete';




export default class Favorites extends React.Component {
    
  
    

    getfavmoviedetailer = (urlid) => {
        this.props.getfavmoviedetailprop(urlid)
    }
    removefromwatchlist = (xname) => {
        const user = firebase.auth().currentUser;
        if (user != null) {
            firebase.database().ref('users').child(user.uid).child(xname).remove();
        }
    }

   
    render() {
        const favz = this.props.favlistprop.map( (name) => {
            return <div key={name.id}><List><ListItem
                                        onClick={()=>{this.getfavmoviedetailer(name.user)}}
                                        leftCheckbox={<ActionInfo onClick={() => {this.removefromwatchlist(name.id)}} />}
                                        primaryText={name.title}
                                        />
                                    </List>
                    </div>
        })
        
    return (
            <div>
                <p>{this.props.nomovieprop}</p>
                {favz}

            </div>
        
        
    );
    }
}
