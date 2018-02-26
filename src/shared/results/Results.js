'use strict';

import React from 'react';
import Barlist from '../components/Barlist.js';
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
        if (typeof window !== 'undefined') {
          initialData = window.__initialData__;
          loggedIn = window.__loggedIn__;
          delete window.__initialData__;
          delete window.__loggedIn__;
        } else {
            initialData = this.props.staticContext.initialData;
            loggedIn = this.props.staticContext.loggedIn;
        }
        
        this.state={
            data:this.props.location.state?this.props.location.state:initialData,
            loggedin:loggedIn
        };
    }
     static requestInitialData(term){
      return  fetch(process.env.APP_URL+'search/'+term)
          .then(response => response.json())
          .catch(error => console.log(error));
    }
     
     getData() {
        var data = ResultsStore.getAll();
        console.log(data);
        console.log('Results set new state');
        this.setState({
          data:data
        });
    }

    componentWillMount() {
        ResultsStore.on("change", this.getData.bind(this));
    }

    componentWillUnmount() {
        ResultsStore.removeListener("change", this.getData.bind(this));
    }
    render(){
        console.log('render');
        const {businesses,togo,region} = this.state.data;
        console.log(businesses);
        console.log(togo);
        console.log(region);
        return(
        <div>
        <Modal/>
        <Navbar loggedin ={this.state.loggedin}/>
        <div class="row maincontent">
        <div class="col-md-4 resultlist">
        <Barlist businesses = {businesses} togo={togo}/>
        </div>
        <div class="col-md-8">
        <Leafletmap lon= {region.center.longitude} lat= {region.center.latitude} markers = {businesses} />
        </div>
        </div>
        </div>);
    }
}

/*        
         

       
*/
export default Results;