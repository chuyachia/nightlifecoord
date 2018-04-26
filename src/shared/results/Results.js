'use strict';

import React from 'react';
import Barlist from '../components/Barlist.js';
import Leafletmap from '../components/Map.js';
import Modal from '../components/Modal.js';
import ProfileModal from '../components/ProfileModal.js';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import ResultsStore from '../stores/ResultsStore.js';
import Dock from "react-dock";
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
            loggedin:loggedIn,
            showSidepane:true
        };
    }
    showHide(){
        this.setState({showSidepane:this.state.showSidepane?false:true});
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
            <ProfileModal/>
                <div class="row">
                    <Navbar loggedin ={this.state.loggedin} showsidepane={this.showHide.bind(this)}/>
                    <Dock isVisible={this.state.showSidepane} dimMode="none" zIndex={5} fluid={true}>
                        <nav class="navbar navbar-default">
                                <div class="container-fluid">
                                    <div class="navbar-header">
                                        <div class="navbar-brand" onClick={this.showHide.bind(this)}>
                                            <i class="fas fa-angle-left"></i>&nbsp;Nightlife Coordination App
                                        </div>
                                    </div>
                            </div>
                        </nav>
                        <div class="resultlist">
                            <Barlist businesses = {this.state.businesses} loggedin ={this.state.loggedin} togo={this.state.togo} hidesidepane={this.showHide.bind(this)}/>
                        </div>
                    </Dock>
                    <Leafletmap lon= {this.state.region.center.longitude} lat= {this.state.region.center.latitude} markers = {this.state.businesses} />
                    <Footer/>
                </div>
        </div>);
    }
}


export default Results;