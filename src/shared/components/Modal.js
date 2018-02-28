'use strict';

import React from 'react';
import ReactModal from 'react-modal';
import ModalStore from '../stores/ModalStore.js';

class Modal extends React.Component{
    constructor(){
        super();
        this.state={
            open:false,
            reviews:[],
            bar:''
        };
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
        this.state.reviews.forEach(function(review,indx){
        reviewlist.push(<blockquote key={indx}><p>{review.text}</p><span><a href={review.url} target='_blank'>Read more</a></span>
                        <footer>{review.user.name}<cite>{review.time_created}</cite></footer></blockquote>);
        });
        return(
        <ReactModal style={modalStyles}
           isOpen={this.state.open}
           ariaHideApp={false}
           contentLabel="Review Modal">
          <a class="leaflet-popup-close-button" style={{float:"right",cursor:"pointer"}}><i class="fas fa-times" onClick={this.close.bind(this)}/></a>
           <h3>{this.state.bar}</h3>
           {reviewlist}
        </ReactModal>
        );
    }
}
export default Modal;