import React from 'react';
import Bar from './Bar.js';
import BarlistStore from '../stores/BarlistStore.js';
import orderBy from "lodash.orderby";

class Barlist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            businesses:this.props.businesses,
            priceicon:0,
            reviewsicon:0
        };
        this.sorticon = [<i class="fas fa-sort"/>,<i class="fas fa-sort-up"/>,<i class="fas fa-sort-down"/>];
    }
    componentWillMount() {
        BarlistStore.on("newdata", this.getNewData.bind(this));
        BarlistStore.on("plusone", this.plusOne.bind(this));
        BarlistStore.on("minusone", this.minusOne.bind(this));
        BarlistStore.on("minusifmatch", this.minusWhenMatch.bind(this));
        
    }

    componentWillUnmount() {
        BarlistStore.removeListener("newdata", this.getNewData.bind(this));
        BarlistStore.removeListener("plusone", this.plusOne.bind(this));
        BarlistStore.removeListener("minusone", this.minusOne.bind(this));
        BarlistStore.removeListener("minusifmatch", this.minusWhenMatch.bind(this));
    }
    getNewData(businesses){
        this.setState({
            businesses:businesses,
            priceicon:0,
            reviewsicon:0
        });
    }
    plusOne(key){
        var businesses = this.state.businesses;
        businesses[key].going+=1;
        this.setState({
            businesses:businesses
        });
    }
    minusOne(key){
        var businesses = this.state.businesses;
        businesses[key].going-=1;
        this.setState({
            businesses:businesses
        });
    }
    minusWhenMatch(id){
        var barids=this.state.businesses.map(bar=>bar.id);
        var matchid = barids.indexOf(id);
        if (matchid!==-1) {
            this.minusOne(matchid);
        }
    }
    changeOrderBy(criteria){
        switch(criteria){
            case 'price':{
                var order = this.state.priceicon%2+1==1?'asc':'desc';
                var businesses = orderBy(this.state.businesses,function(bar) {
                    var len = bar.price? bar.price.length:0; 
                    return len;
                },order);
                this.setState({
                    businesses:businesses,
                    priceicon:this.state.priceicon%2+1,
                    reviewsicon:0
                });
                break;
            }
            case 'reviews':{
               var order = this.state.reviewsicon%2+1==1?'asc':'desc';
               var businesses = orderBy(this.state.businesses,'review_count',order);
               this.setState({
                    businesses:businesses,
                    reviewsicon:this.state.reviewsicon%2+1,
                    priceicon:0
                });
                break;
            }
        }
    }
    render(){
        var togo = this.props.togo.map(bar => bar.id);
        return(
        <div><h5>Sort by
        <span style={{float:'right'}}>
        Price <span style={{cursor:'pointer'}} onClick={()=> {this.changeOrderBy('price')}}>{this.sorticon[this.state.priceicon]}</span> &nbsp;
        Number of reviews <span style={{cursor:'pointer'}} onClick={()=> {this.changeOrderBy('reviews')}}>{this.sorticon[this.state.reviewsicon]}</span></span>
            {this.state.businesses.map((bar,indx) => {
                return <Bar key = {indx} seq={indx} id ={bar.id} 
                image_url={bar.image_url} name={bar.name} 
                price={bar.price} categories={bar.categories}
                going={bar.going} rating={bar.rating} review_count = {bar.review_count}
                added= {togo.indexOf(bar.id) == -1?false:true} 
                lat={bar.coordinates.latitude} lon={bar.coordinates.longitude} 
                country={bar.location.country} city={bar.location.city}
                loggedin = {this.props.loggedin}/>;
            })}</h5>
            </div>);
            
    }
}
export default Barlist;