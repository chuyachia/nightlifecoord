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
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/results');
});

  
app.route('/logout')
.get(function (req, res) {
  req.logout();
  res.redirect('/results');
});


// APP content
app.route('/search/:location')
    .get(searchHandler.getToken,dbHandler.getOwnGoing,dbHandler.getAllGoing,searchHandler.getSearch);
app.route('/review/:placeid')
    .get(searchHandler.getToken,searchHandler.getReview);


// React components
app.get("*", (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route));

  const requestInitialData =
    activeRoute.component.requestInitialData && activeRoute.component.requestInitialData(cache.get('lastsearch'));
  const loggedin= req.isAuthenticated()?true:false;

  Promise.resolve(requestInitialData)
    .then(initialData => {
      const context = { initialData };
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );

      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>W Combinator</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.6/css/all.css">
          <link rel="stylesheet" href="/css/main.css">
          <script src="/bundle.js" defer></script>
          <script>window.__initialData__ = ${serialize(initialData)}</script>
          <script>window.__loggedIn__ = ${serialize(loggedin)}</script>
        </head>
        <body>
          <div id="root">${markup}</div>
        </body>
      </html>
      `);
    })
    .catch(next);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});