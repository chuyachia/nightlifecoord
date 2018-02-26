'use strict';

import React from 'react';
import Action from '../actions/BarAction.js';
import Star from './Star.js';

class Bar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            going:this.props.going,
            addclickable:true,
            removeclickable:true
        };
    }
    zoom(){
        Action.zoom({latitude:this.props.lat, longitude:this.props.lon});
    }
    getReview(){
        Action.getReview(this.props.id,this.props.name);
    }
    addToGo(){
        this.disabled = true;
        Action.addToGo(this.props.id);
        this.setState({
            going:this.state.going+1,
            addclickable:false,
            removeclickable:true,
        });
    }
    removeToGo(){
        this.disabled = true;
        Action.removeToGo(this.props.id);
        this.setState({
            going:this.state.going-1,
            removeclickable:false,
            addclickable:true,
        });
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
                    <h4> {this.state.going} people going here tonight</h4>
                    <Star rating={this.props.rating} review_count={this.props.review_count}/>
                    <div class="btn-group btn-group-justified" role="group">
                    <div class="btn-group">
                      <button type="button" class="btn" data-toggle="tooltip" title="Zoom on map" onClick={this.zoom.bind(this)}>Zoom</button>
                     </div>
                     <div class="btn-group">
                      <button type="button" class="btn" data-toggle="tooltip" title="View reviews" onClick={this.getReview.bind(this)}>Reviews</button>
                     </div>
                        { !this.props.loggedin
                            ? null
                            : ( this.props.added
                                ? <div class="btn-group"><button disabled={!this.state.removeclickable} type="button" class="btn" data-toggle="tooltip" title="Remove your presence" onClick={this.removeToGo.bind(this)}>Remove</button></div>
                                : <div class="btn-group"><button disabled={!this.state.addclickable} type="button" class="btn" data-toggle="tooltip" title="Indicate your presence" onClick={this.addToGo.bind(this)}>Add</button></div>
                            )
                        }

                    </div>
                </div>
                
            </div>
            
    );
    }

}
export default Bar;