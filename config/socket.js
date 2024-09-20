// const socketIo = require('socket.io');
// let io;
// module.exports = {
//     init: (server) => {
//         io = socketIo(server, {
//             cors: {
//                 origin: ["http://localhost:5173", "https://192.168.142.158:5000", "https://app.bleggs.com", "https://dog82027.vercel.app"], // Replace with your frontend domains
//                 methods: ["GET", "POST", "PUT", "DELETE"],
//                 credentials: true // Allow credentials (cookies, authorization headers, etc.)
//             }
//         });
//         return io;
//     },
//     getIo: () => {
//         if (!io) {
//             throw new Error("Socket.io not initialized!");
//         }
//         return io;
//     }
// };