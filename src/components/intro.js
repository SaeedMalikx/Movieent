import React from 'react';
import './intro.css'
import { Link } from 'react-router-dom'

import Paper from 'material-ui/Paper';

export default class Intro extends React.Component {

    


  render() {
      
    return (
          <div>
             <div className="introcontainer">
                <Link to="/movies"><div className="popularimage" onClick={()=>{this.props.proppop()}}>
                    <div className="labelholder">
                        <div className="label">Popular</div>
                    </div>
                </div></Link>
                <Link to="/movies"><div className="topratedimage" onClick={()=>{this.props.proptop()}}>
                    <div className="labelholder">
                        <div className="labelred">Top rated</div>
                    </div>
                </div></Link>
                <Link to="/movies"><div className="nowplayingimage" onClick={()=>{this.props.propnow()}}>
                    <div className="labelholder">
                        <div className="labelblue">Now Playing</div>
                    </div>
                </div></Link>
                <Link to="/movies"><div className="upcomingimage" onClick={()=>{this.props.propup()}}>
                    <div className="labelholder">
                        <div className="labelorange">Upcoming</div>
                    </div>
                </div></Link>
             </div>
             <div className="chipcontainer">
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(28)}} className="chip">Action</span></Link>
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(12)}} className="chip">Adventure</span></Link>
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(16)}} className="chip">Animation</span></Link>
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(35)}} className="chip">Comedy</span></Link>
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(80)}} className="chip">Crime</span></Link>
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(99)}} className="chip">Documentary</span></Link>
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(14)}} className="chip">Fantasy</span></Link>
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(27)}} className="chip">Horror</span></Link>
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(10402)}} className="chip">Music</span></Link>
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(53)}} className="chip">Thriller</span></Link>
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(878)}} className="chip">Sci Fi</span></Link>
                    <Link to="/genres" className="activelink"><span onClick={()=>{this.props.getmoviesbygenresprop(37)}} className="chip">Western</span></Link>

             </div>
             <div className="popcastcontainer">
                {this.props.popcastprop.map((post, index) =>
                <div className="image" key={index}>
                    <Link to="/people" className="activelink">
                        
                            <img className="popcastimage" src={'https://image.tmdb.org/t/p/w300/' + post.profile_path} alt={post.name} onClick={() => {this.props.getcastmovieprop(post.id)}}  />
                            <p className="popcastname">{post.name}</p>
                        
                    </Link>
                </div>
                )}
             </div>
             
          </div>
        
      
    );
  }
}