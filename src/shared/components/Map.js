'use strict';
//            <Tooltip>{marker.name}</Tooltip> 
import React from 'react';
import MapStore from '../stores/MapStore.js';

let Map, TileLayer, Marker,Popup;

class Leafletmap extends React.Component{
    constructor(props){
        super(props);
        this.state={packageloaded:false};
    }
   flyTo(){
      var coord= MapStore.getZoom();
      this.mapInstance.leafletElement.flyTo([coord.latitude,coord.longitude], 18);
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
        this.setState({packageloaded:true});
    }
    componentWillUnmount() {
        MapStore.removeListener("zoom", this.flyTo.bind(this));
    }
      render () {
    return (
      (Map)
      ? (
        <Map center={[this.props.lat,this.props.lon]} zoom={15} class="map" ref={e => { this.mapInstance = e }}
        useFlyTo={true}
        >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {this.props.markers.map(function(marker,indx){
            return <Marker key={indx} position={[marker.coordinates.latitude,marker.coordinates.longitude]} sytle={{zIndex:5}}>
            <Popup><span><h5>{marker.name}</h5>{marker.location.display_address.join(' ')}<br/>
            {marker.phone}</span></Popup>
            </Marker>;
          })}
        </Map>
      )
      : (null)
      )
      }
 
}

export default Leafletmap;