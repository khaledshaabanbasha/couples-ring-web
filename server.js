const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for ringPartner event
    socket.on('ringPartner', (data) => {
        // Broadcast the ring signal to all clients except the sender
        socket.broadcast.emit('partnerRinging', { soundNumber: data.soundNumber, soundUrl: getSoundUrl(data.soundNumber) });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

function getSoundUrl(soundNumber) {
    // Replace these URLs with the actual URLs of your sound files
    switch (soundNumber) {
        case 1:
            return 'https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatedible.ogg';
        case 2:
            return 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3';
        case 3:
            return 'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3';
        case 4:
            return 'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/player_shoot.wav';
        default:
            return '';
    }
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
