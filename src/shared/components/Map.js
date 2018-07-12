'use strict';

import React from 'react';
import MapStore from '../stores/MapStore.js';
import Action from '../actions/BarAction.js';

let Map, TileLayer, Marker,Popup,Tooltip;

class Leafletmap extends React.Component{
    constructor(props){
        super(props);
        this.state={
          packageloaded:false
        };
    }
   flyTo(){
      var coord= MapStore.getZoom();
      this.mapInstance.leafletElement.flyTo([coord.latitude,coord.longitude], 18);
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
        this.state.packageloaded
        ? (
          <Map center={[this.props.lat,this.props.lon]} zoom={13} class="map" ref={e => { this.mapInstance = e }}
          >
          <TileLayer
          ref={e => { this.layerInstance = e }}
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {this.props.markers.map((marker,indx) => {
              return <Marker key={indx} position={[marker.coordinates.latitude,marker.coordinates.longitude]} 
                sytle={{zIndex:5}} onClick={() => Action.scrollTo(marker.id)}>
                <Popup>
                  <span><h5>{marker.name}</h5>{marker.location.display_address.join(' ')}<br/>
                  {marker.phone}</span>
                </Popup>
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