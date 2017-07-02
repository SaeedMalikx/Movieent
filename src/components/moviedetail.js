import React from 'react';
import './moviedetail.css'
import { Link } from 'react-router-dom'

import Star from 'material-ui/svg-icons/toggle/star';
import Runtime from 'material-ui/svg-icons/action/schedule';
import Summary from 'material-ui/svg-icons/action/info';
import Released from 'material-ui/svg-icons/action/date-range';
import Revenue from 'material-ui/svg-icons/editor/attach-money';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import {lime300, grey900} from 'material-ui/styles/colors';


export default class Moviedetail extends React.Component {

    


  render() {
      
    return (
          <div>
              <p className="detailtagline">"{this.props.moviedetailprop.tagline}"</p>
              <List>
                <ListItem disabled={true} leftAvatar={<Avatar backgroundColor={grey900} icon={<Summary />} />}>
                  {this.props.moviedetailprop.overview}
                </ListItem>
                <ListItem disabled={true} leftAvatar={<Avatar color={lime300} backgroundColor={grey900} icon={<Star />} />}>
                  <b>{this.props.moviedetailprop.vote_average}/10</b>
                </ListItem>
                <ListItem disabled={true} leftAvatar={<Avatar backgroundColor={grey900} icon={<Runtime />} />}>
                  <b>{this.props.moviedetailprop.runtime} mins</b>
                </ListItem>
                <ListItem disabled={true} leftAvatar={<Avatar backgroundColor={grey900} icon={<Released />} />}>
                  <b>{this.props.moviedetailprop.release_date}</b>
                </ListItem>
                <ListItem disabled={true} leftAvatar={<Avatar backgroundColor={grey900} icon={<Revenue />} />}>
                  <b>{this.props.moviedetailprop.revenue}</b>
                </ListItem>
              </List>
              <h4 className="centertext">CAST</h4>
              {this.props.moviecastprop.map((post, index) =>
              <div className="image" key={index}>
                <List>
                  <Link className="activelink" to="/people"><ListItem disabled={false} onClick={() => {this.props.getcastmovieprop(post.id)}} 
                           leftAvatar={<Avatar src={'https://image.tmdb.org/t/p/w300/' + post.profile_path} />}>
                    {post.name} as <b>{post.character}</b>
                  </ListItem></Link> 
                </List>  
              </div>
            )}
          </div>
        
      
    );
  }
}

           