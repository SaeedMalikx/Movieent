import React from 'react';
import axios from 'axios';
import './movielist.css'

export default class movielist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moviels: []
    };
  }

  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=14d069109bafe2681aa95ad4b60d2a91&language=en-US&query="hello"`)
      .then(res => {
        this.setState({ moviels: res.data.results });
      });
  }

  render() {
    return (
      <div className="movielistcontainer">
          {this.state.moviels.map(post =>
            <div className="image">
              <img className="movieposterimage" src={'https://image.tmdb.org/t/p/w300/' + post.poster_path} alt="" />     
              <h2 className="movielstitle">{post.title}</h2>
            </div>
          )}
      </div>
    );
  }
}