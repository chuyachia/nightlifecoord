'use strict';

import React from 'react';

class Star extends React.Component{
    render(){
        var starlist=[];
        for(var i = 1; i < 6; i++) {
            if(i <=this.props.rating){
                starlist.push(<span  key = {i} class="star on"></span>);
            } else {
                if (i ==this.props.rating){
                    starlist.push(<span  key = {i} class="star"></span>);
                } else {
                     starlist.push(<span  key = {i} class="star half"></span>);
                }
            }
        }
        starlist.push(<span  key = {6} class="countvote">rated by {this.props.review_count} people</span>);
        return(
            <div>{starlist}</div>
        );
    }
}
export default Star;