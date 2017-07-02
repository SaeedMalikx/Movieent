import React from 'react';
import './people.css'
import { Link } from 'react-router-dom'


export default class People extends React.Component {

    


  render() {
      
    return (
          <div>
              <div className="movielistcontainer">
                {this.props.castmovieprop.map((post, index) =>
                <div className="image" key={index}>
                    <img className="movieposterimage" src={'https://image.tmdb.org/t/p/w300/' + post.poster_path}  onClick={() => {this.props.setidprop(post.id)}} />     
                </div>
                )}
            </div>
          </div>
        
      
    );
  }
}
