// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Get our API routes
const api = require('./server/routes/api');
const personalRoutes = require('./server/personal');
const imageRoutes = require('./server/image');

const app = express();

// mongodb connection 
/*
mongoose.connect("mongodb://inhaled-clonter:Shel4583@ds161833.mlab.com:61833/opiniondb", {
  useMongoClient: true
});
*/
mongoose.connect("localhost:27017/opiniondb");
var db = mongoose.connection;

// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//Setting headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
// Set our api routes
app.use('/', api);
app.use('/', imageRoutes);
app.use('/opinion', personalRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

