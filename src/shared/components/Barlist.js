import React from 'react';
import Bar from './Bar.js';
import Searchbar from './Searchbar.js';

class Barlist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            businesses:this.props.businesses,
            togo:this.props.togo
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(this.props);
        console.log(nextProps);
         this.setState({
             businesses: nextProps.businesses,
             togo:nextProps.togo
         }) // This will update your component.
    }
    render(){
        var togo = this.state.togo;
        return(<div>
        <Searchbar/>
            {this.state.businesses.map(function(bar,indx){
                return <Bar key = {indx} id ={bar.id} image_url={bar.image_url} name={bar.name} price={bar.price} categories={bar.categories}
                going={bar.going} rating={bar.rating} review_count = {bar.review_count}
                added= {togo.indexOf(bar.id) == -1?false:true} lat={bar.coordinates.latitude} lon={bar.coordinates.longitude}/>;
            })}
            </div>);
            
    }
}
export default Barlist;