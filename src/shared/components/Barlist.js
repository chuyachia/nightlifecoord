import React from 'react';
import Bar from './Bar.js';
import Searchbar from './Searchbar.js';

class Barlist extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<div>
            {this.props.businesses.map((bar,indx) => {
                return <Bar key = {indx} id ={bar.id} image_url={bar.image_url} name={bar.name} 
                price={bar.price} categories={bar.categories}
                going={bar.going} rating={bar.rating} review_count = {bar.review_count}
                added= {this.props.togo.indexOf(bar.id) == -1?false:true} 
                lat={bar.coordinates.latitude} lon={bar.coordinates.longitude} 
                loggedin = {this.props.loggedin}/>;
            })}
            </div>);
            
    }
}
export default Barlist;