const express = require("express");
const socket = require('socket.io');
const port = 3000;

const app = express();
//const server = app.listen(3000);

app.use(express.static('public'));

const server = app.listen(port, () => {
    console.log(`On port ${port}`);
})

const io = socket(server);

io.on('connection',(socket) => {
    console.log(socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat',data);
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing',data);
    })
})