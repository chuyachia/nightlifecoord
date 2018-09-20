'use strict';

import React from 'react';
import Action from '../actions/BarAction.js';
import Star from './Star.js';
import Button from './Button.js';
import styled from 'styled-components';

const Item= styled.div`
    margin-top:20px;
    margin-bottom:20px;
`;

class Bar extends React.Component{
    constructor(){
        super();
        this.state={
            addclickable:true,
            removeclickable:true
        };
        this.zoom = this.zoom.bind(this);
        this.getReview = this.getReview.bind(this);
        this.removeToGo = this.removeToGo.bind(this);
        this.addToGo = this.addToGo.bind(this);
    }
    componentWillReceiveProps(){
         this.setState({
            addclickable:true,
            removeclickable:true 
         });
     }
    zoom(){
        Action.zoom({latitude:this.props.lat, longitude:this.props.lon});
    }
    getReview(){
        Action.getReview(this.props.id,this.props.name);
    }
    addToGo(){
        Action.addToGo(this.props.id,this.props.name,this.props.country,this.props.city);
        this.setState({
            addclickable:false,
            removeclickable:true
        });
    }
    removeToGo(){
        Action.removeToGo(this.props.id,this.props.name,this.props.country,this.props.city);
        this.setState({
            addclickable:true,
            removeclickable:false
        });
    }
    
    render(){
        return(
            <Item id = {this.props.id} >
            {this.props.image_url &&<img src= {this.props.image_url} width="150"/>}
                <div class="caption">
                    <h3>{this.props.name}</h3>
                    <h5>{this.props.price} | {this.props.categories[0].title}</h5>
                    <h4> {this.props.going} people going here tonight</h4>
                    <Star rating={this.props.rating} review_count={this.props.review_count}/>
                    <div class="btn-group btn-group-justified" role="group">
                    <Button title="Zoom on map" func={this.zoom} text="Zoom" disabled={false}/>
                    <Button title="View reviews" func={this.getReview} text="Reviews"  disabled={false}/>
                        { !this.props.loggedin
                            ? null
                            : ( this.props.added
                                ?<Button title="Remove your presence" func={this.removeToGo} text="Remove"  disabled={!this.state.removeclickable}/>
                                :<Button title="Indicate your presence" func={this.addToGo} text="Add"  disabled={!this.state.addclickable}/>
                            )
                        }
                    </div>
                </div>
            </Item>
    );
    }

}
export default Bar;