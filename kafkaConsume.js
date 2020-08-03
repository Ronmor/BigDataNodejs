const uuid = require("uuid");
const Kafka = require("node-rdkafka");

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

const Consumer = new Kafka.Consumer(kafkaConf);

//Consumer.on("message", (message) => {
 // const todo = JSON.parse(message.value);
  //
  //console.log(todo);
//})

Consumer.connect();


Consumer
  .on('ready', function() {
    // Subscribe to the librdtesting-01 topic
    // This makes subsequent consumes read from that topic.
    Consumer.subscribe([topic]);

    // Read one message every 1000 seconds
    setInterval(function() {
      Consumer.consume();
    }, 60);
  })
   .on('data', message => {
        console.log(message.value.toString());
    });

