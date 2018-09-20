'use strict';

import React from 'react';
import Action from '../actions/BarAction.js';

let  Marker,Popup,Tooltip;

class MapMarker extends React.Component{
    constructor(){
        super();
        this.state={
          packageloaded:false
        };
        this.scrollTo= this.scrollTo.bind(this);
    }
    scrollTo(){
       Action.scrollTo(this.props.id); 
    }
    componentDidMount(){
        // Runs only on the browser
        Marker = require('react-leaflet').Marker;
        Popup = require('react-leaflet').Popup;
        Tooltip = require('react-leaflet').Tooltip;
        this.setState({packageloaded:true});
    }
    render(){
        return (this.state.packageloaded?<Marker position={[this.props.coordinates.latitude,this.props.coordinates.longitude]} 
                sytle={{zIndex:5}} onClick={this.scrollTo}>
                <Popup>
                  <span><h5>{this.props.name}</h5>{this.props.location.display_address.join(' ')}<br/>
                  {this.props.phone}</span>
                </Popup>
                <Tooltip><span>{this.props.name}</span></Tooltip>
              </Marker>:null);
    }
    
}

export default MapMarker;