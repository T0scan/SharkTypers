const express = require('express');
const app = express();
const socketIo = require('socket.io'); // Corrected import

const http = require('http');
const server = http.createServer(app);
const io = new socketIo.Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    }
});

const userRoute = require('./routes/User');

app.use('/api/user', userRoute);

// Socket.IO logic
io.on('connection', (socket) => {
    
    console.log('A client connected with a socketID of: ' + socket.id);

    // Check rooms of the socket
    console.log('Rooms of the socket:', socket.rooms);

    socket.on('join', (roomName) => {
        socket.join(roomName)
        console.log(`Socket ${socket.id} joined room ${roomName}`);
        console.log('Rooms of the socket:', socket.rooms);

        // Get number of users in the room
        const room = io.sockets.adapter.rooms.get(roomName);
        let numUsers = 0;
        if (room) {
            numUsers = room.size; // Number of users in the room
        }
        console.log(`Number of users in room ${roomName}:`, numUsers);
    })

    // Check rooms of the socket
    console.log('Rooms of the socket:', socket.rooms);

    socket.on('disconnect', (socket) => {
        console.log('A client disconnect')
    });

    socket.on('test', (message) => {
        console.log(message)
    })

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});