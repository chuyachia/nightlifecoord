import dispatcher from "../dispatcher.js";
import axios from 'axios';

function barActions(){
    this.addToGo = function(id){
        axios.post('/place/'+id)
        .then(response=>dispatcher.dispatch({
                type:"NEW_PLACE",
                placeid:id
            }))
        .catch(error => console.log(error));
    };
    this.removeToGo = function(id){
        axios.delete('/place/'+id)
        .then(response=>console.log(response))
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