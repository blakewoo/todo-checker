function connect (server) {
    let io = require("socket.io")(server)
    let idMap = new Map()
    let socketIdMap = new Map()

    io.on("connect",function (socket) {
        socket.on('access',function (data) {
            console.log('Client logged-in - ID:' + data.ID);
            idMap.set(data.ID,socket.id)
            socketIdMap.set(socket.id,data.ID)
            // socket[data.ID] = socket.id;
            // socket[socket.id] = data.ID
            // console.log(socket.id)
        })

        socket.on('chat',function (data) {
            let message = data.message;
            let targetSocketId = idMap.get(data.target)
            console.log(targetSocketId)
            if(targetSocketId) {
                io.to(targetSocketId).emit("chat",message)
            }
        })

        socket.on('disconnect', function() {
            let dataID = socketIdMap.get(socket.id)
            idMap.delete(dataID)
            socketIdMap.delete(socket.id)
            console.log('Client logged-out - ID:' + socket[socket.id]);
        });
    })

}

module.exports = connect