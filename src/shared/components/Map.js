'use strict';

import React from 'react';
import MapStore from '../stores/MapStore.js';
import Action from '../actions/BarAction.js';
import MapMarker from './MapMarker.js';

let Map, TileLayer, ZoomControl;

class Leafletmap extends React.Component{
    constructor(){
        super();
        this.state={
          packageloaded:false
        };
        this.renderMarkers = this.renderMarkers.bind(this);
    }
    flyTo(){
      var coord= MapStore.getZoom();
      this.mapInstance.leafletElement.flyTo([coord.latitude,coord.longitude], 18);
    }
    renderMarkers(marker){
      return <MapMarker key={marker.id} id={marker.id} coordinates={marker.coordinates} name={marker.name}
      location={marker.location} phone={marker.phone}/>;
    }
    componentWillMount() {
        MapStore.on("zoom",this.flyTo.bind(this));
    }
    componentDidUpdate(){
        this.mapInstance.leafletElement.closePopup();
    }
    componentDidMount(){
        // Runs only on the browser
        Map = require('react-leaflet').Map;
        TileLayer = require('react-leaflet').TileLayer;
        ZoomControl = require('react-leaflet').ZoomControl;
        this.setState({packageloaded:true});
    }
    componentWillUnmount() {
        MapStore.removeListener("zoom", this.flyTo.bind(this));
    }
    render () {
      return (
        this.state.packageloaded
        ? (
          <Map center={[this.props.lat,this.props.lon]} zoomControl={false} zoom={13} 
          style={{height:'90vh',zIndex:1}} ref={e => { this.mapInstance = e }}>
          <TileLayer attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {this.props.markers.map(this.renderMarkers)}
            <ZoomControl position='topright'/>
          </Map>
        )
        : (null)
        );
      }
 
}

export default Leafletmap;