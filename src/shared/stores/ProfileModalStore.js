import { EventEmitter } from "events";
import dispatcher from "../dispatcher";


class ProfileModalStore extends EventEmitter {
    constructor() {
        super();
        this.togo = [];
    }
    getData() {
        return this.togo;
    }
    handleActions(action) {
        switch(action.type) {
        case "OWN_GOING": {
            this.togo = action.togo;
            this.emit("newdata");
            break;
          }
         case "REMOVE_PLACE_PROFILE": {
            this.togo = action.togo;
            this.emit("removeplace");
            break;
          }
        }
    }
}

const profileModalStore = new ProfileModalStore;
dispatcher.register(profileModalStore.handleActions.bind(profileModalStore));

export default profileModalStore;