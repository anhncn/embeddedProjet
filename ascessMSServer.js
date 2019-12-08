var express = require('express');
var app = express();

// config for your database
const dbConfig = { 
    user: 'anhncn',
    password: 'anhncn',
    database: 'TestEmbededProject',
    server: 'ANHNCN-TT\\SQLEXPRESS',
};

app.get('/', function (req, res) {
    let sql = require("mssql");
    // connect to your database
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err);
        let request = new sql.Request();
        // query to the database and get all the records
        request.query('select * from MessageSim',function (err, recordset) {  
            if (err) console.log(err)
            record = recordset.recordset;
            res.send(record);
            console.log(record);
        });
    });
});

app.get('/lastRecord', function (req, res) {
    let sql = require("mssql");
    // connect to your database
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err);
        let request = new sql.Request();
        // query to the database and get last the records
        request.query('select top 1 * from MessageSim ORDER BY Id DESC',function (err, recordset) {  
            if (err) console.log(err)
            record = recordset.recordset;
            res.send(record);
            console.log(record);
        });
    });
});

app.get('/addEntity', function (req, res) {
    let sql = require("mssql");
    // connect to your database
    sql.connect(dbConfig, function (err) {
        if (err) console.log(err);
        let request = new sql.Request();
        // add a record to database have value is "Create By accessMSServer.js"
        request.query("insert MessageSim (MessageSim) values(N'Create By accessMSServer.js')", function (err, result) {  
            if (err) console.log(err)
            res.send(result);
            console.log(result);
        });
    });
});

// open 
app.use("/folder", express.static(__dirname+"/folder_download"));
var server = app.listen(8080, function () {
    console.log('Server is running on port 8080..');
});