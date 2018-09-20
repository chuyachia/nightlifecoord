'use strict';

import React from 'react';
import Barlist from '../components/Barlist.js';
import Leafletmap from '../components/Map.js';
import BarInfoModal from '../components/BarInfoModal.js';
import ProfileModal from '../components/ProfileModal.js';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import Overlay from '../components/Overlay.js';
import ResultsStore from '../stores/ResultsStore.js';
import styled from 'styled-components';

const SideBar = styled.div`
    height:100%;
    width:${props=>props.hide?'0%':'100%'};
    position:absolute;
    top:0;
    left:0;
    z-index:2;
    transition: width 0.5s;
    @media (min-width: 768px) {
        width:${props=>props.hide?'0%':'40%'};
    }
    
    @media (min-width: 1224px) {
        width:${props=>props.hide?'0%':'30%'};
    }
`;
const SideBarPane = styled.div`
    float:left;
    width: calc(100% - 30px);
    background:white;
    height:100%;
    overflow-y:scroll;
    box-shadow: 1px 1px 4px #888888;
`;
const SideBarButton = styled.div`
    width:20px;
    margin-top:40px;
    background:white;
    display:inline-block;
    border: 1px solid #cccccc;
    border-radius: 0px 4px 4px 0px;
    box-shadow: 1px 1px 4px #888888;
    cursor:pointer;
`;


const Loader = styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    z-index:10;
    display:${props=>props.hide?'none':'inherit'}
`;

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
            businesses:initialData?initialData.businesses:this.props.location.state.businesses,
            togo:initialData?initialData.togo.map(bar => bar.id):this.props.location.state.togo.map(bar => bar.id),
            region:initialData?initialData.region:this.props.location.state.region,
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
          term:data.term,
          businesses:data.businesses,
          togo :data.togo.map(bar => bar.id),
          region:data.region,
          loading:false
        });
    }
    getToGo(){
        var data = ResultsStore.getToGo();
        this.setState({
          togo :data.map(bar => bar.id)
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
            <BarInfoModal/>
            <ProfileModal/>
                <div class="row">
                    <Navbar loggedin ={this.state.loggedin}/>
                    <SideBar hide={this.state.showSidepane?false:true}>
                        <SideBarPane ref={e => { this.scroll = e }}>
                            <div>
                                <Barlist 
                                    businesses = {this.state.businesses} 
                                    loggedin ={this.state.loggedin} 
                                    togo={this.state.togo} 
                                    hidesidepane={this.showHide.bind(this)}
                                    scroll = {this.scroll}
                                />
                            </div>
                        </SideBarPane>
                        <SideBarButton onClick={this.showHide.bind(this)}>
                        {this.state.showSidepane?
                        <i class="fas fa-caret-left"></i>:
                        <i class="fas fa-caret-right"></i>
                        }
                        </SideBarButton>
                    </SideBar>
                    <Overlay hide={this.state.loading?false:true}/>
                    <Loader hide={this.state.loading?false:true} class="fas fa-spinner fa-pulse fa-5x"/>
                    <Leafletmap lon= {this.state.region.center.longitude} lat= {this.state.region.center.latitude} markers = {this.state.businesses} />
                    <Footer/>
                </div>
        </div>
        );
    }
}


export default Results;