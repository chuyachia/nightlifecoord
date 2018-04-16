'use strict';

import React from 'react';
import Action from '../actions/SearchAction.js';

class Searchbar extends React.Component{
    constructor(){
        super();
        this.state={
          term:''
        };
    }
    componentWillReceiveProps(nextprop){
    if(this.props.disabled&&nextprop.disabled!=this.props.disabled)
        this.setState({term:''});
     }
    addSearchTerm(event){
        this.setState({term: event.target.value});
    }
    submitSearch(event){
        event.preventDefault();
        if(this.props.disablefunc)
        this.props.disablefunc();
        if (this.props.collapse)
        this.props.collapse();
        Action.getSearchResults(this.state.term);
    }
    
    render(){
        return(
      <form class={this.props.nav?"navbar-form navbar-left":""} onSubmit={this.submitSearch.bind(this)}>
        <div class="input-group">
          <input onChange={this.addSearchTerm.bind(this)} type="search" class="form-control" 
          placeholder="Enter a city" required autoFocus={!this.props.nav} value= {this.state.term}/>
          <span class="input-group-btn">
            <button type="submit" class="btn btn-primary" disabled={this.props.disabled}>
            {this.props.disabled&&<i class="fas fa-spinner fa-pulse"></i>}
              &nbsp;Start
            </button> 
          </span>
        </div>
      </form>
        );
    }
}
export default Searchbar;