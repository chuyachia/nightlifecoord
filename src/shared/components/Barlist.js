import React from 'react';
import Bar from './Bar.js';
import BarlistStore from '../stores/BarlistStore.js';

class Barlist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            barids:this.props.businesses.map(bar=>bar.id),
            going:this.props.businesses.map(bar=> bar.going)
        };
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
            barids:businesses.map(bar=>bar.id),
            going:businesses.map(bar=> bar.going),
        });
    }
    plusOne(key){
        var newgoing = this.state.going;
        newgoing[key]+=1;
        this.setState({
            going:newgoing
        });
    }
    minusOne(key){
        var newgoing = this.state.going;
        newgoing[key]-=1;
        this.setState({
            going:newgoing
        });
    }
    minusWhenMatch(id){
        var matchid = this.state.barids.indexOf(id);
        if (matchid!==-1) {
            this.minusOne(matchid);
        }
    }

    render(){
        var togo = this.props.togo.map(bar => bar.id);
        return(<div>
            {this.props.businesses.map((bar,indx) => {
                return <Bar key = {indx} seq={indx} id ={bar.id} 
                image_url={bar.image_url} name={bar.name} 
                price={bar.price} categories={bar.categories}
                going={this.state.going[indx]} rating={bar.rating} review_count = {bar.review_count}
                added= {togo.indexOf(bar.id) == -1?false:true} 
                lat={bar.coordinates.latitude} lon={bar.coordinates.longitude} 
                country={bar.location.country} city={bar.location.city}
                loggedin = {this.props.loggedin}/>;
            })}
            </div>);
            
    }
}
export default Barlist;