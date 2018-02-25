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
                           {_id:"$places",
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
}

export default new dbHandler();