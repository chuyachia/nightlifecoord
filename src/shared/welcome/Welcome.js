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
        this.state={data:{}};
    }
    getData() {
        this.setState({
          data:WelcomeStore.getAll()
        });
    }
    componentWillMount() {
        WelcomeStore.on("ready", this.getData);
    }
    componentWillUnmount() {
        WelcomeStore.removeListener("ready", this.getData);
    }
    render(){
        return(
    <div class="center">
      <h1>Fancy a drink tonight?</h1>
      <h2>Search for bars in your area and see where everyone else is going</h2>
      <Searchbar nav={false} collapse={null} />
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