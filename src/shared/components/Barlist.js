import React from 'react';
import Bar from './Bar.js';
import Searchbar from './Searchbar.js';

class Barlist extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var togo = this.props.togo;
        return(<div>
        <Searchbar/>
            {this.props.businesses.map(function(bar,indx){
                return <Bar key = {indx} id ={bar.id} image_url={bar.image_url} name={bar.name} price={bar.price} categories={bar.categories}
                going={bar.going} rating={bar.rating} review_count = {bar.review_count}
                added= {togo.indexOf(bar.id) == -1?false:true} lat={bar.coordinates.latitude} lon={bar.coordinates.longitude}/>;
            })}
            </div>);
            
    }
}
export default Barlist;