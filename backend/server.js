const app = require("./index");

const connect = require("./configs/db");

const PORT = process.env.PORT || 4500;

app.listen(PORT,async function() {
    await connect();

    console.log("listening to port:",PORT);
})