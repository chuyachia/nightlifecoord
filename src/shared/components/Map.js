'use strict';
//            <Tooltip>{marker.name}</Tooltip> 
import React from 'react';
//import { Map } from 'react-leaflet-universal';
//import { Map ,TileLayer, Marker,Popup,Tooltip} from 'react-leaflet';
import MapStore from '../stores/MapStore.js';

let Map, TileLayer, Marker,Popup;

class Leafletmap extends React.Component{
    constructor(props){
        super(props);
    }
   flyTo(){
      var coord= MapStore.getZoom();
      this.map.flyTo([coord.latitude,coord.longitude], 18);
    }
    componentWillMount() {
        console.log('componentwillmount called');
        MapStore.on("zoom", this.flyTo.bind(this));
        this.map = this.mapInstance.leafletElement;
    }
    componentDidMount(){
        // Runs only on the browser
        console.log('componentdidmount called');
        Map = require('react-leaflet').Map;
        TileLayer = require('react-leaflet').TileLayer;
        Marker = require('react-leaflet').Marker;
        Popup = require('react-leaflet').Popup;

        this.forceUpdate();

    }
    componentWillUnmount() {
        MapStore.removeListener("zoom", this.flyTo.bind(this));
    }
      render () {
    return (
      (Map)
      ? (
        <Map center={[this.props.lat,this.props.lon]} zoom={15} class="map" ref={e => {this.mapInstance = e}}
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
      : (<div>test</div>)
      )
      }
    /*render(){
        return((Map)?
      (<Map center={[this.props.lat,this.props.lon]} zoom={15} useFlyTo={true} class="map"
      ref={e => {this.mapInstance = e}}>
           <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {this.props.markers.map(function(marker,indx){
            return <Marker key={indx} position={[marker.coordinates.latitude,marker.coordinates.longitude]} sytle={{zIndex:5}}>
            <Popup><span><h5>{marker.name}</h5>{marker.location.display_address.join(' ')}<br/>
            {marker.phone}</span></Popup>
            </Marker>;
          })}
      </Map>):(null)
        );
    }*/
}

export default Leafletmap;