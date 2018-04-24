import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class SearchBarStore extends EventEmitter {
    constructor() {
        super();
    }
    handleActions(action) {
        switch(action.type) {
         case "NEW_SEARCH": {
            this.emit("ready");
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

const searchbarStore = new SearchBarStore;
dispatcher.register(searchbarStore.handleActions.bind(searchbarStore));

export default searchbarStore;