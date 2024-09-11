const socketIo = require('socket.io');
let io;
module.exports = {
    init: (server) => {
        io = socketIo(server, {
            cors: {
                origin: ["http://localhost:5173", "https://app.bleggs.com", "https://bleggs-miniapp.vercel.app"], // Replace with your frontend domains
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true // Allow credentials (cookies, authorization headers, etc.)
            }
        });
        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error("Socket.io not initialized!");
        }
        return io;
    }
};