'use strict';

import React from 'react';
import ReactModal from 'react-modal';
import ProfileModalStore from '../stores/ProfileModalStore.js';
import Action from '../actions/ProfileModalAction.js';
import Button from './Button.js';

class ProfileModal extends React.Component{
    constructor(){
        super();
        this.state={
            open:false,
            togo:[]
        };
    }
    componentWillMount() {
        ProfileModalStore.on("newdata", this.setData.bind(this));
        ProfileModalStore.on("removeplace", this.setData.bind(this));
    }

    componentWillUnmount() {
        ProfileModalStore.removeListener("newdata", this.setData.bind(this));
        ProfileModalStore.removeListener("removeplace", this.setData.bind(this));
    }

    setData(){
        var data = ProfileModalStore.getData();
        this.setState({
            open:true,
            togo:data
        });
    }
    
    removeToGo(id,name,country,city){
        Action.removeToGo(id,name,country,city);
    }
    
    
    close(){
        this.setState({open:false});
    }
    render(){
        var modalStyles = {overlay: {zIndex: 10}};
        return(
        <ReactModal style={modalStyles}
           isOpen={this.state.open}
           contentLabel="Review Modal">
          <a class="leaflet-popup-close-button" style={{float:"right",cursor:"pointer"}}>
          <i class="fas fa-times" onClick={this.close.bind(this)}/></a>
          <h3>Places that you are going to</h3>
           <div class='row'>
           {this.state.togo.length==0&&(<div class='col-md-4'><h4>Nothing to show</h4></div>)}
           {this.state.togo.map((bar,indx) => (
           <div class='col-md-4' key={indx}><h4>{bar.name} at {bar.city} ({bar.country})</h4>
           <Button title="Remove your presence"
           func={()=>this.removeToGo(bar.id,bar.name,bar.country,bar.city)} text="Remove"/>
           </div>
           ))}
           </div>
        </ReactModal>
        );
    }
}
export default ProfileModal;