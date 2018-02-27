'use strict';

import React from 'react';
import Barlist from '../components/Barlist.js';
import Bar from '../components/Bar.js';
import Searchbar from '../components/Searchbar.js';
import Leafletmap from '../components/Map.js';
import Modal from '../components/Modal.js';
import Navbar from '../components/Navbar.js';
import ResultsStore from '../stores/ResultsStore.js';
import "isomorphic-fetch";
import "./Results.css";


class Results extends React.Component{
    constructor(props){
        super(props);
        let initialData;
        let loggedIn =false;
        if (!this.props.staticContext) {
          initialData = window.__initialData__;
          loggedIn = window.__loggedIn__;
          delete window.__initialData__;
          delete window.__loggedIn__;
        } else {
            initialData = this.props.staticContext.initialData;
            loggedIn = this.props.staticContext.loggedIn;
        }
        this.state={
            businesses:initialData?initialData.businesses:[],
            togo:initialData?initialData.togo:[],
            lon:initialData?initialData.region.center.longitude: -0.09,
            lat:initialData?initialData.region.center.latitude:51.505,
            loggedin:loggedIn,
            term:this.props.location?this.props.location.term:''
        };
    }
 
    componentDidMount() {
        //called only on the browser
        if (this.state.businesses.length==0) {
            console.log('fetch data from browser');
          Results.requestInitialData(this.state.term).then(data =>
          this.setState(
              { businesses: data.businesses,
                togo: data.togo,
                lon:data.region.center.longitude,
                lat:data.region.center.latitude,
              }
            )
            );
        }
    }


    render(){
        const { businesses,togo,lon,lat, loggedin,term } = this.state;
        return(
        <div>
        <Modal/>
        <Navbar loggedin ={loggedin}/>
        <div class="row maincontent">
        <div class="col-md-4 resultlist">
        <div>
        <Searchbar/>
            {businesses.map(function(bar,indx){
                return <Bar key = {indx} id ={bar.id} image_url={bar.image_url} name={bar.name} price={bar.price} categories={bar.categories}
                going={bar.going} rating={bar.rating} review_count = {bar.review_count}
                added= {togo.indexOf(bar.id) == -1?false:true} lat={bar.coordinates.latitude} lon={bar.coordinates.longitude}/>;
            })}
            </div>
        </div>
        <div class="col-md-8">
        <Leafletmap lon= {lon} lat= {lat} markers = {businesses} />
        </div>
        </div>
        </div>)
    }
}

/*        
         
        <Barlist businesses = {this.state.data.businesses} togo={this.state.data.togo}/>

       
*/
export default Results;