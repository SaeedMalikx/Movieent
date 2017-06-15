import React from 'react'
import './moviedetail.css'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


export default class moviedetail extends React.Component {

    render(){
        return (
                <div>
                  <Card>
                    <CardHeader
                    title={this.props.moviedetailprop.title}
                    />
                    <CardMedia
                    overlay={<CardTitle title={this.props.moviedetailprop.tagline}  />}
                    >
                    <img className="detailimage" src={'https://image.tmdb.org/t/p/w1000/' + this.props.moviedetailprop.backdrop_path} alt="poster" />
                    </CardMedia>
                    <CardTitle title={this.props.moviedetailprop.title}  />
                    <CardText>
                        {this.props.moviedetailprop.overview}
                    </CardText>
                    <CardActions>
                        <FlatButton label="Action1" />
                        <FlatButton label="Action2" />
                    </CardActions>
                </Card>
               </div>
        )
    }
}

