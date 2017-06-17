import React from 'react';
import './movielist.css'

export default class movielist extends React.Component {


  getmoviedetailer = (id) => {
    this.props.setid(id);
  }
  render() {
    return (
      <div className="movielistcontainer">
          {this.props.movielsprop.map(post =>
            <div className="image" key={post.id}>
              <img className="movieposterimage" src={'https://image.tmdb.org/t/p/w300/' + post.poster_path} alt={post.title} onClick={() => {this.getmoviedetailer(post.id)}} />     
              <h2 className="movielstitle">{post.title}</h2>
            </div>
          )}
      </div>
    );
  }
}