'use strict';

import querystring from 'querystring';
import https from 'https';
import cache from 'memory-cache';



function searchHandler(){
  
  this.getToken= function(req,res,next) {
    if(cache.get('token')) {
      res.locals.token = cache.get('token');
      next();
      
    } else {
      var postParams = querystring.stringify({
        grant_type:"client_credentials",
        client_id:  process.env.YELP_KEY,
        client_secret:  process.env.YELP_SECRET
      });
      var options = {
        host:"api.yelp.com",
        path:"/oauth2/token?"+postParams,
        method:"POST",
      };
      
      var apireq= https.request(options, function(apires) {
        apires.setEncoding('utf8');
        var responseString = '';
        apires.on('data', function(data) {
          responseString += data;
        });
        
        apires.on('end',function(){
          var responseObject = JSON.parse(responseString);
          cache.put('token', responseObject);
          res.locals.token = responseObject;
          next();
        });
        
      });
      apireq.write(postParams);
      apireq.end();
      
    } 
  };

  
  this.getSearch = function(req,res,next){
    cache.put('lastsearch', req.params.location);  
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
           "Authorization" : res.locals.token.token_type+" "+res.locals.token.access_token
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
              next();
            }
          else{
            res.redirect('back');
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
           "Authorization" : res.locals.token.token_type+" "+res.locals.token.access_token
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