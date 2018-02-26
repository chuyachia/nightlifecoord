'use strict';

import React from 'react';

class Navbar extends React.Component{
    render(){
        return(<div class='titlebar col-md-12'>
        <span class='apptitle'>Nightlife Coordination App</span>
        {this.props.loggedin?<a class='logbtn' href="/logout"><i class="fas fa-sign-in-alt"/>Log Out</a>:
            <a class='logbtn' href="/auth/github"><i class="fas fa-sign-out-alt"/>Log In</a>
        }
        </div>
        );
    }
}
export default Navbar;