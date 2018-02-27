'use strict';

import React from 'react';
import Action from '../actions/SearchAction.js';

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
        Action.getSearchResults(this.state.term);
    }
    
    render(){
        return(
      <form class={this.props.nav?"navbar-form navbar-left":""} onSubmit={this.submitSearch.bind(this)}>
        <div class="input-group">
          <input onChange={this.addSearchTerm.bind(this)} type="search" class="form-control" placeholder="Enter a city" required/>
          <span class="input-group-btn">
            <button type="submit" class="btn">
              Start
            </button> 
          </span>
        </div>
      </form>
        );
    }
}
export default Searchbar;