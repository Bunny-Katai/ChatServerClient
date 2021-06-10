const net = require('net');
const PORT = 5000;
const fs = require('fs');
const path = require('path');
const chatLog = path.join(__dirname, 'chat.log');
const clients = [];
let numClient = 1;




const server = net.createServer( (client) => {
    
    client.write('Welcome to the chat server!');
    client.clientId = numClient++;
    client.setEncoding('utf-8');
    clients.push(client);

    writeToAll(`User${client.clientId} has joined the chat server`);

    client.on('data', data => {
        writeToAll(`User${client.clientId}: ${data}`);
    });

    client.on('end', () => {
       
        writeToAll(`User${client.clientId} has left`);
        clients.splice(clients.indexOf(client), 1);

        
    });

    function writeToAll(message) {
        clients.forEach((_client) => {
            if(_client.clientId !== client.clientId) {
                console.log(message);
                _client.write(message);
                fs.appendFile(chatLog, message + '\n', (err) => {
                    if(err) console.log(err);
                });
            }
        
            if (clients.length === 1) {
                console.log(message);
            }
        });
    }
}).listen(PORT);

console.log(`Listening to port: ${PORT}`);
