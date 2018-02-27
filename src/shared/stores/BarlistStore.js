import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class BarlistStore extends EventEmitter {
    constructor() {
        super();
    }
    handleActions(action) {
        switch(action.type) {
         case "NEW_SEARCH": {
            console.log('Barlist store received data');
            this.emit("newdata",action.data.businesses);
            break;
          }
          case "ADD_PLACE": {
            console.log('Barlist store received data');
            this.emit("plusone", action.key);
            break;
          }
         case "REMOVE_PLACE": {
            console.log('Barlist store received data');
            this.emit("minusone", action.key);
            break;
          }
        }
    }
}

const barlistStore = new BarlistStore;
dispatcher.register(barlistStore.handleActions.bind(barlistStore));

export default barlistStore;