var net = require('net');
var server = net.createServer();
var fs = require('fs');
const dbConfig = { 
    user: 'anhncn',
    password: 'anhncn',
    database: 'TestEmbededProject',
    server: 'ANHNCN-TT\\SQLEXPRESS',
};

server.on("connection", function(socket){
    var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
    console.log("new client connect is made %s", remoteAddress);

    socket.on("data", function(data){
        try {
            let sql = require("mssql");
            // connect to your database
            sql.connect(dbConfig, function (err) {
                if (err) console.log(err);
                let request = new sql.Request();
                // query to the database
                let stringquery = "insert MessageSim (MessageSim) values(N'" + data + "')";
                request.query(stringquery, function (err, result) {  
                    if (err) console.log(err)
                    console.log(result);
                    socket.write("rt OK");
                });
            });
        } catch (error) {
            console.log(error.message);
            socket.write("error!");
        }
    });
    socket.once("close",function(){
        console.log("connection closed!");
    });
    socket.on("error",function(){});
});

server.listen(747,function(){
    console.log("server listening to %j", server.address());
});