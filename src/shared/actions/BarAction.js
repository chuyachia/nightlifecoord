import dispatcher from "../dispatcher.js";
import axios from 'axios';

function barActions(){
    this.addToGo = function(id){
        axios.post('/place/'+id)
        .then(response=> dispatcher.dispatch({
            type:"ADD_PLACE",
            togo:response.data.places
        }))
        .catch(error => console.log(error));
    };
    this.removeToGo = function(id){
        axios.delete('/place/'+id)
        .then(response=> dispatcher.dispatch({
            type:"REMOVE_PLACE",
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