'use strict';

import React from 'react';
import {Redirect } from "react-router-dom";
import WelcomeStore from '../stores/WelcomeStore.js';
import Searchbar from '../components/Searchbar.js';
import "./Welcome.css";


class Welcome extends React.Component {
    constructor(){
        super();
        this.getData = this.getData.bind(this);
        this.throwError = this.throwError.bind(this);
        this.state={term:'',data:{},error:false};
    }
    getData() {
        this.setState({
          data:WelcomeStore.getAll()
        });
    }
    throwError(){
      this.setState({
        error:true
      });
    }
    componentWillMount() {
        WelcomeStore.on("ready", this.getData);
        WelcomeStore.on('searcherror',this.throwError);
    }

    componentWillUnmount() {
        WelcomeStore.removeListener("ready", this.getData);
        WelcomeStore.removeListener('searcherror',this.throwError);
    }
    render(){
        return(
          
    <div class="center">
      <h1>Fancy a drink tonight?</h1>
      <h2>Search for bars in your area and see where everyone else is going</h2>
      <Searchbar nav={false}/>
      {this.state.error && <span>Oups, something went wrong. I can't get the search results. Please come back later.</span>}
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
    </div>)
    }
}

export default Welcome;