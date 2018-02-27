'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import Searchbar from './Searchbar';

class Navbar extends React.Component {
    constructor(){
      super();
      this.state = {
        collapsed:true,
      };
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
                    <li>{this.props.loggedin?<a class='logbtn' onClick={this.collapse.bind(this)} href="/logout"><i class="fas fa-sign-in-alt"/>Log Out</a>:
                        <a class='logbtn' onClick={this.collapse.bind(this)} href="/auth/github"><i class="fas fa-sign-out-alt"/>Log In</a>
                    }</li>
                </ul>
                </div>
              </div>
            </nav>  
         )
     }
}


export default Navbar;