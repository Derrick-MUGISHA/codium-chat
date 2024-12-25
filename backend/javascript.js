const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

// App setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database setup
mongoose.connect('mongodb://localhost:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true });
const MessageSchema = new mongoose.Schema({
    username: String,
    content: String,
    fileUrl: String,
    timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', MessageSchema);

// File upload setup
const upload = multer({ dest: 'uploads/' });

// Routes
app.get('/', (req, res) => {
    res.send('Chat Backend Running');
});

// Fetch chat history
app.get('/messages', async (req, res) => {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
});

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ fileUrl: `/uploads/${req.file.filename}` });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Socket.io for real-time communication
io.on('connection', (socket) => {
    console.log('A user connected');

    // Receive a message
    socket.on('chatMessage', async (data) => {
        const newMessage = await Message.create(data);
        io.emit('chatMessage', newMessage); // Broadcast the message
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
