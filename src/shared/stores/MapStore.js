import { EventEmitter } from "events";
import dispatcher from "../dispatcher";


class MapStore extends EventEmitter {
    constructor() {
        super();
        this.zoom={};
    }
    getZoom(){
        return this.zoom;
    }
    
    handleActions(action) {
        switch(action.type) {
        case "ZOOM": {
            this.zoom = action.data;
            this.emit("zoom");
            break;
          }
        }
    }
}

const mapStore = new MapStore;
dispatcher.register(mapStore.handleActions.bind(mapStore));

export default mapStore;