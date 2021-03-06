require('es6-promise').polyfill();
import dispatcher from "../dispatcher.js";
import axios from 'axios';

function searchActions(){
    this.getSearchResults = function(term){
        dispatcher.dispatch({
            type:"SEARCH_START"
        });
        axios.get('/search/'+term)
        .then(response => {
            if(response.data.error){
                dispatcher.dispatch({
                    type:"SEARCH_NOT_FOUND"
                });
            } else {
                dispatcher.dispatch({
                    type:"NEW_SEARCH",
                    data:response.data
                });
            }
        })
        .catch(error => {
            dispatcher.dispatch({
                type:"SEARCH_ERROR"
            });
        });
    };
}

export default new searchActions;