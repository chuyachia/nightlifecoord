'use strict';

import React from 'react';
import Barlist from '../components/Barlist.js';
import Leafletmap from '../components/Map.js';
import Modal from '../components/Modal.js';
import Navbar from '../components/Navbar.js';
import ResultsStore from '../stores/ResultsStore.js';
import "./Results.css";


class Results extends React.Component{
    constructor(props){
        super(props);
        let initialData;
        let loggedIn;
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
            businesses:this.props.location.state?this.props.location.state.businesses:initialData.businesses,
            togo:this.props.location.state?this.props.location.state.togo:initialData.togo,
            region:this.props.location.state?this.props.location.state.region:initialData.region,
            loggedin:loggedIn
        };
    }
     getData() {
        var data = ResultsStore.getAll();
        this.setState({
          businesses:data.businesses,
          togo :data.togo,
          region:data.region
        });
    }
    getToGo(){
        var data = ResultsStore.getToGo();
        this.setState({
          togo :data
        });
    }
    componentWillMount() {
        ResultsStore.on("newdata", this.getData.bind(this));
        ResultsStore.on("newplace", this.getToGo.bind(this));
    }

    componentWillUnmount() {
        ResultsStore.removeListener("newdata", this.getData.bind(this));
        ResultsStore.removeListener("newplace", this.getToGo.bind(this));
    }
    render(){
        return(
        <div class='container-fluid'>
        <Modal/>
        <div class="row">
        <Navbar loggedin ={this.state.loggedin}/>
        <div class="col-md-3 resultlist">
        <Barlist businesses = {this.state.businesses} loggedin ={this.state.loggedin} togo={this.state.togo}/>
        </div>
        <div class="col-md-9">
        <Leafletmap lon= {this.state.region.center.longitude} lat= {this.state.region.center.latitude} markers = {this.state.businesses} />
        </div>
        </div>
        </div>);
    }
}


export default Results;