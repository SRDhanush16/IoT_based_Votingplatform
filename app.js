/*
const {SerialPort} = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');

const port = new SerialPort({ path: 'COM7', baudRate: 9600 })

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', console.log);
*/
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const WebSocket = require('ws');

const port = new SerialPort({ path: 'COM5', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', function connection(ws) {
  console.log('WebSocket connected and Server running on port 5000');
  
  parser.on('data', (data) => {
    ws.send(data);
  });
});


