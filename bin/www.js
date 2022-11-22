#!/usr/bin/env node
userRoutes = require('../routes/users');
habitRoutes = require('../routes/habits');
const j =require('../utils/updateLogs');
/**
 * Module dependencies.
 */
 '../utils/updateLogs';
var app = require('../app');
var debug = require('debug')('cig-track:server');
var http = require('http');
var mongoose = require('mongoose'); 
var dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

// console.log(process.env);
const DB= process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
console.log(DB);
mongoose.connect(DB, {
  useNewUrlParser:true,

}).then(con=>{
  console.log('DB fucking connected bro');
}).catch(err=>console.log(err))
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = app.listen(port,()=>{
  console.log(`server running on port ${port}`);
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

//Routes
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/habits',habitRoutes);