import React from 'react';
import './movielist.css'
import Noposter from '../assets/noimage.png'


export default class Genresmovielist extends React.Component {


  getmoviedetailer = (id) => {
    this.props.setid(id);
  }

  setpager = () => {
    this.props.setpage()
  }
  render() {
    let morebutton = null
    if (this.props.movielsgenreprop){
      morebutton = <button className="morebutton" onClick={this.setpager}>MORE</button>
    }
    return (
      <div>
        <div className="movielistcontainer">
            {this.props.movielsgenreprop.map((post, index) =>
              <div className="image" key={index}>
                {post.poster_path ? 
                      <img className="movieposterimage" src={'https://image.tmdb.org/t/p/w300/' + post.poster_path} alt={post.title} onClick={() => {this.getmoviedetailer(post.id)}} />
                     : <img className="movieposterimage" src={Noposter} alt={post.title} onClick={() => {this.getmoviedetailer(post.id)}} />
              }     
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