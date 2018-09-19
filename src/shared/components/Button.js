'use strict';

import React from 'react';

var Button = ({disabled,title,func,text})=>(<div class="btn-group">
          <button type="button" class="btn btn-success" data-toggle="tooltip" disabled= {disabled} title={title} onClick={func}>{text}</button>
         </div>);


export default Button;