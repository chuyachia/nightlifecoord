'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({github:
                       {
                         id:String,
                         displayName:String,
                         username:String
                       },
                      places:
                      [
                      ]
                      })

module.exports = mongoose.model('Nightlife',User);