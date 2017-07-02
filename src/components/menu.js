import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

class Moviemenu extends Component {
    render() {
        return (
            <div>
                 <Menu >
                    <Link className="activelink" to="/"><MenuItem>Home</MenuItem></Link>
                    <Divider/>
                    <Link className="activelink" to="/movies"><MenuItem onClick={()=>{this.props.proppop()}}>Popular</MenuItem></Link>
                    <Link className="activelink" to="/movies"><MenuItem onClick={()=>{this.props.proptop()}}>Top Rated</MenuItem></Link>
                    <Link className="activelink" to="/movies"><MenuItem onClick={()=>{this.props.propup()}}>Now Playing</MenuItem></Link>
                    <Link className="activelink" to="/movies"><MenuItem onClick={()=>{this.props.propnow()}}>Upcoming</MenuItem></Link>
                    <Divider/>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(28, "Action")}} >Action</MenuItem></Link>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(12, "Adventure")}} >Adventure</MenuItem></Link>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(16, "Animation")}} >Animation</MenuItem></Link>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(35, "Comedy")}} >Comedy</MenuItem></Link>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(80, "Crime")}} >Crime</MenuItem></Link>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(99, "Documentary")}} >Documentary</MenuItem></Link>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(14, "Fantasy")}} >Fantasy</MenuItem></Link>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(27, "Horror")}} >Horror</MenuItem></Link>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(10402, "Music")}} >Music</MenuItem></Link>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(53, "Thriller")}} >Thriller</MenuItem></Link>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(878, "Sci Fi")}} >Sci Fi</MenuItem></Link>
                    <Link to="/genres" className="activelink"><MenuItem onClick={()=>{this.props.getmoviesbygenresprop(37, "Western")}} >Western</MenuItem></Link>
                </Menu>
                
            </div>
        );
    }
}

export default Moviemenu;