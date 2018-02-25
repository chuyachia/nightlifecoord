'use strict';

import React from 'react';

class Navbar extends React.Component{
    render(){
        return(<div style={{position:"fixed",top:"0",width:"100%",zIndex:5}}>
        <h1>Nightlife Coordination App</h1>
        {this.props.loggedin?<a href="/logout"><i class="fas fa-sign-in-alt"/>Log Out</a>:
            <a href="/auth/github"><i class="fas fa-sign-in-alt"/>Log In</a>
        }
        </div>
        );
    }
}
export default Navbar;