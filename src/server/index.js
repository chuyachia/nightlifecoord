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
	secret: 'secretNightlife',
	resave: false,
	saveUninitialized: true
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
      const context = {initialData}
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>);
      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Nightlife Coordination App</title>
          <link rel="stylesheet" href="https://bootswatch.com/3/journal/bootstrap.min.css">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.6/css/all.css">
          <link rel="stylesheet" href="/css/main.css">
          <script src="/bundle.js" defer></script>
          <script>window.__initialData__ = ${serialize(initialData)}</script>
          <script>window.__loggedIn__ = ${serialize(res.locals.loggedin)}</script>
        </head>
        <body>
          <div id="root">${markup}</div>
        </body>
      </html>
      `);
}

app.route('/search/:location')
    .get(searchHandler.getToken,dbHandler.getOwnGoing,dbHandler.getAllGoing,searchHandler.getSearch,returnData);
    

app.route('/review/:placeid')
    .get(searchHandler.getToken,searchHandler.getReview);

app.route('/place/:placeid')
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
    next();
  },
  searchHandler.getToken,
  dbHandler.getOwnGoing,
  dbHandler.getAllGoing,
  searchHandler.getSearch,
  function(req,res){
    returnHtml(req,res);
  });


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});