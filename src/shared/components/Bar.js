'use strict';

import React from 'react';
import Action from '../actions/BarAction.js';
import Star from './Star.js';
import Button from './Button.js';


class Bar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            addclickable:true,
            removeclickable:true
        };
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
            <div id = {this.props.id} class='result'>
            {
                this.props.image_url &&<img src= {this.props.image_url} width="150"/>
            }
                <div class="caption">
                    <h3>{this.props.name}</h3>
                    <h5>{this.props.price} | {this.props.categories[0].title}</h5>
                    <h4> {this.props.going} people going here tonight</h4>
                    <Star rating={this.props.rating} review_count={this.props.review_count}/>
                    <div class="btn-group btn-group-justified" role="group">
                    <Button title="Zoom on map" func={this.zoom.bind(this)} text="Zoom" disabled={false}/>
                    <Button title="View reviews" func={this.getReview.bind(this)} text="Reviews"  disabled={false}/>
                        { !this.props.loggedin
                            ? null
                            : ( this.props.added
                                ?<Button title="Remove your presence" func={this.removeToGo.bind(this)} text="Remove"  disabled={!this.state.removeclickable}/>
                                :<Button title="Indicate your presence" func={this.addToGo.bind(this)} text="Add"  disabled={!this.state.addclickable}/>
                            )
                        }
                    </div>
                </div>
                
            </div>
            
    );
    }

}
export default Bar;