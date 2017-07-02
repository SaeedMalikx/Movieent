import React from 'react';
import './intro.css'
import { Link } from 'react-router-dom'


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
             <input className="navbarsearch" onChange={this.searchvalue} placeholder="Search Movies" />
          </div>
        
      
    );
  }
}
