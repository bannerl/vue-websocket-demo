// var http = require('http');
// var exec = require('child_process').exec;
// var server = http.createServer(function (req, res) {
// }).listen(8888);//创建http服务
// console.log('Server running ');
// var io = require('socket.io').listen(server);
// io.sockets.on('connection', (socket) => {
//     console.log('链接成功');
//     socket.on('compile', (v) => {
//     socket.emit('login', v);
//     });   
// });
// const WebSocketServer = require('ws').Server
//   , wss = new WebSocketServer({port: 8888})

// wss.on('connection', function(ws) {
//     console.log('connected.')
//     ws.on('message', function(message) {
//       wss.clients.forEach((client) => {
//         client.send(message)
//       })
//     })
//     wss.clients.forEach((client) => {
//         client.send('keyword:')
//     })
// })
let i = 0;
var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
}).listen(8082); //创建http服务
console.log('Server running ');
var io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
    console.log('链接成功', i);
    i++;
    socket.on('compile', (str) => {
        let arr = fs.readFileSync('./data.json')
        arr = JSON.parse(arr)
        arr.push(str)
        let dd = JSON.stringify(arr)
        fs.writeFileSync('./data.json', dd)
        socket.broadcast.emit('login', str);
        socket.emit('login', str);
    });   
})