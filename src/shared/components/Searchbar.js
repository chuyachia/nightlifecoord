'use strict';

import React from 'react';
import Action from '../actions/SearchAction.js';
import {Link } from "react-router-dom";

class Searchbar extends React.Component{
    constructor(){
        super();
        this.state={term:''};
    }
    addSearchTerm(event){
        this.setState({term: event.target.value});
    }
    submitSearch(event){
        event.preventDefault();
        //Action.getSearchResults(this.state.term);
    }
    
    render(){
      var term = this.state.term;
        return(
      <form onSubmit={this.submitSearch.bind(this)}>
        <div class="input-group">
          <input onChange={this.addSearchTerm.bind(this)} type="search" class="form-control" placeholder="Enter a city" required/>
          <span class="input-group-btn">
          <Link to={{
            pathname: '/results',
            state: { term: term}}}>Start</Link>
          </span>
        </div>
      </form>
        );
    }
}

/*            <button type="submit" class="btn">
              
            </button> */
export default Searchbar;