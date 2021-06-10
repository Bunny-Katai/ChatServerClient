const net = require('net');

const client = net.createConnection({port:5000}, () => {
    console.log('connected to server');
});

client.setEncoding('utf-8');

client.on('data', (data) => {
    console.log(data);
});

process.stdin.pipe(client);



