'use strict';

import React from 'react';
import Action from '../actions/BarAction.js';
import Star from './Star.js';

class Bar extends React.Component{
    zoom(){
        Action.zoom({latitude:this.props.lat, longitude:this.props.lon});
    }
    getReview(){

        Action.getReview(this.props.id,this.props.name);
    }
    render(){
        return(
            <div id = {this.props.id}>
            {
                this.props.image_url &&<img src= {this.props.image_url} width="150"/>
            }
                <div class="caption">
                    <h3>{this.props.name}</h3>
                    <h5>{this.props.price} | {this.props.categories[0].title}</h5>
                    <h4> {this.props.going} people going here tonight</h4>
                    <Star rating={this.props.rating} review_count={this.props.review_count}/>
                    <div class="btn-group btn-group-justified" role="group">
                      <button type="button" class="btn" data-toggle="tooltip" title="Zoom on map" onClick={this.zoom.bind(this)}>Zoom</button>
                      <button type="button" class="btn" data-toggle="tooltip" title="View reviews" onClick={this.getReview.bind(this)}>Reviews</button>
                      {this.props.added?
                      <button type="button" class="btn" data-toggle="tooltip" title="Remove your presence">Remove</button>:
                      <button type="button" class="btn" data-toggle="tooltip" title="Indicate your presence">Add</button>}
                    </div>
                </div>
                
            </div>
            
    );
    }

}
export default Bar;