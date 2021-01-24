const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost");
const topic = "/home/temperaure";
client.subscribe(topic);

app.set("view engine", "mustache");
app.set("views", __dirname + "/views");
app.engine("mustache", mustacheExpress());

let snapshot = {
    temperature: null,
    humidity: null,
    timestamp: new Date()
};

app.get("/", function(req, res, next){
    client.on("message", (topic, message) => {
        let temperatures = JSON.parse(message);
        snapshot.temperature = temperatures.temperature;
        snapshot.humidity = temperatures.humidity;
    });
    
    console.log(topic, JSON.stringify(snapshot));

    res.render("index", snapshot);
});

app.listen(3000, () => {
    console.log("Server start");
})

