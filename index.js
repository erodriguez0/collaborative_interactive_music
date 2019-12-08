var express = require('express')
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
const app = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

var http = require('http').createServer(app);
const router = express.Router();
const io = socketIO(app);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('press-key', payload => {
    socket.broadcast.emit('press-key', payload)
    })
  socket.on('disconnect', () => console.log('Client disconnected'));
});

//app.get('/', function(request, response) {
  //response.send('Hello World!')
//})

//app.get("/chat", function(req,res){
  //res.sendFile(path + "chat.html");
//})

//app.get("/index", function(req,res){
  //res.sendFile(path + "index.html");
//})


//app.listen(app.get('port'), function() {
  //console.log("Node app is running at localhost:" + app.get('port'))
//})
