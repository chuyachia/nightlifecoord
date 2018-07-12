'use strict';

import React from 'react';
import Barlist from '../components/Barlist.js';
import Leafletmap from '../components/Map.js';
import Modal from '../components/Modal.js';
import ProfileModal from '../components/ProfileModal.js';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
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
            loggedin:loggedIn,
            showSidepane:true,
            loading:false
        };
    }
    showLoading(){
      this.setState({
        loading:true
      });
    }
    removeLoading(){
      this.setState({
        loading:false
      });
    }
    showHide(){
        this.setState({showSidepane:this.state.showSidepane?false:true});
    }
    getData() {
        var data = ResultsStore.getAll();
        this.setState({
          businesses:data.businesses,
          togo :data.togo,
          region:data.region,
          loading:false
        });
    }
    getToGo(){
        var data = ResultsStore.getToGo();
        this.setState({
          togo :data
        });
    }
    componentWillMount() {
        ResultsStore.on("searchstart", this.showLoading.bind(this));
        ResultsStore.on("searcherror", this.removeLoading.bind(this));
        ResultsStore.on("searchnotfound", this.removeLoading.bind(this));
        ResultsStore.on("newdata", this.getData.bind(this));
        ResultsStore.on("newplace", this.getToGo.bind(this));
    }
    componentWillUnmount() {
        ResultsStore.removeListener("searchstart", this.showLoading.bind(this));
        ResultsStore.removeListener("searcherror", this.removeLoading.bind(this));
        ResultsStore.removeListener("searchnotfound", this.removeLoading.bind(this));
        ResultsStore.removeListener("newdata", this.getData.bind(this));
        ResultsStore.removeListener("newplace", this.getToGo.bind(this));
    }
    render(){
        return(
        <div class='container-fluid'>
            <Modal/>
            <ProfileModal/>
                <div class="row">
                    <Navbar loggedin ={this.state.loggedin}/>
                    <div class={`sidebar ${this.state.showSidepane?'':'nowidth'}`}>
                        <div class="sidebar-pane" ref={e => { this.scroll = e }}>
                            <div class="resultlist">
                                <Barlist 
                                    businesses = {this.state.businesses} 
                                    loggedin ={this.state.loggedin} 
                                    togo={this.state.togo} 
                                    hidesidepane={this.showHide.bind(this)}
                                    scroll = {this.scroll}
                                />
                            </div>
                        </div>
                        <div class="sidebar-btn" onClick={this.showHide.bind(this)}>
                        {this.state.showSidepane?
                        <i class="fas fa-caret-left"></i>:
                        <i class="fas fa-caret-right"></i>
                        }
                        </div>
                    </div>
                    <div class={`overlay ${this.state.loading?'':'hidden'}`}><i class="fas fa-spinner fa-pulse fa-5x"></i></div>
                    <Leafletmap lon= {this.state.region.center.longitude} lat= {this.state.region.center.latitude} markers = {this.state.businesses} />
                    <Footer/>
                </div>
        </div>
        );
    }
}


export default Results;