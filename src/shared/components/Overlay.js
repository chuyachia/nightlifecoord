import React from 'react';
import styled from 'styled-components';

const OverlayDiv = styled.div`
    background-color:rgba(204,204,204,0.3);
    position:absolute;
    width:100%;
    height:100%;
    top:0px;
    left:0px;
    z-index:10;
    display:${props=>props.hide?'none':'inherit'}
`;

var Overlay = ({hide})=>(
    <OverlayDiv hide={hide}/>
    );
    
export default Overlay;