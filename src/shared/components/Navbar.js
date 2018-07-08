'use strict';

import React from 'react';
import Searchbar from './Searchbar';
import Action from '../actions/NavbarAction.js';
import NavbarStore from '../stores/NavbarStore.js';


class Navbar extends React.Component {
    constructor(){
      super();
      this.enable = this.enable.bind(this);
      this.throwError = this.throwError.bind(this);
      this.notFound = this.notFound.bind(this);
      this.state = {
        disabled:false,
        collapsed:true,
        error:false,
        notfound:false
      };
    }
    componentWillMount() {
        NavbarStore.on('newdata',this.enable);
        NavbarStore.on('searcherror',this.throwError);
        NavbarStore.on('searchnotfound',this.notFound);
    }
    componentWillUnmount() {
        NavbarStore.removeListener('newdata',this.enable);
        NavbarStore.removeListener('searcherror',this.throwError);
        NavbarStore.removeListener('searchnotfound',this.notFound);
    }
    disableFunc(){
      this.setState({
        disabled:true
      })
    }
    enable(){
      this.setState({
        disabled:false
      });
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

    getOwnGoing(){
        Action.getOwnGoing();
    }
    toggleCollapse(){
        var collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }
    collapse(){
        if (!this.state.collapsed)
          this.setState({collapsed:true});
    }
     render(){
         return(
           <nav class="navbar navbar-default">
             <div class="container-fluid">
                <div class="navbar-header">
                      <button type="button" class="navbar-toggle collapsed" onClick={this.toggleCollapse.bind(this)}>
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                      </button>
                    <div class="navbar-brand">Nightlife Coordination App</div>
                </div>
                <div class={`navbar-collapse ${this.state.collapsed?'collapse':''}`}  id="navbarColor01">
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                        <Searchbar nav={true} collapse={this.collapse.bind(this)} disabled={this.state.disabled} disablefunc = {this.disableFunc.bind(this)}/>
                        </li>
                        <li>{this.props.loggedin?<a onClick={this.collapse.bind(this)} href="/logout"><i class="fas fa-sign-in-alt"/>Log Out</a>:
                            <a onClick={this.collapse.bind(this)} href="/auth/github"><i class="fas fa-sign-out-alt"/>Log In</a>
                        }</li>
                        {this.props.loggedin?<li>
                        <a onClick={this.getOwnGoing.bind(this)} style={{cursor:'pointer'}}><i class="fas fa-user"/>My Profile</a>
                        </li>:null}
                        <li>
                            <a class onClick={this.collapse.bind(this)} href="https://github.com/chuyachia/nightlifecoord" target="_blank"><i class="fas fa-code"/></a>
                        </li>
                    </ul>
                </div>
              </div>
            </nav>  
         )
     }
}


export default Navbar;