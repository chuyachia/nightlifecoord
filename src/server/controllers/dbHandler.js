'use strict';

var Users = require('../models/users.js');

function dbHandler(){
  this.getOwnGoing = function(req,res,next) {
    if (req.isAuthenticated()) {
      Users.findOne({'github.id':req.user.github.id},{'places':1})
      .exec(function(err,result){
        if (err) throw err;
        res.locals.owngoing = result['places']
        next()
      })} else {
        res.locals.owngoing=[];
        next();
     }
  };
  

  this.getAllGoing = function(req,res,next) {
      var count_dict ={};
      Users.aggregate([{$unwind:"$places"},
                          {$group:
                           {_id:"$places.id",
                           count:{$sum:1}}}])
    .exec(function(err,result){
      if (err) throw err;
      result.forEach(function(x){
        count_dict[x._id] = x.count;
      });
      res.locals.count_dict = count_dict;
      next();
    });
  };
  
  this.addPlace = function(req,res){
    Users.findOneAndUpdate({'github.id':req.user.github.id},
    {$push:{
      places:{'id':req.params.placeid,'name':req.params.name,'country':req.params.country,'city':req.params.city}
    }},
    {new:true})
    .exec(function(err,result){
        if (err) throw err;
        console.log('New place added');
        res.json(result)
      })
  };
  
  this.deletePlace = function(req,res){
        Users.findOneAndUpdate({'github.id':req.user.github.id},
        {$pull:{
          places:{id:req.params.placeid}
        }},
        {new:true})
    .exec(function(err,result){
        if (err) throw err;
        console.log('Place removed');
        res.json(result)
      })
  };
}

export default new dbHandler();