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
                    <Link class="navbar-brand" to="/">Nightlife Coordination App</Link>
                </div>
                <Searchbar nav={true}/>
                <ul class="nav navbar-nav navbar-right">
                    <li>{this.props.loggedin?<a class='logbtn' href="/logout"><i class="fas fa-sign-in-alt"/>Log Out</a>:
                        <a class='logbtn' href="/auth/github"><i class="fas fa-sign-out-alt"/>Log In</a>
                    }</li>
                </ul>
              </div>
            </nav>  
         )
     }
}


export default Navbar;