'use strict';

import React from 'react';
import Action from '../actions/SearchAction.js';
import SearchBarStore from '../stores/SearchBarStore.js';


class Searchbar extends React.Component{
    constructor(){
        super();
        this.throwError = this.throwError.bind(this);
        this.notFound = this.notFound.bind(this);
        this.removeLoading = this.removeLoading.bind(this);
        this.state={
          term:'',
          error:false,
          disabled:true,
          loading:false,
          notfound:false
        };
    }
    componentWillMount(){
        SearchBarStore.on("ready", this.removeLoading);
        SearchBarStore.on('searcherror',this.throwError);
        SearchBarStore.on('searchnotfound',this.notFound);
    }
    componentDidMount(){
      this.setState({disabled:false});
    }
    componentWillUnmount() {
       SearchBarStore.removeListener("ready", this.removeLoading);
        SearchBarStore.removeListener('searcherror',this.throwError);
        SearchBarStore.removeListener('searchnotfound',this.notFound);
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState.term&&prevState.term.length>0&&this.state.term.length==0){
          this.setState({
            error:false,
            notfound:false
          })
        }
    }
    addSearchTerm(event){
        this.setState({term: event.target.value});
    }
    removeLoading(){
      this.setState({
        loading:false,
        disabled:false
      })
    }
    throwError(){
      this.setState({
        notfound:false,
        error:true,
        disabled:false,
        loading:false
      });
    }
    notFound(){
      this.setState({
        notfound:true,
        error:false,
        disabled:false,
        loading:false
      });
    }
    submitSearch(event){
        event.preventDefault();
        this.setState({
          disabled:true,
          loading:true
        })
        if (this.props.collapse)
        this.props.collapse();
        Action.getSearchResults(this.state.term);
    }
    
    render(){
        return(
          <div>
            <form class={this.props.nav?"navbar-form navbar-left":""} onSubmit={this.submitSearch.bind(this)}>
              <div class="input-group">
                <input onChange={this.addSearchTerm.bind(this)} type="search" class="form-control" 
                placeholder="Enter a city" required autoFocus={!this.props.nav} value= {this.state.term}/>
                <span class="input-group-btn">
                  <button type="submit" class="btn btn-primary" disabled={this.state.disabled}>
                  {this.state.loading&&<i class="fas fa-spinner fa-pulse"></i>}
                    &nbsp;Start
                  </button> 
                </span>
              </div>
            </form>
            {this.state.error&& <small class="form-text text-muted">Oops, something went wrong. I can't get the search results. Please come back later.</small>}
            {this.state.notfound && <small class="form-text text-muted">No data found with the specified location. Please try another location.</small>}
          </div>
        );
    }
}
export default Searchbar;