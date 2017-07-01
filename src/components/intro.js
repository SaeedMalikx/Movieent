import React from 'react';
import './intro.css'



export default class Intro extends React.Component {

    


  render() {
      
    return (
          <div>
             <div className="introcontainer">
                <div className="popularimage">
                    <div className="labelholder">
                        <div className="label">Popular</div>
                    </div>
                </div>
                <div className="topratedimage">
                    <div className="labelholder">
                        <div className="labelred">Top rated</div>
                    </div>
                </div>
                <div className="nowplayingimage">
                    <div className="labelholder">
                        <div className="labelblue">Now Playing</div>
                    </div>
                </div>
                <div className="upcomingimage">
                    <div className="labelholder">
                        <div className="labelorange">Upcoming</div>
                    </div>
                </div>
             </div>
          </div>
        
      
    );
  }
}
