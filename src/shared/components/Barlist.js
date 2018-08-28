import React from 'react';
import ReactDOM from 'react-dom';
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
        BarlistStore.on("scrollto", this.scrollTo.bind(this));
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.businesses!==this.props.businesses) {
            var parent = ReactDOM.findDOMNode(this).parentNode.parentNode;
            parent.scrollTop =0;              
        }
    }
    componentWillUnmount() {
        BarlistStore.removeListener("newdata", this.getNewData.bind(this));
        BarlistStore.removeListener("plusone", this.plusOne.bind(this));
        BarlistStore.removeListener("minusone", this.minusOne.bind(this));
        BarlistStore.removeListener("scrollto", this.scrollTo.bind(this));
    }
    scrollTo(id){
        var parent = ReactDOM.findDOMNode(this).parentNode.parentNode;
        var child =  ReactDOM.findDOMNode(this.refs[id]);
        parent.scrollTop = child.offsetTop;
    }
    getNewData(businesses){
        this.setState({
            businesses:businesses,
            priceicon:0,
            reviewsicon:0
        });
    }
    plusOne(id){
        var barids = this.state.businesses.map(bar=>bar.id);
        var matchid = barids.indexOf(id);
        if (matchid!==-1){
            var matched = Object.assign({},this.state.businesses[matchid],{going:this.state.businesses[matchid].going+1});
            this.setState({
                businesses:this.state.businesses.slice(0,matchid).concat(matched)
                .concat(this.state.businesses.slice(matchid+1))
            });
        }
    }
    minusOne(id){
        var barids = this.state.businesses.map(bar=>bar.id);
        var matchid = barids.indexOf(id);
        if (matchid!==-1){
            var matched = Object.assign({},this.state.businesses[matchid],{going:this.state.businesses[matchid].going-1});
            this.setState({
                businesses:this.state.businesses.slice(0,matchid).concat(matched)
                .concat(this.state.businesses.slice(matchid+1))
            });
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
        <div  ref="container">
            <h5>Sort by
            <span style={{float:'right'}}>
            Price <span style={{cursor:'pointer'}} onClick={()=> {this.changeOrderBy('price')}}>{this.sorticon[this.state.priceicon]}</span> &nbsp;
            Number of reviews <span style={{cursor:'pointer'}} onClick={()=> {this.changeOrderBy('reviews')}}>{this.sorticon[this.state.reviewsicon]}</span>
            </span>
            {this.state.businesses.length==0&&(<p>Nothing to show...</p>)}
            {this.state.businesses.map(bar => {
                return <Bar key={bar.id} id ={bar.id} ref={bar.id}
                image_url={bar.image_url} name={bar.name} 
                price={bar.price} categories={bar.categories}
                going={bar.going} rating={bar.rating} review_count = {bar.review_count}
                added= {togo.indexOf(bar.id) == -1?false:true} 
                lat={bar.coordinates.latitude} lon={bar.coordinates.longitude} 
                country={bar.location.country} city={bar.location.city}
                loggedin = {this.props.loggedin}/>;
            })}
            </h5>
        </div>);
            
    }
}
export default Barlist;