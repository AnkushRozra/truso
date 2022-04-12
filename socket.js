const activeUsers = new Set();

module.exports = (io) => {
    io.on("connection", (socket) => {
        //Socket is a Link to the Client 
        //Here the client is connected and we can exchanged 
        socket.emit("connected", "Hello and Welcome to the Server");

        socket.on("join", function (data) {
            socket.userId = data;
            activeUsers.add(data);
            io.emit("join", [...activeUsers]);
        });

        socket.on("disconnect", () => {
            activeUsers.delete(socket.userId);
            io.emit("user disconnected", socket.userId);
        });
    });
}