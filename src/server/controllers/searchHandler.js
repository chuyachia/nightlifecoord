'use strict';

import querystring from 'querystring';
import https from 'https';
import cache from 'memory-cache';



function searchHandler(){
  this.getSearch = function(req,res,next){
    
    var getParams = querystring.stringify({
        location:req.params.location,
        categories:'bars,music',
        limit:20
    });
    
    var options = {
        host:"api.yelp.com",
        path:"/v3/businesses/search?"+getParams,
        method:"GET",
         headers: {
           "Authorization" : "Bearer "+process.env.YELP_API_KEY
         }
    };
    
    var apireq= https.request(options, function(apires) {
        apires.setEncoding('utf8');
      
        var responseString = '';
      
        apires.on('data', function(data) {
          responseString += data;
        });

        apires.on('end',function(){

          
          var responseObject = JSON.parse(responseString);
            if (responseObject.businesses) {
              responseObject.businesses.forEach(function(el){
                if (el.id in res.locals.count_dict) {
                  el['going']=res.locals.count_dict[el.id];
                } else {
                  el['going']=0;
                }
                });
              responseObject.togo= res.locals.owngoing;
              res.locals.response = responseObject;
              req.session.lastsearch= req.params.location;  
              next();
            }
          else{
            res.send(responseObject);
          }
        });        
      });
      apireq.write(getParams);
      apireq.end();    
  };
  
  this.getReview = function(req,res){
    var options = {
        host:"api.yelp.com",
        path:"/v3/businesses/"+encodeURI(req.params.placeid)+"/reviews",
        method:"GET",
         headers: {
           "Authorization" : "Bearer "+process.env.YELP_API_KEY
         }
    };
    var apireq= https.request(options, function(apires) {
        apires.setEncoding('utf8');
      
        var responseString = '';
      
        apires.on('data', function(data) {
          responseString += data;
        });
        apires.on('end',function(){
          var responseObject = JSON.parse(responseString);
          res.send(responseObject);
        });
      
    });

    apireq.end(); 
  };
  
}

export default new searchHandler();