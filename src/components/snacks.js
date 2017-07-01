import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';

class Snacks extends Component {
    render() {
        return (
            <div>
            <Snackbar
              open={this.props.snackopenprop}
              message="Added to Favorites"
              autoHideDuration={500}
            />

            <Snackbar
              open={this.props.nofavopenprop}
              message="You WatchList is Empty, Add Some Movies"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
            </div>
        );
    }
}

export default Snacks;