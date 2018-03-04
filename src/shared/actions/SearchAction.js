require('es6-promise').polyfill();
import dispatcher from "../dispatcher.js";
import axios from 'axios';

function searchActions(){
    this.getSearchResults = function(term){
         axios.get('/search/'+term)
          .then(response => response.data.error?
                dispatcher.dispatch({
                    type:"SEARCH_ERROR"
                }):dispatcher.dispatch({
                  type:"NEW_SEARCH",
                  data:response.data
              }))
          .catch(error => dispatcher.dispatch({
                type:"SEARCH_ERROR"
            }));
    };
    
}

export default new searchActions;