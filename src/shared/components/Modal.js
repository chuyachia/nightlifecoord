import React from 'react';
import styled from 'styled-components';

const ModalDiv = styled.div`
    border: 1px solid #cccccc;
    border-radius: 4px 4px 4px 4px;
    box-shadow: 1px 1px 4px #888888;
    position:absolute;
    width:100%;
    max-height:85%;
    overflow-y:scroll;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    z-index:15;
    display:${props=>props.open?'inherit':'none'}
    background-color:white;
    padding: 10px;
    @media (min-width: 768px) {
        width:60%;
    }
`;

var Modal = ({open,children})=>(
    <ModalDiv open={open}>{children}</ModalDiv>
    );
    
export default Modal;