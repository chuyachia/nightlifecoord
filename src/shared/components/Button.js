'use strict';

import React from 'react';

class Button extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(                    
         <div class="btn-group">
          <button type="button" class="btn btn-success" data-toggle="tooltip" disabled= {this.props.disabled} title={this.props.title} onClick={this.props.func}>{this.props.text}</button>
         </div>
         );
    }
}

export default Button;