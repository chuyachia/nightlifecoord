require('dotenv').config();

import express from "express";
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import cache from 'memory-cache';
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import routes from "../shared/routes";
import searchHandler from "./controllers/searchHandler";
import dbHandler from "./controllers/dbHandler";
import App from "../shared/App";
import sourceMapSupport from "source-map-support";
import memoryStoreModule from 'memorystore';

var memoryStore = memoryStoreModule(session);
if (process.env.NODE_ENV === "development") {
  sourceMapSupport.install();
}

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// DB
mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB);
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});
// Passport
require('./config/passport.js')(passport);

app.use(session({
    store: new memoryStore({
      checkPeriod: 86400000
    }),
    secret: 'secretNightlife',
    resave: false,
    saveUninitialized: false,
    cookie:{sameSite:'strict'}
}));

app.use(passport.initialize());
app.use(passport.session());

 
app.route('/auth/github')
.get(passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/results' }),
  function(req, res) {
   res.redirect('/results');
});

  
app.route('/logout')
.get(function (req, res) {
  req.logout();
  res.redirect('/results');
});


// APP content
function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/results');
	}
};

function returnData(req,res){
  res.send(res.locals.response);
}

function returnHtml(req,res){
      const initialData = res.locals.response;
      const loggedIn = res.locals.loggedin;
      const context = {initialData,loggedIn};
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>);
      if (matchPath(req.url,routes).path!=req.url)
        res.status(404);
        
      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Nightlife Coordination App</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/journal/bootstrap.min.css">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.6/css/all.css">
          <link rel="stylesheet" href="/css/main.css">
          <script src="/bundle.js" defer></script>
          <script>window.__initialData__ = ${serialize(initialData)}</script>
          <script>window.__loggedIn__ = ${serialize(loggedIn)}</script>
        </head>
        <body>
          <div id="root">${markup}</div>
        </body>
      </html>
      `);
}

app.route('/search/:location')
    .get(dbHandler.getOwnGoing,dbHandler.getAllGoing,searchHandler.getSearch,returnData);
    

app.route('/review/:placeid')
    .get(searchHandler.getReview);

app.route('/togo')
    .get(isLoggedIn,dbHandler.getOwnGoing,
    function(req,res){
      res.send(res.locals.owngoing);
    }
    );
    
app.route('/place/:placeid/:name/:country/:city')
    .post(isLoggedIn,dbHandler.addPlace)
    .delete(isLoggedIn,dbHandler.deletePlace)

// React components
app.get("*", 
  function(req,res,next){
    const activeRoute = routes.find(route => matchPath(req.url, route));
    res.locals.loggedin = req.isAuthenticated()?true:false;
    if (activeRoute.path=='/results'){
      next();
    } else {
      returnHtml(req,res);
    }
  },function(req,res,next){
    req.params.location =cache.get('lastsearch');
    if (!req.params.location){
      res.redirect('/');
    } else{
    next();
    }
  },
  dbHandler.getOwnGoing,
  dbHandler.getAllGoing,
  searchHandler.getSearch,
  function(req,res){
    returnHtml(req,res);
  });


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});