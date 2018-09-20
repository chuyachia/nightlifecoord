'use strict';

import React from 'react';
import styled from 'styled-components';

const FooterDiv = styled.div`
    position:fixed;
    bottom:0;
    right:0;
    text-align: right;
    padding:15px;
    z-index:2
    span {
        position:relative;
        display:block;
        margin-top:5px;        
    }
    i {
        color:#000000;
    }
`;

var Footer = ()=>(<FooterDiv>
            <span><a href="https://github.com/chuyachia/" target="_blank"><i class="fab fa-github fa-2x"></i></a></span> 
            <span><a href="mailto:chuyachia@gmail.com"><i class="fas fa-at fa-2x"></i></a></span>
            </FooterDiv>);


export default Footer;