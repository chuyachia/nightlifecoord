import React from 'react';
import Bar from './Bar.js';
import BarlistStore from '../stores/BarlistStore.js';

class Barlist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            going:this.props.businesses.map(bar=> bar.going)
        };
    }
    componentWillMount() {
        BarlistStore.on("newdata", this.getNewGoing.bind(this));
        BarlistStore.on("plusone", this.plusOne.bind(this));
        BarlistStore.on("minusone", this.minusOne.bind(this));
    }

    componentWillUnmount() {
        BarlistStore.removeListener("newdata", this.getNewGoing.bind(this));
        BarlistStore.removeListener("plusone", this.plusOne.bind(this));
        BarlistStore.removeListener("minusone", this.minusOne.bind(this));
    }
    getNewGoing(businesses){
        console.log('get new going');
        console.log(businesses);
        this.setState({
            going:businesses.map(bar=> bar.going)
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

    render(){
        return(<div>
            {this.props.businesses.map((bar,indx) => {
                return <Bar key = {indx} seq={indx} id ={bar.id} image_url={bar.image_url} name={bar.name} 
                price={bar.price} categories={bar.categories}
                going={this.state.going[indx]} rating={bar.rating} review_count = {bar.review_count}
                added= {this.props.togo.indexOf(bar.id) == -1?false:true} 
                lat={bar.coordinates.latitude} lon={bar.coordinates.longitude} 
                loggedin = {this.props.loggedin}/>;
            })}
            </div>);
            
    }
}
export default Barlist;