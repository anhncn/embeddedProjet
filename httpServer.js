var express =require('express');
var app = express();
// gọi module DataApp, './data' link  đường dẫn đến tên file tạo lớp DataApp

const http = require('http').createServer(app);
var path = require('path');
const sql = require("mssql");
// config for your database
const dbConfig = { 
  user: 'anhncn',
  password: 'anhncn',
  database: 'TestEmbededProject',
  server: 'ANHNCN-TT\\SQLEXPRESS',
};


var PORT = process.env.PORT||8080 ;
app.use(express.static(__dirname));
app.use(express.static('client_nguyen_anh'));
app.get('/', function(req, res){
  res.sendFile('httpClient.html', {root:path.join(__dirname,'./client_nguyen_anh')});
});

app.post('/sendPhone',function(req,res){
  console.log(req.body);
});

app.post('/reloadMap',function(req,res){
  // connect to your database
  sql.connect(dbConfig, function (err) {
      if (err) console.log(err);
      let request = new sql.Request();
      // query to the database and get last the records
      request.query('select top 1 * from MessageSim ORDER BY Id DESC',function (err, recordset) {  
          if (err) console.log(err)
          record = recordset.recordset[0];
          console.log(record.MessageSim);
          let arr, send_data;
          arr = record.MessageSim.split(","); //MessageSim
          //tạo chuỗi json gửi client browser
          send_data =JSON.stringify({ lng: parseFloat(arr[1]), lat: parseFloat(arr[2])});
          //let stringify_data = JSON.stringify(send_data);
          console.log("reloadMap");
          console.log(send_data);
          res.status(200).send(send_data);
      });
  });
});

app.get('/lastRecord', function (req, res) {
  //let sql = require("mssql");
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

//nhận từ thiết bị sim
app.post('/sendDataToServer', function(req, res){
  database.insertTable(req.body.MessageSim);
});

// open 
app.use("/folder", express.static(__dirname+"/folder_download"));

app.get('*', function(req, res){
  res.status(404).send('404 NOT FOUND');
});

app.listen(PORT, function(){
  console.log("SERVER LISTEN ON "+ PORT);
})