require('es6-promise').polyfill();
import dispatcher from "../dispatcher.js";
import axios from 'axios';

function barActions(){
    this.addToGo = function(id,name,country,city){
        axios.post('/place/'+id+'/'+name+'/'+country+'/'+city)
        .then(response=> dispatcher.dispatch({
            type:"ADD_PLACE",
            id : id,
            togo:response.data.places
        }))
        .catch(error => console.log(error));
    };
    this.removeToGo = function(id,name,country,city){
        axios.delete('/place/'+id+'/'+name+'/'+country+'/'+city)
        .then(response=> dispatcher.dispatch({
            type:"REMOVE_PLACE",
            id : id,
            togo:response.data.places
        }))
        .catch(error => console.log(error));
    };
    this.zoom= function(coord){
       dispatcher.dispatch({
        type:"ZOOM",
        data:coord
        }); 
    };
    this.scrollTo = function(id){
       dispatcher.dispatch({
            type:"SCROLL_TO",
            id:id
        });
    };
    this.getReview = function(id,name){
        axios.get('/review/'+id)
          .then(response => dispatcher.dispatch({
                type:"REVIEW",
                data:response.data.reviews,
                name:name
            }))
          .catch(error => console.log(error));
    };
    
    
}

export default new barActions;