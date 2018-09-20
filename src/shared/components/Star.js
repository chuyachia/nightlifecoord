'use strict';

import React from 'react';
import styled from 'styled-components';

const StarShape= styled.span`
    font-size: x-large;
    display: inline-block;
    width: 30px;
    color: ${props=>props.on?'#ffbf00':'gray'};
    &:last-child {
        margin-right: 0;
    }
    &:before {
        content:'\\2605';
    }
    &.half:after {
        content:'\\2605';
        color: #ffbf00;
        position: absolute;
        margin-left: -20px;
        width: 10px;
        overflow: hidden;       
    }
`;

class Star extends React.Component{
    constructor(props){
        super(props);
        this.starlist=[];
        for(var i = 1; i < 6; i++) {
            if(i <=this.props.rating){
                this.starlist.push(<StarShape key = {i} on/>);
            } else {
                if (i ==this.props.rating){
                    this.starlist.push(<StarShape key = {i}/>);
                } else {
                     this.starlist.push(<StarShape key = {i} class="half"/>);
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