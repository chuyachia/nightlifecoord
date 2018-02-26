import { EventEmitter } from "events";
import dispatcher from "../dispatcher";


class ResultsStore extends EventEmitter {
    constructor() {
        super();
        this.businesses = [];
        this.togo=[];
        this.region={};
    }
    getAll() {
        return {businesses:this.businesses,togo:this.togo,region:this.region};
    }
    
    handleActions(action) {
        switch(action.type) {
        case "NEW_SEARCH": {
            console.log('Results store received data');
            this.businesses = action.data.businesses;
            this.togo= action.data.togo;
            this.region = action.data.region;
            this.emit("change");
            break;
          }
        }
    }
}

const resultsStore = new ResultsStore;
dispatcher.register(resultsStore.handleActions.bind(resultsStore));

export default resultsStore;