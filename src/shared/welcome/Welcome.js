'use strict';

import React from 'react';
import {Redirect } from "react-router-dom";
import WelcomeStore from '../stores/WelcomeStore.js';
import Searchbar from '../components/Searchbar.js';
import Footer from '../components/Footer.js';
import "./Welcome.css";



class Welcome extends React.Component {
    constructor(){
        super();
        this.getData = this.getData.bind(this);
        this.throwError = this.throwError.bind(this);
        this.notFound = this.notFound.bind(this);
        this.state={data:{},error:false,disabled:true,notfound:false};
    }
    getData() {
        this.setState({
          data:WelcomeStore.getAll()
        });
    }
    disableFunc(){
      this.setState({
        disabled:true
      })
    }
    throwError(){
      this.setState({
        notfound:false,
        error:true,
        disabled:false
      });
    }
    notFound(){
      this.setState({
        notfound:true,
        error:false,
        disabled:false
      });
    }
    componentWillMount() {
        WelcomeStore.on("ready", this.getData);
        WelcomeStore.on('searcherror',this.throwError);
        WelcomeStore.on('searchnotfound',this.notFound);
    }
    componentDidMount(){
      this.setState({disabled:false});
    }
    componentWillUnmount() {
        WelcomeStore.removeListener("ready", this.getData);
        WelcomeStore.removeListener('searcherror',this.throwError);
        WelcomeStore.removeListener('searchnotfound',this.notFound);
    }
    render(){
        return(
    <div class="center">
      <h1>Fancy a drink tonight?</h1>
      <h2>Search for bars in your area and see where everyone else is going</h2>
      <Searchbar nav={false} collapse={null} disabled={this.state.disabled} disablefunc = {this.disableFunc.bind(this)}/>
      {this.state.error && <span>Oups, something went wrong. I can't get the search results. Please come back later.</span>}
      {this.state.notfound && <span>No data found with the specified location. Please try another location.</span>}
        {this.state.data.businesses &&
          <Redirect to={{
            pathname: '/results',
            state: { 
              businesses: this.state.data.businesses,
              togo:this.state.data.togo,
              region: this.state.data.region
            }
          }}/>
        }
        <Footer/>
    </div>
    );
    }
}

export default Welcome;