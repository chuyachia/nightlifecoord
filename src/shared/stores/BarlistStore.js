import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class BarlistStore extends EventEmitter {
    constructor() {
        super();
    }
    handleActions(action) {
        switch(action.type) {
             case "NEW_SEARCH": {
                this.emit("newdata",action.data.businesses);
                break;
              }
              case "ADD_PLACE": {
                this.emit("plusone", action.id);
                break;
              }
             case "REMOVE_PLACE": {
                this.emit("minusone", action.id);
                break;
              }
            case "SCROLL_TO": {
                this.emit("scrollto",action.id);
                break;
            }
        }

    }
}

const barlistStore = new BarlistStore;
dispatcher.register(barlistStore.handleActions.bind(barlistStore));

export default barlistStore;