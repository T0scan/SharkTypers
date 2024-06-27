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

const racers = []

const userRoute = require('./routes/User');

app.use('/api/user', userRoute);

// Socket.IO logic
io.on('connection', (socket) => {
    socket.on('join', (data) => {
        const roomName = data.mode;
        const username = data.username;
        socket.join(roomName)
        console.log(`Socket ${socket.id} joined room ${roomName} with a username of: ${username}`);
        console.log('Rooms of the socket:', socket.rooms);

        // Get number of users in the room
        const room = io.sockets.adapter.rooms.get(roomName);
        let numUsers = 0;
        if (room) {
            numUsers = room.size; // Number of users in the room
        }
        // Add user to the users array if not already present
            racers.push({ roomName, username });

        console.log(racers)
        // Emit updated users list to all clients in the room
        io.to(roomName).emit('racers', racers.filter(user => user.roomName === roomName));

        console.log(`Number of users in room ${roomName}:`, numUsers);
    })

    socket.on('disconnect', (socket) => {
        console.log('A client disconnect')
    });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});