const express = require('express');
const database = require('./toDoModel');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server);
const port = 3000



database.initializeMongo;
//------------ kafka------------
const kafka = require('./kafkaProduce');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//------------
//app.set('views', path.join(__dirname, 'views'));
//app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', (req, res) => res.send("<a href='/send'>Send</a> <br/><a href=''>View</a>"));
app.get('/send', (req, res) => res.render('sender'));
app.get('/view', (req, res) => res.render('viewer'));


//------------ Socket.io ----------------
io.on("connection", (socket) => {
    console.log("new user connected");
    socket.on("totalWaitingCalls", (msg) => { console.log(msg.totalWaiting) });
    socket.on("callDetails", (msg) => { console.log(msg);kafka.publish(msg) });
});


//------------------- kafka -----------
/* Kafka Producer Configuration */

//
//const client1 = new kafka.KafkaClient({kafkaHost: "localhost:9092"});


//----------database 18 08 2020 ---------


app.get('/testFind', function (req, res) {
  database.ToDo.find(function (err, Todos) {
    if (err) res.status(500).send({ error: err });
    console.log(Todos);
    res.json(Todos);
  })
})


//------------------------------------


server.listen(port, () => console.log(`Ariel app listening at http://localhost:${port}`));


