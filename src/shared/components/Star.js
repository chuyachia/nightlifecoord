'use strict';

import React from 'react';

class Star extends React.Component{
    constructor(props){
        super(props);
        this.starlist=[];
        for(var i = 1; i < 6; i++) {
            if(i <=this.props.rating){
                this.starlist.push(<span  key = {i} class="star on"></span>);
            } else {
                if (i ==this.props.rating){
                    this.starlist.push(<span  key = {i} class="star"></span>);
                } else {
                     this.starlist.push(<span  key = {i} class="star half"></span>);
                }
            }
        }
        this.starlist.push(<span key = {6} class="countvote">rated by {this.props.review_count} people</span>);        
    }
    render(){

        return(
            <div>{this.starlist}</div>
        );
    }
}
export default Star;