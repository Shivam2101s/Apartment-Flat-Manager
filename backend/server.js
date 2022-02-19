const app = require("./index");

const connect = require("./configs/db");

let port = 4500;

app.listen(port,async function() {
    await connect();

    console.log("listening to port:",port);
})