
// import express from "express"
// import cors from "cors";
// import dotenv from "dotenv"
// import connectDB from "./config/db.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import http from 'http';
// import { Server } from 'socket.io';


// dotenv.config();

// const app = express();
// const port = process.env.PORT || '8080';

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000", // React app URL
//         methods: ["GET", "POST"],
//     },
// });

// // Handle socket connection
// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Listen for 'message' event from client
//     socket.on('message', (data) => {
//         console.log('Message from client:', data);
//     });

//     // Emit a message to the client
//     socket.emit('welcome', 'Hello from the server!');

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });
// // Create HTTP server and pass it to socket.io
// // const server = http.createServer(app);

// // Initialize socket.io
// // const io = new Server(server);
// // const io = new Server(server, {
// //     cors: {
// //         origin: 'http://localhost:3000',  // Allow all origins
// //         methods: ['GET', 'POST'],
// //     },
// // });

// app.use(cors());

// //body parser middleware
// app.use(express.json());

// //connect to database
// connectDB();

// //include router
// app.use("/api/admin", adminRoutes);

// // // WebSocket connection event
// // io.on('connection', (socket) => {
// //     console.log('A user connected=======================');

// //     // Send initial score data to the client
// //     socket.emit('scoreUpdate', { teamName: 'Team A', points: 0 });  // Example initial data

// //     socket.on('disconnect', () => {
// //         console.log('User disconnected');
// //     });
// // });

// // // Function to emit score updates to all connected clients
// // export const sendScoreUpdate = (newScore) => {
// //     console.log("socket",newScore);
// //     io.emit('scoreUpdate', newScore);  // Broadcast to all clients
// // };

// app.listen(port, (req, res) => {
//     console.log(`express server is running on prot http://localhost:${port}`);
// })

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import http from 'http';
import { Server } from 'socket.io';
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const server = http.createServer(app); // Create the HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Allow React app URL
        methods: ["GET", "POST"],
    },
});

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for 'message' event from client
    socket.on('message', (data) => {
        console.log('Message from client:', data);
    });

    // Emit a message to the client
    socket.emit('welcome', 'Hello from the server!');

    // Send initial score data to the client
    // socket.emit('scoreUpdate', { teamName: 'Team A', points: 0 });  // Example initial data

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Function to emit score updates to all connected clients
export const sendScoreUpdate = (newScore) => {
    // console.log("socket",newScore);
    io.emit('scoreUpdate', newScore); 
    // io.emit('scoreList', newScore.allOversScoreList);
};

// Body parser middleware
app.use(cors());
app.use(express.json());

// Connect to database
// connectDB();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
}).then((conn)=>{
    console.log("database connected");
})
// Include router
app.use("/api/admin", adminRoutes);

app.get('/', (req, res) => {
    res.send('Hello, world! This is your app running.');
  });
// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
