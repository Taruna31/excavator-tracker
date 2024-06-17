const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
  console.log('Client connected');
  let lat = -6.370286;
  let lng = 106.823071;
  
  setInterval(() => {
    const location = {
      lat: lat += 0.0001,  
      lng: lng += 0.0001  
    };
    ws.send(JSON.stringify(location));
  }, 1000);

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
