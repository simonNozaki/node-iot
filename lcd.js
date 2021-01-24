const Lcd = require("lcd");

const config = {
    rs: 20,
    e: 21,
    data: [4, 17, 27, 22],
    cols: 16,
    rows: 2
}

const lcd = new Lcd(config);

lcd.on("ready", _ => {
    setInterval(() => {
        console.log("Start printing...")
        lcd.setCursor(0, 0);

        lcd.print("Hello, LCD!", error => {
            if (error) {
                throw error;
            }
        });
    }, 1000);
})

process.on("SIGINT", _ => {
    lcd.close();
    process.exit();
});