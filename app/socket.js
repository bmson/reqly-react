// Dependencies
const WebRTC = require('ws');

// Module definition
exports.connect = (directory, port) => {

  // Listen to port
  const server = new WebRTC.Server({
    'port': port
  });

  // Wait for connection
  server.on('connection', ws => {

    // Send message to all clients
    ws.on('message', data => {
      server.clients.forEach(client => client.send(data));
    });

  });

};
