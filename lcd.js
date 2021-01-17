const Lcd = require("lcd");

const config = {
    rs: 14,
    e: 15,
    data: [4, 17, 22, 27],
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