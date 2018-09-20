'use strict';

import React from 'react';
import Modal from './Modal.js';
import Overlay from './Overlay.js';
import ModalStore from '../stores/ModalStore.js';

class BarInfoModal extends React.Component{
    constructor(){
        super();
        this.state={
            open:false,
            reviews:[],
            bar:''
        };
        this.close = this.close.bind(this);
    }
    componentWillMount() {
        ModalStore.on("change", this.showData.bind(this));
    }

    componentWillUnmount() {
        ModalStore.removeListener("change", this.showData.bind(this));
    }
    showData(){
        var storedata = ModalStore.getAll();
        this.setState({open:true,reviews:storedata.data,bar:storedata.name});
    }
    close(){
        this.setState({open:false});
    }
    render(){
        var modalStyles = {overlay: {zIndex: 10}};
        var reviewlist =[];
        if(this.state.reviews.length>0){
            this.state.reviews.forEach(function(review,indx){
            reviewlist.push(<blockquote key={indx}><p>{review.text}</p><span><a href={review.url} target='_blank'>Read more</a></span>
                            <footer>{review.user.name}<cite>{review.time_created}</cite></footer></blockquote>);
            });
        } else {
             reviewlist.push(<p key="0">No review to show...</p>)
        }
        return(
        <div>
            <Modal open={this.state.open}>
              <a class="leaflet-popup-close-button" style={{float:"right",cursor:"pointer"}}>
              <i class="fas fa-times" onClick={this.close}/></a>
               <h3>{this.state.bar}</h3>
               {reviewlist}
            </Modal>
            <Overlay hide={this.state.open?false:true}/>
        </div>
        );
    }
}
export default BarInfoModal;