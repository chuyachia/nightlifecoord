import dispatcher from "../dispatcher.js";
import axios from 'axios';
import "isomorphic-fetch";

function searchActions(){
    this.getSearchResults = function(term){
         axios.get('/search/'+term)
          .then(response => 
          dispatcher.dispatch({
              type:"NEW_SEARCH",
              data:response.data
          }))
          .catch(error => console.log(error)/*dispatcher.dispatch({
                type:"SEARCH_ERROR"
            })*/);
    };
    
}

export default new searchActions;