import dispatcher from "../dispatcher.js";
import axios from 'axios';

function navbarActions(){

    this.getOwnGoing = function(){
        axios.get('/togo')
          .then(response => dispatcher.dispatch({
                type:"OWN_GOING",
                togo:response.data
            }))
          .catch(error => console.log(error));
    };
}

export default new navbarActions;