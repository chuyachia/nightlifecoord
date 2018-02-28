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
            console.log('barlist store receive add');
            this.emit("plusone", action.key);
            break;
          }
         case "REMOVE_PLACE": {
            this.emit("minusone", action.key);
            break;
          }
        case "REMOVE_PLACE_PROFILE": {
            this.emit("minusifmatch",action.id);
            break;
          }
        }
    }
}

const barlistStore = new BarlistStore;
dispatcher.register(barlistStore.handleActions.bind(barlistStore));

export default barlistStore;