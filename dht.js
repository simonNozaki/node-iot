const sensor = require("node-dht-sensor");
const fs = require("fs");
const mqtt = require("mqtt");

const DHT11 = 11;
const pin = 4;

const client = mqtt.connect("mqtt://localhost");
const topic = "/home/temperaure";
client.subscribe(topic);

/**
 * 拡張関数: sec to millisec
 * @param {Number} sec 
 */
Number.prototype.toMilliSec = () => this * 1000;


async function getSnapShot() {
    return await sensor.read(DHT11, pin);
}

let sensorSnap = getSnapShot();

let snapshot = {
    temperature: null,
    humidity: null,
    timestamp: new Date()
};

/**
 * ブローカにパブリッシュ
 */
sensor.read(DHT11, pin, (error, temperature, humidity) => {

    snapshot.temperature = temperature;
    snapshot.humidity = humidity;

    client.on("connect", () => {
        fs.appendFileSync(__dirname + "/temperatures.txt", JSON.stringify(snapshot) + "\n");
        client.subscribe(topic, () => {
            console.log(JSON.stringify(snapshot));
            client.publish(topic, JSON.stringify(snapshot));
        });
    });

    client.end();
});
