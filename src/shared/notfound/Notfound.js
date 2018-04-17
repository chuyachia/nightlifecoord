'use strict'

import React from 'react';
import Footer from '../components/Footer.js';

class Notfound extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div class='container-fluid'>
            <h3>
             <i class="fas fa-eye fa-lg"></i>&nbsp;404&nbsp;
            Nothing to see here
            </h3>
            <Footer/>
            </div>
            )
    }
}

export default Notfound;