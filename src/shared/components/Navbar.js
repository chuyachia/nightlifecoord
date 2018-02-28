'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import Searchbar from './Searchbar';
import Action from '../actions/NavbarAction.js';

class Navbar extends React.Component {
    constructor(){
      super();
      this.state = {
        collapsed:true,
      };
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

       const navClass = this.state.collapsed ? "collapse" : "";
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
                    <Link class="navbar-brand" to="/">Nightlife Coordination App</Link>
                </div>
                <div class={"navbar-collapse "+navClass}  id="navbarColor01">
                <Searchbar nav={true} collapse={this.collapse.bind(this)}/>
                <ul class="nav navbar-nav navbar-right">
                    <li>{this.props.loggedin?<a onClick={this.collapse.bind(this)} href="/logout"><i class="fas fa-sign-in-alt"/>Log Out</a>:
                        <a onClick={this.collapse.bind(this)} href="/auth/github"><i class="fas fa-sign-out-alt"/>Log In</a>
                    }</li>
                    {this.props.loggedin?<li>
                    <a onClick={this.getOwnGoing.bind(this)} style={{cursor:'pointer'}}><i class="fas fa-user"/>My Profile</a>
                    </li>:null}
                    <li>
                        <a class onClick={this.collapse.bind(this)} href="https://github.com/chuyachia/" target="_blank"><i class="fas fa-code"/></a>
                    </li>
                </ul>
                </div>
              </div>
            </nav>  
         )
     }
}


export default Navbar;