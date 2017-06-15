import React from 'react'
import './moviedetail.css'



export default class moviedetail extends React.Component {

    render(){
        return (
            
            <div className="detailcontainer">
                <p className="detailboxinfo">"{this.props.moviedetailprop.tagline}"</p>
                <img className="backdropimage" src={'https://image.tmdb.org/t/p/w1000/' + this.props.moviedetailprop.backdrop_path}/>
                <div className="detailbox">
                    <p className="detailboxtitle">{this.props.moviedetailprop.title}</p>
                    <p className="detailboxsummary">{this.props.moviedetailprop.overview}</p>
                </div>
            </div>    
        )
    }
}
