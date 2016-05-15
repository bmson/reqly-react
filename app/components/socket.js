// Global dependencies
const WebRTC = require('ws');

// Module definition
module.exports = (port) => {

  // Listen to port
  const server = new WebRTC.Server({
    'port': port
  });

  // When message is received
  const onMessage = (data) => {
    server.clients.forEach(client => client.send(data));
  };

  // Wait for connection
  server.on('connection', (ws) => {
    ws.on('message', onMessage);
  });

};
