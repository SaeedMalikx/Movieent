import React from 'react';
import './movielist.css'
import RaisedButton from 'material-ui/RaisedButton';


export default class movielist extends React.Component {


  getmoviedetailer = (id) => {
    this.props.setid(id);
  }

  setpager = () => {
    this.props.setpage()
  }
  render() {
    let morebutton = null
    if (this.props.movielsprop.length > 1){
      morebutton = <button className="morebutton" onClick={this.setpager}>MORE</button>
    }
    return (
      <div>
        <div className="movielistcontainer">
            {this.props.movielsprop.map(post =>
              <div className="image" key={post.id}>
                <img className="movieposterimage" src={'https://image.tmdb.org/t/p/w300/' + post.poster_path} alt={post.title} onClick={() => {this.getmoviedetailer(post.id)}} />     
                <h2 className="movielstitle">{post.title}</h2>
              </div>
            )}
            
        </div>
        <div className="btncon">
        {morebutton}
        </div>
      </div>
    );
  }
}