const sensor = require("node-dht-sensor");
const fs = require("fs");

const DHT11 = 11;
const pin = 4;

sensor.read(DHT11, pin, (error, temperature, humidity) => {
    if (!error) {
        const snapshot = {
            temperature: temperature,
            humiditiy: humidity,
            timestamp: new Date()
        };
        // 気休め
        console.log(`temperature: ${temperature}, humiditiy: ${humidity}`);

        try {
            fs.appendFileSync(__dirname + "/temperatures.txt", JSON.stringify(snapshot) + "\n");
        } catch (e) {
            console.error("cannot write object:", JSON.stringify(snapshot));
        }
    } else {
        console.error(error);
    }
});    
