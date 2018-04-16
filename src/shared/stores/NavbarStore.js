import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class NavbarStore extends EventEmitter {
    constructor() {
        super();
    }
    handleActions(action) {
        switch(action.type) {
            case "NEW_SEARCH":{
                this.emit("newdata");
                break;
            }
           case "SEARCH_ERROR": {
            this.emit("searcherror");
            break;
          }
         case "SEARCH_NOT_FOUND": {
            this.emit("searchnotfound");
            break;
          }
        }
    }
}

const navbarStore = new NavbarStore;
dispatcher.register(navbarStore.handleActions.bind(navbarStore));

export default navbarStore;