import React, { Component } from 'react';
import dblogo from '../assets/dblogo.png'
import './about.css'


class About extends Component {
    render() {
        return (
            <div>
                <div className="aboutcontainer">
                    <div className="labeldb">
                        <b>Designed and Developed by Saeed Malik </b>
                    </div>
                    <div className="labeldb">
                        <b>This product uses the TMDb API but is not endorsed or certified by TMDb. </b>
                    </div>
                    <img className="tmdblogo" src={dblogo} alt="dblogo"/>
                </div>
            </div>
        );
    }
}

export default About;