'use strict';

import React from 'react';
import MapStore from '../stores/MapStore.js';

let Map, TileLayer, Marker,Popup,Tooltip;

class Leafletmap extends React.Component{
    constructor(props){
        super(props);
        this.state={packageloaded:false};
    }
   flyTo(){
      var coord= MapStore.getZoom();
      this.mapInstance.leafletElement.flyTo([coord.latitude,coord.longitude], 18);
    }
    handleClick(id){
      console.log(id);
      console.log('clicked');
    }
    componentWillMount() {
        MapStore.on("zoom",this.flyTo.bind(this));
    }
    componentDidMount(){
        // Runs only on the browser
        Map = require('react-leaflet').Map;
        TileLayer = require('react-leaflet').TileLayer;
        Marker = require('react-leaflet').Marker;
        Popup = require('react-leaflet').Popup;
        Tooltip = require('react-leaflet').Tooltip;
        this.setState({packageloaded:true});
    }
    componentWillUnmount() {
        MapStore.removeListener("zoom", this.flyTo.bind(this));
    }
      render () {
    return (
      (Map)
      ? (
        <Map center={[this.props.lat,this.props.lon]} zoom={13} class="map" ref={e => { this.mapInstance = e }}
        useFlyTo={true} 
        >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {this.props.markers.map((marker,indx) => {
            return <Marker key={indx} position={[marker.coordinates.latitude,marker.coordinates.longitude]} 
            sytle={{zIndex:5}}>
            <Popup><span><h5>{marker.name}</h5>{marker.location.display_address.join(' ')}<br/>
            {marker.phone}<br/><a onClick={this.handleClick}>Reviews</a></span></Popup>
            <Tooltip><span>{marker.name}</span></Tooltip>
            </Marker>;
          })}
        </Map>
      )
      : (null)
      )
      }
 
}

export default Leafletmap;