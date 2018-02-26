import { EventEmitter } from "events";
import dispatcher from "../dispatcher";


class ResultsStore extends EventEmitter {
    constructor() {
        super();
        this.businesses = [];
        this.togo=[];
        this.lat='';
        this.lon='';
    }
    getAll() {
        return {businesses:this.businesses,togo:this.togo,lat:this.lat,lon:this.lon};
    }
    
    handleActions(action) {
        switch(action.type) {
        case "NEW_SEARCH": {
            console.log('Results store received data');
            this.businesses = action.data.businesses;
            this.togo= action.data.togo;
            this.lat = action.data.region.center.latitude;
            this.lon = action.data.region.center.longitude;
            this.emit("change");
            break;
          }
        case "NEW_PLACE": {
            console.log('Results store received new place');
            this.togo.push(action.placeid);
            console.log(this.togo);
            this.emit("change");
            break;
          }
        }
    }
}

const resultsStore = new ResultsStore;
dispatcher.register(resultsStore.handleActions.bind(resultsStore));

export default resultsStore;