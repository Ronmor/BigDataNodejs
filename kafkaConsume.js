const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const rejson = require('redis-rejson');

const redis = require('redis');
rejson(redis);

const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "rocket-01.srvs.cloudkafka.com:9094,rocket-03.srvs.cloudkafka.com:9094,rocket-02.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "1zj9s76y",
  "sasl.password": "nQvKAStCQjbyPgvIhyy4yVSfH1ZVz6MQ",
  "debug": "generic,broker,security"
};

const prefix = "1zj9s76y-";
const topic = `${prefix}test`;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://172.16.0.3:27017/mydb";

const Consumer = new Kafka.Consumer(kafkaConf);

Consumer.on("message", (message) => {
  const todo = JSON.parse(message.value);  
  console.log(todo);
})

let Redisclient  = redis.createClient({
    port      : 6379,               // replace with your port
    host      : '172.16.0.2'        // replace with your hostanme or IP address
  });


Consumer.connect();

Redisclient.on('connect', function() {
    console.log('Redis client connected');
});

Consumer
  .on('ready', function() {
    // Subscribe to the librdtesting-01 topic
    // This makes subsequent consumes read from that topic.
    Consumer.subscribe([topic]);
	
	console.log("ready")
	
    // Read one message every 1000 seconds
    setInterval(function() {
//	  console.log('Kafka consumer is consuming..');	
      Consumer.consume();
    }, 60);
  }).on('data', message => {
        console.log(message.value.toString());
		
			MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true} ,function(err, db) {
			if (err) throw err;
			var dbo = db.db("mydb");
			dbo.collection("customers").insertOne(JSON.parse(message.value.toString()), function(err, res) {
			if (err) throw err;
			console.log("Number of documents inserted: " + res.insertedCount);
			db.close();
  });
});
var nd = new Date().setHours(23,59,59);
var expire = Math.floor((nd-Date.now())/1000);
//Redisclient.set(JSON.parse(message.value.toString()).id, message.value.toString(), 'EX', expire,redis.print);
//let dummy_key = 'dummy_key';
console.log('just before function set');
var keyObject = JSON.stringify(message);		
Redisclient.json_set(JSON.parse(message.value.toString()).id.toString(), keyObject, function(err) {
	if (err) throw err;
	console.log('parsed to json');
});
Redisclient.expireat(JSON.parse(message.value.toString()).id, expire);
    });