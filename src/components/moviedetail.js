import React from 'react';




export default class Moviedetail extends React.Component {

    


  render() {
      
    return (
          <div>
            <h5>"{this.props.moviedetailprop.tagline}"</h5>
            <p>
              <b>Summary:</b> {this.props.moviedetailprop.overview}
            </p>
            <h4>Runtime: {this.props.moviedetailprop.runtime} mins</h4>
          </div>
        
      
    );
  }
}

            