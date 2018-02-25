import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class WelcomeStore extends EventEmitter {
    constructor() {
        super();
        this.data = {};
    }
    getAll() {
        return this.data;
    }
    handleActions(action) {
        switch(action.type) {
          case "NEW_SEARCH": {
            console.log('Welcome store received data');
            this.data = action.data;
            this.emit("ready");
            break;
          }
           case "SEARCH_ERROR": {
            console.log('Welcome store received error');
            this.emit("searcherror");
            break;
          }
        }
    }
}

const welcomeStore = new WelcomeStore;
dispatcher.register(welcomeStore.handleActions.bind(welcomeStore));

export default welcomeStore;