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
    getToGo(){
        return this.togo;
    }
    handleActions(action) {
        switch(action.type) {
            case "SEARCH_START" :{
                this.emit('searchstart');
                break;
            }
            case "NEW_SEARCH": {
                this.businesses = action.data.businesses;
                this.togo= action.data.togo;
                this.region = action.data.region;
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
            case "ADD_PLACE": {
                this.togo= action.togo;
                this.emit("newplace");
                break;
            }
            case "REMOVE_PLACE": {
                this.togo= action.togo;
                this.emit("newplace");
                break;
            }
            case "REMOVE_PLACE_PROFILE": {
                this.togo= action.togo;
                this.emit("newplace");
                break;
            }
        }
    }
}

const resultsStore = new ResultsStore;
dispatcher.register(resultsStore.handleActions.bind(resultsStore));

export default resultsStore;