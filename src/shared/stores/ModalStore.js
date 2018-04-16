import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ModalStore extends EventEmitter {
    constructor() {
        super();
        this.data = {};
        this.name='';
    }
    getAll() {
        return {data:this.data,name:this.name};
    }
    
    handleActions(action) {
        switch(action.type) {
          case "REVIEW": {
            this.data = action.data;
            this.name = action.name;
            this.emit("change");
            break;
          }
        }
    }
}

const modalStore = new ModalStore;
dispatcher.register(modalStore.handleActions.bind(modalStore));

export default modalStore;