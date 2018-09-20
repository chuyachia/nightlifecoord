'use strict';

import React from 'react';
import {Redirect } from "react-router-dom";
import WelcomeStore from '../stores/WelcomeStore.js';
import Searchbar from '../components/Searchbar.js';
import Footer from '../components/Footer.js';
import styled from 'styled-components';


const Centered= styled.div`
  width: 80%;
  height: 60%;
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  @media (min-width: 600px) {
      width: 60%;
  }
  
  @media (min-width: 2200px) {
      width: 50%;
  }
`;



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
        <Centered>
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
        </Centered>
    );
    }
}

export default Welcome;