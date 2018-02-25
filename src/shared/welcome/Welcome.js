'use strict';

import React from 'react';
import {Redirect } from "react-router-dom";
import WelcomeStore from '../stores/WelcomeStore.js';
import Searchbar from '../components/Searchbar.js';
import "./Welcome.css";


class Welcome extends React.Component {
    constructor(){
        super();
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
        WelcomeStore.on("ready", this.getData.bind(this));
        WelcomeStore.on('searcherror',this.throwError.bind(this));
    }

    componentWillUnmount() {
        WelcomeStore.removeListener("ready", this.getData.bind(this));
        WelcomeStore.removeListener('searcherror',this.throwError.bind(this));
    }
    render(){
        return(
          
    <div class="center">
      <h1>Fancy a drink tonight?</h1>
      <h2>Search for bars in your area and see where everyone else is going</h2>
      <Searchbar/>
      {this.state.error && <span>Oups, something went wrong. I can't get the search results. Please come back later.</span>}
        {this.state.data.businesses &&
          <Redirect to={{
            pathname: '/results/'+this.state.term,
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