import React from 'react';
import firebase from 'firebase'



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
    console = () => {
        console.log(this.state.favlist)
    }

   
    render() {
        const favz = this.state.favlist.map( (name) => {
            return <p key={name}>{name}</p>
        })
        
    return (
            <div>
            {favz}

            </div>
        
        
    );
    }
}