require('es6-promise').polyfill();
import dispatcher from "../dispatcher.js";
import axios from 'axios';

function profilemodalActions(){
    this.removeToGo = function(id,name,country,city){
        axios.delete('/place/'+id+'/'+name+'/'+country+'/'+city)
        .then(response=> dispatcher.dispatch({
            type:"REMOVE_PLACE_PROFILE",
            togo: response.data.places,
            id:id
        }))
        .catch(error => console.log(error));
    };
    
    
}

export default new profilemodalActions;